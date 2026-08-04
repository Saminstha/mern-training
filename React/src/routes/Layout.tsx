import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

function navLinkClass({
  isActive,
}: {
  isActive: boolean;
}): string {
  return isActive
    ? "nav-link nav-link--active"
    : "nav-link";
}

function Layout({
  isAuthenticated,
  onLogout,
}: LayoutProps) {
  return (
    <div className="app">
      <Header />

      <nav className="app-nav">
        <div className="nav-left">
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Students
          </NavLink>
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <button
              type="button"
              className="nav-link nav-logout"
              onClick={onLogout}
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className={navLinkClass}
            >
              Log in
            </NavLink>
          )}
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;