import { NavLink } from 'react-router-dom';
import './estilos/empleado-item.css';
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
      {/* <span className="icono-perfil">👤</span> */}
      <span className="icono-perfil">
        <img src="https://imgs.search.brave.com/z1pY-zOd_QZunrzoobVmAzPXl4KV3X43yVSRA6IYek4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lcy52/aXNhZm90by5jb20v/aW1nLzR4NC1jbS1w/YXNzcG9ydC1waG90/by1leGFtcGxlLndl/YnA" alt="" width='50px'/>
      </span>
      <span className='empleado-nombre'>{empleado.nombre} {empleado.apellido}</span>
      <NavLink className={"link"} to="/administrador/editarEmpleado" >Editar</NavLink>
      <NavLink className={"link"} to="/administrador/editarDatosLaborales" >Agregar datos laborales</NavLink>
      <NavLink className={"link"} to="/administrador/inasistencia" >Agregar inasistencia</NavLink>
    </div>
  );
};

export default EmpleadoItem;
