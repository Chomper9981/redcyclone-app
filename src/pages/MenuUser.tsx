import React, { useState } from 'react';
import UserHeader from '@/components/UserHeader';
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
      {/* Phần nội dung độc đáo của MenuUser (nếu có) sẽ được thêm vào đây sau */}
    </ContentLayout>
  );
};

export default MenuUser;