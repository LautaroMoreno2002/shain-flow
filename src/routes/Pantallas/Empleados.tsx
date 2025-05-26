import { useState, useEffect } from "react";
import EmpleadoItem from "../../components/EmpleadoItem";
import "../../estilos/empleados.css";
import { listarEmpleados, crearEmpleado } from "../../services/api";

export interface Empleado {
  id_empleado: number;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
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
    partido: "",
    provincia: "",
    genero: "",
    pais_nacimiento: "",
    estado_civil: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
  const [mensajeError, setMensajeError] = useState<string>("");

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        const data = await listarEmpleados();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      }
    };
    cargarEmpleados();
  }, []);

  const empleadosFiltrados = empleados.filter((emp) =>
    `${emp.nombre} ${emp.apellido} ${emp.numero_identificacion}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: false }));
  };

const cargarEmpleado = async () => {
  const nuevosErrores: { [key: string]: boolean } = {};
  let esValido = true;

  Object.entries(nuevoEmpleado).forEach(([key, valor]) => {
    if (!valor.trim()) {
      nuevosErrores[key] = true;
      esValido = false;
    }
  });

  if (!esValido) {
    setErrores(nuevosErrores);
    setMensajeError("Por favor, completa todos los campos.");
    return;
  }

  try {
    console.log("Datos enviados:", nuevoEmpleado);
    const empleadoCreado = await crearEmpleado(nuevoEmpleado);
    setEmpleados((prev) => [...prev, {
      id_empleado: empleadoCreado.id_empleado,
      numero_identificacion: empleadoCreado.numero_identificacion,
      nombre: empleadoCreado.nombre,
      apellido: empleadoCreado.apellido,
      correo: empleadoCreado.correo_electronico,
      telefono: empleadoCreado.telefono,
    }]);
    

    setMostrarFormulario(false);
    setNuevoEmpleado({ // reiniciar el formulario
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
      partido: "",
      provincia: "",
      genero: "",
      pais_nacimiento: "",
      estado_civil: "",
    });
    setErrores({});
    setMensajeError("");
  } catch (error: any) {
    console.error("Error al crear empleado:", error);
    setMensajeError("Error al crear el empleado. Verifica los datos ingresados.");
  }
};


  return (
    <div className="admin-container">
      <h2 className="admin-title">👥 Empleados:</h2>

      {!mostrarFormulario && (
        <>
          <div className="busqueda-container">
            <input
              type="text"
              placeholder="Buscar empleado por nombre, apellido o ID..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="icono-busqueda">🔍</span>
          </div>

          <div className="lista-empleados">
            {empleadosFiltrados.map((empleado) => (
              <EmpleadoItem key={empleado.id_empleado} empleado={empleado} />
            ))}
            <button onClick={() => setMostrarFormulario(true)}>
              ➕ Agregar empleado
            </button>
          </div>
        </>
      )}

      {mostrarFormulario && (
        <div className="formulario-empleado">
          <h3>Formulario de nuevo empleado</h3>
          <form className="formulario-grid">
            {Object.entries(nuevoEmpleado).map(([campo, valor]) => {
              const label = campo.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

              const opcionesIdentificacion = ["DNI", "Pasaporte", "Libreta Cívica"];
              const opcionesProvincia = [
                "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
                "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan",
                "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
              ];
              const opcionesPaises = [
                "Argentina", "Uruguay", "Paraguay", "Chile", "Bolivia", "Perú", "Ecuador", "Colombia", "Venezuela",
                "Brasil", "México", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panamá",
                "Cuba", "República Dominicana"
              ];

              let opciones: string[] = [];
              if (campo === "tipo_identificacion") opciones = opcionesIdentificacion;
              else if (campo === "provincia") opciones = opcionesProvincia;
              else if (campo === "pais_nacimiento") opciones = opcionesPaises;

              return (
                <div key={campo} className="form-group">
                  <label htmlFor={campo}>{label}</label>
                  {opciones.length > 0 ? (
                    <select
                      id={campo}
                      name={campo}
                      value={valor}
                      onChange={manejarCambio}
                      className={errores[campo] ? "input-error" : ""}
                    >
                      <option value="">Seleccione una opción</option>
                      {opciones.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={campo}
                      name={campo}
                      type={campo === "fecha_nacimiento" ? "date" : "text"}
                      value={valor}
                      onChange={manejarCambio}
                      className={errores[campo] ? "input-error" : ""}
                    />
                  )}
                </div>
              );
            })}
          </form>
          {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
          <div className="botones-formulario">
            <button onClick={cargarEmpleado}>✅ Cargar empleado</button>
            <button onClick={() => setMostrarFormulario(false)}>❌ Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};
