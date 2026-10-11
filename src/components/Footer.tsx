/**
 * Chân trang tối giản (Footer) dạng một cột duy nhất:
 * Chứa các liên kết văn hóa chuyển xuống từ navbar (Bảng màu · Nguồn tham khảo · Giới thiệu),
 * thông tin nhóm thực hiện (Hellosine, KhoaSP) và ghi chú trích dẫn tư liệu.
 */
import React from 'react';
import { BookMarked } from 'lucide-react';

interface Props {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<Props> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#23395B] text-white/90 py-12 border-t border-[#E0A526]/30 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
        {/* Brand Emblem & Title */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Bách Y Ký"
            className="h-8 w-auto max-w-[36px] object-contain drop-shadow"
          />
          <span className="font-serif-vi font-bold text-base sm:text-lg tracking-wide text-[#F2E6CF]">
            BÁCH Y KÝ
          </span>
        </div>

        <p className="text-xs text-white/70 max-w-lg leading-relaxed font-sans">
          Không gian trưng bày và kết hợp trang phục cổ truyền Việt Nam mang phong thái hiện đại, trang trọng và tôn trọng sử liệu.
        </p>

        {/* Minimal Single-Row / Flex Links (Transferred from Navbar + Essentials) */}
        <nav aria-label="Điều hướng chân trang" className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-white/85">
          <button
            type="button"
            onClick={() => onSelectTab('colors')}
            data-cursor="link"
            className="hover:text-[#F2BD42] transition-colors nav-link-underline py-0.5 cursor-pointer"
          >
            Bảng màu Việt
          </button>
          <span className="text-white/30">·</span>
          <button
            type="button"
            onClick={() => onSelectTab('sources')}
            data-cursor="link"
            className="hover:text-[#F2BD42] transition-colors nav-link-underline py-0.5 cursor-pointer"
          >
            Nguồn tham khảo
          </button>
          <span className="text-white/30">·</span>
          <button
            type="button"
            onClick={() => onSelectTab('about')}
            data-cursor="link"
            className="hover:text-[#F2BD42] transition-colors nav-link-underline py-0.5 cursor-pointer"
          >
            Giới thiệu dự án
          </button>
          <span className="text-white/30">·</span>
          <button
            type="button"
            onClick={() => onSelectTab('collection')}
            data-cursor="link"
            className="hover:text-[#F2BD42] transition-colors nav-link-underline py-0.5 cursor-pointer"
          >
            Bộ sưu tập
          </button>
          <span className="text-white/30">·</span>
          <button
            type="button"
            onClick={() => onSelectTab('studio')}
            data-cursor="link"
            className="hover:text-[#F2BD42] transition-colors nav-link-underline py-0.5 cursor-pointer"
          >
            Phòng phối đồ
          </button>
        </nav>

        {/* Source citation badge */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onSelectTab('sources')}
            data-cursor="link"
            className="inline-flex items-center gap-1.5 text-xs text-[#E0A526] hover:text-[#F2BD42] transition-colors cursor-pointer"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Nội dung có trích dẫn nguồn, tra cứu tại đây</span>
          </button>
        </div>

        {/* Credits and Copyright */}
        <div className="pt-4 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-2">
          <span>Nhóm thực hiện: Hellosine & KhoaSP</span>
          <span>© 2026 Bách Y Ký · Chuẩn mực thẩm mỹ bảo tàng cổ phục</span>
        </div>
      </div>
    </footer>
  );
};
