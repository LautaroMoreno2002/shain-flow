import React, { useState } from "react";
import "../../estilos/calcular-nomina.css";
import { calcularNominaAuto } from "../../services/api"; // Asegúrate de que la ruta sea correcta

interface NominaData {
  id_nomina: number;
  id_empleado: number;
  periodo: string;
  fecha_de_pago: string;
  salario_base: number;
  bono_presentismo: number;
  bono_antiguedad: number;
  horas_extra: number;
  descuento_jubilacion: number;
  descuento_obra_social: number;
  descuento_anssal: number;
  descuento_ley_19032: number;
  impuesto_ganancias: number;
  descuento_sindical: number;
  sueldo_bruto: number;
  sueldo_neto: number;
}

export const CalcularNomina = () => {
  const [periodo, setPeriodo] = useState("");
  const [resultado, setResultado] = useState<NominaData | null>(null);

  const calcularNomina = async () => {
    try {
      const data = await calcularNominaAuto(1, periodo, "27/05/2025");
      setResultado(data);
    } catch (error) {
      console.error("Error al calcular la nómina:", error);
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
        placeholder="Ej: MAYO 2025"
      />
      <button onClick={calcularNomina} className="boton-calcular">
        Calcular
      </button>

      {resultado && (
        <div className="tabla-container">
          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(resultado).map(([clave, valor]) => (
                <tr key={clave}>
                  <td>{clave}</td>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};