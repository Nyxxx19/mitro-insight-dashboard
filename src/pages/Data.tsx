
import React, { useState } from 'react';
import { useDataUmumData, useDataUmumById } from '@/hooks/useDataUmumData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Data = () => {
  const [selectedDataId, setSelectedDataId] = useState<number | null>(null);
  const { data: dataUmum, isLoading, error } = useDataUmumData();
  const { data: selectedData, isLoading: isDataLoading } = useDataUmumById(selectedDataId || 0);

  const handleRowClick = (dataId: number) => {
    setSelectedDataId(dataId);
  };

  const handleCloseModal = () => {
    setSelectedDataId(null);
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
              <span className="text-sm">Manajemen Data Umum</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Umum</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {dataUmum && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Data</TableHead>
                        <TableHead>Nilai Data</TableHead>
                        <TableHead>Keterangan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataUmum.map((data) => (
                        <TableRow 
                          key={data.id_data} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(data.id_data)}
                        >
                          <TableCell>{data.id_data}</TableCell>
                          <TableCell>{data.nama_data || '-'}</TableCell>
                          <TableCell>{data.nilai_data || '-'}</TableCell>
                          <TableCell>{data.keterangan ? data.keterangan.substring(0, 50) + '...' : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedDataId}
                onClose={handleCloseModal}
                title="Detail Data Umum"
              >
                {isDataLoading && <LoadingSpinner />}
                {selectedData && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Data:</label>
                        <p className="text-gray-900">{selectedData.id_data}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nama Data:</label>
                        <p className="text-gray-900">{selectedData.nama_data || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nilai Data:</label>
                        <p className="text-gray-900">{selectedData.nilai_data || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Keterangan:</label>
                        <p className="text-gray-900">{selectedData.keterangan || '-'}</p>
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

export default Data;
