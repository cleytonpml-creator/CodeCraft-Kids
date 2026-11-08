/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUp, 
  RotateCw, 
  RotateCcw, 
  ArrowDown, 
  Repeat, 
  Cpu, 
  Trash2, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { BlockType } from '../types/game';
import { soundManager } from '../utils/audio';

interface CodeEditorPanelProps {
  code: string;
  onChangeCode: (code: string) => void;
  activeLine: number | null;
  isRunning: boolean;
  parseError?: {
    message: string;
    line?: number;
    suggestion?: string;
  };
  onApplyFix?: (suggestion: string) => void;
  onClearCode: () => void;
  onSyncToBlocks: () => void;
  totalStepsCount: number;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  code,
  onChangeCode,
  activeLine,
  isRunning,
  parseError,
  onApplyFix,
  onClearCode,
  onSyncToBlocks,
  totalStepsCount
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');

  const handleInsertSnippet = (snippet: string) => {
    if (isRunning) return;
    soundManager.playClick();
    
    const textarea = textareaRef.current;
    if (!textarea) {
      onChangeCode(code ? `${code}\n${snippet}` : snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = code.substring(0, start);
    const after = code.substring(end);

    // If inserted on a new line or middle
    const needsNewlineBefore = before.length > 0 && !before.endsWith('\n');
    const newText = `${before}${needsNewlineBefore ? '\n' : ''}${snippet}\n${after}`;
    onChangeCode(newText);

    setTimeout(() => {
      textarea.focus();
      const newPos = (before.length + (needsNewlineBefore ? 1 : 0) + snippet.length + 1);
      textarea.setSelectionRange(newPos, newPos);
    }, 10);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0F0B24] border border-cyan-500/40 rounded-2xl shadow-xl overflow-hidden min-h-[420px]">
      {/* Editor Header Bar */}
      <div className="bg-[#171038] px-4 py-2.5 border-b border-indigo-950 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 ml-1 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#00F5D4]" />
            <span>astrobot_main.js</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isRunning}
            onClick={() => {
              soundManager.playClick();
              onSyncToBlocks();
            }}
            title="Sincronizar código com a lista de blocos visuais"
            className="text-[11px] font-bold text-indigo-300 hover:text-white bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-700/60 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Ver em Blocos</span>
          </button>

          {code.trim().length > 0 && (
            <button
              type="button"
              disabled={isRunning}
              onClick={() => {
                soundManager.playClick();
                onClearCode();
              }}
              title="Limpar código"
              className="text-[11px] text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* QUICK CHIP BAR: Kid-friendly Insert Buttons */}
      <div className="bg-[#120B2E] px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider shrink-0 mr-1">
          Atalhos:
        </span>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('avancar();')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-800/90 border border-emerald-500/50 text-emerald-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-3 h-3" />
          <span>avancar();</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('avancar(3);')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-teal-950/80 hover:bg-teal-800/90 border border-teal-500/50 text-teal-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>avancar(3);</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('virarDireita();')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-800/90 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <RotateCw className="w-3 h-3" />
          <span>virarDireita();</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('virarEsquerda();')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-800/90 border border-amber-500/50 text-amber-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-3 h-3" />
          <span>virarEsquerda();</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('repetir(3) {\n  avancar();\n}')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-fuchsia-950/80 hover:bg-fuchsia-800/90 border border-fuchsia-500/50 text-fuchsia-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Repeat className="w-3 h-3" />
          <span>repetir(3)</span>
        </button>

        <button
          type="button"
          disabled={isRunning}
          onClick={() => handleInsertSnippet('funcao desviar() {\n  virarDireita();\n  avancar();\n  virarEsquerda();\n}\ndesviar();')}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-800/90 border border-sky-500/50 text-sky-300 font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Cpu className="w-3 h-3 text-cyan-300" />
          <span>funcao</span>
        </button>
      </div>

      {/* Editor Body: Line numbers + Textarea */}
      <div className="relative flex-1 flex overflow-hidden bg-[#070512]">
        {/* Line Numbers Column */}
        <div 
          className="w-10 sm:w-12 bg-[#0C081E] border-r border-indigo-950 py-3 select-none flex flex-col font-mono text-xs text-slate-600 text-right pr-2 space-y-1"
          aria-hidden="true"
        >
          {Array.from({ length: Math.max(lines.length, 8) }).map((_, i) => {
            const lineNum = i + 1;
            const isLineActive = activeLine === lineNum;
            const hasError = parseError && parseError.line === lineNum;

            return (
              <span
                key={lineNum}
                className={`
                  h-6 leading-6 transition-colors font-bold
                  ${isLineActive ? 'text-[#00F5D4] font-black scale-110 drop-shadow-[0_0_5px_#00F5D4]' : ''}
                  ${hasError ? 'text-rose-400 font-black' : ''}
                `}
              >
                {lineNum}
              </span>
            );
          })}
        </div>

        {/* Textarea Area */}
        <div className="relative flex-1 p-2 sm:p-3 overflow-hidden">
          <textarea
            ref={textareaRef}
            disabled={isRunning}
            value={code}
            onChange={(e) => onChangeCode(e.target.value)}
            placeholder="// Digite aqui os comandos para o AstroBot!&#10;avancar();&#10;virarDireita();&#10;avancar(3);"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-6 selection:bg-[#00F5D4]/30 selection:text-white placeholder:text-slate-600 custom-scrollbar disabled:opacity-75"
          />
        </div>
      </div>

      {/* FOOTER DIAGNOSTIC BAR */}
      <div className="bg-[#120B2E] border-t border-slate-800/80 px-4 py-2.5 flex flex-col gap-1.5">
        {parseError ? (
          <div className="flex items-center justify-between gap-2 bg-rose-950/60 border border-rose-500/40 rounded-xl px-3 py-2 text-rose-300 text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{parseError.message}</span>
            </div>

            {parseError.suggestion && onApplyFix && (
              <button
                type="button"
                onClick={() => onApplyFix(parseError.suggestion!)}
                className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-[11px] shrink-0 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Sparkles className="w-3 h-3" />
                <span>Corrigir</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">
                {totalStepsCount > 0 
                  ? `Sintaxe pronta: ${totalStepsCount} ${totalStepsCount === 1 ? 'passo gerado' : 'passos gerados'}` 
                  : 'Pronto para escrever seus comandos'}
              </span>
            </div>

            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Dica: use <code className="text-cyan-300">avancar(n);</code> para múltiplos passos!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
