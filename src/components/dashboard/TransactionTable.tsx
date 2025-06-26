
import React from 'react';
import { useTransactionData } from '@/hooks/useTransactionData';

export const TransactionTable = () => {
  const { data: transactionData, isLoading, error } = useTransactionData();

  if (error) {
    console.error('Error in TransactionTable:', error);
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Transaksi Mitra</h3>
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-600">Error loading transaction data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Data Transaksi Mitra</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium">
          Lihat Semua
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Nama Mitra</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">NIK</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Alamat</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">No HP</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Jumlah Transaksi</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Loading transaction data...
                </td>
              </tr>
            ) : transactionData && transactionData.length > 0 ? (
              transactionData.map((item) => (
                <tr key={item.id_transaksi} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                    {item.mitra_bumdes?.nama_mitra || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {item.mitra_bumdes?.nik || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                    {item.mitra_bumdes?.alamat || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {item.mitra_bumdes?.no_hp || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                    Rp {item.total_harga?.toLocaleString('id-ID') || '0'}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        Detail
                      </button>
                      <button className="text-green-600 hover:text-green-800 transition-colors duration-200">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No transaction data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
