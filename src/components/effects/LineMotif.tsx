/**
 * Họa tiết nét mảnh thuần Việt (mây cuộn Đông Sơn, hoa sen, sóng thủy ba):
 * Tự động vẽ nét (stroke-dashoffset animation) khi cuộn vào khung nhìn,
 * màu vàng nghệ trang nhã, độ mờ 30–40%, trang nghiêm và tinh tế.
 */
import React from 'react';
import { useReveal } from '../../hooks/useReveal';

interface LineMotifProps {
  type: 'cloud' | 'wave' | 'lotus';
  className?: string;
}

export const LineMotif: React.FC<LineMotifProps> = ({ type, className = '' }) => {
  const { ref, isRevealed } = useReveal<SVGSVGElement>({ threshold: 0.2 });

  if (type === 'lotus') {
    // Royal Vietnamese stylized lotus vine frieze (Hoa sen dây cung đình thời Lý - Lê trải dài tràn màn hình từ lề trái sang lề phải)
    return (
      <svg
        ref={ref}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`w-full h-12 sm:h-14 stroke-[#E0A526] fill-none stroke-[1.2] opacity-40 dark:opacity-45 transition-all duration-1000 ease-out will-change-transform ${className}`}
        aria-hidden="true"
      >
        {/* Dải dây cành hoa sen chính uốn lượn liên hoàn từ mép trái sang mép phải */}
        <path
          d="M0 30 C120 18, 240 42, 360 30 C480 18, 600 42, 720 30 C840 18, 960 42, 1080 30 C1200 18, 1320 42, 1440 30"
          strokeDasharray="1480"
          strokeDashoffset={isRevealed ? 0 : 1480}
          className="transition-all duration-1200 ease-out"
        />

        {/* Dải dây uốn đối xứng đan xen tạo cảm giác dây leo mềm mại */}
        <path
          d="M0 32 C120 44, 240 20, 360 32 C480 44, 600 20, 720 32 C840 44, 960 20, 1080 32 C1200 44, 1320 20, 1440 32"
          strokeDasharray="1480"
          strokeDashoffset={isRevealed ? 0 : 1480}
          className="transition-all duration-1200 ease-out delay-200 opacity-60"
        />

        {/* 1. ĐẠI LIÊN HOA CHÍNH TÂM (X = 720) */}
        {/* Cánh hoa sen chính tâm */}
        <path
          d="M720 8 C715 18, 712 30, 720 40 C728 30, 725 18, 720 8 Z"
          strokeDasharray="80"
          strokeDashoffset={isRevealed ? 0 : 80}
          className="transition-all duration-900 ease-out delay-300"
        />
        {/* Cánh trong trái/phải */}
        <path
          d="M720 14 C708 20, 702 30, 712 39"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-400"
        />
        <path
          d="M720 14 C732 20, 738 30, 728 39"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-400"
        />
        {/* Cánh ngoài xòe rộng */}
        <path
          d="M714 23 C694 25, 688 36, 704 42"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-500"
        />
        <path
          d="M726 23 C746 25, 752 36, 736 42"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-500"
        />
        {/* Đài sen trung tâm */}
        <path
          d="M698 42 Q720 47 742 42"
          strokeDasharray="50"
          strokeDashoffset={isRevealed ? 0 : 50}
          className="transition-all duration-700 ease-out delay-600"
        />

        {/* 2. ĐOÁ SEN BÊN TRÁI (X = 360) */}
        <path
          d="M360 14 C356 22, 354 30, 360 38 C366 30, 364 22, 360 14 Z"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-400"
        />
        <path
          d="M360 18 C350 24, 346 31, 354 37"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-500"
        />
        <path
          d="M360 18 C370 24, 374 31, 366 37"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-500"
        />
        <path
          d="M355 24 C342 26, 338 34, 348 39"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-600"
        />
        <path
          d="M365 24 C378 26, 382 34, 372 39"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-600"
        />
        <path
          d="M344 39 Q360 43 376 39"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-700"
        />

        {/* 3. ĐOÁ SEN BÊN PHẢI (X = 1080) */}
        <path
          d="M1080 14 C1076 22, 1074 30, 1080 38 C1086 30, 1084 22, 1080 14 Z"
          strokeDasharray="60"
          strokeDashoffset={isRevealed ? 0 : 60}
          className="transition-all duration-900 ease-out delay-400"
        />
        <path
          d="M1080 18 C1070 24, 1066 31, 1074 37"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-500"
        />
        <path
          d="M1080 18 C1090 24, 1094 31, 1086 37"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-500"
        />
        <path
          d="M1075 24 C1062 26, 1058 34, 1068 39"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-600"
        />
        <path
          d="M1085 24 C1098 26, 1102 34, 1092 39"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-900 ease-out delay-600"
        />
        <path
          d="M1064 39 Q1080 43 1096 39"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-700"
        />

        {/* 4. CÁC BÚP SEN VƯƠN CAO (X = 180, 540, 900, 1260) */}
        {/* Búp sen tại 180 */}
        <path
          d="M180 14 C176 21, 177 28, 180 32 C183 28, 184 21, 180 14 Z"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-800 ease-out delay-500"
        />
        <path
          d="M180 32 Q180 38 186 42"
          strokeDasharray="20"
          strokeDashoffset={isRevealed ? 0 : 20}
          className="transition-all duration-600 ease-out delay-600"
        />

        {/* Búp sen tại 540 */}
        <path
          d="M540 14 C536 21, 537 28, 540 32 C543 28, 544 21, 540 14 Z"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-800 ease-out delay-500"
        />
        <path
          d="M540 32 Q540 38 534 42"
          strokeDasharray="20"
          strokeDashoffset={isRevealed ? 0 : 20}
          className="transition-all duration-600 ease-out delay-600"
        />

        {/* Búp sen tại 900 */}
        <path
          d="M900 14 C896 21, 897 28, 900 32 C903 28, 904 21, 900 14 Z"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-800 ease-out delay-500"
        />
        <path
          d="M900 32 Q900 38 906 42"
          strokeDasharray="20"
          strokeDashoffset={isRevealed ? 0 : 20}
          className="transition-all duration-600 ease-out delay-600"
        />

        {/* Búp sen tại 1260 */}
        <path
          d="M1260 14 C1256 21, 1257 28, 1260 32 C1263 28, 1264 21, 1260 14 Z"
          strokeDasharray="45"
          strokeDashoffset={isRevealed ? 0 : 45}
          className="transition-all duration-800 ease-out delay-500"
        />
        <path
          d="M1260 32 Q1260 38 1254 42"
          strokeDasharray="20"
          strokeDashoffset={isRevealed ? 0 : 20}
          className="transition-all duration-600 ease-out delay-600"
        />

        {/* 5. CÁC TUA CUỐN LÁ SEN UỐN XOẮN (Stylized Lotus Leaf Tendrils) */}
        <path
          d="M90 32 C96 24, 106 24, 104 31 C102 36, 94 36, 96 42"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M270 30 C276 38, 286 38, 284 31 C282 26, 274 26, 276 20"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M450 32 C456 24, 466 24, 464 31 C462 36, 454 36, 456 42"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M630 30 C636 38, 646 38, 644 31 C642 26, 634 26, 636 20"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M810 32 C816 24, 826 24, 824 31 C822 36, 814 36, 816 42"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M990 30 C996 38, 1006 38, 1004 31 C1002 26, 994 26, 996 20"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M1170 32 C1176 24, 1186 24, 1184 31 C1182 36, 1174 36, 1176 42"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />
        <path
          d="M1350 30 C1356 38, 1366 38, 1364 31 C1362 26, 1354 26, 1356 20"
          strokeDasharray="40"
          strokeDashoffset={isRevealed ? 0 : 40}
          className="transition-all duration-700 ease-out delay-600 opacity-70"
        />

        {/* 6. HẠT NHỤY SEN TRUYỀN THỐNG (Decorative Lotus Seed Pearls) */}
        {[180, 360, 540, 720, 900, 1080, 1260].map((cx, idx) => (
          <circle
            key={cx}
            cx={cx}
            cy={cx === 720 ? 25 : 22}
            r="1.8"
            className={`fill-[#E0A526] transition-opacity duration-700 ${
              isRevealed ? 'opacity-80' : 'opacity-0'
            }`}
            style={{ transitionDelay: `${600 + idx * 80}ms` }}
          />
        ))}
      </svg>
    );
  }

  if (type === 'cloud') {
    // Dong Son stylized rolling cloud motif (Mây cuộn Đông Sơn nét dày và đậm màu)
    return (
      <svg
        ref={ref}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className={`w-full h-10 sm:h-12 stroke-[#C58917] dark:stroke-[#F2BD42] fill-none stroke-[2.2] opacity-90 dark:opacity-95 transition-all duration-1000 ease-out will-change-transform ${className}`}
        aria-hidden="true"
      >
        {/* Dải mây cuộn trên trải dài từ lề trái sang lề phải */}
        <path
          d="M0 45 Q90 20, 180 35 Q270 12, 360 30 Q450 18, 540 38 Q630 15, 720 32 Q810 12, 900 35 Q990 18, 1080 32 Q1170 15, 1260 35 Q1350 20, 1440 45"
          strokeDasharray="1800"
          strokeDashoffset={isRevealed ? 0 : 1800}
          className="transition-all duration-1200 ease-out"
        />
        {/* Dải mây cuộn lớp dưới so le mềm mại */}
        <path
          d="M0 52 Q120 35, 240 45 Q360 28, 480 44 Q600 25, 720 42 Q840 28, 960 45 Q1080 30, 1200 44 Q1320 32, 1440 52"
          strokeDasharray="1800"
          strokeDashoffset={isRevealed ? 0 : 1800}
          className="transition-all duration-1200 ease-out delay-200"
        />
        {/* Các xoáy mây cuộn biểu trưng kiểu trống đồng Đông Sơn */}
        <circle
          cx="270"
          cy="22"
          r="4"
          strokeDasharray="30"
          strokeDashoffset={isRevealed ? 0 : 30}
          className="transition-all duration-700 ease-out delay-500"
        />
        <circle
          cx="630"
          cy="24"
          r="4"
          strokeDasharray="30"
          strokeDashoffset={isRevealed ? 0 : 30}
          className="transition-all duration-700 ease-out delay-600"
        />
        <circle
          cx="990"
          cy="26"
          r="4"
          strokeDasharray="30"
          strokeDashoffset={isRevealed ? 0 : 30}
          className="transition-all duration-700 ease-out delay-700"
        />
        <circle
          cx="1350"
          cy="28"
          r="4"
          strokeDasharray="30"
          strokeDashoffset={isRevealed ? 0 : 30}
          className="transition-all duration-700 ease-out delay-800"
        />
      </svg>
    );
  }

  // Wave motif (Sóng thủy ba nét dày và đậm màu thuần Việt)
  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={`w-full h-8 sm:h-10 stroke-[#C58917] dark:stroke-[#F2BD42] fill-none stroke-[2.2] opacity-90 dark:opacity-95 transition-all duration-1000 ease-out will-change-transform ${className}`}
      aria-hidden="true"
    >
      {/* Lớp sóng 1: Đường lượn chính trải dài từ x=0 đến x=1440 */}
      <path
        d="M0 24 Q60 6, 120 24 T240 24 T360 24 T480 24 T600 24 T720 24 T840 24 T960 24 T1080 24 T1200 24 T1320 24 T1440 24"
        strokeDasharray="1600"
        strokeDashoffset={isRevealed ? 0 : 1600}
        className="transition-all duration-1200 ease-out"
      />
      {/* Lớp sóng 2: Đường lượn phụ so le tạo chiều sâu lớp sóng nước */}
      <path
        d="M0 32 Q60 14, 120 32 T240 32 T360 32 T480 32 T600 32 T720 32 T840 32 T960 32 T1080 32 T1200 32 T1320 32 T1440 32"
        strokeDasharray="1600"
        strokeDashoffset={isRevealed ? 0 : 1600}
        className="transition-all duration-1200 ease-out delay-200"
      />
      {/* Điểm nhấn bọt sóng tơ tinh tế tại các đỉnh sóng */}
      <circle
        cx="360"
        cy="15"
        r="2.8"
        className={`fill-[#C58917] dark:fill-[#F2BD42] transition-opacity duration-700 delay-500 ${isRevealed ? 'opacity-90' : 'opacity-0'}`}
      />
      <circle
        cx="720"
        cy="15"
        r="3.2"
        className={`fill-[#C58917] dark:fill-[#F2BD42] transition-opacity duration-700 delay-600 ${isRevealed ? 'opacity-95' : 'opacity-0'}`}
      />
      <circle
        cx="1080"
        cy="15"
        r="2.8"
        className={`fill-[#C58917] dark:fill-[#F2BD42] transition-opacity duration-700 delay-700 ${isRevealed ? 'opacity-90' : 'opacity-0'}`}
      />
    </svg>
  );
};
