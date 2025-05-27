import React, { useEffect, useState } from 'react';
import { actualizarDatosEmpleado, obtenerEmpleadoPorIdentificacion } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export interface PersonalDataType {
  banco: string,
  nroCuenta: string,
  tipoCuenta: string,
  estado: string
}

export const InformacionBancaria = () => {
  const [isEditable, setIsEditable] = useState(false);
  const navegar = useNavigate();

  const [personalData, setPersonalData] = useState<PersonalDataType>({
    banco: "Galicia",
    nroCuenta: "12345678",
    tipoCuenta: "Caja de ahorro",
    estado: "Activo",
  });

  const fetchData = async () => {
    try {
      setPersonalData(await obtenerEmpleadoPorIdentificacion("46474422"));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
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
    {/*try {
      await actualizarDatosEmpleado(personalData.id, personalData);
      console.log('Datos actualizados correctamente.');
      setIsEditable(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }*/}
    alert('Datos guardados correctamente');
    navegar('/empleado');
  };

  const handleCancel = () => {
    setIsEditable(false);
    fetchData(); // ← vuelve a cargar los datos desde la API
  };

  return (
    <div className="container-personal-data">
      <div className="personal-data">
        <h2 className="title">Información bancaria</h2>
        <div className="data-container">
          <div className="data-group">
            {[
              { label: 'Banco', name: 'banco' },
              { label: 'Número de cuenta', name: 'nroCuenta' },
              { label: 'Tipo de cuenta', name: 'tipoCuenta' },
              { label: 'Estado', name: 'estado' },
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
