import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase'; // Import supabase client

interface QRCodeManagerProps {
  userId: string;
  initialQrCodeUrls?: string[]; // Optional: existing QR code URLs
}

const QRCodeManager: React.FC<QRCodeManagerProps> = ({ userId, initialQrCodeUrls = [] }) => {
  // State to hold QR code images (can be File objects or URLs)
  const [qrCodes, setQrCodes] = useState<(File | string | null)[]>(Array(3).fill(null));
  const [loadingStates, setLoadingStates] = useState<boolean[]>(Array(3).fill(false));

  useEffect(() => {
    // Initialize with existing URLs, if any
    const newQrCodes = Array(3).fill(null);
    initialQrCodeUrls.slice(0, 3).forEach((url, index) => {
      newQrCodes[index] = url;
    });
    setQrCodes(newQrCodes);
  }, [initialQrCodeUrls]);

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newQrCodes = [...qrCodes];
      newQrCodes[index] = file;
      setQrCodes(newQrCodes);
    }
  };

  const handleUpload = async (index: number) => {
    const fileToUpload = qrCodes[index];
    if (!fileToUpload || typeof fileToUpload === 'string') {
      toast.info("Vui lòng chọn một ảnh để tải lên.");
      return;
    }

    setLoadingStates(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    try {
      // In a real app, upload to Supabase Storage
      // const filePath = `qrcodes/${userId}/${index}-${Date.now()}.png`;
      // const { data, error } = await supabase.storage.from('qrcodes').upload(filePath, fileToUpload);
      // if (error) throw error;
      // const publicUrl = supabase.storage.from('qrcodes').getPublicUrl(filePath).data.publicUrl;

      // Mock upload success
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockPublicUrl = URL.createObjectURL(fileToUpload); // Use object URL for preview

      setQrCodes(prev => {
        const newQrCodes = [...prev];
        newQrCodes[index] = mockPublicUrl; // Replace File with URL after "upload"
        return newQrCodes;
      });
      toast.success(`Mã QR ${index + 1} đã được cập nhật.`);
      // In a real app, you'd also update the user's profile in the database with this URL.

    } catch (error: any) {
      toast.error(`Lỗi khi tải lên Mã QR: ${error.message}`);
    } finally {
      setLoadingStates(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  const handleDelete = async (index: number) => {
    if (!qrCodes[index]) {
      toast.info("Không có Mã QR để xóa ở vị trí này.");
      return;
    }

    setLoadingStates(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    try {
      // In a real app, delete from Supabase Storage
      // const urlToDelete = qrCodes[index] as string;
      // const fileName = urlToDelete.split('/').pop(); // Extract filename from URL
      // const { error } = await supabase.storage.from('qrcodes').remove([`qrcodes/${userId}/${fileName}`]);
      // if (error) throw error;

      // Mock delete success
      await new Promise(resolve => setTimeout(resolve, 500));

      setQrCodes(prev => {
        const newQrCodes = [...prev];
        newQrCodes[index] = null;
        return newQrCodes;
      });
      toast.success(`Mã QR ${index + 1} đã được xóa.`);
      // In a real app, you'd also update the user's profile in the database to remove this URL.

    } catch (error: any) {
      toast.error(`Lỗi khi xóa Mã QR: ${error.message}`);
    } finally {
      setLoadingStates(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Mã QR của bạn</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {qrCodes.map((qrCode, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 p-2 border rounded-md">
            <Avatar className="h-24 w-24 rounded-md">
              <AvatarImage
                src={qrCode instanceof File ? URL.createObjectURL(qrCode) : (qrCode || "https://via.placeholder.com/96x96?text=QR")}
                alt={`QR Code ${index + 1}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                <Plus size={32} />
              </AvatarFallback>
            </Avatar>
            <Input
              id={`qr-code-file-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
              className="w-full"
            />
            <div className="flex space-x-2 w-full">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleUpload(index)}
                disabled={loadingStates[index] || !qrCode || typeof qrCode === 'string'}
                className="flex-1"
              >
                {loadingStates[index] ? "Đang tải..." : "Cập nhật"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(index)}
                disabled={loadingStates[index] || !qrCode}
                className="flex-1"
              >
                <Trash2 size={16} className="mr-1" /> Xóa
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QRCodeManager;