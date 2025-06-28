import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MenuGuest: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Chào mừng bạn đến với RedCyclone!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Khám phá những tin tức, hướng dẫn và trò chơi mới nhất.
          </p>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Bạn có thể đăng nhập để truy cập các tính năng đầy đủ hoặc tiếp tục khám phá với tư cách khách.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">Đăng nhập</Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg">Quay lại Trang chủ</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default MenuGuest;