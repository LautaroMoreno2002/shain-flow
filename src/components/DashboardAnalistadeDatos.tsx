import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const DashboardAn: React.FC = () => {
  const dashboards = [
    {
      title: "Resumen analiticos",
      url: "https://3-137-176-177.sslip.io/public/dashboard/bfba3005-23d3-4abd-bdb8-a8cc239a225c",
    },
    {
      title: "Analisis de sueldos",
      url: "https://3-137-176-177.sslip.io/public/dashboard/81b40216-45f6-4858-9e8b-c31814ff6a1c",
    },
  ];

  const [index, setIndex] = useState(0);
  const [cargando, setCargando] = useState(true);

  const handleChangeIndex = (newIndex: number) => {
    setIndex(newIndex);
    setCargando(true); // Mostrar el loader al cambiar de dashboard
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", position: "relative", marginLeft: "155px"}}>
      <h2>{dashboards[index].title}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleChangeIndex(Math.max(0, index - 1))}
          disabled={index === 0}
        >
          ⬅️ Anterior
        </button>
        <button
          onClick={() =>
            handleChangeIndex(Math.min(dashboards.length - 1, index + 1))
          }
          disabled={index === dashboards.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Siguiente ➡️
        </button>
      </div>

      {cargando && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)", // Soporte Safari
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "#fff" }} />
        </div>
      )}

      <iframe
        key={dashboards[index].url}
        src={dashboards[index].url}
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
          position: "relative",
          zIndex: 0,
        }}
        title="Dashboard"
        onLoad={() => setCargando(false)}
      />
    </div>
  );
};
