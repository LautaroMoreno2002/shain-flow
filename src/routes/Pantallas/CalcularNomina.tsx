import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useUser } from "../../context/UserContext";
import "../../estilos/calcular-nomina.css";

interface Nomina {
  id_nomina: number;
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  puesto: string;
  categoria: string;
  departamento: string;
  tipo: string;
  periodo: string;
  fecha_de_pago: string;
  banco: string;
  numero_cuenta: string;
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

const CalcularNomina: React.FC = () => {
  const { id_empleado } = useParams<{ id_empleado: string }>();
  const { usuario } = useUser();

  const [periodos, setPeriodos] = useState<string[]>([]);
  const [tipoNomina, setTipoNomina] = useState("mensual");
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<string>("");
  const [loadingPeriodos, setLoadingPeriodos] = useState(false);

  const [nominaCalculada, setNominaCalculada] = useState<Nomina | null>(null);
  const [loadingCalculo, setLoadingCalculo] = useState(false);
  const [errorCalculo, setErrorCalculo] = useState<string | null>(null);

  const [nominasAnteriores, setNominasAnteriores] = useState<Nomina[]>([]);
  const [loadingNominas, setLoadingNominas] = useState(false);

  // Cargar siempre los períodos
  useEffect(() => {
    const fetchPeriodos = async () => {
      setLoadingPeriodos(true);
      try {
        const res = await fetch("https://render-crud-jc22.onrender.com/api/periodos-unicos/");
        if (!res.ok) throw new Error("Error al obtener períodos");
        const data: string[] = await res.json();
        console.log("✅ Periodos recibidos:", data);
        setPeriodos(data);
      } catch (error) {
        console.error("❌ Error al cargar periodos:", error);
        setPeriodos([]);
      } finally {
        setLoadingPeriodos(false);
      }
    };

    fetchPeriodos();
  }, []);

  // Cargar nóminas anteriores solo si hay usuario
  useEffect(() => {
  if (!usuario?.id_empleado) return;

  const fetchNominasAnteriores = async () => {
    setLoadingNominas(true);
    try {
      const res = await fetch(`https://render-crud-jc22.onrender.com/nominas/empleado/${id_empleado}`);
      if (!res.ok) throw new Error("Error al obtener nóminas");
      const data = await res.json();
      setNominasAnteriores(data.nominas); 
    } catch (error) {
      console.error("❌ Error al cargar nóminas anteriores:", error);
      setNominasAnteriores([]);
    } finally {
      setLoadingNominas(false);
    }
  };

  fetchNominasAnteriores();
}, [usuario?.id_empleado]);

  // Seleccionar automáticamente el primer período
  useEffect(() => {
    if (periodos.length > 0 && !periodoSeleccionado) {
      setPeriodoSeleccionado(periodos[0]);
    }
  }, [periodos, periodoSeleccionado]);

  const handleCalcularNomina = async () => {
    if (!periodoSeleccionado || !id_empleado || !usuario?.id_empleado) return;

    setLoadingCalculo(true);
    setErrorCalculo(null);
    setNominaCalculada(null);

    try {
      const res = await fetch(
        `http://localhost:8000/api/empleados/${id_empleado}/calcular-nomina`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            periodo: periodoSeleccionado,
            tipo: tipoNomina,
            id_usuario: usuario.id_empleado,
          }),
        }
      );
      if (!res.ok) throw new Error("Error al calcular la nómina");
      const data: Nomina = await res.json();
      setNominaCalculada(data);
    } catch (error: any) {
      setErrorCalculo(error.message || "Error inesperado");
    } finally {
      setLoadingCalculo(false);
    }
  };

  const handleVerNomina = (id_nomina: number) => {
    window.open(`/nominas/${id_nomina}/ver`, "_blank");
  };

  return (
    <div className="calcular-nomina-container">
      <h2 className="calcular-nomina-title">Calcular nómina</h2>

      {errorCalculo && <div className="calcular-nomina-error">{errorCalculo}</div>}

      <div className="calcular-nomina-form-group">
        <label htmlFor="periodo-select">Seleccionar período:</label>
        {loadingPeriodos ? (
          <CircularProgress size={24} />
        ) : (
          <select
            id="periodo-select"
            className="calcular-nomina-select"
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
          >
            <option value="">-- Elegir período --</option>
            {periodos.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="calcular-nomina-form-group">
        <label htmlFor="tipo-nomina-select">Tipo de nómina:</label>
        <select
          id="tipo-nomina-select"
          className="calcular-nomina-select"
          value={tipoNomina}
          onChange={(e) => setTipoNomina(e.target.value)}
        >
          <option value="mensual">Mensual</option>
          <option value="primera_quincena">Primera quincena</option>
          <option value="segunda_quincena">Segunda quincena</option>
        </select>
      </div>

      <button
        className="calcular-nomina-btn-calcular"
        disabled={loadingCalculo || !periodoSeleccionado}
        onClick={handleCalcularNomina}
      >
        {loadingCalculo ? "Calculando..." : "Calcular"}
      </button>

      {nominaCalculada && (
        <div className="calcular-nomina-calculada-container">
          <h3>Nómina calculada para {nominaCalculada.periodo}</h3>
          <p><b>Salario base:</b> ${nominaCalculada.salario_base.toFixed(2)}</p>
          <p><b>Presentismo:</b> ${nominaCalculada.bono_presentismo.toFixed(2)}</p>
          <p><b>Antigüedad:</b> ${nominaCalculada.bono_antiguedad.toFixed(2)}</p>
          <p><b>Horas extra:</b> ${nominaCalculada.horas_extra.toFixed(2)}</p>
          <p><b>Descuentos:</b></p>
          <ul className="calcular-nomina-detalle-descuentos-list">
            <li>Jubilación: ${nominaCalculada.descuento_jubilacion.toFixed(2)}</li>
            <li>Obra Social: ${nominaCalculada.descuento_obra_social.toFixed(2)}</li>
            <li>ANSSAL: ${nominaCalculada.descuento_anssal.toFixed(2)}</li>
            <li>Ley 19032: ${nominaCalculada.descuento_ley_19032.toFixed(2)}</li>
            <li>Impuesto Ganancias: ${nominaCalculada.impuesto_ganancias.toFixed(2)}</li>
            <li>Sindical: ${nominaCalculada.descuento_sindical.toFixed(2)}</li>
          </ul>
          <p><b>Sueldo bruto:</b> ${nominaCalculada.sueldo_bruto.toFixed(2)}</p>
        </div>
      )}

      <h2 className="calcular-nomina-recibos-titulo">Recibos de sueldo anteriores</h2>
      <div className="calcular-nomina-recibos-table-container">
        {loadingNominas ? (
          <CircularProgress style={{ display: "block", margin: "20px auto" }} />
        ) : nominasAnteriores.length === 0 ? (
          <div className="calcular-nomina-recibos-table-empty">
            No hay recibos anteriores.
          </div>
        ) : (
          <table className="calcular-nomina-recibos-table">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Tipo</th>
                <th>Neto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {nominasAnteriores.map((n) => (
                <tr key={n.id_nomina}>
                  <td>{n.periodo}</td>
                  <td>{n.tipo}</td>
                  <td>${n.sueldo_neto.toFixed(2)}</td>
                  <td>
                    <button
                      className="calcular-nomina-recibos-btn-ver"
                      onClick={() => handleVerNomina(n.id_nomina)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CalcularNomina;