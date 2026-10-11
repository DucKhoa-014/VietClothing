/**
 * Lớp nền giấy dó tĩnh (Do paper texture) kết hợp vignette nhẹ ở 4 góc,
 * độ mờ 3% (giao diện sáng) và 2% (giao diện tối).
 * Nằm ở z-0 dưới nội dung chính (z-10), aria-hidden="true" và pointer-events: none.
 */
import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="bg-giay-do"
    />
  );
};
