import { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import './signup.css'
import { NavLink } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [DNITipo, setDNITipo] = useState('');
  const [DNI, setDNI] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  

  // const auth = useAuth();
  // const goTo = useNavigate();

  const isFormValid =
    name &&
    lastname &&
    email &&
    DNITipo &&
    DNI &&
    nacionalidad &&
    direccion &&
    username &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, name);
    setErrorResponse('');
    setSuccessMessage('');

    if (!isFormValid) {
      setErrorResponse('Todos los campos son obligatorios y las contraseñas deben coincidir.');
      return;
    }

    try {
      // Aquí iría la petición al backend. Puedes adaptar la URL y el body según tu API.
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          DNITipo,
          DNI,
          nacionalidad,
          direccion,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registro exitoso');
        // Opcional: Redirigir al login o limpiar campos
        // navigate('/login');
      } else {
        setErrorResponse(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setErrorResponse('Ocurrió un error en la conexión');
    }
  };

  //   try {
  //     const response = await fetch("http://localhost:3000/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, password, name }),
  //     });
  //     if (response.ok) {
  //       const json = (await response.json()) as AuthResponse;
  //       console.log(json);
  //       setUsername("");
  //       setPassword("");
  //       setName("");
  //       goTo("/");
  //     } else {
  //       const json = (await response.json()) as AuthResponseError;

  //       setErrorResponse(json.body.error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if (auth.isAuthenticated) {
  //   return <Navigate to="/inicio" />;
  // }
  // }
  return (
    <DefaultLayout>
    <form onSubmit={handleSubmit} className="signup-form">
  <div className="logo-container">
    <img src="./logo_producto.png" alt="ShainFlow Logo" className="logo" />
  </div>

  {!!errorResponse && <div className="error-message">{errorResponse}</div>}
  {!!successMessage && <div className="success-message">{successMessage}</div>}

  <div className="input-columns">
    {/* Columna izquierda */}
    <div className="column">
      <label htmlFor="name">Nombres:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />

      <label htmlFor="lastname">Apellido:</label>
      <input
        type="text"
        id="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="input-field"
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <label htmlFor="DNI">Tipo de DNI:</label>
      <input
        type="text"
        id="DNI-Tipo"
        value={DNITipo}
        onChange={(e) => setDNITipo(e.target.value)}
        className="input-field"
      />
      <label htmlFor="DNI">DNI:</label>
      <input
        type="text"
        id="DNI"
        value={DNITipo}
        onChange={(e) => setDNI(e.target.value)}
        className="input-field"
      />
    </div>

    {/* Columna derecha */}
    <div className="column">
      <label htmlFor="nacionalidad">Nacionalidad:</label>
      <input
        type="text"
        id="nacionalidad"
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
        className="input-field"
      />
      <label htmlFor="direccion">Dirección:</label>
      <input
        type="text"
        id="direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="input-field"
      />
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
      
    </div>
  </div>

  <button type="submit" className="signup-button" disabled={!isFormValid}>
    Registrarse
  </button>

  <div className="face-login-section">
    <p className="login-text">
      ¿Estás registrado?<br />
      <NavLink to="/login">Ingresar manualmente</NavLink>
    </p>
    <NavLink to="/">
    <img
      src="/face-id-icon.png"
      alt="Reconocimiento facial"
      className="face-icon"
    />
    </NavLink>
  </div>
</form>
    </DefaultLayout>
  );
}