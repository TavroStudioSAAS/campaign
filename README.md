# FREE Odia AI Bootcamp — Landing Page

Static React + Vite + Tailwind site, live at https://campaign.codebitbybit.com/

## Local development

- `npm install`
- `npm run dev` — local preview at http://localhost:5173
- `npm run build` — type-checks and outputs the static site to `dist/`

## Deploy

Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) builds the site
and deploys `dist/` to GitHub Pages automatically. The custom domain is served
from `public/CNAME`, which is copied into the build output.
