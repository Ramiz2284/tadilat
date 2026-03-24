import manifest from "./routes-manifest.json";

export const SITE_NAME = "Tadilat";
export const DEFAULT_SITE_URL = "https://tadilat-henna.vercel.app";
export const DEFAULT_OG_IMAGE = "/og-default.svg";

export type SeoRouteEntry = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
  index: boolean;
};

export const allSeoRoutes = manifest as SeoRouteEntry[];
export const staticSeoRoutes = allSeoRoutes.filter((route) => !route.path.startsWith("/guides/"));
export const scenarioSeoRoutes = allSeoRoutes.filter((route) => route.path.startsWith("/guides/"));
