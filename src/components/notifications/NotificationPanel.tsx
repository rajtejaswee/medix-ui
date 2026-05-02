import React, { useEffect, useRef } from 'react';
import { X, Bell, CheckCheck, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';
import { AppNotification } from '@/types/notification.types';
import clsx from 'clsx';

interface NotificationPanelProps {
  onClose: () => void;
}

function formatTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const typeConfig = {
  success: { icon: CheckCircle,    color: 'text-green-500', bg: 'bg-green-50' },
  info:    { icon: Info,           color: 'text-blue-500',  bg: 'bg-blue-50'  },
  warning: { icon: AlertTriangle,  color: 'text-amber-500', bg: 'bg-amber-50' },
  error:   { icon: XCircle,        color: 'text-red-500',   bg: 'bg-red-50'   },
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { notifications, unreadCount, markAllRead, dismissNotification } = useNotification();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const bell = document.getElementById('notification-bell');
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !bell?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 px-2 py-1 rounded-md hover:bg-primary-50 transition-colors"
              id="mark-all-read"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell size={32} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n: AppNotification) => {
            const cfg = typeConfig[n.type];
            const Icon = cfg.icon;
            return (
              <div
                key={n.id}
                className={clsx(
                  'flex gap-3 px-4 py-3 transition-colors',
                  !n.read && 'bg-blue-50/40'
                )}
              >
                <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', cfg.bg)}>
                  <Icon size={16} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900">{n.title}</p>
                    <button
                      onClick={() => dismissNotification(n.id)}
                      className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(n.timestamp)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
