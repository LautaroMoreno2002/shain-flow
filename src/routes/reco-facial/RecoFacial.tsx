import './reco-facial.css'

export const Reconocimiento = () => {
  return (
  <div className='cont-reco'>
      <div className="logo_shain-flow">
      <img src="/logo_producto.png" alt="Shain Flow" />
    </div>
    <main>
      <div className="cont-camara">
      <div className='camara'>
      </div>
    </div>
    <div className='mensaje-guia'>
      <p>Enfoca tu rostro dentro del círculo para realizar el reconocimiento facial y tomar asistencia.</p>
    </div>
    <button className='btn-reconocimiento' onClick={() => {
      alert('Reconocimiento facial iniciado')
    }}>
      Iniciar Reconocimiento
    </button>
    </main>
    <div className='cont-alternativa'>
      <p>¿No puedes escanearte?</p>
      <p><span>Ingresa manualmente por el login</span></p>
    </div>
    </div>
  )
}
