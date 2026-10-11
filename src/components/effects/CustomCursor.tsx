/**
 * Con trỏ chuột tinh gọn (CustomCursor):
 * - Vòng tròn 28px viền vàng nghệ mượt mà. Bỏ chấm đỏ trung tâm.
 * - data-cursor="view": hiển thị chữ "Xem"
 * - data-cursor="zoom": hiển thị chữ "Phóng"
 * - Vô hiệu hóa trên thiết bị cảm ứng hoặc khi prefers-reduced-motion: reduce
 */
import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!media.matches) return;

    setIsEnabled(true);

    const ring = ringRef.current;
    const label = textRef.current;
    if (!ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let cursorMode: 'default' | 'link' | 'view' | 'zoom' | 'hide' = 'default';
    let isPressed = false;
    let rafId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      ringX = lerp(ringX, targetX, 0.2);
      ringY = lerp(ringY, targetY, 0.2);

      let scale = 1;
      if (cursorMode === 'link') {
        scale = 1.35;
      } else if (cursorMode === 'view' || cursorMode === 'zoom') {
        scale = 2.1;
      }

      if (isPressed) {
        scale *= 0.85;
      }

      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(2)})`;

      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = '1';
        ringX = targetX;
        ringY = targetY;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorAttrEl) {
        const mode = cursorAttrEl.getAttribute('data-cursor');
        if (mode === 'view') {
          cursorMode = 'view';
          ring.classList.add('cursor-ring--view');
          ring.classList.remove('cursor-ring--link', 'cursor-ring--zoom');
          if (label) {
            label.textContent = 'Xem';
            label.style.opacity = '1';
          }
          return;
        } else if (mode === 'zoom') {
          cursorMode = 'zoom';
          ring.classList.add('cursor-ring--zoom');
          ring.classList.remove('cursor-ring--link', 'cursor-ring--view');
          if (label) {
            label.textContent = 'Phóng';
            label.style.opacity = '1';
          }
          return;
        } else if (mode === 'hide') {
          cursorMode = 'hide';
          ring.style.opacity = '0';
          if (label) label.style.opacity = '0';
          return;
        } else if (mode === 'link') {
          cursorMode = 'link';
          ring.classList.add('cursor-ring--link');
          ring.classList.remove('cursor-ring--view', 'cursor-ring--zoom');
          if (label) label.style.opacity = '0';
          return;
        }
      }

      const isInteractive = target.closest('a, button, select, [role="button"], [role="radio"]');
      const isInput = target.closest('input, textarea');

      if (isInput) {
        cursorMode = 'hide';
        ring.style.opacity = '0';
        if (label) label.style.opacity = '0';
      } else if (isInteractive) {
        cursorMode = 'link';
        ring.classList.add('cursor-ring--link');
        ring.classList.remove('cursor-ring--view', 'cursor-ring--zoom');
        ring.style.opacity = '1';
        if (label) label.style.opacity = '0';
      } else {
        cursorMode = 'default';
        ring.classList.remove('cursor-ring--link', 'cursor-ring--view', 'cursor-ring--zoom');
        ring.style.opacity = '1';
        if (label) label.style.opacity = '0';
      }
    };

    const handleMouseDown = () => {
      isPressed = true;
    };

    const handleMouseUp = () => {
      isPressed = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      ring.style.opacity = '0';
      if (label) label.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-nghe/80 opacity-0 transition-opacity duration-200 pointer-events-none flex items-center justify-center will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <span
          ref={textRef}
          className="text-[10px] font-serif-vi font-bold uppercase tracking-wider text-son opacity-0 transition-opacity duration-150"
        />
      </div>
    </div>
  );
};
