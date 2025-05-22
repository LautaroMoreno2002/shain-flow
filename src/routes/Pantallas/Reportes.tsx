import { GraficoDeBarra } from "../../components/GarficoDeBarra";
import { GraficoDeTorta } from "../../components/GraficoDeTorta";

export function Reportes(){
    return(
        <div >
            <h1 style={{display: 'flex', justifyContent: 'center'}}>Horas trabajadas</h1>
            <GraficoDeBarra/>
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>Dias trabajados</h1>
            <GraficoDeTorta/>
        </div>
    )
}