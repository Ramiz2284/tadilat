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
    seoTitle: "Калькулятор ремонта квартиры в Турции",
    seoDescription:
      "Поймите бюджет, список работ и сроки ремонта до разговора с мастером. Калькулятор, пресеты цен, FAQ и страница результата в одном сервисе.",
    popularDescription:
      "Эти страницы помогают заходить в продукт по понятным поисковым сценариям: квартира, кухня и санузел.",
    popularTitle: "Популярные сценарии ремонта",
    openScenario: "Открыть страницу",
    sampleLabel: "Пример результата",
    sampleValue: "120 м² · стандарт · 45-50 дней",
    sampleEstimate: "Ориентир: 820 000 - 1 050 000 TL",
    sampleList: [
      "Кухня, санузел, полы, электрика, сантехника",
      "Этапы по срокам и факторы риска уже внутри",
      "Ссылку можно отправить мастеру, семье или партнеру",
    ],
    requestTitle: "Оставить запрос по проекту",
    requestDescription:
      "Если удобно, можно оставить контакт и кратко описать проект. Для MVP форма работает без кабинета и готова к подключению CRM.",
    leadTitle: "Короткая заявка",
    leadDescription:
      "Подходит для сценария, когда человек еще не готов заполнять все шаги калькулятора, но хочет оставить проект в работе.",
  },
  tr: {
    seoTitle: "Türkiye'de daire tadilatı hesaplayıcısı",
    seoDescription:
      "Ustayla konuşmadan önce bütçeyi, iş listesini ve süreyi görün. Hesaplayıcı, fiyat presetleri, FAQ ve sonuç sayfası tek bir üründe.",
    popularDescription:
      "Bu sayfalar ürüne en yaygın arama senaryolarıyla giriş sağlar: daire, mutfak ve banyo.",
    popularTitle: "Yaygın tadilat senaryoları",
    openScenario: "Sayfayı aç",
    sampleLabel: "Örnek sonuç",
    sampleValue: "120 m² · standart · 45-50 gün",
    sampleEstimate: "Ön aralık: 820.000 - 1.050.000 TL",
    sampleList: [
      "Mutfak, banyo, zemin, elektrik ve su tesisatı",
      "Zaman aşamaları ve risk faktörleri sonucun içinde",
      "Bağlantıyı ustaya, aileye ya da ortağa gönderebilirsiniz",
    ],
    requestTitle: "Proje talebi bırak",
    requestDescription:
      "İsterseniz iletişim bilgisi ve kısa proje notu bırakabilirsiniz. MVP için form hesap oluşturmadan çalışır ve CRM bağlantısına hazırdır.",
    leadTitle: "Kısa talep",
    leadDescription:
      "Tüm adımları doldurmaya hazır olmayan ama projeyi sürece almak isteyen kişiler için uygundur.",
  },
  en: {
    seoTitle: "Apartment renovation calculator for Turkey",
    seoDescription:
      "Understand budget, work scope and timing before you talk to a contractor. Calculator, price presets, FAQ and result page in one service.",
    popularDescription:
      "These pages help people enter the product through clear search scenarios: apartment, kitchen and bathroom.",
    popularTitle: "Popular renovation scenarios",
    openScenario: "Open page",
    sampleLabel: "Sample result",
    sampleValue: "120 m² · standard · 45-50 days",
    sampleEstimate: "Reference: 820,000 - 1,050,000 TL",
    sampleList: [
      "Kitchen, bathroom, floors, electrical and plumbing",
      "Timeline phases and risk drivers already included",
      "The link can be shared with a contractor, family member or partner",
    ],
    requestTitle: "Leave a project request",
    requestDescription:
      "If easier, leave a contact and a short project note. For the MVP, the form works without an account and is ready for CRM hookup.",
    leadTitle: "Short request",
    leadDescription:
      "Useful when someone is not ready to fill out every calculator step but wants to keep the project moving.",
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
