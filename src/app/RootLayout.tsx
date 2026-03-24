import { Link, NavLink, Outlet } from "react-router-dom";

export function RootLayout() {
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
          <nav className="topnav">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/calculator">Калькулятор</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/result">Результат</NavLink>
          </nav>

          <Link className="button button-primary topbar-cta" to="/calculator">
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
