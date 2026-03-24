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

export function validateCalculatorState(
  state: CalculatorState,
): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!state.objectType) {
    errors.objectType = "Выберите тип объекта.";
  }

  if (!state.totalArea || state.totalArea <= 0) {
    errors.totalArea = "Укажите площадь больше 0 м².";
  }

  if (
    state.objectType !== "rough-only" &&
    state.objectType !== "kitchen" &&
    state.objectType !== "bathroom" &&
    state.rooms.length === 0
  ) {
    errors.rooms = "Выберите хотя бы одно помещение.";
  }

  if (state.works.length === 0) {
    errors.works = "Выберите хотя бы один вид работ.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
