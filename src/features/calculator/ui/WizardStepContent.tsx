import type { Estimate } from "../../../entities/estimate/model";
import type {
  CalculatorState,
  CalculatorStep,
  ExecutionTier,
  MaterialTier,
  ObjectType,
  RoomType,
  TimelinePreference,
  WorkCategory,
} from "../model";
import {
  executionTierOptions,
  getAllowedWorksForObject,
  getObjectTypeLabel,
  getRecommendedWorksForObject,
  getTimelineLabel,
  getWorkNames,
  materialTierOptions,
  objectTypeOptions,
  roomOptions,
  timelineOptions,
  workCategoryOptions,
} from "../model";

type WizardStepContentProps = {
  activeStep: CalculatorStep | undefined;
  state: CalculatorState;
  liveEstimate: Estimate | null;
  onObjectTypeSelect: (value: ObjectType) => void;
  onAreaChange: (value: number | null) => void;
  onRoomToggle: (value: RoomType) => void;
  onWorkToggle: (value: WorkCategory) => void;
  onRecommendedWorksApply: () => void;
  onMaterialSelect: (value: MaterialTier) => void;
  onExecutionSelect: (value: ExecutionTier) => void;
  onTimelineSelect: (value: TimelinePreference) => void;
};

export function WizardStepContent({
  activeStep,
  state,
  liveEstimate,
  onObjectTypeSelect,
  onAreaChange,
  onRoomToggle,
  onWorkToggle,
  onRecommendedWorksApply,
  onMaterialSelect,
  onExecutionSelect,
  onTimelineSelect,
}: WizardStepContentProps) {
  const recommendedWorks = getRecommendedWorksForObject(state.objectType);
  const allowedWorks = new Set(getAllowedWorksForObject(state.objectType));

  return (
    <>
      {activeStep?.id === "object-type" ? (
        <div className="choice-grid">
          {objectTypeOptions.map((option) => (
            <button
              className={`choice-card ${state.objectType === option.value ? "selected" : ""}`}
              key={option.value}
              onClick={() => onObjectTypeSelect(option.value)}
              type="button"
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {activeStep?.id === "area" ? (
        <div className="field-grid">
          <label className="field">
            <span>Площадь объекта, м²</span>
            <input
              min={0}
              onChange={(event) => onAreaChange(Number(event.target.value) || null)}
              placeholder="Например, 120"
              type="number"
              value={state.totalArea ?? ""}
            />
          </label>

          <article className="hint-card">
            <strong>Как это влияет на расчет</strong>
            <p>
              Площадь двигает не только стоимость, но и длительность этапов. Для кухни
              и санузла нагрузка на квадратный метр выше, чем для сухих комнат.
            </p>
          </article>
        </div>
      ) : null}

      {activeStep?.id === "rooms" ? (
        <div className="choice-grid compact">
          {roomOptions.map((option) => {
            const selected = state.rooms.some((room) => room.type === option.value);
            return (
              <button
                className={`choice-card ${selected ? "selected" : ""}`}
                key={option.value}
                onClick={() => onRoomToggle(option.value)}
                type="button"
              >
                <strong>{option.label}</strong>
                <span>{option.description}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {activeStep?.id === "works" ? (
        <>
          {recommendedWorks.length > 0 ? (
            <div className="recommendation-banner">
              <div>
                <strong>Рекомендуемый старт для этого типа объекта</strong>
                <p>
                  Для {getObjectTypeLabel(state.objectType).toLowerCase()} можно сразу включить базовый набор работ и потом убрать лишнее.
                </p>
              </div>
              <button className="button button-secondary" onClick={onRecommendedWorksApply} type="button">
                Подставить рекомендации
              </button>
            </div>
          ) : null}

          <div className="choice-grid compact">
            {workCategoryOptions
              .filter((option) => allowedWorks.size === 0 || allowedWorks.has(option.value))
              .map((option) => {
              const selected = state.works.includes(option.value);
              return (
                <button
                  className={`choice-card ${selected ? "selected" : ""}`}
                  key={option.value}
                  onClick={() => onWorkToggle(option.value)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              );
              })}
          </div>
        </>
      ) : null}

      {activeStep?.id === "materials" ? (
        <div className="choice-grid compact">
          {materialTierOptions.map((option) => (
            <button
              className={`choice-card ${state.materialTier === option.value ? "selected" : ""}`}
              key={option.value}
              onClick={() => onMaterialSelect(option.value)}
              type="button"
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {activeStep?.id === "execution" ? (
        <div className="choice-grid compact">
          {executionTierOptions.map((option) => (
            <button
              className={`choice-card ${state.executionTier === option.value ? "selected" : ""}`}
              key={option.value}
              onClick={() => onExecutionSelect(option.value)}
              type="button"
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {activeStep?.id === "timeline" ? (
        <div className="choice-grid compact">
          {timelineOptions.map((option) => (
            <button
              className={`choice-card ${state.timelinePreference === option.value ? "selected" : ""}`}
              key={option.value}
              onClick={() => onTimelineSelect(option.value)}
              type="button"
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {activeStep?.id === "result" ? (
        <div className="result-preview-grid">
          <div className="summary-panel">
            <div className="summary-card">
              <span>Объект</span>
              <strong>{state.objectType ?? "Не выбран"}</strong>
            </div>
            <div className="summary-card">
              <span>Площадь</span>
              <strong>{state.totalArea ? `${state.totalArea} м²` : "Не указана"}</strong>
            </div>
            <div className="summary-card">
              <span>Работы</span>
              <strong>{state.works.length} выбрано</strong>
            </div>
            <div className="summary-card">
              <span>Темп</span>
              <strong>{getTimelineLabel(state.timelinePreference)}</strong>
            </div>
          </div>

          <div className="preview-estimate-card">
            <span>Предпросмотр результата</span>
            {liveEstimate ? (
              <>
                <strong>
                  {new Intl.NumberFormat("tr-TR").format(liveEstimate.estimate.min)} -{" "}
                  {new Intl.NumberFormat("tr-TR").format(liveEstimate.estimate.max)} TL
                </strong>
                <p>
                  {liveEstimate.timeline.totalMinDays}-{liveEstimate.timeline.totalMaxDays} дней
                </p>
                <small>{getWorkNames(state).slice(0, 4).join(", ") || "Выберите работы"}</small>
              </>
            ) : (
              <p>Заполните обязательные шаги, и здесь появится живой предпросмотр расчета.</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
