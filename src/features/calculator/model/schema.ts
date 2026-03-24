import type { Language } from "../../../shared/i18n";

export type ObjectType =
  | "apartment"
  | "kitchen"
  | "bathroom"
  | "room"
  | "rough-only";

export type RoomType =
  | "kitchen"
  | "bathroom"
  | "living-room"
  | "bedroom"
  | "corridor"
  | "balcony";

export type WorkCategory =
  | "demolition"
  | "plumbing"
  | "electrical"
  | "ceilings"
  | "wall-preparation"
  | "painting"
  | "tile"
  | "flooring"
  | "interior-doors"
  | "entry-door"
  | "windows"
  | "kitchen-furniture"
  | "custom-furniture"
  | "bathroom-fixtures";

export type MaterialTier = "economy" | "standard" | "premium";
export type ExecutionTier = "basic" | "good" | "high";
export type TimelinePreference = "fast" | "standard" | "no-rush";

export type RoomSelection = {
  type: RoomType;
  quantity: number;
  area?: number;
};

export type CalculatorState = {
  objectType: ObjectType | null;
  totalArea: number | null;
  rooms: RoomSelection[];
  works: WorkCategory[];
  materialTier: MaterialTier;
  executionTier: ExecutionTier;
  timelinePreference: TimelinePreference;
  notes: string;
};

export const defaultCalculatorState: CalculatorState = {
  objectType: null,
  totalArea: null,
  rooms: [],
  works: [],
  materialTier: "standard",
  executionTier: "good",
  timelinePreference: "standard",
  notes: "",
};

export type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof CalculatorState, string>>;
};

const validationCopy: Record<Language, Record<string, string>> = {
  ru: {
    objectType: "Выберите тип объекта.",
    totalArea: "Укажите площадь больше 0 м².",
    rooms: "Выберите хотя бы одно помещение.",
    works: "Выберите хотя бы один вид работ.",
  },
  tr: {
    objectType: "Mulk tipini secin.",
    totalArea: "0 m²'den buyuk bir alan girin.",
    rooms: "En az bir mekan secin.",
    works: "En az bir is kalemi secin.",
  },
  en: {
    objectType: "Choose a property type.",
    totalArea: "Enter an area greater than 0 m².",
    rooms: "Choose at least one room.",
    works: "Choose at least one work category.",
  },
};

export function validateCalculatorState(
  state: CalculatorState,
  language: Language,
): ValidationResult {
  const copy = validationCopy[language];
  const errors: ValidationResult["errors"] = {};

  if (!state.objectType) {
    errors.objectType = copy.objectType;
  }

  if (!state.totalArea || state.totalArea <= 0) {
    errors.totalArea = copy.totalArea;
  }

  if (
    state.objectType !== "rough-only" &&
    state.objectType !== "kitchen" &&
    state.objectType !== "bathroom" &&
    state.rooms.length === 0
  ) {
    errors.rooms = copy.rooms;
  }

  if (state.works.length === 0) {
    errors.works = copy.works;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
