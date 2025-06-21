import React, { useState } from 'react';
import './estilos/Concepto.css'; // Importa los estilos
//import { crearConcepto } from '../services/api';

// Definir los tipos para los campos del formulario
type Concepto = {
  codigo: string;
  nombre: string;
  tipo: string;
  valor: string;
  porcentaje: string;
};

const tiposConcepto = [
  'Remunerativo', 'No remunerativo', 'Deducción', 'Retención', 'Percepción', 'Indemnización', 
  'Reintegro', 'Premio', 'Multa', 'Ajuste', 'Anticipo', 'Vacaciones'
];

const porcentajeOptions = ['si', 'no'];

export const NuevoConcepto: React.FC = () => {
  // Estado para los valores del formulario y los errores
  const [concepto, setConcepto] = useState<Concepto>({
    codigo: '',
    nombre: '',
    tipo: '',
    valor: '',
    porcentaje: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [conceptosRegistrados, setConceptosRegistrados] = useState<Concepto[]>([]);

  // Manejar el cambio de valores en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConcepto({
      ...concepto,
      [name]: value,
    });

    // Limpiar el error cuando el campo es modificado
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Validar formulario
  const validate = (): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!concepto.codigo) {
      newErrors.codigo = 'El código es obligatorio.';
      isValid = false;
    }
    if (!concepto.nombre) {
      newErrors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }

    if (!concepto.valor) {
      newErrors.nombre = 'El valor es obligatorio.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      //const conceptoCreado = await crearConcepto(concepto);
    
          //console.log(conceptoCreado);
      setConceptosRegistrados([...conceptosRegistrados, concepto]);
      setConcepto({ codigo: '', nombre: '', tipo: '', valor:'', porcentaje: '' });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Registrar Concepto</h2>
        
        {/*<div className="input-group">
          <label>Código:</label>
          <input 
            type="text" 
            name="codigo" 
            value={concepto.codigo}
            placeholder='Ingrese un código' 
            onChange={handleChange} 
            className="input"
            required 
          />
          {errors.codigo && <span className="error">{errors.codigo}</span>}
        </div>*/}

        <div className="input-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={concepto.nombre}
            placeholder='Ingrese un nombre' 
            onChange={handleChange} 
            className="input" 
            required 
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>

        <div className="input-group">
          <label>Tipo de Concepto:</label>
          <select 
            name="tipo" 
            value={concepto.tipo} 
            onChange={handleChange} 
            className="input"
            required
          >
            <option value="">Seleccione una opción</option>
            {tiposConcepto.map((tipo, index) => (
              <option key={index} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Valor:</label>
          <input 
            type="text" 
            name="valor" 
            value={concepto.valor} 
            placeholder='Ingrese un valor'
            onChange={handleChange} 
            className="input" 
            required 
          />
          {errors.valor && <span className="error">{errors.valor}</span>}
        </div>

        <div className="input-group">
          <label>¿Es porcentaje?</label>
          <select 
            name="porcentaje" 
            value={concepto.porcentaje} 
            onChange={handleChange} 
            className="input"
            required
          >
            <option value="">Seleccione una opción</option>
            {porcentajeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="button">Registrar</button>
      </form>

      <h3>Conceptos Registrados</h3>
      <table className="table">
        <thead>
          <tr>
            {/*<th>Código</th>*/}
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {conceptosRegistrados.map((item, index) => (
            <tr key={index}>
              {/*<td>{item.codigo}</td>*/}
              <td>{item.nombre}</td>
              <td>{item.tipo}</td>
              <td>{item.valor}</td>
              <td>{item.porcentaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


