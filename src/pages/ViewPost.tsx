import React from 'react';
import PostViewHeader from '@/components/PostViewHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare } from 'lucide-react'; // Import icons
import { Button } from "@/components/ui/button"; // Import Button
import { toast } from 'sonner'; // Import toast

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatarUrl: string;
  mainCategory: string;
  createdAt: string; // ISO 8601 string
  likes: number;
  commentsCount: number;
  quocHon?: number; // Thêm thuộc tính quocHon
}

const mockPost: Post = {
  id: 'post-game-1',
  title: 'Khám phá thế giới mở của Cyberpunk 2077',
  content: `Cyberpunk 2077 là một trò chơi nhập vai hành động được phát triển bởi CD Projekt Red. Lấy bối cảnh tại Night City, một siêu đô thị ám ảnh bởi quyền lực, sự hào nhoáng và những sửa đổi cơ thể, người chơi sẽ vào vai V, một lính đánh thuê ngoài vòng pháp luật đang tìm kiếm một cấy ghép độc nhất vô nhị là chìa khóa cho sự bất tử.

  Trò chơi nổi bật với thế giới mở rộng lớn, cốt truyện sâu sắc với nhiều lựa chọn ảnh hưởng đến kết cục, và hệ thống chiến đấu đa dạng cho phép người chơi tùy chỉnh phong cách chơi của mình. Từ những con hẻm tối tăm đến những tòa nhà chọc trời lấp lánh, Night City luôn ẩn chứa những bí mật và thử thách mới.

  Hãy chuẩn bị cho một cuộc phiêu lưu đầy kịch tính và khám phá những gì Night City thực sự mang lại!`,
  authorName: 'Game Master',
  authorAvatarUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4', // Avatar khác cho ví dụ
  mainCategory: 'game', // Đặt chủ đề là 'game'
  createdAt: '2023-11-01T15:30:00Z',
  likes: 567,
  commentsCount: 89,
  quocHon: 250, // Đặt giá trị Quốc Hồn lớn hơn 0
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

  const handleGuigamQuocHon = () => {
    toast.info("Chức năng Gửi gắm Quốc Hồn sẽ được phát triển sau.");
  };

  const handleTaiGame = () => {
    toast.info("Chức năng Tải Game sẽ được phát triển sau.");
  };

  const handleMuaGame = () => {
    toast.info("Chức năng Mua Game sẽ được phát triển sau.");
  };

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
            </div>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            {/* Sử dụng pre-wrap để giữ định dạng xuống dòng từ mockPost.content */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{mockPost.content}</p>
          </CardContent>
        </Card>

        {/* Phần tương tác: Các nút hành động, Likes và Comments */}
        <Card className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-sm rounded-lg">
          <CardContent className="p-0 flex flex-col space-y-4">
            {/* Các nút hành động */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" onClick={handleGuigamQuocHon}>Gửi gắm Quốc Hồn</Button>
              {mockPost.mainCategory === 'game' && (
                <>
                  <Button onClick={handleTaiGame}>Tải Game</Button>
                  {mockPost.quocHon && mockPost.quocHon > 0 && (
                    <Button variant="secondary" onClick={handleMuaGame}>Mua Game</Button>
                  )}
                </>
              )}
            </div>
            {/* Likes và Comments */}
            <div className="flex items-center justify-around text-gray-700 dark:text-gray-300 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <ThumbsUp size={20} />
                <span>{mockPost.likes} Lượt thích</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>{mockPost.commentsCount} Bình luận</span>
              </div>
            </div>
          </CardContent>
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