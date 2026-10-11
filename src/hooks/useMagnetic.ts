/**
 * Hook hiệu ứng nam châm (magnetic): hút nhẹ phần tử về phía con trỏ chuột
 * khi chuột trong bán kính 80px (dịch chuyển tối đa 10px).
 * Cập nhật trực tiếp qua transform style để đạt 60fps tuyệt đối.
 */
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface MagneticOptions {
  radius?: number;
  maxDistance?: number;
  strength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(options: MagneticOptions = {}) {
  const { radius = 80, maxDistance = 10, strength = 0.25 } = options;
  const ref = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isHoveringNearby = false;

    const animate = () => {
      // Lerp towards target
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      // Stop loop if close to resting point
      if (
        !isHoveringNearby &&
        Math.abs(targetX - currentX) < 0.05 &&
        Math.abs(targetY - currentY) < 0.05
      ) {
        element.style.transform = '';
        currentX = 0;
        currentY = 0;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        isHoveringNearby = true;
        const factor = (1 - distance / radius) * strength;
        const clampX = Math.max(Math.min(distX * factor, maxDistance), -maxDistance);
        const clampY = Math.max(Math.min(distY * factor, maxDistance), -maxDistance);

        targetX = clampX;
        targetY = clampY;

        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      } else if (isHoveringNearby) {
        isHoveringNearby = false;
        targetX = 0;
        targetY = 0;
        if (!rafId) {
          rafId = requestAnimationFrame(animate);
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      isHoveringNearby = false;
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      if (rafId) cancelAnimationFrame(rafId);
      element.style.transform = '';
    };
  }, [radius, maxDistance, strength, prefersReduced]);

  return ref;
}
