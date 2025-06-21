import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarioInputProps {
  value: string;
  onChange: (fecha: string) => void;
}

const CalendarioInput: React.FC<CalendarioInputProps> = ({ value, onChange }) => {
  const fechaParseada = value ? new Date(value) : null;

  return (
    <div>
      <DatePicker
        id="calendario"
        className="data-item--value"
        selected={fechaParseada}
        onChange={(date: Date | null) => {
          if (date) {
            const fechaFormateada = date.toISOString().split("T")[0]; // formato YYYY-MM-DD
            onChange(fechaFormateada);
          } else {
            onChange(""); // En caso de borrar la fecha
          }
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="Elige una fecha"
      />
    </div>
  );
};

export default CalendarioInput;