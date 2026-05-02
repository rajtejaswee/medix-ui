import { MonthlyData, DepartmentStat, OutcomeStat } from '@/types/analytics.types';

export const monthlyAdmissions: MonthlyData[] = [
  { month: 'Jan', admissions: 95,  discharges: 88  },
  { month: 'Feb', admissions: 102, discharges: 97  },
  { month: 'Mar', admissions: 110, discharges: 105 },
  { month: 'Apr', admissions: 98,  discharges: 101 },
  { month: 'May', admissions: 115, discharges: 108 },
  { month: 'Jun', admissions: 121, discharges: 117 },
  { month: 'Jul', admissions: 108, discharges: 112 },
  { month: 'Aug', admissions: 130, discharges: 125 },
  { month: 'Sep', admissions: 118, discharges: 122 },
  { month: 'Oct', admissions: 125, discharges: 119 },
  { month: 'Nov', admissions: 112, discharges: 108 },
  { month: 'Dec', admissions: 99,  discharges: 104 },
];

export const departmentStats: DepartmentStat[] = [
  { department: 'Cardiology',   patients: 284 },
  { department: 'Neurology',    patients: 198 },
  { department: 'Orthopedics',  patients: 175 },
  { department: 'Pediatrics',   patients: 231 },
  { department: 'Emergency',    patients: 312 },
  { department: 'Oncology',     patients: 84  },
];

export const outcomeStats: OutcomeStat[] = [
  { label: 'Recovered',  value: 62, color: '#10b981' },
  { label: 'Ongoing',    value: 24, color: '#3b82f6' },
  { label: 'Referred',   value: 9,  color: '#f59e0b' },
  { label: 'Deceased',   value: 5,  color: '#ef4444' },
];
