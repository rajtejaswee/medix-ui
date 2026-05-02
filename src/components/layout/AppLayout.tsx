import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useUIStore } from '@/store/uiStore';

export const AppLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => useUIStore.getState().setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
