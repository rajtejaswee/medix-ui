import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface StatItem {
  label: string;
  value: string;
}

export const StatsSummary: React.FC = () => {
  const { avgMonthlyAdmissions, readmissionRate, avgLengthOfStay, patientSatisfaction } = useAnalytics();

  const stats: StatItem[] = [
    { label: 'Avg Monthly Admissions', value: avgMonthlyAdmissions.toString() },
    { label: 'Readmission Rate',       value: `${readmissionRate}%` },
    { label: 'Avg Length of Stay',     value: `${avgLengthOfStay} days` },
    { label: 'Patient Satisfaction',   value: `${patientSatisfaction}%` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="card text-center">
          <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
