import React from 'react';
import { Eye } from 'lucide-react';
import { Patient, PatientStatus } from '@/types/patient.types';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import clsx from 'clsx';

interface PatientRowProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
  isEven?: boolean;
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

export const PatientRow: React.FC<PatientRowProps> = ({ patient, onViewDetails, isEven }) => {
  return (
    <tr className={clsx('border-b border-gray-100 hover:bg-blue-50/30 transition-colors', isEven ? 'bg-gray-50/60' : 'bg-white')}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={patient.name} size="sm" colorSeed={patient.department} />
          <div>
            <p className="text-sm font-medium text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-400">{patient.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium', deptColor[patient.department] || 'bg-gray-100 text-gray-600')}>
          {patient.department}
        </span>
      </td>
      <td className="px-4 py-3">
        <Badge variant={statusVariant[patient.status]} dot size="sm">
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {patient.age}y • {patient.gender}
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        {new Date(patient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onViewDetails(patient)}
          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          id={`row-view-patient-${patient.id}`}
          aria-label={`View details for ${patient.name}`}
        >
          <Eye size={16} />
        </button>
      </td>
    </tr>
  );
};
