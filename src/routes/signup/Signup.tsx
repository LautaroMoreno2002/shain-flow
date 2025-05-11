import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "../../components/DefaultLayout";
import { NavLink } from "react-router-dom";
import './signup.css';

interface CredentialFormProps {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
}

export const CredentialForm = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: CredentialFormProps) => {
  return (
    <>
      <label htmlFor="username">Usuario:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />

      <label htmlFor="confirmPassword">Confirmar contraseña:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
    </>
  );
};

export const Signup = () => {
  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [DNITipo, setDNITipo] = useState('DNI');
  const [DNI, setDNI] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [partido, setPartido] = useState('');
  const [provincia, setProvincia] = useState('');

  const isFormValid =
    name && lastname && email && DNITipo && DNI &&
    nacionalidad && direccion && provincia && localidad && partido &&
    username && password && confirmPassword &&
    password === confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorResponse('');
    setSuccessMessage('');

    if (!isFormValid) {
      setErrorResponse('Todos los campos son obligatorios y las contraseñas deben coincidir.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          lastname,
          email,
          DNITipo,
          DNI,
          nacionalidad,
          direccion,
          provincia,
          localidad,
          partido,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registro exitoso');
      } else {
        setErrorResponse(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setErrorResponse('Ocurrió un error en la conexión');
    }
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="logo-container">
          <img src="./logo_producto.png" alt="ShainFlow Logo" className="logo" />
        </div>

        {!!errorResponse && <div className="error-message">{errorResponse}</div>}
        {!!successMessage && <div className="success-message">{successMessage}</div>}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', minWidth: '250px' }}
            >
              <div className="input-columns">
                <div className="column">
                  <label htmlFor="name">Nombres:</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />

                  <label htmlFor="lastname">Apellido:</label>
                  <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className="input-field" />

                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />

                  <label htmlFor="DNI-Tipo">Tipo de Documento:</label>
                  <select id="DNI-Tipo" value={DNITipo} onChange={(e) => setDNITipo(e.target.value)} className="input-field">
                    <option value="">Selecciona un tipo</option>
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Cédula">Cédula</option>
                    <option value="Carnet de extranjería">Carnet de extranjería</option>
                  </select>

                  <label htmlFor="DNI">{(DNITipo === 'Selecciona un tipo') ? DNITipo : 'DNI'}</label>
                  <input type="text" id="DNI" value={DNI} onChange={(e) => setDNI(e.target.value)} className="input-field" />
                </div>

                <div className="column">
                  <label htmlFor="nacionalidad">Nacionalidad:</label>
                  <input type="text" id="nacionalidad" value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)} className="input-field" />

                  <label htmlFor="direccion">Dirección:</label>
                  <input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="input-field" />

                  <label htmlFor="localidad">Localidad:</label>
                  <input type="text" id="localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} className="input-field" />

                  <label htmlFor="partido">Partido:</label>
                  <input type="text" id="partido" value={partido} onChange={(e) => setPartido(e.target.value)} className="input-field" />

                  <label htmlFor="provincia">Provincia:</label>
                  <input type="text" id="provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} className="input-field" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="input-columns">
                <div className="column">
                  <CredentialForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step === 1 ? (
          <button
            type="button"
            className="signup-button"
            onClick={() => setStep(2)}
            disabled={
              !name || !lastname || !email || !DNITipo || !DNI || !nacionalidad || !direccion
            }
          >
            Siguiente
          </button>
        ) : (
          <>
            <div className="button-row">
              <button
                type="button"
                className="signup-button secondary"
                onClick={() => setStep(1)}
              >
                Volver
              </button>
              <button
                type="submit"
                className="signup-button"
                disabled={!isFormValid}
              >
                Registrarse
              </button>
            </div>
          </>
        )}

        <div className="face-login-section">
          <p className="login-text">
            ¿Estás registrado?<br />
            <NavLink to="/login">Ingresar manualmente</NavLink>
          </p>
          <NavLink to="/">
            <img src="/face-id-icon.png" alt="Reconocimiento facial" className="face-icon" />
          </NavLink>
        </div>
      </form>
    </DefaultLayout>
  );
};
