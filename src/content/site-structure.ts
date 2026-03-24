import type { Language } from "../shared/i18n";

export type HeroStat = {
  label: string;
  value: string;
  note?: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  disclaimer: string;
  stats: HeroStat[];
};

export type LandingSection =
  | {
      id: "pain-points";
      kind: "cards";
      title: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: "how-it-works";
      kind: "steps";
      title: string;
      description: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    }
  | {
      id: "work-categories";
      kind: "tiles";
      title: string;
      description: string;
      items: string[];
    }
  | {
      id: "examples";
      kind: "examples";
      title: string;
      description: string;
      items: Array<{
        title: string;
        estimate: string;
        timeline: string;
        note: string;
      }>;
    }
  | {
      id: "trust";
      kind: "checklist";
      title: string;
      description: string;
      items: string[];
    }
  | {
      id: "faq";
      kind: "faq";
      title: string;
      description: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    }
  | {
      id: "final-cta";
      kind: "cta";
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };

type SiteStructureContent = {
  heroContent: HeroContent;
  landingSections: LandingSection[];
};

const contentByLanguage: Record<Language, SiteStructureContent> = {
  ru: {
    heroContent: {
      eyebrow: "Калькулятор и конструктор ТЗ на ремонт в Турции",
      title: "Узнайте бюджет, список работ и сроки ремонта до разговора с мастером",
      description:
        "Выберите помещения, виды работ и уровень материалов. Сервис соберет предварительный расчет, этапы ремонта и ссылку, которую можно отправить мастеру, семье или партнеру.",
      primaryCta: "Рассчитать ремонт",
      secondaryCta: "Посмотреть виды работ",
      disclaimer:
        "Предварительный расчет. Итог зависит от площади, уровня материалов, переноса точек и скрытых дефектов после демонтажа.",
      stats: [
        {
          label: "Формат результата",
          value: "Диапазон сметы",
          note: "Без искусственно точной цифры",
        },
        {
          label: "Что получает клиент",
          value: "Работы и сроки",
          note: "Уже в первом расчете",
        },
        {
          label: "Главная польза",
          value: "Сравнение предложений",
          note: "По одному и тому же списку работ",
        },
      ],
    },
    landingSections: [
      {
        id: "pain-points",
        kind: "cards",
        title: "Почему ремонт сложно начать",
        description:
          "Люди боятся не самого ремонта, а хаоса вокруг него: непонятной цены, срыва сроков и недоделанного объекта после аванса.",
        items: [
          {
            title: "Непонятно, сколько выйдет по деньгам",
            description:
              "Оценки отличаются, а заранее понять реалистичный бюджет почти невозможно.",
          },
          {
            title: "Сметы сложно сравнивать между собой",
            description:
              "У каждого мастера свой список работ, поэтому предложения нельзя сравнить честно.",
          },
          {
            title: "Сроки обещают устно и потом сдвигают",
            description:
              "Без этапов и ориентиров по времени клиент не понимает, что идет по плану, а что нет.",
          },
          {
            title: "После старта появляются доплаты и недоделки",
            description:
              "Часть работ всплывает позже, а итоговый объем ремонта оказывается больше ожидаемого.",
          },
        ],
      },
      {
        id: "how-it-works",
        kind: "steps",
        title: "Как это работает",
        description:
          "Сервис помогает сначала собрать понятный сценарий ремонта, а уже потом обсуждать исполнение с подрядчиком.",
        items: [
          {
            title: "Выбираете объект и помещения",
            description:
              "Квартира целиком, кухня, санузел или отдельные комнаты с нужной площадью.",
          },
          {
            title: "Отмечаете работы и уровни",
            description:
              "Демонтаж, инженерия, отделка, материалы и желаемый уровень исполнения.",
          },
          {
            title: "Получаете расчет и ссылку",
            description:
              "Бюджет-диапазон, этапы по срокам и готовый список работ, который можно отправить мастеру.",
          },
        ],
      },
      {
        id: "work-categories",
        kind: "tiles",
        title: "Что можно включить в расчет",
        description:
          "Сразу показывается полный понятный перечень работ, чтобы пользователь не гадал, есть ли в калькуляторе нужный ему сценарий.",
        items: [
          "Демонтаж и вывоз",
          "Сантехника",
          "Электрика",
          "Потолки",
          "Штукатурка и покраска",
          "Плитка",
          "Ламинат / паркет",
          "Двери",
          "Окна",
          "Кухонный гарнитур",
          "Санузел",
          "Мебель на заказ",
        ],
      },
      {
        id: "examples",
        kind: "examples",
        title: "Примеры предварительных расчетов",
        description:
          "Примеры нужны не как прайс-лист, а как якорь доверия: человек видит диапазон и быстрее понимает масштаб проекта.",
        items: [
          {
            title: "Кухня 12 м²",
            estimate: "от 300 000 TL",
            timeline: "15-20 дней",
            note: "С отделкой, плиткой и кухонной зоной",
          },
          {
            title: "Санузел 6 м²",
            estimate: "от 220 000 TL",
            timeline: "12-18 дней",
            note: "С сантехникой, плиткой и установкой",
          },
          {
            title: "Квартира 120 м²",
            estimate: "820 000 - 1 050 000 TL",
            timeline: "45-50 дней",
            note: "Полный ремонт со стандартным уровнем материалов",
          },
        ],
      },
      {
        id: "trust",
        kind: "checklist",
        title: "Почему этому расчету можно доверять",
        description:
          "Сервис не обещает невозможную точность. Он помогает заранее увидеть объем работ, диапазон цены и факторы, которые действительно влияют на итог.",
        items: [
          "Показывается диапазон цены вместо искусственно точной цифры",
          "Видно, какие работы включены в расчет",
          "Сроки разбиваются по этапам, а не только общей суммой дней",
          "Есть блок с факторами, которые влияют на итоговую стоимость",
          "Расчет можно сохранить по ссылке и вернуться к нему позже",
          "Один и тот же список работ можно отправить нескольким мастерам для честного сравнения",
        ],
      },
      {
        id: "faq",
        kind: "faq",
        title: "Частые вопросы",
        description:
          "FAQ должен закрывать не технические детали калькулятора, а главные опасения перед началом ремонта.",
        items: [
          {
            question: "Это точная цена ремонта?",
            answer:
              "Нет, это предварительный расчет. Он помогает заранее понять реалистичный диапазон бюджета и состав работ до выезда на объект.",
          },
          {
            question: "Почему показывается диапазон, а не одна сумма?",
            answer:
              "Потому что итог зависит от уровня материалов, состояния основания, переноса мокрых точек и скрытых дефектов после демонтажа.",
          },
          {
            question: "Можно ли отправить результат мастеру?",
            answer:
              "Да. В результате формируется ссылка с тем же набором выбора, чтобы мастер видел тот же список работ и тот же состав проекта.",
          },
          {
            question: "Чем это лучше обычного звонка подрядчику?",
            answer:
              "Сначала вы собираете понятный сценарий ремонта и только потом обсуждаете исполнение. Это снижает хаос и помогает сравнивать предложения на одной основе.",
          },
        ],
      },
      {
        id: "final-cta",
        kind: "cta",
        title: "Получите предварительный расчет ремонта",
        description:
          "Сначала соберите список работ, бюджет и сроки. Потом отправьте готовый расчет мастеру, семье или партнеру.",
        primaryCta: "Открыть калькулятор",
        secondaryCta: "Посмотреть пример результата",
      },
    ],
  },
  tr: {
    heroContent: {
      eyebrow: "T?rkiye'de tadilat i?in hesaplay?c? ve i? kapsam? olu?turucu",
      title: "Ustayla konu?madan ?nce b?t?eyi, i? listesini ve s?reyi g?r?n",
      description:
        "Mek?nlar?, i? kalemlerini ve malzeme seviyesini se?in. Sistem size ?n hesap, i? a?amalar? ve ustaya, aileye ya da orta?a g?nderebilece?iniz bir ba?lant? haz?rlar.",
      primaryCta: "Tadilati hesapla",
      secondaryCta: "?? kalemlerini g?r",
      disclaimer:
        "Bu bir ?n hesapt?r. Nihai tutar metrekareye, malzeme seviyesine, tesisat de?i?ikliklerine ve s?k?m sonras? ??kacak gizli sorunlara ba?l?d?r.",
      stats: [
        {
          label: "Sonu? format?",
          value: "B?t?e aral???",
          note: "Yapay ?ekilde tek rakam verilmez",
        },
        {
          label: "Kullan?c? ne al?r",
          value: "?? listesi ve s?re",
          note: "?lk hesapta bile g?r?n?r",
        },
        {
          label: "Ana fayda",
          value: "Teklifleri kar??la?t?rma",
          note: "Ayn? i? listesi ?zerinden",
        },
      ],
    },
    landingSections: [],
  },
  en: {
    heroContent: {
      eyebrow: "Renovation calculator and brief builder for Turkey",
      title: "See budget, work scope and timeline before you talk to a contractor",
      description:
        "Choose the rooms, work categories and material level. The tool builds a preliminary estimate, a phase-based timeline and a shareable link you can send to a contractor, partner or family member.",
      primaryCta: "Estimate renovation",
      secondaryCta: "View work categories",
      disclaimer:
        "This is a preliminary estimate. Final cost depends on area, material level, relocations of utility points and hidden issues revealed after demolition.",
      stats: [
        {
          label: "Result format",
          value: "Budget range",
          note: "Not a fake single number",
        },
        {
          label: "What the client gets",
          value: "Works and timing",
          note: "Visible from the first estimate",
        },
        {
          label: "Main value",
          value: "Comparable offers",
          note: "Based on the same scope of work",
        },
      ],
    },
    landingSections: [],
  },
};

contentByLanguage.tr.landingSections = [
  {
    id: "pain-points",
    kind: "cards",
    title: "Tadilata ba?lamak neden zor",
    description:
      "?nsanlar yaln?zca tadilattan de?il, etraf?ndaki belirsizlikten ?ekinir: net olmayan fiyat, sarkan teslim tarihi ve avans sonras? yar?m kalan i?ler.",
    items: [
      {
        title: "Toplam b?t?eyi ba?tan anlamak zor",
        description:
          "Farkl? ustalar farkl? rakam verir; ger?ek?i b?t?eyi en ba?ta g?rmek neredeyse imk?ns?z olur.",
      },
      {
        title: "Teklifleri adil kar??la?t?rmak zor",
        description:
          "Her ustan?n i? listesi farkl? oldu?u i?in teklifleri bire bir kar??la?t?rmak kolay de?ildir.",
      },
      {
        title: "S?reler s?zl? verilir ve sonra de?i?ir",
        description:
          "A?amalar? ve zaman tahminlerini g?rmeden neyin plana g?re gitti?ini anlamak zordur.",
      },
      {
        title: "Ba?lang??tan sonra ek maliyetler ??kar",
        description:
          "Baz? i?ler daha sonra ortaya ??kar ve projenin kapsam? beklenenden b?y?k h?le gelir.",
      },
    ],
  },
  {
    id: "how-it-works",
    kind: "steps",
    title: "Nas?l ?al???r",
    description:
      "Servis ?nce net bir tadilat senaryosu toplar, sonra y?kleniciyle uygulama detaylar?n? konu?may? kolayla?t?r?r.",
    items: [
      {
        title: "M?lk ve alanlar? se?ersiniz",
        description:
          "T?m daire, mutfak, banyo ya da belirli odalar ve yakla??k metrekare ile ba?lars?n?z.",
      },
      {
        title: "??leri ve seviyeleri i?aretlersiniz",
        description:
          "S?k?m, tesisat, biti?, malzeme seviyesi ve i??ilik beklentisi birlikte toplan?r.",
      },
      {
        title: "Hesap ve payla??m linki al?rs?n?z",
        description:
          "B?t?e aral???, zaman asamalari ve ustaya gonderebileceginiz hazir is listesi olusur.",
      },
    ],
  },
  {
    id: "work-categories",
    kind: "tiles",
    title: "Hesaba neler dahil edilebilir",
    description:
      "T?m ana i? kalemleri ba?tan g?r?n?r; kullan?c? gerekli senaryonun hesaplay?c?da olup olmad???n? hemen anlar.",
    items: [
      "S?k?m ve moloz at?m?",
      "Su tesisat?",
      "Elektrik",
      "Tavan",
      "S?va ve boya",
      "Seramik",
      "Laminat / parke",
      "Kap?lar",
      "Pencereler",
      "Mutfak dolaplar?",
      "Banyo",
      "?zel mobilya",
    ],
  },
  {
    id: "examples",
    kind: "examples",
    title: "?rnek ?n hesaplar",
    description:
      "Bunlar fiyat listesi de?il; kullan?c?n?n proje b?y?kl???n? daha h?zl? anlamas? i?in g?ven veren referans senaryolard?r.",
    items: [
      {
        title: "12 m² mutfak",
        estimate: "300.000 TL'den ba?lar",
        timeline: "15-20 g?n",
        note: "Biti?, seramik ve mutfak kurulumu dahil",
      },
      {
        title: "6 m² banyo",
        estimate: "220.000 TL'den ba?lar",
        timeline: "12-18 g?n",
        note: "Tesisat, seramik ve montaj dahil",
      },
      {
        title: "120 m² daire",
        estimate: "820.000 - 1.050.000 TL",
        timeline: "45-50 g?n",
        note: "Standart malzeme seviyesinde tam tadilat",
      },
    ],
  },
  {
    id: "trust",
    kind: "checklist",
    title: "Bu ?n hesaba neden g?venilebilir",
    description:
      "Servis imk?ns?z bir kesinlik vaat etmez. Bunun yerine i? hacmini, fiyat aral???n? ve sonucu ger?ekten etkileyen noktalar? erkenden g?sterir.",
    items: [
      "Tek rakam yerine fiyat aral??? g?sterilir",
      "Hangi i?lerin hesaba dahil oldu?u a??k?a g?r?l?r",
      "S?re toplam g?n yerine a?amalara ayr?l?r",
      "Maliyeti etkileyen risk fakt?rleri ayr?ca verilir",
      "Hesap link olarak saklanabilir ve sonra tekrar a??labilir",
      "Ayn? i? listesi birden fazla ustaya g?nderilip adil kar??la?t?rma yap?labilir",
    ],
  },
  {
    id: "faq",
    kind: "faq",
    title: "S?k sorulan sorular",
    description:
      "Buradaki sorular teknik ayr?nt?lardan ?ok, tadilata ba?larken duyulan temel g?vensizlikleri cevaplar.",
    items: [
      {
        question: "Bu kesin tadilat fiyat? m??",
        answer:
          "Hayir. Bu bir on hesaptir; kesif oncesinde gercekci butce araligini ve is kapsamını anlamaniza yardim eder.",
      },
      {
        question: "Neden tek tutar yerine aral?k g?steriliyor?",
        answer:
          "??nk? sonu? malzeme seviyesine, mevcut y?zey durumuna, tesisat de?i?ikliklerine ve s?k?m sonras? ??kabilecek gizli problemlere ba?l?d?r.",
      },
      {
        question: "Sonucu ustaya g?nderebilir miyim?",
        answer:
          "Evet. Sonu? sayfas?nda ayn? se?imleri i?eren bir ba?lant? olu?ur; usta ayn? i? listesini g?r?r.",
      },
      {
        question: "Bu neden telefonla fiyat sormaktan daha iyi?",
        answer:
          "?nce net bir tadilat senaryosu olu?turursunuz, sonra uygulamay? konu?ursunuz. Bu da karma?ay? azalt?r ve teklifleri ortak zeminde kar??la?t?rman?z? sa?lar.",
      },
    ],
  },
  {
    id: "final-cta",
    kind: "cta",
    title: "Tadilat i?in ?n hesap al?n",
    description:
      "?nce i? listesini, b?t?eyi ve s?reyi toplay?n. Sonra haz?r sonucu ustaya, aileye ya da orta?a g?nderin.",
    primaryCta: "Hesaplay?c?y? a?",
    secondaryCta: "?rnek sonucu g?r",
  },
];

contentByLanguage.en.landingSections = [
  {
    id: "pain-points",
    kind: "cards",
    title: "Why starting a renovation feels difficult",
    description:
      "People are rarely afraid of renovation itself. They are afraid of unclear pricing, slipping deadlines and unfinished work after paying an advance.",
    items: [
      {
        title: "Hard to understand the real budget upfront",
        description:
          "Quotes vary widely, and it is difficult to see a realistic budget before a site inspection.",
      },
      {
        title: "Different quotes are hard to compare",
        description:
          "Each contractor uses a different scope, so side-by-side comparison is rarely fair.",
      },
      {
        title: "Timelines are promised verbally and later move",
        description:
          "Without phases and rough timing, it is hard to tell what is on track and what is not.",
      },
      {
        title: "Extra costs appear after work starts",
        description:
          "Some tasks become visible later, and the final scope ends up larger than expected.",
      },
    ],
  },
  {
    id: "how-it-works",
    kind: "steps",
    title: "How it works",
    description:
      "The service helps you structure the renovation first and only then discuss execution with the contractor.",
    items: [
      {
        title: "Choose the property and areas",
        description:
          "Start with the whole apartment, a kitchen, a bathroom or selected rooms plus the approximate area.",
      },
      {
        title: "Mark works and quality levels",
        description:
          "Demolition, engineering, finishing, materials and expected execution level are collected in one place.",
      },
      {
        title: "Get the estimate and share link",
        description:
          "You receive a budget range, timeline phases and a ready scope of work that can be shared with a contractor.",
      },
    ],
  },
  {
    id: "work-categories",
    kind: "tiles",
    title: "What can be included",
    description:
      "The calculator shows the main categories upfront, so people can quickly see whether their scenario is covered.",
    items: [
      "Demolition and disposal",
      "Plumbing",
      "Electrical",
      "Ceilings",
      "Plaster and paint",
      "Tile",
      "Laminate / parquet",
      "Doors",
      "Windows",
      "Kitchen cabinets",
      "Bathroom works",
      "Custom furniture",
    ],
  },
  {
    id: "examples",
    kind: "examples",
    title: "Sample preliminary estimates",
    description:
      "These examples are not a price list. They act as trust anchors that help people understand project scale faster.",
    items: [
      {
        title: "Kitchen 12 m²",
        estimate: "from 300,000 TL",
        timeline: "15-20 days",
        note: "With finishing, tiling and kitchen installation",
      },
      {
        title: "Bathroom 6 m²",
        estimate: "from 220,000 TL",
        timeline: "12-18 days",
        note: "With plumbing, tiling and installation",
      },
      {
        title: "Apartment 120 m²",
        estimate: "820,000 - 1,050,000 TL",
        timeline: "45-50 days",
        note: "Full renovation with a standard material level",
      },
    ],
  },
  {
    id: "trust",
    kind: "checklist",
    title: "Why this estimate is trustworthy",
    description:
      "The product does not promise impossible precision. It helps people see the scope, the budget range and the factors that really affect the final cost.",
    items: [
      "It shows a price range instead of an artificially exact number",
      "The included work scope is visible",
      "Timeline is broken into phases rather than one total number",
      "Cost drivers and risks are listed separately",
      "The estimate can be saved and reopened from a link",
      "The same scope can be sent to several contractors for a fair comparison",
    ],
  },
  {
    id: "faq",
    kind: "faq",
    title: "Frequently asked questions",
    description:
      "This FAQ addresses renovation anxiety and trust concerns, not just product mechanics.",
    items: [
      {
        question: "Is this an exact renovation price?",
        answer:
          "No. It is a preliminary estimate that helps you understand a realistic budget range and work scope before the site visit.",
      },
      {
        question: "Why show a range instead of one number?",
        answer:
          "Because final cost depends on material level, substrate condition, wet-point relocation and hidden issues discovered after demolition.",
      },
      {
        question: "Can I send the result to a contractor?",
        answer:
          "Yes. The result page creates a link with the same selections so the contractor sees the same scope of work.",
      },
      {
        question: "Why is this better than a quick phone quote?",
        answer:
          "You define the renovation scenario first and discuss execution second. That reduces chaos and makes offers easier to compare.",
      },
    ],
  },
  {
    id: "final-cta",
    kind: "cta",
    title: "Get a preliminary renovation estimate",
    description:
      "First collect scope, budget and timing. Then send the finished estimate to a contractor, partner or family member.",
    primaryCta: "Open calculator",
    secondaryCta: "See a sample result",
  },
];

export function getSiteStructureContent(language: Language) {
  return contentByLanguage[language];
}
