import React from "react";
import { NavLink } from "react-router-dom";
import MainLogo from '../../../Assets/images/Main-Logo.png'

const NAV_ITEMS = [
  { label: "Employees List", path: "/employees" },
  { label: "Guard Shifts", path: "/guard-shifts" },
];

const SideBar = () => {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <img src={MainLogo} alt="Main Logo" />
      <h4 className="sidebar__title"> EMGP</h4>
      <ul className="sidebar__list">
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `sidebar__link${isActive ? " sidebar__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
