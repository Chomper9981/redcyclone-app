import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountDeletionQueueAdmin: React.FC = () => {
  const currentUser = {
    name: "Admin",
    avatarUrl: "https://github.com/shadcn.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Hàng chờ xóa tài khoản</h2>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản đang chờ xóa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Đây là nơi hiển thị các tài khoản đang trong hàng chờ xóa.
              Chức năng này sẽ được phát triển sau.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountDeletionQueueAdmin;