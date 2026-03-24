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
          <span className="brand-mark">T</span>
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

