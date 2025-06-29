import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Button } from "@/components/ui/button";
import ContentLayout from '@/components/ContentLayout';
import { Link } from 'react-router-dom';

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
      {/* Hàng: Quản lí accounts và log */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Quản lý</h3>
        <div className="flex space-x-4"> {/* Sử dụng flexbox để các nút nằm cạnh nhau */}
          <Link to="/admin/account-manager">
            <Button variant="secondary">Quản lí Accounts</Button>
          </Link>
          <Link to="/admin/log-manager"> {/* Thêm Link đến trang quản lý log */}
            <Button variant="secondary">Quản lí Log</Button>
          </Link>
        </div>
      </section>
    </ContentLayout>
  );
};

export default AdminDashboard;