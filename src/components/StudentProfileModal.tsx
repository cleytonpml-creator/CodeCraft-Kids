/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  User, 
  Sparkles, 
  Check, 
  Award, 
  Star, 
  Gem, 
  Flame, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { CADET_BADGES, Locale, UI_TRANSLATIONS } from '../utils/i18n';

interface StudentProfileModalProps {
  currentName: string;
  currentBadge: string;
  locale: Locale;
  totalStars: number;
  totalGems: number;
  streak: number;
  completedStages: number;
  onSaveProfile: (name: string, badge: string) => void;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  currentName,
  currentBadge,
  locale,
  totalStars,
  totalGems,
  streak,
  completedStages,
  onSaveProfile,
  onClose
}) => {
  const t = UI_TRANSLATIONS[locale];
  const [nameInput, setNameInput] = useState<string>(currentName || (locale === 'en-GB' ? 'Cadet Oliver' : 'Cadete Espacial'));
  const [selectedBadge, setSelectedBadge] = useState<string>(currentBadge || '🚀');

  const presetNamesEn = ['Oliver', 'Lily', 'Leo', 'Maya', 'Arthur', 'Sophie', 'Noah', 'Mia'];
  const presetNamesPt = ['Arthur', 'Sofia', 'Lucas', 'Alice', 'Gabriel', 'Helena', 'Theo', 'Laura'];
  const presetNames = locale === 'en-GB' ? presetNamesEn : presetNamesPt;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = nameInput.trim() || (locale === 'en-GB' ? 'Cadet Leo' : 'Cadete Espacial');
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    onSaveProfile(trimmed, selectedBadge);
    onClose();
  };

  const getRankTitle = () => {
    if (completedStages >= 36) return t.cadetRankMaster;
    if (completedStages >= 20) return t.cadetRankCommander;
    if (completedStages >= 8) return t.cadetRankApprentice;
    return t.cadetRankNovice;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#181138] via-[#100A26] to-[#070514] border-2 border-[#00F5D4]/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,245,212,0.3)] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Badge Hero */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00F5D4]/30 via-indigo-600/40 to-purple-600/50 border-2 border-[#00F5D4] flex items-center justify-center text-4xl shadow-[0_0_25px_#00F5D4]">
              {selectedBadge}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
            {t.editCadetTitle}
          </h2>
          <p className="text-xs text-slate-300 max-w-sm mt-1">
            {t.editCadetSubtitle}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{getRankTitle()} · {completedStages}/40 {locale === 'en-GB' ? 'Stages' : 'Fases'}</span>
          </div>
        </div>

        {/* Cadet Stats Quick Summary */}
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl bg-[#09061A]/80 border border-slate-800">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{totalStars}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.stars}</span>
          </div>
          <div className="flex flex-col items-center text-center border-x border-slate-800">
            <div className="flex items-center gap-1 text-cyan-400 text-xs font-black">
              <Gem className="w-3.5 h-3.5 fill-cyan-400" />
              <span>{totalGems}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.crystals}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-orange-400 text-xs font-black">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{streak}d</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t.streak}</span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-black text-slate-200 uppercase tracking-wider mb-1.5">
              {t.nameLabel}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                maxLength={24}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#09061A] border-2 border-indigo-500/50 focus:border-[#00F5D4] text-white font-bold text-sm outline-none transition-all placeholder:text-slate-500 shadow-inner"
              />
              {nameInput && (
                <button
                  type="button"
                  onClick={() => setNameInput('')}
                  className="absolute right-3 p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Pick Preset Names for Kids */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-bold mr-1">
                {locale === 'en-GB' ? 'Quick suggestions:' : 'Sugestões rápidas:'}
              </span>
              {presetNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setNameInput(name);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    nameInput.toLowerCase() === name.toLowerCase()
                      ? 'bg-[#00F5D4] text-slate-950 font-black'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Selection */}
          <div>
            <label className="block text-xs font-black text-slate-200 uppercase tracking-wider mb-2">
              {t.badgeLabel}
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {CADET_BADGES.map((badge) => {
                const isSelected = selectedBadge === badge.icon;
                const badgeLabel = locale === 'en-GB' ? badge.nameEn : badge.namePt;
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedBadge(badge.icon);
                    }}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00F5D4]/20 border-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.4)] scale-105'
                        : 'bg-[#0A071E] border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">
                      {badgeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-2 pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              {locale === 'en-GB' ? 'Cancel' : 'Cancelar'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00F5D4] hover:from-emerald-400 hover:to-[#00F5D4] text-slate-950 font-black text-xs transition-all shadow-lg shadow-teal-500/30 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.saveProfile}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
