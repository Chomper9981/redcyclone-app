import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProfileUserHeader from '@/components/ProfileUserHeader';

const EditProfile: React.FC = () => {
  // Dữ liệu người dùng giả định, trong ứng dụng thực tế sẽ lấy từ ngữ cảnh xác thực
  const currentUser = {
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Sửa thông tin cá nhân</h2>

        <div className="flex flex-col space-y-4 max-w-md mx-auto">
          <Link to="/edit-profile/basic-info" className="w-full">
            <Button className="w-full py-6 text-lg">Cập nhật thông tin cơ bản</Button>
          </Link>
          <Link to="/edit-profile/password" className="w-full">
            <Button className="w-full py-6 text-lg">Cập nhật mật khẩu</Button>
          </Link>
          <Link to="/edit-profile/email" className="w-full">
            <Button className="w-full py-6 text-lg">Cập nhật Email</Button>
          </Link>
          <Link to="/edit-profile/cccd" className="w-full">
            <Button className="w-full py-6 text-lg">Cập nhật CCCD</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;