import React from 'react';
import { MucPhongCach } from '../types';
import { getMucPhongCachList, getMucPhongCachOrder } from '../data/vietPhucData';
import { ShieldCheck, Sparkles, Zap, AlertTriangle } from 'lucide-react';

interface Props {
  mucHienTai: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  mucToiDa?: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  onChange: (muc: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z') => void;
  className?: string;
}

export const ThanhMucPhongCach: React.FC<Props> = ({
  mucHienTai,
  mucToiDa = 'remix_gen_z',
  onChange,
  className = '',
}) => {
  const list = getMucPhongCachList();
  const maxOrder = getMucPhongCachOrder(mucToiDa);
  const currentOrder = getMucPhongCachOrder(mucHienTai);

  const icons = {
    truyen_thong: <ShieldCheck className="w-4 h-4" />,
    cach_tan_nhe: <Sparkles className="w-4 h-4" />,
    remix_gen_z: <Zap className="w-4 h-4" />,
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Mức phong cách">
        {list.map((muc) => {
          const isSelected = mucHienTai === muc.id;
          const isExceeded = muc.thu_tu > maxOrder;

          return (
            <button
              key={muc.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(muc.id as any)}
              data-cursor="link"
              className={`p-3 rounded-xl text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#B8322A]/10 border border-[#E0A526] text-[#B8322A] dark:bg-[#E0483E]/15 dark:border-[#F2BD42] dark:text-[#F2BD42] shadow-xs'
                  : isExceeded
                  ? 'bg-transparent border border-dashed border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-amber-400'
                  : 'bg-white/60 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70 text-[#262626] dark:text-[#F2E6CF] hover:border-[#E0A526]/70'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  {icons[muc.id as keyof typeof icons]}
                  <span>{muc.ten}</span>
                </div>
                {isExceeded && (
                  <span
                    title="Vượt mức khuyến nghị cho bối cảnh này"
                    className="inline-flex items-center text-[10px] text-amber-600 dark:text-amber-400"
                  >
                    <AlertTriangle className="w-3 h-3" />
                  </span>
                )}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0A526] shadow-[0_0_6px_#E0A526]" />
                )}
              </div>

              <p className="text-[11px] leading-tight opacity-75 line-clamp-2">
                {muc.mo_ta}
              </p>
            </button>
          );
        })}
      </div>

      {currentOrder > maxOrder && (
        <div className="text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>
            Đang chọn vượt mức tối đa gợi ý ({mucToiDa === 'truyen_thong' ? 'Truyền thống' : 'Cách tân nhẹ'}). Vẫn có thể lưu nhưng cần lưu ý trang trọng.
          </span>
        </div>
      )}
    </div>
  );
};
