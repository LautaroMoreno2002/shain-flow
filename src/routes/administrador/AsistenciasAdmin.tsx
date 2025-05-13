import "./styles/asistencias.css";

const mes = new Date().getMonth() + 1;
const anio = new Date().getFullYear();

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

const asistencias = [
  { fecha: "01/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "02/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "03/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "04/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "05/09/2025", horaEntrada: "08:00", horaSalida: "16:00", estado: "Incompleta", horasExtras: "0 h" },
  { fecha: "06/09/2025", horaEntrada: "---", horaSalida: "---", estado: "Otra", horasExtras: "---" },
  { fecha: "07/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "08/09/2025", horaEntrada: "---", horaSalida: "---", estado: "Suspensión", horasExtras: "---" },
  { fecha: "09/09/2025", horaEntrada: "08:00", horaSalida: "17:00", estado: "Completada", horasExtras: "0 h" },
  { fecha: "09/09/2025", horaEntrada: "---", horaSalida: "---", estado: "Licencia médica", horasExtras: "---" },
];

const calcularHorasTrabajadas = (entrada: string, salida: string) => {
  // Validar si son vacíos o son '---'
  if (!entrada || !salida || entrada === "---" || salida === "---") return "---";

  const [h1, m1] = entrada.split(":").map(Number);
  const [h2, m2] = salida.split(":").map(Number);

  // Validar que no sean NaN
  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return "";

  const inicio = h1 * 60 + m1;
  const fin = h2 * 60 + m2;
  const diferencia = fin - inicio;

  if (diferencia <= 0) return "";

  const horas = Math.floor(diferencia / 60);
  const minutos = diferencia % 60;

  return minutos === 0 ? `${horas} h` : `${horas} h ${minutos} min`;
};

const obtenerNombreDia = (dia: number) => {
  const fecha = new Date(anio, mes - 1, dia);
  return new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(fecha);
};

export const AsistenciasAdmin = () => {
  return (
    <div className="layout">
      <div className="cont-asistencias">
        <h2>Registro de asistencias del mes</h2>
        <h3>
          En esta sección podrás consultar tu historial de asistencias correspondiente al mes actual.
          Cada fila representa un día del mes, indicando tu hora de entrada, salida, estado de asistencia y si se registraron horas extras.
          Si algunos días aparecen vacíos, significa que aún no han ocurrido o no se ha registrado asistencia para esa fecha.
        </h3>

        <ul className="leyenda-abreviaciones">
          <li><strong>HE</strong> → Hora de entrada</li>
          <li><strong>HS</strong> → Hora de salida</li>
          <li><strong>HT</strong> → Horas trabajadas</li>
          <li><strong>HEX</strong> → Horas Extras</li>
        </ul>

        <div className="asistencias">
          <table>
            <thead>
              <tr>
                <th className="col-fecha">Fecha</th>
                <th className="col-dia">Día</th>
                <th className="col-he">HE</th>
                <th className="col-hs">HS</th>
                <th className="col-ht">HT</th>
                <th className="col-hex">HEX</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* {Array.from({ length: diasMes }, (_, i) => i + 1).map((dia) => {
                const asistencia = asistencias[dia - 1];  // Si no existe, asigna un objeto vacío

                const horaEntrada = asistencia?.horaEntrada || "";
                const horaSalida = asistencia?.horaSalida || "";
                const horasExtras = asistencia?.horasExtras || "";
                const horasTrabajadas =
                  asistencia?.horaEntrada && asistencia?.horaSalida
                    ? calcularHorasTrabajadas(asistencia.horaEntrada, asistencia.horaSalida)
                    : "";

                return (
                  <tr key={dia}>
                    <td>{`${dia}/${mes}/${anio}`}</td>
                    <td>{obtenerNombreDia(dia)}</td>
                    <td>{horaEntrada}</td>
                    <td>{horaSalida}</td>
                    <td>{horasTrabajadas}</td>
                    <td>{horasExtras}</td>
                    <td className={
                      asistencia?.estado === 'Completada' ? 'completa' :
                      asistencia?.estado === 'Incompleta' ? 'incompleta' :
                      asistencia?.estado === 'Falta' ? 'falta' :
                      asistencia?.estado === 'Licencia médica' ? 'licencia-medica' :
                      asistencia?.estado === 'Vacaciones' ? 'vacaciones' :
                      asistencia?.estado === 'Suspensión' ? 'suspension' :
                      asistencia?.estado === 'No laboral' ? 'no-laboral' :
                      asistencia?.estado === 'Otra' ? 'otra' : ''
                    }>
                      {asistencia?.estado || ''}
                    </td>
                  </tr> 
                );
              })} */}
              {asistencias.map((asistencia, index) => {
  const [dia] = asistencia.fecha.split("/");
  const diaNumero = parseInt(dia);

  const horaEntrada = asistencia.horaEntrada || "";
  const horaSalida = asistencia.horaSalida || "";
  const horasExtras = asistencia.horasExtras || "";
  const horasTrabajadas =
    horaEntrada && horaSalida
      ? calcularHorasTrabajadas(horaEntrada, horaSalida)
      : "";

  return (
    <tr key={index}>
      <td>{asistencia.fecha}</td>
      <td>{obtenerNombreDia(diaNumero)}</td>
      <td>{horaEntrada}</td>
      <td>{horaSalida}</td>
      <td>{horasTrabajadas}</td>
      <td>{horasExtras}</td>
      <td className={
        asistencia.estado === 'Completada' ? 'completa' :
        asistencia.estado === 'Incompleta' ? 'incompleta' :
        asistencia.estado === 'Falta' ? 'falta' :
        asistencia.estado === 'Licencia médica' ? 'licencia-medica' :
        asistencia.estado === 'Vacaciones' ? 'vacaciones' :
        asistencia.estado === 'Suspensión' ? 'suspension' :
        asistencia.estado === 'No laboral' ? 'no-laboral' :
        asistencia.estado === 'Otra' ? 'otra' : ''
      }>
        {asistencia.estado}
      </td>
    </tr>
  );
})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};