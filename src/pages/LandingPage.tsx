import { Link } from "react-router-dom";
import { DEFAULT_SITE_URL } from "../app/seo/routes";
import { getMarketPresetsContent, getSiteStructureContent } from "../content";
import { getAlternatesForRoute, getGuidePathBySlug, getRoutePath, useI18n } from "../shared/i18n";
import { trackEvent } from "../shared/analytics";
import { useSeo } from "../shared/seo/useSeo";
import { LeadForm } from "../shared/ui/LeadForm";
import { Section } from "../shared/ui/Section";

const pageCopy = {
  ru: {
    seoTitle: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u0440\u0435\u043c\u043e\u043d\u0442\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b \u0432 \u0422\u0443\u0440\u0446\u0438\u0438",
    seoDescription:
      "\u041f\u043e\u0439\u043c\u0438\u0442\u0435 \u0431\u044e\u0434\u0436\u0435\u0442, \u0441\u043f\u0438\u0441\u043e\u043a \u0440\u0430\u0431\u043e\u0442 \u0438 \u0441\u0440\u043e\u043a\u0438 \u0440\u0435\u043c\u043e\u043d\u0442\u0430 \u0434\u043e \u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u0430 \u0441 \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u043c. \u0412 \u043e\u0434\u043d\u043e\u043c \u043c\u0435\u0441\u0442\u0435 \u0432\u044b \u0443\u0432\u0438\u0434\u0438\u0442\u0435 \u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440 \u043f\u043e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u0438, \u044d\u0442\u0430\u043f\u0430\u043c \u0438 \u0441\u043e\u0441\u0442\u0430\u0432\u0443 \u0440\u0430\u0431\u043e\u0442.",
    popularDescription:
      "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u0438 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u044b \u043f\u043e \u0441\u0440\u043e\u043a\u0430\u043c \u0438 \u0431\u044e\u0434\u0436\u0435\u0442\u0443.",
    popularTitle: "\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u0440\u0435\u043c\u043e\u043d\u0442\u0430",
    openScenario: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443",
    sampleLabel: "\u041f\u0440\u0438\u043c\u0435\u0440 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430",
    sampleValue: "120 \u043c\u00B2 \u00B7 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442 \u00B7 45-50 \u0434\u043d\u0435\u0439",
    sampleEstimate: "\u041e\u0440\u0438\u0435\u043d\u0442\u0438\u0440: 820 000 - 1 050 000 TL",
    sampleList: [
      "\u041a\u0443\u0445\u043d\u044f, \u0441\u0430\u043d\u0443\u0437\u0435\u043b, \u043f\u043e\u043b\u044b, \u044d\u043b\u0435\u043a\u0442\u0440\u0438\u043a\u0430, \u0441\u0430\u043d\u0442\u0435\u0445\u043d\u0438\u043a\u0430",
      "\u042d\u0442\u0430\u043f\u044b \u043f\u043e \u0441\u0440\u043e\u043a\u0430\u043c \u0438 \u0444\u0430\u043a\u0442\u043e\u0440\u044b \u0440\u0438\u0441\u043a\u0430 \u0443\u0436\u0435 \u0432\u043d\u0443\u0442\u0440\u0438",
      "\u0421\u0441\u044b\u043b\u043a\u0443 \u043c\u043e\u0436\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043c\u0430\u0441\u0442\u0435\u0440\u0443, \u0441\u0435\u043c\u044c\u0435 \u0438\u043b\u0438 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0443",
    ],
    requestTitle: "\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 \u043f\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0443",
    requestDescription:
      "\u0415\u0441\u043b\u0438 \u0445\u043e\u0442\u0438\u0442\u0435, \u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u0438 \u043a\u0440\u0430\u0442\u043a\u043e \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u0440\u043e\u0435\u043a\u0442. \u0422\u0430\u043a \u0431\u0443\u0434\u0435\u0442 \u043f\u0440\u043e\u0449\u0435 \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u043c\u0443 \u0448\u0430\u0433\u0443.",
    leadTitle: "\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443",
    leadDescription:
      "\u041f\u043e\u0434\u0445\u043e\u0434\u0438\u0442, \u0435\u0441\u043b\u0438 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043e\u0431\u0441\u0443\u0434\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442 \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043e\u0431\u0440\u0430\u0442\u043d\u0443\u044e \u0441\u0432\u044f\u0437\u044c \u043f\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u043c \u0438 \u0431\u044e\u0434\u0436\u0435\u0442\u0443.",
  },
  tr: {
    seoTitle: "T\u00FCrkiye'de daire tadilat\u0131 hesaplay\u0131c\u0131s\u0131",
    seoDescription:
      "Ustayla konu\u015Fmadan \u00F6nce b\u00FCt\u00E7eyi, i\u015F listesini ve s\u00FCreyi g\u00F6r\u00FCn. Tek bir yerde yakla\u015F\u0131k maliyet, a\u015Famalar ve i\u015F kapsam\u0131n\u0131 inceleyin.",
    popularDescription:
      "Proje tipinizi se\u00E7in ve s\u00FCre ile b\u00FCt\u00E7e aral\u0131klar\u0131n\u0131 g\u00F6r\u00FCn.",
    popularTitle: "Yayg\u0131n tadilat senaryolar\u0131",
    openScenario: "Sayfay\u0131 a\u00E7",
    sampleLabel: "\u00D6rnek sonu\u00E7",
    sampleValue: "120 m\u00B2 \u00B7 standart \u00B7 45-50 g\u00FCn",
    sampleEstimate: "\u00D6n aral\u0131k: 820.000 - 1.050.000 TL",
    sampleList: [
      "Mutfak, banyo, zemin, elektrik ve su tesisat\u0131",
      "Zaman a\u015Famalar\u0131 ve risk fakt\u00F6rleri sonucun i\u00E7inde",
      "Ba\u011Flant\u0131y\u0131 ustaya, aileye ya da orta\u011Fa g\u00F6nderebilirsiniz",
    ],
    requestTitle: "Proje talebi b\u0131rak",
    requestDescription:
      "\u0130sterseniz ileti\u015Fim bilgisi ve k\u0131sa proje notu b\u0131rak\u0131n. B\u00F6ylece bir sonraki ad\u0131ma ge\u00E7mek daha kolay olur.",
    leadTitle: "Talep b\u0131rak",
    leadDescription:
      "Projeyi konu\u015Fmak ve i\u015Fler ile b\u00FCt\u00E7e hakk\u0131nda geri d\u00F6n\u00FC\u015F almak isteyenler i\u00E7in uygundur.",
  },
  en: {
    seoTitle: "Apartment renovation calculator for Turkey",
    seoDescription:
      "Understand budget, work scope and timing before you talk to a contractor. See estimated cost, phases and scope in one place.",
    popularDescription:
      "Choose the project type and see typical timing and budget ranges.",
    popularTitle: "Popular renovation scenarios",
    openScenario: "Open page",
    sampleLabel: "Sample result",
    sampleValue: "120 m\u00B2 \u00B7 standard \u00B7 45-50 days",
    sampleEstimate: "Reference: 820,000 - 1,050,000 TL",
    sampleList: [
      "Kitchen, bathroom, floors, electrical and plumbing",
      "Timeline phases and risk drivers already included",
      "The link can be shared with a contractor, family member or partner",
    ],
    requestTitle: "Leave a project request",
    requestDescription:
      "If you want, leave a contact and a short project note so it is easier to move to the next step.",
    leadTitle: "Leave a request",
    leadDescription:
      "Useful if you want to discuss the project and get feedback on scope and budget.",
  },
};

export function LandingPage() {
  const { language } = useI18n();
  const copy = pageCopy[language];
  const { heroContent, landingSections } = getSiteStructureContent(language);
  const { seoScenarios } = getMarketPresetsContent(language);

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: getRoutePath(language, "home"),
    alternates: getAlternatesForRoute("home"),
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Tadilat",
        url: `${DEFAULT_SITE_URL}/`,
        description: copy.seoDescription,
        inLanguage: language,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.seoTitle,
            item: `${DEFAULT_SITE_URL}${getRoutePath(language, "home")}`,
          },
        ],
      },
    ],
  });

  return (
    <div className="page landing-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{heroContent.eyebrow}</p>
          <h1>{heroContent.title}</h1>
          <p className="hero-description">{heroContent.description}</p>

          <div className="hero-actions">
            <Link
              className="button button-primary"
              onClick={() => trackEvent("cta_click", { location: "hero", target: "calculator" })}
              to={getRoutePath(language, "calculator")}
            >
              {heroContent.primaryCta}
            </Link>
            <a
              className="button button-secondary"
              href="#work-categories"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", target: "work_categories" })
              }
            >
              {heroContent.secondaryCta}
            </a>
          </div>

          <p className="hero-disclaimer">{heroContent.disclaimer}</p>
        </div>

        <div className="hero-card">
          <span className="hero-card-label">{copy.sampleLabel}</span>
          <strong>{copy.sampleValue}</strong>
          <p>{copy.sampleEstimate}</p>
          <ul>
            {copy.sampleList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="stats-grid">
        {heroContent.stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            {stat.note ? <p>{stat.note}</p> : null}
          </article>
        ))}
      </section>

      <Section className="surface" description={copy.popularDescription} title={copy.popularTitle}>
        <div className="example-grid">
          {seoScenarios.map((scenario) => (
            <article className="example-card" key={scenario.slug}>
              <h3>{scenario.eyebrow}</h3>
              <strong>{scenario.areaRange}</strong>
              <p>{scenario.title}</p>
              <div className="section-actions">
                <Link
                  className="button button-secondary"
                  onClick={() =>
                    trackEvent("cta_click", { location: "seo_scenarios", target: scenario.slug })
                  }
                  to={getGuidePathBySlug(language, scenario.slug)}
                >
                  {copy.openScenario}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {landingSections.map((section) => {
        switch (section.kind) {
          case "cards":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="card-grid">
                  {section.items.map((item) => (
                    <article className="info-card" key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </Section>
            );
          case "steps":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="step-grid">
                  {section.items.map((item, index) => (
                    <article className="step-card" key={item.title}>
                      <span className="step-number">0{index + 1}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </Section>
            );
          case "tiles":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="pill-grid" id={section.id}>
                  {section.items.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </Section>
            );
          case "examples":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="example-grid">
                  {section.items.map((item) => (
                    <article className="example-card" key={item.title}>
                      <h3>{item.title}</h3>
                      <strong>{item.estimate}</strong>
                      <p>{item.timeline}</p>
                      <small>{item.note}</small>
                    </article>
                  ))}
                </div>
              </Section>
            );
          case "checklist":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="checklist">
                  {section.items.map((item) => (
                    <article className="check-item" key={item}>
                      <span className="check-mark">+</span>
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              </Section>
            );
          case "faq":
            return (
              <Section key={section.id} className="surface" title={section.title} description={section.description}>
                <div className="faq-list">
                  {section.items.map((item) => (
                    <details className="faq-item" key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Section>
            );
          case "cta":
            return (
              <Section
                key={section.id}
                className="cta-banner"
                title={section.title}
                description={section.description}
                actions={
                  <>
                    <Link
                      className="button button-primary"
                      onClick={() => trackEvent("cta_click", { location: "final_cta", target: "calculator" })}
                      to={getRoutePath(language, "calculator")}
                    >
                      {section.primaryCta}
                    </Link>
                    <Link
                      className="button button-secondary"
                      onClick={() => trackEvent("cta_click", { location: "final_cta", target: "result" })}
                      to={getRoutePath(language, "result")}
                    >
                      {section.secondaryCta}
                    </Link>
                  </>
                }
              >
                <div />
              </Section>
            );
        }
      })}

      <Section className="surface" description={copy.requestDescription} title={copy.requestTitle}>
        <LeadForm description={copy.leadDescription} title={copy.leadTitle} />
      </Section>
    </div>
  );
}
