import { useState } from "react";
import "../estilos/nuevosDatos.css"

export function AgregarPuesto() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

    const [nuevoPuesto, setNuevoPuesto] = useState({
        puesto: ""
    });

    const manejarCambioPuesto = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoPuesto((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const cargarPuesto = async () => {

        const nuevosErrores: { [key: string]: boolean } = {};
        // let esValido = true;

        Object.entries(nuevoPuesto).forEach(([key, valor]) => {
            if (!valor.trim()) {
                nuevosErrores[key] = true;
                // esValido = false;
            }
        });
        alert("Datos cargados correctamente")
        setNuevoPuesto({
            puesto: ""
        }
        );
    };

    return (
        <form className="formulario-block">
            <div className="form-group-puesto">
                <label htmlFor={nuevoPuesto.puesto}>Puesto</label>
                <input
                    id="puesto"
                    name="puesto"
                    type="text"
                    placeholder="Nombre del puesto"
                    onChange={manejarCambioPuesto}
                    className={errores[nuevoPuesto.puesto] ? "input-error" : ""} />
                <div className="botones-form">
                    <button onClick={cargarPuesto}>✅ Cargar</button>
                </div>
            </div>
        </form>
    )
}