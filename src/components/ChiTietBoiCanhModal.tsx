import React from 'react';
import { BoiCanh } from '../types';
import { getTrangPhucById, getMauSacById } from '../data/vietPhucData';
import { X, Calendar, ArrowRight, ShieldCheck, Palette, Sparkles } from 'lucide-react';
import { NhanKiemChung } from './NhanKiemChung';

interface Props {
  boiCanh: BoiCanh;
  onClose: () => void;
  onGoToStudio: (boiCanh: BoiCanh) => void;
}

export const ChiTietBoiCanhModal: React.FC<Props> = ({ boiCanh, onClose, onGoToStudio }) => {
  const nuCostumes = boiCanh.trang_phuc_nu.map((id) => getTrangPhucById(id)).filter(Boolean);
  const namCostumes = boiCanh.trang_phuc_nam.map((id) => getTrangPhucById(id)).filter(Boolean);
  const suggestedColors = boiCanh.bang_mau_goi_y.mau.map((id) => getMauSacById(id)).filter(Boolean);

  const mucToiDaTen =
    boiCanh.muc_phong_cach_toi_da === 'remix_gen_z'
      ? 'Remix Gen Z'
      : boiCanh.muc_phong_cach_toi_da === 'cach_tan_nhe'
      ? 'Cách tân nhẹ'
      : 'Truyền thống';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#F6F1E7] dark:bg-[#1C1A17] rounded-3xl border border-[#E0A526]/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col curtain-enter">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E0A526]/20 bg-white/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-serif-vi text-xl sm:text-2xl font-bold text-[#262626] dark:text-[#F2E6CF]">
              {boiCanh.ten}
            </h2>
            <span className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#E0A526]/20 text-[#855B14] dark:text-[#F2BD42] font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {boiCanh.thoi_diem}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-2 rounded-full hover:bg-stone-200/80 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Cultural Guidelines */}
          <div className="p-4 rounded-2xl bg-[#F2E6CF]/60 dark:bg-[#282420] border-l-4 border-l-[#E0A526] border border-[#E0A526]/20">
            <span className="font-bold text-xs uppercase tracking-wider text-[#855B14] dark:text-[#F2BD42] block mb-1">
              Lưu ý văn hóa & Không gian mặc:
            </span>
            <p className="text-[#262626] dark:text-[#F2E6CF] leading-relaxed">
              {boiCanh.luu_y_van_hoa}
            </p>
          </div>

          {/* User Needs */}
          <div>
            <span className="font-bold text-xs uppercase tracking-wider text-stone-500 block mb-2">
              Nhu cầu thực tế của người mặc:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {boiCanh.nhu_cau.map((nc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E0A526] mt-1.5 flex-shrink-0" />
                  <span className="text-stone-800 dark:text-stone-200">{nc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Costumes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Female */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-xs text-[#B8322A] dark:text-[#E0483E] uppercase tracking-wider block mb-2">
                Trang phục Nữ phù hợp:
              </span>
              <div className="space-y-1.5">
                {nuCostumes.map((tp) => (
                  <div key={tp!.id} className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 font-medium">
                    {tp!.ten}
                  </div>
                ))}
              </div>
            </div>

            {/* Male */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-xs text-[#23395B] dark:text-[#906BAE] uppercase tracking-wider block mb-2">
                Trang phục Nam phù hợp:
              </span>
              <div className="space-y-1.5">
                {namCostumes.map((tp) => (
                  <div key={tp!.id} className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 font-medium">
                    {tp!.ten}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Color palette */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-stone-500">
                Bảng màu gợi ý cho dịp này:
              </span>
              <NhanKiemChung trangThai={boiCanh.bang_mau_goi_y.trang_thai} />
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestedColors.map((mau) => (
                <div
                  key={mau!.id}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: mau!.hex }}
                  />
                  <span className="font-medium text-xs text-stone-800 dark:text-stone-200">{mau!.ten}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Single text-based primary action */}
        <div className="p-4 sm:p-6 border-t border-[#E0A526]/20 bg-white/50 dark:bg-stone-900/50 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Mức tối đa gợi ý: <strong className="text-[#B8322A] dark:text-[#F2BD42]">{mucToiDaTen}</strong>
          </span>

          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToStudio(boiCanh);
            }}
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-serif-vi font-bold text-sm sm:text-base text-[#B8322A] dark:text-[#F2BD42] nav-link-underline py-1 cursor-pointer"
          >
            <span>Phối đồ cho dịp này</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
