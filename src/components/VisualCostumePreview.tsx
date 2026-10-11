/**
 * Không gian trình diễn cổ phục đương đại (VisualCostumePreview)
 * - Sử dụng 100% hình ảnh thực tế chất lượng cao đã kiểm chứng
 * - Ánh sáng sân khấu: đèn rọi mềm từ trên, bục elip sàn diễn, bóng đổ tự nhiên
 * - Trình diễn chính xác trang phục nhiều lớp (Áo tứ thân 3 lớp, Áo dài 2 lớp)
 * - Tôn trọng tỷ lệ gốc (object-fit: contain), không crop tà hay vạt áo
 * - Trạng thái tải lỗi thân thiện và chức năng xuất ảnh chất lượng cao
 */
import React, { useState, useEffect, useRef } from 'react';
import { TrangPhuc, MauSac, PhuKien } from '../types';
import {
  layToHopTrinhDien,
  layLyDoChuaCoAnh,
  ToHopTrinhDien,
} from '../config/anhTrangPhuc';
import {
  AlertCircle,
  Sparkles,
  Info,
} from 'lucide-react';

interface Props {
  trangPhuc: TrangPhuc;
  mauChinh: MauSac;
  mauPhu: MauSac;
  phuKienList?: PhuKien[];
  mucPhongCachId?: string;
  gioiTinh?: 'nam' | 'nu';
  diemHaiHoa?: number;
  xepLoai?: string;
  idSuffix?: string;
  cheDoXem?: 'san_khau' | 'the';
  className?: string;
}

export const VisualCostumePreview: React.FC<Props> = ({
  trangPhuc,
  mauChinh,
  mauPhu,
  gioiTinh,
  diemHaiHoa,
  xepLoai,
  idSuffix = 'stage',
  cheDoXem = 'san_khau',
  className = '',
}) => {
  const [dangTai, setDangTai] = useState(true);
  const [coLoi, setCoLoi] = useState(false);
  const [thongBaoLoi, setThongBaoLoi] = useState<string>('');

  // Trạng thái phóng to / thu nhỏ ảnh sân khấu (nhấp đúp và kéo di chuyển)
  const [tyLePhongTo, setTyLePhongTo] = useState<number>(1);
  const [viTriKeo, setViTriKeo] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dangKeo, setDangKeo] = useState<boolean>(false);
  const diemBatDauKeo = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Tìm tổ hợp trình diễn thực tế từ manifest
  const toHop: ToHopTrinhDien | null = layToHopTrinhDien(trangPhuc.id, gioiTinh);
  const lyDoThieuAnh = layLyDoChuaCoAnh(trangPhuc.id);

  // Giới hạn giá trị trong khoảng an toàn
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  // Reset loading state và thu phóng khi đổi trang phục hoặc giới tính
  useEffect(() => {
    setDangTai(true);
    setCoLoi(false);
    setThongBaoLoi('');
    setTyLePhongTo(1);
    setViTriKeo({ x: 0, y: 0 });
  }, [trangPhuc.id, gioiTinh, toHop?.id]);

  const handleResetZoom = () => {
    setTyLePhongTo(1);
    setViTriKeo({ x: 0, y: 0 });
  };

  // Kéo di chuyển ảnh khi phóng to > 1
  const handleMouseDown = (e: React.MouseEvent) => {
    if (tyLePhongTo > 1) {
      setDangKeo(true);
      diemBatDauKeo.current = { x: e.clientX - viTriKeo.x, y: e.clientY - viTriKeo.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dangKeo && tyLePhongTo > 1) {
      const maxOffset = (tyLePhongTo - 1) * 220;
      setViTriKeo({
        x: clamp(e.clientX - diemBatDauKeo.current.x, -maxOffset, maxOffset),
        y: clamp(e.clientY - diemBatDauKeo.current.y, -maxOffset, maxOffset),
      });
    }
  };

  const handleMouseUp = () => setDangKeo(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (tyLePhongTo > 1 && e.touches.length === 1) {
      setDangKeo(true);
      diemBatDauKeo.current = {
        x: e.touches[0].clientX - viTriKeo.x,
        y: e.touches[0].clientY - viTriKeo.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dangKeo && tyLePhongTo > 1 && e.touches.length === 1) {
      const maxOffset = (tyLePhongTo - 1) * 220;
      setViTriKeo({
        x: clamp(e.touches[0].clientX - diemBatDauKeo.current.x, -maxOffset, maxOffset),
        y: clamp(e.touches[0].clientY - diemBatDauKeo.current.y, -maxOffset, maxOffset),
      });
    }
  };

  const handleTouchEnd = () => setDangKeo(false);

  const handleDoubleClick = () => {
    if (tyLePhongTo === 1) {
      setTyLePhongTo(1.5);
    } else {
      handleResetZoom();
    }
  };

  // Handler khi tải ảnh thành công
  const handleImageLoaded = () => {
    setDangTai(false);
    setCoLoi(false);
  };

  // Handler khi ảnh bị lỗi
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Không thể tải ảnh cổ phục:', e.currentTarget.src);
    setDangTai(false);
    setCoLoi(true);
    setThongBaoLoi('Không thể tải ảnh tư liệu. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại.');
  };

  // Trường hợp 1: Trang phục chưa có ảnh thực tế trong kho dữ liệu
  if (!toHop || lyDoThieuAnh) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-nen-phu/60 dark:bg-black/40 border border-vien/80 ${
          cheDoXem === 'the' ? 'min-h-[280px]' : 'min-h-[460px] lg:min-h-[560px]'
        } ${className}`}
      >
        {/* Nền bục tối giản */}
        <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-md p-6 rounded-xl bg-nen/80 dark:bg-nen-phu/80 backdrop-blur-sm border border-vien shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-500/10 text-nghe flex items-center justify-center">
            <Info className="w-6 h-6" />
          </div>
          <h4 className="font-serif-vi text-lg font-bold text-chu mb-2">
            Tư liệu hiện vật đang cập nhật
          </h4>
          <p className="text-xs sm:text-sm text-chu-phu leading-relaxed mb-4">
            {lyDoThieuAnh ||
              `Hiện vật "${trangPhuc.ten}" đang trong quá trình số hóa từ các tư liệu lịch sử và bảo tàng.`}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-chu-phu/80 border border-vien rounded-full bg-nen/50">
            <Sparkles className="w-3 h-3 text-nghe" />
            <span>Thông tin văn hóa vẫn được bảo lưu đầy đủ</span>
          </div>
        </div>
      </div>
    );
  }

  // Trường hợp 2: Có ảnh thật và hiển thị theo phong cách sân khấu bảo tàng
  return (
    <div
      id={`costume-stage-container-${idSuffix}`}
      className={`relative group/stage overflow-hidden rounded-2xl select-none ${
        cheDoXem === 'the'
          ? 'bg-nen-phu/40 dark:bg-black/20 p-2 min-h-[260px]'
          : 'bg-gradient-to-b from-nen/90 via-nen-phu/50 to-nen-phu/90 dark:from-black/40 dark:via-black/30 dark:to-black/50 p-4 sm:p-6 min-h-[480px] lg:min-h-[600px] border border-vien/70 shadow-sm'
      } ${className}`}
    >
      {/* 1. Hiệu ứng ánh sáng sân khấu bảo tàng (Spotlight & Podium Ellipse) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Đèn rọi mềm từ trên xuống (Soft Top Spotlight) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%] h-[65%] bg-radial from-amber-100/35 via-amber-200/10 to-transparent dark:from-amber-200/10 dark:via-transparent dark:to-transparent blur-2xl" />

        {/* Vệt quét sáng chậm mượt mà (Slow sweep) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/10 dark:via-amber-400/5 to-transparent -translate-x-full group-hover/stage:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        {/* Vùng sáng elip trên bục sàn diễn (Stage Ellipse Podium) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[420px] h-[70px] rounded-[50%] bg-radial from-nghe/25 via-son/10 to-transparent dark:from-nghe/20 dark:via-son/5 dark:to-transparent blur-md" />

        {/* Bóng đổ nền dưới chân trang phục */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[70%] max-w-[320px] h-[24px] rounded-[50%] bg-black/15 dark:bg-black/40 blur-sm" />
      </div>

      {/* 2. Trạng thái tải ảnh mượt mà */}
      {dangTai && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-nen/60 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        >
          <div className="w-8 h-8 border-2 border-nghe/30 border-t-son rounded-full animate-spin mb-2" />
          <span className="text-xs text-chu-phu tracking-wider uppercase">Đang mở rèm sân khấu...</span>
        </div>
      )}

      {/* 3. Trạng thái lỗi tải ảnh */}
      {coLoi && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center bg-nen/90 dark:bg-black/80">
          <AlertCircle className="w-8 h-8 text-son mb-2" />
          <p className="text-sm font-medium text-chu mb-1">Không tải được hình ảnh cổ phục</p>
          <p className="text-xs text-chu-phu mb-3">{thongBaoLoi}</p>
          <button
            type="button"
            onClick={() => {
              setDangTai(true);
              setCoLoi(false);
            }}
            className="px-3 py-1.5 text-xs rounded-md bg-son text-white hover:bg-son/90 transition-colors cursor-pointer"
          >
            Thử tải lại
          </button>
        </div>
      )}

      {/* 4. Khung trưng bày ảnh thật (hỗ trợ thu phóng, xoay kéo chi tiết) */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center min-h-[420px] lg:min-h-[520px] overflow-hidden select-none ${
          tyLePhongTo > 1 ? (dangKeo ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            transform: `translate3d(${viTriKeo.x}px, ${viTriKeo.y}px, 0) scale(${tyLePhongTo})`,
            transformOrigin: 'center center',
            transition: dangKeo ? 'none' : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {trangPhuc.id === 'ao_dai_hien_dai' ? (
            /* Áo dài hiện đại: Áo dài và Quần lụa được đặt nằm riêng cạnh nhau với chiều dài hợp lý */
            <div className="relative w-full max-w-[500px] flex items-end justify-center gap-3 sm:gap-6 py-2">
              {/* Áo dài lụa */}
              <div className="relative flex-1 flex flex-col items-center justify-end max-w-[240px] aspect-[555/832]">
                <img
                  src="/trang-phuc/ao-dai/ao-nu.png"
                  alt="Áo dài lụa nữ"
                  loading="eager"
                  onLoad={handleImageLoaded}
                  onError={handleImageError}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out group-hover/stage:scale-[1.02]"
                  style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.08))' }}
                />
              </div>

              {/* Quần lụa đặt riêng bên cạnh, chiều dài hợp lý từ eo xuống gấu */}
              <div className="relative flex-1 flex flex-col items-center justify-end max-w-[190px] h-[78%] sm:h-[80%] aspect-[575/862]">
                <img
                  src="/trang-phuc/ao-dai/quan-nu.png"
                  alt="Quần lụa ống suông"
                  loading="eager"
                  onLoad={handleImageLoaded}
                  onError={handleImageError}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out group-hover/stage:scale-[1.02]"
                  style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.06))' }}
                />
              </div>
            </div>
          ) : trangPhuc.id === 'ao_tu_than' ? (
            /* Áo tứ thân: Trưng bày Bộ Yếm & Váy trong bên cạnh Áo choàng xanh ngoài */
            <div className="relative w-full max-w-[520px] flex items-end justify-center gap-3 sm:gap-6 py-2">
              {/* Bộ Yếm lụa vàng & Váy lụa đỏ: Yếm lụa nằm kề bên trên Váy */}
              <div className="relative flex-1 flex flex-col items-center justify-end max-w-[210px] aspect-[557/836]">
                <div className="relative w-full h-full flex items-end justify-center">
                  {/* Váy đỏ: nhỏ đi và dịch xuống dưới một chút */}
                  <img
                    src="/trang-phuc/ao-tu-than/vay-do.png"
                    alt="Váy lụa đỏ"
                    loading="eager"
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[84%] h-[68%] object-contain pointer-events-none"
                    style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.06))' }}
                  />
                  {/* Yếm vàng: dịch lên trên một chút sao cho vừa đủ để nằm kề ngay trên váy */}
                  <img
                    src="/trang-phuc/ao-tu-than/yem-vang.png"
                    alt="Yếm lụa vàng"
                    loading="eager"
                    className="absolute top-1 left-1/2 -translate-x-1/2 w-[66%] h-[42%] object-contain pointer-events-none z-10"
                    style={{ filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.08))' }}
                  />
                </div>
              </div>

              {/* Áo choàng ngoài bốn thân */}
              <div className="relative flex-1 flex flex-col items-center justify-end max-w-[250px] aspect-[557/836]">
                <img
                  src="/trang-phuc/ao-tu-than/ao-choang-xanh.png"
                  alt="Áo choàng ngoài tứ thân"
                  loading="eager"
                  onLoad={handleImageLoaded}
                  onError={handleImageError}
                  className="w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out group-hover/stage:scale-[1.02]"
                  style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.08))' }}
                />
              </div>
            </div>
          ) : (
            /* Trường hợp một ảnh duy nhất (Áo ngũ thân, Áo bà ba) */
            <div
              className={`relative w-full max-w-[420px] aspect-[2/3] flex items-center justify-center ${
                toHop.dinhDang === 'jpeg'
                  ? 'bg-nen dark:bg-black/20 p-2 sm:p-3 rounded-2xl border border-vien/80 shadow-xs'
                  : ''
              }`}
            >
              <img
                src={toHop.anhChinh}
                alt={`${trangPhuc.ten} - ${toHop.tieuDeBienThe}`}
                loading="eager"
                onLoad={handleImageLoaded}
                onError={handleImageError}
                className={`w-full h-full object-contain pointer-events-none transition-transform duration-500 ease-out group-hover/stage:scale-[1.015] ${
                  toHop.dinhDang === 'jpeg' ? 'rounded-xl' : ''
                }`}
                style={{
                  filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.08))',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
