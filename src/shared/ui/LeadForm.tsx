import { useState } from "react";
import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";
import { saveLead, type LeadFormPayload } from "../lib/lead-capture";
import { LEAD_EMAIL, LEAD_WHATSAPP, buildEmailUrl, buildWhatsAppUrl } from "../lib/lead-routing";

type LeadFormProps = {
  title: string;
  description: string;
  projectType?: string;
};

const formCopy = {
  ru: {
    name: "Имя",
    namePlaceholder: "Как к вам обращаться",
    contact: "Контакт",
    contactPlaceholder: "Телефон, WhatsApp или email",
    projectType: "Тип проекта",
    projectPlaceholder: "Например, квартира 120 м²",
    area: "Площадь",
    areaPlaceholder: "Например, 85 м²",
    comment: "Комментарий",
    commentPlaceholder: "Что для вас важно: срок, материалы, кухня, санузел, срочный запуск",
    submitted: "Заявка подготовлена",
    submit: "Подготовить заявку",
    note: "Заявка сохраняется локально и может быть сразу отправлена в WhatsApp или по email.",
  },
  tr: {
    name: "Ad",
    namePlaceholder: "Size nasıl hitap edelim",
    contact: "İletişim",
    contactPlaceholder: "Telefon, WhatsApp veya email",
    projectType: "Proje tipi",
    projectPlaceholder: "Örnek: 120 m² daire",
    area: "Alan",
    areaPlaceholder: "Örnek: 85 m²",
    comment: "Not",
    commentPlaceholder: "Sizin için ne önemli: süre, malzeme, mutfak, banyo, hızlı başlangıç",
    submitted: "Talep hazırlandı",
    submit: "Talebi hazırla",
    note: "Talep yerel olarak saklanır ve hemen WhatsApp ya da email ile gönderilebilir.",
  },
  en: {
    name: "Name",
    namePlaceholder: "How should we address you",
    contact: "Contact",
    contactPlaceholder: "Phone, WhatsApp or email",
    projectType: "Project type",
    projectPlaceholder: "For example, apartment 120 m²",
    area: "Area",
    areaPlaceholder: "For example, 85 m²",
    comment: "Comment",
    commentPlaceholder: "What matters most: timing, materials, kitchen, bathroom, urgent start",
    submitted: "Request prepared",
    submit: "Prepare request",
    note: "The request is stored locally and can be sent immediately by WhatsApp or email.",
  },
};

export function LeadForm({ title, description, projectType = "" }: LeadFormProps) {
  const { language } = useI18n();
  const copy = formCopy[language];
  const [sent, setSent] = useState(false);
  const [lastPayload, setLastPayload] = useState<LeadFormPayload | null>(null);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    projectType,
    area: "",
    message: "",
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.contact.trim()) {
      return;
    }

    const payload: LeadFormPayload = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    saveLead(payload);
    setLastPayload(payload);
    trackEvent("lead_submit", {
      project_type: payload.projectType || "unknown",
      contact_type: payload.contact.includes("@") ? "email" : "phone_or_messenger",
      area: payload.area,
    });
    setSent(true);
    setForm((current) => ({
      ...current,
      name: "",
      contact: "",
      area: "",
      message: "",
    }));
    window.setTimeout(() => setSent(false), 2200);
  }

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="lead-form-heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="lead-grid">
        <label className="field">
          <span>{copy.name}</span>
          <input
            onChange={(event) => updateField("name", event.target.value)}
            placeholder={copy.namePlaceholder}
            type="text"
            value={form.name}
          />
        </label>

        <label className="field">
          <span>{copy.contact}</span>
          <input
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder={copy.contactPlaceholder}
            required
            type="text"
            value={form.contact}
          />
        </label>

        <label className="field">
          <span>{copy.projectType}</span>
          <input
            onChange={(event) => updateField("projectType", event.target.value)}
            placeholder={copy.projectPlaceholder}
            type="text"
            value={form.projectType}
          />
        </label>

        <label className="field">
          <span>{copy.area}</span>
          <input
            onChange={(event) => updateField("area", event.target.value)}
            placeholder={copy.areaPlaceholder}
            type="text"
            value={form.area}
          />
        </label>
      </div>

      <label className="field">
        <span>{copy.comment}</span>
        <textarea
          className="textarea"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder={copy.commentPlaceholder}
          rows={4}
          value={form.message}
        />
      </label>

      <div className="lead-form-actions">
        <button className="button button-primary" type="submit">
          {sent ? copy.submitted : copy.submit}
        </button>
        <p className="muted-note">{copy.note}</p>
      </div>

      <div className="contact-routing">
        <a
          className="button button-secondary"
          href={buildWhatsAppUrl(
            lastPayload ?? {
              ...form,
              createdAt: new Date().toISOString(),
            },
            language,
          )}
          onClick={() =>
            trackEvent("cta_click", {
              location: "lead_form_whatsapp",
              project_type: form.projectType || projectType || "unknown",
            })
          }
          rel="noreferrer"
          target="_blank"
        >
          WhatsApp: {LEAD_WHATSAPP}
        </a>
        <a
          className="button button-ghost"
          href={buildEmailUrl(
            lastPayload ?? {
              ...form,
              createdAt: new Date().toISOString(),
            },
            language,
          )}
          onClick={() =>
            trackEvent("cta_click", {
              location: "lead_form_email",
              project_type: form.projectType || projectType || "unknown",
            })
          }
        >
          Email: {LEAD_EMAIL}
        </a>
      </div>
    </form>
  );
}

