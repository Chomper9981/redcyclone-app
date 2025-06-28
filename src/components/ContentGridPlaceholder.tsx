import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentGridPlaceholderProps {
  mainTab?: string;
  subTab?: string;
}

const ContentGridPlaceholder: React.FC<ContentGridPlaceholderProps> = ({ mainTab, subTab }) => {
  // Tạo 10 mục placeholder
  const items = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((_, index) => (
        <Card key={index} className="flex flex-col items-center p-4">
          <CardContent className="p-0 flex flex-col items-center w-full">
            <Skeleton className="w-full h-32 rounded-md mb-2" /> {/* Placeholder for image */}
            <Skeleton className="w-3/4 h-4 rounded-md" /> {/* Placeholder for title */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentGridPlaceholder;