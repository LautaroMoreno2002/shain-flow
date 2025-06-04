import "./estilos/NavBar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export type NavItem = {
  label: string;
  icon: string;
  path: string;
};

export interface NavBarProps {
  items: NavItem[];
}

export const NavBar = ({ items } : NavBarProps) => {
  const [showLabels, setShowLabels] = useState(true);

  const handleToggle = () => {
    setShowLabels(!showLabels);
  };

  return (
    <nav className="nav">
      <div className={`cont-nav ${!showLabels ? "collapsed" : ""}`}>
        <ul>
          {items.map(({ label, icon, path }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `navLink ${!showLabels ? "collapsed" : ""} ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <i className={icon}></i>
                {showLabels && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="close" onClick={handleToggle}>
        {showLabels ? (
          <i className="fa-solid fa-arrow-left"></i>
        ) : (
          <i className="fa-solid fa-arrow-right"></i>
        )}
      </div>
    </nav>
  );
};