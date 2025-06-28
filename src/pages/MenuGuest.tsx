import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import GuestHeader from '@/components/GuestHeader'; // Import GuestHeader

const MenuGuest: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <GuestHeader />
      <main className="flex-grow p-4 container mx-auto flex items-center justify-center">
        {/* Nội dung chính của trang khách có thể được thêm vào đây */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Chào mừng bạn đến với RedCyclone!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Khám phá những tin tức, hướng dẫn và trò chơi mới nhất.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
            Bạn có thể đăng nhập để truy cập các tính năng đầy đủ hoặc tiếp tục khám phá với tư cách khách.
          </p>
        </div>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default MenuGuest;