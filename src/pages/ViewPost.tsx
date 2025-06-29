import React from 'react';
import PostViewHeader from '@/components/PostViewHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare } from 'lucide-react'; // Import icons

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatarUrl: string;
  mainCategory: string;
  subCategory: string;
  createdAt: string; // ISO 8601 string
  likes: number;
  commentsCount: number;
}

const mockPost: Post = {
  id: 'post-1',
  title: 'Hướng dẫn cơ bản về React Hooks',
  content: `React Hooks là một tính năng mới được giới thiệu trong React 16.8, cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class. Hooks giải quyết một số vấn đề mà các thành phần dựa trên class gặp phải, như khó tái sử dụng logic stateful giữa các component, và sự phức tạp của 'this' trong JavaScript.

  Các Hook phổ biến bao gồm:
  - useState: Cho phép bạn thêm state vào các functional component.
  - useEffect: Cho phép bạn thực hiện các side effect trong functional component, tương tự như componentDidMount, componentDidUpdate và componentWillUnmount.
  - useContext: Cho phép bạn truy cập context mà không cần render prop.
  - useReducer: Một giải pháp thay thế cho useState cho các logic state phức tạp hơn.
  - useCallback, useMemo: Để tối ưu hóa hiệu suất.

  Việc sử dụng Hooks giúp code của bạn trở nên gọn gàng, dễ đọc và dễ kiểm thử hơn. Nó cũng khuyến khích việc viết các functional component, vốn thường đơn giản hơn các class component.`,
  authorName: 'Người dùng Dyad',
  authorAvatarUrl: 'https://github.com/shadcn.png',
  mainCategory: 'dev-guide',
  subCategory: 'latest',
  createdAt: '2023-10-27T10:00:00Z',
  likes: 125,
  commentsCount: 34,
};

const ViewPost: React.FC = () => {
  // Dữ liệu người dùng hiện tại (để hiển thị trên header)
  const currentUser = {
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png",
  };

  // Định dạng ngày tạo
  const formattedDate = new Date(mockPost.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <PostViewHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto max-w-3xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {mockPost.title}
            </CardTitle>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockPost.authorAvatarUrl} alt={mockPost.authorName} />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {mockPost.authorName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{mockPost.authorName}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{mockPost.mainCategory}</Badge>
              <Badge variant="outline">{mockPost.subCategory}</Badge>
            </div>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            {/* Sử dụng pre-wrap để giữ định dạng xuống dòng từ mockPost.content */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{mockPost.content}</p>
          </CardContent>
        </Card>

        {/* Phần tương tác: Likes và Comments */}
        <Card className="mb-6 p-4 flex items-center justify-around bg-white dark:bg-gray-800 shadow-sm rounded-lg">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <ThumbsUp size={20} />
            <span>{mockPost.likes} Lượt thích</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <MessageSquare size={20} />
            <span>{mockPost.commentsCount} Bình luận</span>
          </div>
        </Card>

        {/* Phần bình luận (placeholder) */}
        <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Bình luận</CardTitle>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              Chức năng bình luận sẽ được phát triển sau.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewPost;