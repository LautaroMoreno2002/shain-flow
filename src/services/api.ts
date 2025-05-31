import axios from "axios";

// const API_URL2 = "https://tpp-g2-adp-1.onrender.com/"; //conectar con la API
const API_URL = "https://render-crud-jc22.onrender.com/";

export const WS_URL = "http://18.191.23.177:8000/ws"; // URL del WebSocket

// Instancia de Axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ModificarData {
  telefono: string,
  correo_electronico: string,
  calle: string,
  numero_calle: string,
  localidad: string,
  partido: string,
  provincia: string
}

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
  nuevosDatos: ModificarData
) => {
  const response = await api.put(
    `/empleados/${empleadoId}/datos-personales`,
    nuevosDatos
  );
  return response.data;
};

// 4. Obtener registro de asistencias del empleado
export const registroAsistenciasPorId = async (
  numeroId: string
) => {
  // const mes = new Date().getMonth() + 1;
  // const anio = new Date().getFullYear();

  const response = await api.get(
    // `/registros/${numeroId}?año=${anio}&mes=${mes}`
    `/registroscompleto/${numeroId}`
  );
  return response.data;
};

// 5. Obtener nóminas del empleado
export const nominasPorId = async (
  numeroId: string
) => {
  const response = await api.get(
    `/nominas/empleado/${numeroId}`
  );
  return response.data;
};

// 6. Obtener datos laborales del empleado
export const datosLabPorId = async (id_empleado: string) => {
  const response = await api.get(`empleados/${id_empleado}/informacion-laboral`);
  return response.data;
}

// 7. Crear empleado
export const crearEmpleado = async (nuevoEmpleado: any) => {
  console.log("Enviando a backend:", nuevoEmpleado);
  const response = await api.post("/empleados/", nuevoEmpleado);
  return response.data;
};

export const calcularNominaAuto = async (
  id_empleado: number,
  periodo: string,
  fecha_calculo: string
) => {
  const response = await api.post("/calcular", {
    id_empleado,
    periodo,
    fecha_calculo,
  });
  console.log("Resultado recibido:", response.data);
  return response.data;
};

export const obtenerNomina = async (
  id_empleado: number,
  periodo: string
) => {
  const response = await api.post(`/nominas/empleado/buscar`,{
    id_empleado,
    periodo
  });
  console.log("Resultado recibido:", response.data);
  console.log("Resultado recibido:", response.data.nominas);
  console.log("Resultado recibido:", response.data.nominas[0]);
  return response.data.nominas[0];  
}