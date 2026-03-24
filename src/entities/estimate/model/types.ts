import type {
  CalculatorState,
  RoomType,
  TimelinePreference,
  WorkCategory,
} from "../../../features/calculator/model/schema";

export type EstimatePhaseId =
  | "demolition"
  | "engineering"
  | "preparation"
  | "finishing"
  | "installation";

export type EstimatePhase = {
  id: EstimatePhaseId;
  title: string;
  minDays: number;
  maxDays: number;
  description: string;
};

export type WorkRate = {
  category: WorkCategory;
  label: string;
  baseMinPerSquareMeter: number;
  baseMaxPerSquareMeter: number;
  roomFactors: Partial<Record<RoomType, number>>;
  phase: EstimatePhaseId;
};

export type Estimate = {
  source: CalculatorState;
  summary: {
    title: string;
    subtitle: string;
  };
  estimate: {
    min: number;
    max: number;
    currency: "TL";
  };
  selectedWorks: string[];
  timeline: {
    totalMinDays: number;
    totalMaxDays: number;
    phases: EstimatePhase[];
  };
  riskFactors: string[];
};

export type EstimateModifiers = {
  material: Record<CalculatorState["materialTier"], number>;
  execution: Record<CalculatorState["executionTier"], number>;
  timeline: Record<TimelinePreference, number>;
};
