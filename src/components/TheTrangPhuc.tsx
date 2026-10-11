/**
 * Thẻ trang phục truyền thống (TheTrangPhuc):
 * - Trưng bày hình ảnh hiện vật thực tế đã kiểm chứng
 * - Dùng mẫu "stretched link": tiêu đề là <button> có ::after phủ toàn thẻ
 * - Tuân thủ kỷ luật typography & zero-pill: siêu dữ liệu hiển thị dạng chữ phẳng, tinh tế
 * - Nút phối nhanh chỉ kích hoạt với trang phục đã có ảnh thực tế
 * - Hỗ trợ điều hướng bàn phím hoàn chỉnh (Tab, focus-visible ring 2px vàng nghệ)
 */
import React from 'react';
import { TrangPhuc } from '../types';
import { NhanKiemChung } from './NhanKiemChung';
import { VisualCostumePreview } from './VisualCostumePreview';
import { getMauSacById } from '../data/vietPhucData';
import { kiemTraTrangPhucCoAnh, layLyDoChuaCoAnh } from '../config/anhTrangPhuc';
import { useTilt } from '../hooks/useTilt';
import { ArrowRight, User, Shirt, Lock } from 'lucide-react';

interface Props {
  trangPhuc: TrangPhuc;
  onSelect: (trangPhuc: TrangPhuc) => void;
  onQuickRemix: (trangPhuc: TrangPhuc) => void;
}

export const TheTrangPhuc: React.FC<Props> = ({ trangPhuc, onSelect, onQuickRemix }) => {
  const cardRef = useTilt<HTMLDivElement>({ maxAngle: 2 });
  const coAnhThucTe = kiemTraTrangPhucCoAnh(trangPhuc.id);
  const lyDoThieuAnh = layLyDoChuaCoAnh(trangPhuc.id);

  // Màu mặc định
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

  const mucToiDaTen =
    trangPhuc.muc_phong_cach_toi_da === 'remix_gen_z'
      ? 'Remix Gen Z'
      : trangPhuc.muc_phong_cach_toi_da === 'cach_tan_nhe'
      ? 'Cách tân nhẹ'
      : 'Truyền thống';

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col bg-nen-phu/70 dark:bg-black/30 rounded-2xl border border-vien hover:border-nghe hover:shadow-xl transition-all duration-300 overflow-hidden select-none will-change-transform focus-within:ring-2 focus-within:ring-nghe focus-within:ring-offset-2 focus-within:ring-offset-nen"
    >
      {/* Vệt sáng nhẹ khi rê chuột */}
      <div className="absolute inset-0 card-glare z-10 pointer-events-none" />

      {/* Khung trưng bày ảnh thật hoặc thẻ tư liệu đang cập nhật */}
      <div className="relative p-2 bg-nen/60 dark:bg-black/20 pointer-events-none">
        <VisualCostumePreview
          trangPhuc={trangPhuc}
          mauChinh={defaultMainColor}
          mauPhu={defaultSubColor}
          phuKienList={[]}
          mucPhongCachId={trangPhuc.muc_phong_cach_toi_da || 'truyen_thong'}
          idSuffix={`card-${trangPhuc.id}`}
          cheDoXem="the"
        />
        <div className="absolute top-4 left-4 z-20">
          <NhanKiemChung trangThai={trangPhuc.trang_thai_kiem_chung} />
        </div>
      </div>

      {/* Nút phối nhanh ở góc */}
      {coAnhThucTe ? (
        <button
          type="button"
          onClick={() => onQuickRemix(trangPhuc)}
          title={`Phối đồ với ${trangPhuc.ten} trong Studio`}
          aria-label={`Phối đồ với ${trangPhuc.ten} trong Studio`}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-nen/90 text-son hover:bg-son hover:text-white shadow-md border border-vien flex items-center justify-center transition-all duration-200 opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-nghe outline-none"
        >
          <Shirt className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div
          title={lyDoThieuAnh || 'Chưa có ảnh thực tế trong Studio'}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-nen/80 text-stone-400 border border-vien flex items-center justify-center opacity-60"
        >
          <Lock className="w-3.5 h-3.5" />
        </div>
      )}

      {/* Thông tin thẻ */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {/* Stretched Link Button */}
            <button
              type="button"
              onClick={() => onSelect(trangPhuc)}
              className="font-serif-vi text-lg font-bold text-chu group-hover:text-son transition-colors text-left focus:outline-none after:absolute after:inset-0 after:content-[''] after:cursor-pointer after:z-10"
            >
              {trangPhuc.ten}
            </button>
            <span className="text-[11px] font-medium text-chu-phu flex items-center gap-1 flex-shrink-0">
              <User className="w-3 h-3 text-son" />
              <span>{trangPhuc.gioi_tinh}</span>
            </span>
          </div>

          <p className="text-xs text-chu-phu line-clamp-2 mb-3 leading-relaxed">
            {trangPhuc.mo_ta}
          </p>

          {/* Dấu hiệu nhận biết - Render dạng văn bản phẳng tinh tế (Zero-pill discipline) */}
          {trangPhuc.dac_trung_nhan_dien && trangPhuc.dac_trung_nhan_dien.length > 0 && (
            <div className="flex items-center flex-wrap gap-1 text-[11px] text-chu-phu/80 mb-2">
              <span className="font-medium text-chu">Nhận diện:</span>
              {trangPhuc.dac_trung_nhan_dien.slice(0, 3).map((dt, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span aria-hidden="true" className="text-chu-phu/40">·</span>}
                  <span>{dt.ten}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Thanh chân thẻ */}
        <div className="pt-2.5 mt-2 border-t border-vien flex items-center justify-between text-[11px]">
          <span className="text-chu-phu font-sans">
            Tối đa: <strong className="text-son font-semibold">{mucToiDaTen}</strong>
          </span>

          <span className="font-serif-vi italic text-chu-phu opacity-80 group-hover:opacity-100 flex items-center gap-1">
            <span>Khám phá chi tiết</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
};
