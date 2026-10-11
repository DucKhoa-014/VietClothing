import React, { useState } from 'react';
import { getAllNguon } from '../data/vietPhucData';
import { ExternalLink, BookMarked, Filter } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';

export const NguonTable: React.FC = () => {
  const allNguon = getAllNguon();
  const [selectedLoai, setSelectedLoai] = useState<string>('all');

  const categories = ['all', 'Học thuật', 'Báo chí', 'Bảo tàng', 'Sách chuyên khảo', 'Phổ thông'];

  const filteredNguon = allNguon.filter((n) => {
    if (selectedLoai === 'all') return true;
    return n.loai.includes(selectedLoai);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        soThuTu="Tư Liệu & Kiểm Chứng"
        tieuDe="Nguồn Tham Khảo & Độ Tin Cậy"
        moTa="Dự án tôn trọng tuyệt đối giá trị lịch sử. Mọi thông tin văn hóa trong ứng dụng đều được gắn nhãn trạng thái kiểm chứng và mã nguồn tra cứu minh bạch."
      />

      {/* Filter by Category */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Phân loại nguồn:</span>
        </div>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedLoai(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedLoai === cat
                ? 'bg-[#B8322A] text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#E0A526]'
            }`}
          >
            {cat === 'all' ? 'Tất cả (30 nguồn)' : cat}
          </button>
        ))}
      </div>

      {/* Sources Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F2E6CF]/70 dark:bg-stone-800 text-[#262626] dark:text-[#F2E6CF] border-b border-stone-200 dark:border-stone-700 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4 w-16">Mã</th>
              <th className="py-3.5 px-4">Tên tài liệu / Tác giả / Xuất bản</th>
              <th className="py-3.5 px-4 w-32">Loại nguồn</th>
              <th className="py-3.5 px-4 w-40">Ghi chú</th>
              <th className="py-3.5 px-4 w-28 text-right">Liên kết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {filteredNguon.map((n) => {
              const isReplaced =
                n.ghi_chu.includes('Đã thay') || n.ghi_chu.includes('Chỉ còn hỗ trợ');

              return (
                <tr
                  key={n.id}
                  id={`nguon-${n.id}`}
                  className={`hover:bg-[#F6F1E7]/40 dark:hover:bg-stone-800/40 transition-colors ${
                    isReplaced ? 'opacity-60 bg-stone-50/50 dark:bg-stone-900/50' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#B8322A] dark:text-[#E0483E]">
                    {n.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#262626] dark:text-[#F2E6CF]">
                    {n.ten}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-chu-phu text-[11px] font-medium">
                      {n.loai}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                    {n.ghi_chu || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {n.url ? (
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#5E3F73] dark:text-[#906BAE] hover:underline font-medium"
                      >
                        <span>Truy cập</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
