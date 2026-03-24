import type { Language } from "../i18n";
import type { LeadFormPayload } from "./lead-capture";

export const LEAD_WHATSAPP = "905444558407";
export const LEAD_EMAIL = "tehnoshark2284@gmail.com";

const leadCopy: Record<
  Language,
  {
    intro: string;
    name: string;
    contact: string;
    project: string;
    area: string;
    comment: string;
    subject: string;
  }
> = {
  ru: {
    intro: "Здравствуйте. Отправляю заявку по ремонту.",
    name: "Имя",
    contact: "Контакт",
    project: "Проект",
    area: "Площадь",
    comment: "Комментарий",
    subject: "Заявка по ремонту",
  },
  tr: {
    intro: "Merhaba. Tadilat talebimi gönderiyorum.",
    name: "Ad",
    contact: "İletişim",
    project: "Proje",
    area: "Alan",
    comment: "Not",
    subject: "Tadilat talebi",
  },
  en: {
    intro: "Hello. I am sending a renovation request.",
    name: "Name",
    contact: "Contact",
    project: "Project",
    area: "Area",
    comment: "Comment",
    subject: "Renovation request",
  },
};

export function buildLeadMessage(payload: LeadFormPayload, language: Language) {
  const copy = leadCopy[language];

  return [
    copy.intro,
    payload.name ? `${copy.name}: ${payload.name}` : undefined,
    payload.contact ? `${copy.contact}: ${payload.contact}` : undefined,
    payload.projectType ? `${copy.project}: ${payload.projectType}` : undefined,
    payload.area ? `${copy.area}: ${payload.area}` : undefined,
    payload.message ? `${copy.comment}: ${payload.message}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(payload: LeadFormPayload, language: Language) {
  return `https://wa.me/${LEAD_WHATSAPP}?text=${encodeURIComponent(buildLeadMessage(payload, language))}`;
}

export function buildEmailUrl(payload: LeadFormPayload, language: Language) {
  const subject = leadCopy[language].subject;
  return `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLeadMessage(payload, language))}`;
}
