import React, { useState } from 'react';
import '../../estilos/datos-personales.css'
import { useNavigate } from 'react-router-dom';
import CalendarioInput from '../../components/Calendario';
import HoraInput from '../../components/Hora';



// Definimos el tipo de datos personales
interface PersonalDataType {
  fecha: string;
  hora_ingreso: string;
  hora_egreso: string;
  motivo: string;
  dia: string;
  estado: string;
  horas_normales: string;
  horas_extra: string
}

export const PermitirFichada = () => {
  // Estado para determinar si los campos son editables
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const navegar = useNavigate();

  // Estado para los datos personales, tipado con la interfaz PersonalDataType
  const [personalData, setPersonalData] = useState<PersonalDataType>({
    fecha: "01/01/2025",
    hora_ingreso: "08:00",
    hora_egreso: "16:00",
    motivo: "",
    dia: "01/01/2025",
    estado: "",
    horas_normales: "00:00",
    horas_extra: "00:00"
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para guardar los cambios
  const handleSave = () => {
    alert('Vas a permitir que el empleado realice una fichada manual')

    //Vuelve a la lista de empleados
    navegar('/administrador/empleados');
  };

  // Función para cancelar y revertir los cambios
  const handleCancel = () => {
    setIsEditable(true);
    // Volver a los datos iniciales
    setPersonalData({
      fecha: "01/01/2025",
      hora_ingreso: "08:00",
      hora_egreso: "16:00",
      motivo: "",
      dia: "01/01/2025",
      estado: "",
      horas_normales: "00:00",
      horas_extra: "00:00"
    });
    alert('Vas a cancelar la fichada manual')

    //Vuelve a la lista de empleados
    navegar('/administrador/empleados');
  };

  const opcionesDia = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const opcionesEstado = ['Completa', 'Completa con horas extra', 'Incompleta'];

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Fichada Manual</h2>
        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Fecha:</p>
              <CalendarioInput />
            </div>
            <div className="data-item">
              <p className="data-item--label">Hora de ingreso:</p>
              {/*<input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="hora_ingreso"
                value={personalData.hora_ingreso}
                onChange={handleChange}
                readOnly={isEditable}
              />*/}
              <HoraInput />
            </div>
            <div className="data-item">
              <p className="data-item--label">Hora de egreso:</p>
              {/*<input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="hora_egreso"
                value={personalData.hora_egreso}
                onChange={handleChange}
                readOnly={isEditable}
              />*/}
              <HoraInput />
            </div>
            <div className="data-item">
              <p className="data-item--label">Motivo</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="motivo"
                placeholder='Exprese un motivo'
                value={personalData.motivo}
                onChange={handleChange}
                readOnly={isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Día:</p>
              <select
                id="estado"
                name="estado"
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesDia.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>



            <div className="data-item">
              <p className="data-item--label">Estado:</p>
              <select
                id="estado"
                name="estado"
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesEstado.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="data-item">
              <p className="data-item--label">Horas normales:</p>
              <HoraInput />
            </div>
            <div className="data-item">
              <p className="data-item--label">Horas extras:</p>
              <HoraInput />
            </div>
          </div>
        </div>


        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Permitir
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
