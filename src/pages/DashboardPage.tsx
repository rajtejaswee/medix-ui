import React, { useEffect } from 'react';
import { Users, UserPlus, ClipboardList, AlertTriangle } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { KPICard } from '@/components/dashboard/KPICard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useNotification } from '@/hooks/useNotification';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const { notify } = useNotification();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      notify({
        type: 'warning',
        title: 'Critical Alert',
        message: 'Patient John Carter (ID: P-0042) requires immediate review.',
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Doctor';

  return (
    <PageWrapper
      title="Dashboard"
      subtitle={`Welcome back, ${displayName}`}
      breadcrumbs={[{ label: 'HealthOS' }, { label: 'Dashboard' }]}
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Total Patients"
          value="1,284"
          delta="+12% this month"
          deltaType="positive"
          icon={Users}
          iconColor="blue"
        />
        <KPICard
          label="Admitted Today"
          value="34"
          delta="+3 from yesterday"
          deltaType="positive"
          icon={UserPlus}
          iconColor="green"
        />
        <KPICard
          label="Pending Reviews"
          value="18"
          delta="-5 from last week"
          deltaType="positive"
          icon={ClipboardList}
          iconColor="yellow"
        />
        <KPICard
          label="Critical Cases"
          value="7"
          delta="+2 from yesterday"
          deltaType="negative"
          icon={AlertTriangle}
          iconColor="red"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </PageWrapper>
  );
}
