import React, { useState } from 'react';
import './estilos/Concepto.css'; // Importa los estilos
//import { crearSalario } from '../services/api';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

// Definir los tipos para los campos del formulario
type Salario = {
  puesto: string;
  departamento: string;
  categoria: string;
  valor: string;
  fecha_inicio: Date | null ;
  fecha_fin: Date | null;
};

const opcionesDepartamentos = ['Recursos Humanos', 'Sistemas', 'Contabilidad'];
const opcionesPuestos = ['Arquitecto de Software', 'DevOps', 'QA Analyst', 'Scrum Master', 'Project Manager',
    'Product Owner', 'Analista Funcional', 'Backend Developer', 'Frontend Developer', 'Fullstack Developer',
    'Data Analyst', 'Data Engineer', 'Data Scientist', 'UX/UI Designer', 'CTO'];
const opcionesCategoria = ['Trainee', 'Junior', 'Semi Senior', 'Senior', 'Teach Lead'];

export const AgregarSalario: React.FC = () => {
  // Estado para los valores del formulario y los errores
  const [salario, setSalario] = useState<Salario>({
    puesto: '',
    departamento: '',
    categoria: '',
    valor: '',
    fecha_inicio: null,
    fecha_fin: null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [salarioRegistrados, setSalarioRegistrados] = useState<Salario[]>([]);
  const [fechaInicioSeleccionada, setFechaInicioSeleccionada] = useState<Date | null>(null); 
  const [fechaFinSeleccionada, setFechaFinSeleccionada] = useState<Date | null>(null);
  const { register, setValue } = useForm<Salario>();

  // Manejar el cambio de valores en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSalario({
      ...salario,
      [name]: value,
    });

    // Limpiar el error cuando el campo es modificado
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleFechaInicioChange = (date: Date | null) => {    
    
    const fecha = date;    
    setFechaInicioSeleccionada(fecha);
    if (fecha) {
        salario.fecha_inicio = fecha;
      setValue('fecha_inicio', fecha);
    }
  };

  const handleFechaFinChange = (date: Date | null) => {    
    
    const fecha = date;
    setFechaFinSeleccionada(fecha);
    if (fecha) {
        salario.fecha_fin=fecha;
      setValue('fecha_fin', fecha);
    }
  }
  

  // Validar formulario
  const validate = (): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!salario.puesto) {
      newErrors.puesto = 'El puesto es obligatorio.';
      isValid = false;
    }
    if (!salario.departamento) {
      newErrors.departamento = 'El departamento es obligatorio.';
      isValid = false;
    }

    if (!salario.categoria) {
      newErrors.categoria = 'La categoria es obligatorio.';
      isValid = false;
    }

    
    if (!salario.valor) {
      newErrors.nombre = 'El valor es obligatorio.';
      isValid = false;
    }
    
    if (!salario.fecha_inicio) {
      newErrors.fecha_inicio = 'La fecha de inicio es obligatoria.';
      isValid = false;
    }

    if (!salario.fecha_fin) {
      newErrors.fecha_fin = 'La fecha de fin es obligatoria.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      //const salarioCreado = await crearSalario(salario);
    
          //console.log(salarioCreado);
      setSalarioRegistrados([...salarioRegistrados, salario]);
      setSalario({ puesto: '', departamento: '', categoria: '', valor:'', fecha_inicio: null, fecha_fin: null });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Registrar Salario Base</h2>
        
        <div className="input-group">
          <label>Puesto:</label>
          <select 
            name="puesto" 
            value={salario.puesto} 
            onChange={handleChange} 
            className="input"
            required
          >
            <option value="">Seleccione una opción</option>
            {opcionesPuestos.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </select>
          {errors.puesto && <span className="error">{errors.puesto}</span>}
        </div>

        <div className="input-group">
          <label>Departamento:</label>
          <select 
            name="departamento" 
            value={salario.departamento} 
            onChange={handleChange} 
            className="input"
            required
          >
            <option value="">Seleccione una opción</option>
            {opcionesDepartamentos.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </select>
          {errors.departamento && <span className="error">{errors.departamento}</span>}
        </div>

        <div className="input-group">
          <label>Categoria:</label>
          <select 
            name="categoria" 
            value={salario.categoria} 
            onChange={handleChange} 
            className="input"
            required
          >
            <option value="">Seleccione una opción</option>
            {opcionesCategoria.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </select>
            {errors.departamento && <span className="error">{errors.departamento}</span>}
        </div>

        <div className="input-group">
          <label>Valor:</label>
          <input 
            type="text" 
            name="valor" 
            value={salario.valor} 
            placeholder='Ingrese un valor'
            onChange={handleChange} 
            className="input" 
            required 
          />
          {errors.valor && <span className="error">{errors.valor}</span>}
        </div>

        <div className="input-group-fecha">
          <label>Fecha de inicio</label>
          <div className='fecha'><DatePicker
                  className='date-cont' 
                  selected={fechaInicioSeleccionada}
                  onChange={handleFechaInicioChange}
                  dateFormat="yyyy-MM-dd" 
                  placeholderText="Elige una fecha"
                  />
                  <input type="hidden" {...register('fecha_inicio', { required: 'La fecha de inicio es obligatoria' })} />
                  {errors.fecha_inicio && <span>{errors.fecha_inicio}</span>}
                  </div>
        </div>

        <div className="input-group-fecha">
          <label>Fecha de fin:</label>
          <div className='fecha'>
            <DatePicker 
                  className='date-cont'                 
                  selected={fechaFinSeleccionada}
                  onChange={handleFechaFinChange}
                  dateFormat="yyyy-MM-dd" 
                  placeholderText="Elige una fecha"
                  />
                  <input type="hidden" {...register('fecha_fin', { required: 'La fecha de fin es obligatoria' })} />
                  {errors.fecha_fin && <span>{errors.fecha_fin}</span>}
        </div>
        </div>

        <button type="submit" className="button">Registrar</button>
      </form>

      <h3>Salraios bases Registrados</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Deparpamento</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
          </tr>
        </thead>
        <tbody>
          {salarioRegistrados.map((item, index) => (
            <tr key={index}>
              <td>{item.puesto}</td>
              <td>{item.departamento}</td>
              <td>{item.categoria}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/*import { useState } from "react";
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
        fecha_fin: ""
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
}*/