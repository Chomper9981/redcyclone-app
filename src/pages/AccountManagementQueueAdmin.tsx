import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface AccountManagementQueueAdminProps {
  userProfile: UserProfile;
  isAdmin: boolean;
  userId: string;
}

const AccountManagementQueueAdmin: React.FC<AccountManagementQueueAdminProps> = ({ userProfile, isAdmin, userId }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader
        userName={userProfile.nickname || userProfile.username || "Admin"}
        userAvatarUrl={userProfile.avatar_url || undefined}
        userId={userId} // Truyền userId
      />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Hàng chờ quản lí</h2>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách các yêu cầu quản lí</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Đây là nơi hiển thị các yêu cầu quản lí tài khoản.
              Chức năng này sẽ được phát triển sau.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountManagementQueueAdmin;