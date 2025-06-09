import { useState } from "react";
import "../estilos/nuevosDatos.css"

export function AgregarDepartamento() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

    const [nuevoDepartamento, setNuevoDepartamento] = useState({
        departamento_nombre: "",
        departamento_descripcion: "",
    });

    const manejarCambioDepartamento = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoDepartamento((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const cargarDepartamento = async () => {

        const nuevosErrores: { [key: string]: boolean } = {};
        // let esValido = true;

        Object.entries(nuevoDepartamento).forEach(([key, valor]) => {
            if (!valor.trim()) {
                nuevosErrores[key] = true;
                // esValido = false;
            }
        });
        alert("Datos cargados correctamente")
        setNuevoDepartamento({
            departamento_nombre: "",
            departamento_descripcion: ""
        }
        );
    };

    return (
            <form className="formulario-block">
                <div  className="form-group-dpto">
                    <label htmlFor={nuevoDepartamento.departamento_nombre}>Departamento</label>
                    <input
                        id="departamento_nombre"
                        name="departamento_nombre"
                        type="text"
                        placeholder="Nombre del departamento"
                        value={nuevoDepartamento.departamento_nombre}
                        onChange={manejarCambioDepartamento}
                        className={errores[nuevoDepartamento.departamento_nombre] ? "input-error" : ""}
                    />
                    <input
                        id="departamento_descripcion"
                        name="departamento_descripcion"
                        type="text"
                        placeholder="Descripción del departamento"
                        onChange={manejarCambioDepartamento}
                        className={errores[nuevoDepartamento.departamento_descripcion] ? "input-error" : ""}
                    />
                    <div className="botones-form">
                        <button onClick={cargarDepartamento}>✅ Cargar</button>
                    </div>
                </div>
            </form>
    )
}