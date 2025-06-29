import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthForm from '@/components/AuthForm'; // Import AuthForm

const GuestHeader: React.FC = () => {
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login'); // 'login' or 'register'

  const handleAuthSuccess = () => {
    setOpenAuthDialog(false); // Close the dialog on successful authentication
  };

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

      {/* Search Bar */}
      <div className="relative flex-grow mx-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Login/Register Buttons */}
      <div className="flex items-center space-x-3">
        <Dialog open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setAuthMode('login')}>Đăng nhập</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={() => setAuthMode('register')}>Đăng ký</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{authMode === 'login' ? "Đăng nhập" : "Đăng ký"}</DialogTitle>
              <DialogDescription>
                {authMode === 'login' ? "Nhập email và mật khẩu của bạn để đăng nhập." : "Tạo tài khoản mới."}
              </DialogDescription>
            </DialogHeader>
            <AuthForm initialIsLogin={authMode === 'login'} onAuthSuccess={handleAuthSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default GuestHeader;