import { useEffect } from 'react';
import './styles/confirmacion.css'

const nombre = "Lautaro Moreno";
const fecha = new Date();
const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const dia = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];

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

export const Confirmacion = () => {
  return (
    <div className="cont-confirmacion">
      <div className="confirmacion">
      <div className="confirmacion__titulo">
        <h1 className="confirmacion__titulo--h1">¡Bienvenido, {nombre}!</h1>
        <p className="confirmacion__titulo--p">
          Hoy es {dia} {fecha.getDate()} de {mes} del {fecha.getFullYear()}
        </p>
      </div>
      <div className="cont">
        <i className="fa-regular fa-clock"></i>
        <div className="cont-confir">
          <p className="bold">Última asistencia:</p>
        <p>
          {fecha.getDate() - 1} de {mes} del {fecha.getFullYear()}, 8:00 - 16:00
        </p>
        </div>
      </div>
      <div className="cont">
        <i className="fa-regular fa-circle-check"></i>
        <div className="cont-estado">
          <p className="bold">Estado de hoy:</p>
        <p className="estado__confirmacion">Completa</p>
        </div>
      </div>
      <div className="cont">
        <i className="fa-solid fa-signal"></i>
        <div className="cont-horas">
          <p className="bold">Horas trabajadas esta semana:</p>
        <p className="horas-trabajadas__confirmacion">32 horas</p>
        </div>
      </div>
    </div>
    </div>
  );
};
