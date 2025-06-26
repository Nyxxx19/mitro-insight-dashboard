
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Produk {
  id_produk: number;
  nama_produk: string;
  kategori: string | null;
  harga: number | null;
  stok: number | null;
  deskripsi: string | null;
  id_supplier: number | null;
}

export const useProdukData = () => {
  return useQuery({
    queryKey: ['produk'],
    queryFn: async () => {
      console.log('Fetching produk data...');
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .order('nama_produk');

      if (error) {
        console.error('Error fetching produk:', error);
        throw error;
      }

      console.log('Produk data fetched:', data);
      return data as Produk[];
    },
  });
};

export const useProdukById = (id: number) => {
  return useQuery({
    queryKey: ['produk', id],
    queryFn: async () => {
      console.log('Fetching produk detail for id:', id);
      const { data, error } = await supabase
        .from('produk')
        .select('*')
        .eq('id_produk', id)
        .single();

      if (error) {
        console.error('Error fetching produk detail:', error);
        throw error;
      }

      console.log('Produk detail fetched:', data);
      return data as Produk;
    },
    enabled: !!id,
  });
};
