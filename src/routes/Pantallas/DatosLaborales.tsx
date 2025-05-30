import { useEffect, useState } from 'react'
import '../../estilos/datosLaborales.css'
import { datosLabPorId } from '../../services/api';
import { CircularProgress } from '@mui/material';

interface DatosLaborales {
  departamento: string;
  puesto: string;
  turno: string;
  horario_entrada: string;
  horario_salida: string;
  fecha_ingreso: string;
  tipo_contrato: string;
}

export const DatosLaboralesDescrip = () => {
  const [datos, setDatos] = useState<DatosLaborales | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setCargando(true);
        const response = await datosLabPorId('1'); // debe retornar el JSON
        setDatos(response);
      } catch (error) {
        console.error("Error al obtener los datos laborales:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="cont-datos-laborales" style={{ position: 'relative' }}>
      {cargando && (
        <div className="overlay">
          <CircularProgress />
        </div>
      )}
      <div className="datos" style={{ filter: cargando ? 'blur(2px)' : 'none' }}>
        <h2 className="titulo">Datos laborales</h2>
        <div className="cont-datos">
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Departamento:</p>
            <p className="cont-datos__item--value">{datos?.departamento || "—"}</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Puesto:</p>
            <p className="cont-datos__item--value">{datos?.puesto || "—"}</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Turno:</p>
            <p className="cont-datos__item--value">{datos?.turno || "—"}</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Horario de entrada:</p>
            <p className="cont-datos__item--value">{datos?.horario_entrada?.slice(0, 5) || "—"}</p>
            <p className="cont-datos__item--label">Horario de salida:</p>
            <p className="cont-datos__item--value">{datos?.horario_salida?.slice(0, 5) || "—"}</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Fecha de ingreso:</p>
            <p className="cont-datos__item--value">{datos?.fecha_ingreso || "—"}</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Tipo de contrato:</p>
            <p className="cont-datos__item--value">{datos?.tipo_contrato || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const UltRecibos = () => {
  return (
    <div className="cont-recibos">
      <h2>Últimos recibos de sueldo</h2>
      <table>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Salario base</th>
            <th>Bono presentismo</th>
            <th>Bono antiguedad</th>
            <th>Monto hora extra</th>
            <th>Descuento</th>
            <th>Sueldo bruto</th>
            <th>Sueldo neto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Periodo">01/2023</td>
            <td data-label="Salario base">$3000</td>
            <td data-label="Bono presentismo">$1000</td>
            <td data-label="Bono antiguedad">$500</td>
            <td data-label="Monto hora extra">$1500</td>
            <td data-label="Descuento">$200</td>
            <td data-label="Sueldo bruto">$5000</td>
            <td data-label="Sueldo neto">$4000</td>
          </tr>
          <tr>
            <td data-label="Periodo">02/2023</td>
            <td data-label="Salario base">$3000</td>
            <td data-label="Bono presentismo">$1000</td>
            <td data-label="Bono antiguedad">$500</td>
            <td data-label="Monto hora extra">$1500</td>
            <td data-label="Descuento">$200</td>
            <td data-label="Sueldo bruto">$5000</td>
            <td data-label="Sueldo neto">$4000</td>
          </tr>
          <tr>
            <td data-label="Periodo">03/2023</td>
            <td data-label="Salario base">$3000</td>
            <td data-label="Bono presentismo">$1000</td>
            <td data-label="Bono antiguedad">$500</td>
            <td data-label="Monto hora extra">$1500</td>
            <td data-label="Descuento">$200</td>
            <td data-label="Sueldo bruto">$5000</td>
            <td data-label="Sueldo neto">$4000</td>
          </tr>
          <tr>
            <td data-label="Periodo">04/2023</td>
            <td data-label="Salario base">$3000</td>
            <td data-label="Bono presentismo">$1000</td>
            <td data-label="Bono antiguedad">$500</td>
            <td data-label="Monto hora extra">$1500</td>
            <td data-label="Descuento">$200</td>
            <td data-label="Sueldo bruto">$5000</td>
            <td data-label="Sueldo neto">$4000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const DatosLaborales = () => {
  return (
    <div className="cont-datos-lab">
      <DatosLaboralesDescrip />
      <UltRecibos />
    </div>
  )
}