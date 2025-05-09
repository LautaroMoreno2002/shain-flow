import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Empleado } from './components/empleado/Empleado'
import { Reconocimiento } from './components/reco-facial/RecoFacial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Empleado />
    {/* <Reconocimiento /> */}
  </StrictMode>,
)
