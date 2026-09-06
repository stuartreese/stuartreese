- 👋 Hi, I’m @stuartreese
- 👀 I’m interested in people, data, and the outdoors
- 🌱 I’m currently learning SQL, R, and Python
- 💞️ I’m looking to collaborate on any project
- 📫 How to reach me instagram.com/stuartreese
- 😄 Pronouns: He
- ⚡ Fun fact: Big F1 guy.

---

## stuartreese.com

This repo also holds the source for my personal site, rebuilt from Carrd with Next.js and Tailwind. It deploys to Vercel.

### Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Edit the content

Everything on the page (roles, metrics, interests, links, copy) lives in one file: `src/content/site.ts`. Edit it and the site updates. The headshot is at `public/images/headshot.jpg` and the social share image at `src/app/opengraph-image.jpg`.

### Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project**, import the repo, and accept the defaults. Vercel detects Next.js automatically.
3. Add the custom domain `stuartreese.com` under **Settings > Domains** and point the DNS records Vercel gives you at your registrar (the same place Carrd's DNS records live today).

### Contact form (optional)

The form posts to `/api/contact` and sends email through [Resend](https://resend.com). Until it is configured, the form politely tells visitors to email directly.

1. Create a free Resend account and generate an API key.
2. In Vercel go to **Settings > Environment Variables** and add `RESEND_API_KEY`. Optionally set `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (see `.env.example`).
3. Redeploy.

### Live running stats (optional)

The "Running log" under Life Outside Work pulls from Strava. Until it is configured the section simply stays hidden.

1. Go to https://www.strava.com/settings/api and create an app. Any name works, and set the Authorization Callback Domain to `localhost`.
2. Copy the Client ID and Client Secret, then run this once on your laptop and follow the prompts:

   ```bash
   STRAVA_CLIENT_ID=xxxx STRAVA_CLIENT_SECRET=yyyy npm run strava:auth
   ```

3. Add the three values it prints (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`) in Vercel under **Settings > Environment Variables**, then redeploy.

Stats refresh about every 30 minutes.

### Resume PDF

`npm run build` generates `public/resume.pdf` from `src/content/site.ts` before every deploy, so the download at `/resume.pdf` always matches the site. Run `npm run resume` to regenerate it locally.

### Now section

Edit the `now` object in `src/content/site.ts` and bump its `updated` label whenever life changes.

### SEO

- Title, description, and social preview text live in `src/app/layout.tsx`. The share image is `src/app/opengraph-image.jpg`.
- `sitemap.xml` and `robots.txt` are generated automatically.
- A Person schema (JSON-LD) is embedded on the home page so Google can show a knowledge card.
- To verify with Google Search Console, choose the "HTML tag" method, copy just the `content` value, and add it in Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Redeploy, then click Verify.

### Light and dark mode

The sun/moon button in the nav switches themes. The choice is saved in the browser, and first-time visitors get whatever their device prefers. Dark mode uses the "by the numbers" forest green as its base. Both palettes live at the top of `src/app/globals.css`.

### Easter egg

Type `f1` anywhere on the page, or click "try the lights" in the Credentials section.

<!---
stuartreese/stuartreese is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
