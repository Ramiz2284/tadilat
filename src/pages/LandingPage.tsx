import { Link } from "react-router-dom";
import { heroContent, landingSections, seoScenarios } from "../content";
import { trackEvent } from "../shared/analytics";
import { Section } from "../shared/ui/Section";
import { LeadForm } from "../shared/ui/LeadForm";
import { useSeo } from "../shared/seo/useSeo";

export function LandingPage() {
  useSeo({
    title: "Калькулятор ремонта квартиры в Турции",
    description:
      "Поймите бюджет, список работ и сроки ремонта до разговора с мастером. Калькулятор, пресеты цен, FAQ и страница результата в одном сервисе.",
    path: "/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Tadilat",
      url: "https://ramiz2284.github.io/tadilat/",
      description:
        "Калькулятор ремонта квартиры в Турции с диапазоном сметы, сроками и shareable результатом.",
    },
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
              to="/calculator"
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
          <span className="hero-card-label">Пример результата</span>
          <strong>120 м² · стандарт · 45-50 дней</strong>
          <p>Ориентир: 820 000 - 1 050 000 TL</p>
          <ul>
            <li>Кухня, санузел, полы, электрика, сантехника</li>
            <li>Этапы по срокам и факторы риска уже внутри</li>
            <li>Ссылку можно отправить мастеру, семье или партнеру</li>
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

      <Section
        className="surface"
        description="Эти страницы помогают заходить в продукт по понятным поисковым сценариям: квартира, кухня и санузел."
        title="Популярные сценарии ремонта"
      >
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
                  to={`/guides/${scenario.slug}`}
                >
                  Открыть страницу
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
                      to="/calculator"
                    >
                      {section.primaryCta}
                    </Link>
                    <Link
                      className="button button-secondary"
                      onClick={() => trackEvent("cta_click", { location: "final_cta", target: "result" })}
                      to="/result"
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
      
      <Section
        className="surface"
        description="Если удобно, можно оставить контакт и кратко описать проект. Для MVP форма работает без кабинета и готова к подключению CRM."
        title="Оставить запрос по проекту"
      >
        <LeadForm
          description="Подходит для сценария, когда человек еще не готов заполнять все шаги калькулятора, но хочет оставить проект в работе."
          title="Короткая заявка"
        />
      </Section>
    </div>
  );
}
