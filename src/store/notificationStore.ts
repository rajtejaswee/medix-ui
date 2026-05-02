import { create } from 'zustand';
import { AppNotification } from '@/types/notification.types';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: AppNotification) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications].slice(0, 50),
      unreadCount: s.unreadCount + 1,
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
}));
