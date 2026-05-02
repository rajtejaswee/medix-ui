import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Patient, PatientStatus } from '@/types/patient.types';
import { useNotification } from '@/hooks/useNotification';
import {
  User, Phone, Mail, Droplets, Building2, Stethoscope, Calendar, BedDouble, FileText,
} from 'lucide-react';
import clsx from 'clsx';

interface PatientDetailModalProps {
  patient: Patient | null;
  onClose: () => void;
}

const statusVariant: Record<PatientStatus, 'success' | 'info' | 'neutral' | 'error'> = {
  active: 'success', admitted: 'info', discharged: 'neutral', critical: 'error',
};

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={14} className="text-gray-500" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
    </div>
  </div>
);

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({ patient, onClose }) => {
  const { notify } = useNotification();

  if (!patient) return null;

  const handleAction = (action: string) => {
    notify({ type: 'info', title: 'Coming Soon', message: `"${action}" feature will be available in the next release.` });
  };

  return (
    <Modal open={!!patient} onClose={onClose} size="lg">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-primary-900 to-primary-700">
        <Avatar name={patient.name} size="xl" colorSeed={patient.department} />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white">{patient.name}</h2>
          <p className="text-primary-200 text-sm mt-0.5">{patient.id} • {patient.department}</p>
        </div>
        <Badge variant={statusVariant[patient.status]} dot>
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </Badge>
      </div>

      <div className="px-6 py-4 space-y-6">
        {/* Personal info */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 divide-y divide-gray-50">
            <InfoRow icon={User}     label="Date of Birth" value={`${patient.dob} (${patient.age}y)`} />
            <InfoRow icon={User}     label="Gender"        value={patient.gender} />
            <InfoRow icon={Droplets} label="Blood Type"    value={patient.bloodType} />
            <InfoRow icon={Phone}    label="Contact"       value={patient.contact} />
            <InfoRow icon={Mail}     label="Email"         value={patient.email} />
          </div>
        </div>

        {/* Medical info */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Medical Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 divide-y divide-gray-50">
            <InfoRow icon={Building2}    label="Department"          value={patient.department} />
            <InfoRow icon={Stethoscope} label="Diagnosis"            value={patient.diagnosis} />
            <InfoRow icon={User}        label="Attending Physician"  value={patient.attendingDoctor} />
            <InfoRow icon={Calendar}    label="Admission Date"       value={new Date(patient.admissionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
            <InfoRow icon={BedDouble}   label="Room Number"          value={patient.roomNumber} />
          </div>
        </div>

        {/* Clinical notes */}
        {patient.notes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              <FileText size={12} className="inline mr-1" />
              Clinical Notes
            </h3>
            <div className="space-y-3">
              {patient.notes.slice(0, 3).map((note) => (
                <div key={note.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-700">{note.author}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(note.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={() => handleAction('Edit Patient')}
            id="edit-patient-btn"
            className="flex-1"
          >
            Edit Patient
          </Button>
          <Button
            variant="danger"
            onClick={() => handleAction('Discharge Patient')}
            id="discharge-patient-btn"
            className="flex-1"
          >
            Discharge
          </Button>
        </div>
      </div>
    </Modal>
  );
};
