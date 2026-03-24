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
    seoTitle: "\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442 \u0440\u0435\u043c\u043e\u043d\u0442\u0430",
    seoDescription:
      "\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430 \u0441 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d\u043e\u043c \u0446\u0435\u043d\u044b, \u044d\u0442\u0430\u043f\u0430\u043c\u0438 \u0440\u0435\u043c\u043e\u043d\u0442\u0430, \u0441\u043f\u0438\u0441\u043a\u043e\u043c \u0440\u0430\u0431\u043e\u0442 \u0438 \u0444\u0430\u043a\u0442\u043e\u0440\u0430\u043c\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0432\u043b\u0438\u044f\u044e\u0442 \u043d\u0430 \u0438\u0442\u043e\u0433\u043e\u0432\u0443\u044e \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c.",
    copied: "\u0421\u0441\u044b\u043b\u043a\u0430 \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0430",
    copyLink: "\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443",
    unavailable: "\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d",
    noData: "\u041f\u043e\u043a\u0430 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u0440\u0430\u0441\u0447\u0435\u0442\u0430",
    noDataText:
      "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0431\u044a\u0435\u043a\u0442, \u043f\u043b\u043e\u0449\u0430\u0434\u044c \u0438 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u0438\u043d \u0432\u0438\u0434 \u0440\u0430\u0431\u043e\u0442. \u041f\u043e\u0441\u043b\u0435 \u044d\u0442\u043e\u0433\u043e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430 \u0441\u043e\u0431\u0435\u0440\u0435\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438.",
    goToCalculator: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440\u0443",
    estimateLabel: "\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0441\u0447\u0435\u0442",
    priceLabel: "\u041e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u043e\u0447\u043d\u0430\u044f \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c",
    timelineLabel: "\u0421\u0440\u043e\u043a",
    days: "\u0434\u043d\u0435\u0439",
    materials: "\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b",
    execution: "\u0418\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
    pace: "\u0422\u0435\u043c\u043f",
    works: "\u0420\u0430\u0431\u043e\u0442\u044b",
    included: "\u0427\u0442\u043e \u0432\u043a\u043b\u044e\u0447\u0435\u043d\u043e",
    phases: "\u042D\u0442\u0430\u043F\u044B \u043f\u043e \u0441\u0440\u043E\u043A\u0430\u043C",
    risks: "\u0427\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u0432\u043B\u0438\u044F\u0442\u044C \u043D\u0430 \u0438\u0442\u043E\u0433",
    next: "\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435",
    print: "\u0420\u0430\u0441\u043F\u0435\u0447\u0430\u0442\u0430\u0442\u044C / PDF",
    edit: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0441\u0447\u0435\u0442",
    note:
      "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u044D\u0442\u043E\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043C\u0430\u0441\u0442\u0435\u0440\u0443, \u0447\u0442\u043E\u0431\u044B \u0441\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0438 \u0442\u043E\u043C\u0443 \u0436\u0435 \u0441\u043F\u0438\u0441\u043A\u0443 \u0440\u0430\u0431\u043E\u0442, \u0430 \u043D\u0435 \u043F\u043E \u0440\u0430\u0437\u043D\u044B\u043C \u0443\u0441\u0442\u043D\u044B\u043C \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F\u043C.",
    leadTitle: "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u0440\u0430\u0441\u0447\u0435\u0442",
    leadDescription:
      "\u0415\u0441\u043B\u0438 \u0440\u0430\u0441\u0447\u0435\u0442 \u0432\u0430\u043C \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442, \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0438 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439. \u0422\u0430\u043A \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u043E\u0449\u0435 \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044E \u043F\u0440\u043E\u0435\u043A\u0442\u0430.",
  },
  tr: {
    seoTitle: "\u00D6n tadilat hesab\u0131",
    seoDescription:
      "Sonu\u00E7 sayfas\u0131; fiyat aral\u0131\u011F\u0131n\u0131, i\u015F a\u015Famalar\u0131n\u0131, kapsam\u0131 ve nihai maliyeti etkileyen fakt\u00F6rleri bir arada g\u00F6sterir.",
    copied: "Ba\u011Flant\u0131 kopyaland\u0131",
    copyLink: "Ba\u011Flant\u0131y\u0131 kopyala",
    unavailable: "Sonu\u00E7 haz\u0131r de\u011Fil",
    noData: "Hesap i\u00E7in hen\u00FCz yeterli veri yok",
    noDataText:
      "\u00D6nce m\u00FClk tipini, alan\u0131 ve en az bir i\u015F kalemini se\u00E7in. Sonra sonu\u00E7 sayfas\u0131 otomatik olarak olu\u015Fur.",
    goToCalculator: "Hesaplay\u0131c\u0131ya git",
    estimateLabel: "\u00D6n hesap",
    priceLabel: "Tahmini maliyet",
    timelineLabel: "S\u00FCre",
    days: "g\u00FCn",
    materials: "Malzemeler",
    execution: "\u0130\u015F\u00E7ilik",
    pace: "H\u0131z",
    works: "\u0130\u015F kalemleri",
    included: "Neler dahil",
    phases: "Zaman a\u015Famalar\u0131",
    risks: "Sonucu etkileyebilecek noktalar",
    next: "Sonraki ad\u0131m",
    print: "Yazd\u0131r / PDF",
    edit: "Hesab\u0131 d\u00FCzenle",
    note:
      "Bu sonucu ustaya g\u00F6ndererek farkl\u0131 teklifleri ayn\u0131 i\u015F listesi \u00FCzerinden kar\u015F\u0131la\u015Ft\u0131rabilirsiniz.",
    leadTitle: "Bu hesab\u0131 g\u00F6r\u00FC\u015Felim",
    leadDescription:
      "Hesap size uygunsa ileti\u015Fim bilgisi ve k\u0131sa not b\u0131rak\u0131n. B\u00F6ylece projeyi konu\u015Fmaya ge\u00E7mek daha kolay olur.",
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
    leadTitle: "Discuss this estimate",
    leadDescription:
      "If this estimate looks right for you, leave a contact and a short note so the project can move forward.",
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
