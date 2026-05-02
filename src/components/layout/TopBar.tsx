import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { signOut } from '@/services/authService';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationBell } from '@/components/notifications/NotificationBell';

export const TopBar: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { setSidebarOpen, sidebarOpen } = useUIStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
          id="topbar-sidebar-toggle"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />

        {/* User avatar dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            id="user-menu-btn"
            aria-label="User menu"
          >
            <Avatar
              name={user?.displayName || user?.email || 'User'}
              size="sm"
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.displayName || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" id="profile-menu-item">
                Profile
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors" id="settings-menu-item">
                Settings
              </button>
              <div className="border-t border-gray-100 mt-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                id="logout-menu-item"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
