/**
 * Thẻ bối cảnh / Dịp mặc (TheBoiCanh):
 * - Dùng mẫu "stretched link": tiêu đề là <button> có ::after phủ toàn thẻ.
 * - Nút phụ (phối đồ cho dịp này) đặt relative z-20.
 * - Hỗ trợ điều hướng bàn phím hoàn chỉnh (Tab, focus-visible ring 2px vàng nghệ).
 */
import React from 'react';
import { BoiCanh } from '../types';
import { getMauSacById } from '../data/vietPhucData';
import { Calendar, ArrowRight, Shirt } from 'lucide-react';

interface Props {
  boiCanh: BoiCanh;
  onSelect: (boiCanh: BoiCanh) => void;
  onQuickRemix: (boiCanh: BoiCanh) => void;
}

export const TheBoiCanh: React.FC<Props> = ({ boiCanh, onSelect, onQuickRemix }) => {
  const suggestedColors = boiCanh.bang_mau_goi_y.mau
    .map((id) => getMauSacById(id))
    .filter(Boolean);

  const mucToiDaTen =
    boiCanh.muc_phong_cach_toi_da === 'remix_gen_z'
      ? 'Remix Gen Z'
      : boiCanh.muc_phong_cach_toi_da === 'cach_tan_nhe'
      ? 'Cách tân nhẹ'
      : 'Truyền thống';

  return (
    <div
      data-cursor="view"
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-nen-phu/70 dark:bg-nen-phu/40 border border-vien hover:border-nghe hover:shadow-xl transition-all duration-300 select-none focus-within:ring-2 focus-within:ring-nghe focus-within:ring-offset-2 focus-within:ring-offset-nen"
    >
      {/* Corner Quick-Remix floating button */}
      <button
        type="button"
        onClick={() => onQuickRemix(boiCanh)}
        data-cursor="link"
        title={`Phối đồ cho dịp ${boiCanh.ten}`}
        aria-label={`Phối đồ cho dịp ${boiCanh.ten}`}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-nen/90 text-son hover:bg-son hover:text-white shadow-md border border-vien flex items-center justify-center transition-all duration-200 opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-nghe outline-none"
      >
        <Shirt className="w-3.5 h-3.5" />
      </button>

      <div>
        {/* Header with Timing */}
        <div className="flex items-start justify-between gap-2 mb-2.5 pr-8">
          <button
            type="button"
            onClick={() => onSelect(boiCanh)}
            className="font-serif-vi text-lg font-bold text-chu group-hover:text-son transition-colors text-left leading-snug focus:outline-none after:absolute after:inset-0 after:content-[''] after:cursor-pointer after:z-10"
          >
            {boiCanh.ten}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-chu-phu mb-3">
          <Calendar className="w-3.5 h-3.5 text-son" />
          <span>{boiCanh.thoi_diem}</span>
        </div>

        {/* Cultural note */}
        <p className="text-xs text-chu-phu mb-4 leading-relaxed line-clamp-2">
          {boiCanh.luu_y_van_hoa}
        </p>

        {/* Needs bullet list */}
        <div className="mb-4 space-y-1">
          {boiCanh.nhu_cau.slice(0, 2).map((nc, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-chu">
              <span className="w-1.5 h-1.5 rounded-full bg-nghe mt-1.5 flex-shrink-0" />
              <span className="line-clamp-1">{nc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Color swatches strip */}
        <div className="pt-3 border-t border-vien mb-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] text-chu-phu">Bảng màu gợi ý:</span>
            <span className="text-[11px] font-medium text-son">
              Tối đa: {mucToiDaTen}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {suggestedColors.map((mau) => (
              <span
                key={mau!.id}
                title={mau!.ten}
                className="w-5 h-5 rounded-full border border-black/10 shadow-2xs transition-transform hover:scale-125"
                style={{ backgroundColor: mau!.hex }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className="text-chu-phu font-serif-vi italic opacity-80 group-hover:opacity-100 flex items-center gap-1">
            <span>Chi tiết & tư vấn</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
};
