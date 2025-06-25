import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useUser } from "../../context/UserContext";
import "../../estilos/calcular-nomina.css";
import CalendarioInput from "../../components/Calendario";

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
  const [fechaPago, setFechaPago] = useState<string>("");

  const [nominaCalculada, setNominaCalculada] = useState<Nomina | null>(null);
  const [loadingCalculo, setLoadingCalculo] = useState(false);
  const [errorCalculo, setErrorCalculo] = useState<string | null>(null);

  const [nominasAnteriores, setNominasAnteriores] = useState<Nomina[]>([]);
  const [loadingPeriodos, setLoadingPeriodos] = useState(false);
  const [loadingNominas, setLoadingNominas] = useState(false);

  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [pdfURL, setPdfURL] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPeriodos = async () => {
      setLoadingPeriodos(true);
      try {
        const res = await fetch(
          "https://render-crud-jc22.onrender.com/api/periodos-unicos/"
        );
        if (!res.ok) throw new Error("Error al obtener períodos");
        const data: string[] = await res.json();
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

  useEffect(() => {
    const fetchNominasAnteriores = async () => {
      setLoadingNominas(true);
      try {
        const res = await fetch(
          `https://render-crud-jc22.onrender.com/nominas/empleado/${id_empleado}`
        );
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

    if (id_empleado) {
      fetchNominasAnteriores();
    }
  }, [id_empleado]);

  useEffect(() => {
    if (periodos.length > 0 && !periodoSeleccionado) {
      setPeriodoSeleccionado(periodos[0]);
    }
  }, [periodos, periodoSeleccionado]);

  const handleCalcularNomina = async () => {
    if (
      !periodoSeleccionado ||
      !fechaPago ||
      !id_empleado ||
      !usuario?.id_usuario
    )
      return;

    setLoadingCalculo(true);
    setErrorCalculo(null);
    setNominaCalculada(null);

    try {
      const tipoNormalizado =
        tipoNomina.charAt(0).toUpperCase() + tipoNomina.slice(1);
      const res = await fetch(
        "https://render-crud-jc22.onrender.com/calcular_nomina",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_empleado: parseInt(id_empleado),
            periodo: periodoSeleccionado,
            fecha_calculo: fechaPago,
            tipo: tipoNormalizado,
            id_usuario: parseInt(usuario.id_usuario),
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
    const url = `https://render-crud-jc22.onrender.com/empleados/${id_empleado}/recibos/${id_nomina}/descargar`;
    setPdfURL(url);
    setMostrarPDF(true);
  };

  const handleDescargarNomina = async (id_nomina: number) => {
    try {
      const res = await fetch(
        `https://render-crud-jc22.onrender.com/empleados/${id_empleado}/recibos/${id_nomina}/descargar`
      );
      if (!res.ok) throw new Error("No se pudo descargar el recibo");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `recibo_${id_nomina}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error al descargar el recibo:", error);
    }
  };

  return (
    <div className="calcular-nomina-container">
      <h2 className="calcular-nomina-title">Calcular nómina</h2>

      {errorCalculo && (
        <div className="calcular-nomina-error">{errorCalculo}</div>
      )}

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

      <div className="calcular-nomina-form-group">
        <label htmlFor="fecha-pago">Fecha de pago:</label>
        <CalendarioInput value={fechaPago} onChange={setFechaPago} />
      </div>

      <button
        className="calcular-nomina-btn-calcular"
        disabled={loadingCalculo || !periodoSeleccionado || !fechaPago}
        onClick={handleCalcularNomina}
      >
        {loadingCalculo ? "Calculando..." : "Calcular"}
      </button>

      {nominaCalculada && (
        <div className="calcular-nomina-calculada-container">
          <h3>
            Nómina calculada para {nominaCalculada.periodo} - Pago:{" "}
            {nominaCalculada.fecha_de_pago}
          </h3>
          <p>
            <b>Salario base:</b> ${nominaCalculada.salario_base.toFixed(2)}
          </p>
          <p>
            <b>Presentismo:</b> ${nominaCalculada.bono_presentismo.toFixed(2)}
          </p>
          <p>
            <b>Antigüedad:</b> ${nominaCalculada.bono_antiguedad.toFixed(2)}
          </p>
          <p>
            <b>Horas extra:</b> ${nominaCalculada.horas_extra.toFixed(2)}
          </p>
          <p>
            <b>Descuentos:</b>
          </p>
          <ul className="calcular-nomina-detalle-descuentos-list">
            <li>
              Jubilación: ${nominaCalculada.descuento_jubilacion.toFixed(2)}
            </li>
            <li>
              Obra Social: ${nominaCalculada.descuento_obra_social.toFixed(2)}
            </li>
            <li>ANSSAL: ${nominaCalculada.descuento_anssal.toFixed(2)}</li>
            <li>
              Ley 19032: ${nominaCalculada.descuento_ley_19032.toFixed(2)}
            </li>
            <li>
              Impuesto Ganancias: $
              {nominaCalculada.impuesto_ganancias.toFixed(2)}
            </li>
            <li>Sindical: ${nominaCalculada.descuento_sindical.toFixed(2)}</li>
          </ul>
          <p>
            <b>Sueldo bruto:</b> ${nominaCalculada.sueldo_bruto.toFixed(2)}
          </p>
        </div>
      )}

      <h2 className="calcular-nomina-recibos-titulo">
        Recibos de sueldo anteriores
      </h2>
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
                    <button
                      className="calcular-nomina-recibos-btn-descargar"
                      onClick={() => handleDescargarNomina(n.id_nomina)}
                    >
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {mostrarPDF && pdfURL && (
        <div className="modal-overlay" onClick={() => setMostrarPDF(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="cerrar-modal"
              onClick={() => setMostrarPDF(false)}
            >
              X
            </button>
            <iframe
              src={pdfURL}
              title="Recibo PDF"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalcularNomina;
