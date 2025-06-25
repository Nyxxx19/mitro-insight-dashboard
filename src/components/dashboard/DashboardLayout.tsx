
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { OmzetChart } from './OmzetChart';
import { TransactionTable } from './TransactionTable';

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="text-gray-600">
              <span className="text-sm">Selamat datang di Dashboard Admin</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-gray-50 rounded-lg p-6">
              <Header />
              
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCards />
              </div>
              
              {/* Chart Section */}
              <div className="mb-8">
                <OmzetChart />
              </div>
              
              {/* Transaction Table */}
              <TransactionTable />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
