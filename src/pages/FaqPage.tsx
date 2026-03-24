import { Link } from "react-router-dom";
import { getMarketPresetsContent } from "../content";
import { getAlternatesForRoute, getRoutePath, useI18n } from "../shared/i18n";
import { useSeo } from "../shared/seo/useSeo";
import { LeadForm } from "../shared/ui/LeadForm";

const pageCopy = {
  ru: {
    seoTitle: "FAQ \u043f\u043e \u0440\u0435\u043c\u043e\u043d\u0442\u0443 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b \u0432 \u0422\u0443\u0440\u0446\u0438\u0438",
    seoDescription:
      "\u041e\u0442\u0432\u0435\u0442\u044b \u043d\u0430 \u0447\u0430\u0441\u0442\u044b\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e \u0431\u044e\u0434\u0436\u0435\u0442\u0435, \u0441\u0440\u043e\u043a\u0430\u0445 \u0438 \u0441\u043e\u0441\u0442\u0430\u0432\u0435 \u0440\u0435\u043c\u043e\u043d\u0442\u0430.",
    eyebrow: "FAQ",
    title: "\u041e\u0442\u0432\u0435\u0442\u044b \u043d\u0430 \u0447\u0430\u0441\u0442\u044b\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e \u0440\u0430\u0441\u0447\u0435\u0442\u0435 \u0440\u0435\u043c\u043e\u043d\u0442\u0430",
    description:
      "\u0417\u0434\u0435\u0441\u044c \u0441\u043e\u0431\u0440\u0430\u043d\u044b \u0432\u043e\u043f\u0440\u043e\u0441\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043e\u0431\u044b\u0447\u043d\u043e \u043c\u0435\u0448\u0430\u044e\u0442 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0443 \u0434\u043e\u0432\u0435\u0440\u0438\u0442\u044c\u0441\u044f \u043e\u0446\u0435\u043d\u043a\u0435 \u0431\u044e\u0434\u0436\u0435\u0442\u0430 \u0438 \u0441\u0440\u043e\u043a\u043e\u0432 \u0434\u043e \u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u0430 \u0441 \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u043c.",
    nextStep: "\u041b\u0443\u0447\u0448\u0438\u0439 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0448\u0430\u0433",
    nextValue: "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0441\u043e\u0431\u0440\u0430\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442",
    nextDescription: "\u041f\u043e\u0442\u043e\u043c \u043e\u0431\u0441\u0443\u0436\u0434\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0443\u0436\u0435 \u043d\u0430 \u043e\u0434\u043d\u043e\u0439 \u043e\u0441\u043d\u043e\u0432\u0435",
    openCalculator: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440",
    leadTitle: "\u0425\u043e\u0442\u0438\u0442\u0435 \u043e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442?",
    leadDescription:
      "\u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u0438 \u043a\u0440\u0430\u0442\u043a\u043e \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443, \u0435\u0441\u043b\u0438 \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c \u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440 \u043f\u043e \u0432\u0430\u0448\u0435\u043c\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0443.",
  },
  tr: {
    seoTitle: "T\u00FCrkiye'de daire tadilat\u0131 i\u00E7in SSS",
    seoDescription:
      "Tadilat b\u00FCt\u00E7esi, s\u00FCre ve i\u015F kapsam\u0131 hakk\u0131nda en s\u0131k sorulan sorular\u0131n yan\u0131tlar\u0131.",
    eyebrow: "SSS",
    title: "Tadilat hesab\u0131 hakk\u0131ndaki s\u0131k sorular",
    description:
      "Burada, insanlar\u0131n usta ile konu\u015Fmadan \u00F6nce b\u00FCt\u00E7e ve s\u00FCre tahminine g\u00FCvenmesini zorla\u015Ft\u0131ran ana sorular toplan\u0131r.",
    nextStep: "En iyi sonraki ad\u0131m",
    nextValue: "\u00D6nce hesab\u0131 toplamak",
    nextDescription: "Sonra teklifleri ayn\u0131 kapsam \u00FCzerinden konu\u015Fmak",
    openCalculator: "Hesaplay\u0131c\u0131y\u0131 a\u00E7",
    leadTitle: "Projeyi konu\u015Fmak ister misiniz?",
    leadDescription:
      "Devam etmek isterseniz ileti\u015Fim bilginizi ve k\u0131sa proje notunuzu b\u0131rak\u0131n.",
  },
  en: {
    seoTitle: "FAQ for apartment renovation in Turkey",
    seoDescription:
      "Answers to common questions about renovation budget, timing and scope.",
    eyebrow: "FAQ",
    title: "Answers to common renovation estimate questions",
    description:
      "This page collects the questions that usually make people hesitate to trust budget and timing estimates before speaking with a contractor.",
    nextStep: "Best next step",
    nextValue: "Build the estimate first",
    nextDescription: "Then discuss offers from the same starting point",
    openCalculator: "Open calculator",
    leadTitle: "Want to discuss the project?",
    leadDescription:
      "Leave a contact and a short project note if you want to continue the conversation.",
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
