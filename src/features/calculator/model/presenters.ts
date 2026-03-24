import type {
  CalculatorState,
  ExecutionTier,
  MaterialTier,
  ObjectType,
  TimelinePreference,
} from "./schema";
import {
  executionTierOptions,
  materialTierOptions,
  objectTypeOptions,
  timelineOptions,
  workCategoryOptions,
} from "./steps";

export function getObjectTypeLabel(stepValue: ObjectType | null) {
  return objectTypeOptions.find((option) => option.value === stepValue)?.label ?? "Не выбран";
}

export function getMaterialLabel(stepValue: MaterialTier) {
  return materialTierOptions.find((option) => option.value === stepValue)?.label ?? "Стандарт";
}

export function getExecutionLabel(stepValue: ExecutionTier) {
  return (
    executionTierOptions.find((option) => option.value === stepValue)?.label ??
    "Хороший уровень"
  );
}

export function getTimelineLabel(stepValue: TimelinePreference) {
  return (
    timelineOptions.find((option) => option.value === stepValue)?.label ??
    "Стандартный темп"
  );
}

export function getWorkNames(state: Pick<CalculatorState, "works">) {
  return workCategoryOptions
    .filter((option) => state.works.includes(option.value))
    .map((option) => option.label);
}
