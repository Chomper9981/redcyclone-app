import React from 'react';
import GuestProfileHeader from '@/components/GuestProfileHeader';
import ProfileLayout from '@/components/ProfileLayout';

const ProfileOtherUserForGuest: React.FC = () => {
  // Dữ liệu người dùng khác giả định
  const otherUser = {
    name: "Người dùng Khác",
    email: "otheruser@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng khác.",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    followers: 5432,
    likes: 9876
  };

  const profileMainTabOptions = [
    { value: "game", label: "Game" }, // Game lên đầu
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-share", label: "Dev Share" }, // Đổi tên
    { value: "following", label: "Được theo dõi" },
  ];

  const profileSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
  ];

  return (
    <ProfileLayout
      header={<GuestProfileHeader />}
      pageTitle="Hồ sơ người dùng khác"
      profileData={otherUser}
      isCurrentUserProfile={false}
      mainTabOptions={profileMainTabOptions}
      subTabOptions={profileSubTabOptions}
      showSubTabsSection={true} // Luôn hiển thị sub-tabs cho profile của người dùng khác
      showNotificationListContent={false} // Không có tab thông báo cho khách
      showFollowingListContent={true} // Có thể có danh sách đang theo dõi
    />
  );
};

export default ProfileOtherUserForGuest;