import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { calculateEstimate } from "../entities/estimate/model";
import { LeadForm } from "../shared/ui/LeadForm";
import {
  buildNormalizedCalculatorState,
  defaultCalculatorState,
  validateCalculatorState,
} from "../features/calculator/model";
import { loadCalculatorState } from "../shared/lib/persistence";
import { buildShareUrl, getSharedStateFromSearch } from "../shared/lib/share";

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat("tr-TR").format(value)} TL`;
}

function formatTier(value: string) {
  switch (value) {
    case "economy":
      return "Эконом";
    case "standard":
      return "Стандарт";
    case "premium":
      return "Премиум";
    case "basic":
      return "Базовый";
    case "good":
      return "Хороший";
    case "high":
      return "Высокий";
    case "fast":
      return "Нужно быстрее";
    case "no-rush":
      return "Не срочно";
    default:
      return "Стандартный темп";
  }
}

export function ResultPage() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const calculatorState = useMemo(() => {
    const shared = getSharedStateFromSearch(location.search);
    if (shared) {
      return shared;
    }

    return loadCalculatorState() ?? defaultCalculatorState;
  }, [location.search]);

  const normalizedState = useMemo(
    () => buildNormalizedCalculatorState(calculatorState),
    [calculatorState],
  );
  const validation = validateCalculatorState(normalizedState);
  const estimate = validation.isValid ? calculateEstimate(normalizedState) : null;
  const shareLabel = copied ? "Ссылка скопирована" : "Скопировать ссылку";

  async function copyShareLink() {
    await navigator.clipboard.writeText(buildShareUrl(normalizedState));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!estimate) {
    return (
      <div className="page result-page">
        <section className="result-shell empty-state">
          <p className="eyebrow">Результат недоступен</p>
          <h1>Пока недостаточно данных для расчета</h1>
          <p>
            Сначала выберите объект, площадь и хотя бы один вид работ. После этого
            страница результата соберется автоматически.
          </p>
          <Link className="button button-primary" to="/calculator">
            Перейти к калькулятору
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page result-page">
      <section className="result-shell">
        <div className="result-hero">
          <div>
            <p className="eyebrow">Предварительный расчет</p>
            <h1>{estimate.summary.title}</h1>
            <p>{estimate.summary.subtitle}</p>
          </div>

          <div className="result-price-card">
            <span>Ориентировочная стоимость</span>
            <strong>
              {formatCurrency(estimate.estimate.min)} - {formatCurrency(estimate.estimate.max)}
            </strong>
            <p>
              Срок: {estimate.timeline.totalMinDays}-{estimate.timeline.totalMaxDays} дней
            </p>
          </div>
        </div>

        <div className="metrics-grid">
          <article className="summary-card">
            <span>Материалы</span>
            <strong>{formatTier(normalizedState.materialTier)}</strong>
          </article>
          <article className="summary-card">
            <span>Исполнение</span>
            <strong>{formatTier(normalizedState.executionTier)}</strong>
          </article>
          <article className="summary-card">
            <span>Темп</span>
            <strong>{formatTier(normalizedState.timelinePreference)}</strong>
          </article>
          <article className="summary-card">
            <span>Работы</span>
            <strong>{estimate.selectedWorks.length}</strong>
          </article>
        </div>

        <div className="result-grid">
          <article className="surface-panel">
            <h2>Что включено</h2>
            <div className="pill-grid">
              {estimate.selectedWorks.map((work) => (
                <span className="pill" key={work}>
                  {work}
                </span>
              ))}
            </div>
          </article>

          <article className="surface-panel">
            <h2>Этапы по срокам</h2>
            <div className="timeline-list">
              {estimate.timeline.phases.map((phase) => (
                <div className="timeline-item" key={phase.id}>
                  <strong>
                    {phase.title}: {phase.minDays}-{phase.maxDays} дней
                  </strong>
                  <p>{phase.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-panel">
            <h2>Что может повлиять на итог</h2>
            <ul className="risk-list">
              {estimate.riskFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface-panel">
            <h2>Что делать дальше</h2>
            <div className="result-actions">
              <button className="button button-primary" onClick={copyShareLink} type="button">
                {shareLabel}
              </button>
              <button className="button button-secondary" onClick={() => window.print()} type="button">
                Распечатать / PDF
              </button>
              <Link className="button button-ghost" to="/calculator">
                Изменить расчет
              </Link>
            </div>
            <p className="muted-note">
              Отправьте этот результат мастеру, чтобы сравнивать предложения по одному и
              тому же списку работ, а не по разным устным описаниям.
            </p>
          </article>
        </div>

        <div className="surface-panel">
          <LeadForm
            description="Если хотите продолжить проект после расчета, оставьте контакт и короткий комментарий. Так result page начинает работать не только как отчет, но и как lead capture."
            projectType={estimate.summary.subtitle}
            title="Передать расчет в работу"
          />
        </div>
      </section>
    </div>
  );
}
