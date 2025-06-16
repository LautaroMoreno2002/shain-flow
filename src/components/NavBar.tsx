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
  logoSrc: string; // <-- ruta al logo
}

export const NavBar = ({ items }: NavBarProps) => {
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
                data-label={label}
                className={({ isActive }) =>
                  `navLink ${!showLabels ? "collapsed" : ""} ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <i className={icon}></i>
                <span className="label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Logo al pie */}
        <div className="logo-footer">
          <img src="./logo_producto.png" alt="shain-flow"/>
        </div>
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
