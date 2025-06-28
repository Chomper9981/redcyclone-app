import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AdminHeader userName="Dyad User" userAvatarUrl="https://github.com/shadcn.png" />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Bảng điều khiển Admin</h2>

        {/* Hàng thứ 2: Đổi mật khẩu */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Cài đặt tài khoản</h3>
          <Button>Đổi mật khẩu</Button>
        </section>

        {/* Hàng thứ 3: Quản lí accounts */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Quản lý</h3>
          <Button variant="secondary">Quản lí Accounts</Button>
        </section>

        {/* Hàng thứ 4: 4 tab chính */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="news">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="news">Tin tức</TabsTrigger>
              <TabsTrigger value="guide">Guide</TabsTrigger>
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="official">Official</TabsTrigger>
            </TabsList>
            <TabsContent value="news" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Nội dung Tin tức sẽ hiển thị ở đây.</p>
            </TabsContent>
            <TabsContent value="guide" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Nội dung Guide sẽ hiển thị ở đây.</p>
            </TabsContent>
            <TabsContent value="game" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Nội dung Game sẽ hiển thị ở đây.</p>
            </TabsContent>
            <TabsContent value="official" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Nội dung Official sẽ hiển thị ở đây.</p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Hàng thứ 5: 3 tab phụ */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="latest">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="latest">Mới nhất</TabsTrigger>
              <TabsTrigger value="hot">Hot nhất</TabsTrigger>
              <TabsTrigger value="pending">Đang đợi duyệt</TabsTrigger>
            </TabsList>
            <TabsContent value="latest" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Danh sách nội dung mới nhất.</p>
            </TabsContent>
            <TabsContent value="hot" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Danh sách nội dung hot nhất.</p>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Danh sách nội dung đang đợi duyệt.</p>
            </TabsContent>
          </Tabs>
        </section>

        {/* Hàng thứ 6: List placeholder */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Danh sách nội dung</h3>
          <ContentGridPlaceholder />
        </section>

        {/* Hàng thứ 7: Pagination */}
        <section className="flex justify-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <PaginationComponent />
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default AdminDashboard;