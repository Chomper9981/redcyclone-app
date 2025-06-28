import React from 'react';
import ProfileOtherUserHeader from '@/components/ProfileOtherUserHeader';
import ProfileLayout from '@/components/ProfileLayout';

const ProfileOtherUser: React.FC = () => {
  // Dữ liệu người dùng khác giả định
  const otherUser = {
    name: "Người dùng Khác",
    email: "otheruser@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng khác.",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    followers: 5432,
    likes: 9876
  };

  // Dữ liệu người dùng hiện tại (để hiển thị trên header)
  const currentUser = {
    name: "Người dùng",
    avatarUrl: "https://github.com/shadcn.png",
    quocHon: 150 // Giả định Quốc Hồn của người dùng hiện tại
  };

  const profileMainTabOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "following", label: "Được theo dõi" },
  ];

  const profileSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
  ];

  return (
    <ProfileLayout
      header={<ProfileOtherUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} currentUserQuocHon={currentUser.quocHon} />}
      pageTitle="Hồ sơ người dùng khác"
      profileData={otherUser}
      isCurrentUserProfile={false}
      mainTabOptions={profileMainTabOptions}
      subTabOptions={profileSubTabOptions}
      showSubTabsSection={true} // Luôn hiển thị sub-tabs cho profile của người dùng khác
      showNotificationListContent={false} // Không có tab thông báo cho người dùng khác
      showFollowingListContent={true} // Có thể có danh sách đang theo dõi
    />
  );
};

export default ProfileOtherUser;