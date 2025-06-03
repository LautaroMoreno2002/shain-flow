import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CalendarioInput: React.FC = () => {
  const [fecha, setFecha] = useState<Date | null>(null);

  return (
    <div >
      <DatePicker 
        className = 'data-item--value'
        selected={fecha}
        onChange={(date: Date | null) => setFecha(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Elige una fecha"
        //className="border p-2 rounded"
      />
    </div>
  );
};

export default CalendarioInput;