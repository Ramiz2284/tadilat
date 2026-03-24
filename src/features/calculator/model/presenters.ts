import type { Language } from "../../../shared/i18n";
import type {
  CalculatorState,
  ExecutionTier,
  MaterialTier,
  ObjectType,
  TimelinePreference,
} from "./schema";
import { getCalculatorCopy } from "./steps";

export function getObjectTypeLabel(stepValue: ObjectType | null, language: Language) {
  return (
    getCalculatorCopy(language).objectTypeOptions.find((option) => option.value === stepValue)
      ?.label ??
    {
      ru: "Не выбран",
      tr: "Secilmedi",
      en: "Not selected",
    }[language]
  );
}

export function getMaterialLabel(stepValue: MaterialTier, language: Language) {
  return (
    getCalculatorCopy(language).materialTierOptions.find((option) => option.value === stepValue)
      ?.label ??
    {
      ru: "Стандарт",
      tr: "Standart",
      en: "Standard",
    }[language]
  );
}

export function getExecutionLabel(stepValue: ExecutionTier, language: Language) {
  return (
    getCalculatorCopy(language).executionTierOptions.find((option) => option.value === stepValue)
      ?.label ??
    {
      ru: "Хороший уровень",
      tr: "Iyi seviye",
      en: "Good level",
    }[language]
  );
}

export function getTimelineLabel(stepValue: TimelinePreference, language: Language) {
  return (
    getCalculatorCopy(language).timelineOptions.find((option) => option.value === stepValue)
      ?.label ??
    {
      ru: "Стандартный темп",
      tr: "Standart tempo",
      en: "Standard pace",
    }[language]
  );
}

export function getWorkNames(state: Pick<CalculatorState, "works">, language: Language) {
  return getCalculatorCopy(language).workCategoryOptions
    .filter((option) => state.works.includes(option.value))
    .map((option) => option.label);
}
