import axios from "axios";
import type { PersonalDataType } from "../routes/Pantallas/VerDatos";

const API_URL = "https://tpp-g2-adp-1.onrender.com/"; //conectar con la API

// Instancia de Axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Listar empleados
export const listarEmpleados = async () => {
  const response = await api.get("/empleados/");
  return response.data;
};

// 2. Obtener empleado por número de identificación
export const obtenerEmpleadoPorIdentificacion = async (
  numeroIdentificacion: string
) => {
  const response = await api.get(`/empleados/${numeroIdentificacion}`);
  return response.data;
};

// 3. Actualizar datos personales del empleado
export const actualizarDatosEmpleado = async (
  empleadoId: string,
  nuevosDatos: PersonalDataType
) => {
  const response = await api.put(
    `/empleados/${empleadoId}/datos-personales`,
    nuevosDatos
  );
  return response.data;
};

// 4. Obtener registro de asistencias del empleado
export const datosLabPorId = async (
  numeroId: string
) => {
  const mes = new Date().getMonth() + 1;
  const anio = new Date().getFullYear();

  const response = await api.get(
    `/registros/${numeroId}?año=${anio}&mes=${mes}`
  );
  return response.data;
};