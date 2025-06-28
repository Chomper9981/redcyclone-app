import React from 'react';
import AuthForm from '@/components/AuthForm';
import { MadeWithDyad } from "@/components/made-with-dyad";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <AuthForm />
      <MadeWithDyad />
    </div>
  );
};

export default LoginPage;