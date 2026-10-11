/**
 * Component bao bọc hiệu ứng xuất hiện khi cuộn (Reveal on scroll):
 * Chuyển đổi từ opacity 0, translateY(24px), blur(6px) sang hiển thị sắc nét.
 * Hỗ trợ delay trễ stagger cho các danh sách và tôn trọng prefers-reduced-motion.
 */
import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  className = '',
  threshold = 0.15,
  ...props
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold, delayMs });

  if (prefersReduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity,filter] ${
        isRevealed
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-6 blur-[6px]'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
