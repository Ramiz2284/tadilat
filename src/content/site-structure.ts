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
      eyebrow: "Калькулятор ремонта в Турции",
      title: "Поймите бюджет, сроки и состав работ до разговора с мастером",
      description:
        "Выберите тип объекта, помещения, виды работ и уровень материалов. Сервис покажет примерный диапазон стоимости, сроки по этапам и список работ, который удобно обсудить с мастером.",
      primaryCta: "Рассчитать ремонт",
      secondaryCta: "Посмотреть виды работ",
      disclaimer:
        "Это предварительный расчет. Итоговая стоимость зависит от площади, уровня материалов, переноса точек и скрытых работ после демонтажа.",
      stats: [
        {
          label: "Формат расчета",
          value: "Диапазон стоимости",
          note: "Без искусственно точной цифры",
        },
        {
          label: "Что вы получаете",
          value: "Работы и сроки",
          note: "В одном понятном расчете",
        },
        {
          label: "Главная польза",
          value: "Сравнение предложений",
          note: "По одному и тому же составу работ",
        },
      ],
    },
    landingSections: [
      {
        id: "pain-points",
        kind: "cards",
        title: "Почему ремонт сложно начать",
        description:
          "Обычно людей пугает не сам ремонт, а непонятный бюджет, срыв сроков и риск доплат уже после старта работ.",
        items: [
          {
            title: "Непонятно, во сколько это обойдется",
            description:
              "Разные мастера называют разные суммы, и до выезда на объект сложно понять реальный порядок бюджета.",
          },
          {
            title: "Сметы сложно сравнить между собой",
            description:
              "У каждого свой список работ, поэтому предложения часто сравнивают не на одной основе.",
          },
          {
            title: "Сроки обещают устно",
            description:
              "Без этапов и ориентиров по времени трудно понять, насколько реалистичен обещанный срок.",
          },
          {
            title: "После старта появляются доплаты",
            description:
              "Часть работ становится видна только после демонтажа, и бюджет быстро уходит выше ожиданий.",
          },
        ],
      },
      {
        id: "how-it-works",
        kind: "steps",
        title: "Как это работает",
        description:
          "Сначала вы собираете понятный состав проекта, а потом обсуждаете с мастером уже конкретные работы, сроки и бюджет.",
        items: [
          {
            title: "Выбираете объект и площадь",
            description:
              "Квартира целиком, кухня, санузел или отдельная комната с нужной площадью.",
          },
          {
            title: "Отмечаете работы и уровни",
            description:
              "Демонтаж, инженерия, отделка, мебель, материалы и желаемый уровень исполнения.",
          },
          {
            title: "Получаете ориентир по ремонту",
            description:
              "Видите примерную стоимость, сроки по этапам и готовый список работ для обсуждения.",
          },
        ],
      },
      {
        id: "work-categories",
        kind: "tiles",
        title: "Что можно включить в расчет",
        description:
          "Основные работы собраны заранее, чтобы вы сразу понимали, подходит ли расчет под ваш проект.",
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
        title: "Примеры расчетов",
        description:
          "Это не прайс-лист, а ориентиры, которые помогают быстрее понять масштаб проекта.",
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
        title: "Почему такому расчету можно доверять",
        description:
          "Сервис не обещает невозможную точность. Он помогает заранее увидеть объем работ и факторы, которые действительно влияют на итоговую стоимость.",
        items: [
          "Показывается диапазон цены вместо одной случайной цифры",
          "Сразу видно, какие работы входят в расчет",
          "Сроки разбиты по этапам, а не даны одной общей цифрой",
          "Отдельно указаны факторы, которые могут влиять на итог",
          "Расчет можно сохранить и вернуться к нему позже",
          "Один и тот же список работ можно обсудить с несколькими мастерами",
        ],
      },
      {
        id: "faq",
        kind: "faq",
        title: "Частые вопросы",
        description:
          "Здесь собраны самые частые вопросы перед началом ремонта: о цене, сроках и составе работ.",
        items: [
          {
            question: "Это точная цена ремонта?",
            answer:
              "Нет. Это предварительный расчет, который помогает заранее понять реалистичный диапазон бюджета и состав работ.",
          },
          {
            question: "Почему показывается диапазон, а не одна сумма?",
            answer:
              "Потому что итог зависит от уровня материалов, состояния основания, переноса мокрых точек и скрытых работ после демонтажа.",
          },
          {
            question: "Можно ли отправить результат мастеру?",
            answer:
              "Да. Расчет удобно использовать как основу для разговора, чтобы обсуждать один и тот же состав работ.",
          },
          {
            question: "Чем это лучше обычного звонка подрядчику?",
            answer:
              "Сначала вы понимаете примерный объем проекта, а уже потом обсуждаете детали. Это помогает говорить предметно и сравнивать предложения спокойнее.",
          },
        ],
      },
      {
        id: "final-cta",
        kind: "cta",
        title: "Получите предварительный расчет ремонта",
        description:
          "Соберите список работ, бюджет и сроки, чтобы говорить с мастером уже на понятной основе.",
        primaryCta: "Открыть калькулятор",
        secondaryCta: "Посмотреть пример результата",
      },
    ],
  },
  tr: {
    heroContent: {
      eyebrow: "Türkiye'de tadilat hesaplayıcısı",
      title: "Ustayla konuşmadan önce bütçeyi, süreyi ve işleri görün",
      description:
        "Mülk tipini, alanı, iş kalemlerini ve malzeme seviyesini seçin. Sistem size yaklaşık maliyet aralığı, aşamalı zaman planı ve ustayla konuşabileceğiniz net bir iş listesi verir.",
      primaryCta: "Tadilatı hesapla",
      secondaryCta: "İş kalemlerini gör",
      disclaimer:
        "Bu ön hesaptır. Nihai tutar metrekareye, malzeme seviyesine, tesisat değişikliklerine ve söküm sonrası ortaya çıkabilecek ek işlere bağlıdır.",
      stats: [
        {
          label: "Hesap formatı",
          value: "Maliyet aralığı",
          note: "Tek bir yapay rakam yerine",
        },
        {
          label: "Ne görürsünüz",
          value: "İşler ve süre",
          note: "Tek bir net tabloda",
        },
        {
          label: "En büyük fayda",
          value: "Teklif karşılaştırma",
          note: "Aynı iş listesi üzerinden",
        },
      ],
    },
    landingSections: [
      {
        id: "pain-points",
        kind: "cards",
        title: "Tadilata başlamak neden zor",
        description:
          "İnsanları zorlayan şey çoğu zaman tadilatın kendisi değil; belirsiz fiyat, kayan süreler ve sonradan çıkan ek maliyetlerdir.",
        items: [
          {
            title: "Gerçek bütçeyi başta görmek zor",
            description:
              "Farklı ustalar farklı rakam verir; keşif öncesinde doğru bütçe aralığını anlamak kolay olmaz.",
          },
          {
            title: "Teklifleri karşılaştırmak zor",
            description:
              "Her teklif farklı iş kalemleri içerdiği için hangisinin gerçekten uygun olduğunu anlamak güçleşir.",
          },
          {
            title: "Süreler net konuşulmaz",
            description:
              "Aşamalar görünmeden verilen teslim tarihleri çoğu zaman güven vermez.",
          },
          {
            title: "İş başladıktan sonra bütçe büyür",
            description:
              "Bazı işler sökümden sonra ortaya çıkar ve toplam maliyet beklenenden yukarı çıkabilir.",
          },
        ],
      },
      {
        id: "how-it-works",
        kind: "steps",
        title: "Nasıl çalışır",
        description:
          "Önce projenin kapsamını netleştirirsiniz, sonra ustayla maliyet ve uygulama detaylarını çok daha rahat konuşursunuz.",
        items: [
          {
            title: "Mülkü ve alanı seçersiniz",
            description:
              "Tüm daire, mutfak, banyo ya da tek oda için yaklaşık metrekareyi girersiniz.",
          },
          {
            title: "İşleri ve seviyeleri seçersiniz",
            description:
              "Söküm, tesisat, bitiş işleri, mobilya ve malzeme seviyesi bir araya gelir.",
          },
          {
            title: "Yaklaşık sonucu görürsünüz",
            description:
              "Maliyet aralığını, zaman planını ve konuşmaya hazır iş listesini alırsınız.",
          },
        ],
      },
      {
        id: "work-categories",
        kind: "tiles",
        title: "Hesaba neler dahil olabilir",
        description:
          "Ana iş kalemleri baştan görünür; böylece hesabın projenize uygun olup olmadığını hemen anlarsınız.",
        items: [
          "Söküm ve moloz atımı",
          "Su tesisatı",
          "Elektrik",
          "Tavan",
          "Sıva ve boya",
          "Seramik",
          "Laminat / parke",
          "Kapılar",
          "Pencereler",
          "Mutfak dolapları",
          "Banyo işleri",
          "Özel mobilya",
        ],
      },
      {
        id: "examples",
        kind: "examples",
        title: "Örnek hesaplar",
        description:
          "Bunlar kesin fiyat değil; proje büyüklüğünü daha hızlı anlamanız için hazırlanmış örnek aralıklardır.",
        items: [
          {
            title: "12 m² mutfak",
            estimate: "300.000 TL'den başlar",
            timeline: "15-20 gün",
            note: "Bitiş işleri, seramik ve mutfak kurulumu dahil",
          },
          {
            title: "6 m² banyo",
            estimate: "220.000 TL'den başlar",
            timeline: "12-18 gün",
            note: "Tesisat, seramik ve montaj dahil",
          },
          {
            title: "120 m² daire",
            estimate: "820.000 - 1.050.000 TL",
            timeline: "45-50 gün",
            note: "Standart malzeme seviyesinde tam tadilat",
          },
        ],
      },
      {
        id: "trust",
        kind: "checklist",
        title: "Bu hesaba neden güvenebilirsiniz",
        description:
          "Amaç tek bir süslü rakam vermek değil; işin kapsamını, bütçe aralığını ve maliyeti etkileyen noktaları açıkça göstermektir.",
        items: [
          "Tek rakam yerine gerçekçi bir aralık gösterilir",
          "Hangi işlerin hesaba dahil olduğu açıkça görülür",
          "Süre toplam olarak değil, aşamalar halinde düşünülür",
          "Maliyeti etkileyebilecek başlıca noktalar ayrıca belirtilir",
          "Hesabı kaydedip daha sonra tekrar açabilirsiniz",
          "Aynı iş listesini birden fazla ustayla konuşabilirsiniz",
        ],
      },
      {
        id: "faq",
        kind: "faq",
        title: "Sık sorulan sorular",
        description:
          "Burada en çok sorulan konular yer alır: fiyat, süre ve iş kapsamı.",
        items: [
          {
            question: "Bu kesin tadilat fiyatı mı?",
            answer:
              "Hayır. Bu ön hesaptır ve başlamadan önce yaklaşık bütçe aralığını anlamanıza yardımcı olur.",
          },
          {
            question: "Neden tek tutar yerine aralık gösteriliyor?",
            answer:
              "Çünkü sonuç malzeme seviyesine, mevcut duruma, tesisat değişikliklerine ve söküm sonrası çıkabilecek işlere göre değişebilir.",
          },
          {
            question: "Sonucu ustayla paylaşabilir miyim?",
            answer:
              "Evet. Hesap, aynı iş listesini konuşabilmeniz için iyi bir başlangıç noktası sağlar.",
          },
          {
            question: "Bu neden telefonda fiyat sormaktan daha iyi?",
            answer:
              "Önce projenin çerçevesini görürsünüz, sonra detay konuşursunuz. Bu da görüşmeyi daha net ve sakin hale getirir.",
          },
        ],
      },
      {
        id: "final-cta",
        kind: "cta",
        title: "Tadilat için ön hesap alın",
        description:
          "İşleri, bütçeyi ve süreyi önceden görün; ustayla daha net konuşun.",
        primaryCta: "Hesaplayıcıyı aç",
        secondaryCta: "Örnek sonucu gör",
      },
    ],
  },
  en: {
    heroContent: {
      eyebrow: "Renovation calculator for Turkey",
      title: "See budget, timing and scope before you talk to a contractor",
      description:
        "Choose the property type, rooms, work categories and material level. The tool shows an estimated cost range, a phase-based timeline and a clear scope of work you can discuss with a contractor.",
      primaryCta: "Estimate renovation",
      secondaryCta: "View work categories",
      disclaimer:
        "This is a preliminary estimate. Final cost depends on area, material level, relocated utility points and hidden issues revealed after demolition.",
      stats: [
        {
          label: "Estimate format",
          value: "Cost range",
          note: "Instead of a fake single number",
        },
        {
          label: "What you get",
          value: "Works and timing",
          note: "In one clear overview",
        },
        {
          label: "Main benefit",
          value: "Comparable offers",
          note: "Based on the same scope of work",
        },
      ],
    },
    landingSections: [
      {
        id: "pain-points",
        kind: "cards",
        title: "Why starting a renovation feels difficult",
        description:
          "What makes renovation stressful is usually not the work itself, but unclear pricing, shifting timelines and surprise costs after work begins.",
        items: [
          {
            title: "Hard to understand the real budget upfront",
            description:
              "Different contractors quote different numbers, so it is difficult to see a realistic budget before the site visit.",
          },
          {
            title: "Quotes are hard to compare fairly",
            description:
              "Each quote includes a different scope, so side-by-side comparison often becomes confusing.",
          },
          {
            title: "Timelines are often vague",
            description:
              "Without stages and rough timing, promised deadlines rarely feel reliable.",
          },
          {
            title: "Extra costs appear after work starts",
            description:
              "Some tasks only become visible after demolition, and the budget can quickly move higher than expected.",
          },
        ],
      },
      {
        id: "how-it-works",
        kind: "steps",
        title: "How it works",
        description:
          "You define the project scope first and only then discuss execution, cost and timing with the contractor.",
        items: [
          {
            title: "Choose the property and area",
            description:
              "Start with the whole apartment, a kitchen, a bathroom or one room plus the approximate area.",
          },
          {
            title: "Pick works and quality levels",
            description:
              "Demolition, engineering, finishing, furniture and material level are gathered in one place.",
          },
          {
            title: "See the estimate overview",
            description:
              "You get a budget range, timeline phases and a ready work scope for discussion.",
          },
        ],
      },
      {
        id: "work-categories",
        kind: "tiles",
        title: "What can be included",
        description:
          "The main categories are visible upfront, so you can quickly see whether the estimate matches your project.",
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
          "Kitchen cabinetry",
          "Bathroom works",
          "Custom furniture",
        ],
      },
      {
        id: "examples",
        kind: "examples",
        title: "Sample estimates",
        description:
          "These are not fixed prices. They are example ranges to help you understand project size faster.",
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
        title: "Why this estimate is useful",
        description:
          "The goal is not to promise false precision, but to make scope, budget range and cost drivers easier to understand before work begins.",
        items: [
          "It shows a realistic range instead of one random number",
          "Included works are clearly visible",
          "Timeline is viewed by phases, not as one vague deadline",
          "Main cost drivers are highlighted separately",
          "You can save the estimate and return to it later",
          "You can discuss the same scope with more than one contractor",
        ],
      },
      {
        id: "faq",
        kind: "faq",
        title: "Frequently asked questions",
        description:
          "These are the most common questions before starting a renovation: price, timing and scope.",
        items: [
          {
            question: "Is this the exact renovation price?",
            answer:
              "No. It is a preliminary estimate designed to help you understand a realistic budget range before work begins.",
          },
          {
            question: "Why show a range instead of one number?",
            answer:
              "Because final cost depends on materials, current condition, relocated wet points and hidden issues found after demolition.",
          },
          {
            question: "Can I share the result with a contractor?",
            answer:
              "Yes. The estimate gives you a clear starting point for discussing the same scope of work.",
          },
          {
            question: "Why is this better than asking for a quick quote by phone?",
            answer:
              "You first understand the project itself, then discuss execution. That usually leads to a clearer and calmer conversation.",
          },
        ],
      },
      {
        id: "final-cta",
        kind: "cta",
        title: "Get a preliminary renovation estimate",
        description:
          "See scope, budget and timing before you start talking to contractors.",
        primaryCta: "Open calculator",
        secondaryCta: "See a sample result",
      },
    ],
  },
};

export function getSiteStructureContent(language: Language) {
  return contentByLanguage[language];
}
