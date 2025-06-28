import React, { useState } from 'react';
import ProfileOtherUserHeader from '@/components/ProfileOtherUserHeader'; // Sử dụng header mới
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';
import FollowingList from '@/components/FollowingList';

const ProfileOtherUser: React.FC = () => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  // Dữ liệu người dùng khác giả định
  const otherUser = {
    name: "Người dùng Khác",
    email: "otheruser@example.com",
    bio: "Đây là một đoạn giới thiệu ngắn về người dùng khác.",
    avatarUrl: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    followers: 5432,
    likes: 9876
  };

  // Dữ liệu người dùng hiện tại (để hiển thị trên header)
  const currentUser = {
    name: "Người dùng",
    avatarUrl: "https://github.com/shadcn.png",
    quocHon: 150 // Giả định Quốc Hồn của người dùng hiện tại
  };

  const profileMainTabOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "following", label: "Được theo dõi" },
  ];

  const profileSubTabOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <ProfileOtherUserHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} currentUserQuocHon={currentUser.quocHon} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Hồ sơ người dùng khác</h2>

        {/* Hàng chứa Avatar, Tên người dùng và các nút hành động */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
                <AvatarFallback className="bg-blue-500 dark:bg-blue-600 text-white text-2xl">
                  {otherUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {otherUser.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Số người theo dõi: {otherUser.followers}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lượt thích: {otherUser.likes}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="default">Theo dõi</Button>
              <Button variant="outline">Gửi gắm Quốc Hồn</Button>
            </div>
          </CardContent>
        </Card>

        {/* Hàng 3: Các tab chính (Tin tức, Game Guide, Dev Guide, Được theo dõi) */}
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

        {/* Hàng 4: Các tab phụ (Mới nhất, Hot nhất) - chỉ hiển thị cho Tin tức, Game Guide, Dev Guide */}
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
            {mainTab === "following" && "Danh sách người dùng đang theo dõi"}
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
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ProfileOtherUser;