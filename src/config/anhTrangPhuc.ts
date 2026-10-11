/**
 * Cấu hình ánh xạ hình ảnh thực tế cho trang phục (Việt Phục Remix)
 * Lưu ý: Tệp độc lập trong src/config/, không sửa đổi src/data/ hay dữ liệu gốc.
 * Ánh xạ đúng 100% hình ảnh thật từ thư mục public/trang-phuc/
 */

export interface LopTrangPhuc {
  tenLop: string;
  duongDan: string;
  thuTu: number; // z-index theo thứ tự mặc văn hóa
  mauSacId: string;
  moTa: string;
}

export interface ToHopTrinhDien {
  id: string;
  trangPhucId: string;
  gioiTinh: 'nam' | 'nu';
  tenTrangPhuc: string;
  tieuDeBienThe: string;
  moTaHienVat: string;
  dinhDang: 'png' | 'jpeg';
  anhChinh: string;
  laNhieuLop: boolean;
  danhSachLop?: LopTrangPhuc[];
  mauChinhThucTe: string; // ID màu trong mau_sac
  mauChinhChapNhan: string[];
  mauPhuThucTe: string; // ID màu trong mau_sac
  mauPhuChapNhan: string[];
  laKhaDungStudio: boolean;
  lyDoKhoa?: string;
  chuThichNen?: string;
}

export interface TrangPhucStatus {
  trangPhucId: string;
  coAnh: boolean;
  lyDo?: string;
}

/**
 * Danh sách toàn bộ tổ hợp hình ảnh thực tế đã được kiểm chứng
 */
export const MANIFEST_ANH_TRANG_PHUC: ToHopTrinhDien[] = [
  // 1. Áo ngũ thân - Nam
  {
    id: 'ao_ngu_than_nam',
    trangPhucId: 'ao_ngu_than',
    gioiTinh: 'nam',
    tenTrangPhuc: 'Áo ngũ thân',
    tieuDeBienThe: 'Áo ngũ thân nam truyền thống',
    moTaHienVat: 'Áo ngũ thân tay chẽn dáng nam, màu nâu non thanh nhã phối quần sáng màu và khăn xếp.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-ngu-than/nam.png',
    laNhieuLop: false,
    mauChinhThucTe: 'nau_non',
    mauChinhChapNhan: ['nau_non', 'nau', 'be'],
    mauPhuThucTe: 'be',
    mauPhuChapNhan: ['be', 'trang_nga', 'kem'],
    laKhaDungStudio: true,
  },

  // 2. Áo ngũ thân - Nữ
  {
    id: 'ao_ngu_than_nu',
    trangPhucId: 'ao_ngu_than',
    gioiTinh: 'nu',
    tenTrangPhuc: 'Áo ngũ thân',
    tieuDeBienThe: 'Áo ngũ thân nữ truyền thống',
    moTaHienVat: 'Áo ngũ thân nữ trang nhã màu đen tuyền kết hợp cổ áo trắng và quần lụa sáng màu.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-ngu-than/nu.png',
    laNhieuLop: false,
    mauChinhThucTe: 'den',
    mauChinhChapNhan: ['den', 'xanh_reu'],
    mauPhuThucTe: 'trang_nga',
    mauPhuChapNhan: ['trang_nga', 'kem', 'trang'],
    laKhaDungStudio: true,
  },

  // 3. Áo dài hiện đại - Nữ (Đầy đủ áo nữ + quần nữ)
  {
    id: 'ao_dai_hien_dai_nu',
    trangPhucId: 'ao_dai_hien_dai',
    gioiTinh: 'nu',
    tenTrangPhuc: 'Áo dài hiện đại',
    tieuDeBienThe: 'Áo dài hiện đại nữ hoàn chỉnh',
    moTaHienVat: 'Bộ áo dài nữ hoàn chỉnh gồm áo dài lụa màu xanh ngọc dịu mát và quần lụa trắng ngà truyền thống.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-dai/ao-nu.png',
    laNhieuLop: true,
    danhSachLop: [
      {
        tenLop: 'Quần lụa',
        duongDan: '/trang-phuc/ao-dai/quan-nu.png',
        thuTu: 1,
        mauSacId: 'trang',
        moTa: 'Quần lụa ống rộng màu trắng ngà mặc lót bên trong tà áo.',
      },
      {
        tenLop: 'Áo dài',
        duongDan: '/trang-phuc/ao-dai/ao-nu.png',
        thuTu: 2,
        mauSacId: 'xanh_ngoc',
        moTa: 'Tà áo dài duyên dáng màu xanh ngọc thanh thoát.',
      },
    ],
    mauChinhThucTe: 'xanh_ngoc',
    mauChinhChapNhan: ['xanh_ngoc', 'xanh_ho_thuy'],
    mauPhuThucTe: 'trang',
    mauPhuChapNhan: ['trang', 'trang_nga'],
    laKhaDungStudio: true,
  },

  // 4. Áo dài hiện đại - Nam (Chỉ có áo, thiếu quần) -> KHÓA theo quy tắc thiết kế
  {
    id: 'ao_dai_hien_dai_nam',
    trangPhucId: 'ao_dai_hien_dai',
    gioiTinh: 'nam',
    tenTrangPhuc: 'Áo dài hiện đại',
    tieuDeBienThe: 'Áo dài hiện đại nam (Chưa đủ bộ)',
    moTaHienVat: 'Hiện tại tư liệu chỉ có ảnh áo nam, chưa có ảnh quần nam đi kèm nên tạm khóa trình diễn.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-dai/ao-nam.png',
    laNhieuLop: false,
    mauChinhThucTe: 'den',
    mauChinhChapNhan: ['den'],
    mauPhuThucTe: 'trang',
    mauPhuChapNhan: ['trang'],
    laKhaDungStudio: false,
    lyDoKhoa: 'Chưa có đủ ảnh quần nam hoàn chỉnh cho lựa chọn này',
  },

  // 5. Áo bà ba - Nam (JPEG nền trung tính)
  {
    id: 'ao_ba_ba_nam',
    trangPhucId: 'ao_ba_ba',
    gioiTinh: 'nam',
    tenTrangPhuc: 'Áo bà ba',
    tieuDeBienThe: 'Áo bà ba nam mộc mạc',
    moTaHienVat: 'Áo bà ba nam màu xanh rêu cổ điển phối quần đen, chất liệu dân dã Nam Bộ.',
    dinhDang: 'jpeg',
    anhChinh: '/trang-phuc/ao-ba-ba/nam.jpeg',
    laNhieuLop: false,
    mauChinhThucTe: 'xanh_reu',
    mauChinhChapNhan: ['xanh_reu'],
    mauPhuThucTe: 'den',
    mauPhuChapNhan: ['den'],
    laKhaDungStudio: true,
    chuThichNen: 'Ảnh tư liệu trang phục nam trên nền màu trắng ngà đồng bộ.',
  },

  // 6. Áo bà ba - Nữ (PNG trong suốt)
  {
    id: 'ao_ba_ba_nu',
    trangPhucId: 'ao_ba_ba',
    gioiTinh: 'nu',
    tenTrangPhuc: 'Áo bà ba',
    tieuDeBienThe: 'Áo bà ba nữ duyên dáng',
    moTaHienVat: 'Áo bà ba nữ chiết eo duyên dáng màu xanh lam phối quần lụa trắng ngà mát mẻ.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-ba-ba/nu.png',
    laNhieuLop: false,
    mauChinhThucTe: 'xanh_lam',
    mauChinhChapNhan: ['xanh_lam', 'denim'],
    mauPhuThucTe: 'trang',
    mauPhuChapNhan: ['trang', 'trang_nga'],
    laKhaDungStudio: true,
  },

  // 7. Áo tứ thân - Nữ (3 lớp đồng thời: yếm vàng + váy đỏ + áo choàng xanh)
  {
    id: 'ao_tu_than_nu',
    trangPhucId: 'ao_tu_than',
    gioiTinh: 'nu',
    tenTrangPhuc: 'Áo tứ thân',
    tieuDeBienThe: 'Áo tứ thân ba lớp truyền thống',
    moTaHienVat: 'Bộ trang phục áo tứ thân trọn vẹn gồm 3 lớp: yếm vàng nghệ bên trong, váy lụa đỏ thắm và áo choàng ngoài màu xanh lam.',
    dinhDang: 'png',
    anhChinh: '/trang-phuc/ao-tu-than/ao-choang-xanh.png',
    laNhieuLop: true,
    danhSachLop: [
      {
        tenLop: 'Yếm lụa',
        duongDan: '/trang-phuc/ao-tu-than/yem-vang.png',
        thuTu: 1, // Lớp trong cùng che ngực
        mauSacId: 'vang_nghe',
        moTa: 'Yếm cổ xây màu vàng nghệ rực rỡ bên trong.',
      },
      {
        tenLop: 'Váy đỏ',
        duongDan: '/trang-phuc/ao-tu-than/vay-do.png',
        thuTu: 2, // Lớp váy dưới
        mauSacId: 'do_son',
        moTa: 'Váy dài bằng lụa màu đỏ son thắm duyên dáng.',
      },
      {
        tenLop: 'Áo choàng ngoài',
        duongDan: '/trang-phuc/ao-tu-than/ao-choang-xanh.png',
        thuTu: 3, // Áo khoác ngoài buông tà
        mauSacId: 'xanh_lam',
        moTa: 'Áo choàng bốn thân màu xanh lam khoác ngoài phấp phới.',
      },
    ],
    mauChinhThucTe: 'xanh_lam',
    mauChinhChapNhan: ['xanh_lam', 'xanh_ho_thuy'],
    mauPhuThucTe: 'do_son',
    mauPhuChapNhan: ['do_son', 'do_tham', 'vang_nghe'],
    laKhaDungStudio: true,
  },
];

/**
 * Danh sách trang phục KHÔNG có ảnh trong kho hiện tại
 * Bị vô hiệu hóa trong Studio Phối đồ
 */
export const TRANG_PHUC_CHUA_CO_ANH: Record<string, string> = {
  ao_tac: 'Chưa có ảnh tư liệu thực tế cho Áo tấc (đang cập nhật từ nguồn bảo tàng)',
  ao_mo_ba_mo_bay: 'Chưa có ảnh tư liệu thực tế cho Áo mớ ba mớ bảy',
  ao_nhat_binh: 'Chưa có ảnh tư liệu phục dựng cho Áo nhật bình',
  ao_giao_linh: 'Chưa có ảnh tư liệu phục dựng cho Áo giao lĩnh',
};

/**
 * Kiểm tra xem một trang phục có ảnh thực tế hợp lệ hay không
 */
export function kiemTraTrangPhucCoAnh(trangPhucId: string): boolean {
  return MANIFEST_ANH_TRANG_PHUC.some(
    (item) => item.trangPhucId === trangPhucId && item.laKhaDungStudio
  );
}

/**
 * Lấy lý do nếu trang phục chưa có ảnh
 */
export function layLyDoChuaCoAnh(trangPhucId: string): string | null {
  if (TRANG_PHUC_CHUA_CO_ANH[trangPhucId]) {
    return TRANG_PHUC_CHUA_CO_ANH[trangPhucId];
  }
  const items = MANIFEST_ANH_TRANG_PHUC.filter((i) => i.trangPhucId === trangPhucId);
  if (items.length > 0 && items.every((i) => !i.laKhaDungStudio)) {
    return items[0].lyDoKhoa || 'Chưa đủ tư liệu hình ảnh hoàn chỉnh';
  }
  return null;
}

/**
 * Lấy danh sách giới tính khả dụng cho một trang phục
 */
export function layDanhSachGioiTinhKhaDung(
  trangPhucId: string
): Array<{ id: 'nam' | 'nu'; ten: string; khaDung: boolean; lyDo?: string }> {
  const cacToHop = MANIFEST_ANH_TRANG_PHUC.filter((t) => t.trangPhucId === trangPhucId);

  const ketQua: Array<{ id: 'nam' | 'nu'; ten: string; khaDung: boolean; lyDo?: string }> = [];

  // Nam
  const banNam = cacToHop.find((t) => t.gioiTinh === 'nam');
  if (banNam) {
    ketQua.push({
      id: 'nam',
      ten: 'Nam',
      khaDung: banNam.laKhaDungStudio,
      lyDo: banNam.laKhaDungStudio ? undefined : banNam.lyDoKhoa || 'Chưa có ảnh cho nam',
    });
  }

  // Nữ
  const banNu = cacToHop.find((t) => t.gioiTinh === 'nu');
  if (banNu) {
    ketQua.push({
      id: 'nu',
      ten: 'Nữ',
      khaDung: banNu.laKhaDungStudio,
      lyDo: banNu.laKhaDungStudio ? undefined : banNu.lyDoKhoa || 'Chưa có ảnh cho nữ',
    });
  }

  return ketQua;
}

/**
 * Lấy tổ hợp trình diễn phù hợp nhất theo trang phục và giới tính
 */
export function layToHopTrinhDien(
  trangPhucId: string,
  gioiTinh?: 'nam' | 'nu'
): ToHopTrinhDien | null {
  const cacToHop = MANIFEST_ANH_TRANG_PHUC.filter(
    (t) => t.trangPhucId === trangPhucId && t.laKhaDungStudio
  );

  if (cacToHop.length === 0) return null;

  if (gioiTinh) {
    const timThay = cacToHop.find((t) => t.gioiTinh === gioiTinh);
    if (timThay) return timThay;
  }

  return cacToHop[0];
}

/**
 * Kiểm tra xem màu chính có khớp với ảnh thật hay không
 */
export function kiemTraMauChinhKhaDung(
  trangPhucId: string,
  gioiTinh: 'nam' | 'nu',
  mauId: string
): { khaDung: boolean; lyDo?: string } {
  const toHop = MANIFEST_ANH_TRANG_PHUC.find(
    (t) => t.trangPhucId === trangPhucId && t.gioiTinh === gioiTinh
  );
  if (!toHop || !toHop.laKhaDungStudio) {
    return {
      khaDung: false,
      lyDo: toHop?.lyDoKhoa || 'Chưa có ảnh cho lựa chọn này',
    };
  }

  const hopLe = toHop.mauChinhChapNhan.includes(mauId);
  return {
    khaDung: hopLe,
    lyDo: hopLe ? undefined : `Ảnh thực tế trang phục này có màu chính là ${toHop.mauChinhThucTe}`,
  };
}

/**
 * Kiểm tra xem màu phụ có khớp với ảnh thật hay không
 */
export function kiemTraMauPhuKhaDung(
  trangPhucId: string,
  gioiTinh: 'nam' | 'nu',
  mauId: string
): { khaDung: boolean; lyDo?: string } {
  const toHop = MANIFEST_ANH_TRANG_PHUC.find(
    (t) => t.trangPhucId === trangPhucId && t.gioiTinh === gioiTinh
  );
  if (!toHop || !toHop.laKhaDungStudio) {
    return {
      khaDung: false,
      lyDo: toHop?.lyDoKhoa || 'Chưa có ảnh cho lựa chọn này',
    };
  }

  const hopLe = toHop.mauPhuChapNhan.includes(mauId);
  return {
    khaDung: hopLe,
    lyDo: hopLe ? undefined : `Ảnh thực tế trang phục này có màu phụ là ${toHop.mauPhuThucTe}`,
  };
}

/**
 * Lấy tổ hợp màu sắc mặc định chuẩn từ ảnh thật
 */
export function layMauMacDinhTheoAnh(
  trangPhucId: string,
  gioiTinh: 'nam' | 'nu'
): { mauChinhId: string; mauPhuId: string } | null {
  const toHop = MANIFEST_ANH_TRANG_PHUC.find(
    (t) => t.trangPhucId === trangPhucId && t.gioiTinh === gioiTinh && t.laKhaDungStudio
  );
  if (!toHop) return null;
  return {
    mauChinhId: toHop.mauChinhThucTe,
    mauPhuId: toHop.mauPhuThucTe,
  };
}
