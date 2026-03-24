import type { CalculatorState } from "../../features/calculator/model";

const PARAM_NAME = "data";

export function encodeCalculatorState(state: CalculatorState) {
  return encodeURIComponent(JSON.stringify(state));
}

export function decodeCalculatorState(raw: string) {
  try {
    return JSON.parse(decodeURIComponent(raw)) as CalculatorState;
  } catch {
    return null;
  }
}

export function buildShareUrl(state: CalculatorState) {
  const url = new URL(window.location.origin + "/result");
  url.searchParams.set(PARAM_NAME, encodeCalculatorState(state));
  return url.toString();
}

export function getSharedStateFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const raw = params.get(PARAM_NAME);
  return raw ? decodeCalculatorState(raw) : null;
}
