import { NavLink } from 'react-router-dom';
import './estilos/empleado-item.css';
import type { Empleado } from '../routes/Pantallas/EmpleadosSup';

interface EmpleadoItemProps {
  empleado: Empleado;
}

export const EmpleadoFichada = ({ empleado }: EmpleadoItemProps) => {
  return (
    <div className="empleado-item">
      <span className="icono-perfil">👤</span>
      <span>{empleado.nombre}</span>
      <NavLink to="/supervisor/permitir-fichada" >Fichada manual</NavLink>
      <NavLink to="/supervisor/reportes" >Ver Reportes</NavLink>
      <NavLink to="/supervisor/ver-nomina" >Ver nomina</NavLink>
    </div>
  );
};

export default EmpleadoFichada;
