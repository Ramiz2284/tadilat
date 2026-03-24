export const languages = ["ru", "tr", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "ru";
export const languageStorageKey = "tadilat-language";
export const localeRedirectStorageKey = "tadilat-locale-redirected";

export const languageLabels: Record<Language, string> = {
  ru: "RU",
  tr: "TR",
  en: "EN",
};

export const localeByLanguage: Record<Language, string> = {
  ru: "ru-RU",
  tr: "tr-TR",
  en: "en-US",
};
