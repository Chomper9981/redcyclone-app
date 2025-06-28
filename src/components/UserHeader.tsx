import React from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from 'lucide-react';

interface UserHeaderProps {
  userName?: string;
  userAvatarUrl?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ userName = "User", userAvatarUrl }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40x40?text=Logo" // Placeholder logo URL
          alt="Company Logo"
          className="w-10 h-10 rounded-full" // Adjust styling as needed
        />
      </div>

      {/* Search Bar */}
      <div className="relative flex-grow mx-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* User Info (Name and Avatar) */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-800 dark:text-gray-200 font-medium hidden sm:block">
          {userName}
        </span>
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

export default UserHeader;