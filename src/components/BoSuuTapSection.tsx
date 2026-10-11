import React, { useState, useMemo } from 'react';
import { getSelectableTrangPhuc } from '../data/vietPhucData';
import { TrangPhuc } from '../types';
import { TheTrangPhuc } from './TheTrangPhuc';
import { PageHeader } from './ui/PageHeader';
import { Reveal } from './effects/Reveal';
import { Filter, Sparkles } from 'lucide-react';

interface Props {
  onSelectTrangPhuc: (tp: TrangPhuc) => void;
  onQuickRemix: (tp: TrangPhuc) => void;
}

export const BoSuuTapSection: React.FC<Props> = ({ onSelectTrangPhuc, onQuickRemix }) => {
  const allCostumes = useMemo(() => getSelectableTrangPhuc(), []);

  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCostumes = useMemo(() => {
    return allCostumes.filter((tp) => {
      // Gender filter
      if (genderFilter !== 'all') {
        if (genderFilter === 'nam' && !tp.gioi_tinh.toLowerCase().includes('nam')) return false;
        if (genderFilter === 'nu' && !tp.gioi_tinh.toLowerCase().includes('nữ')) return false;
      }

      // Style level filter
      if (styleFilter !== 'all') {
        if (tp.muc_phong_cach_toi_da !== styleFilter) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (tp.trang_thai_kiem_chung !== statusFilter) return false;
      }

      return true;
    });
  }, [allCostumes, genderFilter, styleFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        soThuTu="Kho Tàng Hiện Vật"
        tieuDe="Bộ Sưu Tập Việt Phục"
        moTa="Khám phá kho tàng di sản y phục truyền thống Việt Nam qua các thời kỳ."
      />

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Bộ lọc:</span>
        </div>

        {/* Gender filter */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="text-xs font-medium p-2 rounded-xl bg-[#F6F1E7]/60 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#262626] dark:text-[#F2E6CF] focus:outline-none focus:ring-2 focus:ring-[#E0A526] cursor-pointer"
        >
          <option value="all">Giới tính: Tất cả</option>
          <option value="nam">Trang phục Nam</option>
          <option value="nu">Trang phục Nữ</option>
        </select>

        {/* Max Style Filter */}
        <select
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
          className="text-xs font-medium p-2 rounded-xl bg-[#F6F1E7]/60 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#262626] dark:text-[#F2E6CF] focus:outline-none focus:ring-2 focus:ring-[#E0A526] cursor-pointer"
        >
          <option value="all">Mức phong cách tối đa: Tất cả</option>
          <option value="truyen_thong">Truyền thống</option>
          <option value="cach_tan_nhe">Cách tân nhẹ</option>
          <option value="remix_gen_z">Remix Gen Z</option>
        </select>

        {/* Verification status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs font-medium p-2 rounded-xl bg-[#F6F1E7]/60 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#262626] dark:text-[#F2E6CF] focus:outline-none focus:ring-2 focus:ring-[#E0A526] cursor-pointer"
        >
          <option value="all">Kiểm chứng: Tất cả</option>
          <option value="Đã có nguồn">Đã có nguồn</option>
          <option value="Cần kiểm chứng">Cần kiểm chứng</option>
        </select>

        <span className="text-xs text-stone-500 ml-auto font-medium">
          Hiển thị: <strong>{filteredCostumes.length}</strong> trang phục
        </span>
      </div>

      {/* Grid of Costumes with Staggered Reveal */}
      {filteredCostumes.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-nen-phu/40 border border-dashed border-vien">
          <p className="text-sm font-medium text-chu mb-1">Không tìm thấy trang phục phù hợp</p>
          <p className="text-xs text-chu-phu mb-4">Vui lòng điều chỉnh lại bộ lọc giới tính, phong cách hoặc kiểm chứng.</p>
          <button
            type="button"
            onClick={() => {
              setGenderFilter('all');
              setStyleFilter('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 text-xs rounded-xl bg-son text-white hover:bg-son/90 font-medium transition-colors cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCostumes.map((tp, idx) => (
            <Reveal key={tp.id} delayMs={idx * 80}>
              <TheTrangPhuc
                trangPhuc={tp}
                onSelect={onSelectTrangPhuc}
                onQuickRemix={onQuickRemix}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};
