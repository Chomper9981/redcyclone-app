import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; // Import Link

interface ProfileUserHeaderProps {
  userName?: string;
  userAvatarUrl?: string;
}

const ProfileUserHeader: React.FC<ProfileUserHeaderProps> = ({ userName = "User", userAvatarUrl }) => {
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

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mx-4">
        <Link to="/edit-profile"> {/* Thay đổi Button thành Link */}
          <Button variant="outline" className="whitespace-nowrap">Sửa thông tin cá nhân</Button>
        </Link>
        <Button className="whitespace-nowrap">Tôi luyện Quốc Hồn</Button>
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
        <Avatar className="h-9 w-9">
          <AvatarImage src={userAvatarUrl} alt={userName} />
          <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default ProfileUserHeader;