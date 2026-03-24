import { Link, useParams } from "react-router-dom";
import { seoScenarios } from "../content";
import { LeadForm } from "../shared/ui/LeadForm";

export function SeoScenarioPage() {
  const { slug } = useParams();
  const scenario = seoScenarios.find((item) => item.slug === slug);

  if (!scenario) {
    return (
      <div className="page">
        <section className="result-shell empty-state">
          <p className="eyebrow">Страница не найдена</p>
          <h1>Такого сценария пока нет</h1>
          <Link className="button button-primary" to="/calculator">
            Перейти к калькулятору
          </Link>
        </section>
      </div>
    );
  }

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
            <span>Ориентир по площади</span>
            <strong>{scenario.areaRange}</strong>
            <p>{scenario.trustNote}</p>
          </div>
        </div>

        <div className="example-grid">
          {scenario.presets.map((preset) => (
            <article className="example-card" key={preset.label}>
              <h3>{preset.label}</h3>
              <strong>
                {new Intl.NumberFormat("tr-TR").format(preset.min)} -{" "}
                {new Intl.NumberFormat("tr-TR").format(preset.max)} TL
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
            <Link className="button button-primary" to="/calculator">
              {scenario.heroCta}
            </Link>
            <Link className="button button-secondary" to="/faq">
              Перейти в FAQ
            </Link>
          </div>
        </div>

        <div className="surface-panel">
          <LeadForm
            description="Оставьте контакт, если хотите использовать эту страницу как SEO-вход и сразу перевести пользователя в лид."
            projectType={scenario.eyebrow}
            title="Оставить запрос по этому сценарию"
          />
        </div>
      </section>
    </div>
  );
}
