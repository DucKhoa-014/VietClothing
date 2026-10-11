import React, { ReactNode } from 'react';

export interface PageHeaderProps {
  soThuTu?: string;
  soThuTuClassName?: string;
  tieuDe: string;
  moTa?: string;
  hanhDong?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  soThuTu,
  soThuTuClassName,
  tieuDe,
  moTa,
  hanhDong,
  className = '',
}) => {
  return (
    <header className={`pt-[var(--nav-h,64px)] mb-8 sm:mb-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          {soThuTu && (
            <span className={`font-serif-vi uppercase tracking-widest text-son font-semibold block mb-1 ${soThuTuClassName || 'text-xs'}`}>
              {soThuTu}
            </span>
          )}
          <h1 className="font-serif-vi text-3xl sm:text-4xl font-bold text-chu title-shimmer">
            {tieuDe}
          </h1>
          {moTa && (
            <p className="text-sm sm:text-base text-chu-phu max-w-2xl mt-1.5 leading-relaxed opacity-90">
              {moTa}
            </p>
          )}
        </div>
        {hanhDong && <div className="flex-shrink-0 flex items-center gap-3">{hanhDong}</div>}
      </div>
    </header>
  );
};
