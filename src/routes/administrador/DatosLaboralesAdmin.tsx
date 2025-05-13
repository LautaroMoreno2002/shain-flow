import './styles/datosLaborales.css'

interface DataType {
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';//conectar con la API

// GET request
const getData = async (): Promise<DataType[]> => {//pedir los datos
  const response = await fetch(API_URL);
  if (!response.ok) {//control de errores
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();//respuesta en formato json
};

export const DatosLaboralesDescrip = () => {
  return (
    <div className="cont-datos-laborales">  
      <div className="datos">
        <h2 className="titulo">Datos laborales</h2>
        <div className="cont-datos">
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Departamento:</p>
            <p className="cont-datos__item--value">IT</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Puesto:</p>
            <p className="cont-datos__item--value">Desarrollador</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Turno:</p>
            <p className="cont-datos__item--value">Mañana</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Horario de entrada:</p>
            <p className="cont-datos__item--value">08:00</p>
            <p className="cont-datos__item--label">Horario de salida:</p>
            <p className="cont-datos__item--value">16:00</p>
        </div>
        <div className="cont-datos__item">
            <p className="cont-datos__item--label">Fecha de ingreso:</p>
            <p className="cont-datos__item--value">01/01/2022</p>
          </div>
          <div className="cont-datos__item">
            <p className="cont-datos__item--label">Tipo de contrato:</p>
            <p className="cont-datos__item--value">Indefinido</p>
          </div>
      </div>
    </div>
  </div>
  )
}

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

export const DatosLaboralesAdmin = () => {
  return (
    <div className="cont-datos-lab">
    <DatosLaboralesDescrip />
    <UltRecibos />
    </div>
  )
}