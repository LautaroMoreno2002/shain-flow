import { NavLink } from 'react-router-dom';
import './empleado-item.css';
import type { Empleado } from '../routes/Pantallas/Empleados';

// interface Empleado {
//   id: number;
//   nombre: string;
// }

interface EmpleadoItemProps {
  empleado: Empleado;
}

export const EmpleadoItem = ({ empleado }: EmpleadoItemProps) => {
  return (
    <div className="empleado-item">
      <span className="icono-perfil">👤</span>
      <span className='empleado-nombre'>{empleado.nombre} {empleado.apellido}</span>
      <NavLink className={"link"} to="/administrador/editarEmpleado" >Editar</NavLink>
      <NavLink className={"link"} to="/administrador/editarDatosLaborales" >Agregar datos laborales</NavLink>
    </div>
  );
};

export default EmpleadoItem;
