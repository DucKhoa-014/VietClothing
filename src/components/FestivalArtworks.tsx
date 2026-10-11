import React from 'react';

/**
 * High-fidelity festive scene illustration backdrops for Vietnamese cultural occasions
 */

// 1. Lễ Hội Tết Nguyên Đán (Spring Tet Festival: Peach blossoms, red lanterns, temple eaves, golden sunlight)
export const TetFestivalBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-35 dark:opacity-25">
      <defs>
        <linearGradient id="tet-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3E0" />
          <stop offset="50%" stopColor="#FFE0B2" />
          <stop offset="100%" stopColor="#FFCCBC" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="80%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Warm Sky & Spring Sun Glow */}
      <rect width="100%" height="100%" fill="url(#tet-sky)" />
      <circle cx="960" cy="180" r="280" fill="url(#sun-glow)" />

      {/* Distant Ancient Temple Pavilion & Roof Tiles */}
      <path
        d="M650 380 Q780 340 920 380 L960 410 L610 410 Z"
        fill="#8D6E63"
        opacity="0.45"
      />
      <path
        d="M600 410 Q780 370 970 410 L990 440 L580 440 Z"
        fill="#6D4C41"
        opacity="0.55"
      />
      {/* Curved Temple Eaves */}
      <path
        d="M550 435 Q500 420 460 380 Q490 410 560 435 Z"
        fill="#B8322A"
        opacity="0.8"
      />
      <path
        d="M1000 435 Q1050 420 1090 380 Q1060 410 990 435 Z"
        fill="#B8322A"
        opacity="0.8"
      />

      {/* Peach Blossom Branch (Cành Đào Phai) curving from top right */}
      <path
        d="M1250 -40 Q1050 80 880 30 Q780 0 680 90"
        fill="none"
        stroke="#4E342E"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M980 45 Q900 120 830 110"
        fill="none"
        stroke="#5D4037"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M890 30 Q840 70 760 50"
        fill="none"
        stroke="#5D4037"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Blossoming Pink Peach Flowers */}
      {[
        [1080, 50, 16], [980, 40, 18], [910, 80, 15], [840, 30, 20], [790, 60, 14],
        [740, 40, 17], [680, 90, 16], [830, 110, 15], [760, 50, 13], [1020, 90, 14],
        [1140, 20, 16], [880, 25, 15]
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#F48FB1" opacity="0.9" />
          <circle cx={cx} cy={cy} r={r * 0.55} fill="#D81B60" opacity="0.9" />
          <circle cx={cx} cy={cy} r={r * 0.2} fill="#FFD54F" />
        </g>
      ))}

      {/* Red Festive Silk Lanterns with Yellow Tassels */}
      {[
        [280, 120, 36, 50],
        [420, 160, 28, 40],
        [160, 180, 32, 45],
        [1100, 180, 34, 48]
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          {/* String */}
          <line x1={x} y1={0} x2={x} y2={y} stroke="#D32F2F" strokeWidth="2" />
          {/* Lantern Body */}
          <ellipse cx={x} cy={y + h / 2} rx={w} ry={h / 2} fill="#C62828" />
          <ellipse cx={x} cy={y + h / 2} rx={w * 0.65} ry={h / 2} fill="#E53935" />
          <ellipse cx={x} cy={y + h / 2} rx={w * 0.3} ry={h / 2} fill="#FFCDD2" opacity="0.6" />
          {/* Golden Caps & Tassel */}
          <rect x={x - w * 0.4} y={y - 4} width={w * 0.8} height="6" rx="2" fill="#FFC107" />
          <rect x={x - w * 0.4} y={y + h - 2} width={w * 0.8} height="6" rx="2" fill="#FFC107" />
          <line x1={x} y1={y + h + 4} x2={x} y2={y + h + 38} stroke="#FFB300" strokeWidth="3" />
        </g>
      ))}

      {/* Gentle Floating Golden Bokeh */}
      {[
        [300, 260, 6], [480, 320, 8], [620, 200, 5], [780, 280, 9],
        [940, 240, 7], [150, 380, 8], [1050, 360, 6], [860, 150, 7]
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#FFE082" opacity="0.65" />
      ))}
    </svg>
  </div>
);

// 2. Lễ Hội Quan Họ & Làng Quê Bắc Bộ (Lotus pond, dragon boat silhouette, nón quai thao, banyan tree)
export const QuanHoFestivalBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30 dark:opacity-20">
      <defs>
        <linearGradient id="quanho-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8E6C9" />
          <stop offset="60%" stopColor="#A5D6A7" />
          <stop offset="100%" stopColor="#81C784" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#quanho-water)" />

      {/* River Mist / Mountain Silhouettes */}
      <path d="M0 240 Q250 160 500 230 Q750 170 1000 220 L1000 500 L0 500 Z" fill="#66BB6A" opacity="0.3" />

      {/* Traditional Wooden Boat Silhouette */}
      <g transform="translate(180, 280)">
        <path d="M0 30 Q120 60 240 30 Q220 5 180 5 L60 5 Z" fill="#3E2723" opacity="0.75" />
        <line x1="120" y1="5" x2="120" y2="-45" stroke="#4E342E" strokeWidth="2.5" />
        {/* Nón Quai Thao Silhouette */}
        <ellipse cx="140" cy="-10" rx="35" ry="9" fill="#D7CCC8" opacity="0.9" />
        <ellipse cx="90" cy="-8" rx="32" ry="8" fill="#D7CCC8" opacity="0.9" />
      </g>

      {/* Lotus Flowers & Lotus Leaves (Hoa Sen & Lá Sen) */}
      {[
        [80, 420, 45], [260, 440, 50], [520, 410, 55], [780, 430, 48], [920, 400, 42]
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.45} fill="#2E7D32" opacity="0.7" />
          <ellipse cx={cx + 25} cy={cy - 20} rx={14} ry={20} fill="#F48FB1" opacity="0.85" />
          <ellipse cx={cx + 25} cy={cy - 20} rx={8} ry={12} fill="#EC407A" opacity="0.95" />
        </g>
      ))}

      {/* Traditional Village Flags (Cờ Hội Ngũ Sắc) */}
      {[
        [800, 160], [860, 140], [920, 150]
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x} y2={y + 110} stroke="#5D4037" strokeWidth="2.5" />
          <polygon points={`${x},${y} ${x + 40},${y + 18} ${x},${y + 36}`} fill="#E53935" />
          <polygon points={`${x},${y + 6} ${x + 30},${y + 18} ${x},${y + 30}`} fill="#FFEB3B" />
        </g>
      ))}
    </svg>
  </div>
);

// 3. Lễ Hội Cố Đô Huế (Imperial Citadel Ngọ Môn gate, royal purple & gold banners, stone balustrades)
export const HueImperialBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30 dark:opacity-20">
      <defs>
        <linearGradient id="hue-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EDE7F6" />
          <stop offset="60%" stopColor="#D1C4E9" />
          <stop offset="100%" stopColor="#B39DDB" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#hue-sky)" />

      {/* Ngọ Môn Gate Massive Stone Wall */}
      <rect x="0" y="320" width="1000" height="180" fill="#4E342E" opacity="0.6" />
      {/* 3 Arched Gates */}
      <path d="M420 500 L420 400 Q500 340 580 400 L580 500 Z" fill="#2E1C14" />
      <path d="M260 500 L260 420 Q320 370 380 420 L380 500 Z" fill="#2E1C14" />
      <path d="M620 500 L620 420 Q680 370 740 420 L740 500 Z" fill="#2E1C14" />

      {/* Upper Royal Pavilion (Lầu Ngũ Phụng) Roofs */}
      <path d="M340 320 Q500 250 660 320 L680 340 L320 340 Z" fill="#FFB300" opacity="0.8" />
      <path d="M380 260 Q500 200 620 260 L640 280 L360 280 Z" fill="#FFA000" opacity="0.85" />
      <path d="M440 200 Q500 160 560 200 L570 215 L430 215 Z" fill="#FF8F00" opacity="0.9" />

      {/* Royal Silk Streamers & Flag (Cờ Phướn Cung Đình) */}
      <g transform="translate(140, 180)">
        <line x1="0" y1="0" x2="0" y2="180" stroke="#3E2723" strokeWidth="4" />
        <rect x="4" y="10" width="36" height="110" fill="#5E3F73" opacity="0.9" />
        <rect x="12" y="20" width="20" height="90" fill="#FFC107" opacity="0.9" />
      </g>
      <g transform="translate(860, 180)">
        <line x1="0" y1="0" x2="0" y2="180" stroke="#3E2723" strokeWidth="4" />
        <rect x="-40" y="10" width="36" height="110" fill="#5E3F73" opacity="0.9" />
        <rect x="-32" y="20" width="20" height="90" fill="#FFC107" opacity="0.9" />
      </g>
    </svg>
  </div>
);

// 4. Phố Cổ Hội An & Đêm Đèn Lồng (Yellow ancient houses, glowing silk lanterns, river reflection)
export const HoiAnLanternBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30 dark:opacity-25">
      <defs>
        <linearGradient id="hoian-dusk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A237E" />
          <stop offset="50%" stopColor="#283593" />
          <stop offset="100%" stopColor="#3949AB" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#hoian-dusk)" opacity="0.4" />

      {/* Ancient Shophouse Terracotta Roofs */}
      <path d="M0 340 L160 260 L320 340 L480 270 L640 340 L820 280 L1000 350 L1000 500 L0 500 Z" fill="#FBC02D" opacity="0.45" />

      {/* String of Festive Multi-color Silk Lanterns */}
      <path d="M50 160 Q260 230 480 170 Q700 240 950 160" fill="none" stroke="#212121" strokeWidth="2" />

      {[
        [140, 190, '#E53935'], [260, 215, '#FB8C00'], [380, 200, '#00897B'],
        [500, 185, '#D81B60'], [620, 215, '#FDD835'], [740, 205, '#3949AB'],
        [860, 180, '#E53935']
      ].map(([x, y, color], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="22" fill={color as string} />
          <ellipse cx={x as number} cy={y as number} rx="12" ry="22" fill="#FFFFFF" opacity="0.25" />
          <line x1={x as number} y1={(y as number) + 22} x2={x as number} y2={(y as number) + 48} stroke="#FFD54F" strokeWidth="2.5" />
          {/* Glow halo */}
          <circle cx={x as number} cy={y as number} r="38" fill={color as string} opacity="0.2" />
        </g>
      ))}
    </svg>
  </div>
);

// 5. Trống Đồng Đông Sơn & Hoa Sen Triết Lý (Ancient bronze drum medallion, golden heritage watermark)
export const TrongDongBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 800 800" className="w-full h-full opacity-10 dark:opacity-10 text-[#B8322A] dark:text-[#E0A526]" fill="none" stroke="currentColor">
      {/* Central Radiant Sun (Mặt Trời 14 Tia) */}
      <circle cx="400" cy="400" r="380" strokeWidth="2.5" />
      <circle cx="400" cy="400" r="340" strokeWidth="1.5" strokeDasharray="6,4" />
      <circle cx="400" cy="400" r="280" strokeWidth="2" />
      <circle cx="400" cy="400" r="220" strokeWidth="1.5" strokeDasharray="4,4" />
      <circle cx="400" cy="400" r="160" strokeWidth="2" />
      <circle cx="400" cy="400" r="90" strokeWidth="2" />

      {/* Sun rays */}
      {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map((angle, i) => (
        <line
          key={i}
          x1="400"
          y1="400"
          x2={400 + 85 * Math.cos((angle * Math.PI) / 180)}
          y2={400 + 85 * Math.sin((angle * Math.PI) / 180)}
          strokeWidth="3"
        />
      ))}

      {/* Flying Lac Birds ring (Vành chim Lạc bay ngược chiều kim đồng hồ) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const bx = 400 + 250 * Math.cos(rad);
        const by = 400 + 250 * Math.sin(rad);
        return (
          <g key={i} transform={`translate(${bx}, ${by}) rotate(${angle + 90})`}>
            <path d="M-20 0 Q0 -25 25 0 Q10 -5 -20 0 Z" fill="currentColor" opacity="0.6" />
          </g>
        );
      })}
    </svg>
  </div>
);

// Miniature occasion card headers for the 10 occasions
export const OccasionMiniThumbnail: React.FC<{ occasionId: string; className?: string }> = ({ occasionId, className = '' }) => {
  switch (occasionId) {
    case 'tet':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-red-600/80 to-amber-500/80 flex items-center justify-center ${className}`}>
          <TetFestivalBackdrop className="opacity-70 scale-125" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🌸 Tết Nguyên Đán</span>
          </div>
        </div>
      );
    case 'tot_nghiep':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-sky-600/80 to-indigo-600/80 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-2xs" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🎓 Kỷ Yếu & Tốt Nghiệp</span>
          </div>
        </div>
      );
    case 'quan_ho':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-600/80 to-teal-700/80 flex items-center justify-center ${className}`}>
          <QuanHoFestivalBackdrop className="opacity-70 scale-125" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🎋 Hội Lim & Đình Làng</span>
          </div>
        </div>
      );
    case 'hue':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-purple-800/80 to-amber-600/80 flex items-center justify-center ${className}`}>
          <HueImperialBackdrop className="opacity-70 scale-125" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🏛️ Đại Nội & Festival Huế</span>
          </div>
        </div>
      );
    case 'tay_nam_bo':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-amber-700/80 to-lime-800/80 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-amber-900/30" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🛶 Miền Tây Sông Nước</span>
          </div>
        </div>
      );
    case 'dam_cuoi':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-rose-600/80 to-red-700/80 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-red-950/20" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🏮 Hỷ Sự & Đám Cưới</span>
          </div>
        </div>
      );
    case 'di_chua':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-amber-800/80 to-stone-800/80 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-stone-900/30" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🪷 Đi Chùa Đầu Năm</span>
          </div>
        </div>
      );
    case 'gio_to':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-red-800/80 to-yellow-700/80 flex items-center justify-center ${className}`}>
          <TrongDongBackdrop className="opacity-40" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>👑 Giỗ Tổ Hùng Vương</span>
          </div>
        </div>
      );
    case 'dao_pho':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-600/80 to-orange-700/80 flex items-center justify-center ${className}`}>
          <HoiAnLanternBackdrop className="opacity-70 scale-125" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🏮 Dạo Phố Cổ Hội An</span>
          </div>
        </div>
      );
    case 'quoc_te':
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-gradient-to-r from-blue-900/80 to-red-800/80 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-blue-950/30" />
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs tracking-wider flex items-center gap-1.5 drop-shadow-sm">
            <span>🌏 Giao Lưu Quốc Tế</span>
          </div>
        </div>
      );
    default:
      return (
        <div className={`relative w-full h-20 rounded-xl overflow-hidden bg-[#B8322A]/80 flex items-center justify-center ${className}`}>
          <div className="relative z-10 text-white font-serif-vi font-bold text-xs">
            <span>Lễ Hội Cổ Truyền</span>
          </div>
        </div>
      );
  }
};
