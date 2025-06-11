import React from "react";

export const Dashboard: React.FC = () => {
  const dashboard1 = "http://localhost:3000/public/dashboard/c9cc4e0e-95ee-402f-9372-9f2760a99b60";
  const dashboard2 = "http://localhost:3000/public/dashboard/312b7439-fbcf-424a-96cd-df2899a6ebe2"; 

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "16px" }}>
      <div style={{ width: "100%", height: "80vh" }}>
        <iframe
          src={dashboard1}
          frameBorder="0"
          width="100%"
          height="100%"
          allowTransparency={true}
          title="Dashboard 1"
        />
      </div>

      <div style={{ width: "100%", height: "80vh" }}>
        <iframe
          src={dashboard2}
          frameBorder="0"
          width="100%"
          height="100%"
          allowTransparency={true}
          title="Dashboard 2"
        />
      </div>
    </div>
  );
};
