import { useState, useEffect } from 'react';
import EmpleadoItem from '../../components/EmpleadoItem';
import '../../estilos/empleados.css';
import { NavLink } from "react-router-dom";

interface Empleado {
  id: number;
  nombre: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// GET request
const getData = async (): Promise<Empleado[]> => {//pedir los datos
  const response = await fetch(API_URL);
  if (!response.ok) {//control de errores
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();//respuesta en formato json
};

export const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');

  // Simulación de datos (temporal)
  const empleadosSimulados: Empleado[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    nombre: `EMPLEADO ${i + 1}`,
  }));

  useEffect(() => {
    // TODO: Descomenta esto cuando tengas el backend funcionando
    /*
    fetch('https://tu-api.com/empleados')
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error('Error al cargar empleados:', err));
    */

    // Temporal
    setEmpleados(empleadosSimulados);
  }, []);

  const empleadosFiltrados = empleados.filter((emp) =>
    emp.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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
        {empleadosFiltrados.map((empleado) => (
          <EmpleadoItem key={empleado.id} empleado={empleado} />
        ))}
        <NavLink to="/Administrador/agregarEmpleado">Agregar empleado</NavLink>
      </div>
    </div>
  );
}
