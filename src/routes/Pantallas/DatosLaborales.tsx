import React, { useEffect, useState } from "react";
import "../../estilos/datosLaborales.css";
import { datosLabPorId } from "../../services/api";
import { CircularProgress, Button } from "@mui/material";
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
  periodo: string;
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
  tipo: string;
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

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const descargarCSV = (nomina: Nomina) => {
    const headers = [
      "Periodo",
      "Tipo",
      "Salario base",
      "Presentismo",
      "Antigüedad",
      "Horas extra",
      "Descuento Jubilación",
      "Descuento Obra Social",
      "Descuento ANSSAL",
      "Descuento Ley 19032",
      "Impuesto Ganancias",
      "Descuento Sindical",
      "Bruto",
      "Neto",
    ];
    const rows = [
      [
        nomina.periodo,
        nomina.tipo,
        nomina.salario_base.toFixed(2),
        nomina.bono_presentismo.toFixed(2),
        nomina.bono_antiguedad.toFixed(2),
        nomina.horas_extra.toFixed(2),
        nomina.descuento_jubilacion.toFixed(2),
        nomina.descuento_obra_social.toFixed(2),
        nomina.descuento_anssal.toFixed(2),
        nomina.descuento_ley_19032.toFixed(2),
        nomina.impuesto_ganancias.toFixed(2),
        nomina.descuento_sindical.toFixed(2),
        nomina.sueldo_bruto.toFixed(2),
        nomina.sueldo_neto.toFixed(2),
      ],
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\r\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nomina_${nomina.id_nomina}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const descargarExcel = (nomina: Nomina) => {
    const fila = {
      Periodo: nomina.periodo,
      Tipo: nomina.tipo,
      "Salario base": nomina.salario_base,
      Presentismo: nomina.bono_presentismo,
      Antigüedad: nomina.bono_antiguedad,
      "Horas extra": nomina.horas_extra,
      "Descuento Jubilación": nomina.descuento_jubilacion,
      "Descuento Obra Social": nomina.descuento_obra_social,
      "Descuento ANSSAL": nomina.descuento_anssal,
      "Descuento Ley 19032": nomina.descuento_ley_19032,
      "Impuesto Ganancias": nomina.impuesto_ganancias,
      "Descuento Sindical": nomina.descuento_sindical,
      Bruto: nomina.sueldo_bruto,
      Neto: nomina.sueldo_neto,
    };

    const ws = XLSX.utils.json_to_sheet([fila]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nomina");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, `nomina_${nomina.id_nomina}.xlsx`);
  };

  const cargarNominas = async () => {
    if (!usuario?.id_empleado) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://render-crud-jc22.onrender.com/nominas/empleado/${usuario.id_empleado}`
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Error al obtener nóminas");
      }
      const data = await res.json();

      const nominasData: Nomina[] = data.nominas || [];
      const nominasOrdenadas = nominasData.sort((a, b) => {
        const parsePeriodo = (periodo: string) => {
          const [mesTexto, anio] = periodo.split(" ");
          const meses: { [key: string]: number } = {
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
          return new Date(Number(anio), meses[mesTexto.toUpperCase()] || 0, 1).getTime();
        };
        return parsePeriodo(b.periodo) - parsePeriodo(a.periodo);
      });
      setNominas(nominasOrdenadas);
    } catch (error) {
      alert("No se pudieron cargar las nóminas.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarNominas();
  }, [usuario]);

  return (
    <>
      <h3 className="nomina-titulo-recibos" style={{ textAlign: "center" }}>
        Últimos recibos de sueldo
      </h3>

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
              <td className="nomina-tabla-empty-cell" colSpan={4} style={{ textAlign: "center" }}>
                No hay nóminas disponibles.
              </td>
            </tr>
          ) : (
            nominas.map((n) => (
              <React.Fragment key={n.id_nomina}>
                <tr className="nomina-tabla-row">
                  <td className="nomina-tabla-cell">{n.periodo}</td>
                  <td className="nomina-tabla-cell">{n.tipo}</td>
                  <td className="nomina-tabla-cell">${n.sueldo_neto.toFixed(2)}</td>
                  <td className="nomina-tabla-cell">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => toggleExpand(n.id_nomina)}
                      className="nomina-btn-vermas"
                    >
                      {expandedId === n.id_nomina ? "Ocultar" : "Ver más"}
                    </Button>
                  </td>
                </tr>
                <tr className="nomina-detalle-row">
                  <td
                    className="nomina-detalle-cell"
                    colSpan={4}
                    style={{ padding: 0, border: "none" }}
                  >
                    <Collapse in={expandedId === n.id_nomina} timeout="auto" unmountOnExit>
                      <div className="nomina-detalle-contenido">
                        <p>
                          <b>Salario base:</b> ${n.salario_base.toFixed(2)}
                        </p>
                        <p>
                          <b>Presentismo:</b> ${n.bono_presentismo.toFixed(2)}
                        </p>
                        <p>
                          <b>Antigüedad:</b> ${n.bono_antiguedad.toFixed(2)}
                        </p>
                        <p>
                          <b>Horas extra:</b> ${n.horas_extra.toFixed(2)}
                        </p>
                        <p>
                          <b>Descuentos:</b>
                        </p>
                        <ul className="nomina-detalle-descuentos-list">
                          <li>Jubilación: ${n.descuento_jubilacion.toFixed(2)}</li>
                          <li>Obra Social: ${n.descuento_obra_social.toFixed(2)}</li>
                          <li>ANSSAL: ${n.descuento_anssal.toFixed(2)}</li>
                          <li>Ley 19032: ${n.descuento_ley_19032.toFixed(2)}</li>
                          <li>Impuesto Ganancias: ${n.impuesto_ganancias.toFixed(2)}</li>
                          <li>Sindical: ${n.descuento_sindical.toFixed(2)}</li>
                        </ul>
                        <p>
                          <b>Sueldo bruto:</b> ${n.sueldo_bruto.toFixed(2)}
                        </p>
                        <div className="nomina-detalle-botones">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => descargarCSV(n)}
                            className="nomina-btn-descargar"
                          >
                            Descargar CSV
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => descargarExcel(n)}
                            className="nomina-btn-descargar"
                          >
                            Descargar Excel
                          </Button>
                        </div>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
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
