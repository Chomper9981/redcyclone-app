import React, { useState } from 'react';
import GuestHeader from '@/components/GuestHeader';
import ContentLayout from '@/components/ContentLayout'; // Import ContentLayout

const MenuGuest: React.FC = () => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  const guestSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
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
    >
      {/* Không có phần nội dung độc đáo nào cho MenuGuest */}
    </ContentLayout>
  );
};

export default MenuGuest;