import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const GuestProfileHeader: React.FC = () => {
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

      {/* Spacer to push buttons to the right */}
      <div className="flex-grow mx-4"></div>

      {/* Login/Register Buttons */}
      <div className="flex items-center space-x-3">
        <Link to="/login">
          <Button variant="outline">Đăng nhập</Button>
        </Link>
        <Link to="/register"> {/* Assuming a /register route will be added later */}
          <Button>Đăng ký</Button>
        </Link>
      </div>
    </header>
  );
};

export default GuestProfileHeader;