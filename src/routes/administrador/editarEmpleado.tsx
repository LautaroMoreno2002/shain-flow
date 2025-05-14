import React, { useState } from 'react';
import './styles/datos-personales.css'
import type { NavBar } from '../../components/NavBar';
import { NavLink, useNavigate } from 'react-router-dom';



// Definimos el tipo de datos personales
interface PersonalDataType {
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string; 
  nacionalidad: string;
  provincia: string;
  localidad: string; 
  estado: string;
}

export const EditarEmpleado = () => {
  // Estado para determinar si los campos son editables
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const navegar = useNavigate();

  // Estado para los datos personales, tipado con la interfaz PersonalDataType
  const [personalData, setPersonalData] = useState<PersonalDataType>({
    nombre: "Lautaro Emmanuel",
      apellido: "Moreno",
      dni: "12345678",
      fechaNacimiento: "01/04/2002",
      email: "lemoreno2002@gmail.com",
      telefono: "1234567890",
      calle: "Calle Falsa",
      numero: "123",
      nacionalidad: "Argentina",
      provincia: "Buenos Aires",
      localidad: "San Miguel",
      estado: "Soltero"
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
      nombre: "Lautaro Emmanuel",
      apellido: "Moreno",
      dni: "12345678",
      fechaNacimiento: "01/04/2002",
      email: "lemoreno2002@gmail.com",
      telefono: "1234567890",
      calle: "Calle Falsa",
      numero: "123",
      nacionalidad: "Argentina",
      provincia: "Buenos Aires",
      localidad: "San Miguel",
      estado: "Soltero"
    });
  };

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información personal</h2>
        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Nombre/s:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="nombre"
                value={personalData.nombre}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Apellido/s</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="apellido"
                value={personalData.apellido}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">DNI:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="number"
                name="dni"
                value={personalData.dni}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Fecha de nacimiento</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="fechaNacimiento"
                value={personalData.fechaNacimiento}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
          </div>

          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Email:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="email"
                name="email"
                value={personalData.email}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Teléfono:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="tel"
                name="telefono"
                value={personalData.telefono}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Calle:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="direccion"
                value={personalData.calle}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Número:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="nacionalidad"
                value={personalData.numero}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">País de nacimiento:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="nacionalidad"
                value={personalData.nacionalidad}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Provincia:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="nacionalidad"
                value={personalData.provincia}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Localidad:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="nacionalidad"
                value={personalData.localidad}
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
