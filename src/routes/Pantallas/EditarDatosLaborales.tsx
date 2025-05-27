import React, { useState } from 'react';
import '../../estilos/datos-personales.css'
import type { NavBar } from '../../components/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';



// Definimos el tipo de datos personales
interface PersonalDataType {
  departamento: string;
  puesto: string;
  categoria: string;
  fechaAlta: string;
  horaIngreso: string;
  horaSalida: string;
  cantidadHoras: string;
  tipoContrato: string; 
  estado: string;
  tipoSemana: string;
}

export const EditarDatosLaborales = () => {
  // Estado para determinar si los campos son editables
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const navegar = useNavigate();

  // Estado para los datos personales, tipado con la interfaz PersonalDataType
  const [personalData, setPersonalData] = useState<PersonalDataType>({
      departamento: "Sistemas",
      puesto: "Desarrollador",
      categoria: "front-end",
      fechaAlta: "01/04/2002",
      horaIngreso: "hh:mm",
      horaSalida: "hh:mm",
      cantidadHoras: "hh:mm",
      tipoContrato: "Permanente",
      estado: "Activo",
      tipoSemana: "Normal",
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para guardar los cambios
  const handleSave = () => {
    setIsEditable(false);
    
    // podrías agregar lógica para guardar los cambios, por ejemplo, en una base de datos
    console.log("Datos guardados:", personalData);
    
    //Vuelve a la lista de empleados
    navegar('/administrador/empleados');
  };

  // Función para cancelar y revertir los cambios
  const handleCancel = () => {
    setIsEditable(true);
    // Volver a los datos iniciales
    setPersonalData({
      departamento: "Sistemas",
      puesto: "Desarrollador",
      categoria: "front-end",
      fechaAlta: "01/04/2002",
      horaIngreso: "hh:mm",
      horaSalida: "hh:mm",
      cantidadHoras: "hh:mm",
      tipoContrato: "Permanente",
      estado: "Activo",
      tipoSemana: "Normal",
    });
  };

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información laboral</h2>
        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Departamento:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="departamento"
                value={personalData.departamento}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Puesto:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="Puesto"
                value={personalData.puesto}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Categoria:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="categoria"
                value={personalData.categoria}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Fecha de alta</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="fechaIngreso"
                value={personalData.fechaAlta}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
          </div>

          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Hora de ingreso:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="horaIngreso"
                value={personalData.horaIngreso}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Hora de salida:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="tel"
                name="horaSalida"
                value={personalData.horaSalida}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Cantidad de horas de trabajo:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="cantidadHoras"
                value={personalData.cantidadHoras}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Tipo de contrato:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="tipoContrato"
                value={personalData.tipoContrato}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Estado:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="estado"
                value={personalData.estado}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Tipo de semana laboral:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="tipoSemana"
                value={personalData.tipoSemana}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
                Guardar
            </button>
          {/*{!isEditable ? (
            <button className="edit-button" onClick={() => setIsEditable(true)}>
              Modificar Información
            </button>
          ) : (
            <>
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          )}*/}
        </div>
      </div>
    </div>
  );
};
