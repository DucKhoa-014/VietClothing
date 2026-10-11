/**
 * Studio Phối Đồ - Không gian trình diễn và sáng tạo cổ phục (PhoiDoStudio)
 * - Bố cục 3 vùng rõ ràng: Cấu hình (trái) - Sân khấu ảnh lớn (giữa) - Đánh giá văn hóa (phải)
 * - 100% hình ảnh thực tế được kiểm chứng, khóa mọi lựa chọn thiếu ảnh
 * - Tự động hiệu chỉnh về tổ hợp hợp lệ đầu tiên khi đổi trang phục/dịp
 * - Phụ kiện được bảo lưu dưới dạng tư liệu tham khảo, tạm khóa lựa chọn do chưa có ảnh
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  TrangPhuc,
  BoiCanh,
  MauSac,
  PhuKien,
  KetQuaHaiHoa,
  CanhBaoKichHoat
} from '../types';
import {
  getAllBoiCanh,
  getSelectableTrangPhuc,
  getAllMauSac,
  getAllPhuKien,
  getMucPhongCachOrder,
  getChildrenOfTrangPhuc,
  getTrangPhucById,
  getBoiCanhById,
  getMauSacById,
  getPhuKienById
} from '../data/vietPhucData';
import {
  MANIFEST_ANH_TRANG_PHUC,
  kiemTraTrangPhucCoAnh,
  layLyDoChuaCoAnh,
  layDanhSachGioiTinhKhaDung,
  layToHopTrinhDien,
  layMauMacDinhTheoAnh,
  kiemTraMauChinhKhaDung,
  kiemTraMauPhuKhaDung,
} from '../config/anhTrangPhuc';
import { tinhDiemHaiHoa } from '../logic/haiHoa';
import { kiemTraCanhBao } from '../logic/canhBao';
import { VisualCostumePreview } from './VisualCostumePreview';
import { ODiemHaiHoa } from './ODiemHaiHoa';
import { CanhBaoItem } from './CanhBaoItem';
import { TheVanHoa } from './TheVanHoa';
import { ThanhMucPhongCach } from './ThanhMucPhongCach';
import { ChipPhuKien } from './ChipPhuKien';
import { PageHeader } from './ui/PageHeader';
import {
  Sparkles,
  Share2,
  RotateCcw,
  Bot,
  Check,
  Filter,
  Palette,
  Lock,
  User,
  Info,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface Props {
  initialBoiCanhId?: string;
  initialTrangPhucId?: string;
  onSelectSource?: (ma: string) => void;
}

export const PhoiDoStudio: React.FC<Props> = ({
  initialBoiCanhId,
  initialTrangPhucId,
  onSelectSource,
}) => {
  const allBoiCanh = useMemo(() => getAllBoiCanh(), []);
  const allTrangPhuc = useMemo(() => getSelectableTrangPhuc(), []);
  const allMauSac = useMemo(() => getAllMauSac(), []);
  const allPhuKien = useMemo(() => getAllPhuKien(), []);

  // Danh sách các trang phục CÓ ảnh thực tế
  const costumesWithPhotos = useMemo(() => {
    return allTrangPhuc.filter((tp) => kiemTraTrangPhucCoAnh(tp.id));
  }, [allTrangPhuc]);

  // 1. STATE BỐI CẢNH (Dịp mặc)
  const [selectedBoiCanh, setSelectedBoiCanh] = useState<BoiCanh>(() => {
    if (initialBoiCanhId) {
      const match = getBoiCanhById(initialBoiCanhId);
      if (match) return match;
    }
    return allBoiCanh[0]; // Mặc định: Tết Nguyên Đán
  });

  const [showAllCostumes, setShowAllCostumes] = useState(false);

  // Lọc trang phục theo bối cảnh
  const contextCostumes = useMemo(() => {
    if (showAllCostumes) return allTrangPhuc;
    const allowedIds = new Set([
      ...selectedBoiCanh.trang_phuc_nu,
      ...selectedBoiCanh.trang_phuc_nam,
    ]);
    return allTrangPhuc.filter((tp) => allowedIds.has(tp.id));
  }, [allTrangPhuc, selectedBoiCanh, showAllCostumes]);

  // 2. STATE TRANG PHỤC CHÍNH (Đảm bảo luôn trỏ vào trang phục CÓ ẢNH THẬT)
  const [selectedTrangPhuc, setSelectedTrangPhuc] = useState<TrangPhuc>(() => {
    if (initialTrangPhucId && kiemTraTrangPhucCoAnh(initialTrangPhucId)) {
      const match = getTrangPhucById(initialTrangPhucId);
      if (match) return match;
    }
    // Mặc định: Áo ngũ thân (có ảnh thật)
    return costumesWithPhotos[0] || allTrangPhuc[0];
  });

  // 3. STATE GIỚI TÍNH / BIẾN THỂ TRÌNH DIỄN
  const danhSachGioiTinh = useMemo(() => {
    return layDanhSachGioiTinhKhaDung(selectedTrangPhuc.id);
  }, [selectedTrangPhuc.id]);

  const [gioiTinh, setGioiTinh] = useState<'nam' | 'nu'>(() => {
    const khaDung = layDanhSachGioiTinhKhaDung(selectedTrangPhuc.id).find((g) => g.khaDung);
    return khaDung ? khaDung.id : 'nam';
  });

  // Tự động điều chỉnh giới tính nếu lựa chọn hiện tại không có ảnh
  useEffect(() => {
    const list = layDanhSachGioiTinhKhaDung(selectedTrangPhuc.id);
    const currentValid = list.find((g) => g.id === gioiTinh && g.khaDung);
    if (!currentValid) {
      const firstValid = list.find((g) => g.khaDung);
      if (firstValid) {
        setGioiTinh(firstValid.id);
      }
    }
  }, [selectedTrangPhuc.id, gioiTinh]);

  // 4. MỨC PHONG CÁCH
  const mucToiDaGoiY = useMemo(() => {
    const orderContext = getMucPhongCachOrder(selectedBoiCanh.muc_phong_cach_toi_da);
    const orderCostume = getMucPhongCachOrder(selectedTrangPhuc.muc_phong_cach_toi_da || 'remix_gen_z');
    const minOrder = Math.min(orderContext, orderCostume);
    if (minOrder === 0) return 'truyen_thong';
    if (minOrder === 1) return 'cach_tan_nhe';
    return 'remix_gen_z';
  }, [selectedBoiCanh, selectedTrangPhuc]);

  const [mucPhongCach, setMucPhongCach] = useState<'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z'>(
    mucToiDaGoiY
  );

  useEffect(() => {
    const curOrder = getMucPhongCachOrder(mucPhongCach);
    const maxOrder = getMucPhongCachOrder(mucToiDaGoiY);
    if (curOrder > maxOrder) {
      setMucPhongCach(mucToiDaGoiY);
    }
  }, [mucToiDaGoiY]);

  // 5. STATE MÀU SẮC (Ánh xạ chuẩn 100% từ ảnh thật)
  const defaultColors = useMemo(() => {
    return layMauMacDinhTheoAnh(selectedTrangPhuc.id, gioiTinh);
  }, [selectedTrangPhuc.id, gioiTinh]);

  const [mauChinh, setMauChinh] = useState<MauSac>(() => {
    if (defaultColors) {
      const m = getMauSacById(defaultColors.mauChinhId);
      if (m) return m;
    }
    return allMauSac[0];
  });

  const [mauPhu, setMauPhu] = useState<MauSac>(() => {
    if (defaultColors) {
      const m = getMauSacById(defaultColors.mauPhuId);
      if (m) return m;
    }
    return allMauSac[1];
  });

  // Khi đổi trang phục hoặc giới tính, tự động cập nhật màu theo ảnh thật
  useEffect(() => {
    if (defaultColors) {
      const mChinh = getMauSacById(defaultColors.mauChinhId);
      const mPhu = getMauSacById(defaultColors.mauPhuId);
      if (mChinh) setMauChinh(mChinh);
      if (mPhu) setMauPhu(mPhu);
    }
  }, [defaultColors]);

  // 6. PHỤ KIỆN: KHÓA TOÀN BỘ DO CHƯA CÓ ẢNH MINH HỌA
  // Giữ selectedPhuKienIds = [] để không báo đang mặc phụ kiện vô hình
  const [selectedPhuKienIds, setSelectedPhuKienIds] = useState<string[]>([]);

  // Đánh giá danh sách phụ kiện (toàn bộ bị khóa với lý do "Chưa có ảnh minh họa phụ kiện")
  const evaluatedAccessories = useMemo(() => {
    return allPhuKien.map((pk) => ({
      phuKien: pk,
      isDisabled: true,
      lockReason: 'Chưa có ảnh minh họa phụ kiện (tư liệu tham khảo)',
    }));
  }, [allPhuKien]);

  // 7. TÍNH ĐIỂM HÀI HÒA & CẢNH BÁO VĂN HÓA W1–W7
  const ketQuaHaiHoa: KetQuaHaiHoa = useMemo(() => {
    return tinhDiemHaiHoa(mauChinh, mauPhu, selectedBoiCanh);
  }, [mauChinh, mauPhu, selectedBoiCanh]);

  const warnings: CanhBaoKichHoat[] = useMemo(() => {
    return kiemTraCanhBao({
      trangPhuc: selectedTrangPhuc,
      boiCanh: selectedBoiCanh,
      mucPhongCach,
      mauChinh,
      mauPhu,
      phuKienIds: selectedPhuKienIds,
    });
  }, [selectedTrangPhuc, selectedBoiCanh, mucPhongCach, mauChinh, mauPhu, selectedPhuKienIds]);

  const culturalChildren = useMemo(() => {
    return getChildrenOfTrangPhuc(selectedTrangPhuc.id);
  }, [selectedTrangPhuc]);

  // 8. TƯ VẤN AI & CHIA SẺ
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleConsultAI = async () => {
    setAiLoading(true);
    setAiError(null);
    setShowAiModal(true);

    try {
      const response = await fetch('/api/tu-van', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boi_canh: {
            id: selectedBoiCanh.id,
            ten: selectedBoiCanh.ten,
            luu_y_van_hoa: selectedBoiCanh.luu_y_van_hoa,
          },
          trang_phuc: selectedTrangPhuc,
          phu_kien: [],
          mau: {
            mau_chinh: mauChinh,
            mau_phu: mauPhu,
          },
          ket_qua_hai_hoa: {
            diem: ketQuaHaiHoa.diem,
            xep_loai: ketQuaHaiHoa.xep_loai,
            ly_do: ketQuaHaiHoa.ly_do,
          },
          canh_bao: warnings,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setAiResult(resData.data);
      } else {
        throw new Error(resData.note || 'Không nhận được dữ liệu hợp lệ');
      }
    } catch (err: any) {
      console.warn('Sử dụng kết quả tư vấn dự phòng:', err);
      setAiResult({
        nhan_xet: `Bộ ${selectedTrangPhuc.ten} cho dịp ${selectedBoiCanh.ten} phối màu ${mauChinh.ten} và ${mauPhu.ten} mang nét đẹp cổ kính, trang nhã và giữ gìn trọn vẹn đặc trưng nhận diện văn hóa Việt.`,
        giai_thich_hai_hoa: ketQuaHaiHoa.ly_do,
        goi_y_dieu_chinh: [
          'Trang phục thật thể hiện chất liệu lụa mộc và gấm truyền thống, giữ phom dáng uyển chuyển khi di chuyển.',
          'Khi tham gia lễ hội hoặc chụp ảnh ngoại cảnh, ánh sáng tự nhiên buổi sớm sẽ làm nổi bật chiều sâu sắc vải.',
        ],
        meo_tao_dang: [
          'Giữ lưng thẳng, hai tay khép nhẹ ngang eo hoặc giữ nếp tà trước để tôn vinh đường cắt cổ áo ngũ thân.',
          'Bước đi thong thả, tự nhiên để tà áo buông rủ thanh thoát theo nhịp chân.',
        ],
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyShareLink = () => {
    const url = new URL(window.location.href);
    url.hash = `phoi-do`;
    url.searchParams.set('dip', selectedBoiCanh.id);
    url.searchParams.set('ao', selectedTrangPhuc.id);
    url.searchParams.set('gioitinh', gioiTinh);
    url.searchParams.set('mauchinh', mauChinh.id);
    url.searchParams.set('mauphu', mauPhu.id);

    navigator.clipboard.writeText(url.toString());
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleReset = () => {
    const defaultCostume = costumesWithPhotos[0] || allTrangPhuc[0];
    setSelectedTrangPhuc(defaultCostume);
    const validGender = layDanhSachGioiTinhKhaDung(defaultCostume.id).find((g) => g.khaDung);
    const targetGender = validGender ? validGender.id : 'nam';
    setGioiTinh(targetGender);

    const colors = layMauMacDinhTheoAnh(defaultCostume.id, targetGender);
    if (colors) {
      const c1 = getMauSacById(colors.mauChinhId);
      const c2 = getMauSacById(colors.mauPhuId);
      if (c1) setMauChinh(c1);
      if (c2) setMauPhu(c2);
    }
    setSelectedPhuKienIds([]);
    setMucPhongCach(mucToiDaGoiY);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Studio Header */}
      <PageHeader
        soThuTu="Studio Phối Đồ"
        soThuTuClassName="text-xl sm:text-2xl"
        tieuDe="Sân Khấu Trình Diễn Cổ Phục"
        hanhDong={
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-chu-phu hover:text-son transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-nghe outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>

            <button
              type="button"
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg border border-vien hover:border-nghe text-son transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-nghe outline-none"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Đã chép link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleConsultAI}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg border border-tim-hue/40 text-tim-hue hover:bg-tim-hue hover:text-white dark:text-nghe dark:hover:bg-tim-hue/40 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-nghe outline-none"
            >
              <Bot className="w-3.5 h-3.5 text-nghe" />
              <span>Tư vấn AI</span>
            </button>
          </div>
        }
      />

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
        {/* === VÙNG 1: CẤU HÌNH (Trái: 4 cột trên desktop) === */}
        <div className="lg:col-span-4 space-y-5 bg-nen/80 dark:bg-black/30 p-4 sm:p-5 rounded-2xl border border-vien/80 shadow-xs">
          {/* BƯỚC 1: DỊP MẶC (BỐI CẢNH) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="select-boi-canh"
                className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded-full bg-son text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Dịp mặc (Bối cảnh)</span>
              </label>
              <span className="text-[11px] text-chu-phu/70">{selectedBoiCanh.thoi_diem}</span>
            </div>

            <select
              id="select-boi-canh"
              value={selectedBoiCanh.id}
              onChange={(e) => {
                const found = getBoiCanhById(e.target.value);
                if (found) {
                  setSelectedBoiCanh(found);
                  // Kiểm tra xem trang phục hiện tại có nằm trong dịp này không
                  const inContext =
                    found.trang_phuc_nu.includes(selectedTrangPhuc.id) ||
                    found.trang_phuc_nam.includes(selectedTrangPhuc.id);
                  if (!inContext) {
                    // Tự động chuyển sang trang phục khả dụng có ảnh đầu tiên trong dịp
                    const firstValidInContext = costumesWithPhotos.find(
                      (tp) =>
                        found.trang_phuc_nu.includes(tp.id) ||
                        found.trang_phuc_nam.includes(tp.id)
                    );
                    if (firstValidInContext) {
                      setSelectedTrangPhuc(firstValidInContext);
                    }
                  }
                }
              }}
              className="w-full text-xs sm:text-sm font-medium p-2.5 rounded-xl bg-nen-phu/70 dark:bg-stone-900 border border-vien text-chu focus:outline-none focus:ring-1 focus:ring-nghe transition-all cursor-pointer"
            >
              {allBoiCanh.map((bc) => (
                <option key={bc.id} value={bc.id}>
                  {bc.ten} ({bc.thoi_diem})
                </option>
              ))}
            </select>

            <p className="mt-1.5 text-xs text-chu-phu bg-nen-phu/40 dark:bg-stone-900/40 p-2 rounded-lg border-l-2 border-nghe leading-relaxed">
              {selectedBoiCanh.luu_y_van_hoa}
            </p>
          </div>

          {/* BƯỚC 2: TRANG PHỤC CHÍNH (KHÓA MỤC THIẾU ẢNH) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-son text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Trang phục chính</span>
              </label>
              <button
                type="button"
                onClick={() => setShowAllCostumes(!showAllCostumes)}
                className="text-[11px] text-tim-hue dark:text-nghe hover:underline cursor-pointer flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-nghe rounded outline-none"
              >
                <Filter className="w-3 h-3" />
                <span>{showAllCostumes ? 'Theo dịp' : 'Xem tất cả'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Lựa chọn trang phục">
              {contextCostumes.map((tp) => {
                const isSelected = selectedTrangPhuc.id === tp.id;
                const coAnh = kiemTraTrangPhucCoAnh(tp.id);
                const lyDoKhoa = layLyDoChuaCoAnh(tp.id);

                return (
                  <button
                    key={tp.id}
                    type="button"
                    disabled={!coAnh}
                    onClick={() => {
                      if (coAnh) {
                        setSelectedTrangPhuc(tp);
                        // Tự động tìm giới tính hợp lệ đầu tiên
                        const gList = layDanhSachGioiTinhKhaDung(tp.id);
                        const firstG = gList.find((g) => g.khaDung)?.id || 'nu';
                        setGioiTinh(firstG);
                        // Cập nhật màu thực tế
                        const colors = layMauMacDinhTheoAnh(tp.id, firstG);
                        if (colors) {
                          const c1 = getMauSacById(colors.mauChinhId);
                          const c2 = getMauSacById(colors.mauPhuId);
                          if (c1) setMauChinh(c1);
                          if (c2) setMauPhu(c2);
                        }
                        setSelectedPhuKienIds([]);
                      }
                    }}
                    title={
                      !coAnh
                        ? lyDoKhoa || 'Chưa có ảnh thực tế cho trang phục này'
                        : `Chọn ${tp.ten}`
                    }
                    className={`p-2 rounded-xl text-left transition-all duration-200 flex flex-col justify-between ${
                      !coAnh
                        ? 'opacity-40 bg-stone-100 dark:bg-stone-900/30 border border-dashed border-stone-300 dark:border-stone-800 cursor-not-allowed text-stone-500'
                        : isSelected
                        ? 'bg-son/10 border-2 border-nghe text-son dark:text-nghe shadow-xs font-semibold'
                        : 'bg-nen-phu/50 dark:bg-stone-900/60 border border-vien text-chu hover:border-nghe/70 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs leading-snug line-clamp-1">{tp.ten}</span>
                      {!coAnh ? (
                        <Lock className="w-3 h-3 text-stone-400 flex-shrink-0" />
                      ) : isSelected ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-nghe flex-shrink-0" />
                      ) : null}
                    </div>
                    <span className="text-[10px] text-chu-phu/70 mt-1 line-clamp-1">
                      {!coAnh ? 'Chưa có ảnh' : tp.gioi_tinh}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BƯỚC 2B: GIỚI TÍNH & BIẾN THỂ TRÌNH DIỄN */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5 mb-2">
              <User className="w-3.5 h-3.5" />
              <span>Biến thể giới tính</span>
            </label>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Lựa chọn giới tính">
              {danhSachGioiTinh.map((g) => {
                const isSelected = gioiTinh === g.id && g.khaDung;
                return (
                  <button
                    key={g.id}
                    type="button"
                    disabled={!g.khaDung}
                    onClick={() => {
                      if (g.khaDung) {
                        setGioiTinh(g.id);
                        const colors = layMauMacDinhTheoAnh(selectedTrangPhuc.id, g.id);
                        if (colors) {
                          const c1 = getMauSacById(colors.mauChinhId);
                          const c2 = getMauSacById(colors.mauPhuId);
                          if (c1) setMauChinh(c1);
                          if (c2) setMauPhu(c2);
                        }
                      }
                    }}
                    title={g.khaDung ? `Chọn bản ${g.ten}` : g.lyDo || 'Chưa có ảnh cho lựa chọn này'}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                      !g.khaDung
                        ? 'opacity-40 border border-dashed border-stone-300 dark:border-stone-800 text-stone-500 cursor-not-allowed'
                        : isSelected
                        ? 'bg-son text-white dark:bg-nghe dark:text-stone-900 font-bold shadow-xs'
                        : 'bg-nen-phu/60 dark:bg-stone-900 border border-vien text-chu hover:border-nghe cursor-pointer'
                    }`}
                  >
                    {!g.khaDung && <Lock className="w-3 h-3 text-stone-400" />}
                    <span>Bản {g.ten}</span>
                  </button>
                );
              })}
            </div>
            {/* Chú thích nếu có lựa chọn bị khóa */}
            {danhSachGioiTinh.some((g) => !g.khaDung) && (
              <p className="mt-1 text-[11px] text-chu-phu/70 italic">
                * {danhSachGioiTinh.find((g) => !g.khaDung)?.lyDo}
              </p>
            )}
          </div>

          {/* BƯỚC 3: MỨC PHONG CÁCH */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5 mb-2">
              <span className="w-4 h-4 rounded-full bg-son text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Mức phong cách</span>
            </label>
            <ThanhMucPhongCach
              mucHienTai={mucPhongCach}
              mucToiDa={mucToiDaGoiY}
              onChange={setMucPhongCach}
            />
          </div>

          {/* BƯỚC 4: MÀU SẮC (ĐỒNG BỘ ẢNH THỰC TẾ) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-son text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>Màu áo chính & Màu viền phụ</span>
              </label>
            </div>

            {/* Màu chính */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-chu-phu">Màu áo chính:</span>
                <span className="font-semibold text-chu">{mauChinh.ten}</span>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Chọn màu áo chính">
                {allMauSac.map((m) => {
                  const check = kiemTraMauChinhKhaDung(selectedTrangPhuc.id, gioiTinh, m.id);
                  const isSelected = mauChinh.id === m.id;
                  const isAvailable = check.khaDung;

                  return (
                    <button
                      key={`chinh-${m.id}`}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) setMauChinh(m);
                      }}
                      title={
                        isAvailable
                          ? `Màu ${m.ten}`
                          : `Chưa có ảnh thực tế cho màu ${m.ten} (${check.lyDo || ''})`
                      }
                      className={`w-7 h-7 rounded-full transition-all relative ${
                        !isAvailable
                          ? 'opacity-25 border border-dashed border-stone-400 cursor-not-allowed scale-90'
                          : isSelected
                          ? 'border-2 border-nghe scale-110 shadow-[0_0_8px_#E0A526] cursor-pointer'
                          : 'border border-black/20 hover:scale-105 cursor-pointer'
                      }`}
                      style={{ backgroundColor: m.hex }}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Màu phụ */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-chu-phu">Màu viền & tà phụ:</span>
                <span className="font-semibold text-chu">{mauPhu.ten}</span>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Chọn màu viền phụ">
                {allMauSac.map((m) => {
                  const check = kiemTraMauPhuKhaDung(selectedTrangPhuc.id, gioiTinh, m.id);
                  const isSelected = mauPhu.id === m.id;
                  const isAvailable = check.khaDung;

                  return (
                    <button
                      key={`phu-${m.id}`}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) setMauPhu(m);
                      }}
                      title={
                        isAvailable
                          ? `Màu ${m.ten}`
                          : `Chưa có ảnh thực tế cho màu ${m.ten} (${check.lyDo || ''})`
                      }
                      className={`w-7 h-7 rounded-full transition-all relative ${
                        !isAvailable
                          ? 'opacity-25 border border-dashed border-stone-400 cursor-not-allowed scale-90'
                          : isSelected
                          ? 'border-2 border-nghe scale-110 shadow-[0_0_8px_#E0A526] cursor-pointer'
                          : 'border border-black/20 hover:scale-105 cursor-pointer'
                      }`}
                      style={{ backgroundColor: m.hex }}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-[11px] text-chu-phu/70 italic">
                * Chỉ mở màu có ảnh hiện vật thật đã được kiểm chứng.
              </p>
            </div>
          </div>

          {/* BƯỚC 5: PHỤ KIỆN (KHÓA TOÀN BỘ VỚI LÝ DO CHƯA CÓ ẢNH) */}
          <div className="pt-2 border-t border-vien/60">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-son text-white flex items-center justify-center text-[10px]">
                  5
                </span>
                <span>Phụ kiện truyền thống</span>
              </label>
              <span className="text-[11px] text-chu-phu/60 font-medium">Tư liệu tham khảo</span>
            </div>

            <div className="p-2.5 rounded-xl bg-nen-phu/40 dark:bg-stone-900/40 border border-dashed border-vien text-xs text-chu-phu leading-relaxed mb-2.5">
              <span className="font-semibold text-chu">Thông báo tư liệu:</span> Hiện chưa có ảnh
              minh họa phụ kiện đạt chuẩn hiện vật để trình diễn trong Studio. Các mục bên dưới được
              lưu trữ để bạn tra cứu văn hóa.
            </div>

            <div className="flex flex-wrap gap-1.5">
              {evaluatedAccessories.slice(0, 10).map(({ phuKien, isDisabled, lockReason }) => (
                <ChipPhuKien
                  key={phuKien.id}
                  phuKien={phuKien}
                  isSelected={false}
                  isDisabled={isDisabled}
                  lockReason={lockReason}
                  onToggle={() => {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* === VÙNG 2: SÂN KHẤU ẢNH LỚN (Giữa: 5 cột trên desktop - Trọng tâm thị giác) === */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="sticky top-20 w-full space-y-4">
            <VisualCostumePreview
              trangPhuc={selectedTrangPhuc}
              mauChinh={mauChinh}
              mauPhu={mauPhu}
              gioiTinh={gioiTinh}
              mucPhongCachId={mucPhongCach}
              diemHaiHoa={ketQuaHaiHoa.diem}
              xepLoai={ketQuaHaiHoa.xep_loai}
              idSuffix="studio"
              cheDoXem="san_khau"
            />

            {/* Bảng tóm tắt thông số trình diễn */}
            <div className="p-3.5 bg-nen/80 dark:bg-black/30 rounded-2xl border border-vien/70 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-chu-phu">Bối cảnh:</span>
                <span className="font-semibold text-chu">{selectedBoiCanh.ten}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-chu-phu">Phong cách áp dụng:</span>
                <span className="font-semibold text-son">
                  {mucPhongCach === 'remix_gen_z'
                    ? 'Remix Gen Z'
                    : mucPhongCach === 'cach_tan_nhe'
                    ? 'Cách tân nhẹ'
                    : 'Truyền thống'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-vien/40">
                <span className="text-chu-phu">Biến thể:</span>
                <span className="font-medium text-chu">
                  {selectedTrangPhuc.ten} ({gioiTinh === 'nam' ? 'Nam' : 'Nữ'})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === VÙNG 3: ĐÁNH GIÁ HÀI HÒA & VĂN HÓA (Phải: 3 cột trên desktop) === */}
        <div className="lg:col-span-3 space-y-4">
          {/* ĐIỂM HÀI HÒA MÀU SẮC */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-chu-phu mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-nghe" />
              <span>Điểm Hài Hòa Màu Sắc</span>
            </h4>
            <ODiemHaiHoa ketQua={ketQuaHaiHoa} />
          </div>

          {/* CẢNH BÁO VĂN HÓA W1–W7 */}
          {warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-son flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Lưu ý văn hóa ({warnings.length})</span>
              </h4>
              {warnings.map((w) => (
                <CanhBaoItem key={w.id} canhBao={w} onSelectSource={onSelectSource} />
              ))}
            </div>
          )}

          {/* THÔNG TIN VĂN HÓA NHẬN DIỆN */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-chu-phu mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-son" />
              <span>Đặc trưng nhận diện</span>
            </h4>
            <div className="p-3.5 bg-nen/80 dark:bg-black/30 rounded-2xl border border-vien/70 text-xs space-y-2">
              <p className="font-serif-vi font-bold text-chu text-sm">
                {selectedTrangPhuc.ten}
              </p>
              <p className="text-chu-phu leading-relaxed">
                {selectedTrangPhuc.mo_ta}
              </p>
              {selectedTrangPhuc.dac_trung_nhan_dien && (
                <div className="pt-2 border-t border-vien/40 space-y-1">
                  <span className="text-[11px] font-semibold text-chu block">Dấu hiệu nhận biết:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-chu-phu">
                    {selectedTrangPhuc.dac_trung_nhan_dien.map((dt, i) => (
                      <li key={i}>{dt.ten}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CÁC THẺ VĂN HÓA CON (NẾU CÓ) */}
          {culturalChildren.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-chu-phu flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-nghe" />
                <span>Kiến thức chuyên sâu</span>
              </h4>
              {culturalChildren.map((child) => (
                <TheVanHoa key={child.id} trangPhuc={child} onSelectSource={onSelectSource} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL TƯ VẤN AI */}
      {showAiModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-ai-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
        >
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-nen dark:bg-nen-phu p-6 rounded-3xl border border-vien shadow-2xl space-y-4 curtain-enter">
            <div className="flex items-center justify-between border-b border-vien/60 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-tim-hue dark:text-nghe" />
                <h3 id="modal-ai-title" className="font-serif-vi text-lg font-bold text-chu">
                  Góc Tư Vấn Cổ Phục AI
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-chu-phu hover:text-chu hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Đóng bảng tư vấn"
              >
                ✕
              </button>
            </div>

            {aiLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-8 h-8 border-2 border-tim-hue border-t-nghe rounded-full animate-spin" />
                <p className="text-sm font-medium text-chu">Đang kết nối chuyên gia cổ phục...</p>
                <p className="text-xs text-chu-phu">Rà soát bối cảnh {selectedBoiCanh.ten} và quy tắc văn hóa</p>
              </div>
            ) : aiResult ? (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-tim-hue/10 border border-tim-hue/20 space-y-1.5">
                  <span className="font-bold text-tim-hue dark:text-nghe block text-xs uppercase tracking-wider">
                    Nhận xét tổng quan
                  </span>
                  <p className="text-chu leading-relaxed">{aiResult.nhan_xet}</p>
                </div>

                {aiResult.giai_thich_hai_hoa && (
                  <div className="p-3.5 rounded-2xl bg-nen-phu/60 border border-vien space-y-1.5">
                    <span className="font-bold text-son block text-xs uppercase tracking-wider">
                      Về hòa sắc
                    </span>
                    <p className="text-chu-phu leading-relaxed">{aiResult.giai_thich_hai_hoa}</p>
                  </div>
                )}

                {aiResult.goi_y_dieu_chinh && aiResult.goi_y_dieu_chinh.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-chu block text-xs uppercase tracking-wider">
                      Gợi ý hoàn thiện
                    </span>
                    <ul className="space-y-1 pl-4 list-disc text-chu-phu">
                      {aiResult.goi_y_dieu_chinh.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiResult.meo_tao_dang && aiResult.meo_tao_dang.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-bold text-chu block text-xs uppercase tracking-wider">
                      Mẹo chụp ảnh & Phong thái
                    </span>
                    <ul className="space-y-1 pl-4 list-disc text-chu-phu">
                      {aiResult.meo_tao_dang.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            <div className="pt-3 border-t border-vien/60 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-xl bg-son text-white hover:bg-son/90 font-medium text-xs transition-colors cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
