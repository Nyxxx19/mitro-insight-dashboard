
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MitraData {
  id_mitra: number;
  nama_mitra: string;
  nik: string;
  alamat: string;
  no_hp: string;
  deskripsi?: string;
}

export const useMitraData = () => {
  return useQuery({
    queryKey: ['mitra'],
    queryFn: async () => {
      console.log('Fetching mitra data...');
      const { data, error } = await supabase
        .from('mitra_bumdes')
        .select('*')
        .order('nama_mitra');

      if (error) {
        console.error('Error fetching mitra:', error);
        throw error;
      }

      console.log('Mitra data fetched:', data);
      return data as MitraData[];
    },
  });
};

export const useMitraOmzetData = () => {
  return useQuery({
    queryKey: ['mitra-omzet'],
    queryFn: async () => {
      console.log('Fetching mitra omzet data...');
      const { data, error } = await supabase
        .from('transaksi')
        .select(`
          total_harga,
          mitra_bumdes:id_mitra (
            nama_mitra
          )
        `);

      if (error) {
        console.error('Error fetching mitra omzet:', error);
        throw error;
      }

      // Group by mitra and calculate total omzet
      const groupedData = data?.reduce((acc: any, item: any) => {
        const mitraName = item.mitra_bumdes?.nama_mitra || 'Unknown';
        if (!acc[mitraName]) {
          acc[mitraName] = 0;
        }
        acc[mitraName] += item.total_harga || 0;
        return acc;
      }, {});

      // Convert to array format for chart
      const chartData = Object.entries(groupedData || {}).map(([name, omzet]) => ({
        name,
        omzet
      }));

      console.log('Mitra omzet data processed:', chartData);
      return chartData;
    },
  });
};
