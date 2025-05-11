import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Empleado } from './routes/empleado/Empleado'
import { Confirmacion } from './routes/empleado/Confirmacion'
import { VerDatos } from './routes/empleado/VerDatos'
import { Asistencias } from './routes/empleado/Asistencias'
import { DatosLaborales } from './routes/empleado/DatosLaborales'
import { ReconocimientoFacial } from './routes/reco-facial/RecoFacial'
import { Login } from './routes/login/Login'
import { Signup } from './routes/signup/Signup'
import { Administrador } from './routes/administrador/Administrador'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ReconocimientoFacial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 

      {/* Rutas del empleado (requieren layout y pueden estar protegidas) */}
        <Route path="/empleado" element={<Empleado />}>
          <Route path="verDatos" element={<VerDatos/>}></Route>
          <Route path="asistencias" element={<Asistencias/>}></Route>
          <Route path="datosLaborales" element={<DatosLaborales/>}></Route>
          <Route path="confirmacion" element={<Confirmacion/>}></Route>
          <Route path="" element={<Confirmacion/>}></Route>
          <Route path="*" element={<Confirmacion/>}></Route>
        </Route>
    <Route path='/administrador' element={<Administrador />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
