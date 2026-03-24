import type { CalculatorState } from "../../features/calculator/model";
import { DEFAULT_SITE_URL } from "../../app/seo/routes";

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
  const siteUrl = window.location.origin.includes("localhost")
    ? window.location.origin
    : DEFAULT_SITE_URL;
  const url = new URL("/result", siteUrl);
  url.searchParams.set(PARAM_NAME, encodeCalculatorState(state));
  return url.toString();
}

export function getSharedStateFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const raw = params.get(PARAM_NAME);
  return raw ? decodeCalculatorState(raw) : null;
}
