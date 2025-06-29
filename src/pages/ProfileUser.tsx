import React from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import ProfileLayout from '@/components/ProfileLayout';

const ProfileUser: React.FC = () => {
  // Dữ liệu người dùng giả định
  const currentUser = {
    name: "Người dùng Dyad",
    email: "user@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng. Họ yêu thích công nghệ và phát triển web.", // Thêm bio
    avatarUrl: "https://github.com/shadcn.png",
    followers: 1234,
    likes: 5678,
    quocHon: 0, // Placeholder
    isAdmin: true // Thêm thuộc tính isAdmin
  };

  const profileMainTabOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "game", label: "Game" }, // Updated tab label
    { value: "following", label: "Được theo dõi" },
    { value: "notifications", label: "Thông báo" },
  ];

  const profileSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  return (
    <ProfileLayout
      header={<ProfileUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />}
      pageTitle="Hồ sơ người dùng"
      profileData={currentUser}
      isCurrentUserProfile={true}
      mainTabOptions={profileMainTabOptions}
      subTabOptions={profileSubTabOptions}
      showSubTabsSection={true} // Luôn hiển thị sub-tabs cho profile của người dùng hiện tại
      showNotificationListContent={true}
      showFollowingListContent={true}
    />
  );
};

export default ProfileUser;