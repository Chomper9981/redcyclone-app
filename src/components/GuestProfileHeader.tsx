import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthForm from '@/components/AuthForm'; // Import AuthForm

const GuestProfileHeader: React.FC = () => {
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

      {/* Spacer to push buttons to the right */}
      <div className="flex-grow mx-4"></div>

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

export default GuestProfileHeader;