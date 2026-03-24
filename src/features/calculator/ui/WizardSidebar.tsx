import { useHorizontalScrollHint } from "../../../shared/lib/useHorizontalScrollHint";
import { useI18n } from "../../../shared/i18n";
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

const sidebarCopy = {
  ru: {
    eyebrow: "Калькулятор ремонта",
    title: "Соберите сценарий ремонта без хаоса",
    intro:
      "Пройдите короткие шаги и сразу получите ориентир по бюджету, срокам и списку работ.",
    progress: "Прогресс",
    swipe: "Свайп по шагам →",
    summary: "Текущий сценарий",
    object: "Объект",
    area: "Площадь",
    materials: "Материалы",
    execution: "Исполнение",
    pace: "Темп",
    notSet: "Не указана",
  },
  tr: {
    eyebrow: "Tadilat hesaplayici",
    title: "Tadilat senaryosunu karmasa olmadan toplayin",
    intro: "Kisa adimlari tamamlayin ve butce, sure ve is listesi icin hemen on gorun.",
    progress: "Ilerleme",
    swipe: "Adimlari kaydir →",
    summary: "Mevcut senaryo",
    object: "Mulk",
    area: "Alan",
    materials: "Malzeme",
    execution: "Iscilik",
    pace: "Hiz",
    notSet: "Belirtilmedi",
  },
  en: {
    eyebrow: "Renovation calculator",
    title: "Build a renovation scenario without the chaos",
    intro: "Complete a few short steps and get an immediate view of budget, timing and scope.",
    progress: "Progress",
    swipe: "Swipe steps →",
    summary: "Current scenario",
    object: "Property",
    area: "Area",
    materials: "Materials",
    execution: "Execution",
    pace: "Pace",
    notSet: "Not set",
  },
};

export function WizardSidebar({
  state,
  steps,
  activeIndex,
  progressPercent,
  onStepSelect,
}: WizardSidebarProps) {
  const stepsHint = useHorizontalScrollHint<HTMLOListElement>();
  const { language } = useI18n();
  const copy = sidebarCopy[language];

  return (
    <aside className="wizard-sidebar">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="wizard-sidebar-intro">{copy.intro}</p>

      <div className="progress-block">
        <div className="progress-meta">
          <span>{copy.progress}</span>
          <strong>
            {activeIndex + 1} / {steps.length}
          </strong>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="scroll-hint-shell">
        <ol
          className="wizard-steps scroll-hint"
          data-can-scroll-left={stepsHint.state.canScrollLeft ? "true" : "false"}
          data-can-scroll-right={stepsHint.state.canScrollRight ? "true" : "false"}
          data-engaged={stepsHint.state.engaged ? "true" : "false"}
          data-scrollable={stepsHint.state.scrollable ? "true" : "false"}
          ref={stepsHint.ref}
        >
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
        {stepsHint.state.scrollable && !stepsHint.state.engaged ? (
          <span className="scroll-hint-badge scroll-hint-badge-dark">{copy.swipe}</span>
        ) : null}
      </div>

      <div className="wizard-summary">
        <h3>{copy.summary}</h3>
        <div className="summary-line">
          <span>{copy.object}</span>
          <strong>{getObjectTypeLabel(state.objectType, language)}</strong>
        </div>
        <div className="summary-line">
          <span>{copy.area}</span>
          <strong>{state.totalArea ? `${state.totalArea} m²` : copy.notSet}</strong>
        </div>
        <div className="summary-line">
          <span>{copy.materials}</span>
          <strong>{getMaterialLabel(state.materialTier, language)}</strong>
        </div>
        <div className="summary-line">
          <span>{copy.execution}</span>
          <strong>{getExecutionLabel(state.executionTier, language)}</strong>
        </div>
        <div className="summary-line">
          <span>{copy.pace}</span>
          <strong>{getTimelineLabel(state.timelinePreference, language)}</strong>
        </div>
      </div>
    </aside>
  );
}
