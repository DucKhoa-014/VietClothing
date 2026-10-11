/**
 * Thanh tiến độ cuộn 2px ở đỉnh màn hình (đỏ son -> vàng nghệ).
 * Đọc trực tiếp từ CSS variable --scroll-progress, không gây render lại React.
 */
import React from 'react';

export const ScrollLight: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 h-[2px] z-50 overflow-hidden"
    >
      <div
        className="w-full h-full bg-gradient-to-r from-son via-nghe to-[#F2BD42] origin-left will-change-transform"
        style={{ transform: 'scaleX(var(--scroll-progress, 0))' }}
      />
    </div>
  );
};
