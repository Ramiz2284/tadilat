import type { CalculatorState } from "../../features/calculator/model";

const STORAGE_KEY = "tadilat.calculator.state";

export function saveCalculatorState(state: CalculatorState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadCalculatorState(): CalculatorState | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CalculatorState;
  } catch {
    return null;
  }
}
