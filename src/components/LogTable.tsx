import React, { useState, useMemo, useEffect } from 'react';
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
import { getGlobalLogs, LogEntry } from '@/utils/globalLogs'; // Import getGlobalLogs và LogEntry

const LogTable: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]); // Sử dụng state để quản lý logs
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<keyof LogEntry | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Lấy log khi component được mount
  useEffect(() => {
    setLogs(getGlobalLogs());
  }, []);

  const uniqueActions = useMemo(() => {
    const actions = Array.from(new Set(logs.map(log => log.action)));
    return ['Tất cả', ...actions];
  }, [logs]); // Phụ thuộc vào logs để cập nhật khi có log mới

  const filteredAndSortedLogs = useMemo(() => {
    let currentLogs = [...logs];

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
  }, [searchTerm, selectedAction, sortColumn, sortDirection, logs]);

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