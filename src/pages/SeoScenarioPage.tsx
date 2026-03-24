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
    fallbackTitle: "Сценарий ремонта",
    fallbackDescription:
      "Страница со сценарием ремонта, диапазонами бюджета и частыми вопросами.",
    notFoundEyebrow: "Страница не найдена",
    notFoundTitle: "Такого сценария пока нет",
    goCalculator: "Перейти к калькулятору",
    areaLabel: "Ориентир по площади",
    goFaq: "Перейти в FAQ",
    leadTitle: "Оставить запрос по этому сценарию",
    leadDescription:
      "Оставьте контакт, если хотите использовать эту страницу как SEO-вход и сразу перевести пользователя в лид.",
  },
  tr: {
    fallbackTitle: "Tadilat senaryosu",
    fallbackDescription:
      "Bütçe aralıkları ve sık sorularla birlikte bir tadilat senaryosu sayfası.",
    notFoundEyebrow: "Sayfa bulunamad?dı",
    notFoundTitle: "Bu senaryo henüz yok",
    goCalculator: "Hesaplayıcıya git",
    areaLabel: "Alan referans?sı",
    goFaq: "FAQ'ya git",
    leadTitle: "Bu senaryo için talep bırak",
    leadDescription:
      "Bu sayfayı SEO girişi olarak kullanıp kullanıcıyı hemen leade çevirmek istiyorsanız iletişim bırakın.",
  },
  en: {
    fallbackTitle: "Renovation scenario",
    fallbackDescription:
      "A renovation scenario page with budget ranges and common questions.",
    notFoundEyebrow: "Page not found",
    notFoundTitle: "This scenario is not available yet",
    goCalculator: "Go to calculator",
    areaLabel: "Area reference",
    goFaq: "Open FAQ",
    leadTitle: "Leave a request for this scenario",
    leadDescription:
      "Leave a contact if you want this page to work as an SEO entry point and immediately capture a lead.",
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
