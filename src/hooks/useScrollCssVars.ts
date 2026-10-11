/**
 * Cập nhật biến CSS toàn cục trên document.documentElement:
 * - --scroll-y: khoảng cách cuộn (px)
 * - --scroll-progress: tiến độ cuộn (0 -> 1)
 * - --nav-h: chiều cao navbar (64px ở đỉnh, 56px khi cuộn)
 * Được chạy qua một vòng rAF duy nhất, không trigger React state.
 */
import { useEffect } from 'react';

export function useScrollCssVars(): void {
  useEffect(() => {
    let ticking = false;
    const root = document.documentElement;

    const updateCssVars = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      root.style.setProperty('--scroll-y', `${scrollY}px`);
      root.style.setProperty('--scroll-progress', progress.toFixed(4));
      root.style.setProperty('--nav-h', scrollY > 20 ? '56px' : '64px');

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCssVars);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCssVars();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
