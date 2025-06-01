import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AgregarDatos() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
    const [mensajeError] = useState<string>("");
    const navegar = useNavigate();

    const [nuevoDato, setNuevoDato] = useState({
        departamento: "",
        puesto: "",
        categoria: ""
    });

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoDato((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const cargarDatos = async () => {
        
        const nuevosErrores: { [key: string]: boolean } = {};
        let esValido = true;

        Object.entries(nuevoDato).forEach(([key, valor]) => {
            if (!valor.trim()) {
                nuevosErrores[key] = true;
                esValido = false;
            }
        });
        alert("Datos cargados correctamente")
        setNuevoDato({
                departamento: "",
                puesto: "",
                categoria: ""
            }
        );
    };

    const volver = () => {
        // podrías agregar lógica para guardar los cambios, por ejemplo, en una base de datos
        console.log("Datos guardados:", nuevoDato);

        //Vuelve a la lista de empleados
        navegar('/administrador/empleados');
    }
    return (
        <div className="formulario-empleado">
            <h3>Formulario de nuevo salario base</h3>
            <form className="formulario-grid">
                {Object.entries(nuevoDato).map(([campo, valor]) => {
                    const label = campo.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

                    

                    return (
                        <div key={campo} className="form-group">
                            <label htmlFor={campo}>{label}</label>
                            {campo === "departamento" ? (
                                <>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        value="Nombre del departamento"
                                        onChange={manejarCambio}
                                        className={errores[campo] ? "input-error" : ""}
                                    />
                                    <input
                                        id="descripcion"
                                        name="descripcion"
                                        type="text"
                                        value="Descripción del departamento"
                                        onChange={manejarCambio}
                                        className={errores[campo] ? "input-error" : ""}
                                    />
                                </>
                            ) : (
                                <input
                                    id={campo}
                                    name={campo}
                                    type="text" //{campo === "valor" ? "number" : campo === "codigo" ? "number" : "text"}
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
                <button onClick={cargarDatos}>✅ Cargar</button>
                <button onClick={() => volver()}>❌ Cancelar</button>
            </div>
        </div>
    )
}