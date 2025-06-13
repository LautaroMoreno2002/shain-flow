import React, { useState } from "react";

export const DashboardS: React.FC = () => {
  const dashboards = [
    {
      title: "Resumen mensual jornadas",
      url: "http://localhost:3000/public/dashboard/c9cc4e0e-95ee-402f-9372-9f2760a99b60",
    },
    {
      title: "Comparativo mensual asistencias",
      url: "http://localhost:3000/public/dashboard/312b7439-fbcf-424a-96cd-df2899a6ebe2",
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