/**
 * Hook tính toán tiến độ cuộn trang, hướng cuộn (lên/xuống) và vị trí đỉnh trang,
 * tối ưu hóa với requestAnimationFrame và passive listener.
 */
import { useState, useEffect } from 'react';

export interface ScrollState {
  progress: number;
  scrollY: number;
  direction: 'up' | 'down';
  isAtTop: boolean;
}

export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    direction: 'up',
    isAtTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      const isAtTop = currentScrollY <= 20;

      setScrollState({
        progress,
        scrollY: currentScrollY,
        direction,
        isAtTop,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}
