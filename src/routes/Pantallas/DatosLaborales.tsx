import { useEffect, useState } from 'react'
import '../../estilos/datosLaborales.css'
import { datosLabPorId, nominasPorId } from '../../services/api';
import { CircularProgress } from '@mui/material';
import { useUser } from '../../context/UserContext';

interface DatosLaborales {
  departamento: string;
  puesto: string;
  turno: string;
  horario_entrada: string;
  horario_salida: string;
  fecha_ingreso: string;
  tipo_contrato: string;
}

// interface Nomina {
//   id_nomina: string;
//   id_empleado: number;
//   periodo: string;
//   fecha_de_pago: string;
//   salario_base: number;
//   bono_presentismo: number;
//   bono_antiguedad: number;
//   horas_extra: number;
//   descuento_jubilacion: number;
//   descuento_obra_social: number;
//   descuento_anssal: number;
//   descuento_ley_19032: number;
//   impuesto_ganancias: number;
//   descuento_sindical: number;
//   sueldo_bruto: number;
//   sueldo_neto: number;
// }

export const DatosLaboralesDescrip = () => {
  const [datos, setDatos] = useState<DatosLaborales | null>(null);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useUser();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setCargando(true);
        const response = await datosLabPorId(JSON.stringify(usuario?.id_empleado) || "1"); // debe retornar el JSON
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
  // const [nominas, setNominas] = useState<any | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        setCargando(true);
        const response = await nominasPorId('1'); 
        console.log(response);
        console.log(response.nominas);
        // setNominas(response);
      } catch (error) {
        console.error("Error al obtener las nóminas:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchNominas();
  }, []);

  return (
    <div className="cont-recibos">
      <div className="cont-recibos__title">
        <h2>Últimos recibos de sueldo</h2>
      </div>
      <div className="cont-recibos__table" style={{ position: 'relative' }}>
        {cargando && (
          <div className="overlay">
            <CircularProgress />
          </div>
        )}
        {/*
        <table style={{ filter: cargando ? 'blur(2px)' : 'none' }}>
          {nominas?.nominas.lenght === 0 ?
            <p>No hay nóminas cargadas</p>
            :
            <>
              <thead>
                <tr>
                  {nominas?.nominas?.[0] &&
                    Object.keys(nominas.nominas[0]).map((clave) => (
                      <th key={clave}>{clave}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {nominas?.nominas?.map((fila: number, index: number) => (
                  <tr key={index}>
                    {Object.values(fila).map((valor, i) => (
                      <td key={i}>{valor}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </>
          }
        </table>
      </div>
    </div>
  );
}; */}
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