import React, { useState } from "react";
import "../../estilos/calcular-nomina.css";
import { calcularNominaAuto, obtenerNomina } from "../../services/api";

interface NominaData {
  [key: string]: string | number;
}

export const CalcularNomina = () => {
  const [periodo, setPeriodo] = useState("");
  const [resultado, setResultado] = useState<NominaData | null>(null);

  const calcularNomina = async () => {
    try {
      // Intentamos obtener la nómina existente con id 0
      const nominaExistente = await obtenerNomina(1, periodo);

      if (nominaExistente) {
        console.log("Nómina ya existente encontrada");
        setResultado(nominaExistente);
        
      } else {
        console.log("No existe nómina, se procede a calcularla");
        const nuevaNomina = await calcularNominaAuto(1, periodo, "27/05/2025");
        setResultado(nuevaNomina);
      }
    } catch (error) {
      console.error("Error durante el proceso de cálculo/verificación:", error);
    }
  };

  return (
    <div className="calcular-container">
      <h2 className="titulo">CALCULAR NÓMINA</h2>

      <label htmlFor="periodo">Período</label>
      <input
        type="text"
        id="periodo"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
        className="input-periodo"
        placeholder="Ej: Mayo 2025"
      />
      <button onClick={calcularNomina} className="boton-calcular">
        Calcular
      </button>

      {Array.isArray(resultado) && resultado.length > 0 ? (
  <div className="tabla-container-nomina">
    <h3>Resultado de la nómina</h3>
    <table className="tabla-nomina">
      <thead>
        <tr>
          {Object.keys(resultado[0]).map((clave) => (
            <th key={clave}>{clave.replace(/_/g, " ").toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.values(resultado[0]).map((valor, index) => (
            <td key={index}>
              {typeof valor === "string" || typeof valor === "number"
                ? valor
                : JSON.stringify(valor)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
) : (
  <p>No hay resultados para mostrar.</p>
)}




    </div>
  );
};
