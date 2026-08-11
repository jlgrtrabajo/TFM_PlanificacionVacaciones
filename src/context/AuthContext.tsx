/**
 * @file AuthContext.tsx
 * @description Contexto global de React para la gestión del usuario autenticado en la sesión actual.
 * 
 * EQUIVALENCIA EN C# / ASP.NET:
 * React Context es el mecanismo equivalente a la Inyección de Dependencias (Dependency Injection)
 * o al `HttpContext.User` en ASP.NET. Permite compartir el objeto del usuario logueado
 * con cualquier componente de la aplicación sin tener que pasar la variable como parámetro manualmente
 * nivel a nivel (prop drilling).
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../models/UserModels';

/**
 * Define la forma de los datos expuestos por el contexto de autenticación.
 */
interface AuthContextValue {
  /** Usuario actualmente logueado en la aplicación, o `null` si no hay sesión iniciada */
  user: User | null;
  /** Función para establecer o cerrar la sesión del usuario */
  setUser: (user: User | null) => void;
}

/** Creación del objeto Context de React */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Componente Proveedor (Provider) que envuelve a la aplicación o sección protegida.
 * Mantiene en el estado interno (`useState`) al usuario activo.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // useMemo optimiza el rendimiento evitando recrear la referencia del objeto en cada renderizado
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personalizado (`useAuth`) para consumir el usuario activo desde cualquier componente React.
 * Lanza una excepción si se intenta usar fuera de un `<AuthProvider>`.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
