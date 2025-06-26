
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Sales {
  id_sales: number;
  nama_sales: string;
  email: string | null;
  kontak: string | null;
}

export const useSalesData = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      console.log('Fetching sales data...');
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('nama_sales');

      if (error) {
        console.error('Error fetching sales:', error);
        throw error;
      }

      console.log('Sales data fetched:', data);
      return data as Sales[];
    },
  });
};

export const useSalesById = (id: number) => {
  return useQuery({
    queryKey: ['sales', id],
    queryFn: async () => {
      console.log('Fetching sales detail for id:', id);
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .eq('id_sales', id)
        .single();

      if (error) {
        console.error('Error fetching sales detail:', error);
        throw error;
      }

      console.log('Sales detail fetched:', data);
      return data as Sales;
    },
    enabled: !!id,
  });
};
