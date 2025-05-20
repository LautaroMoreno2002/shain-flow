import { NavBar } from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const navItemsAdministrador =  [
  { label: "Datos personales", icon: "fa-solid fa-address-card", path: "verDatos" },
  { label: "Confirmación", icon: "fa-solid fa-square-check", path: "confirmacion" },
  { label: "Datos laborales", icon: "fa-solid fa-user-tie", path: "datosLaborales" },
  { label: "Asistencias", icon: "fa-regular fa-id-card", path: "asistencias" },
  { label: "Empleados", icon: "fa-solid fa-users", path: "empleados" },
  { label: "Reportería", icon: "fa-solid fa-chart-simple", path: "#" },
  { label: "Nóminas", icon: "fa-solid fa-coins", path: "#" },
  { label: "Cerrar sesión", icon: "fa-solid fa-lock", path: "/login" },
];

/*


Interfaz RRHH:


Gestiona toda la plataforma, tiene acceso completo.


Puede ver, editar y realizar acciones sobre los datos de los empleados, el registro de asistencias y la nómina.


Podrá descargar los datos, registro de asistencia y nómina en un archivo Excel.


Podrá enviar notificaciones a los empleados.



*/


export const Administrador = () => {
  return (
    <>
      <NavBar items={navItemsAdministrador}/>
      <main>
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </main>
    </>
  )
};
