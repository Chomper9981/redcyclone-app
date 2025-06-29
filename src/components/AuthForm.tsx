import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
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
  const [rememberMe, setRememberMe] = useState(true); // State for "Remember me" checkbox
  const [loading, setLoading] = useState(false);

  // Update isLogin state when initialIsLogin prop changes
  useEffect(() => {
    setIsLogin(initialIsLogin);
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
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
      }
      if (onAuthSuccess) {
        onAuthSuccess(); // Call callback on success
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none"> {/* Remove card styling as it's now inside a dialog */}
      <CardContent className="p-0"> {/* Remove padding as dialog content handles it */}
        <form onSubmit={handleAuth} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLogin && ( // Only show "Remember me" for login
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