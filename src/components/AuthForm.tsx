import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthFormProps {
  initialIsLogin?: boolean;
  onAuthSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialIsLogin = true, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [nickname, setNickname] = useState(''); // New state for nickname
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(initialIsLogin);
    // Reset fields when switching between login/register
    setEmail('');
    setPassword('');
    setUsername('');
    setNickname('');
  }, [initialIsLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Đăng nhập thành công!");
      } else {
        // Validation for registration fields
        if (email.trim() === '' || password.trim() === '' || nickname.trim() === '') {
          toast.error("Email, Mật khẩu và Tên hiển thị không được để trống.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username.trim() === '' ? null : username, // Pass null if username is empty
              nickname: nickname,
            },
          },
        });
        if (error) throw error;
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      }
      if (onAuthSuccess) {
        onAuthSuccess();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleAuth} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu <span className="text-red-500">*</span></Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && ( // Only show these fields for registration
            <>
              <div className="grid gap-2">
                <Label htmlFor="username">Tên tài khoản</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Tên tài khoản của bạn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nickname">Tên hiển thị <span className="text-red-500">*</span></Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Tên hiển thị của bạn"
                  required // HTML5 required attribute
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </>
          )}
          {isLogin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <Label htmlFor="remember-me">Nhớ đăng nhập</Label>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang xử lý..." : (isLogin ? "Đăng nhập" : "Đăng ký")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="p-0 h-auto">
            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;