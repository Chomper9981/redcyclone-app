import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import { MadeWithDyad } from "@/components/made-with-dyad";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader userName="Dyad User" userAvatarUrl="https://github.com/shadcn.png" />
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Bảng điều khiển Admin</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Đây là khu vực nội dung chính của trang admin.
        </p>
        {/* You can add more content here later */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default AdminDashboard;