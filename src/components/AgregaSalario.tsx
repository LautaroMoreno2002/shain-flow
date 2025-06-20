import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarioInput from "./Calendario";

export function AgregarSalario() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
    const [mensajeError] = useState<string>("");
    const navegar = useNavigate();

    const [nuevoSalario, setNuevoConcepto] = useState({
        puesto: "",
        departamento: "",
        categoria: "",
        valor: "600000",
        fecha_inicio: "",
        // fecha_fin: ""
    });

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoConcepto((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const cargarSalario = async () => {
        const nuevosErrores: { [key: string]: boolean } = {};
        // let esValido = true;

        Object.entries(nuevoSalario).forEach(([key, valor]) => {
            if (!valor.trim()) {
                nuevosErrores[key] = true;
                // esValido = false;
            }
        });
    };

    const volver = () => {
        // podrías agregar lógica para guardar los cambios, por ejemplo, en una base de datos
        console.log("Datos guardados:", nuevoSalario);

        //Vuelve a la lista de empleados
        navegar('/administrador/empleados-nomina');
    }
    return (
        <div className="formulario-empleado">
            <h3>Formulario de nuevo salario base</h3>
            <form className="formulario-grid">
                {Object.entries(nuevoSalario).map(([campo, valor]) => {
                    const label = campo.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

                    const opcionesDepartamentos = ['Recursos Humanos', 'Sistemas', 'Contabilidad'];
                    const opcionesPuestos = ['Arquitecto de Software', 'DevOps', 'QA Analyst', 'Scrum Master', 'Project Manager',
                        'Product Owner', 'Analista Funcional', 'Backend Developer', 'Frontend Developer', 'Fullstack Developer',
                        'Data Analyst', 'Data Engineer', 'Data Scientist', 'UX/UI Designer', 'CTO'];
                    const opcionesCategoria = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Teach Lead'];

                    let opciones: string[] = [];
                    if (campo === "puesto") opciones = opcionesPuestos;
                    else if (campo === "departamento") opciones = opcionesDepartamentos;
                    else if (campo === "categoria") opciones = opcionesCategoria;

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
                            ) : campo === "fecha_inicio" || campo === "fecha_fin"?(
                                <CalendarioInput />
                            ) : (
                                <input
                                    id={campo}
                                    name={campo}
                                    type="text" //{campo === "valor" ? "number" : campo === "codigo" ? "number" : "text"}
                                    placeholder={valor}
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
                <button onClick={cargarSalario}>✅ Cargar</button>
                <button onClick={() => volver()}>❌ Cancelar</button>
            </div>
        </div>
    )
}