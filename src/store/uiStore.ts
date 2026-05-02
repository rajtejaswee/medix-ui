import { create } from 'zustand';

type ViewMode = 'grid' | 'list';

interface UIState {
  patientView: ViewMode;
  sidebarOpen: boolean;
  togglePatientView: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  patientView: 'grid',
  sidebarOpen: true,
  togglePatientView: () =>
    set((s) => ({ patientView: s.patientView === 'grid' ? 'list' : 'grid' })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
