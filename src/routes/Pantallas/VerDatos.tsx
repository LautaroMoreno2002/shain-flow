import React, { useEffect, useState } from "react";
import {
  actualizarDatosEmpleado,
  obtenerEmpleadoPorIdentificacion,
  type ModificarData,
} from "../../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import "../../estilos/datos-personales.css";
import { useUser } from "../../context/UserContext";

export interface PersonalDataType {
  id: string;
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  fecha_nacimiento: string;
  correo_electronico: string;
  telefono: string;
  calle: string;
  numero_calle: string;
  localidad: string;
  nacionalidad: string;
  estado_civil: string;
}

export const VerDatos = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);
  const [mostrarMenuImagen, setMostrarMenuImagen] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const { usuario } = useUser();

  const manejarVerImagen = () => {
    if (imagenPerfil) {
      setMostrarVistaPrevia(true);
      setMostrarMenuImagen(false);
    }
  };

  const manejarCambiarImagen = () => {
    document.getElementById("input-foto")?.click();
    setMostrarMenuImagen(false);
  };
  const [personalData, setPersonalData] = useState<PersonalDataType>({
    id: "",
    nombre: "",
    apellido: "",
    tipo_identificacion: "",
    numero_identificacion: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    calle: "",
    numero_calle: "",
    localidad: "",
    nacionalidad: "",
    estado_civil: "",
  });

  const fetchData = async () => {
    try {
      setCargando(true);
      const data = await obtenerEmpleadoPorIdentificacion(usuario?.numero_identificacion || "1");
      setPersonalData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setCargando(true);
      const data: ModificarData = {
        telefono: personalData.telefono,
        correo_electronico: personalData.correo_electronico,
        calle: personalData.calle,
        numero_calle: personalData.numero_calle,
        localidad: personalData.localidad,
        partido: "",
        provincia: personalData.nacionalidad,
      };
      await actualizarDatosEmpleado(personalData.id, data);
      console.log("Datos actualizados correctamente.");
      setIsEditable(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    fetchData();
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPerfil(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-personal-data" style={{ position: "relative" }}>
      {cargando && (
        <div className="overlay">
          <CircularProgress />
        </div>
      )}

      {/* Imagen circular */}
      <div style={{ position: "absolute", top: "20px", right: "40px", zIndex: 1 }}>
        <div
          className="foto-perfil"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          }}
          onClick={() => setMostrarMenuImagen((prev) => !prev)}
        >
          {imagenPerfil ? (
            <img
              src={imagenPerfil}
              alt="Foto de perfil"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              style={{
                color: "#999",
                textAlign: "center",
                fontSize: "13px",
                padding: "10px",
              }}
            >
              Agregar foto
            </span>
          )}
          <input
            type="file"
            id="input-foto"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImagenChange}
          />
        </div>

        {mostrarMenuImagen && (
          <div
            style={{
              marginTop: "5px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "140px",
              zIndex: 1000,
              position: "absolute",
              right: 0,
            }}
          >
            <button
              style={{
                padding: "10px",
                width: "100%",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={manejarVerImagen}
              disabled={!imagenPerfil}
            >
              Ver imagen
            </button>
            <button
              style={{
                padding: "10px",
                width: "100%",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={manejarCambiarImagen}
            >
              Cambiar imagen
            </button>
          </div>
        )}
      </div>

      <div
        className="personal-data"
        style={{ filter: cargando ? "blur(2px)" : "none" }}
      >
        <h2 className="title">Información personal</h2>
        <div className="data-container">
          <div className="data-group">
            {[
              { label: "Nombre/s", name: "nombre" },
              { label: "Apellido/s", name: "apellido" },
              {
                label: personalData.tipo_identificacion,
                name: "numero_identificacion",
              },
              { label: "Fecha de nacimiento", name: "fecha_nacimiento" },
            ].map(({ label, name }) => (
              <div className="data-item" key={name}>
                <p className="data-item--label">{label}:</p>
                <input
                  className={`data-item--value ${isEditable ? "editable" : ""}`}
                  type="text"
                  name={name}
                  value={(personalData as any)[name]}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            ))}
          </div>

          <div className="data-group">
            {[
              { label: "Email", name: "correo_electronico", type: "email" },
              { label: "Teléfono", name: "telefono", type: "tel" },
              { label: "Calle", name: "calle" },
              { label: "Número", name: "numero_calle" },
              { label: "País de nacimiento", name: "nacionalidad" },
              { label: "Provincia", name: "provincia" },
              { label: "Localidad", name: "localidad" },
              { label: "Estado", name: "estado_civil" },
            ].map(({ label, name, type = "text" }) => (
              <div className="data-item" key={name}>
                <p className="data-item--label">{label}:</p>
                <input
                  className={`data-item--value ${isEditable ? "editable" : ""}`}
                  type={type}
                  name={name}
                  value={(personalData as any)[name] || ""}
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="button-container">
          {!isEditable ? (
            <button className="edit-button" onClick={() => setIsEditable(true)}>
              Modificar Información
            </button>
          ) : (
            <>
              <button className="save-button" onClick={handleSave}>
                Guardar
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
      {mostrarVistaPrevia && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <button
            onClick={() => setMostrarVistaPrevia(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              background: "transparent",
              color: "#fff",
              fontSize: "30px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <img
            src={imagenPerfil || ""}
            alt="Vista previa"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};
