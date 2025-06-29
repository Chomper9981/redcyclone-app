import React, { useState, useEffect, useRef } from 'react';
import CreatePostHeader from '@/components/CreatePostHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const LOCAL_STORAGE_DRAFT_KEY = 'create_post_draft';
const DEBOUNCE_DELAY = 1000; // 1 second

const CreatePost: React.FC = () => {
  const currentUser = {
    name: "Người dùng Dyad",
    avatarUrl: "https://github.com/shadcn.png",
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('news');
  const [gameFile, setGameFile] = useState<File | null>(null); // State mới cho file game
  const [loading, setLoading] = useState(false);

  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  // Cập nhật draftDataRef để bao gồm postType, không lưu file trực tiếp vào draft
  const draftDataRef = useRef<{ title: string; content: string; postType: string } | null>(null);

  const postTypeOptions = [
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Game Guide" },
    { value: "dev-guide", label: "Dev Guide" },
    { value: "game", label: "Game" },
  ];

  // Effect để lưu nháp vào localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const draft = { title, content, postType };
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(draft));
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [title, content, postType]);

  // Effect để kiểm tra và hiển thị hộp thoại khôi phục khi tải trang
  useEffect(() => {
    const savedDraft = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft.title || parsedDraft.content) {
          draftDataRef.current = parsedDraft;
          setShowRestoreDialog(true);
        }
      } catch (e) {
        console.error("Failed to parse draft from localStorage", e);
        localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
      }
    }
  }, []);

  const handleRestoreDraft = () => {
    if (draftDataRef.current) {
      setTitle(draftDataRef.current.title);
      setContent(draftDataRef.current.content);
      setPostType(draftDataRef.current.postType);
      setGameFile(null); // Xóa file đã chọn khi khôi phục nháp
      localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
      toast.success("Bài viết nháp đã được khôi phục!");
    }
    setShowRestoreDialog(false);
    setShowConfirmDeleteDialog(false);
  };

  const handleDeleteDraft = () => {
    localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
    setGameFile(null); // Xóa file đã chọn khi xóa nháp
    toast.info("Bài viết nháp đã bị xóa.");
    setShowRestoreDialog(false);
    setShowConfirmDeleteDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("Tiêu đề và nội dung bài viết không được để trống.");
      setLoading(false);
      return;
    }

    if (postType === 'game' && !gameFile) {
      toast.error("Vui lòng tải lên file game (.zip) khi chọn loại bài viết là 'Game'.");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Bài viết của bạn đã được gửi đi để duyệt!");
    console.log({ title, content, postType, gameFileName: gameFile?.name });

    // Reset form and clear draft after successful submission
    setTitle('');
    setContent('');
    setPostType('news');
    setGameFile(null); // Reset file sau khi gửi
    localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
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
                <Label htmlFor="post-type">Loại bài viết</Label>
                <Select value={postType} onValueChange={setPostType}>
                  <SelectTrigger id="post-type">
                    <SelectValue placeholder="Chọn loại bài viết" />
                  </SelectTrigger>
                  <SelectContent>
                    {postTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {postType === 'game' && (
                <div className="grid gap-2">
                  <Label htmlFor="game-file">Tải lên File Game (.zip)</Label>
                  <Input
                    id="game-file"
                    type="file"
                    accept=".zip"
                    onChange={(e) => setGameFile(e.target.files ? e.target.files[0] : null)}
                  />
                  <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                    Chỉ chấp nhận file .zip. Kích thước tối đa 500MB.
                  </p>
                </div>
              )}

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

      {/* Dialog để hỏi khôi phục bài viết */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Khôi phục bài viết nháp?</AlertDialogTitle>
            <AlertDialogDescription>
              Chúng tôi tìm thấy một bài viết nháp chưa hoàn thành. Bạn có muốn khôi phục nó không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowRestoreDialog(false);
              setShowConfirmDeleteDialog(true);
            }}>Không</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreDraft}>Có</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog để xác nhận xóa bài viết nháp */}
      <AlertDialog open={showConfirmDeleteDialog} onOpenChange={setShowConfirmDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn chắc chắn xóa bài viết cũ?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xóa vĩnh viễn bài viết nháp đã lưu. Bạn không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowConfirmDeleteDialog(false);
              setShowRestoreDialog(true);
            }}>Không</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDraft}>Có</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreatePost;