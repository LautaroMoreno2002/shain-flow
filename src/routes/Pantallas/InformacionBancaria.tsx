import React, { useEffect, useState } from 'react';
import { obtenerEmpleadoPorIdentificacion } from '../../services/api';
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

  // Opciones para los combobox
  const bancos = [
    "BANCO DE GALICIA Y BUENOS AIRES S.A.U.",
    "BANCO DE LA NACION ARGENTINA",
    "BANCO DE LA PROVINCIA DE BUENOS AIRES",
    "INDUSTRIAL AND COMMERCIAL BANK OF CHINA",
    "CITIBANK N.A.",
    "BANCO BBVA ARGENTINA S.A.",
    "BANCO DE LA PROVINCIA DE CORDOBA S.A.",
    "BANCO SUPERVIELLE S.A.",
    "BANCO DE LA CIUDAD DE BUENOS AIRES",
    "BANCO PATAGONIA S.A.",
    "BANCO HIPOTECARIO S.A.",
    "BANCO DE SAN JUAN S.A.",
    "BANCO MUNICIPAL DE ROSARIO",
    "BANCO SANTANDER ARGENTINA S.A.",
    "BANCO DEL CHUBUT S.A.",
    "BANCO DE SANTA CRUZ S.A.",
    "BANCO DE LA PAMPA SOCIEDAD DE ECONOMÍA M",
    "BANCO DE CORRIENTES S.A.",
    "BANCO PROVINCIA DEL NEUQUÉN SOCIEDAD ANÓ",
    "BANK OF CHINA LIMITED SUCURSAL BUENOS AI",
    "BRUBANK S.A.U.",
    "BIBANK S.A.",
    "BANCO GGAL SA",
    "JPMORGAN CHASE BANK, NATIONAL ASSOCIATIO",
    "BANCO CREDICOOP COOPERATIVO LIMITADO",
    "BANCO DE VALORES S.A.",
    "BANCO ROELA S.A.",
    "BANCO MARIVA S.A.",
    "BNP PARIBAS",
    "BANCO PROVINCIA DE TIERRA DEL FUEGO",
    "BANCO DE LA REPUBLICA ORIENTAL DEL URUGU",
    "BANCO SAENZ S.A.",
    "BANCO MERIDIAN S.A.",
    "BANCO MACRO S.A.",
    "BANCO COMAFI SOCIEDAD ANONIMA",
    "BANCO DE INVERSION Y COMERCIO EXTERIOR S",
    "BANCO PIANO S.A.",
    "BANCO JULIO SOCIEDAD ANONIMA",
    "BANCO RIOJA SOCIEDAD ANONIMA UNIPERSONAL",
    "BANCO DEL SOL S.A.",
    "NUEVO BANCO DEL CHACO S. A.",
    "BANCO VOII S.A.",
    "BANCO DE FORMOSA S.A.",
    "BANCO CMF S.A.",
    "BANCO DE SANTIAGO DEL ESTERO S.A.",
    "BANCO INDUSTRIAL S.A.",
    "NUEVO BANCO DE SANTA FE SOCIEDAD ANONIMA",
    "BANCO CETELEM ARGENTINA S.A.",
    "BANCO DE SERVICIOS FINANCIEROS S.A.",
    "BANCO DE SERVICIOS Y TRANSACCIONES S.A.",
    "RCI BANQUE S.A.",
    "BACS BANCO DE CREDITO Y SECURITIZACION S",
    "BANCO MASVENTAS S.A.",
    "WILOBANK S.A.U.",
    "NUEVO BANCO DE ENTRE RÍOS S.A.",
    "BANCO COLUMBIA S.A.",
    "BANCO BICA S.A.",
    "BANCO COINAG S.A.",
    "BANCO DE COMERCIO S.A.",
    "BANCO SUCREDITO REGIONAL S.A.U.",
    "BANCO DINO S.A.",
    "COMPAÑIA FINANCIERA ARGENTINA S.A.",
    "VOLKSWAGEN FINANCIAL SERVICES COMPAÑIA F",
    "FCA COMPAÑIA FINANCIERA S.A.",
    "GPAT COMPAÑIA FINANCIERA S.A.U.",
    "MERCEDES-BENZ COMPAÑÍA FINANCIERA ARGENT",
    "ROMBO COMPAÑÍA FINANCIERA S.A.",
    "JOHN DEERE CREDIT COMPAÑÍA FINANCIERA S.",
    "PSA FINANCE ARGENTINA COMPAÑÍA FINANCIER",
    "TOYOTA COMPAÑÍA FINANCIERA DE ARGENTINA",
    "NARANJA DIGITAL COMPAÑÍA FINANCIERA S.A.",
    "MONTEMAR COMPAÑIA FINANCIERA S.A.",
    "REBA COMPAÑIA FINANCIERA S.A.",
    "CRÉDITO REGIONAL COMPAÑÍA FINANCIERA S.A"
  ];
  const tiposCuenta = ["Caja de ahorro", "Cuenta corriente"];
  const estados = ["Activo", "Inactivo", "Suspendido"];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // try {
    //   await actualizarDatosEmpleado(personalData.id, personalData);
    //   console.log('Datos actualizados correctamente.');
    //   setIsEditable(false);
    // } catch (error) {
    //   console.error('Error al guardar los cambios:', error);
    // }
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
              { label: 'Banco', name: 'banco', type: 'select', options: bancos },
              { label: 'Número de cuenta', name: 'nroCuenta', type: 'input' },
              { label: 'Tipo de cuenta', name: 'tipoCuenta', type: 'select', options: tiposCuenta },
              { label: 'Estado', name: 'estado', type: 'select', options: estados },
            ].map(({ label, name, type, options }) => (
              <div className="data-item" key={name} style={{ marginBottom: '20px' }}>
                <p className="data-item--label">{label}:</p>
                {type === 'select' ? (
                  <select
                    className={`data-item--value ${isEditable ? 'editable' : ''}`}
                    name={name}
                    value={(personalData as any)[name]}
                    onChange={handleChange}
                    disabled={!isEditable}
                    style={{ padding: '8px', fontSize: '1rem', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }}
                  >
                    {options?.map((op: string) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={`data-item--value ${isEditable ? 'editable' : ''}`}
                    type="text"
                    name={name}
                    value={(personalData as any)[name]}
                    onChange={handleChange}
                    readOnly={!isEditable}
                    style={{ padding: '8px', fontSize: '1rem', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }}
                  />
                )}
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
