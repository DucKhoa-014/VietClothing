/**
 * Hook lắng nghe hướng cuộn trang và vị trí đỉnh trang.
 * Chỉ gọi setState khi giá trị thực sự thay đổi (giảm tối đa số lần re-render).
 */
import { useState, useEffect } from 'react';

export interface ScrollDirectionState {
  direction: 'up' | 'down';
  isAtTop: boolean;
}

export function useScrollDirection(threshold = 20): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({
    direction: 'up',
    isAtTop: true,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentDirection: 'up' | 'down' = 'up';
    let currentIsAtTop = window.scrollY <= threshold;

    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const newIsAtTop = scrollY <= threshold;
      const diff = scrollY - lastScrollY;
      let newDirection = currentDirection;

      if (Math.abs(diff) >= 6) {
        newDirection = diff > 0 ? 'down' : 'up';
      }

      if (newDirection !== currentDirection || newIsAtTop !== currentIsAtTop) {
        currentDirection = newDirection;
        currentIsAtTop = newIsAtTop;
        setState({ direction: newDirection, isAtTop: newIsAtTop });
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
