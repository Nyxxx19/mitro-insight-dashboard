
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DataUmum {
  id_data: number;
  nama_data: string | null;
  nilai_data: string | null;
  keterangan: string | null;
}

export const useDataUmumData = () => {
  return useQuery({
    queryKey: ['data_umum'],
    queryFn: async () => {
      console.log('Fetching data umum...');
      const { data, error } = await supabase
        .from('data_umum')
        .select('*')
        .order('nama_data');

      if (error) {
        console.error('Error fetching data umum:', error);
        throw error;
      }

      console.log('Data umum fetched:', data);
      return data as DataUmum[];
    },
  });
};

export const useDataUmumById = (id: number) => {
  return useQuery({
    queryKey: ['data_umum', id],
    queryFn: async () => {
      console.log('Fetching data umum detail for id:', id);
      const { data, error } = await supabase
        .from('data_umum')
        .select('*')
        .eq('id_data', id)
        .single();

      if (error) {
        console.error('Error fetching data umum detail:', error);
        throw error;
      }

      console.log('Data umum detail fetched:', data);
      return data as DataUmum;
    },
    enabled: !!id,
  });
};
