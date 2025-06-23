import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarioInput from "../../components/Calendario";
import HoraInput from "../../components/Hora";
import "../../estilos/EditarEmpelado.css";

interface PersonalDataType {
  departamento: string;
  puesto: string;
  categoria: string;
  fechaAlta: string;
  horaIngreso: string;
  horaSalida: string;
  cantidadHoras: string;
  tipoContrato: string;
  estado: string;
  tipoSemana: string;
  turno: string;
}

function useFetchOptions<T>(url: string) {
  const [options, setOptions] = useState<T[]>([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch(() => setOptions([]));
  }, [url]);
  return options;
}

export const EditarDatosLaborales = () => {
  const { id_empleado } = useParams<{ id_empleado: string }>();
  const idEmpleado = parseInt(id_empleado || "0");
  const navegar = useNavigate();

  const [isEditable, setIsEditable] = useState(false);

  const [personalData, setPersonalData] = useState<PersonalDataType>({
    departamento: "",
    puesto: "",
    categoria: "",
    fechaAlta: "",
    horaIngreso: "",
    horaSalida: "",
    cantidadHoras: "",
    tipoContrato: "",
    estado: "",
    tipoSemana: "",
    turno: "",
  });

  const departamentos = useFetchOptions<{
    id_departamento: number;
    nombre: string;
  }>("https://render-crud-jc22.onrender.com/api/departamentos/");

  const puestos = useFetchOptions<{ id_puesto: number; nombre: string }>(
    "https://render-crud-jc22.onrender.com/api/puestos/"
  );

  const categorias = useFetchOptions<{
    id_categoria: number;
    nombre_categoria: string;
  }>("https://render-crud-jc22.onrender.com/api/categorias/");

  const opcionesTipoContrato = [
    "Tiempo indeterminado",
    "Tiempo parcial",
    "A plazo fijo",
    "Por temporada",
    "Eventual",
    "Pasantia",
  ];

  const opcionesEstado = [
    "Activo",
    "Suspendido",
    "Desafectado",
    "Licencia",
    "En formación",
    "Jubilado",
    "Vacaciones",
  ];

  const opcionesSemanaLaboral = ["Normal", "Extendida", "Completa"];
  const opcionesTurno = ["Mañana", "Tarde", "Noche"];

  useEffect(() => {
    const fetchLaboral = async () => {
      try {
        const res = await fetch(
          `https://render-crud-jc22.onrender.com/empleados/${idEmpleado}/informacion-laboral-completa`
        );
        const data = await res.json();

        setPersonalData({
          departamento: data.departamento,
          puesto: data.puesto,
          categoria: data.categoria,
          fechaAlta: data.fecha_ingreso,
          horaIngreso: data.hora_inicio_turno,
          horaSalida: data.hora_fin_turno,
          cantidadHoras: data.cantidad_horas_trabajo.toString(),
          tipoContrato: data.tipo_contrato,
          estado: data.estado,
          tipoSemana: data.tipo_semana_laboral,
          turno: data.turno,
        });
      } catch (error) {
        console.error("Error al obtener datos laborales", error);
      }
    };

    if (!isNaN(idEmpleado)) {
      fetchLaboral();
    }
  }, [idEmpleado]);

  const handleChange = (e: { target: { name?: string; value: string } }) => {
    const { name, value } = e.target;
    if (!name) return;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const departamentoSeleccionado = departamentos.find(
        (d) => d.nombre === personalData.departamento
      );
      const puestoSeleccionado = puestos.find(
        (p) => p.nombre === personalData.puesto
      );
      const categoriaSeleccionada = categorias.find(
        (c) => c.nombre_categoria === personalData.categoria
      );

      if (
        !departamentoSeleccionado ||
        !puestoSeleccionado ||
        !categoriaSeleccionada
      ) {
        alert("Seleccione valores válidos.");
        return;
      }

      const payload = {
        id_empleado: idEmpleado,
        id_departamento: departamentoSeleccionado.id_departamento,
        id_puesto: puestoSeleccionado.id_puesto,
        id_categoria: categoriaSeleccionada.id_categoria,
        fecha_ingreso: personalData.fechaAlta,
        turno: personalData.turno,
        hora_inicio_turno: personalData.horaIngreso,
        hora_fin_turno: personalData.horaSalida,
        cantidad_horas_trabajo: parseInt(personalData.cantidadHoras),
        tipo_contrato: personalData.tipoContrato,
        estado: personalData.estado,
        tipo_semana_laboral: personalData.tipoSemana,
      };

      const res = await fetch(
        "https://render-crud-jc22.onrender.com/api/informacion-laboral/modificar",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.detail || "No se pudo actualizar"));
        return;
      }

      alert("Información laboral actualizada correctamente");
      setIsEditable(false);
      navegar("/administrador/empleados");
    } catch (error) {
      console.error("Error al guardar cambios", error);
    }
  };

  return (
    <div className="editar-datos-laborales-container">
      <div className="editar-datos-laborales-card">
        <h2 className="editar-datos-laborales-title">Información Laboral</h2>

        <div className="editar-datos-laborales-data-container">
          <div className="editar-datos-laborales-group">
            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Departamento:</p>
              <select
                name="departamento"
                value={personalData.departamento}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {departamentos.map((dep) => (
                  <option key={dep.id_departamento} value={dep.nombre}>
                    {dep.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Puesto:</p>
              <select
                name="puesto"
                value={personalData.puesto}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {puestos.map((pue) => (
                  <option key={pue.id_puesto} value={pue.nombre}>
                    {pue.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Categoría:</p>
              <select
                name="categoria"
                value={personalData.categoria}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.nombre_categoria}>
                    {cat.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Fecha de alta:</p>
              <CalendarioInput
                value={personalData.fechaAlta}
                onChange={(fecha) =>
                  setPersonalData((prev) => ({ ...prev, fechaAlta: fecha }))
                }
                disabled={!isEditable}
              />
            </div>
          </div>

          <div className="editar-datos-laborales-group">
            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Hora de ingreso:</p>
              <HoraInput
                name="horaIngreso"
                value={personalData.horaIngreso}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Hora de salida:</p>
              <HoraInput
                name="horaSalida"
                value={personalData.horaSalida}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Cantidad de horas:</p>
              <input
                type="number"
                name="cantidadHoras"
                min={1}
                max={12}
                value={personalData.cantidadHoras}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              />
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Tipo de contrato:</p>
              <select
                name="tipoContrato"
                value={personalData.tipoContrato}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesTipoContrato.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Estado:</p>
              <select
                name="estado"
                value={personalData.estado}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesEstado.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Semana laboral:</p>
              <select
                name="tipoSemana"
                value={personalData.tipoSemana}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesSemanaLaboral.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="editar-datos-laborales-item">
              <p className="editar-datos-laborales-label">Turno:</p>
              <select
                name="turno"
                value={personalData.turno}
                onChange={handleChange}
                disabled={!isEditable}
                className={`editar-datos-laborales-input ${isEditable ? "editable" : ""}`}
              >
                <option value="">Seleccione una opción</option>
                {opcionesTurno.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="editar-datos-laborales-buttons">
          {!isEditable ? (
            <button
              className="editar-datos-laborales-btn guardar"
              onClick={() => setIsEditable(true)}
            >
              Modificar Información
            </button>
          ) : (
            <>
              <button
                className="editar-datos-laborales-btn guardar"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="editar-datos-laborales-btn cancelar"
                onClick={() => window.location.reload()}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};