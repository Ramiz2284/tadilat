import type { EstimateModifiers, WorkRate } from "./types";

export const estimateModifiers: EstimateModifiers = {
  material: {
    economy: 0.9,
    standard: 1,
    premium: 1.2,
  },
  execution: {
    basic: 0.95,
    good: 1,
    high: 1.15,
  },
  timeline: {
    fast: 1.1,
    standard: 1,
    "no-rush": 0.97,
  },
};

export const workRates: WorkRate[] = [
  {
    category: "demolition",
    label: "Демонтаж и вывоз",
    baseMinPerSquareMeter: 450,
    baseMaxPerSquareMeter: 900,
    roomFactors: {
      kitchen: 1.15,
      bathroom: 1.2,
      balcony: 1.05,
    },
    phase: "demolition",
  },
  {
    category: "plumbing",
    label: "Сантехника",
    baseMinPerSquareMeter: 900,
    baseMaxPerSquareMeter: 1800,
    roomFactors: {
      kitchen: 1.25,
      bathroom: 1.35,
    },
    phase: "engineering",
  },
  {
    category: "electrical",
    label: "Электрика",
    baseMinPerSquareMeter: 700,
    baseMaxPerSquareMeter: 1500,
    roomFactors: {
      kitchen: 1.15,
      bathroom: 1.1,
    },
    phase: "engineering",
  },
  {
    category: "ceilings",
    label: "Потолки",
    baseMinPerSquareMeter: 300,
    baseMaxPerSquareMeter: 850,
    roomFactors: {},
    phase: "finishing",
  },
  {
    category: "wall-preparation",
    label: "Подготовка стен",
    baseMinPerSquareMeter: 350,
    baseMaxPerSquareMeter: 1000,
    roomFactors: {},
    phase: "preparation",
  },
  {
    category: "painting",
    label: "Покраска и финиш стен",
    baseMinPerSquareMeter: 280,
    baseMaxPerSquareMeter: 780,
    roomFactors: {},
    phase: "finishing",
  },
  {
    category: "tile",
    label: "Плитка",
    baseMinPerSquareMeter: 850,
    baseMaxPerSquareMeter: 1800,
    roomFactors: {
      kitchen: 1.2,
      bathroom: 1.35,
      balcony: 1.1,
    },
    phase: "finishing",
  },
  {
    category: "flooring",
    label: "Ламинат или паркет",
    baseMinPerSquareMeter: 500,
    baseMaxPerSquareMeter: 1300,
    roomFactors: {
      corridor: 1.05,
      "living-room": 1.05,
    },
    phase: "finishing",
  },
  {
    category: "interior-doors",
    label: "Межкомнатные двери",
    baseMinPerSquareMeter: 150,
    baseMaxPerSquareMeter: 350,
    roomFactors: {},
    phase: "installation",
  },
  {
    category: "entry-door",
    label: "Входная дверь",
    baseMinPerSquareMeter: 120,
    baseMaxPerSquareMeter: 260,
    roomFactors: {},
    phase: "installation",
  },
  {
    category: "windows",
    label: "Окна",
    baseMinPerSquareMeter: 240,
    baseMaxPerSquareMeter: 620,
    roomFactors: {
      balcony: 1.15,
    },
    phase: "installation",
  },
  {
    category: "kitchen-furniture",
    label: "Кухонный гарнитур",
    baseMinPerSquareMeter: 850,
    baseMaxPerSquareMeter: 2200,
    roomFactors: {
      kitchen: 1.5,
    },
    phase: "installation",
  },
  {
    category: "custom-furniture",
    label: "Мебель на заказ",
    baseMinPerSquareMeter: 450,
    baseMaxPerSquareMeter: 1400,
    roomFactors: {
      bedroom: 1.1,
      "living-room": 1.1,
    },
    phase: "installation",
  },
  {
    category: "bathroom-fixtures",
    label: "Сантехника санузла",
    baseMinPerSquareMeter: 800,
    baseMaxPerSquareMeter: 1900,
    roomFactors: {
      bathroom: 1.55,
    },
    phase: "installation",
  },
];
