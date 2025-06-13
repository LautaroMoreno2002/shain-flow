import { createContext, useContext, useState, type ReactNode } from 'react';

// Define el tipo del usuario
export interface Usuario {
  access_token: string;
  token_type: string;
  permisos: {
    online_login: boolean;
    offline_login: boolean;
    ver_datos_personales: boolean;
    editar_datos_personales: boolean;
    ver_datos_laborales: boolean;
    agregar_datos_laborales: boolean;
    editar_datos_laborales: boolean;
    agregar_empleado: boolean;
    ver_registro_asistencia: boolean;
    ver_informacion_bancaria: boolean;
    editar_informacion_bancaria: boolean;
    ingresar_asistencia: boolean;
    ingresar_inasistencia: boolean;
    ver_historial_nominas: boolean;
    calcular_nomina_manualmente: boolean;
    calcular_nomina_automaticamente: boolean;
    agregar_concepto: boolean;
    agregar_departamento: boolean;
    agregar_puesto: boolean;
    agregar_categoria: boolean;
    agregar_salario_con_vigencia: boolean;
    ver_vista_previa_recibo_sueldo: boolean;
    descargar_recibo_sueldo: boolean;
    ver_reportes: boolean;
    cerrar_sesion: boolean;
  };
  rol: string;
  id_empleado: number;
  numero_identificacion: string;
}

// Define el tipo del contexto
interface UserContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

// Crear el contexto con valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
