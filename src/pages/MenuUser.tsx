import React, { useState } from 'react';
import UserHeader from '@/components/UserHeader';
import AdminHeader from '@/components/AdminHeader'; // Import AdminHeader
import ContentLayout from '@/components/ContentLayout';
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface MenuUserProps {
  userProfile: UserProfile;
  isAdmin: boolean;
  userId: string;
}

const MenuUser: React.FC<MenuUserProps> = ({ userProfile, isAdmin, userId }) => {
  const [mainTab, setMainTab] = useState("game");
  const [subTab, setSubTab] = useState("latest");

  const userSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  const userMainTabOptions = [
    { value: "game", label: "Game" },
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-share", label: "Dev Share" },
  ];

  return (
    <ContentLayout
      headerComponent={
        isAdmin ? (
          <AdminHeader
            userName={userProfile.nickname || userProfile.username || "Admin"}
            userAvatarUrl={userProfile.avatar_url || undefined}
            userId={userId} // Truyền userId
          />
        ) : (
          <UserHeader
            userName={userProfile.nickname || userProfile.username || "Người dùng"}
            userAvatarUrl={userProfile.avatar_url || undefined}
            userId={userId} // Truyền userId
          />
        )
      }
      title="Khám phá nội dung"
      mainTab={mainTab}
      setMainTab={setMainTab}
      subTab={subTab}
      setSubTab={setSubTab}
      subTabOptions={userSubTabOptions}
      mainTabOptions={userMainTabOptions}
    >
      {/* Phần nội dung độc đáo của MenuUser (nếu có) sẽ được thêm vào đây sau */}
    </ContentLayout>
  );
};

export default MenuUser;