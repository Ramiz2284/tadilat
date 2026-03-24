import { Link } from "react-router-dom";
import { getMarketPresetsContent } from "../content";
import { getAlternatesForRoute, getRoutePath, useI18n } from "../shared/i18n";
import { useSeo } from "../shared/seo/useSeo";
import { LeadForm } from "../shared/ui/LeadForm";

const pageCopy = {
  ru: {
    seoTitle: "FAQ по ремонту квартиры в Турции",
    seoDescription:
      "Ответы на частые вопросы о расчете бюджета ремонта, диапазонах цен, сроках, ТЗ для мастеров и логике работы калькулятора.",
    eyebrow: "FAQ",
    title: "Ответы на частые вопросы о расчете ремонта",
    description:
      "Здесь собраны вопросы, которые обычно мешают человеку довериться оценке бюджета и сроков до разговора с мастером.",
    nextStep: "Лучший следующий шаг",
    nextValue: "Сначала собрать расчет",
    nextDescription: "Потом обсуждать предложения уже на одной основе",
    openCalculator: "Открыть калькулятор",
    leadTitle: "Нужен разбор проекта?",
    leadDescription:
      "Если удобнее, оставьте контакт и кратко опишите проект. Это хороший слой для будущей интеграции с CRM.",
  },
  tr: {
    seoTitle: "Türkiye'de daire tadilatı için FAQ",
    seoDescription:
      "Tadilat bütçesi, fiyat aralıkları, süre, usta briefi ve hesaplayıcının mantığı hakkındaki yaygın soruların yanıtları.",
    eyebrow: "FAQ",
    title: "Tadilat hesabı hakkındaki sık sorular",
    description:
      "Burada, insanların usta ile konuşmadan önce bütçe ve süre tahminine güvenmesini zorlaştıran ana sorular toplanır.",
    nextStep: "En iyi sonraki adım",
    nextValue: "Önce hesabı toplamak",
    nextDescription: "Sonra teklifleri aynı kapsam üzerinden konuşmak",
    openCalculator: "Hesaplayıcıyı aç",
    leadTitle: "Projeyi birlikte inceleyelim mi?",
    leadDescription:
      "İsterseniz iletişim bilginizi ve kısa proje notunu bırakın. Bu bölüm ileride CRM entegrasyonu için de uygundur.",
  },
  en: {
    seoTitle: "FAQ for apartment renovation in Turkey",
    seoDescription:
      "Answers to common questions about renovation budgeting, price ranges, timing, contractor briefs and how the calculator works.",
    eyebrow: "FAQ",
    title: "Answers to common renovation estimate questions",
    description:
      "This page collects the questions that usually make people hesitate to trust budget and timing estimates before speaking with a contractor.",
    nextStep: "Best next step",
    nextValue: "Build the estimate first",
    nextDescription: "Then discuss offers from the same starting point",
    openCalculator: "Open calculator",
    leadTitle: "Need help reviewing the project?",
    leadDescription:
      "If easier, leave a contact and a short project description. This section is also a good foundation for future CRM integration.",
  },
};

export function FaqPage() {
  const { language } = useI18n();
  const copy = pageCopy[language];
  const { expandedFaq } = getMarketPresetsContent(language);

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: getRoutePath(language, "faq"),
    alternates: getAlternatesForRoute("faq"),
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: language,
        mainEntity: expandedFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getRoutePath(language, "home"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ",
            item: getRoutePath(language, "faq"),
          },
        ],
      },
    ],
  });

  return (
    <div className="page">
      <section className="result-shell">
        <div className="result-hero">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p>{copy.description}</p>
          </div>

          <div className="result-price-card">
            <span>{copy.nextStep}</span>
            <strong>{copy.nextValue}</strong>
            <p>{copy.nextDescription}</p>
          </div>
        </div>

        <div className="faq-list">
          {expandedFaq.map((item) => (
            <details className="faq-item" key={item.question} open={false}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="surface-panel">
          <div className="section-actions">
            <Link className="button button-primary" to={getRoutePath(language, "calculator")}>
              {copy.openCalculator}
            </Link>
          </div>
        </div>

        <div className="surface-panel">
          <LeadForm description={copy.leadDescription} title={copy.leadTitle} />
        </div>
      </section>
    </div>
  );
}
