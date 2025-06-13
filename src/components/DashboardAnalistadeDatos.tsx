import React, { useState } from "react";

export const DashboardAn: React.FC = () => {
  const dashboards = [
    {
      title: "Resumen analiticos",
      url: "http://localhost:3000/public/dashboard/ea7e4dfd-20e0-4bfb-a877-88dc19526d50",
    },
    {
      title: "Analisis de sueldos",
      url: "http://localhost:3000/public/dashboard/eb040fcc-e78b-48df-8399-ab080b6b7242",
    },
  ];

  const [index, setIndex] = useState(0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{dashboards[index].title}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          ⬅️ Anterior
        </button>
        <button
          onClick={() => setIndex((i) => Math.min(dashboards.length - 1, i + 1))}
          disabled={index === dashboards.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Siguiente ➡️
        </button>
      </div>

      <iframe
        src={dashboards[index].url}
        style={{ width: "100%", height: "80vh", border: "none" }}
        title="Dashboard"
      />
    </div>
  );
};