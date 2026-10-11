/**
 * Hiển thị điểm hài hòa màu sắc (ODiemHaiHoa):
 * - Hiệu ứng số đếm tăng dần (count-up) bằng requestAnimationFrame khi điểm thay đổi.
 * - Vòng tròn tiến độ SVG vẽ dần mượt mà theo tỷ lệ điểm.
 * - Xếp loại và chú thích thẩm mỹ chính xác.
 */
import React, { useState, useEffect, useRef } from 'react';
import { KetQuaHaiHoa } from '../types';
import { Info } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface Props {
  ketQua: KetQuaHaiHoa;
  className?: string;
}

export const ODiemHaiHoa: React.FC<Props> = ({ ketQua, className = '' }) => {
  const { diem, phan_loai, xep_loai, nhac_nho, ly_do } = ketQua;
  const prefersReduced = usePrefersReducedMotion();

  // Smooth count-up state
  const [displayDiem, setDisplayDiem] = useState(diem);
  const previousDiemRef = useRef(diem);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayDiem(diem);
      return;
    }

    const startVal = previousDiemRef.current;
    const endVal = diem;
    const duration = 600; // ms
    const startTime = performance.now();

    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * ease);

      setDisplayDiem(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        previousDiemRef.current = endVal;
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [diem, prefersReduced]);

  // Determine stroke and color theme
  let themeColor = '#B8322A'; // Red
  let badgeBg = 'bg-[#B8322A]/10 text-[#B8322A] border-[#B8322A]/20';

  if (diem >= 85) {
    themeColor = '#10B981'; // Emerald
    badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
  } else if (diem >= 70) {
    themeColor = '#E0A526'; // Gold/Amber
    badgeBg = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
  } else {
    themeColor = '#EF4444'; // Red
    badgeBg = 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  }

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayDiem / 100) * circumference;

  return (
    <div
      className={`p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-[#E0A526]/30 shadow-xs transition-all ${className}`}
    >
      <div className="flex items-center gap-4">
        {/* Circular Progress Ring with Count-up */}
        <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r={radius}
              stroke="currentColor"
              strokeWidth="4.5"
              fill="transparent"
              className="text-stone-200 dark:text-stone-800"
            />
            <circle
              cx="34"
              cy="34"
              r={radius}
              stroke={themeColor}
              strokeWidth="4.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold font-serif-vi text-[#262626] dark:text-[#F2E6CF]">
              {displayDiem}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-stone-500 -mt-1 font-sans">
              /100
            </span>
          </div>
        </div>

        {/* Text information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-[#262626] dark:text-[#F2E6CF]">
              {xep_loai}
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${badgeBg}`}>
              {phan_loai}
            </span>
          </div>
          <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] line-clamp-2">
            {ly_do}
          </p>
        </div>
      </div>

      {/* Reminders / Deductions if any */}
      {nhac_nho.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-stone-200/80 dark:border-stone-800 space-y-1.5">
          {nhac_nho.map((nhac, idx) => (
            <div
              key={idx}
              className="flex items-start gap-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-500/10 p-2 rounded-md"
            >
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{nhac}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
