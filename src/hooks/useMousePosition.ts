/**
 * Hook theo dõi tọa độ chuột mượt mà bằng requestAnimationFrame,
 * chỉ kích hoạt khi thiết bị hỗ trợ con trỏ chuột chính xác (fine pointer).
 */
import { useEffect, useState, useRef } from 'react';

export function useMousePosition() {
  const [isFinePointer, setIsFinePointer] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointer = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', updatePointer);

    if (!isFinePointer) return;

    let rafId: number;
    let pendingX = -100;
    let pendingY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          mouseRef.current.x = pendingX;
          mouseRef.current.y = pendingY;
          rafId = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', updatePointer);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFinePointer]);

  return { mouseRef, isFinePointer };
}
