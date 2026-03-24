export type AnalyticsEventName =
  | "cta_click"
  | "calculator_start"
  | "result_copy"
  | "lead_submit";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  const entry = {
    event,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(entry);
    window.dispatchEvent(new CustomEvent("tadilat:analytics", { detail: entry }));
  }
}
