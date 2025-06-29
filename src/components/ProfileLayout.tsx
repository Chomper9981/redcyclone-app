import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import CardHeader, CardTitle
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';
import FollowingList from '@/components/FollowingList';
import NotificationList from '@/components/NotificationList';
import { toast } from 'sonner'; // Import toast from sonner
import { Badge } from "@/components/ui/badge"; // Import Badge

interface ProfileLayoutProps {
  header: React.ReactNode;
  pageTitle: string;
  profileData: {
    name: string;
    avatarUrl: string;
    followers: number;
    likes: number;
    quocHon?: number; // Only for current user's profile
    isAdmin?: boolean; // Add isAdmin property
    bio?: string; // Thêm thuộc tính bio
  };
  isCurrentUserProfile: boolean;
  mainTabOptions: { value: string; label: string }[];
  subTabOptions: { value: string; label: string }[];
  showSubTabsSection: boolean;
  showNotificationListContent: boolean; // Controls if NotificationList is rendered
  showFollowingListContent: boolean; // Controls if FollowingList is rendered
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  header,
  pageTitle,
  profileData,
  isCurrentUserProfile,
  mainTabOptions,
  subTabOptions,
  showSubTabsSection,
  showNotificationListContent,
  showFollowingListContent,
}) => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  const handleGuestAction = () => {
    toast.info("Cần đăng nhập để dùng chức năng này");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {header}
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{pageTitle}</h2>

        {/* Hàng chứa Avatar, Tên người dùng và các nút hành động/Quốc Hồn */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.avatarUrl} alt={profileData.name} />
                <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-2xl">
                  {profileData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {profileData.name}
                  {profileData.isAdmin && (
                    <Badge variant="secondary" className="ml-2 bg-blue-500 text-white">Admin</Badge>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Số người theo dõi: {profileData.followers}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lượt thích: {profileData.likes}
                </p>
              </div>
            </div>
            {isCurrentUserProfile ? (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Quốc Hồn:</p>
                <p className="text-lg text-gray-900 dark:text-gray-100">{profileData.quocHon || 0}</p>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="default" onClick={handleGuestAction}>Theo dõi</Button>
                <Button variant="outline" onClick={handleGuestAction}>Gửi gắm Quốc Hồn</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hàng mới: Bio của người dùng */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              {profileData.bio && profileData.bio.trim() !== ""
                ? profileData.bio
                : "Người dùng chưa có giới thiệu về bản thân"}
            </p>
          </CardContent>
        </Card>

        {/* Hàng 3: Các tab chính */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="news" value={mainTab} onValueChange={setMainTab}>
            <TabsList className="flex w-full flex-nowrap overflow-x-auto">
              {mainTabOptions.map(option => (
                <TabsTrigger key={option.value} value={option.value} className="flex-1 whitespace-nowrap">
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        {/* Hàng 4: Các tab phụ - chỉ hiển thị nếu showSubTabsSection là true */}
        {showSubTabsSection && (
          <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Tabs defaultValue="latest" value={subTab} onValueChange={setSubTab}>
              <TabsList className="flex w-full flex-nowrap overflow-x-auto">
                {subTabOptions.map(option => (
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
            {mainTab === "game" && "Game"} {/* Updated tab title */}
            {mainTab === "following" && "Danh sách đang theo dõi"}
            {mainTab === "notifications" && "Thông báo của bạn"}
          </h3>
          {(mainTab === "news" || mainTab === "guide" || mainTab === "dev-guide" || mainTab === "game") ? (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Đang hiển thị nội dung cho: **{mainTab}** (phụ: **{subTab}**)
              </p>
              <ContentGridPlaceholder mainTab={mainTab} subTab={subTab} />
              <div className="flex justify-center mt-8">
                <PaginationComponent />
              </div>
            </>
          ) : mainTab === "following" && showFollowingListContent ? (
            <FollowingList />
          ) : mainTab === "notifications" && showNotificationListContent ? (
            <NotificationList />
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ProfileLayout;