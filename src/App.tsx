import React, { Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { subscribeToAuthChanges } from '@/services/authService';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Spinner } from '@/components/ui/Spinner';
import LoginPage from '@/pages/LoginPage';
import { useNotificationStore } from '@/store/notificationStore';

const SESSION_TIMEOUT_MS = 25 * 60 * 1000; // 25 minutes

function useSessionTimeout() {
  const user = useAuthStore((s) => s.user);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnedRef = useRef(false);

  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      warnedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!warnedRef.current) {
          warnedRef.current = true;
          addNotification({
            id: crypto.randomUUID(),
            type: 'warning',
            title: 'Session Expiring Soon',
            message: 'Your session will expire in 5 minutes. Please save your work.',
            timestamp: new Date().toISOString(),
            read: false,
          });
        }
      }, SESSION_TIMEOUT_MS);
    };

    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [user, addNotification]);
}

// Code splitting with React.lazy
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'));
const AnalyticsPage = React.lazy(() => import('@/pages/AnalyticsPage'));
const PatientsPage  = React.lazy(() => import('@/pages/PatientsPage'));

function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  );
}

export default function App() {
  const { setUser } = useAuthStore();
  useSessionTimeout();

  useEffect(() => {
    const unsub = subscribeToAuthChanges(setUser);
    return unsub;
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PageSpinner />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path="/analytics"
              element={
                <Suspense fallback={<PageSpinner />}>
                  <AnalyticsPage />
                </Suspense>
              }
            />
            <Route
              path="/patients"
              element={
                <Suspense fallback={<PageSpinner />}>
                  <PatientsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
