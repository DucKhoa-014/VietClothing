import React, { useState } from 'react';
import { getAllMauSac, getAllBoiCanh } from '../data/vietPhucData';
import { Copy, Check, Filter, Sparkles } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';
import { NhanKiemChung } from './NhanKiemChung';

interface Props {
  onSelectColorForStudio?: (hex: string) => void;
}

export const BangMauGrid: React.FC<Props> = () => {
  const allMau = getAllMauSac();
  const allBoiCanh = getAllBoiCanh();

  const [selectedBoiCanhId, setSelectedBoiCanhId] = useState<string>('all');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const selectedBoiCanh = allBoiCanh.find((b) => b.id === selectedBoiCanhId);
  const activeColorSet = selectedBoiCanh ? new Set(selectedBoiCanh.bang_mau_goi_y.mau) : null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        soThuTu="Sắc Màu Thuần Việt"
        tieuDe="Bảng Màu Trang Phục Truyền Thống"
        moTa="23 sắc màu truyền thống với tên gọi mang đậm bản sắc văn hóa dân tộc. Bấm vào bất kỳ ô màu nào để sao chép mã Hex."
      />

      {/* Filter by occasion */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Lọc làm nổi bật theo dịp:</span>
        </div>

        <select
          value={selectedBoiCanhId}
          onChange={(e) => setSelectedBoiCanhId(e.target.value)}
          className="text-xs font-medium p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[#262626] dark:text-[#F2E6CF] focus:outline-none focus:ring-2 focus:ring-[#E0A526] cursor-pointer"
        >
          <option value="all">Tất cả sắc màu (23 màu)</option>
          {allBoiCanh.map((bc) => (
            <option key={bc.id} value={bc.id}>
              {bc.ten} ({bc.bang_mau_goi_y.mau.length} màu)
            </option>
          ))}
        </select>

        {selectedBoiCanh && (
          <NhanKiemChung trangThai={selectedBoiCanh.bang_mau_goi_y.trang_thai} />
        )}
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allMau.map((mau) => {
          const isHighlighted = !activeColorSet || activeColorSet.has(mau.id);
          const isCopied = copiedHex === mau.hex;

          return (
            <div
              key={mau.id}
              onClick={() => handleCopy(mau.hex)}
              data-cursor="link"
              className={`group relative p-3 rounded-2xl bg-white/80 dark:bg-stone-900/80 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isHighlighted
                  ? 'border-stone-200 dark:border-stone-800 hover:border-[#E0A526] hover:shadow-lg hover:-translate-y-1'
                  : 'opacity-40 grayscale-40 border-stone-200/50 dark:border-stone-800/50'
              }`}
            >
              {/* Color Swatch with color-matched glow on hover */}
              <div
                className="w-full aspect-square rounded-xl mb-3 shadow-inner border border-black/10 relative overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: mau.hex,
                  boxShadow: `0 4px 14px ${mau.hex}40`,
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: mau.hex }}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center z-10">
                  <span className="opacity-0 group-hover:opacity-100 text-white drop-shadow-md text-xs font-semibold flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md transition-opacity">
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
                  </span>
                </div>
              </div>

              {/* Color Details */}
              <div>
                <h4 className="font-semibold text-xs text-[#262626] dark:text-[#F2E6CF] group-hover:text-[#B8322A] dark:group-hover:text-[#E0483E] transition-colors">
                  {mau.ten}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mt-1">
                  <span>{mau.hex}</span>
                  {mau.id === 'do_tham' && (
                    <span className="text-[10px] text-emerald-600 font-sans font-medium" title="Có nguồn học thuật S12">
                      S12
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural note footer */}
      <div className="mt-12 p-4 rounded-xl bg-[#F2E6CF]/50 dark:bg-stone-900/60 border border-[#E0A526]/20 text-xs text-[#6A4A34] dark:text-[#D8C3A5]">
        <strong>Ghi chú học thuật & thẩm mỹ:</strong> Bảng màu được xây dựng dựa trên các gam màu tự nhiên từ thảo mộc (trái mặc nưa, lá bàng, trâm bầu), gấm lụa truyền thống và thẩm mỹ Việt qua các thời kỳ. Trừ một số màu có nguồn sử liệu cụ thể (như màu Yếm đỏ thắm trong S12), phần lớn là gợi ý thẩm mỹ phối đồ hài hòa.
      </div>
    </div>
  );
};
