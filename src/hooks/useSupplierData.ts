
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Supplier {
  id_supplier: number;
  nama_supplier: string;
  alamat: string | null;
  kontak: string | null;
}

export const useSupplierData = () => {
  return useQuery({
    queryKey: ['supplier'],
    queryFn: async () => {
      console.log('Fetching supplier data...');
      const { data, error } = await supabase
        .from('supplier')
        .select('*')
        .order('nama_supplier');

      if (error) {
        console.error('Error fetching supplier:', error);
        throw error;
      }

      console.log('Supplier data fetched:', data);
      return data as Supplier[];
    },
  });
};

export const useSupplierById = (id: number) => {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: async () => {
      console.log('Fetching supplier detail for id:', id);
      const { data, error } = await supabase
        .from('supplier')
        .select('*')
        .eq('id_supplier', id)
        .single();

      if (error) {
        console.error('Error fetching supplier detail:', error);
        throw error;
      }

      console.log('Supplier detail fetched:', data);
      return data as Supplier;
    },
    enabled: !!id,
  });
};
