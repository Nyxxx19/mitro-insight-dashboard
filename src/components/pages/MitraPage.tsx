
import React, { useState } from 'react';
import { useMitraData } from '@/hooks/useMitraData';
import { AddMitraForm } from '@/components/forms/AddMitraForm';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export const MitraPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: mitraData, isLoading, error } = useMitraData();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = async (id: number, nama: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus mitra "${nama}"?`)) {
      return;
    }

    try {
      console.log('Deleting mitra with id:', id);
      
      const { error } = await supabase
        .from('mitra_bumdes')
        .delete()
        .eq('id_mitra', id);

      if (error) {
        console.error('Error deleting mitra:', error);
        throw error;
      }

      console.log('Mitra deleted successfully');
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['mitra'] });
      queryClient.invalidateQueries({ queryKey: ['mitra-omzet'] });
      
      toast({
        title: "Berhasil",
        description: `Mitra "${nama}" berhasil dihapus`,
      });
    } catch (error: any) {
      console.error('Failed to delete mitra:', error);
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus mitra",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading mitra data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Data Mitra</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mitra</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nama Mitra</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">NIK</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Alamat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">No HP</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Loading data mitra...
                  </td>
                </tr>
              ) : mitraData && mitraData.length > 0 ? (
                mitraData.map((mitra) => (
                  <tr key={mitra.id_mitra} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {mitra.nama_mitra}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mitra.nik}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                      {mitra.alamat}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mitra.no_hp}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(mitra.id_mitra, mitra.nama_mitra)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Belum ada data mitra
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <AddMitraForm onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
};
