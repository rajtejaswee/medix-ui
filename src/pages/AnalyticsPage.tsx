import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { StatsSummary } from '@/components/analytics/StatsSummary';
import { AdmissionsChart } from '@/components/analytics/AdmissionsChart';
import { DepartmentChart } from '@/components/analytics/DepartmentChart';
import { OutcomesPieChart } from '@/components/analytics/OutcomesPieChart';

export default function AnalyticsPage() {
  return (
    <PageWrapper
      title="Analytics"
      subtitle="Performance overview for the last 12 months"
      breadcrumbs={[{ label: 'HealthOS' }, { label: 'Analytics' }]}
    >
      <StatsSummary />

      <div className="space-y-6">
        {/* Full-width admissions chart */}
        <AdmissionsChart />

        {/* Two-column charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <DepartmentChart />
          </div>
          <div className="lg:col-span-2">
            <OutcomesPieChart />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
