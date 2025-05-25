import { NavLink } from 'react-router-dom';
import './empleado-item.css';
import type { Empleado } from '../routes/Pantallas/FichadaManual';

/*interface Empleado {
  id: number;
  nombre: string;
}*/

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
      <NavLink to="/supervisor" >Ver nomina</NavLink>
    </div>
  );
};

export default EmpleadoFichada;
