import './empleado-item.css';

interface Empleado {
  id: number;
  nombre: string;
}

interface EmpleadoItemProps {
  empleado: Empleado;
}

export const EmpleadoItem = ({ empleado }: EmpleadoItemProps) => {
  return (
    <div className="empleado-item">
      <span className="icono-perfil">👤</span>
      <span>{empleado.nombre}</span>
    </div>
  );
};

export default EmpleadoItem;
