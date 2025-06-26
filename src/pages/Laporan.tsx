
import React, { useState } from 'react';
import { useLaporanData, useLaporanById } from '@/hooks/useLaporanData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Laporan = () => {
  const [selectedLaporanId, setSelectedLaporanId] = useState<number | null>(null);
  const { data: laporan, isLoading, error } = useLaporanData();
  const { data: selectedLaporan, isLoading: isLaporanLoading } = useLaporanById(selectedLaporanId || 0);

  const handleRowClick = (laporanId: number) => {
    setSelectedLaporanId(laporanId);
  };

  const handleCloseModal = () => {
    setSelectedLaporanId(null);
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
              <span className="text-sm">Manajemen Laporan</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Laporan</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {laporan && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Tanggal Laporan</TableHead>
                        <TableHead>Isi (Preview)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {laporan.map((item) => (
                        <TableRow 
                          key={item.id_laporan} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(item.id_laporan)}
                        >
                          <TableCell>{item.id_laporan}</TableCell>
                          <TableCell>{item.judul || '-'}</TableCell>
                          <TableCell>{item.tanggal_laporan ? new Date(item.tanggal_laporan).toLocaleDateString() : '-'}</TableCell>
                          <TableCell>{item.isi ? item.isi.substring(0, 50) + '...' : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedLaporanId}
                onClose={handleCloseModal}
                title="Detail Laporan"
              >
                {isLaporanLoading && <LoadingSpinner />}
                {selectedLaporan && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Laporan:</label>
                        <p className="text-gray-900">{selectedLaporan.id_laporan}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Judul:</label>
                        <p className="text-gray-900">{selectedLaporan.judul || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Tanggal Laporan:</label>
                        <p className="text-gray-900">{selectedLaporan.tanggal_laporan ? new Date(selectedLaporan.tanggal_laporan).toLocaleDateString() : '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Isi Laporan:</label>
                        <div className="bg-gray-50 p-3 rounded-md mt-1">
                          <p className="text-gray-900 whitespace-pre-wrap">{selectedLaporan.isi || '-'}</p>
                        </div>
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

export default Laporan;
