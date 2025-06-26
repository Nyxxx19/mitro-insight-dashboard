
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id_user: number;
  username: string;
  nama_lengkap: string | null;
  email: string | null;
  role: string | null;
  created_at: string | null;
}

export const useUsersData = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users data...');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('username');

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      console.log('Users data fetched:', data);
      return data as User[];
    },
  });
};

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      console.log('Fetching user detail for id:', id);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id_user', id)
        .single();

      if (error) {
        console.error('Error fetching user detail:', error);
        throw error;
      }

      console.log('User detail fetched:', data);
      return data as User;
    },
    enabled: !!id,
  });
};
