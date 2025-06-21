import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Empleados } from './routes/Pantallas/Empleados'
// import { Confirmacion } from './routes/Pantallas/Confirmacion'
import { VerDatos } from './routes/Pantallas/VerDatos'
import { Asistencias } from './routes/Pantallas/Asistencias'
import { DatosLaborales } from './routes/Pantallas/DatosLaborales'
import { ReconocimientoFacial } from './routes/Interfaces/RecoFacial'
import { Login } from './routes/Interfaces/Login'
import { Signup } from './routes/Interfaces/Signup'
import { Administrador } from './routes/Interfaces/Administrador'
import { Empleado } from './routes/Interfaces/Empleado'
import { AgregarEmpleado } from './routes/Pantallas/agregarEmpleado'
import { EditarEmpleado } from './routes/Pantallas/EditarEmpleado'
import { Supervisor } from './routes/Interfaces/Supervisor'
import { AnalistaDeDatos } from './routes/Interfaces/AnalistaDeDatos'
//import { EmpleadosSup } from './routes/Pantallas/EmpleadosSup'
import { PermitirFichada } from './routes/Pantallas/PermitirFichada'
import { Reportes } from './routes/Pantallas/Reportes'
import { CalculoNomina } from './routes/Pantallas/CalculoNomina'
import { VerNomina } from './routes/Pantallas/VerNomina'
import { EmpleadosNomina } from './routes/Pantallas/EmpleadosNomina'
import { EditarDatosLaborales } from './routes/Pantallas/EditarDatosLaborales'
import { InformacionBancaria } from './routes/Pantallas/InformacionBancaria'
import { CalcularNomina } from './routes/Pantallas/CalcularNomina'
import { RegistroFacial } from './routes/Interfaces/RegistroFacial'
import Verificacion from './components/Verificacion'
import Notificaciones from './components/Notificaciones'
import { AgregarSalario } from './components/AgregaSalario'
import { AgregarDatos } from './components/AgregaDatos'
import { ReportesAnalista } from './routes/Pantallas/Reportes-analista'
import Inasistencia from './components/Inasistencia'
import AsistenciaUnica from './components/AsistenciaUnica'
import { DashboardS } from './components/DashboardSupervisor'
import { DashboardA } from './components/DashboardAdministrador'
import { DashboardAn } from './components/DashboardAnalistadeDatos'
import { UserProvider } from './context/UserContext'
import { NuevoConcepto } from './components/NuevoConcepto'

// import { Dashboard } from './components/dashboard'


function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <Routes>
      <Route path="/" element={<ReconocimientoFacial />} />
      <Route path="/registro-facial" element={<RegistroFacial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path='/verificacion' element={<Verificacion />} />
      <Route path='/notificaciones' element={<Notificaciones />} />

      {/* Rutas del empleado (requieren layout y pueden estar protegidas) */}
        <Route path="/empleado" element={<Empleado />}>
          <Route path="verDatos" element={<VerDatos/>}></Route>
          <Route path="asistencias" element={<Asistencias/>}></Route>
          <Route path="datosLaborales" element={<DatosLaborales/>}></Route>
          {/* <Route path="confirmacion" element={<Confirmacion/>}></Route> */}
          <Route path="info-bancaria" element={<InformacionBancaria/>}></Route>
          <Route path="" element={<Asistencias/>}></Route>
          <Route path="*" element={<Asistencias/>}></Route>
        </Route>
    <Route path='/administrador' element={<Administrador />}>
          <Route path="verDatos" element={<VerDatos />}></Route>
          <Route path="asistencias" element={<Asistencias />}></Route>
          <Route path="datosLaborales" element={<DatosLaborales />}></Route>
          {/* <Route path="confirmacion" element={<Confirmacion />}></Route> */}
          <Route path="empleados" element={<Empleados />}></Route>
          <Route path="empleados/editarEmpleado" element={<EditarEmpleado />} />
          <Route path="empleados-nomina" element={<EmpleadosNomina />}></Route>
          <Route path="editarDatosLaborales" element={<EditarDatosLaborales />}></Route>
          <Route path="agregarEmpleado" element={<AgregarEmpleado />}></Route>
          <Route path="editarEmpleado" element={<EditarEmpleado />}></Route>
          <Route path="calculo-nomina" element={<CalculoNomina />}></Route>
          <Route path="calcular-nomina" element={<CalcularNomina />}></Route>
          <Route path="ver-nomina" element={<VerNomina />}></Route>
          <Route path="agregar-salario" element={<AgregarSalario />}></Route>
          <Route path="agregar-concepto" element={<NuevoConcepto />}></Route>
          <Route path="agregar-datos" element={<AgregarDatos />}></Route>
          <Route path="permitirFichada" element={<PermitirFichada />}></Route>
          <Route path="inasistencia" element={<Inasistencia />}></Route>
          <Route path="asistenciaUnica" element={<AsistenciaUnica/>}></Route>
          {/* <Route path="" element={<Confirmacion />}></Route> */}
          <Route path="dashboard" element={<DashboardA />} />
          <Route path="" element={<Asistencias />}></Route>
    </Route>
    <Route path='/analista-datos' element={<AnalistaDeDatos />}>
          <Route path="verDatos" element={<VerDatos />}></Route>
          <Route path="asistencias" element={<Asistencias />}></Route>
          <Route path="datosLaborales" element={<DatosLaborales />}></Route>
          {/* <Route path="confirmacion" element={<Confirmacion />}></Route> */}
          <Route path="empleados" element={<Empleados />}></Route>
          <Route path="agregarEmpleado" element={<AgregarEmpleado />}></Route>
          <Route path="editarEmpleado" element={<EditarEmpleado />}></Route>
          <Route path="reportes-analista" element={<ReportesAnalista />}></Route>           
          {/* <Route path="" element={<Confirmacion />}></Route> */}
          <Route path="dashboard" element={<DashboardAn />} />
          <Route path="" element={<Asistencias />}></Route>
    </Route>
    <Route path='/supervisor' element={<Supervisor />}>
          <Route path="verDatos" element={<VerDatos />}></Route>
          <Route path="asistencias" element={<Asistencias />}></Route>
          <Route path="datosLaborales" element={<DatosLaborales />}></Route>
          {/* <Route path="confirmacion" element={<Confirmacion />}></Route> */}
          <Route path="empleados" element={<Empleados />}></Route>
          <Route path="/supervisor/reportes/:id_empleado?" element={<Reportes />} />      
          <Route path="ver-nomina" element={<VerNomina />}></Route>
          {/* <Route path="" element={<Confirmacion />}></Route> */}
          <Route path="dashboard" element={<DashboardS />} />
          <Route path="" element={<Asistencias />}></Route>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
    </Routes>
    </UserProvider>
  </BrowserRouter>
  )
}

export default App
