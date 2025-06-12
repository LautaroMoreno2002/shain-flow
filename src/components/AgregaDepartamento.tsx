import React, { useState } from 'react';
import './estilos/AgregarDatos.css'; // Importa el archivo CSS

const AgregaDepartamento: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = { name: '', description: '' };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'El nombre del departamento es obligatorio';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'La descripción es obligatoria';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Departamento registrado:', formData);
      // Aquí puedes enviar los datos al servidor o realizar otras acciones
    }
  };

  return (
      <form onSubmit={handleSubmit} className="department-form">
        <div>
          <label htmlFor="name">Departamento:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder='Nombre del Departamento'
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <input
            id="description"
            name="description"
            type="text"
            placeholder='Descripción del Departamento'
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && <span>{errors.description}</span>}
        </div>

        <button type="submit">✅ Registrar</button>
      </form>
  );
};

export default AgregaDepartamento;