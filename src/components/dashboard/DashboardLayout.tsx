
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

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
              <div className="text-center text-gray-500 mt-20">
                <h2 className="text-2xl font-semibold mb-2">Area Konten Utama</h2>
                <p>Konten dashboard akan ditampilkan di sini</p>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
