import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PatientFilters } from '@/components/patients/PatientFilters';
import { ViewToggle } from '@/components/patients/ViewToggle';
import { PatientCard } from '@/components/patients/PatientCard';
import { PatientRow } from '@/components/patients/PatientRow';
import { PatientDetailModal } from '@/components/patients/PatientDetailModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Spinner } from '@/components/ui/Spinner';
import { usePatients } from '@/hooks/usePatients';
import { useUIStore } from '@/store/uiStore';
import { Patient } from '@/types/patient.types';

export default function PatientsPage() {
  const { filteredPatients, patients, selectedPatient, setSelected } = usePatients();
  const { patientView } = useUIStore();

  const handleViewDetails = (patient: Patient) => setSelected(patient);
  const handleCloseModal = () => setSelected(null);

  if (patients.length === 0) {
    return (
      <PageWrapper title="Patients" subtitle="Loading patient data...">
        <div className="flex items-center justify-center py-32">
          <Spinner size="lg" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      title="Patients"
      subtitle={`${patients.length} patients across all departments`}
      breadcrumbs={[{ label: 'HealthOS' }, { label: 'Patients' }]}
    >
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1 w-full">
          <PatientFilters />
        </div>
        <ViewToggle />
      </div>

      {/* Results */}
      {filteredPatients.length === 0 ? (
        <EmptyState
          title="No patients found"
          message="Try adjusting your search or filter criteria to find patients."
        />
      ) : patientView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {['Patient', 'Department', 'Status', 'Age / Gender', 'Last Visit', ''].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    onViewDetails={handleViewDetails}
                    isEven={index % 2 === 0}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>
      )}

      <PatientDetailModal patient={selectedPatient} onClose={handleCloseModal} />
    </PageWrapper>
  );
}
