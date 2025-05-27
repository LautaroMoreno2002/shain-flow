import { NavLink } from 'react-router-dom';
import './empleado-item.css';
import type { Empleado } from '../routes/Pantallas/Empleados';

// interface Empleado {
//   id: number;
//   nombre: string;
// }

interface EmpleadoNominaProps {
  empleado: Empleado;
}

export const EmpleadoNomina = ({ empleado }: EmpleadoNominaProps) => {
  return (
    <div className="empleado-item">
      <span className="icono-perfil">👤</span>
      <span>{empleado.nombre} {empleado.apellido}</span>
      <NavLink to="/administrador/calculo-nomina" >Calcular nómina</NavLink>
    </div>
  );
};

export default EmpleadoNomina;
