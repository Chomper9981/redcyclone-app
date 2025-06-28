import React from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfileUser: React.FC = () => {
  // Dữ liệu người dùng giả định
  const currentUser = {
    name: "Người dùng Dyad",
    email: "user@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng. Họ yêu thích công nghệ và phát triển web.",
    avatarUrl: "https://github.com/shadcn.png"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Hồ sơ người dùng</h2>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tên:</p>
                <p className="text-lg text-gray-900 dark:text-gray-100">{currentUser.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</p>
                <p className="text-lg text-gray-900 dark:text-gray-100">{currentUser.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Giới thiệu:</p>
                <p className="text-lg text-gray-900 dark:text-gray-100">{currentUser.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Các phần khác của hồ sơ có thể được thêm vào đây */}
        <Card>
          <CardHeader>
            <CardTitle>Bài viết của tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Chưa có bài viết nào được đăng.</p>
            {/* Đây sẽ là nơi hiển thị danh sách bài viết của người dùng */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileUser;