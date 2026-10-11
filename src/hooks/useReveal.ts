/**
 * Hook quan sát xuất hiện (reveal) theo cuộn trang bằng IntersectionObserver.
 * Kích hoạt mượt mà chỉ một lần với ngưỡng threshold 0.15 và hỗ trợ trễ stagger.
 */
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseRevealOptions {
  threshold?: number;
  delayMs?: number;
  once?: boolean;
}

export function useReveal<T extends Element = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, delayMs = 0, once = true } = options;
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => {
                setIsRevealed(true);
              }, delayMs);
            } else {
              setIsRevealed(true);
            }

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delayMs, once, prefersReduced]);

  return { ref, isRevealed };
}
