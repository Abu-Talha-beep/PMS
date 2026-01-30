'use client';

import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  type?: 'line' | 'area';
  title?: string;
}

const Chart = ({ data, type = 'line', title }: ChartProps) => {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Legend />
          {type === 'area' ? (
            <>
              <Area type="monotone" dataKey="sales" fill="#ec4899" stroke="#ec4899" />
              <Area type="monotone" dataKey="stock" fill="#06b6d4" stroke="#06b6d4" />
              <Area type="monotone" dataKey="users" fill="#f59e0b" stroke="#f59e0b" />
            </>
          ) : (
            <>
              <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} />
              <Line type="monotone" dataKey="stock" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={2} />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
