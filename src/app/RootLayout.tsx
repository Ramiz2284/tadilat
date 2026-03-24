import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "../shared/analytics";
import {
  getLanguageFromPathname,
  getRoutePath,
  languageLabels,
  languages,
  localeRedirectStorageKey,
  translatePathname,
  useI18n,
} from "../shared/i18n";
import { useHorizontalScrollHint } from "../shared/lib/useHorizontalScrollHint";

const layoutCopy = {
  ru: {
    brandSubtitle: "Понятный ремонт в Турции",
    home: "Главная",
    calculator: "Калькулятор",
    faq: "FAQ",
    result: "Результат",
    swipeNav: "Свайп →",
    cta: "Рассчитать",
  },
  tr: {
    brandSubtitle: "Türkiye'de daha anlaşılır tadilat",
    home: "Ana sayfa",
    calculator: "Hesaplayıcı",
    faq: "FAQ",
    result: "Sonuç",
    swipeNav: "Kaydır →",
    cta: "Hesapla",
  },
  en: {
    brandSubtitle: "Clear renovation planning for Turkey",
    home: "Home",
    calculator: "Calculator",
    faq: "FAQ",
    result: "Result",
    swipeNav: "Swipe →",
    cta: "Estimate",
  },
};

export function RootLayout() {
  const navHint = useHorizontalScrollHint<HTMLElement>();
  const { language, setLanguage } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const urlLanguage = getLanguageFromPathname(location.pathname);
  const copy = layoutCopy[urlLanguage];

  useEffect(() => {
    if (language !== urlLanguage) {
      setLanguage(urlLanguage);
    }
  }, [language, setLanguage, urlLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.localStorage.getItem(localeRedirectStorageKey)) {
      return;
    }

    if (location.pathname !== "/" || location.search || location.hash) {
      return;
    }

    const browserLanguage = window.navigator.languages?.[0] ?? window.navigator.language;
    const normalized = browserLanguage.toLowerCase();
    const detectedLanguage = normalized.startsWith("tr")
      ? "tr"
      : normalized.startsWith("en")
        ? "en"
        : "ru";

    window.localStorage.setItem(localeRedirectStorageKey, "true");

    if (detectedLanguage !== "ru") {
      setLanguage(detectedLanguage);
      navigate(getRoutePath(detectedLanguage, "home"), { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate, setLanguage]);

  function switchLanguage(nextLanguage: (typeof languages)[number]) {
    setLanguage(nextLanguage);
    navigate({
      pathname: translatePathname(location.pathname, nextLanguage),
      search: location.search,
      hash: location.hash,
    });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to={getRoutePath(urlLanguage, "home")}>
          <span aria-hidden="true" className="brand-mark">
            <svg fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="brandMarkBg" x1="10" x2="54" y1="8" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1D5C4F" />
                  <stop offset="1" stopColor="#12362D" />
                </linearGradient>
                <linearGradient id="brandMarkAccent" x1="41" x2="50" y1="14" y2="23" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F4B16F" />
                  <stop offset="1" stopColor="#DD6F2D" />
                </linearGradient>
              </defs>
              <rect fill="url(#brandMarkBg)" height="56" rx="18" width="56" x="4" y="4" />
              <path
                d="M20 28.5L32 18L44 28.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path
                d="M22 27V43C22 44.1046 22.8954 45 24 45H40C41.1046 45 42 44.1046 42 43V27"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <rect fill="white" height="4.5" rx="1.2" width="4.5" x="27" y="31" />
              <rect fill="white" height="4.5" rx="1.2" width="4.5" x="33.5" y="31" />
              <rect fill="white" height="4.5" rx="1.2" width="4.5" x="27" y="37.5" />
              <path d="M36 39.75H40" stroke="white" strokeLinecap="round" strokeWidth="3" />
              <circle cx="45.5" cy="18.5" fill="url(#brandMarkAccent)" r="6.5" />
              <path d="M45.5 15.5V21.5M42.5 18.5H48.5" stroke="white" strokeLinecap="round" strokeWidth="2.5" />
            </svg>
          </span>
          <span>
            <strong>Tadilat</strong>
            <small>{copy.brandSubtitle}</small>
          </span>
        </Link>

        <div className="topbar-actions">
          <div className="language-switcher" role="group" aria-label="Language switcher">
            {languages.map((item) => (
              <button
                className={item === urlLanguage ? "active" : ""}
                key={item}
                onClick={() => switchLanguage(item)}
                type="button"
              >
                {languageLabels[item]}
              </button>
            ))}
          </div>

          <div className="scroll-hint-shell">
            <nav
              className="topnav scroll-hint"
              data-can-scroll-left={navHint.state.canScrollLeft ? "true" : "false"}
              data-can-scroll-right={navHint.state.canScrollRight ? "true" : "false"}
              data-engaged={navHint.state.engaged ? "true" : "false"}
              data-scrollable={navHint.state.scrollable ? "true" : "false"}
              ref={navHint.ref}
            >
              <NavLink to={getRoutePath(urlLanguage, "home")}>{copy.home}</NavLink>
              <NavLink to={getRoutePath(urlLanguage, "calculator")}>{copy.calculator}</NavLink>
              <NavLink to={getRoutePath(urlLanguage, "faq")}>{copy.faq}</NavLink>
              <NavLink to={getRoutePath(urlLanguage, "result")}>{copy.result}</NavLink>
            </nav>
            {navHint.state.scrollable && !navHint.state.engaged ? (
              <span className="scroll-hint-badge scroll-hint-badge-nav">{copy.swipeNav}</span>
            ) : null}
          </div>

          <Link
            className="button button-primary topbar-cta"
            onClick={() => trackEvent("cta_click", { location: "topbar", target: "calculator" })}
            to={getRoutePath(urlLanguage, "calculator")}
          >
            {copy.cta}
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

