import React from 'react';
import { getNguonById } from '../data/vietPhucData';

interface Props {
  maNguon: string;
  onClick?: (ma: string) => void;
  className?: string;
}

export const MaNguon: React.FC<Props> = ({ maNguon, onClick, className = '' }) => {
  const nguon = getNguonById(maNguon);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(maNguon);
    } else {
      // Dispatch custom event or window location
      window.location.hash = `#nguon-${maNguon}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={nguon ? `${nguon.ten} (${nguon.loai})` : `Mã nguồn ${maNguon}`}
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#E0A526]/15 hover:bg-[#E0A526]/30 text-[#855B14] dark:text-[#F2BD42] dark:bg-[#F2BD42]/20 border border-[#E0A526]/30 transition-all hover:scale-105 cursor-pointer ${className}`}
    >
      {maNguon}
    </button>
  );
};
