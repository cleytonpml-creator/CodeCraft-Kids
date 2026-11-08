/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  Lock, 
  Check, 
  Star, 
  Volume2, 
  VolumeX, 
  Compass, 
  HelpCircle, 
  Sparkles,
  RotateCcw,
  Flame,
  Gem,
  BookOpen,
  Trophy,
  X,
  ArrowRight,
  GraduationCap,
  Award,
  Crown,
  Terminal,
  Footprints
} from 'lucide-react';
import { PhaseModel, UnitModel, ChestModel } from '../types/game';
import { UNITS } from '../utils/levels';
import { soundManager } from '../utils/audio';
import { GuidebookModal } from './GuidebookModal';
import { ChestModal } from './ChestModal';
import { AstroBotWalker } from './AstroBotWalker';
import { 
  Locale, 
  UI_TRANSLATIONS, 
  getLocalizedPhase, 
  getLocalizedUnit, 
  EN_CHEST_TRANSLATIONS 
} from '../utils/i18n';

interface CosmicMapScreenProps {
  phases: PhaseModel[];
  chests: ChestModel[];
  gems: number;
  streak: number;
  studentName: string;
  studentBadge?: string;
  locale?: Locale;
  onChangeLocale?: (newLocale: Locale) => void;
  onOpenProfileModal?: () => void;
  onSelectPhase: (phaseId: number) => void;
  onOpenChest: (chestId: string, rewardGems: number) => void;
  onOpenSandbox: () => void;
  onOpenGuide: () => void;
  onOpenAcademy: () => void;
  onOpenCertificate: (unit: UnitModel) => void;
  onResetProgress: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  walkingTransition?: { fromPhaseId: number; toPhaseId: number } | null;
  onClearWalkingTransition?: () => void;
}

export const CosmicMapScreen: React.FC<CosmicMapScreenProps> = ({
  phases,
  chests,
  gems,
  streak,
  studentName,
  studentBadge = '🚀',
  locale = 'en-GB',
  onChangeLocale,
  onOpenProfileModal,
  onSelectPhase,
  onOpenChest,
  onOpenSandbox,
  onOpenGuide,
  onOpenAcademy,
  onOpenCertificate,
  onResetProgress,
  isMuted,
  onToggleMute,
  walkingTransition,
  onClearWalkingTransition
}) => {
  const t = UI_TRANSLATIONS[locale];
  const trailContainerRef = React.useRef<HTMLDivElement>(null);


  // Active walking transition state
  const [activeWalkingTransition, setActiveWalkingTransition] = useState<{ fromPhaseId: number; toPhaseId: number } | null>(
    walkingTransition || null
  );

  React.useEffect(() => {
    if (walkingTransition) {
      setActiveWalkingTransition(walkingTransition);
    }
  }, [walkingTransition]);

  // Active modal states
  const [selectedUnitForGuide, setSelectedUnitForGuide] = useState<UnitModel | null>(null);
  const [selectedChest, setSelectedChest] = useState<ChestModel | null>(null);
  const [selectedPhaseForPopover, setSelectedPhaseForPopover] = useState<PhaseModel | null>(null);
  const [showTrophyModal, setShowTrophyModal] = useState<boolean>(false);
  const [showCertificatesMenu, setShowCertificatesMenu] = useState<boolean>(false);

  // Global progress calculations
  const completedPhasesCount = phases.filter(p => p.status === 'completed').length;
  const energyPercentage = Math.round((completedPhasesCount / phases.length) * 100);
  const totalStars = phases.reduce((acc, p) => acc + p.stars, 0);
  const maxPossibleStars = phases.length * 3;

  // Helper to open level popover
  const handleNodeClick = (phase: PhaseModel) => {
    if (phase.status === 'locked') {
      soundManager.playFail();
      return;
    }
    soundManager.playClick();
    setSelectedPhaseForPopover(phase);
  };

  // Helper to open chest
  const handleChestClick = (chest: ChestModel) => {
    const reqPhase = phases.find(p => p.id === chest.requiredPhaseIdToUnlock);
    const isUnlocked = reqPhase && reqPhase.status === 'completed';

    if (!isUnlocked) {
      soundManager.playFail();
      return;
    }

    soundManager.playClick();
    setSelectedChest(chest);
  };

  const getUnitThemeStyles = (theme: UnitModel['colorTheme']) => {
    switch (theme) {
      case 'emerald':
        return {
          banner: 'bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-[#0A2623] border-emerald-500/50 shadow-emerald-950/50',
          accent: 'text-emerald-400',
          button: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-300 shadow-emerald-500/30'
        };
      case 'cyan':
        return {
          banner: 'bg-gradient-to-r from-cyan-950/90 via-sky-950/90 to-[#071F29] border-cyan-500/50 shadow-cyan-950/50',
          accent: 'text-cyan-400',
          button: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-300 shadow-cyan-500/30'
        };
      case 'indigo':
        return {
          banner: 'bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-[#120B30] border-indigo-500/50 shadow-indigo-950/50',
          accent: 'text-indigo-400',
          button: 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400 shadow-indigo-600/30'
        };
      case 'fuchsia':
        return {
          banner: 'bg-gradient-to-r from-fuchsia-950/90 via-pink-950/90 to-[#260B24] border-fuchsia-500/50 shadow-fuchsia-950/50',
          accent: 'text-fuchsia-400',
          button: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-fuchsia-400 shadow-fuchsia-600/30'
        };
      case 'amber':
        return {
          banner: 'bg-gradient-to-r from-amber-950/90 via-yellow-950/90 to-[#2E1805] border-amber-500/50 shadow-amber-950/50',
          accent: 'text-amber-400',
          button: 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/30'
        };
      case 'teal':
        return {
          banner: 'bg-gradient-to-r from-teal-950/90 via-emerald-950/90 to-[#052622] border-teal-500/50 shadow-teal-950/50',
          accent: 'text-[#00F5D4]',
          button: 'bg-[#00F5D4] hover:bg-teal-300 text-slate-950 border-teal-200 shadow-teal-500/30'
        };
      case 'violet':
        return {
          banner: 'bg-gradient-to-r from-violet-950/90 via-purple-950/90 to-[#1F0A38] border-violet-500/50 shadow-violet-950/50',
          accent: 'text-violet-400',
          button: 'bg-violet-600 hover:bg-violet-500 text-white border-violet-400 shadow-violet-600/30'
        };
      case 'rose':
        return {
          banner: 'bg-gradient-to-r from-rose-950/90 via-pink-950/90 to-[#2E0B20] border-rose-500/50 shadow-rose-950/50',
          accent: 'text-rose-400',
          button: 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400 shadow-rose-600/30'
        };
      case 'sky':
        return {
          banner: 'bg-gradient-to-r from-sky-950/90 via-blue-950/90 to-[#0A1A33] border-sky-500/50 shadow-sky-950/50',
          accent: 'text-sky-400',
          button: 'bg-sky-500 hover:bg-sky-400 text-slate-950 border-sky-300 shadow-sky-500/30'
        };
      case 'gold':
        return {
          banner: 'bg-gradient-to-r from-amber-950/90 via-yellow-950/90 to-[#332005] border-yellow-400/70 shadow-amber-950/50',
          accent: 'text-yellow-300',
          button: 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black border-yellow-200 shadow-amber-500/40'
        };
      default:
        return {
          banner: 'bg-slate-900 border-slate-700',
          accent: 'text-teal-400',
          button: 'bg-teal-500 text-slate-950 border-teal-300'
        };
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080518] text-white flex flex-col items-center overflow-x-hidden selection:bg-[#00F5D4] selection:text-black">
      {/* Background Deep Cosmic Circuit Grid */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none bg-repeat z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(0, 245, 212, 0.25) 2px, transparent 0)`,
          backgroundSize: '45px 45px'
        }}
      />

      {/* TOP DUOLINGO-STYLE GAMIFICATION STATUS BAR */}
      <header className="sticky top-0 z-40 w-full max-w-5xl px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-md bg-[#0F0A26]/90 border-b border-[#00F5D4]/20 flex items-center justify-between gap-2 shadow-xl transition-all">
        {/* Brand Wordmark & Cadet Profile Chip */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-[#00F5D4] flex items-center justify-center shadow-lg shadow-teal-500/30 border border-white/20 shrink-0">
            <span className="text-lg sm:text-xl">{studentBadge}</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-cyan-200 to-[#00F5D4] bg-clip-text text-transparent font-['Outfit'] leading-none">
              CodeCraft Kids
            </h1>
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
              {locale === 'en-GB' ? '40 Stages · Blocks to Pure Code' : '40 Fases · Blocos ao Código'}
            </span>
          </div>

          {/* CADET NAME CHIP / EDIT BUTTON */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (onOpenProfileModal) onOpenProfileModal();
            }}
            title={t.profile}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/90 to-purple-900/90 hover:from-indigo-800 hover:to-purple-800 border border-indigo-400/50 text-white font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 ml-1"
          >
            <span className="text-xs">{studentBadge}</span>
            <span className="font-black truncate max-w-[100px] text-cyan-200">
              {studentName}
            </span>
          </button>
        </div>

        {/* Gamification Counters */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Streak */}
          <div 
            title={t.streak}
            className="flex items-center gap-1 bg-orange-500/15 border border-orange-500/40 px-2 sm:px-2.5 py-1 rounded-xl text-orange-400 text-xs font-black shadow-inner"
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400 animate-pulse" />
            <span className="tabular-nums font-mono">{streak}d</span>
          </div>

          {/* Cosmic Gems */}
          <div 
            title={t.crystals}
            className="flex items-center gap-1 bg-cyan-500/15 border border-cyan-400/40 px-2 sm:px-2.5 py-1 rounded-xl text-cyan-300 text-xs font-black shadow-inner"
          >
            <Gem className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span className="tabular-nums font-mono">{gems}</span>
          </div>

          {/* Planet Energy */}
          <div 
            title={t.energy}
            className="flex items-center gap-1 bg-[#00F5D4]/15 border border-[#00F5D4]/40 px-2 sm:px-2.5 py-1 rounded-xl text-[#00F5D4] text-xs font-black shadow-inner"
          >
            <Zap className="w-3.5 h-3.5 fill-[#00F5D4] text-[#00F5D4] animate-pulse" />
            <span className="tabular-nums font-mono">{energyPercentage}%</span>
          </div>

          {/* Stars */}
          <div 
            title={t.stars}
            className="hidden lg:flex items-center gap-1 bg-amber-500/15 border border-amber-400/40 px-2.5 py-1 rounded-xl text-amber-300 text-xs font-black shadow-inner"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums font-mono">{totalStars}/{maxPossibleStars}</span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* LANGUAGE TOGGLE: UK English vs Portuguese */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              if (onChangeLocale) {
                onChangeLocale(locale === 'en-GB' ? 'pt-BR' : 'en-GB');
              }
            }}
            title={t.switchLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-black transition-all cursor-pointer shadow-sm hover:border-[#00F5D4]/50"
          >
            <span className="text-sm">{locale === 'en-GB' ? '🇬🇧' : '🇧🇷'}</span>
            <span className="hidden md:inline text-[11px] font-mono text-slate-200">
              {locale === 'en-GB' ? 'UK' : 'PT'}
            </span>
          </button>

          {/* CERTIFICATES GALLERY BUTTON */}
          <button
            onClick={() => {
              soundManager.playClick();
              setShowCertificatesMenu(true);
            }}
            title={t.certificatesSubtitle}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs transition-colors border border-amber-400/40 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{t.certificates}</span>
          </button>

          {/* APRENDENDO COM ASTROBOT BUTTON */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAcademy();
            }}
            title="AstroBot Academy"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-black text-xs transition-all shadow-md shadow-purple-500/30 border border-white/20 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden md:inline">AstroBot</span>
          </button>

          {/* Sandbox Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSandbox();
            }}
            title={t.sandbox}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? t.soundOff : t.soundOn}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT TRAIL */}
      <main ref={trailContainerRef} className="relative z-10 flex-1 w-full max-w-xl flex flex-col items-center py-6 px-4">
        {/* WALKING MASCOT ANIMATION ALONG TRAIL */}
        {activeWalkingTransition && (
          <AstroBotWalker
            fromPhaseId={activeWalkingTransition.fromPhaseId}
            toPhaseId={activeWalkingTransition.toPhaseId}
            containerRef={trailContainerRef}
            onArrival={() => {
              const arrivedPhase = phases.find(p => p.id === activeWalkingTransition.toPhaseId);
              setActiveWalkingTransition(null);
              if (onClearWalkingTransition) onClearWalkingTransition();
              if (arrivedPhase) {
                setSelectedPhaseForPopover(arrivedPhase);
              }
            }}
          />
        )}

        {/* BANNER EM DESTAQUE: APRENDENDO COM O MASCOTE ASTROBOT */}
        <div className="w-full bg-gradient-to-r from-[#170E38]/95 via-[#231554]/95 to-[#170E38]/95 border-2 border-indigo-400/50 rounded-3xl p-4 sm:p-5 mb-8 shadow-xl shadow-indigo-950/60 flex items-center justify-between gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-[#00F5D4] bg-[#070512] shadow-lg shadow-teal-500/30">
            <img 
              src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
              alt="AstroBot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00F5D4] font-mono">
                {locale === 'en-GB' ? `Welcome, Cadet ${studentName}!` : `Bem-vindo, Cadete ${studentName}!`}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-white font-['Outfit'] mt-0.5">
              {locale === 'en-GB' ? 'Learn Coding with AstroBot!' : 'Aprendendo com nosso mascote AstroBot!'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {locale === 'en-GB'
                ? 'Follow the cosmic trail, listen to mission briefings, and earn accredited diplomas at the end of each module.'
                : 'Aulas interativas passo a passo com desafios práticos e certificado ao concluir cada módulo da trilha.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {completedPhasesCount > 0 && !activeWalkingTransition && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    const currentActive = phases.find(p => p.status === 'available') || phases[1];
                    const prevPhaseId = Math.max(1, currentActive.id - 1);
                    setActiveWalkingTransition({ fromPhaseId: prevPhaseId, toPhaseId: currentActive.id });
                  }}
                  title={locale === 'en-GB' ? 'Watch AstroBot walk along the trail' : 'Ver AstroBot caminhando pela trilha'}
                  className="text-[10px] text-teal-300 hover:text-white bg-teal-950/60 hover:bg-teal-900 border border-teal-500/40 px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer w-fit"
                >
                  <Footprints className="w-3 h-3 text-[#00F5D4]" />
                  <span>{locale === 'en-GB' ? 'Watch AstroBot Walk' : 'Ver AstroBot Caminhar'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  if (onOpenProfileModal) onOpenProfileModal();
                }}
                className="text-[10px] text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/40 px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer w-fit"
              >
                <span>{studentBadge}</span>
                <span>{locale === 'en-GB' ? 'Customise Cadet ID' : 'Personalizar Cadete'}</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAcademy();
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#00F5D4] to-teal-400 hover:from-teal-300 hover:to-teal-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-teal-500/30 shrink-0 cursor-pointer border border-teal-100 flex items-center gap-1.5"
          >
            <span>{locale === 'en-GB' ? 'Start' : 'Acessar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 10 MODULES / 40 PHASES COURSE TRAIL */}
        {UNITS.map((unit) => {
          const localizedUnit = getLocalizedUnit(unit, locale);
          const unitPhases = phases.filter(p => p.unitId === unit.id);
          const unitChest = chests.find(c => c.unitId === unit.id);
          const isUnitCompleted = unitPhases.every(p => p.status === 'completed');
          const theme = getUnitThemeStyles(unit.colorTheme);

          return (
            <section key={unit.id} className="w-full flex flex-col items-center mb-14">
              {/* UNIT HEADER BANNER */}
              <div className={`w-full rounded-3xl p-5 mb-8 shadow-2xl border-2 transition-all ${theme.banner}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider font-mono ${theme.accent}`}>
                        {localizedUnit.weekTitle}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-xs text-slate-300 font-semibold">{localizedUnit.subtitle}</span>
                    </div>

                    <h2 className="font-extrabold text-lg md:text-xl text-white font-['Outfit'] mt-1 leading-snug">
                      {localizedUnit.title}
                    </h2>

                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      {localizedUnit.description}
                    </p>
                  </div>

                  {/* Guidebook Button */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedUnitForGuide(localizedUnit);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl font-black text-xs transition-all shadow-md shrink-0 cursor-pointer border ${theme.button}`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">{locale === 'en-GB' ? 'Guide' : 'Guia'}</span>
                  </button>
                </div>
              </div>

              {/* STEPPING-STONE TRAIL NODES */}
              <div className="relative w-full flex flex-col items-center space-y-7">
                {unitPhases.map((phase, pIdx) => {
                  const localizedPhase = getLocalizedPhase(phase, locale);
                  const isAvailable = phase.status === 'available';
                  const isCompleted = phase.status === 'completed';
                  const isLocked = phase.status === 'locked';

                  // Serpentine offsets: alternating -38px, +38px...
                  const xOffset = pIdx % 2 === 0 ? -38 : 38;

                  return (
                    <div
                      key={phase.id}
                      id={`trail-phase-node-${phase.id}`}
                      className="relative flex flex-col items-center transition-all duration-300"
                      style={{ transform: `translateX(${xOffset}px)` }}
                    >
                      {/* ASTROBOT PERCHED MASCOT OVER ACTIVE LEVEL (only when not walking) */}
                      {isAvailable && !activeWalkingTransition && (
                        <div className="absolute -top-16 flex items-center gap-2 z-20 animate-float pointer-events-none">
                          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#00F5D4] bg-[#070512] shadow-[0_0_20px_#00F5D4]">
                            <img 
                              src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                              alt="AstroBot"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="bg-[#00F5D4] text-slate-950 font-black text-[11px] px-3 py-1 rounded-xl shadow-lg border border-teal-200 whitespace-nowrap">
                            <span>{locale === 'en-GB' ? 'START HERE! 🚀' : 'COMECE AQUI! 🚀'}</span>
                          </div>
                        </div>
                      )}

                      {/* Pulsing ring for active node */}
                      {isAvailable && (
                        <div className="absolute -inset-2.5 rounded-full border-4 border-[#00F5D4] animate-ping opacity-35 pointer-events-none" />
                      )}

                      {/* Duolingo 3D Circle Push Button */}
                      <button
                        disabled={isLocked}
                        onClick={() => handleNodeClick(phase)}
                        className={`
                          relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-150 cursor-pointer select-none
                          ${isCompleted 
                            ? 'bg-gradient-to-b from-[#00F5D4] to-[#00C4A7] text-slate-950 shadow-[0_7px_0_#009688] active:translate-y-1.5 active:shadow-[0_2px_0_#009688] border-2 border-white/60' 
                            : ''}
                          ${isAvailable 
                            ? 'bg-gradient-to-b from-[#EC4899] to-[#DB2777] text-white shadow-[0_8px_0_#9D174D] active:translate-y-1.5 active:shadow-[0_2px_0_#9D174D] border-3 border-white animate-pulse-glow' 
                            : ''}
                          ${isLocked 
                            ? 'bg-[#1E293B] text-[#64748B] shadow-[0_6px_0_#0F172A] border-2 border-slate-700/80 cursor-not-allowed opacity-75' 
                            : ''}
                        `}
                      >
                        {isCompleted && (
                          <Check className="w-9 h-9 stroke-[4] text-slate-950 drop-shadow-sm" />
                        )}
                        {isAvailable && (
                          <div className="flex flex-col items-center">
                            <Star className="w-7 h-7 fill-white text-white drop-shadow-sm" />
                            <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">
                              {locale === 'en-GB' ? `Stage ${phase.id}` : `Fase ${phase.id}`}
                            </span>
                          </div>
                        )}
                        {isLocked && (
                          <Lock className="w-7 h-7 text-slate-500" />
                        )}

                        {/* Mini Code Mode Badge */}
                        {phase.codeModeRecommended && (
                          <span className="absolute -top-3.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1 z-20 border border-cyan-300/40">
                            <Terminal className="w-2.5 h-2.5 text-cyan-200" />
                            <span>{locale === 'en-GB' ? 'Code' : 'Código'}</span>
                          </span>
                        )}
                      </button>

                      {/* Stars Pill Under Completed Node */}
                      {isCompleted && (
                        <div className="flex items-center gap-1 mt-2.5 bg-[#0F0B24] px-2.5 py-1 rounded-xl border border-amber-400/40 shadow-md">
                          {[1, 2, 3].map((starNum) => (
                            <Star 
                              key={starNum} 
                              className={`w-3.5 h-3.5 ${starNum <= phase.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} 
                            />
                          ))}
                        </div>
                      )}

                      {/* Title text under node */}
                      <div className="mt-1 text-center max-w-[140px]">
                        <span className={`text-xs font-bold block truncate ${isLocked ? 'text-slate-500' : 'text-slate-200'}`}>
                          {localizedPhase.title}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* WEEKLY REWARD CHEST */}
                {unitChest && (
                  <div className="relative flex flex-col items-center my-2">
                    {(() => {
                      const reqPhase = phases.find(p => p.id === unitChest.requiredPhaseIdToUnlock);
                      const isChestUnlocked = reqPhase && reqPhase.status === 'completed';
                      const isChestOpened = unitChest.isOpened;
                      const chestTitle = locale === 'en-GB' ? (EN_CHEST_TRANSLATIONS[unitChest.id] || unitChest.title) : unitChest.title;

                      return (
                        <button
                          disabled={!isChestUnlocked}
                          onClick={() => handleChestClick(unitChest)}
                          className={`
                            relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-150 cursor-pointer
                            ${isChestOpened 
                              ? 'bg-slate-900 border-2 border-cyan-400/50 shadow-[0_5px_0_#0F172A]' 
                              : (isChestUnlocked 
                                ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 border-2 border-yellow-200 shadow-[0_6px_0_#B45309] active:translate-y-1.5 active:shadow-[0_2px_0_#B45309] animate-bounce' 
                                : 'bg-[#18122B] text-slate-600 border border-slate-800 shadow-[0_5px_0_#090514] opacity-50 cursor-not-allowed'
                              )}
                          `}
                        >
                          {isChestOpened ? (
                            <span className="text-xl">✨</span>
                          ) : (
                            <span className="text-2xl">{isChestUnlocked ? '🎁' : '🔒'}</span>
                          )}

                          {!isChestOpened && isChestUnlocked && (
                            <span className="absolute -top-2.5 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                              +{unitChest.rewardGems} 💎
                            </span>
                          )}
                        </button>
                      );
                    })()}
                    <span className="text-[10px] text-slate-400 font-medium mt-1">
                      {locale === 'en-GB' ? (EN_CHEST_TRANSLATIONS[unitChest.id] || unitChest.title) : unitChest.title}
                    </span>
                  </div>
                )}

                {/* MODULE CERTIFICATE MILESTONE CARD AT END OF EACH UNIT */}
                <div className="w-full max-w-sm pt-2">
                  <div 
                    onClick={() => {
                      soundManager.playClick();
                      onOpenCertificate(localizedUnit);
                    }}
                    className={`
                      p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer shadow-lg
                      ${isUnitCompleted 
                        ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border-amber-400/70 hover:scale-[1.02] shadow-amber-500/10' 
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 opacity-70'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${isUnitCompleted ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/40' : 'bg-slate-800 text-slate-500'}`}>
                        {isUnitCompleted ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <div className="text-left">
                        <span className={`text-[10px] font-black uppercase tracking-wider block font-mono ${isUnitCompleted ? 'text-amber-300' : 'text-slate-400'}`}>
                          {isUnitCompleted 
                            ? (locale === 'en-GB' ? 'Diploma Unlocked!' : 'Certificado Liberado!') 
                            : (locale === 'en-GB' ? `Diploma for ${localizedUnit.weekTitle}` : `Certificado do ${unit.weekTitle}`)}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {localizedUnit.certificate.title}
                        </h4>
                      </div>
                    </div>

                    <button className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all ${isUnitCompleted ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-400'}`}>
                      {isUnitCompleted 
                        ? (locale === 'en-GB' ? 'View Diploma' : 'Ver Certificado') 
                        : (locale === 'en-GB' ? 'Locked' : 'Bloqueado')}
                    </button>
                  </div>
                </div>

                {/* FINAL SUPREME DIPLOMA TROPHY AT END OF MODULE 6 (Fases 1 a 24) */}
                {unit.id === 6 && (() => {
                  const phases1to24 = phases.filter(p => p.id <= 24);
                  const isGraduated = phases1to24.every(p => p.status === 'completed');
                  return (
                    <div className="w-full flex flex-col items-center">
                      <div className="relative flex flex-col items-center mt-6">
                        <button
                          onClick={() => {
                            soundManager.playVictory();
                            setShowTrophyModal(true);
                          }}
                          className={`
                            w-24 h-24 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer
                            ${isGraduated 
                              ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-3 border-yellow-200 shadow-[0_10px_0_#B45309] active:translate-y-2 active:shadow-[0_2px_0_#B45309] animate-pulse-glow' 
                              : 'bg-[#191136] text-slate-500 border-2 border-slate-800 shadow-[0_6px_0_#0D0821] opacity-70 cursor-pointer'
                            }
                          `}
                        >
                          <Trophy className={`w-10 h-10 ${isGraduated ? 'text-slate-950 fill-slate-950 animate-bounce' : 'text-amber-500/60'}`} />
                          <span className="text-[10px] font-black uppercase tracking-wider mt-1">Formatura</span>
                        </button>
                        <span className="text-xs font-bold text-amber-300 mt-2 text-center max-w-xs">
                          {isGraduated ? "🎉 Grande Reator 100% Salvo! Diploma Supremo Desbloqueado!" : "Formatura e Diploma Supremo (Fases 1 a 24)"}
                        </span>
                      </div>

                      {/* GRAND INTERSTELLAR TRANSITION PORTAL (Fases 25 a 40: Do Bloco ao Código Real) */}
                      <div className="w-full my-10 relative">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A0B36] via-[#2D1252] to-[#14062E] border-2 border-[#00F5D4] p-5 sm:p-6 shadow-[0_0_35px_rgba(0,245,212,0.25)]">
                          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F5D4] to-violet-600 p-1 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/40 animate-pulse">
                              <Terminal className="w-9 h-9 text-slate-950" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-center sm:justify-start gap-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#00F5D4] font-mono bg-[#00F5D4]/10 px-2 py-0.5 rounded-full border border-[#00F5D4]/30">
                                  Pós-Graduação Espacial
                                </span>
                                <Sparkles className="w-4 h-4 text-amber-400" />
                              </div>
                              <h3 className="text-base sm:text-lg font-extrabold text-white font-['Outfit'] mt-1">
                                🌌 Do Bloco ao Teclado: A Jornada do Código Real
                              </h3>
                              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                                Você conquistou a formatura básica! Agora você assumirá o comando do <strong>Terminal de Código</strong>: aprenda a digitar comandos de verdade como <code className="text-cyan-300 font-mono bg-black/40 px-1 py-0.5 rounded">avancar()</code>, loops e funções mágicas!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SUPREME LEGENDARY HACKER TROPHY AT END OF MODULE 10 (Fase 40) */}
                {unit.id === 10 && (() => {
                  const isAllCompleted = energyPercentage === 100;
                  return (
                    <div className="relative flex flex-col items-center mt-6">
                      <button
                        onClick={() => {
                          soundManager.playVictory();
                          setShowTrophyModal(true);
                        }}
                        className={`
                          w-28 h-28 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer
                          ${isAllCompleted 
                            ? 'bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-500 text-slate-950 border-4 border-yellow-100 shadow-[0_12px_0_#92400E] active:translate-y-2 active:shadow-[0_2px_0_#92400E] animate-bounce' 
                            : 'bg-[#22133B] text-slate-500 border-2 border-slate-700 shadow-[0_6px_0_#0F081C] opacity-70 cursor-pointer'
                          }
                        `}
                      >
                        <Crown className={`w-12 h-12 ${isAllCompleted ? 'text-slate-950 fill-slate-950 animate-pulse' : 'text-amber-500/60'}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider mt-1">Hacker Lendário</span>
                      </button>
                      <span className="text-xs font-bold text-yellow-300 mt-2 text-center max-w-xs">
                        {isAllCompleted ? "👑 DIPLOMA HACKER CÓSMICO CONQUISTADO (100%)!" : "Desafio Supremo Hacker (Fases 37 a 40)"}
                      </span>
                    </div>
                  );
                })()}
              </div>
            </section>
          );
        })}

        {/* FOOTER ACTIONS */}
        <div className="w-full flex items-center justify-between pt-8 border-t border-slate-800/80 text-xs text-slate-400 mt-4">
          <button
            onClick={() => {
              if (window.confirm("Deseja reiniciar todo o progresso da trilha?")) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Trilha</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGuide();
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Como Jogar</span>
          </button>
        </div>
      </main>

      {/* ALL CERTIFICATES GALLERY MODAL */}
      {showCertificatesMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#18103A] to-[#0A071A] border-2 border-amber-400 rounded-3xl p-6 text-center shadow-2xl flex flex-col max-h-[88vh]">
            <button
              onClick={() => setShowCertificatesMenu(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
              <Award className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider font-mono">
                Galeria de Conquistas
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-white font-['Outfit'] mb-1">
              Seus Certificados Oficiais
            </h3>

            <p className="text-xs text-slate-300 mb-4">
              Cada módulo concluído confere um certificado oficial para {studentName || 'o Cadete'}!
            </p>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-left">
              {UNITS.map(unit => {
                const unitPhases = phases.filter(p => p.unitId === unit.id);
                const isCompleted = unitPhases.every(p => p.status === 'completed');

                return (
                  <div
                    key={unit.id}
                    onClick={() => {
                      setShowCertificatesMenu(false);
                      onOpenCertificate(unit);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${isCompleted ? 'bg-amber-950/30 border-amber-400/60 hover:bg-amber-950/50' : 'bg-slate-900/60 border-slate-800 opacity-60'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${isCompleted ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                        {isCompleted ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold block ${isCompleted ? 'text-amber-400' : 'text-slate-500'}`}>
                          {unit.weekTitle} · {unit.certificate.levelRange}
                        </span>
                        <h4 className="text-xs font-bold text-white">
                          {unit.certificate.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${isCompleted ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                      {isCompleted ? 'Visualizar' : 'Em Andamento'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowCertificatesMenu(false)}
              className="mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
            >
              Fechar Galeria
            </button>
          </div>
        </div>
      )}

      {/* DUOLINGO LESSON POPOVER */}
      {selectedPhaseForPopover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#181136] via-[#120D29] to-[#0A071A] border-3 border-[#00F5D4] rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(0,245,212,0.4)] flex flex-col items-center">
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedPhaseForPopover(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F5D4] to-teal-500 p-1 shadow-lg shadow-teal-500/30 mb-3 animate-float">
              <div className="w-full h-full rounded-xl bg-[#070512] flex items-center justify-center font-black text-2xl text-[#00F5D4] font-['Outfit']">
                {selectedPhaseForPopover.id}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#00F5D4] text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <span>{selectedPhaseForPopover.unitTitle}</span>
            </div>

            <h3 className="font-extrabold text-xl text-white font-['Outfit']">
              {selectedPhaseForPopover.title}
            </h3>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xs">
              {selectedPhaseForPopover.description}
            </p>

            {/* Stars & Reward Preview */}
            <div className="flex items-center justify-around w-full my-4 bg-[#070512] p-3 rounded-2xl border border-slate-800">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Estrelas</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3].map(s => (
                    <Star 
                      key={s} 
                      className={`w-3.5 h-3.5 ${s <= selectedPhaseForPopover.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} 
                    />
                  ))}
                </div>
              </div>

              <div className="w-px h-8 bg-slate-800" />

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Recompensa</span>
                <div className="flex items-center gap-1 mt-0.5 text-cyan-300 font-black text-xs font-mono">
                  <Gem className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  <span>+{selectedPhaseForPopover.rewardGems}</span>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-800" />

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Par 3★</span>
                <span className="text-xs font-black text-amber-300 font-mono mt-0.5">
                  ≤{selectedPhaseForPopover.parStars.three} blocos
                </span>
              </div>
            </div>

            {/* Big Chunky 3D Duolingo CTA Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                const phaseId = selectedPhaseForPopover.id;
                setSelectedPhaseForPopover(null);
                onSelectPhase(phaseId);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-b from-[#00F5D4] to-[#00C4A7] hover:from-[#00F5D4] hover:to-teal-300 text-slate-950 font-black text-sm transition-all shadow-[0_6px_0_#009688] active:translate-y-1.5 active:shadow-[0_1px_0_#009688] flex items-center justify-center gap-2 cursor-pointer border border-teal-100"
            >
              <span>COMEÇAR LIÇÃO</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* UNIT GUIDEBOOK MODAL */}
      {selectedUnitForGuide && (
        <GuidebookModal
          unit={selectedUnitForGuide}
          onClose={() => setSelectedUnitForGuide(null)}
        />
      )}

      {/* CHEST REWARD MODAL */}
      {selectedChest && (
        <ChestModal
          chest={selectedChest}
          onClaim={(chestId, rewardGems) => {
            onOpenChest(chestId, rewardGems);
            setSelectedChest(null);
          }}
          onClose={() => setSelectedChest(null)}
        />
      )}

      {/* TROPHY CELEBRATION MODAL */}
      {showTrophyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#241A44] to-[#0A071A] border-3 border-amber-400 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(251,191,36,0.5)] flex flex-col items-center">
            <button
              onClick={() => setShowTrophyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-amber-400 p-1 flex items-center justify-center shadow-lg shadow-amber-500/50 mb-3 animate-bounce">
              <Trophy className="w-12 h-12 text-slate-950 fill-slate-950" />
            </div>

            <h3 className="font-black text-2xl text-white font-['Outfit']">
              Grande Reator de Cyberia
            </h3>

            <p className="text-xs text-slate-200 mt-2 leading-relaxed">
              {energyPercentage === 100 
                ? "Parabéns, Capitão do Código! Você concluiu todas as 24 fases e os 6 módulos do curso completo e restaurou 100% da energia do planeta Cyberia!"
                : "Complete todas as 24 fases para estabilizar o núcleo planetário a 100% e conquistar seu Diploma Supremo de Formatura!"}
            </p>

            <div className="mt-4 bg-[#070512] px-6 py-2.5 rounded-2xl border border-amber-400/40 text-amber-300 font-mono font-bold text-sm">
              Status: {energyPercentage}% Concluído ({completedPhasesCount}/24 Fases)
            </div>

            <button
              onClick={() => setShowTrophyModal(false)}
              className="w-full mt-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
