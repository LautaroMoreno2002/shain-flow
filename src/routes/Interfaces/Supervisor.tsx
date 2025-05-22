import { NavBar } from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const navItemsAdministrador =  [
  { label: "Datos personales", icon: "fa-solid fa-address-card", path: "verDatos" },
  { label: "Confirmación", icon: "fa-solid fa-square-check", path: "confirmacion" },
  { label: "Datos laborales", icon: "fa-solid fa-user-tie", path: "datosLaborales" },
  { label: "Asistencias", icon: "fa-regular fa-id-card", path: "asistencias" },
  { label: "Empleados", icon: "fa-regular fa-id-card", path: "fichada-manual" },
  /*{ label: "Reprtes", icon: "fa-regular fa-id-card", path: "reportes" },*/
  { label: "Cerrar sesión", icon: "fa-solid fa-lock", path: "/login" },
];


export const Supervisor = () => {
  return (
    <>
      <NavBar items={navItemsAdministrador}/>
      <main>
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </main>
    </>
  )
};
