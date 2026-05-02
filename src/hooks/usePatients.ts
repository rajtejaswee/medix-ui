import React, { useEffect, useMemo } from 'react';
import { usePatientStore } from '@/store/patientStore';
import { getPatients } from '@/services/patientService';
import { Patient } from '@/types/patient.types';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

function matchesSearch(p: Patient, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    p.diagnosis.toLowerCase().includes(q)
  );
}

export function usePatients() {
  const {
    patients, selectedPatient, searchQuery, statusFilter, departmentFilter,
    setPatients, setSelected, setSearchQuery, setStatusFilter, setDeptFilter,
  } = usePatientStore();

  useEffect(() => {
    if (patients.length === 0) {
      getPatients().then(setPatients);
    }
  }, [patients.length, setPatients]);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // NOTE: For 200+ patients, consider react-window or @tanstack/react-virtual for virtualization
  const filteredPatients = useMemo(() => {
    return patients
      .filter((p) => matchesSearch(p, debouncedQuery))
      .filter((p) => statusFilter === 'all' || p.status === statusFilter)
      .filter((p) => departmentFilter === 'all' || p.department === departmentFilter);
  }, [patients, debouncedQuery, statusFilter, departmentFilter]);

  return {
    patients, filteredPatients, selectedPatient,
    searchQuery, statusFilter, departmentFilter,
    setSelected, setSearchQuery, setStatusFilter, setDeptFilter,
  };
}
