import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Empleado } from './routes/empleado/Empleado'
import { Confirmacion } from './routes/empleado/Confirmacion'
import { VerDatos } from './routes/empleado/VerDatos'
import { Asistencias } from './routes/empleado/Asistencias'
import { DatosLaborales } from './routes/empleado/DatosLaborales'
import { ReconocimientoFacial } from './routes/reco-facial/RecoFacial'
import { Login } from './routes/login/Login'
import { Signup } from './routes/signup/Signup'
import { Administrador } from './routes/administrador/Administrador'
import { Empleados } from './routes/administrador/Empleados'
import { VerDatosAdmin } from './routes/administrador/VerDatosAdmin'
import { AsistenciasAdmin } from './routes/administrador/AsistenciasAdmin'
import { ConfirmacionAdmin } from './routes/administrador/ConfirmacionAdmin'
import { DatosLaboralesAdmin } from './routes/administrador/DatosLaboralesAdmin'
import { AgregarEmpleado } from './routes/administrador/agregarEmpleado'
import { EditarEmpleado } from './routes/administrador/editarEmpleado'

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
    <Route path='/administrador' element={<Administrador />}>
          <Route path="verDatos" element={<VerDatosAdmin />}></Route>
          <Route path="asistencias" element={<AsistenciasAdmin />}></Route>
          <Route path="datosLaborales" element={<DatosLaboralesAdmin />}></Route>
          <Route path="confirmacion" element={<ConfirmacionAdmin />}></Route>
          <Route path="empleados" element={<Empleados />}></Route>
          <Route path="agregarEmpleado" element={<AgregarEmpleado />}></Route>
          <Route path="editarEmpleado" element={<EditarEmpleado />}></Route>
          <Route path="" element={<Empleados />}></Route>
    </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
