
import React from 'react';
import { BarChart, Users, FileText, Database } from 'lucide-react';
import { useTransactionStats } from '@/hooks/useTransactionData';

export const StatsCards = () => {
  const { data: stats, isLoading, error } = useTransactionStats();

  if (error) {
    console.error('Error in StatsCards:', error);
    return (
      <div className="col-span-4 bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading statistics: {error.message}</p>
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total Omzet',
      value: isLoading ? 'Loading...' : `Rp ${(stats?.totalOmzet || 0).toLocaleString('id-ID')}`,
      change: '+12.5%',
      icon: BarChart,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Jumlah Transaksi',
      value: isLoading ? 'Loading...' : (stats?.totalTransaksi || 0).toLocaleString('id-ID'),
      change: '+8.2%',
      icon: FileText,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Rata-rata Transaksi',
      value: isLoading ? 'Loading...' : `Rp ${Math.round(stats?.rataRataTransaksi || 0).toLocaleString('id-ID')}`,
      change: '+15.3%',
      icon: Database,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Transaksi Tertinggi',
      value: isLoading ? 'Loading...' : `Rp ${(stats?.transaksiTertinggi || 0).toLocaleString('id-ID')}`,
      change: '+5.7%',
      icon: Users,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <>
      {statsData.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.change}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
