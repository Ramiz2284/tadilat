import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { calculateEstimate } from "../entities/estimate/model";
import { LeadForm } from "../shared/ui/LeadForm";
import { trackEvent } from "../shared/analytics";
import { buildNormalizedCalculatorState, defaultCalculatorState, validateCalculatorState } from "../features/calculator/model";
import { getAlternatesForRoute, getRoutePath, localeByLanguage, useI18n } from "../shared/i18n";
import { loadCalculatorState } from "../shared/lib/persistence";
import { buildShareUrl, getSharedStateFromSearch } from "../shared/lib/share";
import { useSeo } from "../shared/seo/useSeo";

function formatCurrency(value: number, locale: string) {
  return `${new Intl.NumberFormat(locale).format(value)} TL`;
}

const tierLabels = {
  ru: {
    economy: "Эконом",
    standard: "Стандарт",
    premium: "Премиум",
    basic: "Базовый",
    good: "Хороший",
    high: "Высокий",
    fast: "Нужно быстрее",
    "no-rush": "Не срочно",
  },
  tr: {
    economy: "Ekonomik",
    standard: "Standart",
    premium: "Premium",
    basic: "Temel",
    good: "İyi",
    high: "Yüksek",
    fast: "Daha hızlı",
    "no-rush": "Acil değil",
  },
  en: {
    economy: "Economy",
    standard: "Standard",
    premium: "Premium",
    basic: "Basic",
    good: "Good",
    high: "High",
    fast: "Need it faster",
    "no-rush": "No rush",
  },
};

const pageCopy = {
  ru: {
    seoTitle: "Предварительный расчет ремонта",
    seoDescription:
      "Страница результата с диапазоном цены, этапами ремонта, списком работ и факторами, которые влияют на итоговую стоимость.",
    copied: "Ссылка скопирована",
    copyLink: "Скопировать ссылку",
    unavailable: "Результат недоступен",
    noData: "Пока недостаточно данных для расчета",
    noDataText:
      "Сначала выберите объект, площадь и хотя бы один вид работ. После этого страница результата соберется автоматически.",
    goToCalculator: "Перейти к калькулятору",
    estimateLabel: "Предварительный расчет",
    priceLabel: "Ориентировочная стоимость",
    timelineLabel: "Срок",
    days: "дней",
    materials: "Материалы",
    execution: "Исполнение",
    pace: "Темп",
    works: "Работы",
    included: "Что включено",
    phases: "Этапы по срокам",
    risks: "Что может повлиять на итог",
    next: "Что делать дальше",
    print: "Распечатать / PDF",
    edit: "Изменить расчет",
    note:
      "Отправьте этот результат мастеру, чтобы сравнивать предложения по одному и тому же списку работ, а не по разным устным описаниям.",
    leadTitle: "Передать расчет в работу",
    leadDescription:
      "Если хотите продолжить проект после расчета, оставьте контакт и короткий комментарий. Так result page начинает работать не только как отчет, но и как lead capture.",
  },
  tr: {
    seoTitle: "Ön tadilat hesabı",
    seoDescription:
      "Sonuç sayfası; fiyat aralığını, iş aşamalarını, kapsamı ve nihai maliyeti etkileyen faktörleri bir arada gösterir.",
    copied: "Bağlantı kopyalandı",
    copyLink: "Bağlantıyı kopyala",
    unavailable: "Sonuç hazır değil",
    noData: "Hesap için henüz yeterli veri yok",
    noDataText:
      "Önce mülk tipini, alanı ve en az bir iş kalemini seçin. Sonra sonuç sayfası otomatik olarak oluşur.",
    goToCalculator: "Hesaplayıcıya git",
    estimateLabel: "Ön hesap",
    priceLabel: "Tahmini maliyet",
    timelineLabel: "Süre",
    days: "gun",
    materials: "Malzemeler",
    execution: "İşçilik",
    pace: "Hız",
    works: "İş kalemleri",
    included: "Neler dahil",
    phases: "Zaman aşamaları",
    risks: "Sonucu etkileyebilecek noktalar",
    next: "Sonraki adım",
    print: "Yazdır / PDF",
    edit: "Hesabı düzenle",
    note:
      "Bu sonucu ustaya göndererek farklı teklifleri aynı iş listesi üzerinden karşılaştırabilirsiniz.",
    leadTitle: "Hesabı projeye çevir",
    leadDescription:
      "Hesaptan sonra projeyi devam ettirmek istiyorsanız iletişim bilgisi ve kısa not bırakın. Böylece sonuç sayfası aynı zamanda lead toplar.",
  },
  en: {
    seoTitle: "Preliminary renovation estimate",
    seoDescription:
      "Result page with price range, renovation phases, work scope and the factors that may affect final cost.",
    copied: "Link copied",
    copyLink: "Copy link",
    unavailable: "Result unavailable",
    noData: "There is not enough data yet",
    noDataText:
      "First choose the property, area and at least one work category. The result page will then build automatically.",
    goToCalculator: "Go to calculator",
    estimateLabel: "Preliminary estimate",
    priceLabel: "Estimated cost",
    timelineLabel: "Timeline",
    days: "days",
    materials: "Materials",
    execution: "Execution",
    pace: "Pace",
    works: "Works",
    included: "What is included",
    phases: "Timeline phases",
    risks: "What may affect the final result",
    next: "Next steps",
    print: "Print / PDF",
    edit: "Edit estimate",
    note:
      "Send this result to a contractor so you can compare offers against the same work scope instead of different verbal descriptions.",
    leadTitle: "Turn this estimate into a lead",
    leadDescription:
      "If you want to continue the project after the estimate, leave a contact and a short note. This makes the result page useful both as a report and as lead capture.",
  },
};

export function ResultPage() {
  const location = useLocation();
  const { language } = useI18n();
  const copy = pageCopy[language];
  const [copied, setCopied] = useState(false);

  const calculatorState = useMemo(() => {
    const shared = getSharedStateFromSearch(location.search);
    if (shared) {
      return shared;
    }

    return loadCalculatorState() ?? defaultCalculatorState;
  }, [location.search]);

  const normalizedState = useMemo(
    () => buildNormalizedCalculatorState(calculatorState),
    [calculatorState],
  );
  const validation = validateCalculatorState(normalizedState, language);
  const estimate = validation.isValid ? calculateEstimate(normalizedState, language) : null;
  const shareLabel = copied ? copy.copied : copy.copyLink;

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: getRoutePath(language, "result"),
    alternates: getAlternatesForRoute("result"),
    noindex: true,
  });

  async function copyShareLink() {
    await navigator.clipboard.writeText(buildShareUrl(normalizedState));
    trackEvent("result_copy", {
      source: "result_page",
      project_type: normalizedState.objectType ?? "unknown",
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!estimate) {
    return (
      <div className="page result-page">
        <section className="result-shell empty-state">
          <p className="eyebrow">{copy.unavailable}</p>
          <h1>{copy.noData}</h1>
          <p>{copy.noDataText}</p>
          <Link className="button button-primary" to={getRoutePath(language, "calculator")}>
            {copy.goToCalculator}
          </Link>
        </section>
      </div>
    );
  }

  const locale = localeByLanguage[language];

  return (
    <div className="page result-page">
      <section className="result-shell">
        <div className="result-hero">
          <div>
            <p className="eyebrow">{copy.estimateLabel}</p>
            <h1>{estimate.summary.title}</h1>
            <p>{estimate.summary.subtitle}</p>
          </div>

          <div className="result-price-card">
            <span>{copy.priceLabel}</span>
            <strong>
              {formatCurrency(estimate.estimate.min, locale)} - {formatCurrency(estimate.estimate.max, locale)}
            </strong>
            <p>
              {copy.timelineLabel}: {estimate.timeline.totalMinDays}-{estimate.timeline.totalMaxDays} {copy.days}
            </p>
          </div>
        </div>

        <div className="metrics-grid">
          <article className="summary-card">
            <span>{copy.materials}</span>
            <strong>{tierLabels[language][normalizedState.materialTier]}</strong>
          </article>
          <article className="summary-card">
            <span>{copy.execution}</span>
            <strong>{tierLabels[language][normalizedState.executionTier]}</strong>
          </article>
          <article className="summary-card">
            <span>{copy.pace}</span>
            <strong>{tierLabels[language][normalizedState.timelinePreference]}</strong>
          </article>
          <article className="summary-card">
            <span>{copy.works}</span>
            <strong>{estimate.selectedWorks.length}</strong>
          </article>
        </div>

        <div className="result-grid">
          <article className="surface-panel">
            <h2>{copy.included}</h2>
            <div className="pill-grid">
              {estimate.selectedWorks.map((work) => (
                <span className="pill" key={work}>
                  {work}
                </span>
              ))}
            </div>
          </article>

          <article className="surface-panel">
            <h2>{copy.phases}</h2>
            <div className="timeline-list">
              {estimate.timeline.phases.map((phase) => (
                <div className="timeline-item" key={phase.id}>
                  <strong>
                    {phase.title}: {phase.minDays}-{phase.maxDays} {copy.days}
                  </strong>
                  <p>{phase.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-panel">
            <h2>{copy.risks}</h2>
            <ul className="risk-list">
              {estimate.riskFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface-panel">
            <h2>{copy.next}</h2>
            <div className="result-actions">
              <button className="button button-primary" onClick={copyShareLink} type="button">
                {shareLabel}
              </button>
              <button className="button button-secondary" onClick={() => window.print()} type="button">
                {copy.print}
              </button>
              <Link className="button button-ghost" to={getRoutePath(language, "calculator")}>
                {copy.edit}
              </Link>
            </div>
            <p className="muted-note">{copy.note}</p>
          </article>
        </div>

        <div className="surface-panel">
          <LeadForm
            description={copy.leadDescription}
            projectType={estimate.summary.subtitle}
            title={copy.leadTitle}
          />
        </div>
      </section>
    </div>
  );
}
