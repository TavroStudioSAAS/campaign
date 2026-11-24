import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const { render } = await import(pathToFileURL(join(root, "dist-ssr/entry-server.js")).href);
const appHtml = render();

const indexPath = join(root, "dist/index.html");
const template = readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("root marker not found in dist/index.html");
writeFileSync(indexPath, template.replace(marker, `<div id="root">${appHtml}</div>`));
console.log(`Prerendered ${appHtml.length} chars into dist/index.html`);
