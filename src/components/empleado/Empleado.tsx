import "./empleado.css";
import { VerDatos } from "../../routes/VerDatos";
import { Asistencias } from "../../routes/Asistencias";
import { DatosLaborales } from "../../routes/DatosLaborales";
import { NavBar } from "../NavBar";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";

const nombre = "Lautaro Moreno";
const fecha = new Date();
const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const dia = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];

export const Confirmacion = () => {
  return (
    <div className="cont-confirmacion">
      <div className="confirmacion">
      <div className="confirmacion__titulo">
        <h1 className="confirmacion__titulo--h1">¡Bienvenido, {nombre}!</h1>
        <p className="confirmacion__titulo--p">
          Hoy es {dia} {fecha.getDate()} de {mes} del {fecha.getFullYear()}
        </p>
      </div>
      <div className="cont">
        <i className="fa-regular fa-clock"></i>
        <div className="cont-confir">
          <p className="bold">Última asistencia:</p>
        <p>
          {fecha.getDate() - 1} de {mes} del {fecha.getFullYear()}, 8:00 - 16:00
        </p>
        </div>
      </div>
      <div className="cont">
        <i className="fa-regular fa-circle-check"></i>
        <div className="cont-estado">
          <p className="bold">Estado de hoy:</p>
        <p className="estado__confirmacion">Completa</p>
        </div>
      </div>
      <div className="cont">
        <i className="fa-solid fa-signal"></i>
        <div className="cont-horas">
          <p className="bold">Horas trabajadas esta semana:</p>
        <p className="horas-trabajadas__confirmacion">32 horas</p>
        </div>
      </div>
      {/* <div className="cont-botones">
        <NavLink to='/verDatos' type="button" className="btn btn-primary">
          Datos personales
        </NavLink>
        <NavLink to='/asistencias' type="button" className="btn btn-primary">
          Asistencias
        </NavLink>
        <NavLink to='/datosLaborales' type="button" className="btn btn-primary">
          Datos laborales
        </NavLink>
      </div> */}
    </div>
    </div>
  );
};

const navItems =  [
  { label: "Datos personales", icon: "fa-solid fa-user", path: "/verDatos" },
  { label: "Confirmación", icon: "fa-solid fa-square-check", path: "/" },
  { label: "Datos laborales", icon: "fa-solid fa-user-tie", path: "/datosLaborales" },
  { label: "Asistencias", icon: "fa-regular fa-id-card", path: "/asistencias" },
  { label: "Cerrar sesión", icon: "fa-solid fa-lock", path: "/" },
];

export const Empleado = () => {
  return (
    <>
    <BrowserRouter>
      <NavBar items={navItems}/>
      <Routes>
        <Route path="/" element={<Confirmacion />}></Route>
        <Route path="/verDatos" element={<VerDatos/>}></Route>
        <Route path="/datosLaborales" element={<DatosLaborales/>}></Route>
        <Route path="/asistencias" element={<Asistencias/>}></Route>
        <Route path="/*" element={<Confirmacion/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};
