import React from 'react';
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

interface Account {
  id: string;
  accountName: string;
  nickname: string;
  cccdVerified: boolean;
}

const mockAccounts: Account[] = [
  { id: '1', accountName: 'user_001', nickname: 'Alice', cccdVerified: true },
  { id: '2', accountName: 'user_002', nickname: 'BobTheBuilder', cccdVerified: false },
  { id: '3', accountName: 'user_003', nickname: 'CharlieX', cccdVerified: true },
  { id: '4', accountName: 'user_004', nickname: 'DianaPrince', cccdVerified: false },
  { id: '5', accountName: 'user_005', nickname: 'EveOnline', cccdVerified: true },
];

const AccountTable: React.FC = () => {
  const handleLogReport = (accountId: string) => {
    toast.info(`Xem Log Report cho tài khoản ID: ${accountId}`);
    // Logic thực tế để hiển thị log report
  };

  const handleActivityLog = (accountId: string) => {
    toast.info(`Xem Log Hoạt động cho tài khoản ID: ${accountId}`);
    // Logic thực tế để hiển thị log hoạt động
  };

  const handleSuspendAccount = (accountId: string) => {
    toast.warning(`Tạm dừng hoạt động tài khoản ID: ${accountId}`);
    // Logic thực tế để tạm dừng tài khoản
  };

  const handleDeleteAccount = (accountId: string) => {
    toast.error(`Xóa tài khoản ID: ${accountId}`);
    // Logic thực tế để xóa tài khoản
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
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.id}</TableCell>
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.nickname}</TableCell>
              <TableCell>
                <Badge variant={account.cccdVerified ? "default" : "destructive"}>
                  {account.cccdVerified ? "Đã xác nhận" : "Chưa xác nhận"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => handleLogReport(account.id)}>
                  Log Report
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleActivityLog(account.id)}>
                  Log Hoạt động
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleSuspendAccount(account.id)}>
                  Tạm dừng
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