import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import AccountTable from '@/components/AccountTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccountManagerAdmin: React.FC = () => {
  // Dữ liệu người dùng hiện tại (để hiển thị trên header)
  const currentUser = {
    name: "Admin",
    avatarUrl: "https://github.com/shadcn.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quản lý tài khoản</h2>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountManagerAdmin;