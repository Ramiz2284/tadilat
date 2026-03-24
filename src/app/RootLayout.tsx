import { Link, NavLink, Outlet } from "react-router-dom";
import { trackEvent } from "../shared/analytics";
import { useHorizontalScrollHint } from "../shared/lib/useHorizontalScrollHint";

export function RootLayout() {
  const navHint = useHorizontalScrollHint<HTMLElement>();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">T</span>
          <span>
            <strong>Tadilat</strong>
            <small>Понятный ремонт в Турции</small>
          </span>
        </Link>

        <div className="topbar-actions">
          <nav
            className="topnav scroll-hint"
            data-can-scroll-left={navHint.state.canScrollLeft ? "true" : "false"}
            data-can-scroll-right={navHint.state.canScrollRight ? "true" : "false"}
            data-engaged={navHint.state.engaged ? "true" : "false"}
            data-scrollable={navHint.state.scrollable ? "true" : "false"}
            ref={navHint.ref}
          >
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/calculator">Калькулятор</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/result">Результат</NavLink>
          </nav>

          <Link
            className="button button-primary topbar-cta"
            onClick={() => trackEvent("cta_click", { location: "topbar", target: "calculator" })}
            to="/calculator"
          >
            Рассчитать
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
