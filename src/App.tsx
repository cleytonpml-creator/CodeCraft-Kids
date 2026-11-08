/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CosmicMapScreen } from './components/CosmicMapScreen';
import { LevelScreen } from './components/LevelScreen';
import { LevelSandbox } from './components/LevelSandbox';
import { InstructionsModal } from './components/InstructionsModal';
import { AstroBotAcademyModal } from './components/AstroBotAcademyModal';
import { CertificateModal } from './components/CertificateModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { INITIAL_PHASES, INITIAL_CHESTS } from './utils/levels';
import { PhaseModel, ChestModel, UnitModel } from './types/game';
import { soundManager } from './utils/audio';
import { Locale } from './utils/i18n';

type ActiveView = 'map' | 'level' | 'sandbox';

export default function App() {
  // Locale: defaults to UK English (en-GB)
  const [locale, setLocale] = useState<Locale>(() => {
    return (localStorage.getItem('codecraft_locale') as Locale) || 'en-GB';
  });

  // Student Name
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('codecraft_student_name') || 'Cadet Oliver';
  });

  // Student Space Badge
  const [studentBadge, setStudentBadge] = useState<string>(() => {
    return localStorage.getItem('codecraft_student_badge') || '🚀';
  });

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);


  // Persistent phases
  const [phases, setPhases] = useState<PhaseModel[]>(() => {
    const saved = localStorage.getItem('codecraft_phases');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return INITIAL_PHASES.map(initP => {
          const found = parsed.find((p: { id: number }) => p.id === initP.id);
          if (found) {
            return {
              ...initP,
              status: found.status,
              stars: found.stars
            };
          }
          return initP;
        });
      } catch {
        return INITIAL_PHASES;
      }
    }
    return INITIAL_PHASES;
  });

  // Persistent chests
  const [chests, setChests] = useState<ChestModel[]>(() => {
    const saved = localStorage.getItem('codecraft_chests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return INITIAL_CHESTS.map(initC => {
          const found = parsed.find((c: { id: string }) => c.id === initC.id);
          if (found) {
            return { ...initC, isOpened: found.isOpened };
          }
          return initC;
        });
      } catch {
        return INITIAL_CHESTS;
      }
    }
    return INITIAL_CHESTS;
  });

  // Persistent gamification metrics
  const [gems, setGems] = useState<number>(() => {
    const saved = localStorage.getItem('codecraft_gems');
    return saved !== null ? parseInt(saved, 10) : 65;
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('codecraft_streak');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  // Persistent Academy completed lessons
  const [completedAcademyLessonIds, setCompletedAcademyLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('codecraft_academy_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeView, setActiveView] = useState<ActiveView>('map');
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showAcademyModal, setShowAcademyModal] = useState<boolean>(false);
  const [selectedUnitForCertificate, setSelectedUnitForCertificate] = useState<UnitModel | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [walkingTransition, setWalkingTransition] = useState<{ fromPhaseId: number; toPhaseId: number } | null>(null);

  // Save progress
  useEffect(() => {
    const minified = phases.map(p => ({
      id: p.id,
      status: p.status,
      stars: p.stars
    }));
    localStorage.setItem('codecraft_phases', JSON.stringify(minified));
  }, [phases]);

  useEffect(() => {
    const minifiedChests = chests.map(c => ({
      id: c.id,
      isOpened: c.isOpened
    }));
    localStorage.setItem('codecraft_chests', JSON.stringify(minifiedChests));
  }, [chests]);

  useEffect(() => {
    localStorage.setItem('codecraft_gems', gems.toString());
  }, [gems]);

  useEffect(() => {
    localStorage.setItem('codecraft_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('codecraft_academy_lessons', JSON.stringify(completedAcademyLessonIds));
  }, [completedAcademyLessonIds]);

  useEffect(() => {
    localStorage.setItem('codecraft_locale', locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem('codecraft_student_badge', studentBadge);
  }, [studentBadge]);

  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    localStorage.setItem('codecraft_student_name', name);
  };

  const handleSaveProfile = (name: string, badge: string) => {
    setStudentName(name);
    setStudentBadge(badge);
    localStorage.setItem('codecraft_student_name', name);
    localStorage.setItem('codecraft_student_badge', badge);
  };

  const handleSelectPhase = (phaseId: number) => {
    setSelectedPhaseId(phaseId);
    setActiveView('level');
  };

  const handleCompletePhase = (phaseId: number, stars: number) => {
    const completedPhase = phases.find(p => p.id === phaseId);
    const rewardGems = completedPhase ? completedPhase.rewardGems : 15;

    setGems(prev => prev + rewardGems);

    setPhases(prevPhases => {
      return prevPhases.map((phase, idx) => {
        if (phase.id === phaseId) {
          return {
            ...phase,
            status: 'completed',
            stars: Math.max(phase.stars, stars)
          };
        }
        if (idx === phaseId && phase.status === 'locked') {
          return {
            ...phase,
            status: 'available'
          };
        }
        return phase;
      });
    });

    // Schedule walking animation from the completed phase to the next unlocked phase
    const nextPhaseId = phaseId + 1;
    if (nextPhaseId <= phases.length) {
      setWalkingTransition({ fromPhaseId: phaseId, toPhaseId: nextPhaseId });
    }
  };

  const handleOpenChest = (chestId: string, rewardGems: number) => {
    setGems(prev => prev + rewardGems);
    setChests(prev => prev.map(c => c.id === chestId ? { ...c, isOpened: true } : c));
  };

  const handleCompleteAcademyLesson = (lessonId: string, rewardGems: number) => {
    if (!completedAcademyLessonIds.includes(lessonId)) {
      setCompletedAcademyLessonIds(prev => [...prev, lessonId]);
      setGems(prev => prev + rewardGems);
    }
  };

  const handleNextPhase = () => {
    const currentIndex = phases.findIndex(p => p.id === selectedPhaseId);
    if (currentIndex >= 0 && currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      setSelectedPhaseId(nextPhase.id);
      setWalkingTransition({ fromPhaseId: selectedPhaseId, toPhaseId: nextPhase.id });
    }
    // Return to map so the child watches AstroBot walk along the trail and cheer!
    setActiveView('map');
  };

  const handleResetProgress = () => {
    localStorage.removeItem('codecraft_phases');
    localStorage.removeItem('codecraft_chests');
    localStorage.removeItem('codecraft_gems');
    localStorage.removeItem('codecraft_streak');
    localStorage.removeItem('codecraft_academy_lessons');
    localStorage.removeItem('codecraft_student_name');
    localStorage.removeItem('codecraft_student_badge');
    localStorage.removeItem('codecraft_locale');
    setPhases(INITIAL_PHASES);
    setChests(INITIAL_CHESTS);
    setGems(65);
    setStreak(3);
    setStudentName('Cadet Oliver');
    setStudentBadge('🚀');
    setLocale('en-GB');
    setCompletedAcademyLessonIds([]);
    setSelectedPhaseId(1);
    setActiveView('map');
  };

  const handleToggleMute = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const activePhase = phases.find(p => p.id === selectedPhaseId) || phases[0];
  const hasNextPhase = phases.some(p => p.id === selectedPhaseId + 1);
  const completedStagesCount = phases.filter(p => p.status === 'completed').length;
  const totalStars = phases.reduce((acc, p) => acc + p.stars, 0);

  return (
    <div className="min-h-screen bg-[#080518] font-['Nunito',sans-serif] text-white">
      {activeView === 'map' && (
        <CosmicMapScreen
          phases={phases}
          chests={chests}
          gems={gems}
          streak={streak}
          studentName={studentName}
          studentBadge={studentBadge}
          locale={locale}
          onChangeLocale={(newLoc) => setLocale(newLoc)}
          onOpenProfileModal={() => setShowProfileModal(true)}
          onSelectPhase={handleSelectPhase}
          onOpenChest={handleOpenChest}
          onOpenSandbox={() => setActiveView('sandbox')}
          onOpenGuide={() => setShowGuideModal(true)}
          onOpenAcademy={() => setShowAcademyModal(true)}
          onOpenCertificate={(unit) => setSelectedUnitForCertificate(unit)}
          onResetProgress={handleResetProgress}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          walkingTransition={walkingTransition}
          onClearWalkingTransition={() => setWalkingTransition(null)}
        />
      )}

      {activeView === 'level' && (
        <LevelScreen
          phase={activePhase}
          studentName={studentName}
          locale={locale}
          onBackToMap={() => setActiveView('map')}
          onCompletePhase={handleCompletePhase}
          onNextPhase={handleNextPhase}
          hasNextPhase={hasNextPhase}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {activeView === 'sandbox' && (
        <LevelSandbox
          onBackToMap={() => setActiveView('map')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {showGuideModal && (
        <InstructionsModal onClose={() => setShowGuideModal(false)} />
      )}

      {showAcademyModal && (
        <AstroBotAcademyModal
          completedLessonIds={completedAcademyLessonIds}
          onCompleteLesson={handleCompleteAcademyLesson}
          onClose={() => setShowAcademyModal(false)}
        />
      )}

      {selectedUnitForCertificate && (
        <CertificateModal
          unit={selectedUnitForCertificate}
          phases={phases}
          studentName={studentName}
          studentBadge={studentBadge}
          locale={locale}
          onUpdateStudentName={handleUpdateStudentName}
          onClose={() => setSelectedUnitForCertificate(null)}
        />
      )}

      {showProfileModal && (
        <StudentProfileModal
          currentName={studentName}
          currentBadge={studentBadge}
          locale={locale}
          totalStars={totalStars}
          totalGems={gems}
          streak={streak}
          completedStages={completedStagesCount}
          onSaveProfile={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}

