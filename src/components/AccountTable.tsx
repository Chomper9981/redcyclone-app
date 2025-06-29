import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { addGlobalLog } from '@/utils/globalLogs'; // Import addGlobalLog

interface Account {
  id: string;
  accountName: string;
  nickname: string;
  cccdVerified: boolean;
  isActive: boolean;
  isAdmin: boolean; // Thêm thuộc tính isAdmin
}

const initialMockAccounts: Account[] = [
  { id: '1', accountName: 'user_001', nickname: 'Alice', cccdVerified: true, isActive: true, isAdmin: true },
  { id: '2', accountName: 'user_002', nickname: 'BobTheBuilder', cccdVerified: false, isActive: true, isAdmin: false },
  { id: '3', accountName: 'user_003', nickname: 'CharlieX', cccdVerified: true, isActive: false, isAdmin: false },
  { id: '4', accountName: 'user_004', nickname: 'DianaPrince', cccdVerified: false, isActive: true, isAdmin: false },
  { id: '5', accountName: 'user_005', nickname: 'EveOnline', cccdVerified: true, isActive: false, isAdmin: true },
];

const AccountTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialMockAccounts);

  const handleLogReport = (accountId: string) => {
    toast.info(`Xem Log Report cho tài khoản ID: ${accountId}`);
    // Logic thực tế để hiển thị log report
  };

  const handleActivityLog = (accountId: string) => {
    toast.info(`Xem Log Hoạt động cho tài khoản ID: ${accountId}`);
    // Logic thực tế để hiển thị log hoạt động
  };

  const handleToggleAccountStatus = (accountId: string) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account => {
        if (account.id === accountId) {
          const newStatus = !account.isActive;
          toast.info(`${newStatus ? "Kích hoạt" : "Tạm dừng"} tài khoản ID: ${accountId}`);

          const adminNickname = "Admin"; // Tên admin giả định

          if (!newStatus) {
            // Nếu tài khoản bị tạm dừng, ghi log
            addGlobalLog(
              account.nickname, // Tên người dùng bị tạm dừng
              "Tạm dừng tài khoản",
              `${adminNickname} đã tạm dừng tài khoản này.`
            );
          } else {
            // Nếu tài khoản được kích hoạt, ghi log
            addGlobalLog(
              account.nickname, // Tên người dùng được kích hoạt
              "Kích hoạt tài khoản",
              `${adminNickname} đã kích hoạt tài khoản này.`
            );
          }
          return { ...account, isActive: newStatus };
        }
        return account;
      })
    );
  };

  const handleDeleteAccount = (accountId: string) => {
    toast.error(`Xóa tài khoản ID: ${accountId}`);
    // Logic thực tế để xóa tài khoản
    setAccounts(prevAccounts => prevAccounts.filter(account => account.id !== accountId));
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên tài khoản</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Xác nhận CCCD</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.id}</TableCell>
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.nickname}</TableCell>
              <TableCell>
                <Badge variant={account.cccdVerified ? "default" : "destructive"}>
                  {account.cccdVerified ? "Đã xác nhận" : "Chưa xác nhận"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={account.isActive ? "default" : "secondary"}>
                  {account.isActive ? "Đang hoạt động" : "Tạm dừng"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => handleLogReport(account.id)}>
                  Log Report
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleActivityLog(account.id)}>
                  Log Hoạt động
                </Button>
                <Button
                  variant={account.isActive ? "secondary" : "default"}
                  size="sm"
                  onClick={() => handleToggleAccountStatus(account.id)}
                >
                  {account.isActive ? "Tạm dừng" : "Kích hoạt"}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountTable;