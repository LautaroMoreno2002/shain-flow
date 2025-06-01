import PDF from "../../components/DocumentoPDF";
import { GraficoDeBarra } from "../../components/GarficoDeBarra";
import { GraficoDeTorta } from "../../components/GraficoDeTorta";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { exportChartToPDF } from "../../components/ExportaAPDF";

export function Reportes() {
    return (
        <div >
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Horas trabajadas</h1>
            <GraficoDeBarra />
            <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>Dias trabajados</h1>
            <GraficoDeTorta />
            <PDFDownloadLink document={<PDF />} fileName="miPrimerPDF.pdf">
                {
                    ({ loading }) => loading ? <button>
                        Cargando Documento...
                    </button> : <button>
                        Nueva Descarga!
                    </button>
                }
            </PDFDownloadLink>
            {/*<button style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>Descargar PDF</button>*/}
            <button onClick={exportChartToPDF}>Exportar a PDF</button>
        </div>
    )
}