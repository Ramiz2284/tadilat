import { useState } from "react";
import { trackEvent } from "../analytics";
import { saveLead } from "../lib/lead-capture";
import type { LeadFormPayload } from "../lib/lead-capture";
import { LEAD_EMAIL, LEAD_WHATSAPP, buildEmailUrl, buildWhatsAppUrl } from "../lib/lead-routing";

type LeadFormProps = {
  title: string;
  description: string;
  projectType?: string;
};

export function LeadForm({ title, description, projectType = "" }: LeadFormProps) {
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
          <span>Имя</span>
          <input
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Как к вам обращаться"
            type="text"
            value={form.name}
          />
        </label>

        <label className="field">
          <span>Контакт</span>
          <input
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="Телефон, WhatsApp или email"
            required
            type="text"
            value={form.contact}
          />
        </label>

        <label className="field">
          <span>Тип проекта</span>
          <input
            onChange={(event) => updateField("projectType", event.target.value)}
            placeholder="Например, квартира 120 м²"
            type="text"
            value={form.projectType}
          />
        </label>

        <label className="field">
          <span>Площадь</span>
          <input
            onChange={(event) => updateField("area", event.target.value)}
            placeholder="Например, 85 м²"
            type="text"
            value={form.area}
          />
        </label>
      </div>

      <label className="field">
        <span>Комментарий</span>
        <textarea
          className="textarea"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Что для вас важно: срок, материалы, кухня, санузел, срочный запуск"
          rows={4}
          value={form.message}
        />
      </label>

      <div className="lead-form-actions">
        <button className="button button-primary" type="submit">
          {sent ? "Заявка подготовлена" : "Подготовить заявку"}
        </button>
        <p className="muted-note">
          Заявка сохраняется локально и может быть сразу отправлена в WhatsApp или по email.
        </p>
      </div>

      <div className="contact-routing">
        <a
          className="button button-secondary"
          href={buildWhatsAppUrl(
            lastPayload ?? {
              ...form,
              createdAt: new Date().toISOString(),
            },
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
