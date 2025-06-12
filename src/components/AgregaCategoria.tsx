import React, { useState } from 'react';
import './estilos/AgregarDatos.css'; // Importa el archivo CSS

const AgregaCategoria: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const [errors, setErrors] = useState({
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = { name: ''};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'El nombre de la categoría es obligatorio';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Categoría registrada:', formData);
      // Aquí puedes enviar los datos al servidor o realizar otras acciones
    }
  };

  return (
      <form onSubmit={handleSubmit} className="department-form">
        <div>
          <label htmlFor="name">Categoría:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder='Nombre de la Categoría'
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <button type="submit">✅ Registrar</button>
      </form>
  );
};

export default AgregaCategoria;