import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import DefaultLayout from '../layouts/DefaultLayout';
import EmptyState from '../components/common/EmptyState';

function NotificationsPage() {
  const { user } = useAuth();
  const { notifications } = useNotification();

  const visibleNotifications = useMemo(() => {
    if (!user) {
      return [];
    }

    if (user.profileId === 2) {
      return notifications;
    }

    return notifications.filter((notification) => notification.to.includes(user.email));
  }, [notifications, user]);

  return (
    <DefaultLayout>
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h4">Notificaciones</h1>
          <p>Mensajes simulados de envío, aprobación y rechazo.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {visibleNotifications.length ? (
            <div className="list-group">
              {visibleNotifications
                .slice()
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .map((notification) => (
                  <div key={notification.id} className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{notification.subject}</h5>
                        <p className="mb-1 text-muted">{notification.body}</p>
                        <small className="text-muted">Enviado a: {notification.to.join(', ')}</small>
                      </div>
                      <small className="text-muted">{notification.createdAt.slice(0, 10)}</small>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <EmptyState
              title="Sin notificaciones"
              description="No tienes notificaciones simuladas en este momento."
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default NotificationsPage;
