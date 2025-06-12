import "../estilos/nuevosDatos.css"
import AgregarDepartamento from "./AgregaDepartamento";
import AgregarPuesto from "./AgregaPuesto";
import AgregarCategoria from "./AgregaCategoria";

export function AgregarDatos() {
    return (
        <div className="formulario-datos">
            <h3>Formulario de agregar datos</h3>
            <AgregarDepartamento />
            <AgregarPuesto />
            <AgregarCategoria />
        </div>
    )
}