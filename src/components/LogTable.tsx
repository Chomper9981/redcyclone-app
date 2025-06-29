import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string; // ISO 8601 string: YYYY-MM-DDTHH:MM:SS
  username: string;
  action: string;
  details: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '2023-10-26T10:30:00', username: 'Alice', action: 'Đăng nhập', details: 'Đăng nhập thành công từ IP 192.168.1.100' },
  { id: '2', timestamp: '2023-10-26T11:00:00', username: 'Bob', action: 'Cập nhật hồ sơ', details: 'Cập nhật ảnh đại diện và bio.' },
  { id: '3', timestamp: '2023-10-25T15:45:00', username: 'Charlie', action: 'Đăng bài', details: 'Đăng bài viết mới: "Hướng dẫn chơi game X".' },
  { id: '4', timestamp: '2023-10-27T09:15:00', username: 'Alice', action: 'Đăng xuất', details: 'Đăng xuất khỏi hệ thống.' },
  { id: '5', timestamp: '2023-10-26T14:00:00', username: 'Diana', action: 'Xóa tài khoản', details: 'Yêu cầu xóa tài khoản đã được xử lý.' },
  { id: '6', timestamp: '2023-10-27T10:00:00', username: 'Bob', action: 'Đăng nhập', details: 'Đăng nhập thất bại: sai mật khẩu.' },
  { id: '7', timestamp: '2023-10-25T16:00:00', username: 'Alice', action: 'Cập nhật hồ sơ', details: 'Thay đổi nickname từ "Alice" thành "AliceWonder".' },
  { id: '8', timestamp: '2023-10-27T11:30:00', username: 'Charlie', action: 'Đăng bài', details: 'Đăng bài viết mới: "Mẹo tối ưu hiệu suất game Y".' },
  { id: '9', timestamp: '2023-10-24T08:00:00', username: 'Admin', action: 'Quản lý tài khoản', details: 'Tạm dừng tài khoản của người dùng Z do vi phạm chính sách. Chi tiết vi phạm: spam nội dung quảng cáo không phù hợp trên diễn đàn công cộng và các hành vi gây rối khác.' },
  { id: '10', timestamp: '2023-10-27T12:00:00', username: 'Admin', action: 'Quản lý log', details: 'Truy cập trang quản lý log hệ thống.' },
];

const LogTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<keyof LogEntry | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const uniqueActions = useMemo(() => {
    const actions = Array.from(new Set(mockLogs.map(log => log.action)));
    return ['Tất cả', ...actions];
  }, []);

  const filteredAndSortedLogs = useMemo(() => {
    let currentLogs = [...mockLogs];

    // Filter by username
    if (searchTerm) {
      currentLogs = currentLogs.filter(log =>
        log.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by action
    if (selectedAction && selectedAction !== 'Tất cả') {
      currentLogs = currentLogs.filter(log => log.action === selectedAction);
    }

    // Sort
    if (sortColumn) {
      currentLogs.sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (sortColumn === 'timestamp') {
          valA = new Date(a.timestamp).getTime();
          valB = new Date(b.timestamp).getTime();
        } else {
          valA = a[sortColumn] as string;
          valB = b[sortColumn] as string;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return currentLogs;
  }, [searchTerm, selectedAction, sortColumn, sortDirection]);

  const handleSort = (column: keyof LogEntry) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Chọn thao tác" />
          </SelectTrigger>
          <SelectContent>
            {uniqueActions.map(action => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('timestamp')}
                  className="p-0 h-auto flex items-center"
                >
                  Ngày
                  <ArrowUpDown className={cn("ml-2 h-4 w-4", sortColumn === 'timestamp' && sortDirection === 'asc' ? 'rotate-180' : '', sortColumn === 'timestamp' ? 'opacity-100' : 'opacity-50')} />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('timestamp')}
                  className="p-0 h-auto flex items-center"
                >
                  Thời gian
                  <ArrowUpDown className={cn("ml-2 h-4 w-4", sortColumn === 'timestamp' && sortDirection === 'asc' ? 'rotate-180' : '', sortColumn === 'timestamp' ? 'opacity-100' : 'opacity-50')} />
                </Button>
              </TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Thao tác</TableHead>
              <TableHead>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedLogs.length > 0 ? (
              filteredAndSortedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.timestamp).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleTimeString('vi-VN')}</TableCell>
                  <TableCell>{log.username}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{truncateText(log.details, 80)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Không tìm thấy log nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LogTable;