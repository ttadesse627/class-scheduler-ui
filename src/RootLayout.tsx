import { NavLink, Outlet } from "react-router-dom";

import "./styles/menu-style.css";

export default function RootLayout() {
  return (
    <div className="root-layout">
      {/* <header> */}
      <nav className="side-navbar">
        <ul className="side-navbar-list">
          <li className="side-navbar-list-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="side-navbar-list-item">
            <NavLink className="nav-link" to="departments">
              Departments
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* </header> */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
