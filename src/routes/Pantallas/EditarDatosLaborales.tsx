import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../estilos/datos-personales.css';
import CalendarioInput from "../../components/Calendario";
import HoraInput from '../../components/Hora';

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
  const { id_empleado } = useParams<{ id_empleado: string }>();
  const navegar = useNavigate();

  const [personalData, setPersonalData] = useState<PersonalDataType>({
    departamento: "Sistemas",
    puesto: "Desarrollador",
    categoria: "front-end",
    fechaAlta: "2002-04-01",
    horaIngreso: "08:00",
    horaSalida: "16:00",
    cantidadHoras: "08:00",
    tipoContrato: "Permanente",
    estado: "Activo",
    tipoSemana: "Normal",
    turno: "Mañana"
  });

  const handleChange = (e: { target: { name?: string; value: string } }) => {
    const { name, value } = e.target;
    if (!name) return;

    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(`Datos guardados para empleado ${id_empleado}:`, personalData);
    navegar('/administrador/empleados');
  };

  const opcionesDepartamentos = ['Recursos Humanos', 'Sistemas', 'Contabilidad'];
  const opcionesPuetos = ['Arquitecto de Software', 'DevOps', 'QA Analyst', 'Scrum Master', 'Project Manager',
    'Product Owner', 'Analista Funcional', 'Backend Developer', 'Frontend Developer', 'Fullstack Developer',
    'Data Analyst', 'Data Engineer', 'Data Scientist', 'UX/UI Designer', 'CTO'];
  const opcionesCategoria = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Teach Lead'];
  const opcionesTipoContrato = ['Tiempo indeterminado', 'Tiempo parcial', 'A plazo fijo', 'Por temporada',
    'Eventual', 'Pasantia'];
  const opcionesEstado = ['Activo', 'Suspendido', 'Desafectado', 'Licencia', 'En formación', 'Jubilado',
    'Vacaciones'];
  const opcionesSemanaLaboral = ['Normal', 'Extendida', 'Completa'];
  const opcionesTurno = ['Mañana', 'Tarde', 'Noche'];

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información laboral</h2>

        <div className="data-container">
          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Departamento:</p>
              <select
                name="departamento"
                value={personalData.departamento}
                onChange={handleChange}
                className="data-item--value editable"
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
                name="puesto"
                value={personalData.puesto}
                onChange={handleChange}
                className="data-item--value editable"
              >
                <option value="">Seleccione una opción</option>
                {opcionesPuetos.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            <div className="data-item">
              <p className="data-item--label">Categoría:</p>
              <select
                name="categoria"
                value={personalData.categoria}
                onChange={handleChange}
                className="data-item--value editable"
              >
                <option value="">Seleccione una opción</option>
                {opcionesCategoria.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            <div className="data-item">
              <p className="data-item--label">Fecha de alta:</p>
              <CalendarioInput
                value={personalData.fechaAlta}
                onChange={(fecha) =>
                  setPersonalData((prev) => ({ ...prev, fechaAlta: fecha }))
                }
              />
            </div>
          </div>

          <div className="data-group">
            <div className="data-item">
              <p className="data-item--label">Hora de ingreso:</p>
              <HoraInput
                name="horaIngreso"
                value={personalData.horaIngreso}
                onChange={handleChange}
              />
            </div>

            <div className="data-item">
              <p className="data-item--label">Hora de salida:</p>
              <HoraInput
                name="horaSalida"
                value={personalData.horaSalida}
                onChange={handleChange}
              />
            </div>

            <div className="data-item">
              <p className="data-item--label">Cantidad de horas:</p>
              <HoraInput
                name="cantidadHoras"
                value={personalData.cantidadHoras}
                onChange={handleChange}
              />
            </div>

            <div className="data-item">
              <p className="data-item--label">Tipo de contrato:</p>
              <select
                name="tipoContrato"
                value={personalData.tipoContrato}
                onChange={handleChange}
                className="data-item--value editable"
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
                name="estado"
                value={personalData.estado}
                onChange={handleChange}
                className="data-item--value editable"
              >
                <option value="">Seleccione una opción</option>
                {opcionesEstado.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>

            <div className="data-item">
              <p className="data-item--label">Semana laboral:</p>
              <select
                name="tipoSemana"
                value={personalData.tipoSemana}
                onChange={handleChange}
                className="data-item--value editable"
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
                name="turno"
                value={personalData.turno}
                onChange={handleChange}
                className="data-item--value editable"
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