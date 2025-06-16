import React, { useEffect, useState } from "react";
import "./../../estilos/calcular-nomina.css";

interface Nomina {
  periodo: string;
}

export const CalcularNomina: React.FC = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("");
  const [nominas, setNominas] = useState<Nomina[]>([]);

  // Cargar historial de nóminas al montar el componente
  useEffect(() => {
    // TODO: Reemplaza esto con tu petición a la API para traer las nóminas
    const obtenerNominas = async () => {
      // Ejemplo simulado
      const data = [
        { periodo: "Febrero 2024" },
        { periodo: "Diciembre 2023" },
        { periodo: "Octubre 2023" },
        { periodo: "Octubre 2023" },
      ];
      setNominas(data);
    };

    obtenerNominas();
  }, []);

  const handleVerNomina = (periodo: string) => {
    alert(`Ver nómina del período: ${periodo}`);
  };

  const handleCalcularNomina = () => {
    // TODO: Aquí va la lógica para verificar y calcular la nómina del periodo seleccionado
    alert(`Calcular nómina para: ${periodoSeleccionado}`);
  };

  return (
    <section className="nominas">
      <div className="contenedor-nomina">
        <h2 className="titulo">CALCULAR NÓMINA</h2>

        <div className="campo">
          <label htmlFor="periodo">Período</label>
          <select
            id="periodo"
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un período</option>
            {/* Opciones de ejemplo, puedes generarlas dinámicamente */}
            <option value="Junio 2024">Junio 2024</option>
            <option value="Mayo 2024">Mayo 2024</option>
            <option value="Abril 2024">Abril 2024</option>
          </select>
        </div>

        <div className="tabla">
          <div className="fila encabezado">
            <span>PERÍODO</span>
            <span>NÓMINA</span>
          </div>
          {nominas.map((nomina, index) => (
            <div className="fila" key={index}>
              <span>{nomina.periodo}</span>
              <button
                className="boton-ver"
                onClick={() => handleVerNomina(nomina.periodo)}
              >
                Ver
              </button>
            </div>
          ))}
        </div>

        <button className="boton-calcular" onClick={handleCalcularNomina}>
          Calcular
        </button>
      </div>
    </section>
  );
};

/*
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

      if (nominaExistente && nominaExistente.periodo == periodo) {
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
    <>
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
      </div>
      {resultado && typeof resultado === "object" && !Array.isArray(resultado) && (
        <div className="tabla-container-nomina">
          <h3>Resultado de la nómina</h3>
          <table className="tabla-nomina">
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(resultado).map(([clave, valor]) => (
                <tr key={clave}>
                  <td>{clave.replace(/_/g, " ").toUpperCase()}</td>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
*/