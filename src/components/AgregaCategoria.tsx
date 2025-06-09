import { useState } from "react";
import "../estilos/nuevosDatos.css"

export function AgregarCategoria() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

    const [nuevaCategoria, setNuevaCategoria] = useState({
        categoria: ""
    });

    const manejarCambioCategoria = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const cargarCategoria = async () => {

        const nuevosErrores: { [key: string]: boolean } = {};
        // let esValido = true;

        Object.entries(nuevaCategoria).forEach(([key, valor]) => {
            if (!valor.trim()) {
                nuevosErrores[key] = true;
                // esValido = false;
            }
        });
        alert("Datos cargados correctamente")
        setNuevaCategoria({
            categoria: ""
        }
        );
    };

    return (
        <form className="formulario-block">
            <div className="form-group-categoria">
                <label htmlFor={nuevaCategoria.categoria}>Categoría</label>
                <input
                    id="categoria"
                    name="categoria"
                    type="text"
                    placeholder="Nombre de la categoria"
                    onChange={manejarCambioCategoria}
                    className={errores[nuevaCategoria.categoria] ? "input-error" : ""} />
                <div className="botones-form">
                    <button onClick={cargarCategoria}>✅ Cargar</button>
                </div>
            </div>
        </form>
    )
}