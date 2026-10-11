/**
 * Trang chủ Việt Phục Remix (HomeSection):
 * - Hero tối giản: chữ H1 trượt lên từng từ (word mask stagger),
 * - Lời mời dạng chữ có nam châm (magnetic): "Vào phòng phối đồ →",
 * - Chỉ báo cuộn tinh tế (Scroll indicator: đường kẻ dọc + chữ "Cuộn"),
 * - Parallax trên hình minh họa trang phục,
 * - Họa tiết nét mảnh tự vẽ (LineMotif) và tia sáng quét tiêu đề (title-shimmer).
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  getSelectableTrangPhuc,
  getAllBoiCanh,
  getMucPhongCachList,
  getTrangPhucById,
  getMauSacById
} from '../data/vietPhucData';
import { TrangPhuc, BoiCanh, MauSac } from '../types';
import { VisualCostumePreview } from './VisualCostumePreview';
import { NhanKiemChung } from './NhanKiemChung';
import { Spotlight } from './effects/Spotlight';
import { Reveal } from './effects/Reveal';
import { LineMotif } from './effects/LineMotif';
import { useMagnetic } from '../hooks/useMagnetic';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface Props {
  onSelectTab: (tab: string) => void;
  onSelectTrangPhuc: (tp: TrangPhuc) => void;
  onSelectBoiCanh: (bc: BoiCanh) => void;
  onQuickRemix: (tp: TrangPhuc) => void;
}

interface HeroSlideItem {
  id: string;
  trangPhucId: string;
  gioiTinh: 'nam' | 'nu';
  tieuDe: string;
  phanLoai: string;
  mauChinhId: string;
  mauPhuId: string;
  diemHaiHoa: number;
  xepLoai: string;
  moTaNgan: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'hero-ao-ngu-than-nam',
    trangPhucId: 'ao_ngu_than',
    gioiTinh: 'nam',
    tieuDe: 'Áo ngũ thân nam truyền thống',
    phanLoai: 'Triều Nguyễn · Tay chẽn',
    mauChinhId: 'nau_non',
    mauPhuId: 'be',
    diemHaiHoa: 92,
    xepLoai: 'Rất hài hòa',
    moTaNgan: 'Dáng áo ngũ thân lập lĩnh năm khuy kết hợp quần sáng màu và khăn xếp chỉnh tề.',
  },
  {
    id: 'hero-ao-ngu-than-nu',
    trangPhucId: 'ao_ngu_than',
    gioiTinh: 'nu',
    tieuDe: 'Áo ngũ thân nữ trang nhã',
    phanLoai: 'Triều Nguyễn · Đen tuyền & Lụa sáng',
    mauChinhId: 'den',
    mauPhuId: 'trang_nga',
    diemHaiHoa: 95,
    xepLoai: 'Kinh điển',
    moTaNgan: 'Sắc đen tuyền quý phái viền cổ trắng ngà, nét đẹp mực thước cung đình Việt xưa.',
  },
  {
    id: 'hero-ao-tu-than-nu',
    trangPhucId: 'ao_tu_than',
    gioiTinh: 'nu',
    tieuDe: 'Áo tứ thân ba lớp Bắc Bộ',
    phanLoai: 'Đồng bằng Bắc Bộ · Đa sắc',
    mauChinhId: 'xanh_lam',
    mauPhuId: 'do_son',
    diemHaiHoa: 94,
    xepLoai: 'Hài hòa đặc sắc',
    moTaNgan: 'Bộ 3 lớp chuẩn mực: yếm lụa vàng nghệ, váy lụa đỏ thắm và áo choàng xanh mở tà.',
  },
  {
    id: 'hero-ao-dai-nu',
    trangPhucId: 'ao_dai_hien_dai',
    gioiTinh: 'nu',
    tieuDe: 'Áo dài lụa xanh ngọc',
    phanLoai: 'Đương đại · Lụa tơ tằm',
    mauChinhId: 'xanh_ngoc',
    mauPhuId: 'trang',
    diemHaiHoa: 96,
    xepLoai: 'Tuyệt mỹ',
    moTaNgan: 'Áo lụa mềm mại phối cùng quần lụa trắng ngà, biểu tượng duyên dáng của phụ nữ Việt.',
  },
  {
    id: 'hero-ao-ba-ba-nam',
    trangPhucId: 'ao_ba_ba',
    gioiTinh: 'nam',
    tieuDe: 'Áo bà ba nam mộc mạc',
    phanLoai: 'Nam Bộ · Dân dã',
    mauChinhId: 'xanh_reu',
    mauPhuId: 'den',
    diemHaiHoa: 90,
    xepLoai: 'Thuần khiết',
    moTaNgan: 'Sắc xanh rêu kết hợp quần đen mộc mạc, đậm hồn quê sông nước miền Tây.',
  },
  {
    id: 'hero-ao-ba-ba-nu',
    trangPhucId: 'ao_ba_ba',
    gioiTinh: 'nu',
    tieuDe: 'Áo bà ba nữ chiết eo',
    phanLoai: 'Nam Bộ · Tươi tắn',
    mauChinhId: 'xanh_lam',
    mauPhuId: 'trang',
    diemHaiHoa: 93,
    xepLoai: 'Thanh lịch',
    moTaNgan: 'Đường lượn eo tôn dáng, vạt áo xẻ tà thanh thoát cùng khăn rằn mộc mạc.',
  },
];

export const HomeSection: React.FC<Props> = ({
  onSelectTab,
  onSelectTrangPhuc,
  onSelectBoiCanh,
  onQuickRemix,
}) => {
  const costumes = getSelectableTrangPhuc();
  const occasions = getAllBoiCanh();
  const styleLevels = getMucPhongCachList();

  const prefersReduced = usePrefersReducedMotion();

  // Trạng thái trình chiếu (Slideshow) cổ phục ở Hero
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHoveringSlide, setIsHoveringSlide] = useState<boolean>(false);

  // Auto-play timer (chuyển sau mỗi 6.5 giây nếu không tạm dừng và không rê chuột)
  useEffect(() => {
    if (!isAutoPlay || isHoveringSlide) return;

    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHoveringSlide]);

  const currentSlide = HERO_SLIDES[currentSlideIdx];
  const activeCostume = getTrangPhucById(currentSlide.trangPhucId) || costumes[0];
  const activeColorMain = getMauSacById(currentSlide.mauChinhId) || {
    id: currentSlide.mauChinhId,
    ten: 'Màu chính',
    hex: '#8A5D3B',
    nhom: null,
  };
  const activeColorSub = getMauSacById(currentSlide.mauPhuId) || {
    id: currentSlide.mauPhuId,
    ten: 'Màu phụ',
    hex: '#D8C2A3',
    nhom: null,
  };

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Magnetic button hook
  const magneticInviteRef = useMagnetic<HTMLButtonElement>({ radius: 80, maxDistance: 10 });

  // Hero title split into words for stagger mask entrance
  const heroWords = ['Mặc', 'Cổ', 'Phục', 'Theo', 'Cách', 'Của', 'Thế', 'Hệ', 'Mới'];

  return (
    <div className="space-y-20 sm:space-y-32 pt-8 sm:pt-14 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <Spotlight className="w-full rounded-3xl p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 sm:pt-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Word-masked Stagger Title */}
              <h1 className="font-serif-vi text-4xl sm:text-6xl lg:text-7xl font-bold text-[#262626] dark:text-[#F2E6CF] leading-[1.12] tracking-tight">
                {heroWords.map((word, idx) => (
                  <span key={idx} className="inline-block overflow-hidden mr-2.5 sm:mr-3.5 pb-1">
                    <span
                      className="inline-block animate-slideUp will-change-transform"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="text-base sm:text-lg text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed max-w-xl font-normal opacity-90">
                Khám phá kho tàng áo ngũ thân, áo tấc, áo dài, tứ thân, nhật bình, giao lĩnh và áo bà ba. Không gian phối trang phục truyền thống tinh tế cho thế hệ đương đại.
              </p>

              {/* Thông tin nhanh về bộ cổ phục đang trình chiếu */}
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 max-w-xl transition-all duration-300">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#B8322A]/10 text-[#B8322A] dark:text-[#F2BD42]">
                      Đang trình diễn
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {currentSlide.phanLoai}
                    </span>
                  </div>
                  <span className="text-xs font-serif-vi text-[#262626] dark:text-[#F2E6CF] font-semibold">
                    {currentSlideIdx + 1} / {HERO_SLIDES.length}
                  </span>
                </div>

                <h3 className="font-serif-vi font-bold text-lg text-[#262626] dark:text-[#F2E6CF]">
                  {currentSlide.tieuDe}
                </h3>
                <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] line-clamp-2 mt-1">
                  {currentSlide.moTaNgan}
                </p>

                {/* Các nút bấm tắt tương tác trực tiếp với trang phục đang chiếu */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
                  <button
                    type="button"
                    onClick={() => onSelectTrangPhuc(activeCostume)}
                    data-cursor="link"
                    className="text-xs font-medium text-[#262626] dark:text-[#F2E6CF] hover:text-[#B8322A] dark:hover:text-[#F2BD42] transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Xem tư liệu</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onQuickRemix(activeCostume)}
                    data-cursor="link"
                    className="text-xs font-semibold text-[#B8322A] dark:text-[#F2BD42] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Phối đồ với bộ này</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Single Minimalist Magnetic Text Invitation */}
              <div className="pt-2">
                <button
                  ref={magneticInviteRef}
                  type="button"
                  onClick={() => onSelectTab('studio')}
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 text-base sm:text-lg font-serif-vi font-bold text-[#B8322A] dark:text-[#F2BD42] py-2 px-1 nav-link-underline cursor-pointer transition-transform duration-200"
                >
                  <span className="tracking-wide">Vào phòng phối đồ</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Hero Visual with Slideshow Controls */}
            <div
              className="lg:col-span-5 flex flex-col items-center"
              onMouseEnter={() => setIsHoveringSlide(true)}
              onMouseLeave={() => setIsHoveringSlide(false)}
            >
              <div
                className="w-full max-w-md relative will-change-transform transition-transform duration-100 ease-out"
                style={{
                  transform: prefersReduced
                    ? undefined
                    : 'translate3d(0, calc(var(--scroll-y, 0px) * 0.12), 0)',
                }}
              >
                {/* Trình diễn sân khấu trang phục */}
                <div key={currentSlide.id} className="animate-fadeIn">
                  <VisualCostumePreview
                    trangPhuc={activeCostume}
                    gioiTinh={currentSlide.gioiTinh}
                    mauChinh={activeColorMain}
                    mauPhu={activeColorSub}
                    phuKienList={[]}
                    mucPhongCachId="remix_gen_z"
                    diemHaiHoa={currentSlide.diemHaiHoa}
                    xepLoai={currentSlide.xepLoai}
                    idSuffix={`hero-slide-${currentSlide.id}`}
                  />
                </div>

                {/* Thanh điều khiển trình chiếu trực quan (Next, Prev, Play/Pause, Pagination dots) */}
                <div className="mt-4 flex items-center justify-between px-2 gap-2">
                  {/* Nút lùi */}
                  <button
                    type="button"
                    onClick={goToPrevSlide}
                    data-cursor="link"
                    aria-label="Xem trang phục trước"
                    className="p-2 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#B8322A] hover:border-[#B8322A] dark:hover:text-[#F2BD42] dark:hover:border-[#F2BD42] transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#B8322A]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Thanh chỉ báo các trang phục (Dots) */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-center px-1">
                    {HERO_SLIDES.map((slide, sIdx) => {
                      const isActive = sIdx === currentSlideIdx;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setCurrentSlideIdx(sIdx)}
                          data-cursor="link"
                          aria-label={`Chuyển đến ${slide.tieuDe}`}
                          title={slide.tieuDe}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'w-6 bg-[#B8322A] dark:bg-[#F2BD42]'
                              : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Cụm điều khiển Tạm dừng / Tiếp tục & Nút tiến */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsAutoPlay((prev) => !prev)}
                      data-cursor="link"
                      aria-label={isAutoPlay ? 'Tạm dừng tự động trình chiếu' : 'Tiếp tục tự động trình chiếu'}
                      title={isAutoPlay ? 'Tạm dừng tự động' : 'Bật tự động chiếu'}
                      className="p-2 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#B8322A] hover:border-[#B8322A] dark:hover:text-[#F2BD42] dark:hover:border-[#F2BD42] transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#B8322A]"
                    >
                      {isAutoPlay ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={goToNextSlide}
                      data-cursor="link"
                      aria-label="Xem trang phục kế tiếp"
                      className="p-2 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#B8322A] hover:border-[#B8322A] dark:hover:text-[#F2BD42] dark:hover:border-[#F2BD42] transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#B8322A]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spotlight>
      </section>

      {/* Decorative Wave Motif */}
      <div className="w-full relative overflow-hidden py-4 my-2 opacity-90 dark:opacity-95">
        <LineMotif type="wave" className="w-full" />
      </div>

      {/* 2. BỘ SƯU TẬP TIÊU BIỂU */}
      <section id="home-collection-preview" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-son block mb-1">
              Di Sản Cổ Truyền
            </span>
            <h2 className="font-serif-vi text-2xl sm:text-4xl font-bold text-chu">
              Các Dáng Áo Tiêu Biểu
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('collection')}
            data-cursor="link"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-son nav-link-underline cursor-pointer"
          >
            <span>Xem bộ sưu tập đầy đủ</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grid of Costumes with Stretched Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {costumes.slice(0, 4).map((tp, idx) => (
            <Reveal key={tp.id} delayMs={idx * 80}>
              <div
                data-cursor="view"
                className="group relative p-5 rounded-2xl bg-nen-phu/70 dark:bg-nen-phu/40 border border-vien hover:border-nghe hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full select-none focus-within:ring-2 focus-within:ring-nghe focus-within:ring-offset-2 focus-within:ring-offset-nen"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] text-chu-phu font-medium">{tp.gioi_tinh}</span>
                    <NhanKiemChung trangThai={tp.trang_thai_kiem_chung} />
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectTrangPhuc(tp)}
                    className="font-serif-vi font-bold text-lg text-chu group-hover:text-son transition-colors mb-2 text-left focus:outline-none after:absolute after:inset-0 after:content-[''] after:cursor-pointer after:z-10"
                  >
                    {tp.ten}
                  </button>
                  <p className="text-xs text-chu-phu line-clamp-3 leading-relaxed">
                    {tp.mo_ta}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-vien flex items-center justify-between">
                  <span className="text-[11px] text-chu-phu font-serif-vi italic">
                    Chạm để xem chi tiết
                  </span>

                  {/* Subtle Quick Remix circular button on hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickRemix(tp);
                    }}
                    data-cursor="link"
                    title={`Phối nhanh ${tp.ten}`}
                    className="relative z-20 w-7 h-7 rounded-full bg-son/10 hover:bg-son text-son hover:text-white flex items-center justify-center transition-all duration-200 opacity-60 sm:opacity-0 group-hover:opacity-100 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-nghe outline-none"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. BA MỨC PHONG CÁCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-son block mb-1">
            Định Hướng Sáng Tạo
          </span>
          <h2 className="font-serif-vi text-2xl sm:text-4xl font-bold text-chu">
            Ba Mức Phong Cách
          </h2>
          <p className="text-xs sm:text-sm text-chu-phu mt-1.5">
            Từ phục dựng trang nghiêm đến cách tân tinh giản và kết hợp phóng khoáng cùng đồ hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styleLevels.map((lvl, idx) => {
            const icons = {
              truyen_thong: <ShieldCheck className="w-5 h-5 text-[#B8322A]" />,
              cach_tan_nhe: <Sparkles className="w-5 h-5 text-[#E0A526]" />,
              remix_gen_z: <Zap className="w-5 h-5 text-[#5E3F73]" />,
            };

            return (
              <Reveal key={lvl.id} delayMs={idx * 100}>
                <div className="p-6 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 hover:border-[#E0A526] transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
                      {icons[lvl.id as keyof typeof icons]}
                    </div>
                    <h3 className="font-serif-vi text-lg font-bold text-[#262626] dark:text-[#F2E6CF] mb-2">
                      {lvl.ten}
                    </h3>
                    <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed">
                      {lvl.mo_ta}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 font-sans">
                    {lvl.id === 'truyen_thong' && 'Lễ hội quan họ, đình chùa, giỗ tổ Hùng Vương'}
                    {lvl.id === 'cach_tan_nhe' && 'Tết Nguyên Đán, Festival Huế, kỷ yếu trang trọng'}
                    {lvl.id === 'remix_gen_z' && 'Dạo phố Hội An/Hà Nội, kỷ yếu sáng tạo, sự kiện trẻ'}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Cloud Motif */}
      <div className="w-full relative overflow-hidden py-4 my-2 opacity-90 dark:opacity-95">
        <LineMotif type="cloud" className="w-full" />
      </div>

      {/* 4. HÔM NAY BẠN MẶC ĐI ĐÂU? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-son block mb-1">
              Bối Cảnh Đời Thực
            </span>
            <h2 className="font-serif-vi text-2xl sm:text-4xl font-bold text-chu">
              Hôm Nay Mặc Đi Đâu?
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('occasions')}
            data-cursor="link"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8322A] dark:text-[#E0483E] nav-link-underline cursor-pointer"
          >
            <span>Xem 10 bối cảnh</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {occasions.map((bc, idx) => (
            <Reveal key={bc.id} delayMs={idx * 50}>
              <button
                type="button"
                onClick={() => onSelectBoiCanh(bc)}
                data-cursor="view"
                className="w-full p-4 rounded-2xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 hover:border-[#E0A526] transition-all duration-300 text-left flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <Calendar className="w-4 h-4 text-[#B8322A] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif-vi font-bold text-xs sm:text-sm text-[#262626] dark:text-[#F2E6CF] line-clamp-1 group-hover:text-[#B8322A] dark:group-hover:text-[#F2BD42] transition-colors">
                    {bc.ten}
                  </h4>
                  <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                    {bc.thoi_diem}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-3">
                  {bc.bang_mau_goi_y.mau.slice(0, 3).map((mId) => {
                    const m = getMauSacById(mId);
                    return m ? (
                      <span
                        key={m.id}
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: m.hex }}
                      />
                    ) : null;
                  })}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. CÂU CHUYỆN NĂM THÂN ÁO (Khối trích dẫn triển lãm) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="p-8 sm:p-14 rounded-3xl bg-[#F2E6CF]/60 dark:bg-[#282420]/80 border border-[#E0A526]/30 shadow-xs text-center relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8322A] dark:text-[#E0483E] block mb-3">
              Triết Lý Y Phục Người Việt
            </span>

            <blockquote className="font-serif-vi text-xl sm:text-2xl font-bold text-[#262626] dark:text-[#F2E6CF] leading-relaxed max-w-2xl mx-auto">
              “Bốn thân tượng trưng cho tứ thân phụ mẫu — cha mẹ mình và cha mẹ người. Thân con nhỏ nằm trong tượng trưng cho chính người mặc, luôn được ôm ấp và chở che trong tình gia đình.”
            </blockquote>

            <div className="flex items-center justify-center gap-3 pt-6 flex-wrap">
              <NhanKiemChung trangThai="Giải thích phổ biến" />
              <button
                type="button"
                onClick={() => onSelectTab('sources')}
                data-cursor="link"
                className="text-xs text-[#5E3F73] dark:text-[#F2BD42] hover:underline font-medium cursor-pointer"
              >
                Tra cứu tài liệu học thuật (S22)
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
