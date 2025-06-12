import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-day-picker/style.css';
import '../estilos/datosLaborales.css'
import './estilos/inasistencia.css'
import DatePicker from 'react-datepicker';

type FormData = {
  fecha: Date | null;
  dia: string;
  tipo: string;
  descripcion: string;
};

const tiposInasistencia = [
  'Falta justificada',
  'Falta no justificada',
  'Licencia médica',
  'Vacaciones',
  'Suspensión',
  'No laboral',
  'Otra',
];

const diasSemana = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const Inasistencia: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

  const onSubmit = (data: FormData) => {
    console.log('Datos enviados:', data);
    alert('Inasistencia registrada')
  };

  const handleFechaChange = (date: Date | null) => {    
    
    const fecha = date;    
    setFechaSeleccionada(fecha);
    if (fecha) {
      setValue('fecha', fecha);
    }
  };

  const handleDiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const dia = value;
    if (dia) {
      const diaSemana = dia;
      setValue('dia', diaSemana);
    }
  };

  return (
    <div className='form-inasistencia'>
    <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <div className='cont-campos'>
      <div>
        <label>Fecha:</label>
        {/*<CalendarioInput />*/}
        <DatePicker
        selected={fechaSeleccionada}
        onChange={handleFechaChange}
        dateFormat="yyyy-MM-dd" 
        placeholderText="Elige una fecha"
        />
        <input type="hidden" {...register('fecha', { required: 'La fecha es obligatoria' })} />
        {errors.fecha && <span>{errors.fecha.message}</span>}
      </div>

      <div>
        <label>Día:</label>
        <select
                id="dia"
                name="dia"
                className={`data-item--value`}
                onChange={handleDiaChange}
              >
                <option value="">Seleccione una opción</option>
                {diasSemana.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
        </select>
        {/*<input type="text" value={fechaSeleccionada ? diasSemana[fechaSeleccionada.getDay() - 1] : ''} readOnly />*/}
        <input type="hidden" {...register('dia', { required: 'El día es obligatorio' })} />
        {errors.dia && <span>{errors.dia.message}</span>}
        
      </div>

      <div>
        <label>Tipo de inasistencia:</label>
        <select className={`data-item--value`} {...register('tipo', { required: 'El tipo es obligatorio' })}>
          <option value="">Seleccionar...</option>
          {tiposInasistencia.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {errors.tipo && <span>{errors.tipo.message}</span>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea className={`data-textarea`} {...register('descripcion', { required: 'La descripción es obligatoria' })} />
        {errors.descripcion && <span>{errors.descripcion.message}</span>}
      </div>

      <button className='btn-registrar' type="submit">Registrar inasistencia</button>
      </div>
    </form>
    </div>
  );
};

export default Inasistencia;