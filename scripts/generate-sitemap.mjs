import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import manifest from "../src/app/seo/routes-manifest.json" with { type: "json" };

const siteUrl = "https://tadilat-henna.vercel.app";
const outputPath = resolve(process.cwd(), "public", "sitemap.xml");

const indexedRoutes = manifest.filter((route) => route.index);
const routesByPageId = new Map();

for (const route of indexedRoutes) {
  const group = routesByPageId.get(route.pageId) ?? [];
  group.push(route);
  routesByPageId.set(route.pageId, group);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexedRoutes
  .map((route) => {
    const alternates = routesByPageId.get(route.pageId) ?? [];
    return `  <url>
    <loc>${siteUrl}${route.path}</loc>
${alternates
  .map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${alternate.language}" href="${siteUrl}${alternate.path}" />`,
  )
  .join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${alternates.find((item) => item.language === "ru")?.path ?? route.path}" />
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, xml, "utf8");
console.log(`Generated sitemap: ${outputPath}`);
