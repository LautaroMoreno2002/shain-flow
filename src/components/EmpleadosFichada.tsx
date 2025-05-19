import { NavLink } from 'react-router-dom';
import './empleado-item.css';

interface Empleado {
  id: number;
  nombre: string;
}

interface EmpleadoItemProps {
  empleado: Empleado;
}

export const EmpleadoFichada = ({ empleado }: EmpleadoItemProps) => {
  return (
    <div className="empleado-item">
      <span className="icono-perfil">👤</span>
      <span>{empleado.nombre}</span>
      <NavLink to="/supervisor/permitir-fichada" >Fichada exepcional</NavLink>
    </div>
  );
};

export default EmpleadoFichada;
