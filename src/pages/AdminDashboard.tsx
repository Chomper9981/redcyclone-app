import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Button } from "@/components/ui/button";
import ContentLayout from '@/components/ContentLayout'; // Import ContentLayout

const AdminDashboard: React.FC = () => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  const adminSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "pending", label: "Đang đợi duyệt" },
  ];

  return (
    <ContentLayout
      headerComponent={<AdminHeader userName="Dyad User" userAvatarUrl="https://github.com/shadcn.png" />}
      title="Bảng điều khiển Admin"
      mainTab={mainTab}
      setMainTab={setMainTab}
      subTab={subTab}
      setSubTab={setSubTab}
      subTabOptions={adminSubTabOptions}
    >
      {/* Hàng: Quản lí accounts */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Quản lý</h3>
        <Button variant="secondary">Quản lí Accounts</Button>
      </section>
    </ContentLayout>
  );
};

export default AdminDashboard;