/**
 * Hộp thoại chi tiết trang phục (ChiTietTrangPhucModal):
 * - Trình bày tư liệu văn hóa, lịch sử, nguồn kiểm chứng S1-S30
 * - Hiển thị ảnh hiện vật thực tế hoặc trạng thái số hóa
 * - Phân cấp thông tin rõ ràng, hỗ trợ đóng bằng phím ESC và phím Tab
 */
import React, { useEffect } from 'react';
import { TrangPhuc } from '../types';
import { NhanKiemChung } from './NhanKiemChung';
import { MaNguon } from './MaNguon';
import { TheVanHoa } from './TheVanHoa';
import { VisualCostumePreview } from './VisualCostumePreview';
import { getChildrenOfTrangPhuc, getMauSacById, getPhuKienById } from '../data/vietPhucData';
import { kiemTraTrangPhucCoAnh, layLyDoChuaCoAnh } from '../config/anhTrangPhuc';
import { X, ArrowRight, ShieldCheck, Sparkles, AlertTriangle, Layers, Lock } from 'lucide-react';

interface Props {
  trangPhuc: TrangPhuc;
  onClose: () => void;
  onGoToStudio: (trangPhuc: TrangPhuc) => void;
  onSelectSource?: (ma: string) => void;
}

export const ChiTietTrangPhucModal: React.FC<Props> = ({
  trangPhuc,
  onClose,
  onGoToStudio,
  onSelectSource,
}) => {
  const children = getChildrenOfTrangPhuc(trangPhuc.id);
  const coAnh = kiemTraTrangPhucCoAnh(trangPhuc.id);
  const lyDoThieuAnh = layLyDoChuaCoAnh(trangPhuc.id);

  // Đóng modal bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const defaultMainColor =
    trangPhuc.id === 'ao_tu_than'
      ? getMauSacById('xanh_lam') || { id: 'xanh_lam', ten: 'Xanh lam', hex: '#2F5C8A', nhom: null }
      : trangPhuc.id === 'ao_ba_ba'
      ? getMauSacById('xanh_reu') || { id: 'xanh_reu', ten: 'Xanh rêu', hex: '#5E6E50', nhom: null }
      : trangPhuc.id === 'ao_dai_hien_dai'
      ? getMauSacById('xanh_ngoc') || { id: 'xanh_ngoc', ten: 'Xanh ngọc', hex: '#2E8A7C', nhom: null }
      : getMauSacById('nau_non') || { id: 'nau_non', ten: 'Nâu non', hex: '#8A5D3B', nhom: null };

  const defaultSubColor =
    trangPhuc.id === 'ao_tu_than'
      ? getMauSacById('do_son') || { id: 'do_son', ten: 'Đỏ son', hex: '#B8322A', nhom: null }
      : trangPhuc.id === 'ao_ba_ba'
      ? getMauSacById('den') || { id: 'den', ten: 'Đen', hex: '#262626', nhom: 'den' }
      : trangPhuc.id === 'ao_dai_hien_dai'
      ? getMauSacById('trang') || { id: 'trang', ten: 'Trắng', hex: '#FFFFFF', nhom: 'trang' }
      : getMauSacById('be') || { id: 'be', ten: 'Be', hex: '#D8C2A3', nhom: null };

  const traditionalAccessories = (trangPhuc.phu_kien_truyen_thong || [])
    .map((id) => getPhuKienById(id))
    .filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-costume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-nen dark:bg-[#1C1A17] rounded-3xl border border-vien/80 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col curtain-enter">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-vien/60 bg-nen-phu/40 dark:bg-black/40">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 id="modal-costume-title" className="font-serif-vi text-xl sm:text-2xl font-bold text-chu">
              {trangPhuc.ten}
            </h2>
            <NhanKiemChung trangThai={trangPhuc.trang_thai_kiem_chung} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ chi tiết"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-chu-phu hover:text-chu transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-nghe"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thân nội dung */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Hàng 1: Khung ảnh hiện vật & Mô tả lịch sử */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-xs">
                <VisualCostumePreview
                  trangPhuc={trangPhuc}
                  mauChinh={defaultMainColor}
                  mauPhu={defaultSubColor}
                  phuKienList={[]}
                  mucPhongCachId={trangPhuc.muc_phong_cach_toi_da || 'truyen_thong'}
                  idSuffix={`modal-${trangPhuc.id}`}
                  cheDoXem="the"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-son block mb-1">
                  Nguồn Gốc & Ý Nghĩa Văn Hóa
                </span>
                <p className="text-xs sm:text-sm text-chu leading-relaxed">
                  {trangPhuc.mo_ta}
                </p>
                {trangPhuc.nguon && trangPhuc.nguon.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                    <span className="text-[11px] text-chu-phu">Mã nguồn tham khảo:</span>
                    {trangPhuc.nguon.map((n) => (
                      <MaNguon key={n} maNguon={n} onClick={onSelectSource} />
                    ))}
                  </div>
                )}
              </div>

              {/* Đặc trưng nhận diện */}
              {trangPhuc.dac_trung_nhan_dien && trangPhuc.dac_trung_nhan_dien.length > 0 && (
                <div className="p-3.5 bg-nen-phu/50 dark:bg-black/20 rounded-2xl border border-vien">
                  <span className="text-xs font-bold uppercase tracking-wider text-chu-phu block mb-2">
                    Đặc Trưng Nhận Diện Cốt Lõi
                  </span>
                  <ul className="space-y-1.5 text-xs text-chu">
                    {trangPhuc.dac_trung_nhan_dien.map((dt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-son font-bold">·</span>
                        <span>{dt.ten}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Thành phần cố định */}
              {trangPhuc.thanh_phan_co_dinh && trangPhuc.thanh_phan_co_dinh.length > 0 && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-chu-phu block mb-1.5">
                    Thành phần cố định không thể thiếu:
                  </span>
                  <div className="flex items-center flex-wrap gap-1 text-xs text-chu-phu">
                    {trangPhuc.thanh_phan_co_dinh.map((tp, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span aria-hidden="true" className="text-chu-phu/40">/</span>}
                        <span className="font-medium text-chu">{tp}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hàng 2: Các thẻ văn hóa con */}
          {children.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-vien/60">
              <span className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Kiến thức chuyên sâu & Tranh luận lịch sử</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {children.map((child) => (
                  <TheVanHoa key={child.id} trangPhuc={child} onSelectSource={onSelectSource} />
                ))}
              </div>
            </div>
          )}

          {/* Hàng 3: Phụ kiện truyền thống đi kèm */}
          {traditionalAccessories.length > 0 && (
            <div className="pt-4 border-t border-vien/60">
              <span className="text-xs font-bold uppercase tracking-wider text-chu-phu block mb-2">
                Phụ kiện truyền thống thường đi cùng:
              </span>
              <div className="flex items-center flex-wrap gap-1.5 text-xs text-chu-phu">
                {traditionalAccessories.map((pk, idx) => (
                  <React.Fragment key={pk!.id}>
                    {idx > 0 && <span aria-hidden="true" className="text-chu-phu/40">·</span>}
                    <span>{pk!.ten}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chân hộp thoại */}
        <div className="p-4 sm:p-5 border-t border-vien/60 bg-nen-phu/40 dark:bg-black/40 flex items-center justify-between">
          <span className="text-xs text-chu-phu">
            {coAnh
              ? 'Hiện vật đã có đầy đủ ảnh trình diễn trên sân khấu'
              : lyDoThieuAnh || 'Đang cập nhật ảnh thực tế'}
          </span>

          {coAnh ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToStudio(trangPhuc);
              }}
              className="group inline-flex items-center gap-2 font-serif-vi font-bold text-sm text-son nav-link-underline py-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-nghe rounded"
            >
              <span>Phối trang phục này trong Studio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Chưa mở trên sân khấu</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
