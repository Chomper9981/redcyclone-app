import React from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import ProfileLayout from '@/components/ProfileLayout';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface ProfileUserProps {
  userProfile: UserProfile;
  isAdmin: boolean;
  userId: string;
}

const ProfileUser: React.FC<ProfileUserProps> = ({ userProfile, isAdmin, userId }) => {
  // Sử dụng qr_codes từ userProfile, nếu không có thì mặc định là mảng rỗng
  const userQrCodes = userProfile.qr_codes || [];

  const profileMainTabOptions = [
    { value: "game", label: "Game" },
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-share", label: "Dev Share" },
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
      header={<ProfileUserHeader userName={userProfile.nickname || userProfile.username || "Người dùng"} userAvatarUrl={userProfile.avatar_url || undefined} userId={userId} />}
      pageTitle="Hồ sơ người dùng"
      profileData={{
        name: userProfile.nickname || userProfile.username || "Người dùng",
        avatarUrl: userProfile.avatar_url || undefined,
        followers: userProfile.followers_count,
        likes: userProfile.likes_count,
        quocHon: userProfile.quoc_hon,
        isAdmin: userProfile.isadmin,
        bio: userProfile.bio,
      }}
      isCurrentUserProfile={true}
      mainTabOptions={profileMainTabOptions}
      subTabOptions={profileSubTabOptions}
      showSubTabsSection={true}
      showNotificationListContent={true}
      showFollowingListContent={true}
    >
      {/* Thêm QRCodeDisplay ngay sau phần giới thiệu */}
      <QRCodeDisplay qrCodeUrls={userQrCodes.filter(Boolean) as string[]} />
    </ProfileLayout>
  );
};

export default ProfileUser;