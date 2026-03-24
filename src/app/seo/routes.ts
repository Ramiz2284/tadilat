import manifest from "./routes-manifest.json";

export const SITE_NAME = "Tadilat";
export const DEFAULT_SITE_URL = "https://ramiz2284.github.io/tadilat";
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
