import React, { useState } from "react";

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