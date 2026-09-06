import { getStravaSummary, stravaConfigured } from "@/lib/strava";

export const runtime = "nodejs";

export async function GET() {
  if (!stravaConfigured()) {
    return Response.json({ configured: false }, { headers: { "Cache-Control": "public, s-maxage=600" } });
  }
  try {
    const data = await getStravaSummary();
    return Response.json(data, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" },
    });
  } catch (err) {
    console.error("Strava error", err);
    return Response.json({ configured: false, error: "unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
