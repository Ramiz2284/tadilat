import type { LeadFormPayload } from "./lead-capture";

export const LEAD_WHATSAPP = "905444558407";
export const LEAD_EMAIL = "tehnoshark2284@gmail.com";

export function buildLeadMessage(payload: LeadFormPayload) {
  return [
    "Здравствуйте. Отправляю заявку по ремонту.",
    payload.name ? `Имя: ${payload.name}` : undefined,
    payload.contact ? `Контакт: ${payload.contact}` : undefined,
    payload.projectType ? `Проект: ${payload.projectType}` : undefined,
    payload.area ? `Площадь: ${payload.area}` : undefined,
    payload.message ? `Комментарий: ${payload.message}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(payload: LeadFormPayload) {
  return `https://wa.me/${LEAD_WHATSAPP}?text=${encodeURIComponent(buildLeadMessage(payload))}`;
}

export function buildEmailUrl(payload: LeadFormPayload) {
  const subject = "Заявка по ремонту";
  return `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLeadMessage(payload))}`;
}
