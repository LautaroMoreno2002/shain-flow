import React, { useEffect, useState } from 'react';
import {
  actualizarDatosEmpleado,
  obtenerEmpleadoPorIdentificacion,
  type ModificarData
} from '../../services/api';
import CircularProgress from '@mui/material/CircularProgress';
import '../../estilos/datos-personales.css'

export interface PersonalDataType {
  id: string,
  nombre: string,
  apellido: string,
  tipo_identificacion: string,
  numero_identificacion: string,
  fecha_nacimiento: string,
  correo_electronico: string,
  telefono: string,
  calle: string,
  numero_calle: string,
  localidad: string,
  nacionalidad: string,
  estado_civil: string
}

export const VerDatos = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [personalData, setPersonalData] = useState<PersonalDataType>({
    id: "",
    nombre: "",
    apellido: "",
    tipo_identificacion: "",
    numero_identificacion: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    calle: "",
    numero_calle: "",
    localidad: "",
    nacionalidad: "",
    estado_civil: ""
  });

  const fetchData = async () => {
    try {
      setCargando(true);
      const data = await obtenerEmpleadoPorIdentificacion("12348795");
      setPersonalData(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setCargando(true);
      const data: ModificarData = {
        telefono: personalData.telefono,
        correo_electronico: personalData.correo_electronico,
        calle: personalData.calle,
        numero_calle: personalData.numero_calle,
        localidad: personalData.localidad,
        partido: "",
        provincia: personalData.nacionalidad
      };
      await actualizarDatosEmpleado(personalData.id, data);
      console.log('Datos actualizados correctamente.');
      setIsEditable(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    fetchData();
  };

  return (
    <div className="container-personal-data" style={{ position: 'relative' }}>
      {cargando && (
        <div className="overlay">
          <CircularProgress />
        </div>
      )}

      <div className="personal-data" style={{ filter: cargando ? 'blur(2px)' : 'none' }}>
        <h2 className="title">Información personal</h2>
        <div className="data-container">
          <div className="data-group">
            {[
              { label: 'Nombre/s', name: 'nombre' },
              { label: 'Apellido/s', name: 'apellido' },
              { label: personalData.tipo_identificacion, name: 'numero_identificacion' },
              { label: 'Fecha de nacimiento', name: 'fecha_nacimiento' },
            ].map(({ label, name }) => (
              <div className="data-item" key={name}>
                <p className="data-item--label">{label}:</p>
                <input
                  className={`data-item--value ${isEditable ? 'editable' : ''}`}
                  type="text"
                  name={name}
                  value={(personalData as any)[name]}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            ))}
          </div>

          <div className="data-group">
            {[
              { label: 'Email', name: 'correo_electronico', type: 'email' },
              { label: 'Teléfono', name: 'telefono', type: 'tel' },
              { label: 'Calle', name: 'calle' },
              { label: 'Número', name: 'numero_calle' },
              { label: 'País de nacimiento', name: 'nacionalidad' },
              { label: 'Provincia', name: 'provincia' },
              { label: 'Localidad', name: 'localidad' },
              { label: 'Estado', name: 'estado_civil' },
            ].map(({ label, name, type = 'text' }) => (
              <div className="data-item" key={name}>
                <p className="data-item--label">{label}:</p>
                <input
                  className={`data-item--value ${isEditable ? 'editable' : ''}`}
                  type={type}
                  name={name}
                  value={(personalData as any)[name] || ""}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            ))}
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
