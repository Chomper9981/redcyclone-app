import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ArrowLeft, Plus } from 'lucide-react'; // Import Plus icon
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PostViewHeaderProps {
  userName?: string;
  userAvatarUrl?: string;
}

const PostViewHeader: React.FC<PostViewHeaderProps> = ({ userName = "User", userAvatarUrl }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to the create post page
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Back Button and Logo */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full w-9 h-9">
          <ArrowLeft size={20} />
        </Button>
        <img
          src="https://via.placeholder.com/40x40?text=Logo" // Placeholder logo URL
          alt="Company Logo"
          className="w-10 h-10"
        />
      </div>

      {/* Spacer để đẩy các nút sang phải */}
      <div className="flex-grow mx-4"></div>

      {/* Post, Notification Buttons and User Avatar */}
      <div className="flex items-center space-x-3">
        {/* Post Button */}
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9" onClick={handleCreatePost}>
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

export default PostViewHeader;