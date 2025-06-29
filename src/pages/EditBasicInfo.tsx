import React, { useState } from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from 'sonner';

const EditBasicInfo: React.FC = () => {
  // Dữ liệu người dùng giả định, trong ứng dụng thực tế sẽ lấy từ ngữ cảnh xác thực
  const currentUser = {
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png", // Avatar hiện tại
    nickname: "DyadUser", // Nickname hiện tại
    bio: "Chào mừng bạn đến với hồ sơ của tôi!", // Bio hiện tại
  };

  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [bio, setBio] = useState(currentUser.bio);

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedAvatarFile(event.target.files[0]);
    }
  };

  const handleSaveAvatar = () => {
    if (selectedAvatarFile) {
      toast.info(`Đang lưu avatar: ${selectedAvatarFile.name}`);
      // Logic thực tế để tải ảnh lên Supabase Storage và cập nhật URL avatar
      // Sau khi tải lên thành công, bạn sẽ cập nhật currentUser.avatarUrl
      // Ví dụ: const newAvatarUrl = await uploadAvatar(selectedAvatarFile);
      // Sau đó cập nhật state hoặc context của người dùng
      setSelectedAvatarFile(null); // Xóa file đã chọn sau khi lưu
    } else {
      toast.error("Vui lòng chọn một tệp ảnh.");
    }
  };

  const handleSaveNickname = () => {
    if (nickname.trim().length > 0 && nickname.length <= 32) {
      toast.success(`Nickname đã được cập nhật thành: ${nickname}`);
      // Logic thực tế để cập nhật nickname trong Supabase
    } else {
      toast.error("Nickname không hợp lệ (không được trống và tối đa 32 ký tự).");
    }
  };

  const handleSaveBio = () => {
    if (bio.length <= 128) {
      toast.success(`Giới thiệu đã được cập nhật: ${bio}`);
      // Logic thực tế để cập nhật bio trong Supabase
    } else {
      toast.error("Giới thiệu không hợp lệ (tối đa 128 ký tự).");
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
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarFileChange} />
              <Button onClick={handleSaveAvatar} disabled={!selectedAvatarFile}>Lưu Avatar</Button>
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
            <Button onClick={handleSaveNickname}>Lưu Nickname</Button>
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
            <Button onClick={handleSaveBio} className="self-end">Lưu Giới thiệu</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditBasicInfo;