import type { Language } from "../../../shared/i18n";
import {
  buildNormalizedCalculatorState,
  getCalculatorCopy,
  getObjectTypeLabel,
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

const phaseCopy: Record<Language, Record<EstimatePhaseId, { title: string; description: string }>> = {
  ru: {
    demolition: {
      title: "Демонтаж и вывоз",
      description: "Снятие старых покрытий, подготовка объекта и вывоз мусора.",
    },
    engineering: {
      title: "Инженерные работы",
      description: "Электрика, сантехника и другие скрытые инженерные работы.",
    },
    preparation: {
      title: "Подготовка оснований",
      description: "Выравнивание, подготовка стен и оснований под финиш.",
    },
    finishing: {
      title: "Чистовая отделка",
      description: "Плитка, окраска, полы, потолки и чистовые покрытия.",
    },
    installation: {
      title: "Установка и финальная сборка",
      description: "Двери, сантехника, мебель и финальная сборка.",
    },
  },
  tr: {
    demolition: {
      title: "Sokum ve atim",
      description: "Eski kaplamalarin sokulmesi, alanin hazirlanmasi ve moloz atimi.",
    },
    engineering: {
      title: "Tesisat isleri",
      description: "Elektrik, su tesisati ve diger gizli altyapi isleri.",
    },
    preparation: {
      title: "Yuzey hazirligi",
      description: "Duzeltme, duvar hazirligi ve son kat oncesi alt yapi.",
    },
    finishing: {
      title: "Son kat bitis",
      description: "Seramik, boya, zemin, tavan ve diger gorunen bitisler.",
    },
    installation: {
      title: "Montaj ve final toplama",
      description: "Kapilar, vitrifiye, mobilya ve son montaj asamasi.",
    },
  },
  en: {
    demolition: {
      title: "Demolition and disposal",
      description: "Removal of old finishes, site preparation and waste disposal.",
    },
    engineering: {
      title: "Engineering works",
      description: "Electrical, plumbing and other hidden infrastructure works.",
    },
    preparation: {
      title: "Surface preparation",
      description: "Levelling and preparation of walls and substrates for finish.",
    },
    finishing: {
      title: "Final finishing",
      description: "Tile, paint, floors, ceilings and other visible finishes.",
    },
    installation: {
      title: "Installation and final assembly",
      description: "Doors, fixtures, furniture and final assembly.",
    },
  },
};

const riskFactorsByLanguage: Record<Language, string[]> = {
  ru: [
    "Состояние стен, пола и основания после демонтажа",
    "Перенос мокрых точек и изменение инженерных трасс",
    "Выбранные бренды и уровень материалов",
    "Нестандартные размеры мебели, дверей и окон",
    "Дополнительные работы, которые становятся видны после вскрытия старой отделки",
  ],
  tr: [
    "Sokumdan sonra duvar, zemin ve alt yuzeylerin durumu",
    "Islak nokta tasimalari ve tesisat hatlarindaki degisiklikler",
    "Secilen marka ve malzeme seviyesi",
    "Mobilya, kapi ve pencere icin olcuye ozel cozumler",
    "Eski bitis acildiktan sonra ortaya cikan ek isler",
  ],
  en: [
    "Condition of walls, floors and base layers after demolition",
    "Relocation of wet points and engineering routes",
    "Selected brands and material level",
    "Custom sizes for furniture, doors and windows",
    "Additional works revealed after opening old finishes",
  ],
};

const emptyRoomSummaryByLanguage: Record<Language, string> = {
  ru: "без детализации по помещениям",
  tr: "mekan detayi olmadan",
  en: "without room-level detail",
};

const summaryTitleByLanguage: Record<Language, string> = {
  ru: "Ваш предварительный расчет ремонта",
  tr: "On tadilat hesabinız",
  en: "Your preliminary renovation estimate",
};

const objectTypeAreaLabelByLanguage: Record<Language, string> = {
  ru: "Объект",
  tr: "Mulk",
  en: "Property",
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
  language: Language,
): Estimate["timeline"] {
  const areaFactor = Math.max(totalArea / 40, 1);
  const complexityFactor = Math.max(selectedPhases.length / 2, 1);
  const labels = phaseCopy[language];

  const rawPhases: EstimatePhase[] = [
    {
      id: "demolition",
      title: labels.demolition.title,
      minDays: Math.round(2 * areaFactor),
      maxDays: Math.round(4 * areaFactor),
      description: labels.demolition.description,
    },
    {
      id: "engineering",
      title: labels.engineering.title,
      minDays: Math.round(4 * complexityFactor),
      maxDays: Math.round(9 * complexityFactor),
      description: labels.engineering.description,
    },
    {
      id: "preparation",
      title: labels.preparation.title,
      minDays: Math.round(4 * areaFactor),
      maxDays: Math.round(8 * areaFactor),
      description: labels.preparation.description,
    },
    {
      id: "finishing",
      title: labels.finishing.title,
      minDays: Math.round(7 * areaFactor),
      maxDays: Math.round(14 * areaFactor),
      description: labels.finishing.description,
    },
    {
      id: "installation",
      title: labels.installation.title,
      minDays: Math.round(3 * complexityFactor),
      maxDays: Math.round(7 * complexityFactor),
      description: labels.installation.description,
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

export function calculateEstimate(inputState: CalculatorState, language: Language): Estimate {
  const state = buildNormalizedCalculatorState(inputState);
  const totalArea = state.totalArea ?? 0;
  const materialModifier = estimateModifiers.material[state.materialTier];
  const executionModifier = estimateModifiers.execution[state.executionTier];
  const timelineModifier = estimateModifiers.timeline[state.timelinePreference];
  const objectProfile = getObjectProfile(state.objectType);
  const selectedRooms = distributeArea(totalArea, state.rooms);
  const workLabels = getCalculatorCopy(language).workCategoryOptions;

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
    language,
  );
  const roomSummary =
    selectedRooms.length > 0
      ? selectedRooms.map((room) => getRoomLabel(room.type, language)).join(", ")
      : emptyRoomSummaryByLanguage[language];
  const objectLabel = state.objectType
    ? getObjectTypeLabel(state.objectType, language)
    : objectTypeAreaLabelByLanguage[language];

  return {
    source: state,
    summary: {
      title: summaryTitleByLanguage[language],
      subtitle: `${objectLabel} ${totalArea} m² · ${roomSummary}`,
    },
    estimate: {
      min: estimateMin,
      max: estimateMax,
      currency: "TL",
    },
    selectedWorks: workLabels
      .filter((work) => state.works.includes(work.value))
      .map((work) => work.label),
    timeline,
    riskFactors: riskFactorsByLanguage[language],
  };
}
