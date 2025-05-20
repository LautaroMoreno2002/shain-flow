import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../estilos/asistencias.css";

const mes = new Date().getMonth() + 1;
const anio = new Date().getFullYear();
const ID_EMPLEADO = 2;

const API_URL = `https://tpp-g2-adp-1.onrender.com/registros/${ID_EMPLEADO}?año=${anio}&mes=${mes}`;

interface RegistroAsistencia {
  id_registro: number;
  id_empleado: number;
  fecha: string; // formato: "YYYY-MM-DD"
  horaEntrada: string; // formato: "HH:mm"
  horaSalida: string;  // formato: "HH:mm"
  estado: string;
  horasExtras: string;
}

const calcularHorasTrabajadas = (entrada: string, salida: string) => {
  if (!entrada || !salida || entrada === "---" || salida === "---") return "---";
  const [h1, m1] = entrada.split(":").map(Number);
  const [h2, m2] = salida.split(":").map(Number);
  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return "";
  const inicio = h1 * 60 + m1;
  const fin = h2 * 60 + m2;
  const diferencia = fin - inicio;
  if (diferencia <= 0) return "";
  const horas = Math.floor(diferencia / 60);
  const minutos = diferencia % 60;
  return minutos === 0 ? `${horas} h` : `${horas} h ${minutos} min`;
};

const obtenerNombreDia = (dia: number | string) => {
  if (typeof dia === 'string') dia = parseInt(dia);
  if (!Number.isInteger(dia) || dia <= 0 || dia > 31) return "---";
  const fecha = new Date(anio, mes - 1, dia);
  if (isNaN(fecha.getTime())) return "---";
  return new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(fecha);
};


export const Asistencias = () => {
  const [asistencias, setAsistencias] = useState<RegistroAsistencia[]>([]);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response);
        
        setAsistencias(response.data);
        console.log(asistencias);
        
      } catch (error) {
        console.error("Error al obtener las asistencias:", error);
      }
    };
    fetchAsistencias();
  }, []);

  return (
    <div className="layout">
      <div className="cont-asistencias">
        <h2>Registro de asistencias del mes</h2>
        <h3>
          En esta sección podrás consultar tu historial de asistencias correspondiente al mes actual.
          Cada fila representa un día del mes, indicando tu hora de entrada, salida, estado de asistencia y si se registraron horas extras.
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
            {asistencias.map((asistencia, index) => {
  const { fecha, horaEntrada, horaSalida, estado, horasExtras } = asistencia;
  const horasTrabajadas = calcularHorasTrabajadas(horaEntrada, horaSalida);

  // Asegúrate de que la fecha está bien formateada
  const partesFecha = fecha?.split("-");
  const dia = partesFecha?.length === 3 ? parseInt(partesFecha[2]) : 0;
  const nombreDia = obtenerNombreDia(dia);
  console.log(dia);
  console.log(nombreDia);
  
  

  return (
    <tr key={index}>
      <td>{fecha}</td>
      <td>{nombreDia}</td>
      <td>{horaEntrada}</td>
      <td>{horaSalida}</td>
      <td>{horasTrabajadas}</td>
      <td>{horasExtras}</td>
      <td className={
        estado === 'Completada' ? 'completa' :
        estado === 'Incompleta' ? 'incompleta' :
        estado === 'Falta' ? 'falta' :
        estado === 'Licencia médica' ? 'licencia-medica' :
        estado === 'Vacaciones' ? 'vacaciones' :
        estado === 'Suspensión' ? 'suspension' :
        estado === 'No laboral' ? 'no-laboral' :
        estado === 'Otra' ? 'otra' : ''
      }>
        {estado}
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
