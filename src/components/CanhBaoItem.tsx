import React, { useState } from 'react';
import { CanhBaoKichHoat } from '../types';
import { AlertTriangle, Info, Check } from 'lucide-react';
import { MaNguon } from './MaNguon';
import { NhanKiemChung } from './NhanKiemChung';

interface Props {
  canhBao: CanhBaoKichHoat;
  onSelectSource?: (ma: string) => void;
}

export const CanhBaoItem: React.FC<Props> = ({ canhBao, onSelectSource }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const isWarning = canhBao.muc_do === 'warning';

  return (
    <div
      role="status"
      className={`relative p-3.5 rounded-xl border transition-all ${
        acknowledged
          ? 'opacity-60 bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800'
          : isWarning
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200'
          : 'bg-sky-500/10 border-sky-500/30 text-sky-950 dark:text-sky-200'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex-shrink-0">
          {isWarning ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          ) : (
            <Info className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-xs font-mono uppercase tracking-wide">
              Lưu ý {canhBao.id}
            </span>
            <NhanKiemChung trangThai={canhBao.trang_thai_kiem_chung} />
          </div>

          <p className="text-xs leading-relaxed mb-2 font-normal">
            {canhBao.thong_diep}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-1.5 flex-wrap">
              {canhBao.nguon.map((n) => (
                <MaNguon key={n} maNguon={n} onClick={onSelectSource} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAcknowledged(!acknowledged)}
              className="text-[11px] px-2 py-0.5 rounded flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Check className="w-3 h-3 text-emerald-600" />
              <span>{acknowledged ? 'Đã hiểu' : 'Ghi nhận'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
