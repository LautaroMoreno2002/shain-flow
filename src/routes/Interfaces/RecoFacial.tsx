import { NavLink } from 'react-router-dom';
import '../../estilos/reco-facial.css';

export const ReconocimientoFacial = () => {
  return (
    <div className="contenedor-reconocimiento">
      <header className="logo-container">
        <img src="/logo_producto.png" alt="Shain Flow" />
      </header>

      <main className="contenido">
        <section className="seccion-camara">
          <div className="camara"></div>
          <p className="mensaje-guia">
            Enfoca tu rostro dentro del círculo para realizar el reconocimiento facial y tomar asistencia.
          </p>
          <button
            className="boton-reconocimiento"
            onClick={() => alert('Reconocimiento facial iniciado')}
          >
            Iniciar Reconocimiento
          </button>
        </section>

        <aside className="seccion-alternativa">
          <p>¿No puedes escanearte?</p>
          <p>
            <NavLink to="/login">
              <span>Ingresa manualmente por el login</span>
            </NavLink>
          </p>
        </aside>
      </main>
    </div>
  );
};
