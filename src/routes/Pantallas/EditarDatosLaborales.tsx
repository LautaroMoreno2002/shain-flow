import React, { useState } from 'react';
import '../../estilos/datos-personales.css'
import { useNavigate } from 'react-router-dom';



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
  turno: string;
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
    turno: "Mañana"
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
    setIsEditable(false);

    // podrías agregar lógica para guardar los cambios, por ejemplo, en una base de datos
    console.log("Datos guardados:", personalData);

    //Vuelve a la lista de empleados
    navegar('/administrador/empleados');
  };

  // // Función para cancelar y revertir los cambios
  // const handleCancel = () => {
  //   setIsEditable(true);
  //   // Volver a los datos iniciales
  //   setPersonalData({
  //     departamento: "Sistemas",
  //     puesto: "Desarrollador",
  //     categoria: "front-end",
  //     fechaAlta: "01/04/2002",
  //     horaIngreso: "hh:mm",
  //     horaSalida: "hh:mm",
  //     cantidadHoras: "hh:mm",
  //     tipoContrato: "Permanente",
  //     estado: "Activo",
  //     tipoSemana: "Normal",
  //   });
  // };

  const opcionesDepartamentos = ['Recursos Humanos', 'Sistemas', 'Contabilidad'];
  const opcionesPuetos = ['Arquitecto de Software', 'DevOps', 'QA Analyst', 'Scrum Master', 'Project Manager',
    'Product Owner', 'Analista Funcional', 'Backend Developer', 'Frontend Developer', 'Fullstack Developer',
    'Data Analyst', 'Data Engineer', 'Data Scientist', 'UX/UI Designer', 'CTO'];
  const opcionesCategoria = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Teach Lead'];
  const opcionesTipoContrato = ['Tiempo indeterminado', 'Tiempo parcial', 'A plazo fijo', 'Por temporada',
    'Eventual', 'Pasantia'];
  const opcionesEstado = ['Activo', 'Suspendido', 'Desafectado', 'Licencia', 'En formacion', 'Jubilado',
    'Vacaciones'];
  const opcionesSemanaLaboral = ['Normal', 'Extendida', 'Completa'];
  const opcionesTurno = ['Mañana', 'Tarde', 'Noche'];

  //let opciones: string[] = opcionesTipoConcepto;

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información laboral</h2>
        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Departamento:</p>
              <select
                id="departamento"
                name="departamento"
                value={personalData.departamento}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesDepartamentos.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="data-item">
              <p className="data-item--label">Puesto:</p>
              <select
                id="puesto"
                name="puesto"
                value={personalData.puesto}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesPuetos.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="data-item">
              <p className="data-item--label">Categoria:</p>
              <select
                id="categoria"
                name="categoria"
                value={personalData.categoria}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesCategoria.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
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
              <select
                id="tipoContrato"
                name="tipoContrato"
                value={personalData.tipoContrato}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesTipoContrato.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="data-item">
              <p className="data-item--label">Estado:</p>
              <select
                id="estado"
                name="estado"
                value={personalData.estado}
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
              <p className="data-item--label">Tipo de semana laboral:</p>
              <select
                id="tipoSemana"
                name="tipoSemana"
                value={personalData.tipoSemana}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesSemanaLaboral.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="data-item">
              <p className="data-item--label">Turno:</p>
              <select
                id="turno"
                name="turno"
                value={personalData.turno}
                onChange={handleChange}
                className={`data-item--value ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesTurno.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>

        </div>
      </div>
    </div>
  );
};
