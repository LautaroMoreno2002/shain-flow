import React, { useState } from 'react';
import '../../estilos/datos-personales.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { actualizarDatosEmpleado } from '../../services/api';
import { useEffect } from 'react';
import { obtenerEmpleadoPorIdentificacion } from '../../services/api';

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
  const location = useLocation()
  const empleado = location.state;

  const empleadoId = empleado.id_empleado;
  console.log(empleadoId);

  // Estado para determinar si los campos son editables
  const [isEditable, setIsEditable] = useState<boolean>();
  const navegar = useNavigate();

  // Estado para los datos personales, tipado con la interfaz PersonalDataType
  const [personalData, setPersonalData] = useState<PersonalDataType>({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    calle: "",
    numero: "",
    nacionalidad: "",
    provincia: "",
    localidad: "",
    estado: ""
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
  const handleSave = async () => {
    setIsEditable(true);
    if (!empleadoId) {
      console.error("ID del empleado no encontrado en la URL.");
      return;
    }

    try {
      const nuevosDatos = {
        telefono: personalData.telefono,
        correo_electronico: personalData.email,
        calle: personalData.calle,
        numero_calle: personalData.numero,
        localidad: personalData.localidad,
        partido: "",
        provincia: personalData.provincia
      };


      await actualizarDatosEmpleado(JSON.stringify(empleadoId), nuevosDatos);
      console.log("Datos actualizados exitosamente.");
      setIsEditable(false);
      navegar('/administrador/empleados');
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  // Función para cancelar y revertir los cambios
  const handleCancel = async () => {
    setIsEditable(true);
    const datos = await obtenerEmpleadoPorIdentificacion(empleado.numero_identificacion);
    // Volver a los datos iniciales
    setPersonalData({
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.numero_identificacion,
      fechaNacimiento: datos.fecha_nacimiento,
      email: datos.correo_electronico,
      telefono: datos.telefono,
      calle: datos.calle,
      numero: datos.numero_calle,
      nacionalidad: datos.pais_nacimiento,
      provincia: datos.provincia,
      localidad: datos.localidad,
      estado: datos.estado_civil
    });
    setIsEditable(false);
  };

  useEffect(() => {
  if (!empleado?.numero_identificacion) return;

  const cargarDatosEmpleado = async () => {
    try {
      const datos = await obtenerEmpleadoPorIdentificacion(empleado.numero_identificacion);
      setPersonalData({
        nombre: datos.nombre,
          apellido: datos.apellido,
          dni: datos.numero_identificacion,
          fechaNacimiento: datos.fecha_nacimiento,
          email: datos.correo_electronico,
          telefono: datos.telefono,
          calle: datos.calle,
          numero: datos.numero_calle,
          nacionalidad: datos.pais_nacimiento,
          provincia: datos.provincia,
          localidad: datos.localidad,
          estado: datos.estado_civil
        });
      } catch (error) {
        console.error("Error al obtener los datos del empleado:", error);
      }
    };

    cargarDatosEmpleado();
  }, [empleado?.numero_identificacion]);

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información personal</h2>
        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Nombre/s:</p>
              <input
                className="data-item--value"
                type="text"
                name="nombre"
                value={personalData.nombre}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Apellido/s</p>
              <input
                className="data-item--value"
                type="text"
                name="apellido"
                value={personalData.apellido}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">DNI:</p>
              <input
                className="data-item--value"
                type="number"
                name="dni"
                value={personalData.dni}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Fecha de nacimiento</p>
              <input
                className="data-item--value"
                type="text"
                name="fechaNacimiento"
                value={personalData.fechaNacimiento}
                onChange={handleChange}
                readOnly={true}
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
                name="calle"
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
                name="numero"
                value={personalData.numero}
                onChange={handleChange}
                readOnly={!isEditable}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">País de nacimiento:</p>
              <input
                className={`data-item--value`}
                type="text"
                name="nacionalidad"
                value={personalData.nacionalidad}
                onChange={handleChange}
                readOnly={true}
              />
            </div>
            <div className="data-item">
              <p className="data-item--label">Provincia:</p>
              <input
                className={`data-item--value ${isEditable ? "editable" : ""}`}
                type="text"
                name="provincia"
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
                name="localidad"
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
          {!isEditable ? (
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
          )}
        </div>
      </div>
    </div>
  );
};