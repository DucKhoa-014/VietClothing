/**
 * Thanh điều hướng bảo tàng đương đại (Navbar):
 * - Logo VP bên trái, các liên kết chữ thanh lịch
 * - Chuyển đổi giao diện Sáng / Tối tinh tế
 * - Tự động ẩn khi cuộn xuống và hiện lại khi cuộn lên
 * - Menu di động hỗ trợ bàn phím, không che khuất hay tràn màn hình
 */
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useMagnetic } from '../hooks/useMagnetic';

interface Props {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDark: boolean;
  onToggleDark: (e?: React.MouseEvent) => void;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  isDark,
  onToggleDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { direction, isAtTop } = useScrollDirection();
  const themeBtnRef = useMagnetic<HTMLButtonElement>({ radius: 60, maxDistance: 8 });

  // Danh mục điều hướng chuẩn xác
  const navLinks = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'collection', label: 'Bộ sưu tập' },
    { id: 'occasions', label: 'Dịp mặc' },
    { id: 'studio', label: 'Phối đồ' },
    { id: 'colors', label: 'Bảng màu' },
    { id: 'sources', label: 'Nguồn tư liệu' },
    { id: 'about', label: 'Giới thiệu' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  // Đóng mobile menu khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isHidden = !isAtTop && direction === 'down' && !mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-nen/90 dark:bg-nen/90 backdrop-blur-md text-chu border-b border-vien transition-all duration-300 ease-[var(--ease-lua)] ${
          isHidden
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        } ${isAtTop ? 'h-16 py-3' : 'h-14 py-2'}`}
        style={{
          transform: isHidden ? 'translateY(calc(-100% - 20px))' : 'translateY(0px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo nhận diện */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            aria-label="Về trang chủ Bách Y Ký"
            className="flex items-center gap-2.5 text-left cursor-pointer group py-1 outline-none focus-visible:ring-2 focus-visible:ring-nghe rounded"
          >
            <img
              src="/logo.png"
              alt="Bách Y Ký"
              className="h-9 sm:h-10 w-auto max-w-[44px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif-vi font-bold text-base sm:text-lg text-chu tracking-wide leading-none">
                Bách Y Ký
              </span>
              <span className="text-[10px] text-chu-phu tracking-widest uppercase mt-0.5 hidden sm:inline">
                Cổ phục đương đại
              </span>
            </div>
          </button>

          {/* Các liên kết điều hướng desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Thanh điều hướng chính">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 font-serif-vi text-sm tracking-wide transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-nghe rounded ${
                    isActive
                      ? 'text-son font-bold'
                      : 'text-chu-phu hover:text-son nav-link-underline font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-son"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Nút hành động phải: Chế độ sáng tối & Menu mobile */}
          <div className="flex items-center gap-2.5">
            <button
              ref={themeBtnRef}
              type="button"
              onClick={onToggleDark}
              aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-chu-phu hover:text-son border border-vien hover:border-nghe transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-nghe"
            >
              {isDark ? <Sun className="w-4 h-4 text-nghe" /> : <Moon className="w-4 h-4 text-chu" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng danh mục' : 'Mở danh mục'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-chu hover:text-son border border-vien cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-nghe"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu di động */}
        {mobileMenuOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Danh mục trang web"
            className="fixed inset-0 top-14 z-50 bg-nen/98 backdrop-blur-xl flex flex-col justify-between px-6 py-8 animate-fadeIn overflow-y-auto"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-son block">
                Không Gian Trưng Bày
              </span>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`block w-full text-left font-serif-vi text-2xl py-1.5 transition-colors cursor-pointer ${
                      currentTab === link.id
                        ? 'text-son font-bold pl-3 border-l-2 border-son'
                        : 'text-chu hover:text-son'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-vien text-xs text-chu-phu flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Bách Y Ký" className="h-5 w-auto object-contain" />
                <span>Bách Y Ký · Bảo Tàng Cổ Phục</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-son font-medium underline"
              >
                Đóng menu
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
