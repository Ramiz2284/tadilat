import type {
  CalculatorState,
  ExecutionTier,
  MaterialTier,
  ObjectType,
  RoomType,
  TimelinePreference,
  WorkCategory,
} from "./schema";

export type CalculatorStepId =
  | "object-type"
  | "area"
  | "rooms"
  | "works"
  | "materials"
  | "execution"
  | "timeline"
  | "result";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export type CalculatorStep = {
  id: CalculatorStepId;
  title: string;
  description: string;
  isVisible?: (state: CalculatorState) => boolean;
  canProceed?: (state: CalculatorState) => boolean;
};

export const objectTypeOptions: SelectOption<ObjectType>[] = [
  {
    value: "apartment",
    label: "Квартира целиком",
    description: "Полный расчет по всей квартире с помещениями и этапами.",
  },
  {
    value: "kitchen",
    label: "Кухня",
    description: "Отдельный расчет кухни с отделкой, инженерией и мебелью.",
  },
  {
    value: "bathroom",
    label: "Ванная / санузел",
    description: "Локальный расчет по мокрой зоне с повышенной сложностью.",
  },
  {
    value: "room",
    label: "Отдельная комната",
    description: "Подходит для спальни, гостиной или другой одной зоны.",
  },
  {
    value: "rough-only",
    label: "Только черновые работы",
    description: "Для сценария, где нужно понять основу до чистовой отделки.",
  },
];

export const roomOptions: SelectOption<RoomType>[] = [
  {
    value: "kitchen",
    label: "Кухня",
    description: "Плитка, инженерия, мебель, зона повышенной нагрузки.",
  },
  {
    value: "bathroom",
    label: "Санузел",
    description: "Мокрая зона с самой высокой чувствительностью к ошибкам.",
  },
  {
    value: "living-room",
    label: "Гостиная",
    description: "Основная жилая зона с чистовой отделкой и полами.",
  },
  {
    value: "bedroom",
    label: "Спальня",
    description: "Сухая комната с более простым набором работ.",
  },
  {
    value: "corridor",
    label: "Коридор",
    description: "Связующая зона, где часто добавляются двери и напольные работы.",
  },
  {
    value: "balcony",
    label: "Балкон",
    description: "Отдельная зона с частой плиткой и оконными работами.",
  },
];

export const workCategoryOptions: SelectOption<WorkCategory>[] = [
  {
    value: "demolition",
    label: "Демонтаж и вывоз",
    description: "Снятие старых покрытий, сантехники, дверей и вывоз мусора.",
  },
  {
    value: "plumbing",
    label: "Сантехника",
    description: "Замена труб, разводка и перенос мокрых точек.",
  },
  {
    value: "electrical",
    label: "Электрика",
    description: "Новая проводка, точки освещения, выключатели и розетки.",
  },
  {
    value: "ceilings",
    label: "Потолки",
    description: "Выравнивание, подготовка, окраска или подвесные решения.",
  },
  {
    value: "wall-preparation",
    label: "Подготовка стен",
    description: "Штукатурка, выравнивание и база под финишную отделку.",
  },
  {
    value: "painting",
    label: "Покраска / финиш стен",
    description: "Окраска или другой чистовой финиш по подготовленной поверхности.",
  },
  {
    value: "tile",
    label: "Плитка",
    description: "Стены и полы в кухне, санузле, балконе и других зонах.",
  },
  {
    value: "flooring",
    label: "Ламинат / паркет",
    description: "Подложка, укладка и базовые напольные работы.",
  },
  {
    value: "interior-doors",
    label: "Межкомнатные двери",
    description: "Поставка и монтаж дверных блоков внутри квартиры.",
  },
  {
    value: "entry-door",
    label: "Входная дверь",
    description: "Замена или установка входной двери.",
  },
  {
    value: "windows",
    label: "Окна",
    description: "Замена оконных блоков, откосов и сопутствующих работ.",
  },
  {
    value: "kitchen-furniture",
    label: "Кухонный гарнитур",
    description: "Мебель и монтаж кухонной зоны.",
  },
  {
    value: "custom-furniture",
    label: "Мебель на заказ",
    description: "Шкафы, встроенные решения и нестандартные позиции.",
  },
  {
    value: "bathroom-fixtures",
    label: "Сантехника санузла",
    description: "Инсталляции, ванна, душ, унитаз, раковина и аксессуары.",
  },
];

export const materialTierOptions: SelectOption<MaterialTier>[] = [
  {
    value: "economy",
    label: "Эконом",
    description: "Базовые материалы и решения без лишних затрат.",
  },
  {
    value: "standard",
    label: "Стандарт",
    description: "Оптимальный баланс цены, внешнего вида и ресурса.",
  },
  {
    value: "premium",
    label: "Премиум",
    description: "Более дорогие материалы, бренды и сложные решения.",
  },
];

export const executionTierOptions: SelectOption<ExecutionTier>[] = [
  {
    value: "basic",
    label: "Базовый уровень",
    description: "Функционально и без избыточных требований к деталям.",
  },
  {
    value: "good",
    label: "Хороший уровень",
    description: "Сбалансированный вариант для основного сценария сайта.",
  },
  {
    value: "high",
    label: "Высокий уровень",
    description: "Больше требований к аккуратности, стыкам и качеству исполнения.",
  },
];

export const timelineOptions: SelectOption<TimelinePreference>[] = [
  {
    value: "fast",
    label: "Нужно быстрее",
    description: "Подходит, если приоритетом является срок, а не минимальная цена.",
  },
  {
    value: "standard",
    label: "Стандартный темп",
    description: "Основной сценарий без лишней спешки и перегруза.",
  },
  {
    value: "no-rush",
    label: "Не срочно",
    description: "Можно планировать спокойнее и без попытки ужать график.",
  },
];

export const calculatorSteps: CalculatorStep[] = [
  {
    id: "object-type",
    title: "Тип объекта",
    description: "С чего начинается расчет: квартира целиком или отдельная зона.",
    canProceed: (state) => Boolean(state.objectType),
  },
  {
    id: "area",
    title: "Площадь",
    description: "Площадь влияет на диапазон стоимости и длительность этапов.",
    canProceed: (state) => Boolean(state.totalArea && state.totalArea > 0),
  },
  {
    id: "rooms",
    title: "Помещения",
    description: "Выберите зоны, которые реально входят в этот этап ремонта.",
    isVisible: (state) =>
      state.objectType === "apartment" || state.objectType === "room",
    canProceed: (state) =>
      state.objectType !== "apartment" && state.objectType !== "room"
        ? true
        : state.rooms.length > 0,
  },
  {
    id: "works",
    title: "Виды работ",
    description: "Соберите понятный состав ремонта, который потом можно сравнивать между мастерами.",
    canProceed: (state) => state.works.length > 0,
  },
  {
    id: "materials",
    title: "Уровень материалов",
    description: "Материалы меняют диапазон цены сильнее, чем пользователи обычно ожидают.",
  },
  {
    id: "execution",
    title: "Уровень исполнения",
    description: "Точность и требования к качеству тоже влияют на бюджет и срок.",
  },
  {
    id: "timeline",
    title: "Желаемый темп",
    description: "Если ремонт нужен быстрее, стоимость и организация работ обычно меняются.",
  },
  {
    id: "result",
    title: "Результат",
    description: "Предварительный диапазон цены, этапы по срокам и готовый список работ.",
  },
];
