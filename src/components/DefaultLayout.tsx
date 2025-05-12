import React from "react";
import './default-layout.css'

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      {/*<header className="navbar-header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>*/}

      <main>{children}</main>
    </>
  );
}
