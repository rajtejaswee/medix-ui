import React from 'react';
import { Search, X } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { Input } from '@/components/ui/Input';

const STATUSES = ['all', 'active', 'admitted', 'discharged', 'critical'];
const DEPARTMENTS = ['all', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency', 'Oncology'];

export const PatientFilters: React.FC = () => {
  const { searchQuery, statusFilter, departmentFilter, setSearchQuery, setStatusFilter, setDeptFilter } = usePatients();

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || departmentFilter !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDeptFilter('all');
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex-1 min-w-48">
        <Input
          id="patient-search"
          placeholder="Search by name, ID, or diagnosis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={16} />}
          rightIcon={
            searchQuery ? (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            ) : null
          }
        />
      </div>

      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <select
        id="department-filter"
        value={departmentFilter}
        onChange={(e) => setDeptFilter(e.target.value)}
        className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
      >
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d}>
            {d === 'all' ? 'All Departments' : d}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 underline underline-offset-2"
          id="clear-filters"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
