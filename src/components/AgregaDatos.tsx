import { useState } from "react";
import "../estilos/nuevosDatos.css"

export function AgregarDatos() {
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

    const [nuevoDepartamento, setNuevoDepartamento] = useState({
        departamento_nombre: "",
        departamento_descripcion: "",
    });

    const [nuevoPuesto, setNuevoPuesto] = useState({
        puesto: ""
    });

    const [nuevaCategoria, setNuevaCategoria] = useState({
        categoria: ""
    });

    const manejarCambioDepartamento = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoDepartamento((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const manejarCambioPuesto = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevoPuesto((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: false }));
    };

    const manejarCambioCategoria = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
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
        <div className="formulario-datos">
            <h3>Formulario de agregar datos</h3>
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
                <div className="form-group-puesto">
                    <label htmlFor={nuevoPuesto.puesto}>Puesto</label>
                    <input
                        id="puesto"
                        name="puesto"
                        type="text"
                        placeholder="Nombre del puesto"
                        onChange={manejarCambioPuesto}
                        className={errores[nuevoPuesto.puesto] ? "input-error" : ""}
                    />
                    <div className="botones-form">
                        <button onClick={cargarPuesto}>✅ Cargar</button>
                    </div>
                </div>
                <div className="form-group-categoria">
                    <label htmlFor={nuevaCategoria.categoria}>Categoría</label>
                    <input
                        id="categoria"
                        name="categoria"
                        type="text"
                        placeholder="Nombre de la categoria"
                        onChange={manejarCambioCategoria}
                        className={errores[nuevaCategoria.categoria] ? "input-error" : ""}
                    />
                    <div className="botones-form">
                        <button onClick={cargarCategoria}>✅ Cargar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}