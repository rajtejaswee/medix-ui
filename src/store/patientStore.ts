import { create } from 'zustand';
import { Patient } from '@/types/patient.types';

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;
  setPatients: (p: Patient[]) => void;
  setSelected: (p: Patient | null) => void;
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: string) => void;
  setDeptFilter: (d: string) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  searchQuery: '',
  statusFilter: 'all',
  departmentFilter: 'all',
  setPatients: (patients) => set({ patients }),
  setSelected: (selectedPatient) => set({ selectedPatient }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDeptFilter: (departmentFilter) => set({ departmentFilter }),
}));
