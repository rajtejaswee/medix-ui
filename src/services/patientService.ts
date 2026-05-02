import { mockPatients } from '@/data/mockPatients';
import { Patient } from '@/types/patient.types';

export const getPatients = (): Promise<Patient[]> =>
  new Promise((resolve) => setTimeout(() => resolve(mockPatients), 300));

export const getPatientById = (id: string): Promise<Patient | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(mockPatients.find((p) => p.id === id)), 200)
  );
