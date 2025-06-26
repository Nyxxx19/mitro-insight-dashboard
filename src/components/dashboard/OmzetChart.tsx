
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMitraOmzetData } from '@/hooks/useMitraData';

export const OmzetChart = () => {
  const { data: chartData, isLoading, error } = useMitraOmzetData();

  if (error) {
    console.error('Error in OmzetChart:', error);
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Laporan Omzet per Mitra BUMDes</h3>
        <div className="h-80 flex items-center justify-center bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Error loading chart data: {error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Laporan Omzet per Mitra BUMDes</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Laporan Omzet per Mitra BUMDes</h3>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Bulan Ini</option>
          <option>3 Bulan Terakhir</option>
          <option>6 Bulan Terakhir</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Omzet']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="omzet" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
