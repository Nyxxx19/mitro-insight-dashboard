
import React, { useState } from 'react';
import { useProdukData, useProdukById } from '@/hooks/useProdukData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Produk = () => {
  const [selectedProdukId, setSelectedProdukId] = useState<number | null>(null);
  const { data: produk, isLoading, error } = useProdukData();
  const { data: selectedProduk, isLoading: isProdukLoading } = useProdukById(selectedProdukId || 0);

  const handleRowClick = (produkId: number) => {
    setSelectedProdukId(produkId);
  };

  const handleCloseModal = () => {
    setSelectedProdukId(null);
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
              <span className="text-sm">Manajemen Produk</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Produk</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {produk && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Produk</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Supplier ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {produk.map((item) => (
                        <TableRow 
                          key={item.id_produk} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(item.id_produk)}
                        >
                          <TableCell>{item.id_produk}</TableCell>
                          <TableCell>{item.nama_produk}</TableCell>
                          <TableCell>{item.kategori || '-'}</TableCell>
                          <TableCell>{formatCurrency(item.harga)}</TableCell>
                          <TableCell>{item.stok || 0}</TableCell>
                          <TableCell>{item.id_supplier || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedProdukId}
                onClose={handleCloseModal}
                title="Detail Produk"
              >
                {isProdukLoading && <LoadingSpinner />}
                {selectedProduk && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Produk:</label>
                        <p className="text-gray-900">{selectedProduk.id_produk}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nama Produk:</label>
                        <p className="text-gray-900">{selectedProduk.nama_produk}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Kategori:</label>
                        <p className="text-gray-900">{selectedProduk.kategori || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Harga:</label>
                        <p className="text-gray-900">{formatCurrency(selectedProduk.harga)}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Stok:</label>
                        <p className="text-gray-900">{selectedProduk.stok || 0}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Supplier ID:</label>
                        <p className="text-gray-900">{selectedProduk.id_supplier || '-'}</p>
                      </div>
                    </div>
                    {selectedProduk.deskripsi && (
                      <div>
                        <label className="font-medium text-gray-700">Deskripsi:</label>
                        <p className="text-gray-900 mt-1">{selectedProduk.deskripsi}</p>
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

export default Produk;
