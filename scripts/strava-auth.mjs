// One-time helper: turns a Strava API app into the refresh token the site needs.
// Usage: STRAVA_CLIENT_ID=... STRAVA_CLIENT_SECRET=... npm run strava:auth
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const id = process.env.STRAVA_CLIENT_ID;
const secret = process.env.STRAVA_CLIENT_SECRET;
if (!id || !secret) {
  console.error("Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET first (from https://www.strava.com/settings/api).");
  process.exit(1);
}

const url = `https://www.strava.com/oauth/authorize?client_id=${id}&response_type=code&redirect_uri=http://localhost/exchange&approval_prompt=force&scope=read,activity:read_all`;
console.log("\n1. Open this link in your browser and click Authorize:\n\n" + url + "\n");
console.log("2. You will land on a localhost page that does not load. That is expected.");
console.log("   Copy the value after code= from the address bar.\n");

const rl = readline.createInterface({ input: stdin, output: stdout });
const code = (await rl.question("3. Paste the code here: ")).trim();
rl.close();

const res = await fetch("https://www.strava.com/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ client_id: id, client_secret: secret, code, grant_type: "authorization_code" }),
});
const json = await res.json();
if (!res.ok || !json.refresh_token) {
  console.error("Strava did not return a token:", json);
  process.exit(1);
}
console.log("\nAdd these three variables in Vercel (Settings > Environment Variables), then redeploy:\n");
console.log(`STRAVA_CLIENT_ID=${id}`);
console.log(`STRAVA_CLIENT_SECRET=${secret}`);
console.log(`STRAVA_REFRESH_TOKEN=${json.refresh_token}\n`);
console.log(`Authorized as ${json.athlete?.firstname ?? ""} ${json.athlete?.lastname ?? ""} (athlete ${json.athlete?.id ?? "?"}).`);
