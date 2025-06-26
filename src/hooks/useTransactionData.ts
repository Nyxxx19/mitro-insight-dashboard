
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TransactionData {
  id_transaksi: number;
  total_harga: number;
  tanggal: string;
  mitra_bumdes?: {
    nama_mitra: string;
    nik: string;
    alamat: string;
    no_hp: string;
  };
}

export const useTransactionData = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      console.log('Fetching transaction data...');
      const { data, error } = await supabase
        .from('transaksi')
        .select(`
          id_transaksi,
          total_harga,
          tanggal,
          mitra_bumdes:id_mitra (
            nama_mitra,
            nik,
            alamat,
            no_hp
          )
        `)
        .order('tanggal', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      console.log('Transaction data fetched:', data);
      return data as TransactionData[];
    },
  });
};

export const useTransactionStats = () => {
  return useQuery({
    queryKey: ['transaction-stats'],
    queryFn: async () => {
      console.log('Fetching transaction stats...');
      
      // Get total omzet
      const { data: totalData, error: totalError } = await supabase
        .from('transaksi')
        .select('total_harga');

      if (totalError) {
        console.error('Error fetching total:', totalError);
        throw totalError;
      }

      // Calculate stats
      const totalOmzet = totalData?.reduce((sum, item) => sum + (item.total_harga || 0), 0) || 0;
      const totalTransaksi = totalData?.length || 0;
      const rataRataTransaksi = totalTransaksi > 0 ? totalOmzet / totalTransaksi : 0;
      const transaksiTertinggi = Math.max(...(totalData?.map(item => item.total_harga || 0) || [0]));

      const stats = {
        totalOmzet,
        totalTransaksi,
        rataRataTransaksi,
        transaksiTertinggi
      };

      console.log('Transaction stats calculated:', stats);
      return stats;
    },
  });
};
