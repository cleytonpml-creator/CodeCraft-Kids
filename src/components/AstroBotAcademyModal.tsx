/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Bot, 
  Compass, 
  ListOrdered, 
  Repeat, 
  Bug, 
  CheckCircle2, 
  AlertCircle, 
  Gem, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Award,
  Code,
  Terminal,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { ACADEMY_LESSONS } from '../utils/academy';
import { soundManager } from '../utils/audio';

interface AstroBotAcademyModalProps {
  completedLessonIds: string[];
  onCompleteLesson: (lessonId: string, rewardGems: number) => void;
  onClose: () => void;
}

export const AstroBotAcademyModal: React.FC<AstroBotAcademyModalProps> = ({
  completedLessonIds,
  onCompleteLesson,
  onClose
}) => {
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const lesson = ACADEMY_LESSONS[activeLessonIndex];
  const isLessonCompleted = completedLessonIds.includes(lesson.id);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered && isCorrect) return;
    soundManager.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === lesson.content.interactiveQuestion.correctIndex;
    setIsCorrect(correct);
    setHasAnswered(true);

    if (correct) {
      soundManager.playVictory();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      if (!isLessonCompleted) {
        onCompleteLesson(lesson.id, lesson.rewardGems);
      }
    } else {
      soundManager.playFail();
    }
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < ACADEMY_LESSONS.length - 1) {
      soundManager.playClick();
      setActiveLessonIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setIsCorrect(false);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      soundManager.playClick();
      setActiveLessonIndex(prev => prev - 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setIsCorrect(false);
    }
  };

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-5 h-5 text-[#00F5D4]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'ListOrdered': return <ListOrdered className="w-5 h-5 text-amber-400" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-fuchsia-400" />;
      case 'Bug': return <Bug className="w-5 h-5 text-rose-400" />;
      case 'Code': return <Code className="w-5 h-5 text-violet-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-rose-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181138] via-[#100B26] to-[#070514] border-2 border-[#00F5D4]/60 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(0,245,212,0.35)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#00F5D4] bg-[#070512] shadow-md shadow-teal-500/20 shrink-0">
              <img 
                src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                alt="AstroBot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00F5D4] font-mono bg-[#00F5D4]/10 px-2 py-0.5 rounded-md">
                  Academia de Código
                </span>
                <span className="text-xs text-slate-400">· Aula {lesson.number} de {ACADEMY_LESSONS.length}</span>
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-white font-['Outfit']">
                Aprendendo com AstroBot
              </h2>
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

        {/* Lesson Selector Tabs */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar border-b border-slate-800/60">
          {ACADEMY_LESSONS.map((l, idx) => {
            const isCompleted = completedLessonIds.includes(l.id);
            const isCurrent = idx === activeLessonIndex;

            return (
              <button
                key={l.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveLessonIndex(idx);
                  setSelectedOption(null);
                  setHasAnswered(false);
                  setIsCorrect(false);
                }}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer border
                  ${isCurrent 
                    ? 'bg-[#00F5D4] text-slate-950 border-[#00F5D4] shadow-md shadow-teal-500/30' 
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }
                `}
              >
                <span>Aula {l.number}</span>
                {isCompleted && (
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : 'text-emerald-400'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrollable Lesson Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs text-slate-200">
          {/* AstroBot Greeting Bubble */}
          <div className="bg-[#1C1442] border border-[#00F5D4]/30 rounded-2xl p-4 flex gap-3 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-[#00F5D4]/10 border border-[#00F5D4]/30 flex items-center justify-center shrink-0">
              {getLessonIcon(lesson.icon)}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00F5D4] block mb-0.5 font-mono">
                Fala do Mascote:
              </span>
              <p className="text-white font-medium text-xs leading-relaxed">
                "{lesson.astroBotSpeech}"
              </p>
            </div>
          </div>

          {/* Main Story & Key Concept */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div>
              <h3 className="font-extrabold text-sm text-white font-['Outfit'] mb-1">
                {lesson.title}
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs">
                {lesson.content.story}
              </p>
            </div>

            {/* Highlighted Concept Box */}
            <div className="bg-[#070512] p-3 rounded-xl border border-cyan-500/30 shadow-inner">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Conceito Fundamental
              </span>
              <p className="text-white font-bold text-xs leading-snug">
                {lesson.content.keyConcept}
              </p>
            </div>

            {/* Code Snippet Box */}
            {lesson.content.codeSnippet && (
              <div className="bg-[#0B081C] p-3 rounded-xl border border-indigo-500/30 font-mono text-[11px] text-teal-300 whitespace-pre-line shadow-inner">
                {lesson.content.codeSnippet}
              </div>
            )}
          </div>

          {/* Visual Tip & Fun Fact row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3 flex gap-2.5">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wide block">Dica Prática</span>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{lesson.content.visualTip}</p>
              </div>
            </div>

            <div className="bg-fuchsia-950/20 border border-fuchsia-500/30 rounded-2xl p-3 flex gap-2.5">
              <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black text-fuchsia-400 uppercase tracking-wide block">Você Sabia?</span>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{lesson.content.funFact}</p>
              </div>
            </div>
          </div>

          {/* Interactive Challenge Quiz Box */}
          <div className="bg-gradient-to-b from-[#1C1340] to-[#120B2E] border-2 border-indigo-400/40 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-white uppercase tracking-wider font-['Outfit']">
                  Desafio da Aula: Teste Seu Conhecimento!
                </span>
              </div>
              <div className="flex items-center gap-1 text-cyan-300 font-black text-xs font-mono bg-cyan-950/60 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                <Gem className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                <span>+{lesson.rewardGems} Gemas</span>
              </div>
            </div>

            <p className="text-xs font-bold text-white leading-relaxed">
              {lesson.content.interactiveQuestion.question}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2 pt-1">
              {lesson.content.interactiveQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isOptionCorrect = oIdx === lesson.content.interactiveQuestion.correctIndex;

                let optionStyle = 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800';
                if (hasAnswered) {
                  if (isOptionCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold';
                  } else if (isSelected && !isOptionCorrect) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-md';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isOptionCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {hasAnswered && isSelected && !isOptionCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Confirm button */}
            {!hasAnswered ? (
              <button
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00F5D4] hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40 cursor-pointer"
              >
                Confirmar Resposta
              </button>
            ) : (
              <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/50 text-rose-200'}`}>
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{isCorrect ? 'Resposta Correta! Parabéns!' : 'Ops, não foi dessa vez!'}</span>
                </div>
                <p>{lesson.content.interactiveQuestion.explanation}</p>
                {!isCorrect && (
                  <button
                    onClick={() => {
                      setHasAnswered(false);
                      setSelectedOption(null);
                    }}
                    className="mt-2 text-[11px] underline text-rose-300 font-bold cursor-pointer"
                  >
                    Tentar Novamente
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            disabled={activeLessonIndex === 0}
            onClick={handlePrevLesson}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Aula Anterior</span>
          </button>

          {activeLessonIndex < ACADEMY_LESSONS.length - 1 ? (
            <button
              onClick={handleNextLesson}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <span>Próxima Aula</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#00F5D4] hover:bg-teal-300 text-slate-950 text-xs font-black transition-all shadow-md shadow-teal-500/30 cursor-pointer"
            >
              <span>Pronto para Programar!</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
