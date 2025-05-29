import { useState, useEffect } from "react";
import { EmpleadoNomina } from "../../components/EmpleadoNomina";
import "../../estilos/empleados.css";
import { listarEmpleados, crearEmpleado } from "../../services/api";
import { useNavigate } from "react-router-dom";

export interface Empleado {
  id_empleado: number;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export const EmpleadosNomina = () => {
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

  const [nuevoConcepto, setNuevoConcepto] = useState({
    codigo: "0",
    nombre:"Salario base",
    tipo_concepto:"Remunerativo",
    valor: "600000",
    es_porcentaje: "No"
  })

  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
  const [mensajeError, setMensajeError] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(true);

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
    setNuevoConcepto((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: false }));
  };

  const cargarEmpleado = async () => {
    const nuevosErrores: { [key: string]: boolean } = {};
    let esValido = true;
  
    Object.entries(nuevoConcepto).forEach(([key, valor]) => {
      if (!valor.trim()) {
        nuevosErrores[key] = true;
        esValido = false;
      }
    });
  
    if (!esValido) {
      setErrores(nuevosErrores);
      setMensajeError("Por favor, completa todos los campos antes de continuar.");
      return;
    }
    //Quitar esto cuanod se integre con back-end
    alert("Concepto cargado correctamente");
    setMostrarFormulario(false);
  
    {/*try {
      console.log("Enviando empleado:", nuevoConcepto);
      const empleadoCreado = await crearEmpleado(nuevoConcepto);
  
      setEmpleados((prev) => [
        ...prev,
        {
          id_empleado: empleadoCreado.id_empleado,
          numero_identificacion: empleadoCreado.numero_identificacion,
          nombre: empleadoCreado.nombre,
          apellido: empleadoCreado.apellido,
          correo: empleadoCreado.correo_electronico ?? empleadoCreado.correo,
          telefono: empleadoCreado.telefono,
        },
      ]);
  
      setMostrarFormulario(false);
      setNuevoEmpleado({
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
    } catch (error) {
      console.error("Error al crear empleado:", error);
      setMensajeError("Error al crear el empleado. Intenta nuevamente.");
    }*/}
  };
  

  return (
    <div className="admin-container">
      <h2 className="admin-title">👥 Nomina:</h2>

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
              <EmpleadoNomina key={empleado.id_empleado} empleado={empleado} />
            ))}
            <button onClick={() => setMostrarFormulario(true)}>
              ➕ Agregar Concepto
            </button>
          </div>
        </>
      )}

      {mostrarFormulario && (
        <div className="formulario-empleado">
          <h3>Formulario de nuevo concepto</h3>
          <form className="formulario-grid">
            {Object.entries(nuevoConcepto).map(([campo, valor]) => {
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
                      type= "text" //{campo === "valor" ? "number" : campo === "codigo" ? "number" : "text"}
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
            <button onClick={cargarEmpleado}>✅ Cargar</button>
            <button onClick={() => setMostrarFormulario(false)}>❌ Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

