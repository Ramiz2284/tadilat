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

        <nav className="topnav">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/calculator">Калькулятор</NavLink>
          <NavLink to="/result">Результат</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
