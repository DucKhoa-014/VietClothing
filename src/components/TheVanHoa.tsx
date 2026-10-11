import React from 'react';
import { TrangPhuc } from '../types';
import { NhanKiemChung } from './NhanKiemChung';
import { MaNguon } from './MaNguon';
import { BookOpen } from 'lucide-react';

interface Props {
  mucCon?: TrangPhuc;
  trangPhuc?: TrangPhuc;
  onSelectSource?: (ma: string) => void;
  className?: string;
}

export const TheVanHoa: React.FC<Props> = ({
  mucCon,
  trangPhuc,
  onSelectSource,
  className = '',
}) => {
  const item = trangPhuc || mucCon;
  if (!item) return null;

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl bg-nen-phu/60 dark:bg-stone-900/60 border-l-4 border-l-nghe border border-vien shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
        <div className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-chu">
          <BookOpen className="w-4 h-4 text-son flex-shrink-0" />
          <span>{item.ten}</span>
        </div>
        <NhanKiemChung trangThai={item.trang_thai_kiem_chung} />
      </div>

      <p className="text-xs leading-relaxed text-chu-phu mb-2.5">
        {item.mo_ta}
      </p>

      {item.nguon && item.nguon.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-vien/50">
          <span className="text-[11px] text-chu-phu/70">Nguồn:</span>
          {item.nguon.map((n) => (
            <MaNguon key={n} maNguon={n} onClick={onSelectSource} />
          ))}
        </div>
      )}
    </div>
  );
};
