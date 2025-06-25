
import React from 'react';

const transactionData = [
  {
    id: 1,
    namaMitra: 'BUMDes Sejahtera',
    nik: '1234567890123456',
    alamat: 'Jl. Raya No. 123, Desa Makmur',
    noHp: '081234567890',
    jumlahTransaksi: 'Rp 2.500.000'
  },
  {
    id: 2,
    namaMitra: 'BUMDes Mandiri',
    nik: '1234567890123457',
    alamat: 'Jl. Merdeka No. 456, Desa Sukses',
    noHp: '081234567891',
    jumlahTransaksi: 'Rp 1.750.000'
  },
  {
    id: 3,
    namaMitra: 'BUMDes Berkah',
    nik: '1234567890123458',
    alamat: 'Jl. Pancasila No. 789, Desa Jaya',
    noHp: '081234567892',
    jumlahTransaksi: 'Rp 3.200.000'
  },
  {
    id: 4,
    namaMitra: 'BUMDes Makmur',
    nik: '1234567890123459',
    alamat: 'Jl. Diponegoro No. 321, Desa Maju',
    noHp: '081234567893',
    jumlahTransaksi: 'Rp 1.890.000'
  },
  {
    id: 5,
    namaMitra: 'BUMDes Jaya',
    nik: '1234567890123460',
    alamat: 'Jl. Sudirman No. 654, Desa Bahagia',
    noHp: '081234567894',
    jumlahTransaksi: 'Rp 2.100.000'
  }
];

export const TransactionTable = () => {
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
            {transactionData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">{item.namaMitra}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.nik}</td>
                <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{item.alamat}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.noHp}</td>
                <td className="py-3 px-4 text-sm text-gray-800 font-medium">{item.jumlahTransaksi}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
