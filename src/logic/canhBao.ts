import {
  TrangPhuc,
  BoiCanh,
  MauSac,
  CanhBaoKichHoat,
  MucPhongCach
} from '../types';
import { getCanhBaoById, getMucPhongCachOrder } from '../data/vietPhucData';

interface CanhBaoParams {
  trangPhuc: TrangPhuc;
  boiCanh?: BoiCanh | null;
  mucPhongCach: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  mauChinh: MauSac;
  mauPhu: MauSac;
  phuKienIds: string[];
}

export function kiemTraCanhBao(params: CanhBaoParams): CanhBaoKichHoat[] {
  const { trangPhuc, boiCanh, mucPhongCach, mauChinh, mauPhu, phuKienIds } = params;
  const warnings: CanhBaoKichHoat[] = [];

  // W5: Áo nhật bình
  if (trangPhuc.id === 'ao_nhat_binh') {
    const w5 = getCanhBaoById('W5');
    if (w5) {
      warnings.push({
        id: 'W5',
        thong_diep: w5.thong_diep,
        nguon: w5.nguon,
        trang_thai_kiem_chung: w5.trang_thai_kiem_chung,
        muc_do: 'info',
      });
    }
  }

  // W6: Áo giao lĩnh hoặc nhật bình
  if (trangPhuc.id === 'ao_giao_linh' || trangPhuc.id === 'ao_nhat_binh') {
    const w6 = getCanhBaoById('W6');
    if (w6) {
      warnings.push({
        id: 'W6',
        thong_diep: w6.thong_diep,
        nguon: w6.nguon,
        trang_thai_kiem_chung: w6.trang_thai_kiem_chung,
        muc_do: 'info',
      });
    }
  }

  // W1: Yếm remix + đình/chùa/quan họ
  const hasYemRemix = phuKienIds.includes('yem_remix');
  if (
    hasYemRemix &&
    boiCanh &&
    (boiCanh.id === 'quan_ho' || boiCanh.id === 'di_chua' || boiCanh.id === 'gio_to')
  ) {
    const w1 = getCanhBaoById('W1');
    if (w1) {
      warnings.push({
        id: 'W1',
        thong_diep: w1.thong_diep,
        nguon: w1.nguon,
        trang_thai_kiem_chung: w1.trang_thai_kiem_chung,
        muc_do: 'warning',
      });
    }
  }

  // W2: Vượt mức phong cách tối đa của bối cảnh
  if (boiCanh) {
    const orderCurrent = getMucPhongCachOrder(mucPhongCach);
    const orderMaxContext = getMucPhongCachOrder(boiCanh.muc_phong_cach_toi_da);
    if (orderCurrent > orderMaxContext) {
      const w2 = getCanhBaoById('W2');
      if (w2) {
        const tenMucToiDa =
          boiCanh.muc_phong_cach_toi_da === 'truyen_thong'
            ? 'Truyền thống'
            : 'Cách tân nhẹ';
        warnings.push({
          id: 'W2',
          thong_diep: w2.thong_diep.replace('{muc_toi_da}', tenMucToiDa),
          nguon: w2.nguon,
          trang_thai_kiem_chung: w2.trang_thai_kiem_chung,
          muc_do: 'warning',
        });
      }
    }
  }

  // W3: Toàn trắng hoặc toàn đen ở Tết hoặc Đám cưới
  if (boiCanh && (boiCanh.id === 'tet' || boiCanh.id === 'dam_cuoi')) {
    const isAllWhite = mauChinh.nhom === 'trang' && mauPhu.nhom === 'trang';
    const isAllBlack = mauChinh.nhom === 'den' && mauPhu.nhom === 'den';
    if (isAllWhite || isAllBlack) {
      const w3 = getCanhBaoById('W3');
      if (w3) {
        warnings.push({
          id: 'W3',
          thong_diep: w3.thong_diep,
          nguon: w3.nguon,
          trang_thai_kiem_chung: w3.trang_thai_kiem_chung,
          muc_do: 'warning',
        });
      }
    }
  }

  // W7: Quá 2 món remix lớn (blazer_mong, quan_jeans, sneaker_trang, boots_co_thap)
  const bigRemixItems = ['blazer_mong', 'quan_jeans', 'sneaker_trang', 'boots_co_thap'];
  const countBigRemix = phuKienIds.filter((id) => bigRemixItems.includes(id)).length;
  if (countBigRemix > 2) {
    const w7 = getCanhBaoById('W7');
    if (w7) {
      warnings.push({
        id: 'W7',
        thong_diep: `${w7.thong_diep} (Đang chọn ${countBigRemix} món remix lớn có thể che lấp dáng áo truyền thống).`,
        nguon: w7.nguon,
        trang_thai_kiem_chung: w7.trang_thai_kiem_chung,
        muc_do: 'warning',
      });
    }
  }

  return warnings;
}
