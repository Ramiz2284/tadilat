import type { Language } from "../../../shared/i18n";
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

type StepCopy = {
  objectTypeOptions: SelectOption<ObjectType>[];
  roomOptions: SelectOption<RoomType>[];
  workCategoryOptions: SelectOption<WorkCategory>[];
  materialTierOptions: SelectOption<MaterialTier>[];
  executionTierOptions: SelectOption<ExecutionTier>[];
  timelineOptions: SelectOption<TimelinePreference>[];
  calculatorSteps: CalculatorStep[];
};

const copyByLanguage: Record<Language, StepCopy> = {
  ru: {
    objectTypeOptions: [
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
    ],
    roomOptions: [
      { value: "kitchen", label: "Кухня", description: "Плитка, инженерия, мебель, зона повышенной нагрузки." },
      { value: "bathroom", label: "Санузел", description: "Мокрая зона с самой высокой чувствительностью к ошибкам." },
      { value: "living-room", label: "Гостиная", description: "Основная жилая зона с чистовой отделкой и полами." },
      { value: "bedroom", label: "Спальня", description: "Сухая комната с более простым набором работ." },
      { value: "corridor", label: "Коридор", description: "Связывающая зона, где часто добавляются двери и напольные работы." },
      { value: "balcony", label: "Балкон", description: "Отдельная зона с частой плиткой и оконными работами." },
    ],
    workCategoryOptions: [
      { value: "demolition", label: "Демонтаж и вывоз", description: "Снятие старых покрытий, сантехники, дверей и вывоз мусора." },
      { value: "plumbing", label: "Сантехника", description: "Замена труб, разводка и перенос мокрых точек." },
      { value: "electrical", label: "Электрика", description: "Новая проводка, точки освещения, выключатели и розетки." },
      { value: "ceilings", label: "Потолки", description: "Выравнивание, подготовка, окраска или подвесные решения." },
      { value: "wall-preparation", label: "Подготовка стен", description: "Штукатурка, выравнивание и база под финишную отделку." },
      { value: "painting", label: "Покраска / финиш стен", description: "Окраска или другой чистовой финиш по подготовленной поверхности." },
      { value: "tile", label: "Плитка", description: "Стены и полы в кухне, санузле, балконе и других зонах." },
      { value: "flooring", label: "Ламинат / паркет", description: "Подложка, укладка и базовые напольные работы." },
      { value: "interior-doors", label: "Межкомнатные двери", description: "Поставка и монтаж дверных блоков внутри квартиры." },
      { value: "entry-door", label: "Входная дверь", description: "Замена или установка входной двери." },
      { value: "windows", label: "Окна", description: "Замена оконных блоков, откосов и сопутствующих работ." },
      { value: "kitchen-furniture", label: "Кухонный гарнитур", description: "Мебель и монтаж кухонной зоны." },
      { value: "custom-furniture", label: "Мебель на заказ", description: "Шкафы, встроенные решения и нестандартные позиции." },
      { value: "bathroom-fixtures", label: "Сантехника санузла", description: "Инсталляции, ванна, душ, унитаз, раковина и аксессуары." },
    ],
    materialTierOptions: [
      { value: "economy", label: "Эконом", description: "Базовые материалы и решения без лишних затрат." },
      { value: "standard", label: "Стандарт", description: "Оптимальный баланс цены, внешнего вида и ресурса." },
      { value: "premium", label: "Премиум", description: "Более дорогие материалы, бренды и сложные решения." },
    ],
    executionTierOptions: [
      { value: "basic", label: "Базовый уровень", description: "Функционально и без избыточных требований к деталям." },
      { value: "good", label: "Хороший уровень", description: "Сбалансированный вариант для основного сценария сайта." },
      { value: "high", label: "Высокий уровень", description: "Больше требований к аккуратности, стыкам и качеству исполнения." },
    ],
    timelineOptions: [
      { value: "fast", label: "Нужно быстрее", description: "Подходит, если приоритетом является срок, а не минимальная цена." },
      { value: "standard", label: "Стандартный темп", description: "Основной сценарий без лишней спешки и перегруза." },
      { value: "no-rush", label: "Не срочно", description: "Можно планировать спокойнее и без попытки ужать график." },
    ],
    calculatorSteps: [
      { id: "object-type", title: "Тип объекта", description: "С чего начинается расчет: квартира целиком или отдельная зона.", canProceed: (state) => Boolean(state.objectType) },
      { id: "area", title: "Площадь", description: "Площадь влияет на диапазон стоимости и длительность этапов.", canProceed: (state) => Boolean(state.totalArea && state.totalArea > 0) },
      { id: "rooms", title: "Помещения", description: "Выберите зоны, которые реально входят в этот этап ремонта.", isVisible: (state) => state.objectType === "apartment" || state.objectType === "room", canProceed: (state) => (state.objectType !== "apartment" && state.objectType !== "room" ? true : state.rooms.length > 0) },
      { id: "works", title: "Виды работ", description: "Соберите понятный состав ремонта, который потом можно сравнивать между мастерами.", canProceed: (state) => state.works.length > 0 },
      { id: "materials", title: "Уровень материалов", description: "Материалы меняют диапазон цены сильнее, чем пользователи обычно ожидают." },
      { id: "execution", title: "Уровень исполнения", description: "Точность и требования к качеству тоже влияют на бюджет и срок." },
      { id: "timeline", title: "Желаемый темп", description: "Если ремонт нужен быстрее, стоимость и организация работ обычно меняются." },
      { id: "result", title: "Результат", description: "Предварительный диапазон цены, этапы по срокам и готовый список работ." },
    ],
  },
  tr: {
    objectTypeOptions: [
      { value: "apartment", label: "Tüm daire", description: "Tüm daire için oda ve aşamalarla birlikte tam hesap." },
      { value: "kitchen", label: "Mutfak", description: "Bitiş, tesisat ve dolaplarla mutfak için ayrı hesap." },
      { value: "bathroom", label: "Banyo / WC", description: "Islak hacim için daha hassas bir lokal hesap." },
      { value: "room", label: "Tek oda", description: "Yatak odası, salon veya tek bir alan için uygun." },
      { value: "rough-only", label: "Sadece kaba işler", description: "Son kat bitiş öncesi temel kapsamı anlamak için." },
    ],
    roomOptions: [
      { value: "kitchen", label: "Mutfak", description: "Seramik, tesisat, dolap ve yüksek kullanım yoğunluğu." },
      { value: "bathroom", label: "Banyo", description: "Hataya en hassas ıslak hacim." },
      { value: "living-room", label: "Salon", description: "Ana yaşam alanı; son kat bitiş ve zemin işleriyle." },
      { value: "bedroom", label: "Yatak odası", description: "Daha sade kapsamlı kuru oda." },
      { value: "corridor", label: "Koridor", description: "Kapıların ve zemin işlerinin sık toplandığı geçiş alanı." },
      { value: "balcony", label: "Balkon", description: "Seramik ve pencere işinin sık görüldüğü ayrı alan." },
    ],
    workCategoryOptions: [
      { value: "demolition", label: "Söküm ve atım", description: "Eski kaplamaların, vitrifiyenin ve kapıların sökülmesi ile moloz atımı." },
      { value: "plumbing", label: "Su tesisatı", description: "Boru yenileme, dağıtım ve ıslak nokta taşımaları." },
      { value: "electrical", label: "Elektrik", description: "Yeni kablolama, aydınlatma noktaları, priz ve anahtarlar." },
      { value: "ceilings", label: "Tavan", description: "Düzeltme, hazırlık, boya veya asma tavan çözümleri." },
      { value: "wall-preparation", label: "Duvar hazırlığı", description: "Sıva, düzeltme ve son kat için altyapı." },
      { value: "painting", label: "Boya / duvar bitişi", description: "Hazır yüzey üzerine boya veya başka son kat bitiş." },
      { value: "tile", label: "Seramik", description: "Mutfak, banyo, balkon ve diğer alanlarda duvar ve zemin." },
      { value: "flooring", label: "Laminat / parke", description: "Altlık, döşeme ve temel zemin işleri." },
      { value: "interior-doors", label: "İç kapılar", description: "Daire içindeki kapı bloklarının tedarik ve montajı." },
      { value: "entry-door", label: "Giriş kapısı", description: "Giriş kapısının değişimi veya montajı." },
      { value: "windows", label: "Pencereler", description: "Pencere blokları, kenar bitişleri ve ilgili işler." },
      { value: "kitchen-furniture", label: "Mutfak dolabı", description: "Mutfak mobilyası ve montajı." },
      { value: "custom-furniture", label: "Özel mobilya", description: "Dolaplar, ankastre çözümler ve ölçüye özel ürünler." },
      { value: "bathroom-fixtures", label: "Banyo vitrifiye", description: "Gömme sistemler, küvet, duş, klozet, lavabo ve aksesuarlar." },
    ],
    materialTierOptions: [
      { value: "economy", label: "Ekonomik", description: "Gereksiz ek maliyet olmadan temel malzeme seçimi." },
      { value: "standard", label: "Standart", description: "Fiyat, görünüm ve dayanımın dengeli noktası." },
      { value: "premium", label: "Premium", description: "Daha pahalı markalar, malzemeler ve detaylı çözümler." },
    ],
    executionTierOptions: [
      { value: "basic", label: "Temel seviye", description: "Fonksiyon odaklı, detay beklentisi daha düşük." },
      { value: "good", label: "İyi seviye", description: "Ana senaryo için dengeli seçim." },
      { value: "high", label: "Yüksek seviye", description: "Daha hassas işçilik, derz ve detay beklentisi." },
    ],
    timelineOptions: [
      { value: "fast", label: "Daha hızlı olsun", description: "Süre öncelikliyse ve minimum fiyat öncelikli değilse uygundur." },
      { value: "standard", label: "Standart tempo", description: "Aşırı sıkıştırmadan ilerleyen ana senaryo." },
      { value: "no-rush", label: "Acil değil", description: "Takvimi daha rahat planlamak isteyenler için." },
    ],
    calculatorSteps: [
      { id: "object-type", title: "Mülk tipi", description: "Hesap tüm daireden mi yoksa tek bir alandan mı başlıyor.", canProceed: (state) => Boolean(state.objectType) },
      { id: "area", title: "Alan", description: "Metrekare, maliyet aralığını ve süreyi doğrudan etkiler.", canProceed: (state) => Boolean(state.totalArea && state.totalArea > 0) },
      { id: "rooms", title: "Mekânlar", description: "Bu tadilat aşamasına gerçekten dahil olan alanları seçin.", isVisible: (state) => state.objectType === "apartment" || state.objectType === "room", canProceed: (state) => (state.objectType !== "apartment" && state.objectType !== "room" ? true : state.rooms.length > 0) },
      { id: "works", title: "İş kalemleri", description: "Sonra ustalar arasında karşılaştırabileceğiniz net bir kapsam toplayın.", canProceed: (state) => state.works.length > 0 },
      { id: "materials", title: "Malzeme seviyesi", description: "Malzeme seçimi, insanların beklediğinden daha fazla fark yaratır." },
      { id: "execution", title: "İşçilik seviyesi", description: "Detay beklentisi ve kalite seviyesi de bütçeyi ve süreyi etkiler." },
      { id: "timeline", title: "İstenen hız", description: "Daha hızlı teslim istenirse organizasyon ve maliyet değişebilir." },
      { id: "result", title: "Sonuç", description: "Ön fiyat aralığı, aşamalı süre ve hazır iş listesi." },
    ],
  },
  en: {
    objectTypeOptions: [
      { value: "apartment", label: "Whole apartment", description: "Full estimate for the entire apartment with rooms and phases." },
      { value: "kitchen", label: "Kitchen", description: "Dedicated kitchen estimate with finishing, engineering and cabinetry." },
      { value: "bathroom", label: "Bathroom", description: "Local estimate for a wet area with higher complexity." },
      { value: "room", label: "Single room", description: "Useful for a bedroom, living room or another single zone." },
      { value: "rough-only", label: "Rough works only", description: "For understanding the base scope before final finishing." },
    ],
    roomOptions: [
      { value: "kitchen", label: "Kitchen", description: "Tile, engineering, cabinetry and higher-use intensity." },
      { value: "bathroom", label: "Bathroom", description: "Wet area with the highest sensitivity to mistakes." },
      { value: "living-room", label: "Living room", description: "Main living area with final finishes and flooring." },
      { value: "bedroom", label: "Bedroom", description: "Dry room with a simpler work scope." },
      { value: "corridor", label: "Corridor", description: "Connecting area where doors and flooring are often added." },
      { value: "balcony", label: "Balcony", description: "Separate zone often involving tile and window work." },
    ],
    workCategoryOptions: [
      { value: "demolition", label: "Demolition and disposal", description: "Removal of old finishes, fixtures, doors and waste." },
      { value: "plumbing", label: "Plumbing", description: "Pipe replacement, routing and relocation of wet points." },
      { value: "electrical", label: "Electrical", description: "New wiring, lighting points, switches and outlets." },
      { value: "ceilings", label: "Ceilings", description: "Levelling, preparation, painting or suspended solutions." },
      { value: "wall-preparation", label: "Wall preparation", description: "Plaster, levelling and base work for final finish." },
      { value: "painting", label: "Paint / wall finish", description: "Paint or another final wall finish over prepared surfaces." },
      { value: "tile", label: "Tile", description: "Wall and floor tile in kitchens, bathrooms, balconies and other areas." },
      { value: "flooring", label: "Laminate / parquet", description: "Underlay, installation and basic floor works." },
      { value: "interior-doors", label: "Interior doors", description: "Supply and installation of internal door blocks." },
      { value: "entry-door", label: "Entry door", description: "Replacement or installation of the entry door." },
      { value: "windows", label: "Windows", description: "Window replacement, reveals and related works." },
      { value: "kitchen-furniture", label: "Kitchen cabinetry", description: "Furniture and installation for the kitchen area." },
      { value: "custom-furniture", label: "Custom furniture", description: "Wardrobes, built-ins and non-standard items." },
      { value: "bathroom-fixtures", label: "Bathroom fixtures", description: "Frames, bath, shower, toilet, sink and accessories." },
    ],
    materialTierOptions: [
      { value: "economy", label: "Economy", description: "Basic materials and solutions without extra cost." },
      { value: "standard", label: "Standard", description: "Balanced choice across price, appearance and durability." },
      { value: "premium", label: "Premium", description: "More expensive materials, brands and complex solutions." },
    ],
    executionTierOptions: [
      { value: "basic", label: "Basic level", description: "Functional scope with lower demands on detail." },
      { value: "good", label: "Good level", description: "Balanced option for most apartment renovation projects." },
      { value: "high", label: "High level", description: "Higher expectations for precision, joints and final quality." },
    ],
    timelineOptions: [
      { value: "fast", label: "Need it faster", description: "Works when speed matters more than the lowest price." },
      { value: "standard", label: "Standard pace", description: "Main scenario without unnecessary rush or overload." },
      { value: "no-rush", label: "No rush", description: "For calmer planning without squeezing the schedule." },
    ],
    calculatorSteps: [
      { id: "object-type", title: "Property type", description: "Start with the whole apartment or a single area.", canProceed: (state) => Boolean(state.objectType) },
      { id: "area", title: "Area", description: "Area affects both the cost range and the timeline.", canProceed: (state) => Boolean(state.totalArea && state.totalArea > 0) },
      { id: "rooms", title: "Rooms", description: "Pick the areas that are actually included in this renovation stage.", isVisible: (state) => state.objectType === "apartment" || state.objectType === "room", canProceed: (state) => (state.objectType !== "apartment" && state.objectType !== "room" ? true : state.rooms.length > 0) },
      { id: "works", title: "Work categories", description: "Build a clear scope that can later be compared across contractors.", canProceed: (state) => state.works.length > 0 },
      { id: "materials", title: "Material level", description: "Material choices move the budget range more than most people expect." },
      { id: "execution", title: "Execution level", description: "Precision and finish quality also change both cost and timing." },
      { id: "timeline", title: "Preferred pace", description: "If the renovation must move faster, cost and organisation usually change." },
      { id: "result", title: "Result", description: "Preliminary cost range, phase timeline and ready work scope." },
    ],
  },
};

export function getCalculatorCopy(language: Language) {
  return copyByLanguage[language];
}
