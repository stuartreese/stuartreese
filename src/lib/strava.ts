/**
 * Small Strava client for the running log.
 * Uses a long-lived refresh token to mint short-lived access tokens, then reads
 * the athlete's run totals and most recent runs. Results are cached in memory
 * per server instance and the API route adds CDN caching on top.
 */

const ATHLETE_ID = 24203237;
const METERS_PER_MILE = 1609.344;

export type StravaSummary = {
  configured: true;
  fetchedAt: string;
  ytd: { miles: number; runs: number; hours: number; elevationFt: number };
  recent4w: { miles: number; runs: number };
  lastRun: { name: string; miles: number; pace: string; date: string } | null;
  spark: { miles: number; date: string; name: string }[];
};

export type StravaResult = StravaSummary | { configured: false };

type Totals = { count: number; distance: number; moving_time: number; elevation_gain: number };
type Stats = { ytd_run_totals: Totals; recent_run_totals: Totals };
type Activity = { name: string; type: string; sport_type?: string; distance: number; moving_time: number; start_date_local: string };

let tokenCache: { accessToken: string; expiresAt: number } | null = null;
let dataCache: { at: number; data: StravaSummary } | null = null;
const DATA_TTL_MS = 30 * 60 * 1000;

export function stravaConfigured() {
  return Boolean(process.env.STRAVA_CLIENT_ID && process.env.STRAVA_CLIENT_SECRET && process.env.STRAVA_REFRESH_TOKEN);
}

async function accessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.accessToken;
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Strava token refresh failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_at: number };
  tokenCache = { accessToken: json.access_token, expiresAt: json.expires_at * 1000 };
  return json.access_token;
}

const miles = (m: number) => Math.round((m / METERS_PER_MILE) * 10) / 10;

function pace(distanceM: number, seconds: number) {
  if (!distanceM) return "";
  const secPerMile = seconds / (distanceM / METERS_PER_MILE);
  const min = Math.floor(secPerMile / 60);
  const sec = Math.round(secPerMile % 60);
  return `${min}:${sec.toString().padStart(2, "0")} /mi`;
}

export async function getStravaSummary(): Promise<StravaResult> {
  if (!stravaConfigured()) return { configured: false };
  if (dataCache && Date.now() - dataCache.at < DATA_TTL_MS) return dataCache.data;

  const token = await accessToken();
  const headers = { Authorization: `Bearer ${token}` };
  const [statsRes, actsRes] = await Promise.all([
    fetch(`https://www.strava.com/api/v3/athletes/${ATHLETE_ID}/stats`, { headers, cache: "no-store" }),
    fetch("https://www.strava.com/api/v3/athlete/activities?per_page=40", { headers, cache: "no-store" }),
  ]);
  if (!statsRes.ok) throw new Error(`Strava stats failed: ${statsRes.status}`);
  if (!actsRes.ok) throw new Error(`Strava activities failed: ${actsRes.status}`);
  const stats = (await statsRes.json()) as Stats;
  const acts = (await actsRes.json()) as Activity[];

  const runs = acts.filter((a) => (a.sport_type ?? a.type) === "Run" || a.type === "Run").slice(0, 10);
  const last = runs[0];

  const data: StravaSummary = {
    configured: true,
    fetchedAt: new Date().toISOString(),
    ytd: {
      miles: Math.round(stats.ytd_run_totals.distance / METERS_PER_MILE),
      runs: stats.ytd_run_totals.count,
      hours: Math.round(stats.ytd_run_totals.moving_time / 3600),
      elevationFt: Math.round(stats.ytd_run_totals.elevation_gain * 3.28084),
    },
    recent4w: {
      miles: Math.round(stats.recent_run_totals.distance / METERS_PER_MILE),
      runs: stats.recent_run_totals.count,
    },
    lastRun: last
      ? { name: last.name, miles: miles(last.distance), pace: pace(last.distance, last.moving_time), date: last.start_date_local }
      : null,
    spark: runs
      .slice()
      .reverse()
      .map((r) => ({ miles: miles(r.distance), date: r.start_date_local, name: r.name })),
  };
  dataCache = { at: Date.now(), data };
  return data;
}
