import React from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

        {/* Hàng chứa Avatar, Tên người dùng và Quốc Hồn */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20"> {/* Avatar lớn hơn */}
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-2xl">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {currentUser.name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Quốc Hồn:</p>
              <p className="text-lg text-gray-900 dark:text-gray-100">0</p> {/* Placeholder */}
            </div>
          </CardContent>
        </Card>

        {/* Các phần khác của hồ sơ có thể được thêm vào đây sau */}
        <Card>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Các thông tin khác về người dùng sẽ được hiển thị tại đây.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileUser;