import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FollowedUser {
  id: string;
  name: string;
  avatarUrl: string;
}

const mockFollowedUsers: FollowedUser[] = [
  { id: '1', name: 'Người dùng A', avatarUrl: 'https://github.com/shadcn.png' },
  { id: '2', name: 'Người dùng B', avatarUrl: 'https://avatars.githubusercontent.com/u/5900000?v=4' },
  { id: '3', name: 'Người dùng C', avatarUrl: 'https://avatars.githubusercontent.com/u/6000000?v=4' },
  { id: '4', name: 'Người dùng D', avatarUrl: 'https://avatars.githubusercontent.com/u/7000000?v=4' },
  { id: '5', name: 'Người dùng E', avatarUrl: 'https://avatars.githubusercontent.com/u/8000000?v=4' },
];

const FollowingList: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockFollowedUsers.map((user) => (
        <Card key={user.id} className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-lg text-gray-900 dark:text-gray-100">{user.name}</span>
          </div>
          <Button variant="outline" size="sm">Theo dõi lại</Button>
        </Card>
      ))}
    </div>
  );
};

export default FollowingList;