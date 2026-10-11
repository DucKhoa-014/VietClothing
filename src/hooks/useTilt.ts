/**
 * Hook hiệu ứng nghiêng 3D (tilt) và vệt sáng trượt (glare) cho thẻ hiện vật.
 * Góc nghiêng tối đa 6°, độ sâu perspective 1000px, trả về mượt mà khi rời chuột.
 */
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface TiltOptions {
  maxAngle?: number;
  perspective?: number;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const { maxAngle = 3, perspective = 1000 } = options;
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const card = ref.current;
    if (!card) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let glareX = 50;
    let glareY = 50;
    let glareOpacity = 0;
    let currentGlareOpacity = 0;
    let rafId: number | null = null;
    let isHovering = false;

    const animate = () => {
      // Lerp rotation
      currentRotateX += (targetRotateX - currentRotateX) * 0.15;
      currentRotateY += (targetRotateY - currentRotateY) * 0.15;
      currentGlareOpacity += (glareOpacity - currentGlareOpacity) * 0.15;

      card.style.transform = `perspective(${perspective}px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', `${currentGlareOpacity.toFixed(2)}`);

      if (
        !isHovering &&
        Math.abs(targetRotateX - currentRotateX) < 0.05 &&
        Math.abs(targetRotateY - currentRotateY) < 0.05 &&
        Math.abs(currentGlareOpacity) < 0.01
      ) {
        card.style.transform = '';
        card.style.setProperty('--glare-opacity', '0');
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      isHovering = true;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotateY = normX * maxAngle;
      targetRotateX = -normY * maxAngle;

      glareX = (x / rect.width) * 100;
      glareY = (y / rect.height) * 100;
      glareOpacity = 0.15;

      // Update spot coordinates on element as well
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      glareOpacity = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = '';
    };
  }, [maxAngle, perspective, prefersReduced]);

  return ref;
}
