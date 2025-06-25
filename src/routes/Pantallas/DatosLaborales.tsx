import React, { useEffect, useState } from "react";
import "../../estilos/datosLaborales.css";
import { datosLabPorId } from "../../services/api";
import { CircularProgress } from "@mui/material";
import { useUser } from "../../context/UserContext";
import "../../estilos/recibos.css";
import * as XLSX from "xlsx";
import saveAs from "file-saver";
import Collapse from "@mui/material/Collapse";

interface DatosLaborales {
  departamento: string;
  puesto: string;
  turno: string;
  horario_entrada: string;
  horario_salida: string;
  fecha_ingreso: string;
  tipo_contrato: string;
}

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

export const DatosLaboralesDescrip = () => {
  const [datos, setDatos] = useState<DatosLaborales | null>(null);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useUser();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setCargando(true);
        const response = await datosLabPorId(
          String(usuario?.id_empleado || "1")
        );
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
    <div className="datos-laborales-box" style={{ position: "relative" }}>
      {cargando && (
        <div className="datos-laborales-overlay">
          <CircularProgress />
        </div>
      )}
      <div
        className="datos-laborales-content"
        style={{ filter: cargando ? "blur(2px)" : "none" }}
      >
        <h2 className="datos-laborales-title">Datos laborales</h2>
        <div className="datos-laborales-grid">
          <div className="datos-laborales-item">
            <p className="label">Departamento:</p>
            <p className="value">{datos?.departamento || "—"}</p>
          </div>
          <div className="datos-laborales-item">
            <p className="label">Puesto:</p>
            <p className="value">{datos?.puesto || "—"}</p>
          </div>
          <div className="datos-laborales-item">
            <p className="label">Turno:</p>
            <p className="value">{datos?.turno || "—"}</p>
          </div>
          <div className="datos-laborales-item">
            <p className="label">Horario de entrada:</p>
            <p className="value">
              {datos?.horario_entrada?.slice(0, 5) || "—"}
            </p>
            <p className="label">Horario de salida:</p>
            <p className="value">{datos?.horario_salida?.slice(0, 5) || "—"}</p>
          </div>
          <div className="datos-laborales-item">
            <p className="label">Fecha de ingreso:</p>
            <p className="value">{datos?.fecha_ingreso || "—"}</p>
          </div>
          <div className="datos-laborales-item">
            <p className="label">Tipo de contrato:</p>
            <p className="value">{datos?.tipo_contrato || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UltRecibos = () => {
  const { usuario } = useUser();
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [pdfURL, setPdfURL] = useState<string | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const descargarCSV = (n: Nomina) => {
    const headers = [
      "Nombre",
      "Apellido",
      "Tipo ID",
      "N° ID",
      "Puesto",
      "Categoría",
      "Departamento",
      "Periodo",
      "Tipo",
      "Fecha de pago",
      "Banco",
      "N° cuenta",
      "Salario base",
      "Presentismo",
      "Antigüedad",
      "Horas extra",
      "Jubilación",
      "Obra Social",
      "ANSSAL",
      "Ley 19032",
      "Impuesto Ganancias",
      "Sindical",
      "Sueldo bruto",
      "Sueldo neto",
    ];

    const fila = [
      n.nombre,
      n.apellido,
      n.tipo_identificacion,
      n.numero_identificacion,
      n.puesto,
      n.categoria,
      n.departamento,
      n.periodo,
      n.tipo,
      n.fecha_de_pago,
      n.banco,
      n.numero_cuenta,
      n.salario_base.toFixed(2),
      n.bono_presentismo.toFixed(2),
      n.bono_antiguedad.toFixed(2),
      n.horas_extra.toFixed(2),
      n.descuento_jubilacion.toFixed(2),
      n.descuento_obra_social.toFixed(2),
      n.descuento_anssal.toFixed(2),
      n.descuento_ley_19032.toFixed(2),
      n.impuesto_ganancias.toFixed(2),
      n.descuento_sindical.toFixed(2),
      n.sueldo_bruto.toFixed(2),
      n.sueldo_neto.toFixed(2),
    ];

    let csv =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\r\n" +
      fila.join(",");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `recibo_${n.id_nomina}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const descargarExcel = (n: Nomina) => {
    const fila = {
      Nombre: n.nombre,
      Apellido: n.apellido,
      "Tipo ID": n.tipo_identificacion,
      "N° ID": n.numero_identificacion,
      Puesto: n.puesto,
      Categoría: n.categoria,
      Departamento: n.departamento,
      Periodo: n.periodo,
      Tipo: n.tipo,
      "Fecha de pago": n.fecha_de_pago,
      Banco: n.banco,
      "N° Cuenta": n.numero_cuenta,
      "Salario base": n.salario_base,
      Presentismo: n.bono_presentismo,
      Antigüedad: n.bono_antiguedad,
      "Horas extra": n.horas_extra,
      Jubilación: n.descuento_jubilacion,
      "Obra Social": n.descuento_obra_social,
      ANSSAL: n.descuento_anssal,
      "Ley 19032": n.descuento_ley_19032,
      "Impuesto Ganancias": n.impuesto_ganancias,
      Sindical: n.descuento_sindical,
      "Sueldo bruto": n.sueldo_bruto,
      "Sueldo neto": n.sueldo_neto,
    };

    const ws = XLSX.utils.json_to_sheet([fila]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Recibo");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `recibo_${n.id_nomina}.xlsx`);
  };

  const handleVerNomina = (id_nomina: number) => {
    const url = `https://render-crud-jc22.onrender.com/empleados/${usuario?.id_empleado}/recibos/${id_nomina}/descargar`;
    setPdfURL(url);
    setMostrarPDF(true);
  };

  const cargarNominas = async () => {
    if (!usuario?.id_empleado) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://render-crud-jc22.onrender.com/nominas/empleado/${usuario.id_empleado}`
      );
      const data = await res.json();
      const ordenadas = data.nominas.sort((a: Nomina, b: Nomina) => {
        const parse = (p: string) => {
          const [mes, anio] = p.split(" ");
          const meses: any = {
            ENERO: 0,
            FEBRERO: 1,
            MARZO: 2,
            ABRIL: 3,
            MAYO: 4,
            JUNIO: 5,
            JULIO: 6,
            AGOSTO: 7,
            SEPTIEMBRE: 8,
            OCTUBRE: 9,
            NOVIEMBRE: 10,
            DICIEMBRE: 11,
          };
          return new Date(
            Number(anio),
            meses[mes.toUpperCase()] || 0
          ).getTime();
        };
        return parse(b.periodo) - parse(a.periodo);
      });
      setNominas(ordenadas);
    } catch (err) {
      alert("Error al obtener recibos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNominas();
  }, [usuario]);

  return (
    <>
      <h3 className="nomina-titulo-recibos">Últimos recibos de sueldo</h3>
      {loading && <CircularProgress style={{ margin: "10px 0" }} />}
      <table className="nomina-tabla">
        <thead>
          <tr className="nomina-tabla-header-row">
            <th className="nomina-tabla-header-cell">Periodo</th>
            <th className="nomina-tabla-header-cell">Tipo</th>
            <th className="nomina-tabla-header-cell">Neto</th>
            <th className="nomina-tabla-header-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {nominas.length === 0 ? (
            <tr className="nomina-tabla-empty-row">
              <td className="nomina-tabla-empty-cell" colSpan={4}>
                No hay nóminas disponibles.
              </td>
            </tr>
          ) : (
            nominas.map((n) => (
              <React.Fragment key={n.id_nomina}>
                <tr className="nomina-tabla-row">
                  <td className="nomina-tabla-cell">{n.periodo}</td>
                  <td className="nomina-tabla-cell">{n.tipo}</td>
                  <td className="nomina-tabla-cell">
                    ${n.sueldo_neto.toFixed(2)}
                  </td>
                  <td className="nomina-tabla-cell">
                    <button
                      onClick={() => toggleExpand(n.id_nomina)}
                      className="nomina-btn-vermas"
                    >
                      {expandedId === n.id_nomina
                        ? "Ocultar acciones"
                        : "Acciones de descarga"}
                    </button>
                  </td>
                </tr>
                <tr className="nomina-detalle-row">
                  <td className="nomina-detalle-cell" colSpan={4}>
                    <Collapse
                      in={expandedId === n.id_nomina}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="nomina-detalle-botones">
                        <button
                          onClick={() => handleVerNomina(n.id_nomina)}
                          className="nomina-btn-ver"
                        >
                          Ver PDF
                        </button>
                        <button
                          onClick={() => descargarCSV(n)}
                          className="nomina-btn-descargar"
                        >
                          Descargar CSV
                        </button>
                        <button
                          onClick={() => descargarExcel(n)}
                          className="nomina-btn-descargar"
                        >
                          Descargar Excel
                        </button>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {mostrarPDF && pdfURL && (
        <div className="visor-pdf-overlay">
          <div className="visor-pdf-modal">
            <button
              className="visor-pdf-close-btn"
              onClick={() => setMostrarPDF(false)}
            >
              ✕
            </button>
            <iframe
              src={pdfURL}
              className="visor-pdf-frame"
              title="Recibo PDF"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export const DatosLaborales = () => {
  return (
    <div className="cont-datos-lab">
      <DatosLaboralesDescrip />
      <UltRecibos />
    </div>
  );
};
