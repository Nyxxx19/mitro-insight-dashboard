
import React, { useState } from 'react';
import { useTransactionData } from '@/hooks/useTransactionData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Transaksi = () => {
  const [selectedTransaksi, setSelectedTransaksi] = useState<any>(null);
  const { data: transaksi, isLoading, error } = useTransactionData();

  const handleRowClick = (transaksiData: any) => {
    setSelectedTransaksi(transaksiData);
  };

  const handleCloseModal = () => {
    setSelectedTransaksi(null);
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
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
              <span className="text-sm">Manajemen Transaksi</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Transaksi</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {transaksi && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Nama Mitra</TableHead>
                        <TableHead>Total Harga</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>NIK</TableHead>
                        <TableHead>No HP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transaksi.map((item) => (
                        <TableRow 
                          key={item.id_transaksi} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(item)}
                        >
                          <TableCell>{item.id_transaksi}</TableCell>
                          <TableCell>{item.mitra_bumdes?.nama_mitra || '-'}</TableCell>
                          <TableCell>{formatCurrency(item.total_harga)}</TableCell>
                          <TableCell>{item.tanggal ? new Date(item.tanggal).toLocaleDateString() : '-'}</TableCell>
                          <TableCell>{item.mitra_bumdes?.nik || '-'}</TableCell>
                          <TableCell>{item.mitra_bumdes?.no_hp || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedTransaksi}
                onClose={handleCloseModal}
                title="Detail Transaksi"
              >
                {selectedTransaksi && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Transaksi:</label>
                        <p className="text-gray-900">{selectedTransaksi.id_transaksi}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Total Harga:</label>
                        <p className="text-gray-900">{formatCurrency(selectedTransaksi.total_harga)}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Tanggal:</label>
                        <p className="text-gray-900">{selectedTransaksi.tanggal ? new Date(selectedTransaksi.tanggal).toLocaleDateString() : '-'}</p>
                      </div>
                    </div>
                    
                    {selectedTransaksi.mitra_bumdes && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Informasi Mitra</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="font-medium text-gray-700">Nama Mitra:</label>
                            <p className="text-gray-900">{selectedTransaksi.mitra_bumdes.nama_mitra}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-700">NIK:</label>
                            <p className="text-gray-900">{selectedTransaksi.mitra_bumdes.nik}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-700">Alamat:</label>
                            <p className="text-gray-900">{selectedTransaksi.mitra_bumdes.alamat}</p>
                          </div>
                          <div>
                            <label className="font-medium text-gray-700">No HP:</label>
                            <p className="text-gray-900">{selectedTransaksi.mitra_bumdes.no_hp}</p>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Transaksi;
