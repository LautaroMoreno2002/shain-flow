import { useState, useEffect } from 'react';
import EmpleadoItem from '../../components/EmpleadoItem';
import '../../estilos/empleados.css';
import { NavLink } from "react-router-dom";
import axios from 'axios';

export interface Empleado {
  id_empleado: number;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

// interface DataType {
//   id: number;
//   title: string;
//   body: string;
// }

const API_URL = 'https://tpp-g2-adp-1.onrender.com/';//conectar con la API

// Instancia de Axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Listar empleados
export const listarEmpleados = async () => {
  const response = await api.get('/empleados/');
  return response.data;
};

// GET request
// const getData = async (): Promise<DataType[]> => {//pedir los datos
//   const response = await fetch(`${API_URL}/empleados`);
//   if (!response.ok) {//control de errores
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return await response.json();//respuesta en formato json
// };

export const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  // Simulación de datos (temporal)
  // const empleadosSimulados: Empleado[] = Array.from({ length: 12 }, (_, i) => ({
  //   id: i + 1,
  //   nombre: `EMPLEADO ${i + 1}`,
  // }));

  useEffect(() => {
    // TODO: Descomenta esto cuando tengas el backend funcionando
    // fetch(`${API_URL}/empleados`)
      // .then(res => res.json())
      const cargarEmpleados = async () => {
        try {
          const data = await listarEmpleados();
          console.log(data);
          
          setEmpleados(data);
          console.log(empleados);
          
        } catch (error) {
          console.error('Error al cargar empleados:', error);
        }
      };
      cargarEmpleados();
    // Temporal
    // setEmpleados(empleadosSimulados);
  }, []);

  // const empleadosFiltrados = empleados.filter((emp) =>
  //   emp.nombre.toLowerCase().includes(busqueda.toLowerCase())
  // );

  return (
    <div className="admin-container">
      <h2 className="admin-title">👥 Empleados:</h2>
      <div className="busqueda-container">
        <input
          type="text"
          placeholder="EMPLEADO 500...."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <span className="icono-busqueda">🔍</span>
      </div>
      <div className="lista-empleados">
        {empleados.map((empleado) => (
          <EmpleadoItem key={empleado.id_empleado} empleado={empleado} />
        ))}
        <NavLink to="/Administrador/agregarEmpleado">Agregar empleado</NavLink>
      </div>
    </div>
  );
}
