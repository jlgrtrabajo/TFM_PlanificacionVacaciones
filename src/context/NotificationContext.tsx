import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { SimulatedEmail } from '../models/CalendarModels';
import { notifications as initialNotifications } from '../mock/notifications';

interface NotificationContextValue {
  notifications: SimulatedEmail[];
  addNotification: (notification: SimulatedEmail) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

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

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
