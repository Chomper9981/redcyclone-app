import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  id: string;
  senderAvatarUrl: string;
  senderName: string;
  message: string;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  { id: '1', senderAvatarUrl: 'https://github.com/shadcn.png', senderName: 'Admin', message: 'Chào mừng bạn đến với RedCyclone!', timestamp: '2 giờ trước' },
  { id: '2', senderAvatarUrl: 'https://avatars.githubusercontent.com/u/5900000?v=4', senderName: 'Người dùng X', message: 'Người dùng X đã thích bài viết của bạn.', timestamp: '1 ngày trước' },
  { id: '3', senderAvatarUrl: 'https://avatars.githubusercontent.com/u/6000000?v=4', senderName: 'Hệ thống', message: 'Bài viết của bạn đã được duyệt và đăng tải.', timestamp: '3 ngày trước' },
  { id: '4', senderAvatarUrl: 'https://avatars.githubusercontent.com/u/7000000?v=4', senderName: 'Người dùng Y', message: 'Người dùng Y đã bình luận về bài viết của bạn.', timestamp: '5 ngày trước' },
];

const NotificationList: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockNotifications.map((notification) => (
        <Card key={notification.id} className="p-4 flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={notification.senderAvatarUrl} alt={notification.senderName} />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {notification.senderName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-gray-900 dark:text-gray-100 font-medium">{notification.senderName}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{notification.message}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{notification.timestamp}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;