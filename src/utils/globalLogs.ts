import { format } from 'date-fns';

interface LogEntry {
  id: string;
  timestamp: string; // ISO 8601 string: YYYY-MM-DDTHH:MM:SS (UTC)
  username: string; // Tên người dùng bị ảnh hưởng
  action: string;
  details: string;
}

// Sử dụng một mảng toàn cục để lưu trữ log
const _globalLogs: LogEntry[] = [];

// Thêm một số log giả định ban đầu để có dữ liệu khi khởi động
// Các timestamp này đã được điều chỉnh để tương ứng với UTC+7 khi hiển thị
const initialLogs: LogEntry[] = [
  { id: '1', timestamp: '2023-10-26T03:30:00', username: 'Alice', action: 'Đăng nhập', details: 'Đăng nhập thành công từ IP 192.168.1.100' },
  { id: '2', timestamp: '2023-10-26T04:00:00', username: 'BobTheBuilder', action: 'Cập nhật hồ sơ', details: 'Cập nhật ảnh đại diện và bio.' },
  { id: '3', timestamp: '2023-10-25T08:45:00', username: 'CharlieX', action: 'Đăng bài', details: 'Đăng bài viết mới: "Hướng dẫn chơi game X".' },
  { id: '4', timestamp: '2023-10-27T02:15:00', username: 'Alice', action: 'Đăng xuất', details: 'Đăng xuất khỏi hệ thống.' },
  { id: '5', timestamp: '2023-10-26T07:00:00', username: 'DianaPrince', action: 'Xóa tài khoản', details: 'Yêu cầu xóa tài khoản đã được xử lý.' },
  { id: '6', timestamp: '2023-10-27T03:00:00', username: 'BobTheBuilder', action: 'Đăng nhập', details: 'Đăng nhập thất bại: sai mật khẩu.' },
  { id: '7', timestamp: '2023-10-25T09:00:00', username: 'Alice', action: 'Cập nhật hồ sơ', details: 'Thay đổi nickname từ "Alice" thành "AliceWonder".' },
  { id: '8', timestamp: '2023-10-27T04:30:00', username: 'CharlieX', action: 'Đăng bài', details: 'Đăng bài viết mới: "Mẹo tối ưu hiệu suất game Y".' },
  { id: '9', timestamp: '2023-10-24T01:00:00', username: 'Admin', action: 'Quản lý tài khoản', details: 'Admin đã tạm dừng tài khoản của người dùng Z do vi phạm chính sách. Chi tiết vi phạm: spam nội dung quảng cáo không phù hợp trên diễn đàn công cộng và các hành vi gây rối khác.' },
  { id: '10', timestamp: '2023-10-27T05:00:00', username: 'Admin', action: 'Quản lý log', details: 'Admin đã truy cập trang quản lý log hệ thống.' },
];

// Thêm các log ban đầu vào mảng toàn cục
initialLogs.forEach(log => _globalLogs.push(log));


export const addGlobalLog = (username: string, action: string, details: string) => {
  const now = new Date();
  // Lấy chuỗi ISO UTC và cắt bỏ phần mili giây và 'Z'
  const utcTimestamp = now.toISOString().slice(0, 19);

  const newLog: LogEntry = {
    id: Date.now().toString(), // ID duy nhất dựa trên timestamp
    timestamp: utcTimestamp, // Lưu trữ dưới dạng UTC
    username,
    action,
    details,
  };
  _globalLogs.unshift(newLog); // Thêm vào đầu để log mới nhất hiển thị trước
};

export const getGlobalLogs = (): LogEntry[] => {
  return [..._globalLogs]; // Trả về một bản sao để tránh sửa đổi trực tiếp
};

export type { LogEntry };