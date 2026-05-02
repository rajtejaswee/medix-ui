import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Calendar, FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useNotification } from '@/hooks/useNotification';

const ACTIONS = [
  { id: 'add-patient',      icon: UserPlus,    label: 'Add Patient',      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',   route: null },
  { id: 'schedule-review',  icon: Calendar,    label: 'Schedule Review',  color: 'bg-purple-50 text-purple-600 hover:bg-purple-100', route: null },
  { id: 'generate-report',  icon: FileText,    label: 'Generate Report',  color: 'bg-green-50 text-green-600 hover:bg-green-100',  route: null },
  { id: 'view-alerts',      icon: AlertCircle, label: 'View Alerts',      color: 'bg-red-50 text-red-600 hover:bg-red-100',       route: '/patients' },
];

export const QuickActions: React.FC = () => {
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleAction = (action: typeof ACTIONS[0]) => {
    if (action.route) {
      navigate(action.route);
    } else {
      notify({
        type: 'info',
        title: 'Coming Soon',
        message: `"${action.label}" feature will be available in the next release.`,
      });
    }
  };

  return (
    <Card title="Quick Actions">
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={action.id}
              onClick={() => handleAction(action)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${action.color} group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
