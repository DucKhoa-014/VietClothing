/**
 * Chip phụ kiện tinh tế (ChipPhuKien):
 * - Tối giản viền và nền nặng.
 * - Mục đang chọn: viền vàng nghệ mảnh (border-[#E0A526]) và một chấm sáng phát quang.
 * - Trạng thái khóa: mờ nhẹ với tooltip lý do.
 */
import React from 'react';
import { PhuKien } from '../types';
import { Lock } from 'lucide-react';

interface Props {
  phuKien: PhuKien;
  isSelected: boolean;
  isDisabled: boolean;
  lockReason?: string;
  onToggle: (id: string) => void;
}

export const ChipPhuKien: React.FC<Props> = ({
  phuKien,
  isSelected,
  isDisabled,
  lockReason,
  onToggle,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onToggle(phuKien.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      data-cursor={isDisabled ? 'hide' : 'link'}
      title={isDisabled ? `Đã khóa: ${lockReason || 'Không khả dụng'}` : phuKien.ghi_chu || phuKien.ten}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 select-none ${
        isSelected
          ? 'bg-[#B8322A]/10 dark:bg-[#E0483E]/15 border border-[#E0A526] dark:border-[#F2BD42] text-[#B8322A] dark:text-[#F2BD42] font-semibold shadow-xs cursor-pointer'
          : isDisabled
          ? 'bg-transparent text-stone-400 dark:text-stone-600 border border-transparent cursor-not-allowed opacity-50'
          : 'bg-white/60 dark:bg-stone-800/60 text-[#262626]/80 dark:text-[#F2E6CF]/80 border border-stone-200/60 dark:border-stone-700/60 hover:border-[#E0A526]/60 hover:text-[#B8322A] dark:hover:text-[#F2BD42] cursor-pointer'
      }`}
    >
      {isSelected ? (
        // Glowing dot when selected
        <span className="w-1.5 h-1.5 rounded-full bg-[#E0A526] shadow-[0_0_6px_#E0A526]" />
      ) : isDisabled ? (
        <Lock className="w-2.5 h-2.5 text-stone-400 dark:text-stone-600" />
      ) : (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            phuKien.nhom === 'remix' ? 'bg-[#5E3F73]' : 'bg-[#E0A526]/60'
          }`}
        />
      )}

      <span>{phuKien.ten}</span>

      {phuKien.nhom === 'remix' && !isDisabled && !isSelected && (
        <span className="text-[9px] text-[#5E3F73] dark:text-[#906BAE] font-mono opacity-80">
          remix
        </span>
      )}
    </button>
  );
};
