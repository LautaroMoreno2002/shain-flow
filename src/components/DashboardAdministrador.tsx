
import React from "react";

export const DashboardA: React.FC = () => {
  const dashboardUrl =
    "http://localhost:3000/public/dashboard/4e11c933-41bb-415c-bec5-0f4bfaddbb0e";

  return (
    <div style={{ width: "100%", height: "100vh", padding: "16px" }}>
      <iframe
        src={dashboardUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        allowTransparency={true}
        title="Dashboard Administrador"
      />
    </div>
  );
};