import React, { useEffect } from 'react';
import AuthForm from '@/components/AuthForm';
import { useSession } from '@/contexts/SessionContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { session, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) {
      // Nếu không còn loading và có session, chuyển hướng đến trang người dùng với ID
      navigate(`/menu-user/${session.user.id}`, { replace: true });
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        Đang tải...
      </div>
    );
  }

  // AuthForm trong LoginPage không cần onAuthSuccess vì LoginPage đã tự xử lý chuyển hướng
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthForm />
    </div>
  );
};

export default LoginPage;