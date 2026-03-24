import type { Language, ScenarioId } from "../shared/i18n";

export type PricePreset = {
  label: string;
  min: number;
  max: number;
  timeline: string;
  scope: string[];
};

export type SeoScenario = {
  id: ScenarioId;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  heroCta: string;
  areaRange: string;
  trustNote: string;
  presets: PricePreset[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

type PresetContent = {
  seoScenarios: SeoScenario[];
  expandedFaq: Array<{
    question: string;
    answer: string;
  }>;
};

const contentByLanguage: Record<Language, PresetContent> = {
  ru: {
    seoScenarios: [
      {
        id: "apartment-renovation",
        slug: "remont-kvartiry",
        eyebrow: "Ремонт квартиры в Турции",
        title: "Стоимость ремонта квартиры: ориентир по бюджету, срокам и составу работ",
        description:
          "Подходит для сценария, где нужно заранее понять бюджет полного ремонта квартиры, этапы работ и факторы, которые чаще всего влияют на итоговую сумму.",
        heroCta: "Рассчитать квартиру",
        areaRange: "80-140 м²",
        trustNote:
          "Ориентиры собраны как предварительные пресеты для рынка Турции в 2026 году и не заменяют выезд на объект.",
        presets: [
          {
            label: "Эконом",
            min: 650000,
            max: 840000,
            timeline: "35-45 дней",
            scope: ["демонтаж", "электрика", "сантехника", "стены", "полы"],
          },
          {
            label: "Стандарт",
            min: 820000,
            max: 1050000,
            timeline: "45-55 дней",
            scope: ["демонтаж", "инженерия", "плитка", "полы", "чистовая отделка"],
          },
          {
            label: "Премиум",
            min: 1100000,
            max: 1450000,
            timeline: "55-70 дней",
            scope: ["полный цикл", "брендовые материалы", "мебель", "точная финишная сборка"],
          },
        ],
        faq: [
          {
            question: "Почему диапазон такой широкий?",
            answer:
              "В квартире сильнее всего меняются стоимость инженерии, уровень материалов, объем демонтажа и количество нестандартных решений по мебели и дверям.",
          },
          {
            question: "Что чаще всего добавляет бюджет?",
            answer:
              "Перенос мокрых точек, скрытые дефекты после демонтажа, нестандартные размеры и переход на более дорогие бренды материалов.",
          },
        ],
      },
      {
        id: "kitchen-renovation",
        slug: "remont-kuhni",
        eyebrow: "Ремонт кухни в Турции",
        title: "Стоимость ремонта кухни: диапазоны бюджета, мебель и инженерия",
        description:
          "Кухня выглядит компактной зоной, но именно здесь высокая нагрузка на квадратный метр: инженерия, плитка, мебель и чистовой монтаж сильно двигают итог.",
        heroCta: "Рассчитать кухню",
        areaRange: "8-18 м²",
        trustNote:
          "Для кухни показывается более плотный диапазон стоимости на квадратный метр, потому что эта зона обычно дороже сухих помещений.",
        presets: [
          {
            label: "Эконом",
            min: 220000,
            max: 320000,
            timeline: "12-16 дней",
            scope: ["демонтаж", "электрика", "фартук", "базовая мебель"],
          },
          {
            label: "Стандарт",
            min: 300000,
            max: 430000,
            timeline: "15-22 дней",
            scope: ["плитка", "инженерия", "гарнитур", "чистовая отделка"],
          },
          {
            label: "Премиум",
            min: 450000,
            max: 650000,
            timeline: "20-28 дней",
            scope: ["премиальные фасады", "сложная техника", "нестандартная сборка"],
          },
        ],
        faq: [
          {
            question: "Почему кухня дороже, чем жилая комната той же площади?",
            answer:
              "Потому что в кухне выше инженерная нагрузка, больше плиточных работ, чаще есть мебель на заказ и больше монтажных узлов.",
          },
          {
            question: "Входит ли кухня в расчет мебели?",
            answer:
              "Да, если в калькуляторе включен кухонный гарнитур. Это помогает заранее увидеть разницу между отделкой без мебели и сценарием под ключ.",
          },
        ],
      },
      {
        id: "bathroom-renovation",
        slug: "remont-sanuzla",
        eyebrow: "Ремонт санузла в Турции",
        title: "Стоимость ремонта санузла: мокрая зона, плитка и сантехника",
        description:
          "Санузел часто становится самой чувствительной зоной в проекте: ошибки здесь дороже, а диапазон бюджета сильнее зависит от инженерии и выбранной сантехники.",
        heroCta: "Рассчитать санузел",
        areaRange: "4-8 м²",
        trustNote:
          "Для санузла пресеты учитывают более высокую стоимость инженерии и монтажа на каждый квадратный метр.",
        presets: [
          {
            label: "Эконом",
            min: 180000,
            max: 250000,
            timeline: "10-14 дней",
            scope: ["демонтаж", "плитка", "базовая сантехника"],
          },
          {
            label: "Стандарт",
            min: 220000,
            max: 320000,
            timeline: "12-18 дней",
            scope: ["плитка", "разводка", "инсталляция", "чистовой монтаж"],
          },
          {
            label: "Премиум",
            min: 340000,
            max: 480000,
            timeline: "16-24 дней",
            scope: ["сложная сантехника", "брендовые материалы", "точный монтаж"],
          },
        ],
        faq: [
          {
            question: "Что сильнее всего влияет на стоимость санузла?",
            answer:
              "Тип сантехники, перенос точек, формат плитки, скрытые работы по гидроизоляции и сложность монтажа в ограниченном пространстве.",
          },
          {
            question: "Почему срок по санузлу кажется длинным для маленькой площади?",
            answer:
              "Потому что в санузле много зависимых этапов: демонтаж, инженерия, подготовка, плитка, высыхание и монтаж сантехники нельзя сильно уплотнить без риска.",
          },
        ],
      },
    ],
    expandedFaq: [
      {
        question: "Это окончательная смета?",
        answer:
          "Нет. Это предварительный ориентир, который помогает заранее понять диапазон бюджета, список работ и сроки до выезда на объект.",
      },
      {
        question: "Почему лучше диапазон, а не одна точная цифра?",
        answer:
          "Одна цифра на старте обычно выглядит убедительно, но на практике вызывает больше недоверия. Диапазон честнее показывает неопределенность до вскрытия основания и выбора материалов.",
      },
      {
        question: "Можно ли использовать результат как ТЗ для мастера?",
        answer:
          "Да. В этом и есть одна из главных задач сервиса: выравнивать состав работ, чтобы предложения мастеров можно было сравнивать на одной основе.",
      },
      {
        question: "Нужен ли личный кабинет или база данных?",
        answer:
          "Для MVP нет. Расчет можно хранить локально и передавать по ссылке, что ускоряет запуск и не усложняет продукт на первом этапе.",
      },
      {
        question: "Что лучше считать сначала: всю квартиру или отдельные зоны?",
        answer:
          "Если ремонт комплексный, лучше начинать со всей квартиры. Если задача локальная или вы хотите быстро понять бюджет одной зоны, удобнее считать кухню или санузел отдельно.",
      },
      {
        question: "Какие данные стоит подготовить перед расчетом?",
        answer:
          "Достаточно знать тип объекта, ориентировочную площадь, какие зоны входят в проект и есть ли особые требования к материалам, сроку или мебели.",
      },
    ],
  },
  tr: {
    seoScenarios: [],
    expandedFaq: [],
  },
  en: {
    seoScenarios: [],
    expandedFaq: [],
  },
};

contentByLanguage.tr.seoScenarios = [
  {
    id: "apartment-renovation",
    slug: "daire-tadilati",
    eyebrow: "T?rkiye'de daire tadilat?",
    title: "Daire tadilat maliyeti: b?t?e, s?re ve i? kapsam? i?in ?n g?r?",
    description:
      "T?m daire tadilat?nda toplam b?t?eyi, ana a?amalar? ve nihai tutar? en ?ok etkileyen fakt?rleri ?nceden anlamak isteyenler i?in uygundur.",
    heroCta: "Daireyi hesapla",
    areaRange: "80-140 m²",
    trustNote: "Bu rakamlar T?rkiye pazar? i?in 2026 ?n presetleridir; yerinde ke?fin yerine ge?mez.",
    presets: [
      {
        label: "Ekonomik",
        min: 650000,
        max: 840000,
        timeline: "35-45 g?n",
        scope: ["s?k?m", "elektrik", "su tesisat?", "duvarlar", "zeminler"],
      },
      {
        label: "Standart",
        min: 820000,
        max: 1050000,
        timeline: "45-55 g?n",
        scope: ["s?k?m", "tesisat", "seramik", "zeminler", "son kat biti?"],
      },
      {
        label: "Premium",
        min: 1100000,
        max: 1450000,
        timeline: "55-70 g?n",
        scope: ["tam kapsam", "markal? malzemeler", "mobilya", "hassas final montaj"],
      },
    ],
    faq: [
      {
        question: "Neden aral?k bu kadar geni??",
        answer:
          "Tum daire senaryosunda tesisat maliyeti, malzeme seviyesi, s?k?m miktari ve standart disi mobilya ya da kapi kararlari toplam maliyeti ciddi sekilde degistirir.",
      },
      {
        question: "B?t?eyi en ?ok neler art?r?r?",
        answer:
          "Islak hacim noktalarini tasimak, s?k?mdan sonra ortaya cikan gizli problemler, olcuye ozel imalat ve daha pahali marka tercihleridir.",
      },
    ],
  },
  {
    id: "kitchen-renovation",
    slug: "mutfak-tadilati",
    eyebrow: "T?rkiye'de mutfak tadilat?",
    title: "Mutfak tadilat maliyeti: b?t?e aral?klar?, dolaplar ve tesisat",
    description:
      "Mutfak k???k g?r?nse de metrekare ba??na y?k genelde daha fazlad?r. Tesisat, seramik, dolap ve final montaj toplam maliyeti h?zla y?kseltebilir.",
    heroCta: "Mutfagi hesapla",
    areaRange: "8-18 m²",
    trustNote:
      "Mutfakta metrekare maliyeti genelde kuru odalardan daha y?ksek oldu?u i?in daha yo?un bir fiyat aral??? g?steriyoruz.",
    presets: [
      {
        label: "Ekonomik",
        min: 220000,
        max: 320000,
        timeline: "12-16 g?n",
        scope: ["s?k?m", "elektrik", "tezg?h aras?", "temel dolap"],
      },
      {
        label: "Standart",
        min: 300000,
        max: 430000,
        timeline: "15-22 g?n",
        scope: ["seramik", "tesisat", "dolap", "son kat biti?"],
      },
      {
        label: "Premium",
        min: 450000,
        max: 650000,
        timeline: "20-28 g?n",
        scope: ["premium kapaklar", "ileri cihazlar", "?zel montaj"],
      },
    ],
    faq: [
      {
        question: "Neden mutfak ayn? alanl? bir odadan daha pahal??",
        answer:
          "??nk? mutfakta tesisat yo?unlu?u daha fazlad?r, seramik i??ili?i artar, ?zel dolap ihtiyac? s?k g?r?l?r ve montaj d???mleri daha ?oktur.",
      },
      {
        question: "Mutfak dolaplar? hesaba dahil mi?",
        answer:
          "Evet, hesaplay?c?da mutfak dolab? se?ildiyse dahil olur. B?ylece sadece biti? i?leri ile anahtar teslim senaryo aras?ndaki fark g?r?n?r.",
      },
    ],
  },
  {
    id: "bathroom-renovation",
    slug: "banyo-tadilati",
    eyebrow: "T?rkiye'de banyo tadilat?",
    title: "Banyo tadilat maliyeti: ?slak hacim, seramik ve vitrifiye",
    description:
      "Banyo projede en hassas alanlardan biridir. Hatalar daha pahal?ya mal olur ve b?t?e aral??? tesisatla birlikte se?ilen ?r?nlere daha fazla ba?l?d?r.",
    heroCta: "Banyoyu hesapla",
    areaRange: "4-8 m²",
    trustNote:
      "Banyo presetleri, metrekare ba??na daha y?ksek tesisat ve montaj maliyetini dikkate al?r.",
    presets: [
      {
        label: "Ekonomik",
        min: 180000,
        max: 250000,
        timeline: "10-14 g?n",
        scope: ["s?k?m", "seramik", "temel vitrifiye"],
      },
      {
        label: "Standart",
        min: 220000,
        max: 320000,
        timeline: "12-18 g?n",
        scope: ["seramik", "tesisat da??t?m?", "g?mme sistem", "final montaj"],
      },
      {
        label: "Premium",
        min: 340000,
        max: 480000,
        timeline: "16-24 g?n",
        scope: ["ileri vitrifiye", "markal? malzemeler", "hassas montaj"],
      },
    ],
    faq: [
      {
        question: "Banyo maliyetini en cok ne etkiler?",
        answer:
          "Se?ilen vitrifiye tipi, nokta ta??malar?, seramik format?, su yal?t?m? i?in gizli i?ler ve dar alandaki montaj zorlu?u.",
      },
      {
        question: "K???k alana ra?men neden s?re uzun g?r?n?yor?",
        answer:
          "Cunku banyoda bagimli asamalar vardir: s?k?m, tesisat, hazirlik, seramik, kuruma ve montaj adimlarini risksiz sekilde fazla sikistirmak mumkun degildir.",
      },
    ],
  },
];

contentByLanguage.tr.expandedFaq = [
  {
    question: "Bu kesin ke?if listesi mi?",
    answer:
      "Hay?r. Bu, ke?if ?ncesinde b?t?e aral???n?, i? listesini ve s?reyi anlamaya yard?m eden ?n g?r?d?r.",
  },
  {
    question: "Neden tek rakam yerine aral?k daha iyi?",
    answer:
      "Baslangicta verilen tek rakam guclu gorunebilir ama sonradan daha cok guvensizlik yaratir. Aralik, malzeme secimi ve s?k?m sonrasi belirsizligi daha durust gosterir.",
  },
  {
    question: "Sonucu ustaya brief olarak kullanabilir miyim?",
    answer:
      "Evet. Servisin ana degerlerinden biri, is kapsamını netlestirip farkli ustalardan gelen teklifleri ayni zemin uzerinde karsilastirmaya yardim etmektir.",
  },
  {
    question: "?yelik ya da veritaban? gerekli mi?",
    answer:
      "MVP i?in hay?r. Hesap yerel olarak saklanabilir ve link ile payla??labilir; bu da ?r?n? daha h?zl? yay?na almay? sa?lar.",
  },
  {
    question: "?nce t?m daireyi mi yoksa tek bir alan? m? hesaplamak daha iyi?",
    answer:
      "?? kapsaml?ysa t?m daireyle ba?lamak daha do?ru olur. ?htiya? yerelse ya da tek bir alan?n b?t?esini h?zl? g?rmek istiyorsan?z mutfak veya banyoyu ayr? hesaplayabilirsiniz.",
  },
  {
    question: "Hesaptan ?nce hangi bilgileri haz?rlamak gerekir?",
    answer:
      "M?lk tipi, yakla??k alan, projeye girecek mek?nlar ve malzeme, s?re ya da mobilya konusunda ?zel beklentiler yeterlidir.",
  },
];

contentByLanguage.en.seoScenarios = [
  {
    id: "apartment-renovation",
    slug: "apartment-renovation",
    eyebrow: "Apartment renovation in Turkey",
    title: "Apartment renovation cost: budget, timing and scope overview",
    description:
      "Useful when you want an early view of the full-apartment budget, the main work stages and the factors most likely to change the final number.",
    heroCta: "Estimate apartment",
    areaRange: "80-140 m²",
    trustNote:
      "These are preliminary 2026 presets for the Turkey market and do not replace an on-site inspection.",
    presets: [
      {
        label: "Economy",
        min: 650000,
        max: 840000,
        timeline: "35-45 days",
        scope: ["demolition", "electrical", "plumbing", "walls", "floors"],
      },
      {
        label: "Standard",
        min: 820000,
        max: 1050000,
        timeline: "45-55 days",
        scope: ["demolition", "engineering", "tile", "floors", "final finishing"],
      },
      {
        label: "Premium",
        min: 1100000,
        max: 1450000,
        timeline: "55-70 days",
        scope: ["full cycle", "branded materials", "furniture", "precise final installation"],
      },
    ],
    faq: [
      {
        question: "Why is the range so wide?",
        answer:
          "Across a whole apartment, engineering cost, material level, demolition volume and custom furniture or door decisions can change the total significantly.",
      },
      {
        question: "What usually adds the most to the budget?",
        answer:
          "Wet-point relocation, hidden defects after demolition, custom sizes and upgrades to more expensive material brands.",
      },
    ],
  },
  {
    id: "kitchen-renovation",
    slug: "kitchen-renovation",
    eyebrow: "Kitchen renovation in Turkey",
    title: "Kitchen renovation cost: budget ranges, cabinetry and engineering",
    description:
      "A kitchen may look compact, but cost per square meter is often higher here because engineering, tile, cabinetry and finishing installation all stack up quickly.",
    heroCta: "Estimate kitchen",
    areaRange: "8-18 m²",
    trustNote:
      "Kitchen presets use a denser cost range per square meter because kitchens are usually more expensive than dry rooms.",
    presets: [
      {
        label: "Economy",
        min: 220000,
        max: 320000,
        timeline: "12-16 days",
        scope: ["demolition", "electrical", "backsplash", "basic cabinetry"],
      },
      {
        label: "Standard",
        min: 300000,
        max: 430000,
        timeline: "15-22 days",
        scope: ["tile", "engineering", "cabinet set", "final finishing"],
      },
      {
        label: "Premium",
        min: 450000,
        max: 650000,
        timeline: "20-28 days",
        scope: ["premium fronts", "advanced appliances", "custom assembly"],
      },
    ],
    faq: [
      {
        question: "Why is a kitchen more expensive than a room of the same size?",
        answer:
          "Because kitchens carry more engineering density, more tile work, more custom cabinetry and more installation nodes.",
      },
      {
        question: "Are kitchen cabinets included in the estimate?",
        answer:
          "Yes, if the kitchen cabinetry option is selected in the calculator. That makes the difference between finish-only and turnkey scenarios visible early.",
      },
    ],
  },
  {
    id: "bathroom-renovation",
    slug: "bathroom-renovation",
    eyebrow: "Bathroom renovation in Turkey",
    title: "Bathroom renovation cost: wet area, tile and plumbing fixtures",
    description:
      "Bathrooms are often the most sensitive areas in a project. Mistakes cost more here, and the budget range depends strongly on engineering and fixture choices.",
    heroCta: "Estimate bathroom",
    areaRange: "4-8 m²",
    trustNote:
      "Bathroom presets reflect the higher engineering and installation cost per square meter.",
    presets: [
      {
        label: "Economy",
        min: 180000,
        max: 250000,
        timeline: "10-14 days",
        scope: ["demolition", "tile", "basic fixtures"],
      },
      {
        label: "Standard",
        min: 220000,
        max: 320000,
        timeline: "12-18 days",
        scope: ["tile", "pipe routing", "concealed systems", "final installation"],
      },
      {
        label: "Premium",
        min: 340000,
        max: 480000,
        timeline: "16-24 days",
        scope: ["advanced fixtures", "branded materials", "precision installation"],
      },
    ],
    faq: [
      {
        question: "What affects bathroom cost the most?",
        answer:
          "Fixture type, relocation of points, tile format, hidden waterproofing work and the difficulty of installing in a tight space.",
      },
      {
        question: "Why does the timeline feel long for a small area?",
        answer:
          "Because bathrooms contain many dependent stages: demolition, engineering, preparation, tile, drying time and installation cannot be compressed too aggressively without risk.",
      },
    ],
  },
];

contentByLanguage.en.expandedFaq = [
  {
    question: "Is this the final quotation?",
    answer:
      "No. It is a preliminary guide that helps you understand the budget range, scope and timing before the site visit.",
  },
  {
    question: "Why is a range better than one exact figure?",
    answer:
      "A single number may sound confident at the start, but it often creates more distrust later. A range is a more honest way to show uncertainty before demolition and final material selection.",
  },
  {
    question: "Can I use the result as a contractor brief?",
    answer:
      "Yes. That is one of the product's main jobs: clarify scope so that contractor offers can be compared on the same basis.",
  },
  {
    question: "Do I need an account or database?",
    answer:
      "Not for the MVP. The estimate can be stored locally and shared by link, which keeps launch simpler and faster.",
  },
  {
    question: "Should I estimate the whole apartment first or separate areas?",
    answer:
      "If the renovation is comprehensive, start with the whole apartment. If the task is local or you want a fast budget check for one area, estimate the kitchen or bathroom separately.",
  },
  {
    question: "What information should I prepare before estimating?",
    answer:
      "The property type, approximate area, which zones are included and any special expectations around materials, timing or furniture are enough to begin.",
  },
];

export function getMarketPresetsContent(language: Language) {
  return contentByLanguage[language];
}
