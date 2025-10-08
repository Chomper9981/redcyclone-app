import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSession } from '@/contexts/SessionContext'; // Import useSession

const Index = () => {
  const { session } = useSession(); // Lấy session để tạo liên kết động

  const navigationLinks = [
    { to: "/login", label: "Đi đến Đăng nhập", variant: "default" },
    { to: "/admin", label: "Đi đến Admin", variant: "secondary" },
    { to: "/menu-guest", label: "Đi đến Giao diện Khách", variant: "outline" },
    // Liên kết động đến trang người dùng nếu đã đăng nhập
    { to: session ? `/menu-user/${session.user.id}` : "/login", label: "Đi đến Giao diện Người dùng", variant: "default" },
    { to: session ? `/profile-user/${session.user.id}` : "/login", label: "Đi đến Hồ sơ Người dùng", variant: "ghost" },
    { to: "/profile-other-user", label: "Đi đến Hồ sơ Người dùng Khác", variant: "destructive" },
    { to: "/profile-other-user-for-guest", label: "Hồ sơ Người dùng Khác (Khách)", variant: "link" },
    { to: session ? "/edit-profile" : "/login", label: "Đi đến Sửa Hồ sơ", variant: "default" },
    { to: session ? "/create-post" : "/login", label: "Đi đến Đăng bài viết", variant: "default" },
    { to: session ? "/view-post" : "/login", label: "Đi đến Xem bài viết", variant: "default" },
    { to: "/view-post-guest", label: "Đi đến Xem bài viết (Khách)", variant: "secondary" }, // Thêm liên kết mới
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Chào mừng đến với ứng dụng của bạn</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Bắt đầu xây dựng dự án tuyệt vời của bạn tại đây!
        </p>
        <div className="flex flex-col space-y-4">
          {navigationLinks.map((link, index) => (
            <Link to={link.to} key={index} className="w-full">
              <Button size="lg" variant={link.variant} className="w-full px-8 py-4 text-lg">
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;