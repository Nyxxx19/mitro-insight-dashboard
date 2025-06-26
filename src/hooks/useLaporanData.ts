
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Laporan {
  id_laporan: number;
  judul: string | null;
  isi: string | null;
  tanggal_laporan: string | null;
}

export const useLaporanData = () => {
  return useQuery({
    queryKey: ['laporan'],
    queryFn: async () => {
      console.log('Fetching laporan data...');
      const { data, error } = await supabase
        .from('laporan')
        .select('*')
        .order('tanggal_laporan', { ascending: false });

      if (error) {
        console.error('Error fetching laporan:', error);
        throw error;
      }

      console.log('Laporan data fetched:', data);
      return data as Laporan[];
    },
  });
};

export const useLaporanById = (id: number) => {
  return useQuery({
    queryKey: ['laporan', id],
    queryFn: async () => {
      console.log('Fetching laporan detail for id:', id);
      const { data, error } = await supabase
        .from('laporan')
        .select('*')
        .eq('id_laporan', id)
        .single();

      if (error) {
        console.error('Error fetching laporan detail:', error);
        throw error;
      }

      console.log('Laporan detail fetched:', data);
      return data as Laporan;
    },
    enabled: !!id,
  });
};
