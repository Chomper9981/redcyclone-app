import React, { useState } from 'react';
import ProfileUserHeader from '@/components/ProfileUserHeader';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';
import FollowingList from '@/components/FollowingList';
import NotificationList from '@/components/NotificationList';

const ProfileUser: React.FC = () => {
  const [mainTab, setMainTab] = useState("news"); // State cho 5 tab chính
  const [subTab, setSubTab] = useState("latest"); // State cho 3 tab phụ

  // Dữ liệu người dùng giả định
  const currentUser = {
    name: "Người dùng Dyad",
    email: "user@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng. Họ yêu thích công nghệ và phát triển web.",
    avatarUrl: "https://github.com/shadcn.png",
    followers: 1234, // Thêm số người theo dõi giả định
    likes: 5678 // Thêm số lượt thích giả định
  };

  const profileMainTabOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "following", label: "Được theo dõi" },
    { value: "notifications", label: "Thông báo" },
  ];

  const profileSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Hồ sơ người dùng</h2>

        {/* Hàng chứa Avatar, Tên người dùng và Quốc Hồn */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20"> {/* Avatar lớn hơn */}
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-2xl">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {currentUser.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Số người theo dõi: {currentUser.followers}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lượt thích: {currentUser.likes}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Quốc Hồn:</p>
              <p className="text-lg text-gray-900 dark:text-gray-100">0</p> {/* Placeholder */}
            </div>
          </CardContent>
        </Card>

        {/* Hàng 3: Các tab chính (Tin tức, Game Guide, Dev Guide, Được theo dõi, Thông báo) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="news" value={mainTab} onValueChange={setMainTab}>
            <TabsList className="flex w-full flex-nowrap overflow-x-auto">
              {profileMainTabOptions.map(option => (
                <TabsTrigger key={option.value} value={option.value} className="flex-1 whitespace-nowrap">
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        {/* Hàng 4: Các tab phụ (Mới nhất, Hot nhất, Đang theo dõi) - chỉ hiển thị cho Tin tức, Game Guide, Dev Guide */}
        {(mainTab === "news" || mainTab === "guide" || mainTab === "dev-guide") && (
          <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Tabs defaultValue="latest" value={subTab} onValueChange={setSubTab}>
              <TabsList className="flex w-full flex-nowrap overflow-x-auto">
                {profileSubTabOptions.map(option => (
                  <TabsTrigger key={option.value} value={option.value} className="flex-1 whitespace-nowrap">
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </section>
        )}

        {/* Hàng 5: Nội dung chính dựa trên tab đã chọn */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {mainTab === "news" && "Tin tức mới nhất"}
            {mainTab === "guide" && "Hướng dẫn Game"}
            {mainTab === "dev-guide" && "Hướng dẫn Phát triển"}
            {mainTab === "following" && "Danh sách đang theo dõi"}
            {mainTab === "notifications" && "Thông báo của bạn"}
          </h3>
          {mainTab === "news" || mainTab === "guide" || mainTab === "dev-guide" ? (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Đang hiển thị nội dung cho: **{mainTab}** (phụ: **{subTab}**)
              </p>
              <ContentGridPlaceholder mainTab={mainTab} subTab={subTab} />
              <div className="flex justify-center mt-8">
                <PaginationComponent />
              </div>
            </>
          ) : mainTab === "following" ? (
            <FollowingList />
          ) : mainTab === "notifications" ? (
            <NotificationList />
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ProfileUser;