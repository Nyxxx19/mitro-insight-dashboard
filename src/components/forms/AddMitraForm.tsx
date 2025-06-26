
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface AddMitraFormProps {
  onClose: () => void;
}

export const AddMitraForm = ({ onClose }: AddMitraFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_mitra: '',
    nik: '',
    alamat: '',
    no_hp: '',
    deskripsi: ''
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Adding new mitra:', formData);
      
      const { data, error } = await supabase
        .from('mitra_bumdes')
        .insert([formData])
        .select();

      if (error) {
        console.error('Error adding mitra:', error);
        throw error;
      }

      console.log('Mitra added successfully:', data);
      
      // Refresh the mitra data
      queryClient.invalidateQueries({ queryKey: ['mitra'] });
      queryClient.invalidateQueries({ queryKey: ['mitra-omzet'] });
      
      toast({
        title: "Berhasil",
        description: "Mitra baru berhasil ditambahkan",
      });

      onClose();
    } catch (error: any) {
      console.error('Failed to add mitra:', error);
      toast({
        title: "Error",
        description: error.message || "Gagal menambahkan mitra",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Tambah Mitra Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Mitra
            </label>
            <input
              type="text"
              name="nama_mitra"
              value={formData.nama_mitra}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIK
            </label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No HP
            </label>
            <input
              type="text"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
