import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react'; // Chỉ import Bell icon
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; // Import Link

interface CreatePostHeaderProps {
  userName?: string;
  userAvatarUrl?: string;
  userId: string; // Thêm userId
}

const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({ userName = "User", userAvatarUrl, userId }) => {
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

      {/* Spacer để đẩy các nút sang phải */}
      <div className="flex-grow mx-4"></div>

      {/* Notification Button and User Avatar */}
      <div className="flex items-center space-x-3">
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

export default CreatePostHeader;