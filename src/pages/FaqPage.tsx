import { Link } from "react-router-dom";
import { expandedFaq } from "../content";
import { LeadForm } from "../shared/ui/LeadForm";

export function FaqPage() {
  return (
    <div className="page">
      <section className="result-shell">
        <div className="result-hero">
          <div>
            <p className="eyebrow">FAQ</p>
            <h1>Ответы на частые вопросы о расчете ремонта</h1>
            <p>
              Здесь собраны вопросы, которые обычно мешают человеку довериться оценке
              бюджета и сроков до разговора с мастером.
            </p>
          </div>

          <div className="result-price-card">
            <span>Лучший следующий шаг</span>
            <strong>Сначала собрать расчет</strong>
            <p>Потом обсуждать предложения уже на одной основе</p>
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
            <Link className="button button-primary" to="/calculator">
              Открыть калькулятор
            </Link>
          </div>
        </div>

        <div className="surface-panel">
          <LeadForm
            description="Если удобнее, оставьте контакт и кратко опишите проект. Это хороший слой для будущей интеграции с CRM."
            title="Нужен разбор проекта?"
          />
        </div>
      </section>
    </div>
  );
}
