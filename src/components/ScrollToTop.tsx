import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn trang lên đầu mỗi khi pathname thay đổi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Component này không render gì cả, chỉ xử lý logic
};

export default ScrollToTop;