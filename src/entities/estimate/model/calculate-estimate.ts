import {
  buildNormalizedCalculatorState,
  getObjectProfile,
  getRoomLabel,
} from "../../../features/calculator/model";
import type {
  CalculatorState,
  RoomSelection,
  RoomType,
  WorkCategory,
} from "../../../features/calculator/model/schema";
import { estimateModifiers, workRates } from "./catalog";
import type { Estimate, EstimatePhase, EstimatePhaseId } from "./types";

const phaseOrder: EstimatePhaseId[] = [
  "demolition",
  "engineering",
  "preparation",
  "finishing",
  "installation",
];

const phaseTitles: Record<EstimatePhaseId, string> = {
  demolition: "Демонтаж и вывоз",
  engineering: "Инженерные работы",
  preparation: "Подготовка оснований",
  finishing: "Чистовая отделка",
  installation: "Установка и финальная сборка",
};

const roomAreaWeights: Record<RoomType, number> = {
  kitchen: 1.1,
  bathroom: 0.75,
  "living-room": 1.35,
  bedroom: 1,
  corridor: 0.7,
  balcony: 0.45,
};

const workApplicability: Record<WorkCategory, RoomType[]> = {
  demolition: ["kitchen", "bathroom", "living-room", "bedroom", "corridor", "balcony"],
  plumbing: ["kitchen", "bathroom"],
  electrical: ["kitchen", "bathroom", "living-room", "bedroom", "corridor", "balcony"],
  ceilings: ["kitchen", "bathroom", "living-room", "bedroom", "corridor"],
  "wall-preparation": ["kitchen", "bathroom", "living-room", "bedroom", "corridor", "balcony"],
  painting: ["kitchen", "living-room", "bedroom", "corridor", "balcony"],
  tile: ["kitchen", "bathroom", "corridor", "balcony"],
  flooring: ["living-room", "bedroom", "corridor"],
  "interior-doors": ["living-room", "bedroom", "corridor", "kitchen"],
  "entry-door": ["corridor"],
  windows: ["living-room", "bedroom", "kitchen", "balcony"],
  "kitchen-furniture": ["kitchen"],
  "custom-furniture": ["living-room", "bedroom", "corridor"],
  "bathroom-fixtures": ["bathroom"],
};

function getRoomFactor(roomType: RoomType, fallback = 1) {
  return fallback + (roomType === "kitchen" || roomType === "bathroom" ? 0.15 : 0);
}

function distributeArea(totalArea: number, rooms: RoomSelection[]) {
  const explicitArea = rooms.reduce((sum, room) => sum + (room.area ?? 0), 0);
  const missingAreaRooms = rooms.filter((room) => !room.area);
  const remaining = Math.max(totalArea - explicitArea, 0);
  const totalWeight = missingAreaRooms.reduce(
    (sum, room) => sum + roomAreaWeights[room.type] * Math.max(room.quantity, 1),
    0,
  );

  return rooms.map((room) => ({
    ...room,
    area:
      room.area ??
      (totalWeight > 0
        ? (remaining * roomAreaWeights[room.type] * Math.max(room.quantity, 1)) / totalWeight
        : 0),
  }));
}

function doesWorkApplyToRoom(category: WorkCategory, roomType: RoomType) {
  return workApplicability[category].includes(roomType);
}

function buildTimeline(
  totalArea: number,
  selectedPhases: EstimatePhaseId[],
  timelineModifier: number,
  objectTimelineMultiplier: number,
): Estimate["timeline"] {
  const areaFactor = Math.max(totalArea / 40, 1);
  const complexityFactor = Math.max(selectedPhases.length / 2, 1);

  const rawPhases: EstimatePhase[] = [
    {
      id: "demolition",
      title: phaseTitles.demolition,
      minDays: Math.round(2 * areaFactor),
      maxDays: Math.round(4 * areaFactor),
      description: "Снятие старых покрытий, подготовка объекта и вывоз мусора.",
    },
    {
      id: "engineering",
      title: phaseTitles.engineering,
      minDays: Math.round(4 * complexityFactor),
      maxDays: Math.round(9 * complexityFactor),
      description: "Электрика, сантехника и другие скрытые инженерные работы.",
    },
    {
      id: "preparation",
      title: phaseTitles.preparation,
      minDays: Math.round(4 * areaFactor),
      maxDays: Math.round(8 * areaFactor),
      description: "Выравнивание, подготовка стен и оснований под финиш.",
    },
    {
      id: "finishing",
      title: phaseTitles.finishing,
      minDays: Math.round(7 * areaFactor),
      maxDays: Math.round(14 * areaFactor),
      description: "Плитка, окраска, полы, потолки и чистовые покрытия.",
    },
    {
      id: "installation",
      title: phaseTitles.installation,
      minDays: Math.round(3 * complexityFactor),
      maxDays: Math.round(7 * complexityFactor),
      description: "Двери, сантехника, мебель и финальная сборка.",
    },
  ];

  const phases = rawPhases
    .filter((phase) => selectedPhases.includes(phase.id))
    .map((phase) => ({
      ...phase,
      minDays: Math.max(
        Math.round((phase.minDays * objectTimelineMultiplier) / timelineModifier),
        1,
      ),
      maxDays: Math.max(
        Math.round((phase.maxDays * objectTimelineMultiplier) / timelineModifier),
        phase.minDays,
      ),
    }))
    .sort((left, right) => phaseOrder.indexOf(left.id) - phaseOrder.indexOf(right.id));

  return {
    totalMinDays: phases.reduce((sum, phase) => sum + phase.minDays, 0),
    totalMaxDays: phases.reduce((sum, phase) => sum + phase.maxDays, 0),
    phases,
  };
}

export function calculateEstimate(inputState: CalculatorState): Estimate {
  const state = buildNormalizedCalculatorState(inputState);
  const totalArea = state.totalArea ?? 0;
  const materialModifier = estimateModifiers.material[state.materialTier];
  const executionModifier = estimateModifiers.execution[state.executionTier];
  const timelineModifier = estimateModifiers.timeline[state.timelinePreference];
  const objectProfile = getObjectProfile(state.objectType);
  const selectedRooms = distributeArea(totalArea, state.rooms);

  let estimateMin = 0;
  let estimateMax = 0;
  const selectedPhaseIds = new Set<EstimatePhaseId>();

  for (const work of workRates) {
    if (!state.works.includes(work.category)) {
      continue;
    }

    for (const room of selectedRooms) {
      if (!doesWorkApplyToRoom(work.category, room.type)) {
        continue;
      }

      const roomArea = room.area ?? totalArea;
      const roomFactor = work.roomFactors[room.type] ?? getRoomFactor(room.type, 1);
      const quantityFactor = room.quantity || 1;

      estimateMin += work.baseMinPerSquareMeter * roomArea * roomFactor * quantityFactor;
      estimateMax += work.baseMaxPerSquareMeter * roomArea * roomFactor * quantityFactor;
    }

    selectedPhaseIds.add(work.phase);
  }

  const objectEstimateMultiplier = objectProfile?.estimateMultiplier ?? 1;
  const totalModifier =
    materialModifier * executionModifier * timelineModifier * objectEstimateMultiplier;

  estimateMin = Math.round(estimateMin * totalModifier);
  estimateMax = Math.round(estimateMax * totalModifier);

  const timeline = buildTimeline(
    totalArea,
    [...selectedPhaseIds],
    timelineModifier,
    objectProfile?.timelineMultiplier ?? 1,
  );
  const roomSummary =
    selectedRooms.length > 0
      ? selectedRooms.map((room) => getRoomLabel(room.type)).join(", ")
      : "без детализации по помещениям";

  return {
    source: state,
    summary: {
      title: "Ваш предварительный расчет ремонта",
      subtitle:
        state.objectType === "apartment"
          ? `Квартира ${totalArea} м² · ${roomSummary}`
          : `${objectProfile?.title ?? "Объект"} ${totalArea} м² · ${roomSummary}`,
    },
    estimate: {
      min: estimateMin,
      max: estimateMax,
      currency: "TL",
    },
    selectedWorks: workRates
      .filter((work) => state.works.includes(work.category))
      .map((work) => work.label),
    timeline,
    riskFactors: [
      "Состояние стен, пола и основания после демонтажа",
      "Перенос мокрых точек и изменение инженерных трасс",
      "Выбранные бренды и уровень материалов",
      "Нестандартные размеры мебели, дверей и окон",
      "Дополнительные работы, которые становятся видны после вскрытия старой отделки",
    ],
  };
}
