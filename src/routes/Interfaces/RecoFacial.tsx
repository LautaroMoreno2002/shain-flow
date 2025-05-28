import { useRef, useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import '../../estilos/reco-facial.css'; // Asegúrate de que esta ruta sea correcta

export const ReconocimientoFacial = () => {
   
    const videoRef = useRef<HTMLVideoElement | null>(null);// Referencia para el elemento de video
    const socketRef = useRef<WebSocket | null>(null);// Referencia para la conexión WebSocket

    // Estado para los mensajes que se muestran al usuario en la interfaz
    const [recognitionStatus, setRecognitionStatus] = useState('Esperando conexión con el servidor...');

    // Estados para controlar qué gestos se han solicitado y si ya se alertó sobre ellos
    const [gesturesRequested, setGesturesRequested] = useState({
        sonrisa: false,
        giro: false,
        cejas: false,
    });
    // Estado para el gesto que se está solicitando actualmente (para mostrarlo en la UI)
    const [currentGesturePrompt, setCurrentGesturePrompt] = useState(null);

    // --- Manejo de la Conexión WebSocket y Activación de la Cámara ---
    useEffect(() => {
        // Inicializar la conexión WebSocket
        socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws");

        socketRef.current.onopen = () => {
            console.log("✅ Conectado al servidor WebSocket");
            setRecognitionStatus("Conectado. Activando cámara...");

            // Activar la cámara
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                        console.log("🎥 Cámara activada correctamente");
                        setRecognitionStatus("Cámara lista. Haz clic en 'Iniciar Reconocimiento'.");
                    }
                })
                .catch(err => {
                    console.error("❌ Error al acceder a la cámara:", err);
                    setRecognitionStatus("❌ Error al acceder a la cámara. Por favor, asegúrate de que esté disponible.");
                    alert("❌ Error al acceder a la cámara. Por favor, asegúrate de que esté disponible.");
                });
        };

        socketRef.current.onclose = () => {
            console.log("Desconectado del servidor WebSocket.");
            setRecognitionStatus("Desconectado del servidor de reconocimiento.");
        };

        socketRef.current.onerror = (error) => {
            console.error("Error en el WebSocket:", error);
            setRecognitionStatus("❌ Error en la conexión con el servidor.");
        };

        // Función de limpieza para cerrar el WebSocket al desmontar el componente
        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

    // --- Manejo de Mensajes del Servidor WebSocket ---
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.onmessage = (event) => {
                const message = event.data;
                console.log("📡 Respuesta del servidor:", message);

                if (message.includes("Por favor, realiza el gesto:")) {
                    // Extraer el gesto del mensaje (ej. "sonrisa", "giro", "cejas")
                    const gestoMatch = message.match(/el gesto: '?(sonrisa|giro|cejas)'?/i);
                    const gesto = gestoMatch ? gestoMatch[1].toLowerCase() : null;

                    if (gesto) {
                        // Si es la primera vez que se pide este gesto, mostrar alerta
                        if (!gesturesRequested[gesto]) {
                            alert(`🚨 ${message}`); // Alerta solo la primera vez
                            setGesturesRequested(prev => ({ ...prev, [gesto]: true }));
                        }
                        // Siempre actualizar el mensaje de estado y el gesto actual
                        setRecognitionStatus(`✅ ${message}`);
                        setCurrentGesturePrompt(gesto);
                    }
                } else if (message.includes("No se detectó un rostro válido")) {
                    setRecognitionStatus("🚫 " + message);
                } else if (message.includes("Persona no reconocida")) {
                    setRecognitionStatus("🚫 " + message);
                } else if (message.includes("No se detectó rostro en la imagen del gesto")) {
                    setRecognitionStatus("❌ " + message);
                    // No alertamos, solo actualizamos el estado. El backend ya está pidiendo un reintento.
                } else if (message.includes("El gesto") && message.includes("no fue detectado")) {
                    setRecognitionStatus("🚫 " + message);
                    // No alertamos, solo actualizamos el estado. El backend ya está pidiendo un reintento.
                } else if (message.includes("✅")) {
                    setRecognitionStatus(message); // Mensaje de éxito del servidor
                    alert(message); // Mostrar la alerta de éxito final
                    resetRecognitionState(); // Reiniciar el estado para un nuevo reconocimiento
                } else if (message.includes("❌") || message.includes("🚫") || message.includes("⚠️")) {
                    setRecognitionStatus(`⚠️ ${message}`);
                    alert(`⚠️ ${message}`); // Mostrar alertas de error/advertencia genéricas
                }
            };
        }
    }, [gesturesRequested]); // Depende de gesturesRequested para que el onmessage vea el estado actualizado

    // --- Funciones de Lógica de Reconocimiento ---

    // Función para reiniciar el estado de reconocimiento
    const resetRecognitionState = useCallback(() => {
        setGesturesRequested({ sonrisa: false, giro: false, cejas: false });
        setCurrentGesturePrompt(null);
        setRecognitionStatus("Listo para un nuevo reconocimiento.");
    }, []);

    // Función para iniciar el reconocimiento (activada por el botón)
    const startRecognition = () => {
        if (videoRef.current && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg').split(',')[1]; // Capturar imagen y convertir a Base64

            console.log("📤 Enviando imagen para reconocimiento...");
            socketRef.current.send(JSON.stringify({ imagen: imageData, registrar: false })); // 'registrar: false' para solo reconocimiento
            setRecognitionStatus("Enviando imagen para reconocimiento...");
            setCurrentGesturePrompt(null); // Limpiar cualquier gesto anterior
            setGesturesRequested({ sonrisa: false, giro: false, cejas: false }); // Resetear gestos solicitados
        } else {
            setRecognitionStatus("❌ No se pudo iniciar el reconocimiento. Asegúrate de que la cámara esté activa y conectado al servidor.");
            alert("❌ No se pudo iniciar el reconocimiento. Asegúrate de que la cámara esté activa y conectado al servidor.");
        }
    };

    // Mapeo de gestos a emojis para una mejor UI
    const gestureEmojis = {
        sonrisa: "😊",
        giro: "↩️",
        cejas: "😯"
    };

    return (
        <div className="contenedor-reconocimiento">
            <header className="logo-container">
                <img className='logo' src="/logo_producto.png" alt="Shain Flow" />
            </header>

            <main className="contenido">
                <section className="seccion-camara">
                    <div className="camara">
                        <video
                            ref={videoRef}
                            width="100%"
                            height="100%"
                            autoPlay
                            playsInline
                            muted
                            style={{
                                transform: 'scaleX(-1)',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%'
                            }}
                        ></video>
                    </div>
                    {/* Mostrar el estado y el gesto actual */}
                    <p className="estado-reconocimiento">
                        {recognitionStatus}
                        {currentGesturePrompt && (
                            <span style={{ marginLeft: '10px' }}>
                                {gestureEmojis[currentGesturePrompt]}
                            </span>
                        )}
                    </p>
                </section>

                <section className="seccion-derecha">
                    <p className="mensaje-guia">
                        Enfoca tu rostro dentro del círculo para realizar el reconocimiento facial y tomar asistencia.
                    </p>
                    <button
                        className="boton-reconocimiento"
                        onClick={startRecognition}
                        // Deshabilitar el botón si el socket no está listo o la cámara no está activa
                        disabled={!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN || !videoRef.current?.srcObject}
                    >
                        Iniciar Reconocimiento
                    </button>

                    <div className="seccion-alternativa">
                        <p>¿No puedes escanearte?</p>
                        <p>
                            <NavLink to="/login">
                                <span>Ingresa manualmente por el login</span>
                            </NavLink>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};