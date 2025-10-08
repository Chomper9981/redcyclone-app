import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeUrls: string[];
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrCodeUrls }) => {
  // Lọc ra các URL không phải null hoặc rỗng
  const validQrCodes = qrCodeUrls.filter(url => url && url.trim() !== '');

  if (validQrCodes.length === 0) {
    return null; // Không hiển thị gì nếu không có mã QR nào
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Mã QR của bạn</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {validQrCodes.map((url, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 p-2 border rounded-md">
            <Avatar className="h-24 w-24 rounded-md">
              <AvatarImage
                src={url}
                alt={`QR Code ${index + 1}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                <Plus size={32} />
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;