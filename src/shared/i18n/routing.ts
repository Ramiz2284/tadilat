import type { Language } from "./config";

export type ScenarioId =
  | "apartment-renovation"
  | "kitchen-renovation"
  | "bathroom-renovation";

export type AppRouteKey = "home" | "calculator" | "faq" | "result" | "guide";

const prefixes: Record<Language, string> = {
  ru: "",
  tr: "tr",
  en: "en",
};

const staticSegments: Record<Language, Record<Exclude<AppRouteKey, "guide">, string>> = {
  ru: {
    home: "",
    calculator: "kalkulyator",
    faq: "faq",
    result: "rezultat",
  },
  tr: {
    home: "",
    calculator: "hesaplayici",
    faq: "sss",
    result: "sonuc",
  },
  en: {
    home: "",
    calculator: "calculator",
    faq: "faq",
    result: "result",
  },
};

const guideSegments: Record<Language, string> = {
  ru: "gidy",
  tr: "rehberler",
  en: "guides",
};

export const scenarioSlugs: Record<Language, Record<ScenarioId, string>> = {
  ru: {
    "apartment-renovation": "remont-kvartiry",
    "kitchen-renovation": "remont-kuhni",
    "bathroom-renovation": "remont-sanuzla",
  },
  tr: {
    "apartment-renovation": "daire-tadilati",
    "kitchen-renovation": "mutfak-tadilati",
    "bathroom-renovation": "banyo-tadilati",
  },
  en: {
    "apartment-renovation": "apartment-renovation",
    "kitchen-renovation": "kitchen-renovation",
    "bathroom-renovation": "bathroom-renovation",
  },
};

function joinPath(...parts: string[]) {
  const joined = parts.filter(Boolean).join("/");
  return joined ? `/${joined}` : "/";
}

export function getRoutePath(
  language: Language,
  routeKey: Exclude<AppRouteKey, "guide">,
) {
  return joinPath(prefixes[language], staticSegments[language][routeKey]);
}

export function getGuidePath(language: Language, scenarioId: ScenarioId) {
  return joinPath(prefixes[language], guideSegments[language], scenarioSlugs[language][scenarioId]);
}

export function getGuidePathBySlug(language: Language, slug: string) {
  return joinPath(prefixes[language], guideSegments[language], slug);
}

export function getScenarioIdBySlug(language: Language, slug: string) {
  const entries = Object.entries(scenarioSlugs[language]) as Array<[ScenarioId, string]>;
  return entries.find(([, localizedSlug]) => localizedSlug === slug)?.[0] ?? null;
}

export function getLanguageFromPathname(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "tr" || first === "en") {
    return first;
  }
  return "ru";
}

export function translatePathname(pathname: string, targetLanguage: Language) {
  const sourceLanguage = getLanguageFromPathname(pathname);
  const segments = pathname.split("/").filter(Boolean);
  const scopedSegments = sourceLanguage === "ru" ? segments : segments.slice(1);

  if (scopedSegments.length === 0) {
    return getRoutePath(targetLanguage, "home");
  }

  const [first, second] = scopedSegments;
  const staticEntries = Object.entries(staticSegments[sourceLanguage]) as Array<
    [Exclude<AppRouteKey, "guide">, string]
  >;
  const staticMatch = staticEntries.find(([, segment]) => segment === first);

  if (staticMatch) {
    return getRoutePath(targetLanguage, staticMatch[0]);
  }

  if (first === guideSegments[sourceLanguage] && second) {
    const scenarioId = getScenarioIdBySlug(sourceLanguage, second);
    return scenarioId ? getGuidePath(targetLanguage, scenarioId) : getRoutePath(targetLanguage, "home");
  }

  return getRoutePath(targetLanguage, "home");
}

export function getAlternatesForRoute(
  routeKey: AppRouteKey,
  options?: { scenarioId?: ScenarioId },
) {
  const entries = (["ru", "tr", "en"] as const).map((language) => ({
    hrefLang: language,
    path:
      routeKey === "guide" && options?.scenarioId
        ? getGuidePath(language, options.scenarioId)
        : getRoutePath(language, routeKey as Exclude<AppRouteKey, "guide">),
  }));

  return [
    ...entries,
    {
      hrefLang: "x-default",
      path:
        routeKey === "guide" && options?.scenarioId
          ? getGuidePath("ru", options.scenarioId)
          : getRoutePath("ru", routeKey as Exclude<AppRouteKey, "guide">),
    },
  ];
}
