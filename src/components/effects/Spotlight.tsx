/**
 * Component / Thẻ bao bọc đèn rọi bảo tàng (Spotlight):
 * Quầng sáng radial-gradient ~400px màu vàng nghệ dịu mát (8–12% opacity)
 * đi theo con trỏ chuột như ánh đèn rọi trưng bày hiện vật.
 */
import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = '',
  size = 420,
  color = 'rgba(224, 165, 38, 0.10)',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let pendingX = -1000;
    let pendingY = -1000;
    let isInside = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      isInside = true;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          container.style.setProperty('--spot-x', `${pendingX}px`);
          container.style.setProperty('--spot-y', `${pendingY}px`);
          container.style.setProperty('--spot-opacity', isInside ? '1' : '0');
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          container.style.setProperty('--spot-opacity', '0');
          rafId = null;
        });
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight Halo Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 will-change-[background]"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), ${color}, transparent 80%)`,
          opacity: 'var(--spot-opacity, 0)',
        }}
      />
      {children}
    </div>
  );
};
