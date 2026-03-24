import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateEstimate } from "../entities/estimate/model";
import {
  buildNormalizedCalculatorState,
  defaultCalculatorState,
  getCalculatorCopy,
  getWorkNames,
  getRecommendedWorksForObject,
  sanitizeWorksForObject,
  validateCalculatorState,
  type CalculatorState,
  type CalculatorStep,
  type ObjectType,
  type RoomSelection,
  type WorkCategory,
} from "../features/calculator/model";
import { WizardSidebar, WizardStepContent } from "../features/calculator/ui";
import { getAlternatesForRoute, getRoutePath, useI18n } from "../shared/i18n";
import { trackEvent } from "../shared/analytics";
import { loadCalculatorState, saveCalculatorState } from "../shared/lib/persistence";
import { useSeo } from "../shared/seo/useSeo";

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function getVisibleSteps(state: CalculatorState, language: ReturnType<typeof useI18n>["language"]) {
  return getCalculatorCopy(language).calculatorSteps.filter((step) =>
    step.isVisible ? step.isVisible(state) : true,
  );
}

const pageCopy = {
  ru: {
    seoTitle: "Калькулятор ремонта: рассчитать бюджет и сроки",
    seoDescription:
      "Выберите объект, площадь, виды работ, материалы и желаемый темп. Получите предварительный диапазон сметы и этапы ремонта.",
    stepLabel: "Шаг",
    missingTitle: "Чтобы получить результат, нужно заполнить обязательные поля.",
    back: "Назад",
    next: "Следующий шаг",
    showResult: "Показать результат",
  },
  tr: {
    seoTitle: "Tadilat hesaplayıcı: bütçe ve süre hesapla",
    seoDescription:
      "Mülk tipini, alanı, iş kalemlerini, malzeme seviyesini ve hedef hızı seçin. Ön bütçe aralığı ve tadilat aşamalarını görün.",
    stepLabel: "Adım",
    missingTitle: "Sonucu görmek için zorunlu alanları doldurun.",
    back: "Geri",
    next: "Sonraki adım",
    showResult: "Sonucu göster",
  },
  en: {
    seoTitle: "Renovation calculator: estimate budget and timing",
    seoDescription:
      "Choose the property, area, work scope, materials and preferred pace. Get a preliminary budget range and renovation phases.",
    stepLabel: "Step",
    missingTitle: "Fill in the required fields to see the result.",
    back: "Back",
    next: "Next step",
    showResult: "Show result",
  },
};

export function CalculatorPage() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const copy = pageCopy[language];
  const [state, setState] = useState<CalculatorState>(defaultCalculatorState);
  const [activeStepId, setActiveStepId] = useState<CalculatorStep["id"]>("object-type");

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: getRoutePath(language, "calculator"),
    alternates: getAlternatesForRoute("calculator"),
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: copy.seoTitle,
        description: copy.seoDescription,
        url: getRoutePath(language, "calculator"),
        inLanguage: language,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: getRoutePath(language, "home"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.seoTitle,
            item: getRoutePath(language, "calculator"),
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const persistedState = loadCalculatorState();
    if (persistedState) {
      setState(persistedState);
    }
  }, []);

  useEffect(() => {
    trackEvent("calculator_start", {
      source: "calculator_page",
    });
  }, []);

  useEffect(() => {
    saveCalculatorState(state);
  }, [state]);

  const visibleSteps = useMemo(() => getVisibleSteps(state, language), [state, language]);
  const activeIndex = Math.max(
    visibleSteps.findIndex((step) => step.id === activeStepId),
    0,
  );
  const activeStep = visibleSteps[activeIndex] ?? visibleSteps[0];
  const normalizedState = useMemo(() => buildNormalizedCalculatorState(state), [state]);
  const validation = useMemo(
    () => validateCalculatorState(normalizedState, language),
    [normalizedState, language],
  );
  const liveEstimate = useMemo(
    () => (validation.isValid ? calculateEstimate(normalizedState, language) : null),
    [normalizedState, validation.isValid, language],
  );
  const progressPercent = ((activeIndex + 1) / visibleSteps.length) * 100;

  useEffect(() => {
    if (activeStep && activeStep.id !== activeStepId) {
      setActiveStepId(activeStep.id);
    }
  }, [activeStep, activeStepId]);

  function setObjectType(objectType: ObjectType) {
    setState((current) => ({
      ...current,
      objectType,
      rooms: [],
      works: sanitizeWorksForObject(objectType, current.works),
    }));
  }

  function updateArea(totalArea: number | null) {
    setState((current) => ({
      ...current,
      totalArea,
    }));
  }

  function updateRoom(roomType: RoomSelection["type"]) {
    setState((current) => {
      const existing = current.rooms.find((room) => room.type === roomType);
      return {
        ...current,
        rooms: existing
          ? current.rooms.filter((room) => room.type !== roomType)
          : [...current.rooms, { type: roomType, quantity: 1 }],
      };
    });
  }

  function updateWork(work: WorkCategory) {
    setState((current) => ({
      ...current,
      works: sanitizeWorksForObject(current.objectType, toggleValue(current.works, work)),
    }));
  }

  function applyRecommendedWorks() {
    setState((current) => ({
      ...current,
      works: getRecommendedWorksForObject(current.objectType),
    }));
  }

  function canProceed() {
    return activeStep?.canProceed ? activeStep.canProceed(normalizedState) : true;
  }

  function goToStep(index: number) {
    const step = visibleSteps[index];
    if (step) {
      setActiveStepId(step.id);
    }
  }

  function goNext() {
    if (activeIndex === visibleSteps.length - 1) {
      const encodedState = encodeURIComponent(JSON.stringify(normalizedState));
      navigate(`${getRoutePath(language, "result")}?data=${encodedState}`);
      return;
    }

    goToStep(activeIndex + 1);
  }

  return (
    <div className="page calculator-page">
      <div className="wizard-shell">
        <WizardSidebar
          activeIndex={activeIndex}
          onStepSelect={goToStep}
          progressPercent={progressPercent}
          state={normalizedState}
          steps={visibleSteps}
        />

        <section className="wizard-panel">
          <div className="wizard-panel-heading">
            <p className="eyebrow">
              {copy.stepLabel} {activeIndex + 1}
            </p>
            <h2>{activeStep?.title}</h2>
            <p>{activeStep?.description}</p>
          </div>

          <WizardStepContent
            activeStep={activeStep}
            liveEstimate={liveEstimate}
            onAreaChange={updateArea}
            onExecutionSelect={(value) =>
              setState((current) => ({ ...current, executionTier: value }))
            }
            onMaterialSelect={(value) =>
              setState((current) => ({ ...current, materialTier: value }))
            }
            onObjectTypeSelect={setObjectType}
            onRecommendedWorksApply={applyRecommendedWorks}
            onRoomToggle={updateRoom}
            onTimelineSelect={(value) =>
              setState((current) => ({ ...current, timelinePreference: value }))
            }
            onWorkToggle={updateWork}
            state={normalizedState}
          />

          {activeStep?.id !== "result" && getWorkNames(normalizedState, language).length > 0 ? (
            <div className="selected-inline">
              {getWorkNames(normalizedState, language)
                .slice(0, 6)
                .map((work) => (
                  <span className="pill" key={work}>
                    {work}
                  </span>
                ))}
            </div>
          ) : null}

          {!validation.isValid && activeStep?.id === "result" ? (
            <div className="error-box">
              <strong>{copy.missingTitle}</strong>
              <p>{Object.values(validation.errors)[0]}</p>
            </div>
          ) : null}

          <div className="wizard-actions">
            <button
              className="button button-ghost"
              disabled={activeIndex === 0}
              onClick={() => goToStep(Math.max(activeIndex - 1, 0))}
              type="button"
            >
              {copy.back}
            </button>

            <button
              className="button button-primary"
              disabled={!canProceed() || (activeStep?.id === "result" && !validation.isValid)}
              onClick={goNext}
              type="button"
            >
              {activeStep?.id === "result" ? copy.showResult : copy.next}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
