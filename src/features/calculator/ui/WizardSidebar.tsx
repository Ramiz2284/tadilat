import type { CalculatorState, CalculatorStep } from "../model";
import {
  getExecutionLabel,
  getMaterialLabel,
  getObjectTypeLabel,
  getTimelineLabel,
} from "../model";

type WizardSidebarProps = {
  state: CalculatorState;
  steps: CalculatorStep[];
  activeIndex: number;
  progressPercent: number;
  onStepSelect: (index: number) => void;
};

export function WizardSidebar({
  state,
  steps,
  activeIndex,
  progressPercent,
  onStepSelect,
}: WizardSidebarProps) {
  return (
    <aside className="wizard-sidebar">
      <p className="eyebrow">Калькулятор ремонта</p>
      <h1>Соберите сценарий ремонта без хаоса</h1>
      <p className="wizard-sidebar-intro">
        Пройдите короткие шаги и сразу получите ориентир по бюджету, срокам и списку работ.
      </p>

      <div className="progress-block">
        <div className="progress-meta">
          <span>Прогресс</span>
          <strong>
            {activeIndex + 1} / {steps.length}
          </strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <ol className="wizard-steps">
        {steps.map((step, index) => (
          <li
            className={index === activeIndex ? "active" : ""}
            key={step.id}
            onClick={() => onStepSelect(index)}
          >
            <span>{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </div>
          </li>
        ))}
      </ol>

      <div className="wizard-summary">
        <h3>Текущий сценарий</h3>
        <div className="summary-line">
          <span>Объект</span>
          <strong>{getObjectTypeLabel(state.objectType)}</strong>
        </div>
        <div className="summary-line">
          <span>Площадь</span>
          <strong>{state.totalArea ? `${state.totalArea} м²` : "Не указана"}</strong>
        </div>
        <div className="summary-line">
          <span>Материалы</span>
          <strong>{getMaterialLabel(state.materialTier)}</strong>
        </div>
        <div className="summary-line">
          <span>Исполнение</span>
          <strong>{getExecutionLabel(state.executionTier)}</strong>
        </div>
        <div className="summary-line">
          <span>Темп</span>
          <strong>{getTimelineLabel(state.timelinePreference)}</strong>
        </div>
      </div>
    </aside>
  );
}
