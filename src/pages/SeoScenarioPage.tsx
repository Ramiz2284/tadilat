import { Link, useParams } from "react-router-dom";
import { getMarketPresetsContent } from "../content";
import {
  getAlternatesForRoute,
  getGuidePath,
  getGuidePathBySlug,
  getRoutePath,
  localeByLanguage,
  useI18n,
} from "../shared/i18n";
import { useSeo } from "../shared/seo/useSeo";
import { LeadForm } from "../shared/ui/LeadForm";

const pageCopy = {
  ru: {
    fallbackTitle: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0440\u0435\u043C\u043E\u043D\u0442\u0430",
    fallbackDescription:
      "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441 \u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u043C \u043F\u043E \u0431\u044E\u0434\u0436\u0435\u0442\u0443 \u0438 \u0447\u0430\u0441\u0442\u044B\u043C\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C\u0438 \u0434\u043B\u044F \u0442\u0430\u043A\u043E\u0433\u043E \u0442\u0438\u043F\u0430 \u0440\u0435\u043C\u043E\u043D\u0442\u0430.",
    notFoundEyebrow: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
    notFoundTitle: "\u0422\u0430\u043A\u043E\u0433\u043E \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0442",
    goCalculator: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440\u0443",
    areaLabel: "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440 \u043F\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u0438",
    goFaq: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 FAQ",
    leadTitle: "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u043F\u0440\u043E\u0435\u043A\u0442",
    leadDescription:
      "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u044B, \u0441\u0440\u043E\u043A\u0438 \u0438 \u043F\u0440\u0438\u043C\u0435\u0440\u043D\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u0442\u0438\u043F\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0430.",
  },
  tr: {
    fallbackTitle: "Tadilat senaryosu",
    fallbackDescription:
      "Bu tadilat t\u00FCr\u00FC i\u00E7in b\u00FCt\u00E7e aral\u0131\u011F\u0131 ve s\u0131k sorular\u0131n yer ald\u0131\u011F\u0131 sayfa.",
    notFoundEyebrow: "Sayfa bulunamad\u0131",
    notFoundTitle: "Bu senaryo hen\u00FCz yok",
    goCalculator: "Hesaplay\u0131c\u0131ya git",
    areaLabel: "Alan aral\u0131\u011F\u0131",
    goFaq: "SSS sayfas\u0131n\u0131 a\u00E7",
    leadTitle: "Bu projeyi konu\u015Fal\u0131m",
    leadDescription:
      "Bu tip proje i\u00E7in i\u015Fler, s\u00FCre ve yakla\u015F\u0131k b\u00FCt\u00E7eyi konu\u015Fmak isterseniz ileti\u015Fim b\u0131rak\u0131n.",
  },
  en: {
    fallbackTitle: "Renovation scenario",
    fallbackDescription:
      "A page with budget guidance and common questions for this type of renovation.",
    notFoundEyebrow: "Page not found",
    notFoundTitle: "This scenario is not available yet",
    goCalculator: "Go to calculator",
    areaLabel: "Area reference",
    goFaq: "Open FAQ",
    leadTitle: "Discuss this project",
    leadDescription:
      "Leave a contact if you want to talk through works, timing and the expected budget for this type of project.",
  },
};

export function SeoScenarioPage() {
  const { slug } = useParams();
  const { language } = useI18n();
  const copy = pageCopy[language];
  const { seoScenarios } = getMarketPresetsContent(language);
  const scenario = seoScenarios.find((item) => item.slug === slug);

  useSeo({
    title: scenario?.title ?? copy.fallbackTitle,
    description: scenario?.description ?? copy.fallbackDescription,
    path: scenario ? getGuidePathBySlug(language, scenario.slug) : getRoutePath(language, "home"),
    alternates: scenario ? getAlternatesForRoute("guide", { scenarioId: scenario.id }) : undefined,
    type: "article",
    structuredData: scenario
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: scenario.title,
            description: scenario.description,
            areaServed: "Turkey",
            inLanguage: language,
            offers: scenario.presets.map((preset) => ({
              "@type": "Offer",
              name: preset.label,
              priceCurrency: "TRY",
              lowPrice: preset.min,
              highPrice: preset.max,
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
                name: "Guides",
                item: getGuidePath(language, scenario.id),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: scenario.title,
                item: getGuidePathBySlug(language, scenario.slug),
              },
            ],
          },
        ]
      : undefined,
  });

  if (!scenario) {
    return (
      <div className="page">
        <section className="result-shell empty-state">
          <p className="eyebrow">{copy.notFoundEyebrow}</p>
          <h1>{copy.notFoundTitle}</h1>
          <Link className="button button-primary" to={getRoutePath(language, "calculator")}>
            {copy.goCalculator}
          </Link>
        </section>
      </div>
    );
  }

  const locale = localeByLanguage[language];

  return (
    <div className="page">
      <section className="result-shell">
        <div className="result-hero">
          <div>
            <p className="eyebrow">{scenario.eyebrow}</p>
            <h1>{scenario.title}</h1>
            <p>{scenario.description}</p>
          </div>

          <div className="result-price-card">
            <span>{copy.areaLabel}</span>
            <strong>{scenario.areaRange}</strong>
            <p>{scenario.trustNote}</p>
          </div>
        </div>

        <div className="example-grid">
          {scenario.presets.map((preset) => (
            <article className="example-card" key={preset.label}>
              <h3>{preset.label}</h3>
              <strong>
                {new Intl.NumberFormat(locale).format(preset.min)} -{" "}
                {new Intl.NumberFormat(locale).format(preset.max)} TL
              </strong>
              <p>{preset.timeline}</p>
              <small>{preset.scope.join(", ")}</small>
            </article>
          ))}
        </div>

        <div className="faq-list">
          {scenario.faq.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="surface-panel">
          <div className="section-actions">
            <Link className="button button-primary" to={getRoutePath(language, "calculator")}>
              {scenario.heroCta}
            </Link>
            <Link className="button button-secondary" to={getRoutePath(language, "faq")}>
              {copy.goFaq}
            </Link>
          </div>
        </div>

        <div className="surface-panel">
          <LeadForm
            description={copy.leadDescription}
            projectType={scenario.eyebrow}
            title={copy.leadTitle}
          />
        </div>
      </section>
    </div>
  );
}
