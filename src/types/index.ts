export interface MetaInfo {
  ten: string;
  phien_ban: string;
  ngay_cap_nhat: string;
  ghi_chu: string;
  nhan_trang_thai: string[];
}

export interface MucPhongCach {
  id: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  thu_tu: number;
  ten: string;
  mo_ta: string;
}

export interface DacTrungNhanDien {
  ten: string;
  nguon: string[];
}

export interface TrangPhuc {
  id: string;
  thuoc: string | null;
  ten: string;
  gioi_tinh: string;
  mo_ta: string;
  nguon: string[];
  trang_thai_kiem_chung: string;
  hien_thi: boolean;
  ghi_chu: string;
  co_the_chon: boolean;
  muc_phong_cach_toi_da?: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  thanh_phan_co_dinh?: string[];
  dac_trung_nhan_dien?: DacTrungNhanDien[];
  phu_kien_truyen_thong?: string[];
  bien_the_remix?: string[];
}

export interface PhuKien {
  id: string;
  ten: string;
  nhom: 'truyen_thong' | 'remix';
  gioi_tinh: 'nam' | 'nu' | 'ca_hai';
  muc_toi_thieu: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  ap_dung_cho: string[] | 'tat_ca_trang_phuc_cho_phep';
  vi_tri_mockup: 'dau' | 'co' | 'khoac' | 'eo' | 'tay' | 'quan' | 'chan' | 'mat';
  chi_o_boi_canh: string[] | null;
  nguon: string[];
  trang_thai_kiem_chung: string;
  ghi_chu: string;
}

export interface BienTheRemix {
  id: string;
  trang_phuc: string;
  ten: string;
  muc_toi_thieu: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  canh_bao: string[];
  ghi_chu: string;
}

export interface MauSac {
  id: string;
  ten: string;
  hex: string;
  nhom: string | null;
}

export interface BoiCanh {
  id: string;
  ten: string;
  thoi_diem: string;
  trang_phuc_nu: string[];
  trang_phuc_nam: string[];
  nhu_cau: string[];
  luu_y_van_hoa: string;
  muc_phong_cach_toi_da: 'truyen_thong' | 'cach_tan_nhe' | 'remix_gen_z';
  canh_bao: string[];
  bang_mau_goi_y: {
    mau: string[];
    nguon: string[];
    trang_thai: string;
    ghi_chu: string;
  };
}

export interface QuyTacCanhBao {
  id: string;
  dieu_kien: string;
  thong_diep: string;
  nguon: string[];
  trang_thai_kiem_chung: string;
}

export interface QuyTacPhoi {
  muc_hieu_luc: string;
  so_mon_remix_lon_toi_da: number;
  mon_remix_lon: string[];
  ghi_chu_W7: string;
  W3_nhom_mau: string;
  vi_tri_chon_mot: ('chan' | 'khoac' | 'mat' | 'quan')[];
}

export interface QuyTacHaiHoa {
  mo_ta: string;
  phan_loai: {
    id: string;
    ten: string;
    dieu_kien: string;
    diem: number;
  }[];
  tru_diem: {
    dieu_kien: string;
    tru: number;
    nhac: string;
  }[];
  xep_loai: {
    tu: number;
    ten: string;
  }[];
}

export interface NguonThamKhao {
  id: string;
  ten: string;
  loai: string;
  url: string;
  ghi_chu: string;
}

export interface VietPhucData {
  meta: MetaInfo;
  muc_phong_cach: MucPhongCach[];
  trang_phuc: TrangPhuc[];
  phu_kien: PhuKien[];
  bien_the_remix: BienTheRemix[];
  mau_sac: MauSac[];
  cho_phep_mau_tu_do: boolean;
  boi_canh: BoiCanh[];
  quy_tac_canh_bao: QuyTacCanhBao[];
  quy_tac_phoi: QuyTacPhoi;
  quy_tac_hai_hoa: QuyTacHaiHoa;
  cau_hinh_ai: any;
  nguon: NguonThamKhao[];
}

export interface KetQuaHaiHoa {
  diem: number;
  phan_loai: string;
  xep_loai: string;
  nhac_nho: string[];
  ly_do: string;
}

export interface CanhBaoKichHoat {
  id: string;
  thong_diep: string;
  nguon: string[];
  trang_thai_kiem_chung: string;
  muc_do: 'warning' | 'info';
}
