import { MauSac, BoiCanh, KetQuaHaiHoa } from '../types';

// Convert Hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Calculate color saturation / intensity as described: (max - min) / 255 * 100
export function getDoDamMau(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return ((max - min) / 255) * 100;
}

// Calculate hue difference along the color circle
export function getHueDifference(h1: number, h2: number): number {
  const diff = Math.abs(h1 - h2);
  return Math.min(diff, 360 - diff);
}

/**
 * Calculates harmony score according to quy_tac_hai_hoa
 */
export function tinhDiemHaiHoa(
  mauChinh: MauSac,
  mauPhu: MauSac,
  boiCanh?: BoiCanh | null
): KetQuaHaiHoa {
  // If the two colors are identical
  if (mauChinh.id === mauPhu.id) {
    const dam = getDoDamMau(mauChinh.hex);
    const nhac: string[] = [];
    let diem = 88;
    if (boiCanh && boiCanh.bang_mau_goi_y) {
      const isInList = boiCanh.bang_mau_goi_y.mau.includes(mauChinh.id);
      if (!isInList) {
        diem -= 10;
        nhac.push('Cả hai màu đều nằm ngoài bảng màu gợi ý của dịp này.');
      }
    }
    return {
      diem: Math.max(0, Math.min(100, diem)),
      phan_loai: 'Đơn sắc (Ton-sur-ton)',
      xep_loai: diem >= 85 ? 'Rất hài hòa' : diem >= 70 ? 'Hài hòa' : 'Nên cân nhắc',
      nhac_nho: nhac,
      ly_do: 'Phối đơn sắc đồng điệu tạo sự thống nhất, thanh thoát cho tổng thể áo và phụ kiện.',
    };
  }

  const dam1 = getDoDamMau(mauChinh.hex);
  const dam2 = getDoDamMau(mauPhu.hex);

  const rgb1 = hexToRgb(mauChinh.hex);
  const rgb2 = hexToRgb(mauPhu.hex);

  const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
  const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

  const deltaHue = getHueDifference(hsl1.h, hsl2.h);

  let diem = 65;
  let phanLoai = 'Tương phản';
  let lyDo = 'Sự kết hợp giữa hai mảng màu đối lập đem lại năng lượng ấn tượng.';

  // 1. Check neutral condition first (< 22% intensity in either)
  if (dam1 < 22 || dam2 < 22) {
    diem = 88;
    phanLoai = 'Có màu trung tính';
    lyDo = 'Màu trung tính giúp làm dịu thị giác và làm nền tôn vinh sắc thái còn lại.';
  } else if (deltaHue < 30) {
    // 2. Similar / Analogous (< 30 deg hue diff)
    diem = 90;
    phanLoai = 'Tương đồng';
    lyDo = 'Hai gam màu liền kề trên vòng tròn sắc độ tạo nên vẻ đẹp êm dịu, hài hòa tự nhiên.';
  } else if (deltaHue >= 150 && deltaHue <= 210) {
    // 3. Complementary (150 - 210 deg)
    diem = 85;
    phanLoai = 'Bổ trợ';
    lyDo = 'Hai màu đối đỉnh bổ trợ nhau, tạo nên điểm nhấn thị giác sâu sắc mà trang nhã.';
  } else {
    // 4. Contrast
    diem = 65;
    phanLoai = 'Tương phản';
    lyDo = 'Sắc độ tương phản tạo cá tính mạnh mẽ cho trang phục.';
  }

  const nhacNho: string[] = [];

  // Deductions:
  // Contrast and both intensity > 55% -> -10
  if (phanLoai === 'Tương phản' && dam1 > 55 && dam2 > 55) {
    diem -= 10;
    nhacNho.push('Hai màu đều rực và tương phản, thử đổi một màu sang tông nhạt hơn.');
  }

  // Deduct 5 for each color not in context suggested palette
  if (boiCanh && boiCanh.bang_mau_goi_y && boiCanh.bang_mau_goi_y.mau.length > 0) {
    const list = boiCanh.bang_mau_goi_y.mau;
    let notInListCount = 0;
    if (!list.includes(mauChinh.id)) notInListCount++;
    if (!list.includes(mauPhu.id)) notInListCount++;

    if (notInListCount > 0) {
      diem -= notInListCount * 5;
      nhacNho.push(
        `Có ${notInListCount} màu ngoài bảng gợi ý của dịp này (${boiCanh.ten}), bạn vẫn có thể tự tin sử dụng.`
      );
    }
  }

  diem = Math.max(0, Math.min(100, diem));

  let xepLoai = 'Nên cân nhắc';
  if (diem >= 85) {
    xepLoai = 'Rất hài hòa';
  } else if (diem >= 70) {
    xepLoai = 'Hài hòa';
  }

  return {
    diem,
    phan_loai: phanLoai,
    xep_loai: xepLoai,
    nhac_nho: nhacNho,
    ly_do: lyDo,
  };
}
