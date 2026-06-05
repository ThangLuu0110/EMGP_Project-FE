import React from "react";
import { NavLink } from "react-router-dom";
import MainLogo from '../../../Assets/images/Main-Logo.png';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

const NAV_ITEMS = [
  { label: "Employees List", path: "/employees", logo: <IoPersonOutline /> },
  { label: "Guard Shifts", path: "/guard-shifts", logo: <MdOutlineSecurity />},
];

const SideBar = () => {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      <div className="sidebar__title">
        <NavLink to="/">
          <img src={MainLogo} alt="Main Logo" height="100px"/>
        </NavLink> 
      </div>
      <ul className="sidebar__list">
        {NAV_ITEMS.map(({ label, path, logo }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `sidebar__link${isActive ? " sidebar__link--active" : ""}`
              }
            >
              <span className="sidebar__link-logo">{logo}</span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
