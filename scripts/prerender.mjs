import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = (process.env.SITE_URL || "https://campaign.codebitbybit.com").replace(/\/+$/, "");
const SAME_AS = [
  "https://codebitbybit.com/",
  "https://odia-courses.codebitbybit.com/",
  "https://campaign.codebitbybit.com/",
];

const BOOTCAMP = {
  title: "FREE Odia AI Bootcamp — Learn AI, Build App, Make Game | CodeBitByBit",
  desc: "100% FREE AI Bootcamp in Odia + English. Learn ChatGPT, Gemini, Claude, ElevenLabs, Suno and Google Flow — and build your own mobile app, website and game. No coding needed.",
  ld: {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "FREE Odia AI Bootcamp",
    description: "100% FREE AI Bootcamp in Odia + English. Learn ChatGPT, Gemini, Claude, ElevenLabs, Suno and Google Flow — and build your own mobile app, website and game. No coding needed.",
    url: `${SITE}/free-odia-ai-bootcamp`,
    inLanguage: ["or", "en"],
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: "CodeBitByBit", sameAs: SAME_AS },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR", category: "Free", availability: "https://schema.org/InStock" },
  },
};

const routes = [
  {
    path: "/",
    out: "index.html",
    title: "CodeBitByBit — Learn AI in Odia, Build Real Apps",
    desc: "Free AI courses and workshops in Odia + English by CodeBitByBit. Join the FREE Odia AI Bootcamp — build your own app, website and game with AI tools. No coding needed.",
    url: `${SITE}/`,
    ld: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CodeBitByBit",
      url: `${SITE}/`,
      publisher: { "@type": "Organization", name: "CodeBitByBit", sameAs: SAME_AS },
    },
  },
  { path: "/free-odia-ai-bootcamp", out: "free-odia-ai-bootcamp/index.html", ...BOOTCAMP, url: `${SITE}/free-odia-ai-bootcamp` },
  {
    path: "/full-stack-ai-bootcamp",
    out: "full-stack-ai-bootcamp/index.html",
    title: "Full Stack AI App Developer Bootcamp (₹999) | CodeBitByBit",
    desc: "1 Month Live Online Bootcamp in Odia + English. Design, build, launch & monetise 3–4 real apps with AI. Includes NexoPlayer, Kathaa & StoryVerse source code bundle.",
    url: `${SITE}/full-stack-ai-bootcamp`,
    ld: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Full Stack AI App Developer Bootcamp",
      description: "1 Month Live Online Bootcamp in Odia + English. Design, build, launch & monetise 3–4 real apps with AI.",
      url: `${SITE}/full-stack-ai-bootcamp`,
      inLanguage: ["or", "en"],
      provider: { "@type": "Organization", name: "CodeBitByBit", sameAs: SAME_AS },
      offers: { "@type": "Offer", price: "999", priceCurrency: "INR", availability: "https://schema.org/InStock" },
    },
  },
];

function setMeta(html, { title, desc, url, ld }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/, `$1${JSON.stringify(ld)}$2`);
}

const { render } = await import(pathToFileURL(join(root, "dist-ssr/entry-server.js")).href);
const template = readFileSync(join(root, "dist/index.html"), "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("root marker not found in dist/index.html");

for (const route of routes) {
  const appHtml = render(route.path);
  const html = setMeta(template, route).replace(marker, `<div id="root">${appHtml}</div>`);
  const out = join(root, "dist", route.out);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`Prerendered ${route.path} -> ${route.out} (${appHtml.length} chars)`);
}
