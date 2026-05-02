export type PatientStatus = 'active' | 'admitted' | 'discharged' | 'critical';
export type Department = 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics' | 'Emergency' | 'Oncology';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodType: BloodType;
  contact: string;
  email: string;
  department: Department;
  status: PatientStatus;
  diagnosis: string;
  attendingDoctor: string;
  admissionDate: string;
  lastVisit: string;
  roomNumber: string;
  notes: ClinicalNote[];
}

export interface ClinicalNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}
