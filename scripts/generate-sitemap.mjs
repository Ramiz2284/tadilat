import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import manifest from "../src/app/seo/routes-manifest.json" with { type: "json" };

const siteUrl = "https://tadilat-henna.vercel.app";
const outputPath = resolve(process.cwd(), "public", "sitemap.xml");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${manifest
  .filter((route) => route.index)
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, xml, "utf8");
console.log(`Generated sitemap: ${outputPath}`);
