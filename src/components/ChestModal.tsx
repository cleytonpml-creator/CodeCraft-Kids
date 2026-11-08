/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Gem, CheckCircle } from 'lucide-react';
import { ChestModel } from '../types/game';
import { soundManager } from '../utils/audio';

interface ChestModalProps {
  chest: ChestModel;
  onClaim: (chestId: string, gems: number) => void;
  onClose: () => void;
}

export const ChestModal: React.FC<ChestModalProps> = ({ chest, onClaim, onClose }) => {
  const handleOpen = () => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    onClaim(chest.id, chest.rewardGems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1C1338] via-[#120B24] to-[#0A071A] border-2 border-amber-400 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(251,191,36,0.35)] flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Chest Icon */}
        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-1.5 shadow-[0_0_30px_#F59E0B] mb-3 animate-bounce">
          <div className="w-full h-full rounded-2xl bg-[#070512] flex items-center justify-center text-4xl">
            {chest.isOpened ? '✨' : '🎁'}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Recompensa Cósmica</span>
        </div>

        <h3 className="font-extrabold text-xl text-white font-['Outfit']">
          {chest.title}
        </h3>

        <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
          {chest.isOpened 
            ? "Você já resgatou os cristais deste baú espacial!"
            : "Você concluiu o trecho anterior da trilha e desbloqueou um suprimento de cristais cósmicos!"}
        </p>

        {/* Reward Gem Count Box */}
        <div className="flex items-center gap-2.5 my-4 bg-[#070512] px-6 py-3 rounded-2xl border border-cyan-400/50 shadow-inner">
          <Gem className="w-6 h-6 text-[#00F5D4] fill-[#00F5D4] animate-pulse" />
          <span className="text-2xl font-black text-[#00F5D4] font-mono tabular-nums">
            +{chest.rewardGems} Cristais
          </span>
        </div>

        {/* Action Button */}
        {chest.isOpened ? (
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors border border-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Baú Já Coletado</span>
          </button>
        ) : (
          <button
            onClick={handleOpen}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer border border-yellow-200"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Abrir Baú & Coletar</span>
          </button>
        )}
      </div>
    </div>
  );
};
