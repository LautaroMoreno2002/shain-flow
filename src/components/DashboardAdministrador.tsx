import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const DashboardA: React.FC = () => {
  const [cargando, setCargando] = useState(true);

  const dashboardUrl =
    "https://3-137-176-177.sslip.io/public/dashboard/034fa285-4541-46b9-928a-2fa75d33a171";

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        padding: "16px",
      }}
    >
      {cargando && (
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 16,
            left: 0,
            width: "100%",
            height: "calc(100% - 32px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semi-transparente
            zIndex: 1,
          }}
        >
          <CircularProgress style={{ color: "#fff" }} />{" "}
          {/* Spinner blanco sobre fondo oscuro */}
        </div>
      )}
      <iframe
        src={dashboardUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        allowTransparency={true}
        title="Dashboard Administrador"
        onLoad={() => setCargando(false)}
        style={{ position: "relative", zIndex: 0 }}
      />
    </div>
  );
};
