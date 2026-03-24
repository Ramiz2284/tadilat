import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateEstimate } from "../entities/estimate/model";
import {
  buildNormalizedCalculatorState,
  calculatorSteps,
  defaultCalculatorState,
  getRecommendedWorksForObject,
  getWorkNames,
  sanitizeWorksForObject,
  validateCalculatorState,
  type CalculatorState,
  type CalculatorStep,
  type ObjectType,
  type RoomSelection,
  type WorkCategory,
} from "../features/calculator/model";
import { WizardSidebar, WizardStepContent } from "../features/calculator/ui";
import { trackEvent } from "../shared/analytics";
import { loadCalculatorState, saveCalculatorState } from "../shared/lib/persistence";
import { useSeo } from "../shared/seo/useSeo";

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function getVisibleSteps(state: CalculatorState) {
  return calculatorSteps.filter((step) => (step.isVisible ? step.isVisible(state) : true));
}

export function CalculatorPage() {
  useSeo({
    title: "Калькулятор ремонта: рассчитать бюджет и сроки",
    description:
      "Выберите объект, площадь, виды работ, материалы и желаемый темп. Получите предварительный диапазон сметы и этапы ремонта.",
    path: "/calculator",
  });

  const navigate = useNavigate();
  const [state, setState] = useState<CalculatorState>(defaultCalculatorState);
  const [activeStepId, setActiveStepId] = useState<CalculatorStep["id"]>("object-type");

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

  const visibleSteps = useMemo(() => getVisibleSteps(state), [state]);
  const activeIndex = Math.max(
    visibleSteps.findIndex((step) => step.id === activeStepId),
    0,
  );
  const activeStep = visibleSteps[activeIndex] ?? visibleSteps[0];
  const normalizedState = useMemo(() => buildNormalizedCalculatorState(state), [state]);
  const validation = useMemo(() => validateCalculatorState(normalizedState), [normalizedState]);
  const liveEstimate = useMemo(
    () => (validation.isValid ? calculateEstimate(normalizedState) : null),
    [normalizedState, validation.isValid],
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
      navigate(`/result?data=${encodedState}`);
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
            <p className="eyebrow">Шаг {activeIndex + 1}</p>
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

          {activeStep?.id !== "result" && getWorkNames(normalizedState).length > 0 ? (
            <div className="selected-inline">
              {getWorkNames(normalizedState).slice(0, 6).map((work) => (
                <span className="pill" key={work}>
                  {work}
                </span>
              ))}
            </div>
          ) : null}

          {!validation.isValid && activeStep?.id === "result" ? (
            <div className="error-box">
              <strong>Чтобы получить результат, нужно заполнить обязательные поля.</strong>
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
              Назад
            </button>

            <button
              className="button button-primary"
              disabled={!canProceed() || (activeStep?.id === "result" && !validation.isValid)}
              onClick={goNext}
              type="button"
            >
              {activeStep?.id === "result" ? "Показать результат" : "Следующий шаг"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
