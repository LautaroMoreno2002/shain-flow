import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './estilos/AsistenciaUnica.css';
import { FaCheck } from 'react-icons/fa';

type FormData = {
  fecha: Date | null;
  tipo: string;
  hora: string;
  estado_asistencia: string;
  turno_asistencia: string;
};

const tipos = ['Entrada', 'Salida'];
const estadosAsistencia = ['A tiempo', 'Tarde', 'Temprana', 'Retraso minimo', 'Fuera de rango'];
const turnos = ['Mañana', 'Tarde'];

const AsistenciaUnica: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(new Date());

  const onSubmit = (data: FormData) => {
    console.log('Datos enviados:', data);
    alert('✅ Asistencia registrada manualmente');
  };

  const handleFechaChange = (date: Date | null) => {
    setFechaSeleccionada(date);
    if (date) setValue('fecha', date);
  };

  return (
    <div className="form-asistencia-unica">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="asistencia-unica__titulo">Registrar asistencia manual</h2>
        <p className="asistencia-unica__subtitulo">
          Ingresá manualmente una entrada o salida del empleado.
        </p>

        <div className="cont-campos">
          <div>
            <label>Fecha:</label>
            <DatePicker
              selected={fechaSeleccionada}
              onChange={handleFechaChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccionar fecha"
            />
            <input type="hidden" {...register('fecha', { required: 'La fecha es obligatoria' })} />
            {errors.fecha && <span>{errors.fecha.message}</span>}
          </div>

          <div>
            <label>Tipo:</label>
            <select {...register('tipo', { required: 'El tipo es obligatorio' })} className="data-item--value">
              <option value="">Seleccionar...</option>
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            {errors.tipo && <span>{errors.tipo.message}</span>}
          </div>

          <div>
            <label>Hora:</label>
            <input
              type="time"
              {...register('hora', { required: 'La hora es obligatoria' })}
              className="data-item--value"
              defaultValue={new Date().toTimeString().slice(0, 5)}
            />
            {errors.hora && <span>{errors.hora.message}</span>}
          </div>

          <div>
            <label>Estado de asistencia:</label>
            <select {...register('estado_asistencia', { required: 'El estado es obligatorio' })} className="data-item--value">
              <option value="">Seleccionar...</option>
              {estadosAsistencia.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
            {errors.estado_asistencia && <span>{errors.estado_asistencia.message}</span>}
          </div>

          <div>
            <label>Turno:</label>
            <select {...register('turno_asistencia', { required: 'El turno es obligatorio' })} className="data-item--value">
              <option value="">Seleccionar...</option>
              {turnos.map((turno) => (
                <option key={turno} value={turno}>{turno}</option>
              ))}
            </select>
            {errors.turno_asistencia && <span>{errors.turno_asistencia.message}</span>}
          </div>

          <button type="submit" className="btn-registrar">
            <FaCheck style={{ marginRight: '8px' }} />
            Registrar asistencia
          </button>
        </div>
      </form>
    </div>
  );
};

export default AsistenciaUnica;
