import React from 'react';
import { ShieldCheck, Heart, Sparkles, BookOpen, Users } from 'lucide-react';
import { PageHeader } from './ui/PageHeader';

export const GioiThieuSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      {/* Hero */}
      <PageHeader
        soThuTu="Về Dự Án Bách Y Ký"
        tieuDe="Tôn Vinh Di Sản Văn Hóa & Hơi Thở Đương Đại"
        moTa="Bách Y Ký ra đời với sứ mệnh mang trang phục truyền thống Việt Nam đến gần hơn với thế hệ trẻ qua lăng kính thẩm mỹ hiện đại, chuẩn xác về tư liệu và tinh tế trong phối đồ."
        className="text-center sm:text-left"
      />

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#B8322A]/10 text-[#B8322A] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif-vi text-lg font-bold text-[#262626] dark:text-[#F2E6CF] mb-2">
              Trung Thực Về Nguồn
            </h3>
            <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed">
              Mọi dữ kiện lịch sử đều trích dẫn từ 30 nguồn tham khảo được phân định rõ: học thuật, bảo tàng, báo chí hoặc phổ thông; kèm nhãn kiểm chứng minh bạch.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#E0A526]/15 text-[#855B14] dark:text-[#F2BD42] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-vi text-lg font-bold text-[#262626] dark:text-[#F2E6CF] mb-2">
              Tôn Trọng Văn Hóa
            </h3>
            <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed">
              Hệ thống cảnh báo W1–W7 tự động nhắc nhở người mặc giữ gìn sự tôn nghiêm ở không gian thờ tự, lễ hội đình làng hoặc đám cưới mà không mang tính cấm đoán khắt khe.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#5E3F73]/15 text-[#5E3F73] dark:text-[#906BAE] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-vi text-lg font-bold text-[#262626] dark:text-[#F2E6CF] mb-2">
              Sáng Tạo Có Ranh Giới
            </h3>
            <p className="text-xs text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed">
              Cho phép thế hệ trẻ tự do remix cùng phụ kiện hiện đại (sneaker, jeans, loafer) với điều kiện luôn giữ trọn ít nhất một nét đặc trưng nhận diện của Việt phục.
            </p>
          </div>
        </div>
      </div>

      {/* Team & Credits */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F2E6CF]/60 dark:bg-[#282420] border border-[#E0A526]/30 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#B8322A]" />
          <h3 className="font-serif-vi text-xl font-bold text-[#262626] dark:text-[#F2E6CF]">
            Nhóm Thực Hiện Dự Án
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#6A4A34] dark:text-[#D8C3A5] leading-relaxed mb-6">
          Dự án được xây dựng và tra cứu kỹ lưỡng bởi <strong>Hellosine</strong> và <strong>KhoaSP</strong>. Dữ liệu chuẩn hóa trong phiên bản 4 (cập nhật tháng 10/2026), tập trung vào sự liền mạch giữa tư liệu cổ phục và trải nghiệm phối đồ thế hệ mới.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="font-bold text-sm text-[#262626] dark:text-[#F2E6CF] block">Hellosine</span>
            <span className="text-xs text-stone-500">Phát triển giao diện tương tác, trực quan hóa trang phục & trải nghiệm</span>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="font-bold text-sm text-[#262626] dark:text-[#F2E6CF] block">KhoaSP</span>
            <span className="text-xs text-stone-500">Nghiên cứu tư liệu, thiết kế hệ thống dữ liệu văn hóa & thuật toán</span>
          </div>
        </div>
      </div>
    </div>
  );
};
