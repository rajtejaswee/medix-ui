import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { subscribeToAuthChanges } from '@/services/authService';

export function useAuth() {
  const { user, isLoading, error, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, [setUser, setLoading]);

  return { user, isLoading, error };
}
