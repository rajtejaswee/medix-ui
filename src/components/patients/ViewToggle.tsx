import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import clsx from 'clsx';

export const ViewToggle: React.FC = () => {
  const { patientView, togglePatientView } = useUIStore();

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
      <button
        onClick={() => patientView !== 'grid' && togglePatientView()}
        id="grid-view-btn"
        aria-label="Grid view"
        className={clsx(
          'p-2 rounded-md transition-all',
          patientView === 'grid'
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => patientView !== 'list' && togglePatientView()}
        id="list-view-btn"
        aria-label="List view"
        className={clsx(
          'p-2 rounded-md transition-all',
          patientView === 'list'
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <List size={16} />
      </button>
    </div>
  );
};
