import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import AccountTable from '@/components/AccountTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface AccountManagerAdminProps {
  userProfile: UserProfile;
  isAdmin: boolean;
  userId: string;
}

const AccountManagerAdmin: React.FC<AccountManagerAdminProps> = ({ userProfile, isAdmin, userId }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader
        userName={userProfile.nickname || userProfile.username || "Admin"}
        userAvatarUrl={userProfile.avatar_url || undefined}
        userId={userId} // Truyền userId
      />
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