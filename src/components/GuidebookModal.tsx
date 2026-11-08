/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, Footprints, RotateCw, Flame, Repeat, Sparkles, StepForward, ArrowRight } from 'lucide-react';
import { UnitModel } from '../types/game';
import { soundManager } from '../utils/audio';

interface GuidebookModalProps {
  unit: UnitModel;
  onClose: () => void;
}

export const GuidebookModal: React.FC<GuidebookModalProps> = ({ unit, onClose }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'RotateCw': return <RotateCw className="w-5 h-5 text-indigo-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-fuchsia-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'StepForward': return <StepForward className="w-5 h-5 text-teal-400" />;
      default: return <BookOpen className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#161033] via-[#0D091F] to-[#070512] border-2 border-emerald-400/50 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                Caderno de Estudos
              </span>
              <h3 className="font-extrabold text-base md:text-lg text-white font-['Outfit']">
                {unit.guidebook.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tips List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs text-slate-200">
          {unit.guidebook.tips.map((tip, idx) => (
            <div 
              key={idx}
              className="bg-[#1C1542]/70 border border-slate-700/70 rounded-2xl p-4 shadow-md flex gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center shrink-0">
                {getIcon(tip.iconName)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white font-['Outfit'] mb-1">
                  {tip.title}
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {tip.description}
                </p>
                {tip.codeExample && (
                  <div className="mt-2.5 bg-[#070512] px-3 py-2 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 whitespace-pre-line shadow-inner">
                    {tip.codeExample}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/25 cursor-pointer"
          >
            <span>Continuar na Trilha</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
