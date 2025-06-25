
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { OmzetChart } from './OmzetChart';
import { TransactionTable } from './TransactionTable';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCards />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OmzetChart />
            <TransactionTable />
          </div>
        </main>
      </div>
    </div>
  );
};
