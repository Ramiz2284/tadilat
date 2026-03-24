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
          "Подойдет тем, кто хочет заранее понять порядок бюджета, основные этапы ремонта и то, что сильнее всего влияет на итоговую стоимость.",
        heroCta: "Рассчитать квартиру",
        areaRange: "80-140 м²",
        trustNote:
          "Ниже приведены ориентировочные диапазоны стоимости для проектов такого типа. Точная цена зависит от состояния объекта, материалов и состава работ.",
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
            scope: ["полный цикл", "брендовые материалы", "мебель", "точная финальная сборка"],
          },
        ],
        faq: [
          {
            question: "Почему диапазон такой широкий?",
            answer:
              "В полной квартире сильнее всего влияют инженерия, уровень материалов, объем демонтажа и нестандартные решения по мебели и дверям.",
          },
          {
            question: "Что чаще всего увеличивает бюджет?",
            answer:
              "Перенос мокрых точек, скрытые дефекты после демонтажа, нестандартные размеры и переход на более дорогие материалы.",
          },
        ],
      },
      {
        id: "kitchen-renovation",
        slug: "remont-kuhni",
        eyebrow: "Ремонт кухни в Турции",
        title: "Стоимость ремонта кухни: бюджет, мебель и инженерия",
        description:
          "Кухня кажется небольшой зоной, но именно здесь на каждый квадратный метр приходится больше инженерии, плитки и мебели.",
        heroCta: "Рассчитать кухню",
        areaRange: "8-18 м²",
        trustNote:
          "Ориентиры по кухне обычно плотнее, чем по жилым комнатам, потому что кухня почти всегда дороже сухих помещений того же размера.",
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
            question: "Почему кухня дороже, чем комната той же площади?",
            answer:
              "Потому что здесь выше инженерная нагрузка, больше плиточных работ, чаще нужна мебель на заказ и больше монтажных узлов.",
          },
          {
            question: "Входит ли мебель в расчет кухни?",
            answer:
              "Да, если в расчете выбрана кухонная мебель. Это помогает сразу понять разницу между отделкой без мебели и вариантом под ключ.",
          },
        ],
      },
      {
        id: "bathroom-renovation",
        slug: "remont-sanuzla",
        eyebrow: "Ремонт санузла в Турции",
        title: "Стоимость ремонта санузла: плитка, сантехника и мокрая зона",
        description:
          "Санузел часто становится самой чувствительной зоной в проекте: ошибки здесь дороже, а стоимость сильнее зависит от инженерии и выбранной сантехники.",
        heroCta: "Рассчитать санузел",
        areaRange: "4-8 м²",
        trustNote:
          "В санузле стоимость на квадратный метр обычно выше из-за инженерных работ, гидроизоляции и сложного монтажа в ограниченном пространстве.",
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
              "Тип сантехники, перенос точек, формат плитки, скрытые работы по гидроизоляции и сложность монтажа в маленьком помещении.",
          },
          {
            question: "Почему срок кажется длинным для маленькой площади?",
            answer:
              "Потому что в санузле много зависимых этапов: демонтаж, инженерия, подготовка, плитка, высыхание и монтаж нельзя сильно сжать без риска.",
          },
        ],
      },
    ],
    expandedFaq: [
      {
        question: "Это окончательная смета?",
        answer:
          "Нет. Это предварительный ориентир, который помогает заранее понять диапазон бюджета, состав работ и сроки.",
      },
      {
        question: "Почему диапазон лучше одной точной цифры?",
        answer:
          "Одна цифра в начале звучит уверенно, но чаще создает больше недоверия. Диапазон честнее показывает неопределенность до вскрытия основания и выбора материалов.",
      },
      {
        question: "Можно ли использовать результат для разговора с мастером?",
        answer:
          "Да. Это помогает обсуждать один и тот же объем работ и спокойнее сравнивать предложения.",
      },
      {
        question: "Нужен ли личный кабинет или база данных?",
        answer: "Нет. Расчет можно сохранить по ссылке и вернуться к нему позже.",
      },
      {
        question: "Что лучше считать сначала: всю квартиру или отдельные зоны?",
        answer:
          "Если ремонт комплексный, лучше начать со всей квартиры. Если задача локальная, удобнее отдельно посчитать кухню или санузел.",
      },
      {
        question: "Какие данные стоит подготовить перед расчетом?",
        answer:
          "Достаточно знать тип объекта, примерную площадь, какие зоны входят в проект и есть ли особые требования к материалам, сроку или мебели.",
      },
    ],
  },
  tr: {
    seoScenarios: [
      {
        id: "apartment-renovation",
        slug: "daire-tadilati",
        eyebrow: "Türkiye'de daire tadilatı",
        title: "Daire tadilat maliyeti: bütçe, süre ve iş kapsamı",
        description:
          "Tam daire tadilatına başlamadan önce yaklaşık bütçeyi, ana aşamaları ve fiyatı en çok etkileyen kalemleri görmek isteyenler için uygundur.",
        heroCta: "Daireyi hesapla",
        areaRange: "80-140 m²",
        trustNote:
          "Aşağıdaki rakamlar bu tip projeler için yaklaşık aralıklardır. Kesin tutar mevcut duruma, malzeme seviyesine ve iş kapsamına göre değişir.",
        presets: [
          {
            label: "Ekonomik",
            min: 650000,
            max: 840000,
            timeline: "35-45 gün",
            scope: ["söküm", "elektrik", "su tesisatı", "duvarlar", "zeminler"],
          },
          {
            label: "Standart",
            min: 820000,
            max: 1050000,
            timeline: "45-55 gün",
            scope: ["söküm", "tesisat", "seramik", "zeminler", "son kat bitiş"],
          },
          {
            label: "Premium",
            min: 1100000,
            max: 1450000,
            timeline: "55-70 gün",
            scope: ["tam kapsam", "markalı malzemeler", "mobilya", "hassas final montaj"],
          },
        ],
        faq: [
          {
            question: "Neden aralık bu kadar geniş?",
            answer:
              "Tam daire tadilatında tesisat, malzeme seviyesi, söküm miktarı ve özel üretim kararları toplam maliyeti ciddi şekilde değiştirebilir.",
          },
          {
            question: "Bütçeyi en çok neler artırır?",
            answer:
              "Islak hacim noktalarının taşınması, sökümden sonra çıkan gizli işler, ölçüye özel üretim ve daha pahalı malzeme seçimleri.",
          },
        ],
      },
      {
        id: "kitchen-renovation",
        slug: "mutfak-tadilati",
        eyebrow: "Türkiye'de mutfak tadilatı",
        title: "Mutfak tadilat maliyeti: bütçe, dolaplar ve tesisat",
        description:
          "Mutfak küçük görünse de metrekare başına daha yoğun iş içerir. Tesisat, seramik, dolap ve montaj toplam maliyeti hızlı yükseltebilir.",
        heroCta: "Mutfağı hesapla",
        areaRange: "8-18 m²",
        trustNote:
          "Mutfak projelerinde maliyet aralığı genelde kuru odalara göre daha yüksektir; bunun nedeni yoğun tesisat ve mobilya işidir.",
        presets: [
          {
            label: "Ekonomik",
            min: 220000,
            max: 320000,
            timeline: "12-16 gün",
            scope: ["söküm", "elektrik", "tezgâh arası", "temel dolap"],
          },
          {
            label: "Standart",
            min: 300000,
            max: 430000,
            timeline: "15-22 gün",
            scope: ["seramik", "tesisat", "dolap", "son kat bitiş"],
          },
          {
            label: "Premium",
            min: 450000,
            max: 650000,
            timeline: "20-28 gün",
            scope: ["premium kapaklar", "ileri cihazlar", "özel montaj"],
          },
        ],
        faq: [
          {
            question: "Neden mutfak aynı alanlı bir odadan daha pahalı?",
            answer:
              "Çünkü mutfakta daha yoğun tesisat vardır, seramik işi artar, dolap ihtiyacı yüksektir ve montaj noktaları daha fazladır.",
          },
          {
            question: "Mutfak dolapları hesaba dahil mi?",
            answer:
              "Evet, mutfak dolabı seçildiyse dahil olur. Böylece sadece bitiş işleri ile daha kapsamlı çözüm arasındaki farkı görebilirsiniz.",
          },
        ],
      },
      {
        id: "bathroom-renovation",
        slug: "banyo-tadilati",
        eyebrow: "Türkiye'de banyo tadilatı",
        title: "Banyo tadilat maliyeti: seramik, tesisat ve vitrifiye",
        description:
          "Banyo, projede en hassas alanlardan biridir. Hatalar daha pahalıya mal olur ve maliyet büyük ölçüde tesisat ile seçilen ürünlere bağlıdır.",
        heroCta: "Banyoyu hesapla",
        areaRange: "4-8 m²",
        trustNote:
          "Banyoda metrekare başına maliyet genelde daha yüksektir; sebebi mühendislik, yalıtım ve dar alandaki montaj zorluğudur.",
        presets: [
          {
            label: "Ekonomik",
            min: 180000,
            max: 250000,
            timeline: "10-14 gün",
            scope: ["söküm", "seramik", "temel vitrifiye"],
          },
          {
            label: "Standart",
            min: 220000,
            max: 320000,
            timeline: "12-18 gün",
            scope: ["seramik", "tesisat dağıtımı", "gömme sistem", "final montaj"],
          },
          {
            label: "Premium",
            min: 340000,
            max: 480000,
            timeline: "16-24 gün",
            scope: ["ileri vitrifiye", "markalı malzemeler", "hassas montaj"],
          },
        ],
        faq: [
          {
            question: "Banyo maliyetini en çok ne etkiler?",
            answer:
              "Seçilen vitrifiye tipi, nokta taşımaları, seramik formatı, su yalıtımı ve dar alandaki montaj zorluğu.",
          },
          {
            question: "Küçük alana rağmen neden süre uzun görünüyor?",
            answer:
              "Çünkü banyoda pek çok aşama birbirine bağlıdır: söküm, tesisat, hazırlık, seramik, kuruma ve montaj fazla sıkıştırılamaz.",
          },
        ],
      },
    ],
    expandedFaq: [
      {
        question: "Bu kesin fiyat mı?",
        answer:
          "Hayır. Bu, başlamadan önce yaklaşık bütçe aralığını ve iş kapsamını görmek için hazırlanmış ön hesaptır.",
      },
      {
        question: "Neden tek rakam yerine aralık daha iyi?",
        answer:
          "Tek rakam başta iyi görünebilir ama çoğu zaman yanıltıcı olur. Aralık, belirsizliği daha dürüst gösterir.",
      },
      {
        question: "Sonucu ustayla konuşmak için kullanabilir miyim?",
        answer:
          "Evet. Bu hesap, aynı iş listesini konuşmak ve teklifleri daha rahat karşılaştırmak için iyi bir başlangıçtır.",
      },
      {
        question: "Hesabı kaydedebilir miyim?",
        answer: "Evet. Hesabı link olarak saklayıp daha sonra tekrar açabilirsiniz.",
      },
      {
        question: "Önce tüm daireyi mi yoksa tek bir alanı mı hesaplamak daha iyi?",
        answer:
          "İş kapsamlıysa tüm daireyle başlamak daha doğru olur. Daha küçük bir işte mutfak veya banyoyu ayrı değerlendirmek daha pratiktir.",
      },
      {
        question: "Hesap için hangi bilgiler yeterlidir?",
        answer:
          "Mülk tipi, yaklaşık alan, projeye girecek mekânlar ve malzeme ya da süreyle ilgili özel beklentiler yeterlidir.",
      },
    ],
  },
  en: {
    seoScenarios: [
      {
        id: "apartment-renovation",
        slug: "apartment-renovation",
        eyebrow: "Apartment renovation in Turkey",
        title: "Apartment renovation cost: budget, timing and scope",
        description:
          "Useful if you want an early view of the overall budget, the main renovation stages and the items most likely to change the final cost.",
        heroCta: "Estimate apartment",
        areaRange: "80-140 m²",
        trustNote:
          "The figures below are approximate ranges for this type of project. Final cost depends on current condition, material level and exact scope.",
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
              "In a full apartment renovation, engineering, material level, demolition volume and custom solutions can all change the final total significantly.",
          },
          {
            question: "What usually increases the budget the most?",
            answer:
              "Wet-point relocation, hidden defects after demolition, custom sizes and upgrades to more expensive materials.",
          },
        ],
      },
      {
        id: "kitchen-renovation",
        slug: "kitchen-renovation",
        eyebrow: "Kitchen renovation in Turkey",
        title: "Kitchen renovation cost: budget, cabinetry and engineering",
        description:
          "A kitchen may look compact, but cost per square meter is usually higher here because of engineering, tiling, cabinetry and installation work.",
        heroCta: "Estimate kitchen",
        areaRange: "8-18 m²",
        trustNote:
          "Kitchen projects are usually more expensive than dry rooms of the same size because they combine more engineering and furniture work.",
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
              "Because kitchens carry more engineering density, more tile work, more furniture and more installation nodes.",
          },
          {
            question: "Are kitchen cabinets included in the estimate?",
            answer:
              "Yes, if kitchen cabinetry is selected. That helps you see the difference between finish-only and more complete solutions.",
          },
        ],
      },
      {
        id: "bathroom-renovation",
        slug: "bathroom-renovation",
        eyebrow: "Bathroom renovation in Turkey",
        title: "Bathroom renovation cost: tile, plumbing and fixtures",
        description:
          "Bathrooms are often the most sensitive rooms in a project. Mistakes cost more here, and final price depends strongly on engineering and fixture choices.",
        heroCta: "Estimate bathroom",
        areaRange: "4-8 m²",
        trustNote:
          "Bathrooms usually cost more per square meter because of engineering, waterproofing and more difficult installation work.",
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
              "Fixture type, relocated points, tile format, waterproofing work and the difficulty of installing in a small space.",
          },
          {
            question: "Why does the timeline feel long for a small area?",
            answer:
              "Because many bathroom stages depend on each other: demolition, engineering, preparation, tile, drying time and installation cannot be compressed too aggressively.",
          },
        ],
      },
    ],
    expandedFaq: [
      {
        question: "Is this the final quotation?",
        answer:
          "No. It is a preliminary estimate that helps you understand budget range, scope and timing before work begins.",
      },
      {
        question: "Why is a range better than one exact figure?",
        answer:
          "A single number may sound confident, but it is often misleading early on. A range is a more honest way to show uncertainty.",
      },
      {
        question: "Can I use the result when speaking to a contractor?",
        answer:
          "Yes. It gives you a clearer base for discussing the same scope of work and comparing offers more calmly.",
      },
      {
        question: "Can I save the estimate?",
        answer: "Yes. You can keep it by link and reopen it later.",
      },
      {
        question: "Should I estimate the whole apartment or a single area first?",
        answer:
          "If the renovation is comprehensive, start with the full apartment. For a smaller task, estimating the kitchen or bathroom separately can be more practical.",
      },
      {
        question: "What information should I prepare first?",
        answer:
          "The property type, approximate area, included rooms and any expectations around materials or timing are enough to begin.",
      },
    ],
  },
};

export function getMarketPresetsContent(language: Language) {
  return contentByLanguage[language];
}
