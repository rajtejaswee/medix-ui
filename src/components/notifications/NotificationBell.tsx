import React, { useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useNotification } from '@/hooks/useNotification';
import { NotificationPanel } from './NotificationPanel';
import clsx from 'clsx';

export const NotificationBell: React.FC = () => {
  const { unreadCount } = useNotification();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className={clsx(
          'relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
          panelOpen && 'bg-gray-100'
        )}
        id="notification-bell"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {panelOpen && (
        <NotificationPanel onClose={() => setPanelOpen(false)} />
      )}
    </div>
  );
};
