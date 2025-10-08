import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; // Import Link

interface ProfileOtherUserHeaderProps {
  userName?: string;
  userAvatarUrl?: string;
  currentUserQuocHon?: number; // Thêm prop cho Quốc Hồn của người dùng hiện tại
  userId: string; // Thêm userId
}

const ProfileOtherUserHeader: React.FC<ProfileOtherUserHeaderProps> = ({
  userName = "User",
  userAvatarUrl,
  currentUserQuocHon = 150, // Giá trị Quốc Hồn giả định cho người dùng hiện tại
  userId, // Nhận userId
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40x40?text=Logo" // Placeholder logo URL
          alt="Company Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Quốc Hồn và nút Tôi luyện Quốc Hồn */}
      <div className="flex items-center space-x-4 mx-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Quốc Hồn của bạn:</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{currentUserQuocHon}</p>
        </div>
        <Button variant="default" className="whitespace-nowrap">Tôi luyện Quốc Hồn</Button>
      </div>

      {/* Post, Notification Buttons and User Avatar */}
      <div className="flex items-center space-x-3">
        {/* Post Button */}
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <Plus size={20} />
        </Button>
        {/* Notification Button */}
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <Bell size={20} />
        </Button>
        {/* User Avatar */}
        <Link to={`/profile-user/${userId}`}> {/* Bọc Avatar bằng Link */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default ProfileOtherUserHeader;