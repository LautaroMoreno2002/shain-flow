import './estilos/verificacion.css';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Verificacion = () => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const location = useLocation();
  const { id_empleado, codigoVerificacion } = location.state || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const chars = value.split('');

    for (let i = 0; i < chars.length && index + i < 4; i++) {
      const currentInput = inputsRef.current[index + i];
      if (currentInput) {
        currentInput.value = chars[i];
      }
    }

    const nextIndex = index + chars.length;
    if (nextIndex < inputsRef.current.length) {
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = inputsRef.current.map((input) => input?.value || '').join('');
    console.log('Código ingresado:', code);
    console.log('Empleado:', id_empleado);
    console.log('Código esperado:', codigoVerificacion);
  };

  return (
    <div className="verificacion-container">
      <img src="/logo_producto.png" alt="Logo" className="logo" />

      <h1 className="h1">Ingresa el código de verificación</h1>
      <p className="p">Te enviamos un código de 4 dígitos a tu correo. Por favor, ingrésalo aquí abajo.</p>

      <div className="codigo-inputs">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={4}
            className="input-box"
            pattern="[0-9]*"
            ref={(el) => { inputsRef.current[index] = el; }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button className="boton-enviar" onClick={handleSubmit}>
        Verificar
      </button>
    </div>
  );
};

export default Verificacion;
