import React, { useState } from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import GuestHeader from '@/components/GuestHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';

const MenuGuest: React.FC = () => {
  const [mainTab, setMainTab] = useState("news");
  const [subTab, setSubTab] = useState("latest");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <GuestHeader />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Khám phá nội dung</h2>

        {/* Hàng thứ 2: 4 tab chính (bộ lọc) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="news" onValueChange={setMainTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="news">Tin tức</TabsTrigger>
              <TabsTrigger value="guide">Guide</TabsTrigger>
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="official">Official</TabsTrigger>
            </TabsList>
            {/* Nội dung tab này sẽ không hiển thị trực tiếp mà sẽ ảnh hưởng đến ContentGridPlaceholder */}
            <TabsContent value="news" className="hidden"></TabsContent>
            <TabsContent value="guide" className="hidden"></TabsContent>
            <TabsContent value="game" className="hidden"></TabsContent>
            <TabsContent value="official" className="hidden"></TabsContent>
          </Tabs>
        </section>

        {/* Hàng thứ 3: 3 tab phụ (bộ lọc) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="latest" onValueChange={setSubTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="latest">Mới nhất</TabsTrigger>
              <TabsTrigger value="hot">Hot nhất</TabsTrigger>
              <TabsTrigger value="pending">Đang đợi duyệt</TabsTrigger>
            </TabsList>
            {/* Nội dung tab này sẽ không hiển thị trực tiếp mà sẽ ảnh hưởng đến ContentGridPlaceholder */}
            <TabsContent value="latest" className="hidden"></TabsContent>
            <TabsContent value="hot" className="hidden"></TabsContent>
            <TabsContent value="pending" className="hidden"></TabsContent>
          </Tabs>
        </section>

        {/* Hàng thứ 4: List placeholder (được lọc bởi các tab) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Danh sách nội dung</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Đang hiển thị nội dung cho: **{mainTab}** (phụ: **{subTab}**)
          </p>
          <ContentGridPlaceholder mainTab={mainTab} subTab={subTab} />
        </section>

        {/* Hàng thứ 5: Pagination */}
        <section className="flex justify-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <PaginationComponent />
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default MenuGuest;