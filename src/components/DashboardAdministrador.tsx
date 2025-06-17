
import React from "react";

export const DashboardA: React.FC = () => {
  const dashboardUrl =
    "https://3-137-176-177.sslip.io/public/dashboard/034fa285-4541-46b9-928a-2fa75d33a171";

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