import { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import '../../estilos/login.css'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from "../../services/api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorResponse, setErrorResponse] = useState("");

  // const auth = useAuth();
  const navegar = useNavigate();
  // const users = [
  //   {
  //     username: 'Lautaro Moreno',
  //     password: '1234',
  //     rol: 'empleado'
  //   }, {
  //     username: 'Pablo Da Silva',
  //     password: '1234',
  //     rol: 'administrador'
  //   }, {
  //     username: 'Abel Aquino',
  //     password: '1234',
  //     rol: 'analista-datos'
  //   }, {
  //     username: 'Rodrigo Montoro',
  //     password: '1234',
  //     rol: 'supervisor'
  //   }
  // ]

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }
  
  /*
  PARA CAPTURAR EL TOKEN
  const token = sessionStorage.getItem("token");
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  console.log(usuario.rol);
  console.log(usuario.permisos.ver_datos_personales);
  */
 
 // console.log(username);
 // console.log(password);
 // for (let user of users) {
 //   if (username == user.username && password == user.password)
 //     navegar(`/${user.rol}`);
 // }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resultado = await iniciarSesion(username, password);

    if (resultado.access_token) {
      console.log("Token:", resultado.access_token);
      console.log("Permisos:", resultado.permisos);
      console.log("Rol:", resultado.rol);

      // 👉 Guardar en sessionStorage
      sessionStorage.setItem("token", resultado.access_token);
      sessionStorage.setItem(
        "usuario",
        JSON.stringify({
          permisos: resultado.permisos,
          rol: resultado.rol,
          id_empleado: resultado.id_empleado,
          numero_identificacion: resultado.numero_identificacion,
        })
      );

      // Redirigir según el rol
      switch (resultado.rol) {
        case "1":
          navegar(`/empleado`);
          break;
        case "2":
          navegar(`/administrador`);
          break;
        case "3":
          navegar(`/supervisor`);
          break;
        case "4":
          navegar(`/analista-datos`);
          break;
      }
    } else {
      console.error("Fallo en el login:", resultado);
    }
  }
  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Logo */}
        <div className="logo-container">
          <img
            src="./logo_producto.png"
            alt="ShainFlow Logo"
            className="logo"
          />
        </div>

        {/* Mensaje de error */}
        {/* {!!errorResponse && <div className="error-message">{errorResponse}</div>} */}

        {/* Usuario */}
        <div className="cont-input">
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={handleChange}
            value={username}
            className="input-field"
          />
        </div>

        {/* Contraseña */}
        <div className="cont-input">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
            className="input-field"
          />
        </div>

        {/* Botón */}
        <button type="submit" className="login-button">
          Login
        </button>

        {/* Ícono de reconocimiento facial */}
        <div className="face-id-container">
          <NavLink to="/">
            <img
              src="/scaneo.png"
              alt="Reconocimiento facial"
              className="face-id-icon"
            />
          </NavLink>
        </div>

        {/* Enlace de registro */}
        <p className="register-text">
          ¿No puedes ingresar o no tienes una cuenta?{" "}
          <NavLink to="/signup">Regístrate</NavLink>
        </p>
      </form>
    </DefaultLayout>
  );
}
