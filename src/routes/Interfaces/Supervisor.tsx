import { NavBar } from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const navItemsAdministrador =  [
  { label: "Datos personales", icon: "fa-solid fa-address-card", path: "verDatos" },
  { label: "Confirmación", icon: "fa-solid fa-square-check", path: "confirmacion" },
  { label: "Datos laborales", icon: "fa-solid fa-user-tie", path: "datosLaborales" },
  { label: "Asistencias", icon: "fa-regular fa-id-card", path: "asistencias" },
  { label: "Cerrar sesión", icon: "fa-solid fa-lock", path: "/login" },
];

interface DataType {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';//conectar con la API

// GET request
const getData = async (): Promise<DataType[]> => {//pedir los datos
  const response = await fetch(API_URL);
  if (!response.ok) {//control de errores
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();//respuesta en formato json
};

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
