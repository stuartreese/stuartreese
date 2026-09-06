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

### Light and dark mode

The sun/moon button in the nav switches themes. The choice is saved in the browser, and first-time visitors get whatever their device prefers. Dark mode uses the "by the numbers" forest green as its base. Both palettes live at the top of `src/app/globals.css`.

### Easter egg

Type `f1` anywhere on the page, or click "try the lights" in the Credentials section.

<!---
stuartreese/stuartreese is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
