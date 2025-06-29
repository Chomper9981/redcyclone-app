import React, { useState } from 'react';
import CreatePostHeader from '@/components/CreatePostHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const CreatePost: React.FC = () => {
  const currentUser = {
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png",
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainCategory, setMainCategory] = useState('news');
  const [subCategory, setSubCategory] = useState('latest');
  const [loading, setLoading] = useState(false);

  const mainCategoryOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "game", label: "Game" },
  ];

  const subCategoryOptions = [
    { value: "latest", label: "Mới nhất" },
    { value: "hot", label: "Hot nhất" },
    { value: "following", label: "Đang theo dõi" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Tiêu đề và nội dung bài viết không được để trống.");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Bài viết của bạn đã được gửi đi để duyệt!");
    console.log({ title, content, mainCategory, subCategory });

    // Reset form
    setTitle('');
    setContent('');
    setMainCategory('news');
    setSubCategory('latest');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <CreatePostHeader userName={currentUser.name} userAvatarUrl={currentUser.avatarUrl} />
      <main className="flex-grow p-4 container mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Đăng bài viết mới</h2>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Thông tin bài viết</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề bài viết <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Nhập tiêu đề bài viết của bạn"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Nội dung bài viết <span className="text-red-500">*</span></Label>
                <Textarea
                  id="content"
                  placeholder="Viết nội dung bài viết của bạn ở đây..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="main-category">Chuyên mục chính</Label>
                <Select value={mainCategory} onValueChange={setMainCategory}>
                  <SelectTrigger id="main-category">
                    <SelectValue placeholder="Chọn chuyên mục chính" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainCategoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sub-category">Chuyên mục phụ</Label>
                <Select value={subCategory} onValueChange={setSubCategory}>
                  <SelectTrigger id="sub-category">
                    <SelectValue placeholder="Chọn chuyên mục phụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi bài viết"}
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                Hãy dùng # để giúp mọi người tìm được chủ đề này dễ hơn.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreatePost;