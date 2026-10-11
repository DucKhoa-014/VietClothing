import React from 'react';
import { getAllBoiCanh } from '../data/vietPhucData';
import { BoiCanh } from '../types';
import { TheBoiCanh } from './TheBoiCanh';
import { PageHeader } from './ui/PageHeader';
import { Reveal } from './effects/Reveal';

interface Props {
  onSelectBoiCanh: (bc: BoiCanh) => void;
  onQuickRemix: (bc: BoiCanh) => void;
}

export const DipMacSection: React.FC<Props> = ({ onSelectBoiCanh, onQuickRemix }) => {
  const occasions = getAllBoiCanh();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <PageHeader
        soThuTu="Bối Cảnh Đời Thực"
        tieuDe="Mặc Việt Phục Dịp Nào?"
        moTa="Gợi ý trang phục và màu sắc phù hợp cho từng nghi lễ, ngày hội và đời sống đương đại."
      />

      {/* Grid of Occasions with Staggered Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((bc, idx) => (
          <Reveal key={bc.id} delayMs={idx * 80}>
            <TheBoiCanh
              boiCanh={bc}
              onSelect={onSelectBoiCanh}
              onQuickRemix={onQuickRemix}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
};
