import React, { useState, useEffect } from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase'; // Import supabase client

const COOLDOWN_PERIOD_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
const LAST_PROFILE_UPDATE_KEY = 'last_profile_update_timestamp';

const EditBasicInfo: React.FC = () => {
  // Dữ liệu người dùng giả định, trong ứng dụng thực tế sẽ lấy từ ngữ cảnh xác thực
  const currentUser = {
    id: 'mock-user-id-123', // Thêm ID giả định cho người dùng
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png", // Avatar hiện tại
    nickname: "DyadUser", // Nickname hiện tại
    bio: "Chào mừng bạn đến với hồ sơ của tôi!", // Bio hiện tại
  };

  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [bio, setBio] = useState(currentUser.bio);
  const [loading, setLoading] = useState(false);
  const [canSave, setCanSave] = useState(true);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const lastSaveTimestamp = localStorage.getItem(LAST_PROFILE_UPDATE_KEY);
    if (lastSaveTimestamp) {
      const lastSaveTime = parseInt(lastSaveTimestamp, 10);
      const timeElapsed = Date.now() - lastSaveTime;
      if (timeElapsed < COOLDOWN_PERIOD_MS) {
        setCanSave(false);
        setCooldownRemaining(COOLDOWN_PERIOD_MS - timeElapsed);

        const timer = setInterval(() => {
          setCooldownRemaining((prev) => {
            if (prev <= 1000) { // Check if less than 1 second remaining
              clearInterval(timer);
              setCanSave(true);
              return 0;
            }
            return prev - 1000;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, []);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) return `${days} ngày ${hours} giờ`;
    if (hours > 0) return `${hours} giờ ${minutes} phút`;
    if (minutes > 0) return `${minutes} phút ${seconds} giây`;
    return `${seconds} giây`;
  };

  const handleSave = async () => {
    setLoading(true);
    let isValid = true;

    // Validate inputs
    if (nickname.trim().length === 0 || nickname.length > 32) {
      toast.error("Nickname không hợp lệ (không được trống và tối đa 32 ký tự).");
      isValid = false;
    }
    if (bio.length > 128) {
      toast.error("Giới thiệu không hợp lệ (tối đa 128 ký tự).");
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      // Simulate Avatar Upload
      if (selectedAvatarFile) {
        toast.info(`Đang tải lên avatar: ${selectedAvatarFile.name}`);
        // In a real application, you would upload the file to Supabase Storage here:
        // const { data: uploadData, error: uploadError } = await supabase.storage.from('avatars').upload(`public/${currentUser.id}/avatar.png`, selectedAvatarFile);
        // if (uploadError) throw uploadError;
        // const publicUrl = supabase.storage.from('avatars').getPublicUrl(`public/${currentUser.id}/avatar.png`).data.publicUrl;
        // Then update the profile with the new publicUrl
        setSelectedAvatarFile(null); // Clear selected file after "saving"
      }

      // Simulate updating nickname and bio
      toast.success("Thông tin cơ bản đã được cập nhật thành công!");
      // In a real application, you would update the user's profile in Supabase:
      // const { error: updateError } = await supabase.from('profiles').update({ nickname, bio }).eq('id', currentUser.id);
      // if (updateError) throw updateError;

      // Set Cooldown
      const now = Date.now();
      localStorage.setItem(LAST_PROFILE_UPDATE_KEY, now.toString());
      setCanSave(false);
      setCooldownRemaining(COOLDOWN_PERIOD_MS);

      // Simulate Email Notification and Log Generation
      toast.info("Một thông báo xác thực đã được gửi đến email của bạn.");
      toast.info("Log cập nhật hồ sơ đã được ghi lại.");

    } catch (error: any) {
      toast.error(`Lỗi khi cập nhật: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Cập nhật thông tin cơ bản</h2>

        {/* Hàng 1: Cập nhật Avatar */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cập nhật Avatar</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={selectedAvatarFile ? URL.createObjectURL(selectedAvatarFile) : currentUser.avatarUrl} alt="Avatar" />
              <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-3xl">
                {currentUser.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input id="avatar" type="file" accept="image/*" onChange={(e) => setSelectedAvatarFile(e.target.files ? e.target.files[0] : null)} />
            </div>
          </CardContent>
        </Card>

        {/* Hàng 2: Cập nhật Nickname */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cập nhật Nickname</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Label htmlFor="nickname" className="w-24 shrink-0">Nickname</Label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={32}
              className="flex-grow"
            />
          </CardContent>
        </Card>

        {/* Hàng 3: Cập nhật Giới thiệu */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cập nhật Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Label htmlFor="bio">Giới thiệu</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={128}
              rows={5}
              className="min-h-[100px]"
              placeholder="Viết một chút về bản thân bạn..."
            />
          </CardContent>
        </Card>

        {/* Nút lưu duy nhất */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleSave}
            disabled={loading || !canSave}
            className="w-full max-w-xs py-6 text-lg"
          >
            {loading ? "Đang lưu..." : canSave ? "Lưu tất cả thay đổi" : `Có thể lưu sau ${formatTime(cooldownRemaining)}`}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EditBasicInfo;