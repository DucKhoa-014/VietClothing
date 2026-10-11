import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { BoSuuTapSection } from './components/BoSuuTapSection';
import { DipMacSection } from './components/DipMacSection';
import { PhoiDoStudio } from './components/PhoiDoStudio';
import { BangMauGrid } from './components/BangMauGrid';
import { NguonTable } from './components/NguonTable';
import { GioiThieuSection } from './components/GioiThieuSection';
import { ChiTietTrangPhucModal } from './components/ChiTietTrangPhucModal';
import { ChiTietBoiCanhModal } from './components/ChiTietBoiCanhModal';
import { CustomCursor } from './components/effects/CustomCursor';
import { ScrollLight } from './components/effects/ScrollLight';
import { GrainOverlay } from './components/effects/GrainOverlay';
import { ChuyenCanhGatTron } from './components/effects/ChuyenCanhGatTron';
import { useScrollCssVars } from './hooks/useScrollCssVars';
import { TrangPhuc, BoiCanh } from './types';
import { getTrangPhucById, getBoiCanhById } from './data/vietPhucData';

export function App() {
  // Update CSS scroll variables globally via passive rAF
  useScrollCssVars();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [tabSweepActive, setTabSweepActive] = useState<boolean>(false);

  // Preselected Studio parameters
  const [studioCostumeId, setStudioCostumeId] = useState<string | undefined>(undefined);
  const [studioOccasionId, setStudioOccasionId] = useState<string | undefined>(undefined);

  // Modals
  const [detailCostume, setDetailCostume] = useState<TrangPhuc | null>(null);
  const [detailOccasion, setDetailOccasion] = useState<BoiCanh | null>(null);

  // Dark Mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vietphuc-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('vietphuc-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('vietphuc-theme', 'light');
    }
  }, [isDark]);

  // Toggle Dark Mode with View Transitions API (circular ripple)
  const handleToggleDark = (event?: React.MouseEvent) => {
    const nextDark = !isDark;
    const doc = document as any;
    if (
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDark(nextDark);
      return;
    }

    const x = event ? event.clientX : window.innerWidth / 2;
    const y = event ? event.clientY : 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setIsDark(nextDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  // Handle URL hash changes & query params on mount
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('nguon-')) {
        setCurrentTab('sources');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (['home', 'collection', 'occasions', 'studio', 'colors', 'sources', 'about'].includes(hash)) {
        setCurrentTab(hash);
      }
    };

    // Check query params for studio
    const urlParams = new URLSearchParams(window.location.search);
    const dip = urlParams.get('dip');
    const ao = urlParams.get('ao');
    if (dip || ao) {
      if (dip) setStudioOccasionId(dip);
      if (ao) setStudioCostumeId(ao);
      setCurrentTab('studio');
    }

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Circular Wipe Transition State
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  const startTabTransition = (targetTab: string) => {
    if (targetTab === currentTab && !isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (isTransitioning) return;
    setPendingTab(targetTab);
    setIsTransitioning(true);
  };

  const handleTabSelect = (tab: string) => {
    startTabTransition(tab);
  };

  const handleQuickRemixCostume = (tp: TrangPhuc) => {
    setStudioCostumeId(tp.id);
    startTabTransition('studio');
  };

  const handleQuickRemixOccasion = (bc: BoiCanh) => {
    setStudioOccasionId(bc.id);
    startTabTransition('studio');
  };

  const handleSelectSource = (maNguon: string) => {
    startTabTransition('sources');
    setTimeout(() => {
      const el = document.getElementById(`nguon-${maNguon}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('bg-[#E0A526]/20');
        setTimeout(() => el.classList.remove('bg-[#E0A526]/20'), 2000);
      }
    }, 550);
  };

  const handleTransitionMidpoint = () => {
    if (pendingTab) {
      setCurrentTab(pendingTab);
      window.location.hash = pendingTab;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    setPendingTab(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-nen text-chu transition-colors relative selection:bg-nghe/30 selection:text-son">
      {/* Nền giấy dó tĩnh & vignette */}
      <GrainOverlay />

      {/* Thanh tiến độ cuộn 2px đỉnh màn hình */}
      <ScrollLight />

      {/* Con trỏ bảo tàng 28px */}
      <CustomCursor />

      {/* Hiệu ứng chuyển cảnh Gạt tròn từ giữa trang ra ngoài rìa trang (Bách Y Ký) */}
      <ChuyenCanhGatTron
        isActive={isTransitioning}
        onMidpointReached={handleTransitionMidpoint}
        onAnimationEnd={handleTransitionEnd}
        logoSrc="/logo_title.png"
      />

      {/* Top Minimalist Museum Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabSelect}
        isDark={isDark}
        onToggleDark={handleToggleDark}
      />

      {/* Main Content Sections with subtle fade transition */}
      <main className="relative z-10 flex-1 transition-opacity duration-300">
        {currentTab === 'home' && (
          <HomeSection
            onSelectTab={handleTabSelect}
            onSelectTrangPhuc={(tp) => setDetailCostume(tp)}
            onSelectBoiCanh={(bc) => setDetailOccasion(bc)}
            onQuickRemix={handleQuickRemixCostume}
          />
        )}

        {currentTab === 'collection' && (
          <BoSuuTapSection
            onSelectTrangPhuc={(tp) => setDetailCostume(tp)}
            onQuickRemix={handleQuickRemixCostume}
          />
        )}

        {currentTab === 'occasions' && (
          <DipMacSection
            onSelectBoiCanh={(bc) => setDetailOccasion(bc)}
            onQuickRemix={handleQuickRemixOccasion}
          />
        )}

        {currentTab === 'studio' && (
          <PhoiDoStudio
            initialBoiCanhId={studioOccasionId}
            initialTrangPhucId={studioCostumeId}
            onSelectSource={handleSelectSource}
          />
        )}

        {currentTab === 'colors' && <BangMauGrid />}

        {currentTab === 'sources' && <NguonTable />}

        {currentTab === 'about' && <GioiThieuSection />}
      </main>

      {/* Costume Detail Modal */}
      {detailCostume && (
        <ChiTietTrangPhucModal
          trangPhuc={detailCostume}
          onClose={() => setDetailCostume(null)}
          onGoToStudio={handleQuickRemixCostume}
          onSelectSource={handleSelectSource}
        />
      )}

      {/* Occasion Detail Modal */}
      {detailOccasion && (
        <ChiTietBoiCanhModal
          boiCanh={detailOccasion}
          onClose={() => setDetailOccasion(null)}
          onGoToStudio={handleQuickRemixOccasion}
        />
      )}

      {/* Footer */}
      <Footer onSelectTab={handleTabSelect} />
    </div>
  );
}

export default App;
