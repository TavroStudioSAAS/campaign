# FREE Odia AI Bootcamp — Landing Page

Static React + Vite + Tailwind site, live at https://campaign.codebitbybit.com/

## Local development

- `npm install`
- `npm run dev` — local preview at http://localhost:5173
- `npm run build` — type-checks and outputs the static site to `dist/`

## Notes

- Hero video uses Video.js (`@videojs/react`). Its skin CSS uses cascade layers
  that conflict with Tailwind's PostCSS, so the prebuilt skin is vendored at
  `public/vendor/videojs-neutral-skin.css` (copied from
  `node_modules/@videojs/react/dist/default/presets/video/neutral-skin.css`).

## Deploy

Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) builds the site
and deploys `dist/` to GitHub Pages automatically. The custom domain is served
from `public/CNAME`, which is copied into the build output.
