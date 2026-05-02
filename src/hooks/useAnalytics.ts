import { useMemo } from 'react';
import { monthlyAdmissions, departmentStats, outcomeStats } from '@/data/mockAnalytics';

export function useAnalytics() {
  const avgMonthlyAdmissions = useMemo(
    () => Math.round(monthlyAdmissions.reduce((s, m) => s + m.admissions, 0) / monthlyAdmissions.length),
    []
  );

  return {
    monthlyAdmissions,
    departmentStats,
    outcomeStats,
    avgMonthlyAdmissions,
    readmissionRate: 8.4,
    avgLengthOfStay: 4.2,
    patientSatisfaction: 94.1,
  };
}
