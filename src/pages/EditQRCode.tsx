import React from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import QRCodeManager from '@/components/QRCodeManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/components/AuthGuard'; // Import UserProfile type

interface EditQRCodeProps {
  userProfile: UserProfile;
  isAdmin: boolean;
  userId: string;
}

const EditQRCode: React.FC<EditQRCodeProps> = ({ userProfile, isAdmin, userId }) => {
  // Sử dụng qr_codes từ userProfile, nếu không có thì mặc định là mảng rỗng
  const userQrCodes = userProfile.qr_codes || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileUserHeader userName={userProfile.nickname || userProfile.username || "Người dùng"} userAvatarUrl={userProfile.avatar_url || undefined} userId={userId} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Cập nhật Mã QR</h2>

        <QRCodeManager userId={userId} initialQrCodeUrls={userQrCodes.filter(Boolean) as string[]} />
      </main>
    </div>
  );
};

export default EditQRCode;