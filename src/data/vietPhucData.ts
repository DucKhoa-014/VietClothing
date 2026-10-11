import rawData from '../../Viet_phuc_Remix_du_lieu/viet_phuc_data_v4.json';
import {
  VietPhucData,
  TrangPhuc,
  BoiCanh,
  PhuKien,
  MauSac,
  NguonThamKhao,
  QuyTacCanhBao,
  MucPhongCach
} from '../types';

export const data: VietPhucData = rawData as unknown as VietPhucData;

export const getAllTrangPhuc = (): TrangPhuc[] => {
  return data.trang_phuc.filter((tp) => tp.hien_thi !== false);
};

export const getSelectableTrangPhuc = (): TrangPhuc[] => {
  return data.trang_phuc.filter((tp) => tp.hien_thi !== false && tp.co_the_chon === true);
};

export const getTrangPhucById = (id: string): TrangPhuc | undefined => {
  return data.trang_phuc.find((tp) => tp.id === id);
};

export const getChildrenOfTrangPhuc = (parentId: string): TrangPhuc[] => {
  return data.trang_phuc.filter(
    (tp) => tp.thuoc === parentId && tp.hien_thi !== false
  );
};

export const getAllBoiCanh = (): BoiCanh[] => {
  return data.boi_canh;
};

export const getBoiCanhById = (id: string): BoiCanh | undefined => {
  return data.boi_canh.find((bc) => bc.id === id);
};

export const getAllMauSac = (): MauSac[] => {
  return data.mau_sac;
};

export const getMauSacById = (id: string): MauSac | undefined => {
  return data.mau_sac.find((m) => m.id === id);
};

export const getAllPhuKien = (): PhuKien[] => {
  return data.phu_kien;
};

export const getPhuKienById = (id: string): PhuKien | undefined => {
  return data.phu_kien.find((pk) => pk.id === id);
};

export const getAllNguon = (): NguonThamKhao[] => {
  return data.nguon;
};

export const getNguonById = (id: string): NguonThamKhao | undefined => {
  return data.nguon.find((n) => n.id === id);
};

export const getCanhBaoById = (id: string): QuyTacCanhBao | undefined => {
  return data.quy_tac_canh_bao.find((cb) => cb.id === id);
};

export const getMucPhongCachList = (): MucPhongCach[] => {
  return data.muc_phong_cach;
};

export const getMucPhongCachOrder = (id: string): number => {
  const item = data.muc_phong_cach.find((m) => m.id === id);
  return item ? item.thu_tu : 0;
};
