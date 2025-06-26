
import React, { useState } from 'react';
import { useSupplierData, useSupplierById } from '@/hooks/useSupplierData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const Supplier = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const { data: suppliers, isLoading, error } = useSupplierData();
  const { data: selectedSupplier, isLoading: isSupplierLoading } = useSupplierById(selectedSupplierId || 0);

  const handleRowClick = (supplierId: number) => {
    setSelectedSupplierId(supplierId);
  };

  const handleCloseModal = () => {
    setSelectedSupplierId(null);
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
              <span className="text-sm">Manajemen Supplier</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data Supplier</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {suppliers && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Supplier</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Kontak</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow 
                          key={supplier.id_supplier} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(supplier.id_supplier)}
                        >
                          <TableCell>{supplier.id_supplier}</TableCell>
                          <TableCell>{supplier.nama_supplier}</TableCell>
                          <TableCell>{supplier.alamat || '-'}</TableCell>
                          <TableCell>{supplier.kontak || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedSupplierId}
                onClose={handleCloseModal}
                title="Detail Supplier"
              >
                {isSupplierLoading && <LoadingSpinner />}
                {selectedSupplier && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID Supplier:</label>
                        <p className="text-gray-900">{selectedSupplier.id_supplier}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nama Supplier:</label>
                        <p className="text-gray-900">{selectedSupplier.nama_supplier}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Alamat:</label>
                        <p className="text-gray-900">{selectedSupplier.alamat || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Kontak:</label>
                        <p className="text-gray-900">{selectedSupplier.kontak || '-'}</p>
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

export default Supplier;
