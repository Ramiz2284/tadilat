import { useState } from "react";
import { saveLead } from "../lib/lead-capture";

type LeadFormProps = {
  title: string;
  description: string;
  projectType?: string;
};

export function LeadForm({ title, description, projectType = "" }: LeadFormProps) {
  const [sent, setSent] = useState(false);
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

    saveLead({
      ...form,
      createdAt: new Date().toISOString(),
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
          {sent ? "Заявка сохранена" : "Оставить заявку"}
        </button>
        <p className="muted-note">
          Для MVP форма сохраняется локально и готова к подключению API или CRM.
        </p>
      </div>
    </form>
  );
}
