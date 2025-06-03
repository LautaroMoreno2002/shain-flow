import { GraficoDeBarra } from "../../components/GarficoDeBarra";
import { GraficoDeTorta } from "../../components/GraficoDeTorta";
import { exportChartsToPDF } from "../../components/ExportaAPDF";

export function Reportes() {
    return (
        <div >
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Horas trabajadas</h1>
            <GraficoDeBarra />
            <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>Dias trabajados</h1>
            <GraficoDeTorta />
            <button onClick={exportChartsToPDF}>Exportar a PDF</button>
        </div>
    )
}