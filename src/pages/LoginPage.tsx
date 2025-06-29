import React, { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import { useSession } from '@/contexts/SessionContext'; // Import useSession
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage: React.FC = () => {
  const { session, loading } = useSession(); // Sử dụng hook useSession
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) {
      // Nếu không còn loading và có session, chuyển hướng đến trang người dùng
      navigate('/menu-user', { replace: true }); // Chuyển hướng đến trang mặc định cho người dùng
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        Đang tải...
      </div>
    ); // Hiển thị trạng thái tải trong khi kiểm tra session
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthForm />
    </div>
  );
};

export default LoginPage;