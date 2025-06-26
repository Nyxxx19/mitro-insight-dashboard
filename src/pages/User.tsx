
import React, { useState } from 'react';
import { useUsersData, useUserById } from '@/hooks/useUsersData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DetailModal } from '@/components/common/DetailModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';

const User = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: users, isLoading, error } = useUsersData();
  const { data: selectedUser, isLoading: isUserLoading } = useUserById(selectedUserId || 0);

  const handleRowClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <div className="text-gray-600">
              <span className="text-sm">Manajemen User</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="min-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Data User</h1>
              
              {isLoading && <LoadingSpinner />}
              
              {error && <ErrorMessage message={error.message} />}
              
              {users && (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow 
                          key={user.id_user} 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleRowClick(user.id_user)}
                        >
                          <TableCell>{user.id_user}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.nama_lengkap || '-'}</TableCell>
                          <TableCell>{user.email || '-'}</TableCell>
                          <TableCell>{user.role || '-'}</TableCell>
                          <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <DetailModal
                isOpen={!!selectedUserId}
                onClose={handleCloseModal}
                title="Detail User"
              >
                {isUserLoading && <LoadingSpinner />}
                {selectedUser && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-gray-700">ID User:</label>
                        <p className="text-gray-900">{selectedUser.id_user}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Username:</label>
                        <p className="text-gray-900">{selectedUser.username}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Nama Lengkap:</label>
                        <p className="text-gray-900">{selectedUser.nama_lengkap || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Email:</label>
                        <p className="text-gray-900">{selectedUser.email || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Role:</label>
                        <p className="text-gray-900">{selectedUser.role || '-'}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Tanggal Dibuat:</label>
                        <p className="text-gray-900">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : '-'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </DetailModal>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default User;
