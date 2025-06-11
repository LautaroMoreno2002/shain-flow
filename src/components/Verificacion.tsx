import './estilos/verificacion.css';

const Verificacion = () => {
  return (
    <div className="verificacion-container">
      <img src="/logo_producto.png" alt="Logo" className="logo" />

      <iframe
        src="http://localhost:3000/public/dashboard/b68d76a8-5cb7-49c1-847f-2d9924c75981"
      ></iframe>
      <h1 className="h1">Ingresa el código de verificación</h1>
      <p className="p">Enviamos un código a tu mail</p>

      <div className="codigo-inputs">
        {[1, 2, 3, 4].map((_, index) => (
          <input key={index} type="text" maxLength={1} className="input-box" />
        ))}
      </div>

      <button className="boton-enviar">Enviar</button>
    </div>
  );
};

export default Verificacion;
