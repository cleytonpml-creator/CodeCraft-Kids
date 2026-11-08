/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ArrowRight, RotateCw, Repeat, Sparkles, Footprints, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#130D2B] via-[#0D091F] to-[#070512] border-2 border-[#00F5D4]/40 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/10 border border-[#00F5D4]/30 flex items-center justify-center text-[#00F5D4]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white font-['Outfit']">
                Como Jogar o CodeCraft Kids
              </h3>
              <p className="text-xs text-slate-400">Guia de Programação Cósmica</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs text-slate-300">
          {/* Card 1: Sequência */}
          <div className="bg-[#191238]/60 border border-slate-700/60 rounded-2xl p-4 flex gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Outfit'] mb-1">
                1. Sequência de Passos
              </h4>
              <p className="leading-relaxed">
                Computadores e robôs executam os comandos exatamente na ordem em que são colocados, de cima para baixo. Cada bloco corresponde a uma ação no microchip!
              </p>
            </div>
          </div>

          {/* Card 2: Direção & Rotação */}
          <div className="bg-[#191238]/60 border border-slate-700/60 rounded-2xl p-4 flex gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Outfit'] mb-1">
                2. Direção e Giro (90°)
              </h4>
              <p className="leading-relaxed">
                O AstroBot possui uma frente (indicada pela seta neon na cabeça dele). O comando <strong>Avançar</strong> sempre anda para onde a cabeça está virada! Use <strong>Girar Direita</strong> ou <strong>Girar Esquerda</strong> antes de andar na direção certa.
              </p>
            </div>
          </div>

          {/* Card 3: Loops de Repetição */}
          <div className="bg-[#191238]/60 border border-slate-700/60 rounded-2xl p-4 flex gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center shrink-0">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Outfit'] mb-1">
                3. Laços de Repetição (Loops)
              </h4>
              <p className="leading-relaxed">
                Programadores inteligentes evitam repetir o mesmo código! Em vez de usar vários blocos de avanço, use <strong>Repetir 2x / 3x / 4x</strong> para economizar linhas e faturar a pontuação máxima de 3 estrelas!
              </p>
            </div>
          </div>

          {/* Card 4: Depuração Passo a Passo */}
          <div className="bg-[#191238]/60 border border-slate-700/60 rounded-2xl p-4 flex gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Outfit'] mb-1">
                4. O Segredo dos Cientistas: Passo a Passo
              </h4>
              <p className="leading-relaxed">
                Errar faz parte do aprendizado! Se o robô não chegou ao cristal, clique no botão <strong>Passo</strong> para ver o que cada instrução faz devagarzinho e encontrar onde ajustar.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00F5D4] hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <span>Entendi, Vamos Jogar!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
