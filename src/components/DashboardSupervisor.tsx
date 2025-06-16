import React, { useState } from "react";

export const DashboardS: React.FC = () => {
  const dashboards = [
    {
      title: "Resumen mensual jornadas",
      url: "https://3-137-176-177.sslip.io/public/dashboard/6d0497a8-4e46-43e2-9dbd-6cb75f8ecf79",
    },
    {
      title: "Comparativo mensual asistencias",
      url: "https://3-137-176-177.sslip.io/public/dashboard/7fd2a19d-0f0c-4fc7-be40-195ec14b9726",
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