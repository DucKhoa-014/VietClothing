import React from 'react';
import {
  CheckCircle2,
  BookOpen,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Sliders,
  Check
} from 'lucide-react';

interface Props {
  trangThai: string;
  className?: string;
  compact?: boolean;
}

export const NhanKiemChung: React.FC<Props> = ({ trangThai, className = '', compact = false }) => {
  let bg = 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700';
  let icon = <HelpCircle className="w-3 h-3" />;

  switch (trangThai) {
    case 'Đã có nguồn':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      icon = <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
      break;
    case 'Đã có nguồn một phần':
      bg = 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800';
      icon = <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" />;
      break;
    case 'Có tranh luận học thuật':
      bg = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      icon = <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
      break;
    case 'Giải thích phổ biến':
      bg = 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
      icon = <MessageCircle className="w-3 h-3 text-sky-600 dark:text-sky-400" />;
      break;
    case 'Cần kiểm chứng':
      bg = 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800';
      icon = <AlertCircle className="w-3 h-3 text-orange-600 dark:text-orange-400" />;
      break;
    case 'Gợi ý thẩm mỹ':
      bg = 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      icon = <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />;
      break;
    case 'Quy tắc thiết kế của app':
      bg = 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
      icon = <Sliders className="w-3 h-3 text-rose-600 dark:text-rose-400" />;
      break;
    case 'Không tìm thấy nguồn':
      bg = 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700';
      icon = <HelpCircle className="w-3 h-3 text-stone-500" />;
      break;
  }

  return (
    <span
      title={`Nhãn kiểm chứng: ${trangThai}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border transition-colors ${bg} ${className}`}
    >
      {icon}
      <span>{trangThai}</span>
    </span>
  );
};
