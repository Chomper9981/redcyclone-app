import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Chào mừng đến với ứng dụng của bạn</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Bắt đầu xây dựng dự án tuyệt vời của bạn tại đây!
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/login">
            <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">Đi đến Đăng nhập</Button>
          </Link>
          <Link to="/admin">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">Đi đến Admin</Button>
          </Link>
          <Link to="/menu-guest">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg">Đi đến Giao diện Khách</Button>
          </Link>
          <Link to="/menu-user"> {/* Thêm nút cho MenuUser */}
            <Button size="lg" variant="default" className="w-full sm:w-auto px-8 py-4 text-lg">Đi đến Giao diện Người dùng</Button>
          </Link>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;