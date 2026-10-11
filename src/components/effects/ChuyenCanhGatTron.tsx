/**
 * Hiệu ứng chuyển cảnh Gạt tròn từ giữa trang ra ngoài rìa trang (ChuyenCanhGatTron)
 * - Nền màu đỏ son truyền thống đặc trưng văn hóa (#B8322A)
 * - Ảnh logo kèm tiêu đề (logo_title.png) căn giữa nổi bật, tỏa sáng
 * - Hiệu ứng quét tròn (Circle Wipe) bung nở từ tâm màn hình ra 4 góc
 * - Tôn trọng prefers-reduced-motion
 */
import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Props {
  isActive: boolean;
  onMidpointReached: () => void;
  onAnimationEnd: () => void;
  logoSrc?: string;
}

export const ChuyenCanhGatTron: React.FC<Props> = ({
  isActive,
  onMidpointReached,
  onAnimationEnd,
  logoSrc = '/logo_title.png',
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<'idle' | 'entering' | 'holding' | 'leaving'>('idle');

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return;
    }

    if (prefersReduced) {
      // Chế độ giảm chuyển động: đổi tab tức thì
      onMidpointReached();
      const t = setTimeout(() => {
        onAnimationEnd();
      }, 100);
      return () => clearTimeout(t);
    }

    // 1. Bước vào: Gạt tròn từ giữa bung ra rìa (350ms)
    setStage('entering');

    // 2. Điểm giữa: Toàn màn hình đã phủ đỏ, đổi tab và cuộn lên đỉnh
    const midTimer = setTimeout(() => {
      setStage('holding');
      onMidpointReached();
    }, 360);

    // 3. Bước ra: Mở màn hình mới (500ms)
    const leaveTimer = setTimeout(() => {
      setStage('leaving');
    }, 540);

    // 4. Kết thúc: Hoàn tất chuyển cảnh
    const endTimer = setTimeout(() => {
      setStage('idle');
      onAnimationEnd();
    }, 860);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(leaveTimer);
      clearTimeout(endTimer);
    };
  }, [isActive, prefersReduced]);

  if (!isActive && stage === 'idle') {
    return null;
  }

  // Lớp CSS theo từng giai đoạn
  let containerStyle: React.CSSProperties = {};
  let contentStyle: React.CSSProperties = {};

  if (stage === 'entering') {
    containerStyle = {
      clipPath: 'circle(150% at 50% 50%)',
      transition: 'clip-path 360ms cubic-bezier(0.22, 1, 0.36, 1)',
    };
    contentStyle = {
      transform: 'scale(1)',
      opacity: 1,
      transition: 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
    };
  } else if (stage === 'holding') {
    containerStyle = {
      clipPath: 'circle(150% at 50% 50%)',
    };
    contentStyle = {
      transform: 'scale(1)',
      opacity: 1,
    };
  } else if (stage === 'leaving') {
    containerStyle = {
      clipPath: 'circle(150% at 50% 50%)',
      opacity: 0,
      transform: 'scale(1.08)',
      transition: 'opacity 320ms cubic-bezier(0.4, 0, 0.2, 1), transform 320ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
    contentStyle = {
      transform: 'scale(1.06)',
      opacity: 0,
      transition: 'transform 300ms ease-out, opacity 260ms ease-out',
    };
  } else {
    containerStyle = {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
    };
    contentStyle = {
      transform: 'scale(0.85)',
      opacity: 0,
    };
  }

  return (
    <div
      role="status"
      aria-label="Đang chuyển mục Bách Y Ký"
      aria-live="polite"
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: '#B8322A',
        backgroundImage: 'radial-gradient(circle at 50% 50%, #C4362E 0%, #B8322A 60%, #941F18 100%)',
        ...containerStyle,
      }}
    >
      {/* Họa tiết ánh sáng & búp hoa hoàng gia */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(224, 165, 38, 0.4) 0%, transparent 65%)',
        }}
      />

      {/* Viền tròn ánh vàng đồng tâm tỏa ra khi gạt */}
      <div
        aria-hidden="true"
        className="absolute w-[450px] h-[450px] sm:w-[580px] sm:h-[580px] rounded-full border border-amber-300/30 animate-pulse pointer-events-none"
      />

      {/* Khối trung tâm: Logo kèm tiêu đề Bách Y Ký */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg will-change-transform"
        style={contentStyle}
      >
        <div className="relative group">
          {/* Quầng sáng vàng nghệ sau logo */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-amber-400/25 blur-2xl pointer-events-none animate-pulse"
          />

          {/* Ảnh logo_title.png */}
          <img
            src={logoSrc}
            alt="Bách Y Ký"
            className="relative max-h-56 sm:max-h-72 w-auto max-w-[85vw] object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
            loading="eager"
          />
        </div>

        {/* Thanh chỉ báo tiến trình tinh tế */}
        <div className="mt-4 flex items-center gap-1.5 opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-bounce" />
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
};
