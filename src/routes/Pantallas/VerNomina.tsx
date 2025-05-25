const recibo = {
  empresa: "Shain Flow",
  periodo: "Enero 2025",
  empleado: {
    nombre: "Abel Aquino",
    numero_empleado: "1",
  },
  ingresos: [
    { tipo: "Salario Base", monto: 10000 },
    { tipo: "Horas Extras", monto: 2000 },
  ],
  deducciones: [
    { tipo: "IESS", monto: 500 },
    { tipo: "Impuestos", monto: 1000 },
  ],
  total_ingresos: 12000,
  total_deducciones: 1500,
  total_neto: 10500,
};

function CabeceraRecibo() {
  return (
    <header>
      <h1>{recibo.empresa}</h1>
      <p>Periodo: {recibo.periodo}</p>
    </header>
  );
}

function ListaItems() {
  return (
    <section>
      <h2>Ingresos</h2>
      <ul>
        <li>
            "Salario base" : "600.000"
        </li>
        <li>
            "Horas extras" : "70.000"
        </li>
        {/*items.map((item, index) => (
          <li key={index}>
            {item.tipo}: {item.monto}
          </li>
        ))*/}
      </ul>
      <h2>Descuentos</h2>
        <ul>
            <li>
                "Descuento Obra Social" : "60.000"
            </li>
        </ul>
    </section>
  );
}

export function VerNomina() {
    return (
        <div>
            <CabeceraRecibo />
            <section>
                <h2>Datos del Empleado</h2>
                <p>Nombre: {recibo.empleado.nombre}</p>
                <p>Número de Empleado: {recibo.empleado.numero_empleado}</p>
            </section>
            <ListaItems  />
            <section>
                <h2>Totales</h2>
                <p>Total Ingresos: {recibo.total_ingresos}</p>
                <p>Total Deducciones: {recibo.total_deducciones}</p>
                <p>Total Neto: {recibo.total_neto}</p>
            </section>
        </div>
    )
}