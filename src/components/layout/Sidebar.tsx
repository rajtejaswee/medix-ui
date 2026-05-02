import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart2, Users, ChevronLeft, ChevronRight,
  LogOut, Activity, Settings,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { signOut } from '@/services/authService';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart2,       label: 'Analytics' },
  { to: '/patients',  icon: Users,           label: 'Patients' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside
      className={clsx(
        'flex flex-col h-full bg-[#1e3a5f] transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className={clsx(
        'flex items-center h-16 border-b border-white/10 px-4',
        sidebarOpen ? 'justify-between' : 'justify-center'
      )}>
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">HealthOS</span>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          id="sidebar-toggle"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <Tooltip key={to} content={label} className={sidebarOpen ? 'w-full' : ''}>
            <NavLink
              to={to}
              id={`nav-${label.toLowerCase()}`}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group w-full',
                  isActive
                    ? 'bg-white/10 text-white border-l-2 border-white -ml-0.5 pl-3.5'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                  !sidebarOpen && 'justify-center'
                )
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* Bottom: user + logout */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <Tooltip content="Settings" className={sidebarOpen ? 'w-full' : ''}>
          <button className={clsx(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm',
            !sidebarOpen && 'justify-center'
          )}>
            <Settings size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </Tooltip>

        {sidebarOpen ? (
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar name={user?.displayName || user?.email || 'User'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-white/50 text-xs truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
              id="logout-btn"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Tooltip content="Logout">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              id="logout-btn-collapsed"
            >
              <LogOut size={18} />
            </button>
          </Tooltip>
        )}
      </div>
    </aside>
  );
};
