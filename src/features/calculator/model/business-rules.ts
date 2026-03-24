import type {
  CalculatorState,
  ObjectType,
  RoomSelection,
  RoomType,
  WorkCategory,
} from "./schema";

export type ObjectProfile = {
  objectType: ObjectType;
  title: string;
  normalizedRooms: RoomSelection[];
  allowedWorks: WorkCategory[];
  defaultWorks: WorkCategory[];
  estimateMultiplier: number;
  timelineMultiplier: number;
};

const apartmentDefaultRooms: RoomSelection[] = [
  { type: "kitchen", quantity: 1 },
  { type: "bathroom", quantity: 1 },
  { type: "living-room", quantity: 1 },
  { type: "bedroom", quantity: 2 },
  { type: "corridor", quantity: 1 },
  { type: "balcony", quantity: 1 },
];

const profiles: Record<ObjectType, ObjectProfile> = {
  apartment: {
    objectType: "apartment",
    title: "Квартира целиком",
    normalizedRooms: apartmentDefaultRooms,
    allowedWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "ceilings",
      "wall-preparation",
      "painting",
      "tile",
      "flooring",
      "interior-doors",
      "entry-door",
      "windows",
      "kitchen-furniture",
      "custom-furniture",
      "bathroom-fixtures",
    ],
    defaultWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "wall-preparation",
      "painting",
      "tile",
      "flooring",
    ],
    estimateMultiplier: 1,
    timelineMultiplier: 1,
  },
  kitchen: {
    objectType: "kitchen",
    title: "Кухня",
    normalizedRooms: [{ type: "kitchen", quantity: 1 }],
    allowedWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "ceilings",
      "wall-preparation",
      "painting",
      "tile",
      "windows",
      "kitchen-furniture",
    ],
    defaultWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "wall-preparation",
      "tile",
      "kitchen-furniture",
    ],
    estimateMultiplier: 1.18,
    timelineMultiplier: 1.1,
  },
  bathroom: {
    objectType: "bathroom",
    title: "Ванная / санузел",
    normalizedRooms: [{ type: "bathroom", quantity: 1 }],
    allowedWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "ceilings",
      "wall-preparation",
      "tile",
      "bathroom-fixtures",
    ],
    defaultWorks: [
      "demolition",
      "plumbing",
      "electrical",
      "wall-preparation",
      "tile",
      "bathroom-fixtures",
    ],
    estimateMultiplier: 1.28,
    timelineMultiplier: 1.15,
  },
  room: {
    objectType: "room",
    title: "Отдельная комната",
    normalizedRooms: [{ type: "bedroom", quantity: 1 }],
    allowedWorks: [
      "demolition",
      "electrical",
      "ceilings",
      "wall-preparation",
      "painting",
      "flooring",
      "interior-doors",
      "windows",
      "custom-furniture",
    ],
    defaultWorks: ["demolition", "electrical", "wall-preparation", "painting", "flooring"],
    estimateMultiplier: 0.96,
    timelineMultiplier: 0.95,
  },
  "rough-only": {
    objectType: "rough-only",
    title: "Черновые работы",
    normalizedRooms: [{ type: "corridor", quantity: 1 }],
    allowedWorks: ["demolition", "plumbing", "electrical", "wall-preparation"],
    defaultWorks: ["demolition", "plumbing", "electrical", "wall-preparation"],
    estimateMultiplier: 0.78,
    timelineMultiplier: 0.82,
  },
};

export function getObjectProfile(objectType: ObjectType | null) {
  return objectType ? profiles[objectType] : null;
}

export function getAllowedWorksForObject(objectType: ObjectType | null) {
  return getObjectProfile(objectType)?.allowedWorks ?? [];
}

export function normalizeRoomsForObject(
  objectType: ObjectType | null,
  rooms: RoomSelection[],
  totalArea: number | null,
) {
  const profile = getObjectProfile(objectType);

  if (!profile) {
    return rooms;
  }

  if (objectType === "apartment") {
    return rooms.length > 0 ? rooms : profile.normalizedRooms;
  }

  if (objectType === "room") {
    return rooms.length > 0
      ? rooms
      : profile.normalizedRooms.map((room) => ({
          ...room,
          area: totalArea ?? undefined,
        }));
  }

  return profile.normalizedRooms.map((room) => ({
    ...room,
    area: totalArea ?? undefined,
  }));
}

export function sanitizeWorksForObject(
  objectType: ObjectType | null,
  works: WorkCategory[],
) {
  const allowed = new Set(getAllowedWorksForObject(objectType));
  return works.filter((work) => allowed.has(work));
}

export function getRecommendedWorksForObject(objectType: ObjectType | null) {
  return getObjectProfile(objectType)?.defaultWorks ?? [];
}

export function getRoomLabel(roomType: RoomType) {
  const labels: Record<RoomType, string> = {
    kitchen: "Кухня",
    bathroom: "Санузел",
    "living-room": "Гостиная",
    bedroom: "Спальня",
    corridor: "Коридор",
    balcony: "Балкон",
  };

  return labels[roomType];
}

export function buildNormalizedCalculatorState(
  state: CalculatorState,
): CalculatorState {
  const rooms = normalizeRoomsForObject(state.objectType, state.rooms, state.totalArea);
  const works = sanitizeWorksForObject(state.objectType, state.works);

  return {
    ...state,
    rooms,
    works,
  };
}
