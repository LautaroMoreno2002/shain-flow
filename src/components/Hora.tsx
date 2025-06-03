import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const HoraInput: React.FC = () => {
  const [hora, setHora] = useState<Date | null>(null);

  return (
    <div >      
      <DatePicker
        className = 'data-item--value'
        selected={hora}
        onChange={(date: Date | null) => setHora(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={1}
        timeCaption="Hora"
        dateFormat="HH:mm"
        placeholderText="Elige la hora"
      />
    </div>
  );
};

export default HoraInput;