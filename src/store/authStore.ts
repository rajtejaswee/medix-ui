import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:       null,
      isLoading:  false,
      error:      null,
      setUser:    (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError:   (error) => set({ error }),
    }),
    { name: 'auth-store', partialize: (s) => ({ user: s.user }) }
  )
);
