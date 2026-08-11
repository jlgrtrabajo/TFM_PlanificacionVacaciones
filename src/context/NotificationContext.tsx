/**
 * @file NotificationContext.tsx
 * @description Contexto global de React para la gestión del buzón de correos/notificaciones del sistema.
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { SimulatedEmail } from '../models/CalendarModels';
import { notifications as initialNotifications } from '../mock/notifications';

/** Interfaz con los métodos expuestos por el servicio de notificaciones */
interface NotificationContextValue {
  /** Colección de correos simulados registrados */
  notifications: SimulatedEmail[];
  /** Método para registrar un nuevo correo en la bandeja de entrada global */
  addNotification: (notification: SimulatedEmail) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

/**
 * Proveedor del contexto de notificaciones.
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<SimulatedEmail[]>(initialNotifications);

  const value = useMemo(
    () => ({
      notifications,
      addNotification: (notification: SimulatedEmail) => {
        setNotifications((current) => [...current, notification]);
      },
    }),
    [notifications],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

/**
 * Hook personalizado para enviar o consultar notificaciones desde cualquier pantalla.
 */
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
