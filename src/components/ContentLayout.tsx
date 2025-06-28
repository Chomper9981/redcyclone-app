import React from 'react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGridPlaceholder from '@/components/ContentGridPlaceholder';
import PaginationComponent from '@/components/PaginationComponent';

interface ContentLayoutProps {
  headerComponent: React.ReactNode;
  title: string;
  mainTab: string;
  setMainTab: (tab: string) => void;
  subTab: string;
  setSubTab: (tab: string) => void;
  subTabOptions: { value: string; label: string }[];
  children?: React.ReactNode; // Dành cho các phần nội dung độc đáo của từng trang
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  headerComponent,
  title,
  mainTab,
  setMainTab,
  subTab,
  setSubTab,
  subTabOptions,
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {headerComponent}
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{title}</h2>

        {children} {/* Render các phần nội dung độc đáo của từng trang */}

        {/* Hàng: 4 tab chính (bộ lọc) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="news" value={mainTab} onValueChange={setMainTab}>
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

        {/* Hàng: Các tab phụ (bộ lọc) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="latest" value={subTab} onValueChange={setSubTab}>
            <TabsList className={`grid w-full grid-cols-${subTabOptions.length}`}>
              {subTabOptions.map(option => (
                <TabsTrigger key={option.value} value={option.value}>{option.label}</TabsTrigger>
              ))}
            </TabsList>
            {/* Nội dung tab này sẽ không hiển thị trực tiếp mà sẽ ảnh hưởng đến ContentGridPlaceholder */}
            {subTabOptions.map(option => (
              <TabsContent key={option.value} value={option.value} className="hidden"></TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Hàng: List placeholder (được lọc bởi các tab) */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Danh sách nội dung</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Đang hiển thị nội dung cho: **{mainTab}** (phụ: **{subTab}**)
          </p>
          <ContentGridPlaceholder mainTab={mainTab} subTab={subTab} />
        </section>

        {/* Hàng: Pagination */}
        <section className="flex justify-center mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <PaginationComponent />
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default ContentLayout;