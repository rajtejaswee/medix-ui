import React from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { useAnalytics } from '@/hooks/useAnalytics';

export const OutcomesPieChart: React.FC = () => {
  const { outcomeStats } = useAnalytics();

  return (
    <Card title="Treatment Outcomes" subtitle="Overall patient outcomes">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={outcomeStats}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            stroke="none"
          >
            {outcomeStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            formatter={(value: number) => [`${value}%`, 'Share']}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }}
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
