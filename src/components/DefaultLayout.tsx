import React from "react";
import './default-layout.css'

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="default-layout">
      <div className="cont-empresa">
        <div className="empresa-logo">
          <img src="/logo.png" alt="Logo de la empresa" />
        </div>
        <div className="empresa-descripcion">
          <h2>Sobre la empresa</h2>
          <p>
            Somos una empresa tecnológica enfocada en brindar soluciones innovadoras
            para la gestión de recursos humanos, nóminas y asistencia. Nos destacamos
            por nuestra eficiencia, compromiso y adaptabilidad al cambio.
          </p>
        </div>
        <div className="empresa-integrantes">
          <h3>Nuestro equipo</h3>
          <ul>
            <li>Laura Gómez – CEO</li>
            <li>Martín Pérez – CTO</li>
            <li>Sofía Ramírez – Analista Funcional</li>
            <li>Juan Ortega – Desarrollador Frontend</li>
            <li>Camila Díaz – RRHH</li>
          </ul>
        </div>
      </div>
      <div className="cont-child">
        {children}
      </div>
    </div>
  );
}
