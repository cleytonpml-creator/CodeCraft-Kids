/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Printer, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Crown, 
  ShieldCheck, 
  User, 
  Lock,
  Download
} from 'lucide-react';
import { UnitModel, PhaseModel } from '../types/game';
import { soundManager } from '../utils/audio';
import { Locale, UI_TRANSLATIONS, getLocalizedUnit } from '../utils/i18n';

interface CertificateModalProps {
  unit: UnitModel;
  phases: PhaseModel[];
  studentName: string;
  studentBadge?: string;
  locale?: Locale;
  onUpdateStudentName: (name: string) => void;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  unit,
  phases,
  studentName,
  studentBadge = '🚀',
  locale = 'en-GB',
  onUpdateStudentName,
  onClose
}) => {
  const t = UI_TRANSLATIONS[locale];
  const localizedUnit = getLocalizedUnit(unit, locale);
  const [nameInput, setNameInput] = useState<string>(studentName || (locale === 'en-GB' ? 'Cadet Leo' : 'Cadete Espacial'));
  const [isEditingName, setIsEditingName] = useState<boolean>(!studentName);


  // Check if all phases in this unit are completed
  const unitPhases = phases.filter(p => p.unitId === unit.id);
  const isUnitCompleted = unitPhases.every(p => p.status === 'completed');
  const unitStars = unitPhases.reduce((acc, p) => acc + p.stars, 0);
  const maxUnitStars = unitPhases.length * 3;

  const handleSaveName = () => {
    soundManager.playClick();
    onUpdateStudentName(nameInput.trim() || 'Cadete Espacial');
    setIsEditingName(false);
  };

  const handlePrint = () => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#18103A] via-[#100A26] to-[#070514] border-2 border-amber-400/70 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(251,191,36,0.35)] flex flex-col max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer print:hidden z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Completion Status Alert */}
        {!isUnitCompleted ? (
          <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 mb-4 flex items-center gap-3 print:hidden">
            <Lock className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-left">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wide block">
                Certificado em Progresso
              </span>
              <p className="text-xs text-slate-300 leading-snug mt-0.5">
                Complete todas as 4 fases da <strong>{unit.title}</strong> para desbloquear e emitir seu certificado oficial com selo de ouro!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3 mb-4 flex items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Parabéns! Módulo 100% concluído com {unitStars}/{maxUnitStars} estrelas!</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-md font-bold uppercase">
              Certificado Liberado
            </span>
          </div>
        )}

        {/* Name input customization bar */}
        <div className="bg-[#0B071A] border border-slate-800 rounded-2xl p-3 mb-4 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#00F5D4]" />
            <span className="text-xs text-slate-300 font-bold">Nome no Certificado:</span>
          </div>

          {isEditingName ? (
            <div className="flex items-center gap-2 flex-1 max-w-xs">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nome da Criança"
                maxLength={30}
                className="w-full bg-[#181136] border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F5D4]"
              />
              <button
                onClick={handleSaveName}
                className="px-3 py-1.5 rounded-xl bg-[#00F5D4] text-slate-950 font-bold text-xs cursor-pointer hover:bg-teal-300 transition-colors shrink-0"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#00F5D4] font-['Outfit']">
                {studentName || nameInput}
              </span>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                (Alterar)
              </button>
            </div>
          )}
        </div>

        {/* PRINTABLE CERTIFICATE CANVAS (Duolingo / Galactic Academy Diploma) */}
        <div 
          id="galactic-certificate-card"
          className="relative w-full bg-gradient-to-b from-[#0E0926] via-[#140D36] to-[#0A061C] border-4 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center overflow-hidden my-auto print:border-8 print:border-black print:text-black print:bg-white"
        >
          {/* Galactic Corner Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

          {/* Academy Header Banner */}
          <div className="flex items-center gap-2.5 text-amber-400 mb-1">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span className="text-[11px] font-black uppercase tracking-widest font-mono">
              {locale === 'en-GB' ? 'Cyberia Space Academy · UK Edition' : 'Academia Cósmica CodeCraft Kids'}
            </span>
            <Sparkles className="w-4 h-4 fill-amber-400" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-['Outfit'] tracking-wide uppercase drop-shadow-md">
            {localizedUnit.certificate.title}
          </h2>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-2" />

          <p className="text-xs text-slate-300 max-w-md font-medium mt-1">
            {t.certifiedTo}:
          </p>

          {/* Student Name & Badge */}
          <div className="my-3 py-1.5 px-6 border-b-2 border-amber-400/60 inline-flex items-center gap-2">
            <span className="text-2xl">{studentBadge}</span>
            <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent font-['Outfit'] tracking-wide">
              {studentName || nameInput}
            </span>
          </div>

          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            {t.certifyBody} <strong>{localizedUnit.title}</strong> ({localizedUnit.certificate.levelRange}).
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-md my-4 text-left">
            {localizedUnit.certificate.skillsLearned.map((skill, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 bg-[#080418]/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-[11px] text-slate-200"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F5D4] shrink-0" />
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>

          {/* Seal and Signatures Footer */}
          <div className="w-full flex items-center justify-between pt-4 border-t border-slate-800/80 mt-2 text-left">
            {/* AstroBot Signature */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-teal-400/40 mb-1 bg-[#070512]">
                <img 
                  src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                  alt="AstroBot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] font-black text-[#00F5D4] font-mono leading-none">AstroBot</span>
              <span className="text-[9px] text-slate-400 font-medium">
                {locale === 'en-GB' ? 'Lead Robotics Mentor' : 'Instrutor Chefe de Robótica'}
              </span>
            </div>

            {/* Official Holographic Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-1 shadow-lg shadow-amber-500/40 flex items-center justify-center animate-pulse">
                <div className="w-full h-full rounded-full bg-[#070512] flex flex-col items-center justify-center text-amber-300">
                  <Crown className="w-6 h-6 fill-amber-300 text-amber-300" />
                  <span className="text-[8px] font-black uppercase font-mono tracking-tighter">
                    {locale === 'en-GB' ? 'Verified' : 'Oficial'}
                  </span>
                </div>
              </div>
            </div>

            {/* Space Academy Signature */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-xl mb-1">
                🚀
              </div>
              <span className="text-[10px] font-black text-indigo-300 font-mono leading-none">Cyberia Space</span>
              <span className="text-[9px] text-slate-400 font-medium">
                {locale === 'en-GB' ? 'Council of Engineering' : 'Conselho de Engenharia'}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Actions Bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <span>Certificado Nº: CCK-MOD{unit.number}-{1000 + unit.id * 123}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Voltar à Trilha
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/30 cursor-pointer border border-yellow-200"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Certificado</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
