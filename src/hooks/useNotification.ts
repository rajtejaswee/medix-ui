import { useNotificationStore } from '@/store/notificationStore';
import { showLocalNotification } from '@/services/notificationService';
import { AppNotification } from '@/types/notification.types';

export function useNotification() {
  const { addNotification, markAllRead, dismissNotification, notifications, unreadCount } =
    useNotificationStore();

  const notify = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const full: AppNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    addNotification(full);
    if (notification.type === 'warning' || notification.type === 'error') {
      showLocalNotification(notification.title, notification.message);
    }
  };

  return { notify, markAllRead, dismissNotification, notifications, unreadCount };
}
