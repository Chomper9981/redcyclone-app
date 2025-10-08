import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSession } from '@/contexts/SessionContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Định nghĩa kiểu dữ liệu cho Profile
export interface UserProfile {
  id: string;
  username: string | null;
  nickname: string;
  avatar_url: string | null;
  bio: string | null;
  followers_count: number;
  likes_count: number;
  quoc_hon: number;
  isadmin: boolean;
  qr_codes?: string[] | null; // Thêm thuộc tính qr_codes
}

interface AuthGuardProps {
  component: React.ComponentType<{ userProfile: UserProfile; isAdmin: boolean; userId: string }>;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component }) => {
  const { session, loading: sessionLoading } = useSession();
  const { userId: routeUserId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchOrCreateUserProfile = async () => {
      if (sessionLoading) return;

      if (!session) {
        toast.error("Bạn cần đăng nhập để truy cập trang này.");
        navigate('/login', { replace: true });
        return;
      }

      const currentUserId = session.user?.id;
      const currentUserEmail = session.user?.email;

      // Nếu route có userId và nó không khớp với userId của session, chuyển hướng về trang của người dùng hiện tại
      if (routeUserId && routeUserId !== currentUserId) {
        toast.warning("Bạn đang cố gắng truy cập hồ sơ của người dùng khác. Đang chuyển hướng về hồ sơ của bạn.");
        navigate(`/menu-user/${currentUserId}`, { replace: true });
        return;
      }

      // Nếu không có routeUserId, sử dụng currentUserId từ session
      const targetUserId = routeUserId || currentUserId;

      if (!targetUserId) {
        toast.error("Không tìm thấy ID người dùng.");
        navigate('/login', { replace: true });
        return;
      }

      setProfileLoading(true);
      let profileData: UserProfile | null = null;

      // Thử lấy hồ sơ hiện có
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 nghĩa là "không tìm thấy hàng nào"
        console.error("Lỗi khi tải hồ sơ người dùng:", error);
        toast.error("Không thể tải dữ liệu hồ sơ. Vui lòng thử lại.");
        navigate('/login', { replace: true });
        setProfileLoading(false);
        return;
      }

      if (data) {
        profileData = data;
      } else {
        // Không tìm thấy hồ sơ, tạo một hồ sơ mặc định
        console.warn(`Profile not found for user ${targetUserId}. Creating a default profile.`);
        const defaultNickname = currentUserEmail ? currentUserEmail.split('@')[0] : "Người dùng mới";
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: targetUserId,
            nickname: defaultNickname,
            username: null, // Có thể là null
            avatar_url: null,
            bio: null,
            followers_count: 0,
            likes_count: 0,
            quoc_hon: 0,
            isadmin: false,
            qr_codes: [], // Khởi tạo mảng rỗng cho qr_codes
          })
          .select()
          .single();

        if (insertError) {
          console.error("Lỗi khi tạo hồ sơ mặc định:", insertError);
          toast.error("Không thể tạo hồ sơ mặc định. Vui lòng thử lại.");
          navigate('/login', { replace: true });
          setProfileLoading(false);
          return;
        }
        profileData = newProfile;
        toast.info("Hồ sơ mặc định đã được tạo cho bạn.");
      }

      if (profileData) {
        setUserProfile(profileData);
        setIsAdmin(profileData.isadmin);
      }
      setProfileLoading(false);
    };

    fetchOrCreateUserProfile();
  }, [session, sessionLoading, routeUserId, navigate]);

  if (sessionLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        Đang tải dữ liệu người dùng...
      </div>
    );
  }

  if (!session || !userProfile) {
    // Đã xử lý chuyển hướng ở trên, nhưng để đảm bảo không render nội dung không mong muốn
    return null;
  }

  return <Component userProfile={userProfile} isAdmin={isAdmin} userId={userProfile.id} />;
};

export default AuthGuard;