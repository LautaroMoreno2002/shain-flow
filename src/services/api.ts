import axios from "axios";

// const API_URL2 = "https://tpp-g2-adp-1.onrender.com/"; //conectar con la API
const API_URL = "https://render-crud-jc22.onrender.com/";

// export const WS_URL = "https://18.191.23.177:8000/ws"; // URL del WebSocket
export const WS_URL = "https://shainflow.duckdns.org/ws/"; // URL del WebSocket

// Instancia de Axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ModificarData {
  telefono: string;
  correo_electronico: string;
  calle: string;
  numero_calle: string;
  localidad: string;
  partido: string;
  provincia: string;
}

export interface RegistroHorario {
  tipo: string;
  fecha: string;
  hora: string | Date;
  estado_asistencia: string;
  turno_asistencia: string;
  puesto_del_asistente: string;
  vector_capturado: string;
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

// 3. Actualizar datos personales del empleado con Put (reemplaza todo)
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

// Actualizar empleados con Patch (reemplaza parcialmente los datos)
export const actualizarDatosPersonalesEmpleado = async (
  empleadoId: string,
  nuevosDatos: ModificarData
) => {
  const response = await api.patch(
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

// Eliminar un empleado
export const eliminarEmpleado = async (
  id_empleado: number
) => {
  return await api.delete(`/empleados/${id_empleado}`);
}

// Actualizar Registro de Horario Manual
export const actualizarRegistroHorario = async (
  registro_id: number | string,
  registro: RegistroHorario
) => {
  return await api.put(`/registros/${registro_id}`, registro);
}

// Obtener última nómina del empleado
export const obtenerUltimaNomina = async (
  id_empleado: number | string
) => await api.get(`/nominas/empleado/${id_empleado}/ultima`);

// Obtener nóminas del empleado
export const obtenerNominas = async (
  id_empleado: number | string
) => await api.get(`/nominas/empleado/${id_empleado}`);


/*
FALTA
GET IMG,
BORRAR EL POST OBTENER EMPLEADO,
DELETE BORRAR EMPLEADO (UNO SOLO),
REEVER LOS ENDPOINTS QUE NO DEVUELVEN NADA O ESTAN AL DOPE
EJ: POST nominas/empleado o POST nominas/empleado/buscar
TENER EN CUENTA QUE EL POST SE USA PARA CREAR ELEMENTOS, NO PARA CONSULTARLOS
EL GET ES DE CONSULTA, MUCHO O DE A UNO POR MEDIO DEL ID
EL PUT MODIFICA TODO UN ELEMENTO ENTERO
EL PATCH MODIFICA PARCIALMENTE EL ELEMENTO O TODO
EL DELETE ELIMINA UN REGISTRO O TODOS, SE LE DEBE PASAR SÓLO EL ID DEL EMPLEADO POR LA RUTA O NO PASARLE NADA PARA QUE BORRE TODOS. NO DEBE RECIBIR MÁS QUE ESO.
*/