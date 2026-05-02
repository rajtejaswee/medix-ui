export interface MonthlyData {
  month: string;
  admissions: number;
  discharges: number;
}

export interface DepartmentStat {
  department: string;
  patients: number;
}

export interface OutcomeStat {
  label: string;
  value: number;
  color: string;
}
