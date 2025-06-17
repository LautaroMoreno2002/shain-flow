import { useParams } from "react-router-dom";
import { useState } from "react";

export function Reportes() {
    const { id_empleado } = useParams<{ id_empleado?: string }>();
    const [iframeLoaded, setIframeLoaded] = useState(false);
    
    // Configuración del dashboard
const metabaseUrl = `https://3-137-176-177.sslip.io/embed/dashboard/6d7f9cc7-30db-4711-855c-46c19eccc377?id_empleado=${id_empleado}#theme=transparent&hide_parameters=id_empleado`;



    if (!id_empleado) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                padding: '20px'
            }}>
                <h2 style={{ 
                    color: '#2c3e50',
                    marginBottom: '20px',
                    fontSize: '24px'
                }}>
                    No se ha seleccionado ningún empleado
                </h2>
                <p style={{
                    color: '#7f8c8d',
                    fontSize: '16px',
                    maxWidth: '500px'
                }}>
                    Seleccione un empleado desde la lista para ver sus reportes
                </p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'center'
            }}>
                Reporte del empleado #{id_empleado}
            </h1>

            <div style={{
                position: 'relative',
                height: '75vh',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f8f9fa'
            }}>
                {!iframeLoaded && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        zIndex: 10
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid #f3f3f3',
                            borderTop: '3px solid #3498db',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '12px'
                        }}></div>
                        <p style={{
                            color: '#7f8c8d',
                            fontSize: '14px'
                        }}>Cargando reportes...</p>
                    </div>
                )}

                <iframe 
                    src={metabaseUrl}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        opacity: iframeLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                    title={`Reportes del empleado ${id_empleado}`}
                    onLoad={() => setIframeLoaded(true)}
                />
            </div>
        </div>
    );
}