/**
 * FabricCanvasBackground.tsx
 * Hiệu ứng nền vải lụa tơ tằm cổ truyền kết hợp gợn sóng nhẹ (silk weave texture & undulating wave motion)
 * dành cho nền chính của trang web "Việt Phục Remix".
 * 
 * - Vân sợi dệt lụa gấm / giấy dó tinh tế (warp & weft threads, micro-slub fibers)
 * - Các dải nếp sóng lụa (silk dunes / wave ripples) chuyển động lượn êm đềm như dải lụa bay nhẹ trong không gian bảo tàng
 * - Phản chiếu ánh sáng theo luồng gió và chuột/cuộn trang nhẹ nhàng, giữ tinh thần bảo tàng hiện đại: trang nghiêm, tĩnh lặng và mượt mà.
 */
import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const FabricCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      // Dùng devicePixelRatio hợp lý để tối ưu hiệu năng
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Tạo pattern sợi vải dệt (fabric weave pattern) offline canvas để blit siêu nhẹ
    const weaveCanvas = document.createElement('canvas');
    weaveCanvas.width = 16;
    weaveCanvas.height = 16;
    const wCtx = weaveCanvas.getContext('2d');
    if (wCtx) {
      wCtx.clearRect(0, 0, 16, 16);
      // Sợi dọc (warp)
      wCtx.strokeStyle = 'rgba(224, 165, 38, 0.04)';
      wCtx.lineWidth = 1;
      wCtx.beginPath();
      wCtx.moveTo(0, 4); wCtx.lineTo(16, 4);
      wCtx.moveTo(0, 12); wCtx.lineTo(16, 12);
      wCtx.stroke();

      // Sợi ngang (weft)
      wCtx.strokeStyle = 'rgba(106, 74, 52, 0.035)';
      wCtx.beginPath();
      wCtx.moveTo(4, 0); wCtx.lineTo(4, 16);
      wCtx.moveTo(12, 0); wCtx.lineTo(12, 16);
      wCtx.stroke();

      // Điểm giao sợi tơ (slub highlight)
      wCtx.fillStyle = 'rgba(242, 230, 207, 0.05)';
      wCtx.fillRect(4, 4, 1.5, 1.5);
      wCtx.fillRect(12, 12, 1.5, 1.5);
    }
    const weavePattern = ctx.createPattern(weaveCanvas, 'repeat');

    // Cấu hình các lớp sóng lụa (waves)
    // 3 dải sóng uốn lượn chậm rãi
    const waves = [
      {
        baseY: 0.28,
        amplitude: 28,
        wavelength: 0.0022,
        speed: 0.0006,
        phase: 0,
        colorLight: 'rgba(242, 230, 207, 0.35)',
        colorDark: 'rgba(242, 189, 66, 0.035)',
      },
      {
        baseY: 0.52,
        amplitude: 36,
        wavelength: 0.0016,
        speed: -0.00045,
        phase: 2.1,
        colorLight: 'rgba(224, 165, 38, 0.045)',
        colorDark: 'rgba(224, 72, 62, 0.028)',
      },
      {
        baseY: 0.76,
        amplitude: 30,
        wavelength: 0.0020,
        speed: 0.0005,
        phase: 4.2,
        colorLight: 'rgba(184, 50, 42, 0.03)',
        colorDark: 'rgba(144, 107, 174, 0.03)',
      },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Vẽ các dải sóng lụa mềm mại uốn lượn (silk wave undulations)
      waves.forEach((wave, idx) => {
        ctx.save();
        ctx.beginPath();
        const baseHeight = height * wave.baseY;
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseHeight);

        // Lấy đường cong sóng với sin kết hợp cos bậc 2 cho cảm giác nếp vải lụa tự nhiên
        const step = 20; // 20px mỗi bước để rendering mượt 60fps
        for (let x = 0; x <= width + step; x += step) {
          const waveAngle = x * wave.wavelength + time * wave.speed + wave.phase;
          // Kết hợp sóng sin và họa tiết nếp gấp vải lụa (silk pleats / drape)
          const yOffset =
            Math.sin(waveAngle) * wave.amplitude +
            Math.cos(waveAngle * 0.5 + time * 0.0003) * (wave.amplitude * 0.4);
          ctx.lineTo(x, baseHeight + yOffset);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Gradient màu nếp vải lụa
        const grad = ctx.createLinearGradient(0, baseHeight - wave.amplitude, 0, height);
        const waveColor = isDark ? wave.colorDark : wave.colorLight;
        grad.addColorStop(0, waveColor);
        grad.addColorStop(0.3, waveColor);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // 2. Vẽ đường viền chỉ dệt mảnh ở đỉnh nếp lụa (subtle silk sheen crest line)
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const waveAngle = x * wave.wavelength + time * wave.speed + wave.phase;
          const y = baseHeight + Math.sin(waveAngle) * wave.amplitude + Math.cos(waveAngle * 0.5 + time * 0.0003) * (wave.amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isDark
          ? (idx === 1 ? 'rgba(242, 189, 66, 0.06)' : 'rgba(255, 255, 255, 0.03)')
          : (idx === 1 ? 'rgba(224, 165, 38, 0.09)' : 'rgba(106, 74, 52, 0.05)');
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      });

      // 3. Phủ toàn bộ bằng lớp vân dệt vải (fabric weave texture)
      if (weavePattern) {
        ctx.save();
        ctx.fillStyle = weavePattern;
        ctx.globalAlpha = isDark ? 0.8 : 0.9;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      if (!prefersReduced) {
        time += 16.6; // tương đương 60fps
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Canvas vẽ gợn sóng nếp lụa và sợi dệt */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Lớp màng lụa gấm dệt bóng ngà nhẹ nhàng bổ trợ thêm ánh sáng */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E0A526]/[0.02] to-transparent dark:via-[#F2BD42]/[0.015] pointer-events-none" />
    </div>
  );
};
