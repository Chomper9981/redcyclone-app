import React, { useState } from 'react';
import GuestHeader from '@/components/GuestHeader';
import ContentLayout from '@/components/ContentLayout'; // Import ContentLayout

const MenuGuest: React.FC = () => {
  const [mainTab, setMainTab] = useState("game"); // Đặt mặc định là 'game'
  const [subTab, setSubTab] = useState("latest");

  const guestSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  const guestMainTabOptions = [ // Thêm mainTabOptions cho MenuGuest
    { value: "game", label: "Game" },
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-share", label: "Dev Share" },
  ];

  return (
    <ContentLayout
      headerComponent={<GuestHeader />}
      title="Khám phá nội dung"
      mainTab={mainTab}
      setMainTab={setMainTab}
      subTab={subTab}
      setSubTab={setSubTab}
      subTabOptions={guestSubTabOptions}
      mainTabOptions={guestMainTabOptions} // Truyền mainTabOptions vào ContentLayout
    >
      {/* Không có phần nội dung độc đáo nào cho MenuGuest */}
    </ContentLayout>
  );
};

export default MenuGuest;