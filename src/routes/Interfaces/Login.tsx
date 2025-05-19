import { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import '../../estilos/login.css'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorResponse, setErrorResponse] = useState("");

  // const auth = useAuth();
  const navegar = useNavigate();
  const users = [
    {
      username: 'Lautaro Moreno',
      password: '1234',
      rol: 'empleado'
    },{
      username: 'Pablo Da Silva',
      password: '1234',
      rol: 'administrador'
    },{
      username: 'Abel Aquino',
      password: '1234',
      rol: 'analista-datos'
    }
  ]

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    for (let user of users) {
      if (username == user.username && password == user.password)
        navegar(`/${user.rol}`);
    }
    // auth.setIsAuthenticated(true);
    // try {
    //   const response = await fetch("http://localhost:3000/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, password }),
    //   });
    //   if (response.ok) {
    //     const json = (await response.json()) as AuthResponse;
    //     console.log(json);

    //     if (json.body.accessToken && json.body.refreshToken) {
    //       auth.saveUser(json);
    //     }
    //   } else {
    //     const json = (await response.json()) as AuthResponseError;

    //     setErrorResponse(json.body.error);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  // }
  // if (auth.isAuthenticated) {
  //   return <Navigate to="/inicio" />;
  }
  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="login-form">
  {/* Logo */}
  <div className="logo-container">
    <img src="./logo_producto.png" alt="ShainFlow Logo" className="logo" />
  </div>

  {/* Mensaje de error */}
  {/* {!!errorResponse && <div className="error-message">{errorResponse}</div>} */}

  {/* Usuario */}
  <label htmlFor="username">Usuario:</label>
  <input
    id="username"
    name="username"
    type="text"
    onChange={handleChange}
    value={username}
    className="input-field"
  />

  {/* Contraseña */}
  <label htmlFor="password">Contraseña:</label>
  <input
    id="password"
    name="password"
    type="password"
    onChange={handleChange}
    value={password}
    className="input-field"
  />

  {/* Botón */}
  <button type="submit" className="login-button">Login</button>

  {/* Ícono de reconocimiento facial */}
  <div className="face-id-container">
    <NavLink to="/">
      <img src="/ruta-icono-facial.png" alt="Reconocimiento facial" className="face-id-icon" />
    </NavLink>
  </div>

  {/* Enlace de registro */}
  <p className="register-text">
    ¿No puedes ingresar o no tienes una cuenta? <NavLink to="/signup">Regístrate</NavLink>
  </p>
</form>
    </DefaultLayout>
  );
}
