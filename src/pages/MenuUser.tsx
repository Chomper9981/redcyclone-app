import React, { useState } from 'react';
import UserHeader from '@/components/UserHeader';
import { Button } from "@/components/ui/button";
import ContentLayout from '@/components/ContentLayout'; // Import ContentLayout

const MenuUser: React.FC = () => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  // Dữ liệu người dùng giả định, trong ứng dụng thực tế sẽ lấy từ ngữ cảnh xác thực
  const currentUser = {
    name: "Người dùng",
    avatarUrl: "https://github.com/shadcn.png"
  };

  const userSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  return (
    <ContentLayout
      headerComponent={<UserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />}
      title="Khám phá nội dung"
      mainTab={mainTab}
      setMainTab={setMainTab}
      subTab={subTab}
      setSubTab={setSubTab}
      subTabOptions={userSubTabOptions}
    >
      {/* Hàng mới: Chức năng đăng bài */}
      <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Đăng bài mới</h3>
        <Button>Tạo bài viết mới</Button>
      </section>
    </ContentLayout>
  );
};

export default MenuUser;