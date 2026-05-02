import React from 'react';
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis,
  Tooltip, Legend,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { useAnalytics } from '@/hooks/useAnalytics';

export const AdmissionsChart: React.FC = () => {
  const { monthlyAdmissions } = useAnalytics();

  return (
    <Card title="Monthly Admissions vs Discharges" subtitle="12-month overview">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyAdmissions} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            itemStyle={{ fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }} />
          <Line
            type="monotone"
            dataKey="admissions"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            name="Admissions"
          />
          <Line
            type="monotone"
            dataKey="discharges"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            name="Discharges"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
