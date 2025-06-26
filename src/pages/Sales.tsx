
import React, { useState } from 'react';
import { useSalesData, useSalesById } from '@/hooks/useSalesData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Sales = () => {
  const [selectedSalesId, setSelectedSalesId] = useState<number | null>(null);
  const { data: salesList, isLoading, error } = useSalesData();
  const { data: selectedSales, isLoading: isSalesLoading } = useSalesById(selectedSalesId || 0);

  const handleRowClick = (salesId: number) => {
    setSelectedSalesId(salesId);
  };

  const handleCloseModal = () => {
    setSelectedSalesId(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="text-gray-600">
              <span className="text-sm">Manajemen Sales</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Sales</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {salesList && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Sales</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Kontak</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesList.map((sales) => (
                        <TableRow 
                          key={sales.id_sales} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(sales.id_sales)}
                        >
                          <TableCell>{sales.id_sales}</TableCell>
                          <TableCell>{sales.nama_sales}</TableCell>
                          <TableCell>{sales.email || '-'}</TableCell>
                          <TableCell>{sales.kontak || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedSalesId}
                onClose={handleCloseModal}
                title="Detail Sales"
              >
                {isSalesLoading && <LoadingSpinner />}
                {selectedSales && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Sales:</label>
                        <p className="text-gray-900">{selectedSales.id_sales}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nama Sales:</label>
                        <p className="text-gray-900">{selectedSales.nama_sales}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Email:</label>
                        <p className="text-gray-900">{selectedSales.email || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Kontak:</label>
                        <p className="text-gray-900">{selectedSales.kontak || '-'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </DetailModal>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Sales;
