import { button } from "framer-motion/client";
import PDF from "../../components/DocumentoPDF";
import { GraficoDeBarra } from "../../components/GarficoDeBarra";
import { GraficoDeTorta } from "../../components/GraficoDeTorta";
import {PDFDownloadLink} from '@react-pdf/renderer';

export function Reportes(){
    return(
        <div >
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Horas trabajadas</h1>
            <GraficoDeBarra/>
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>Dias trabajados</h1>
            <GraficoDeTorta/>
            <PDFDownloadLink document={<PDF />} fileName="miPrimerPDF.pdf">
                {
                    ({loading, url, error, blob}) => loading ? <button>
                        Cargando Documento...
                    </button> : <button>
                        Nueva Descarga!
                    </button>
                }
            </PDFDownloadLink>
            {/*<button style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>Descargar PDF</button>*/}
        </div>
    )
}