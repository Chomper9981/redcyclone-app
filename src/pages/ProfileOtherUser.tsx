import React from 'react';
import ProfileOtherUserHeader from '@/components/ProfileOtherUserHeader';
import ProfileLayout from '@/components/ProfileLayout';
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface ProfileOtherUserProps {
  userProfile: UserProfile; // Nhận userProfile của người dùng hiện tại
  isAdmin: boolean;
  userId: string; // Nhận userId của người dùng hiện tại
}

const ProfileOtherUser: React.FC<ProfileOtherUserProps> = ({ userProfile, isAdmin, userId }) => {
  // Dữ liệu người dùng khác giả định
  const otherUser = {
    name: "Người dùng Khác",
    email: "otheruser@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng khác.",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    followers: 5432,
    likes: 9876,
    isAdmin: false // Thêm thuộc tính isAdmin
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
      header={
        <ProfileOtherUserHeader
          userName={userProfile.nickname || userProfile.username || "Người dùng"}
          userAvatarUrl={userProfile.avatar_url || undefined}
          currentUserQuocHon={userProfile.quoc_hon}
          userId={userId} // Truyền userId của người dùng hiện tại
        />
      }
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