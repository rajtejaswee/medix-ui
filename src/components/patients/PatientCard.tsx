import React from 'react';
import { Patient, PatientStatus } from '@/types/patient.types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Eye } from 'lucide-react';
import clsx from 'clsx';

interface PatientCardProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
}

const statusVariant: Record<PatientStatus, 'success' | 'info' | 'neutral' | 'error'> = {
  active:     'success',
  admitted:   'info',
  discharged: 'neutral',
  critical:   'error',
};

const deptColor: Record<string, string> = {
  Cardiology:   'bg-red-100 text-red-700',
  Neurology:    'bg-purple-100 text-purple-700',
  Orthopedics:  'bg-orange-100 text-orange-700',
  Pediatrics:   'bg-pink-100 text-pink-700',
  Emergency:    'bg-amber-100 text-amber-700',
  Oncology:     'bg-teal-100 text-teal-700',
};

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar name={patient.name} size="md" colorSeed={patient.department} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{patient.name}</p>
          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full mt-0.5">
            {patient.id}
          </span>
        </div>
        <Badge variant={statusVariant[patient.status]} dot>
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </Badge>
      </div>

      {/* Department */}
      <div className="flex items-center gap-2">
        <span className={clsx('px-2.5 py-1 rounded-full text-xs font-medium', deptColor[patient.department] || 'bg-gray-100 text-gray-600')}>
          {patient.department}
        </span>
        <span className="text-xs text-gray-500">{patient.age}y • {patient.gender}</span>
      </div>

      {/* Diagnosis */}
      <p className="text-xs text-gray-600 truncate" title={patient.diagnosis}>
        {patient.diagnosis}
      </p>

      {/* Last visit */}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Calendar size={12} />
        <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>

      {/* Action */}
      <Button
        variant="ghost"
        size="sm"
        icon={<Eye size={14} />}
        onClick={() => onViewDetails(patient)}
        className="w-full mt-1 border border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50"
        id={`view-patient-${patient.id}`}
      >
        View Details
      </Button>
    </div>
  );
};
