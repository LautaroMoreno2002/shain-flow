import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <form>
        <input type="text" placeholder="Buscar empleado" />
        <button>🔍</button>
      </form>
    </div>
  )
}

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>Empleados</li>
        <li>Reportería</li>
        <li>Nóminas</li>
      </ul>
    </div>
  )
}

export const Administrador = () => {
  return (
    <>
    <h2>Empleados:</h2>
    {/* LLAMAR A LA API Y MOSTRAR LOS EMPLEADOS */}
    <Search></Search>
    <NavBar />
    </>
  )
}
