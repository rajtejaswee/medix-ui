import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis,
  Tooltip, Cell,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { useAnalytics } from '@/hooks/useAnalytics';

const DEPT_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#14b8a6', '#f59e0b'];

export const DepartmentChart: React.FC = () => {
  const { departmentStats } = useAnalytics();

  return (
    <Card title="Patients by Department" subtitle="Current patient distribution">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={departmentStats}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis
            dataKey="department"
            type="category"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="patients" name="Patients" radius={[0, 6, 6, 0]}>
            {departmentStats.map((_, index) => (
              <Cell key={`cell-${index}`} fill={DEPT_COLORS[index % DEPT_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
