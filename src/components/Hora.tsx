import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const HoraInput: React.FC = () => {
  const [hora, setHora] = useState<Date | null>(null);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      
      <DatePicker
        selected={hora}
        onChange={(date: Date | null) => setHora(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Hora"
        dateFormat="HH:mm"
        placeholderText="Selecciona la hora"
      />
      {/*{hora && (
        <p style={{ marginTop: '1rem' }}>
          Hora seleccionada: <strong>{hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
        </p>
      )}*/}
    </div>
  );
};

export default HoraInput;