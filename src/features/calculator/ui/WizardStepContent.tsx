import type { Estimate } from "../../../entities/estimate/model";
import { localeByLanguage, useI18n } from "../../../shared/i18n";
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
  getAllowedWorksForObject,
  getCalculatorCopy,
  getObjectTypeLabel,
  getRecommendedWorksForObject,
  getTimelineLabel,
  getWorkNames,
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

const contentCopy = {
  ru: {
    areaLabel: "Площадь объекта, м²",
    areaPlaceholder: "Например, 120",
    areaHintTitle: "Как это влияет на расчет",
    areaHintText:
      "Площадь влияет не только на стоимость, но и на длительность этапов. Для кухни и санузла нагрузка на квадратный метр обычно выше, чем для сухих комнат.",
    recommendationTitle: "Рекомендуемый старт для этого типа объекта",
    recommendationButton: "Подставить рекомендации",
    recommendationTextPrefix: "Для",
    recommendationTextSuffix: "можно сразу включить базовый набор работ, а затем убрать лишнее.",
    object: "Объект",
    area: "Площадь",
    works: "Работы",
    pace: "Темп",
    selected: "выбрано",
    preview: "Предпросмотр результата",
    chooseWorks: "Выберите виды работ, чтобы увидеть итог",
    fillRequired: "Заполните обязательные шаги, и здесь появится живой предпросмотр расчета.",
    notSet: "Не указана",
    days: "дней",
  },
  tr: {
    areaLabel: "Mulk alani, m²",
    areaPlaceholder: "Ornek: 120",
    areaHintTitle: "Bu hesapta neden onemli",
    areaHintText:
      "Metrekare sadece maliyeti degil, sureyi de etkiler. Mutfak ve banyoda metrekare basina yuk genelde kuru odalardan daha fazladir.",
    recommendationTitle: "Bu mulk tipi icin onerilen baslangic",
    recommendationButton: "Onerileri uygula",
    recommendationTextPrefix: "",
    recommendationTextSuffix: "icin temel is listesini once ekleyip sonra gereksiz kalemleri cikarabilirsiniz.",
    object: "Mulk",
    area: "Alan",
    works: "Isler",
    pace: "Hiz",
    selected: "secildi",
    preview: "Sonuc onizlemesi",
    chooseWorks: "Sonucu gormek icin is kalemlerini secin",
    fillRequired: "Zorunlu adimlari doldurun; canli onizleme burada gorunecek.",
    notSet: "Belirtilmedi",
    days: "gun",
  },
  en: {
    areaLabel: "Property area, m²",
    areaPlaceholder: "For example, 120",
    areaHintTitle: "How this affects the estimate",
    areaHintText:
      "Area changes not only cost but also stage duration. Kitchens and bathrooms usually carry more cost per square meter than dry rooms.",
    recommendationTitle: "Recommended starting scope for this property type",
    recommendationButton: "Apply recommendations",
    recommendationTextPrefix: "For",
    recommendationTextSuffix: "you can start with a base scope and remove anything unnecessary later.",
    object: "Property",
    area: "Area",
    works: "Works",
    pace: "Pace",
    selected: "selected",
    preview: "Result preview",
    chooseWorks: "Choose work categories to see the result",
    fillRequired: "Complete the required steps and the live estimate preview will appear here.",
    notSet: "Not set",
    days: "days",
  },
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
  const { language } = useI18n();
  const copy = contentCopy[language];
  const calculatorCopy = getCalculatorCopy(language);
  const recommendedWorks = getRecommendedWorksForObject(state.objectType);
  const allowedWorks = new Set(getAllowedWorksForObject(state.objectType));
  const locale = localeByLanguage[language];

  return (
    <>
      {activeStep?.id === "object-type" ? (
        <div className="choice-grid">
          {calculatorCopy.objectTypeOptions.map((option) => (
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
            <span>{copy.areaLabel}</span>
            <input
              min={0}
              onChange={(event) => onAreaChange(Number(event.target.value) || null)}
              placeholder={copy.areaPlaceholder}
              type="number"
              value={state.totalArea ?? ""}
            />
          </label>

          <article className="hint-card">
            <strong>{copy.areaHintTitle}</strong>
            <p>{copy.areaHintText}</p>
          </article>
        </div>
      ) : null}

      {activeStep?.id === "rooms" ? (
        <div className="choice-grid compact">
          {calculatorCopy.roomOptions.map((option) => {
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
                <strong>{copy.recommendationTitle}</strong>
                <p>
                  {copy.recommendationTextPrefix}{" "}
                  {getObjectTypeLabel(state.objectType, language).toLowerCase()}{" "}
                  {copy.recommendationTextSuffix}
                </p>
              </div>
              <button className="button button-secondary" onClick={onRecommendedWorksApply} type="button">
                {copy.recommendationButton}
              </button>
            </div>
          ) : null}

          <div className="choice-grid compact">
            {calculatorCopy.workCategoryOptions
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
          {calculatorCopy.materialTierOptions.map((option) => (
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
          {calculatorCopy.executionTierOptions.map((option) => (
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
          {calculatorCopy.timelineOptions.map((option) => (
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
              <span>{copy.object}</span>
              <strong>{getObjectTypeLabel(state.objectType, language)}</strong>
            </div>
            <div className="summary-card">
              <span>{copy.area}</span>
              <strong>{state.totalArea ? `${state.totalArea} m²` : copy.notSet}</strong>
            </div>
            <div className="summary-card">
              <span>{copy.works}</span>
              <strong>
                {state.works.length} {copy.selected}
              </strong>
            </div>
            <div className="summary-card">
              <span>{copy.pace}</span>
              <strong>{getTimelineLabel(state.timelinePreference, language)}</strong>
            </div>
          </div>

          <div className="preview-estimate-card">
            <span>{copy.preview}</span>
            {liveEstimate ? (
              <>
                <strong>
                  {new Intl.NumberFormat(locale).format(liveEstimate.estimate.min)} -{" "}
                  {new Intl.NumberFormat(locale).format(liveEstimate.estimate.max)} TL
                </strong>
                <p>
                  {liveEstimate.timeline.totalMinDays}-{liveEstimate.timeline.totalMaxDays} {copy.days}
                </p>
                <small>{getWorkNames(state, language).slice(0, 4).join(", ") || copy.chooseWorks}</small>
              </>
            ) : (
              <p>{copy.fillRequired}</p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
