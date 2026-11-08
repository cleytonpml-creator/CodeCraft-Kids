/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PhaseStatus = 'locked' | 'available' | 'completed';

export interface PhaseModel {
  id: number;
  unitId: number;
  unitTitle: string;
  weekNumber: number;
  title: string;
  subtitle: string;
  description: string;
  concept: string; // e.g. "Sequência Básica", "Desvios e Obstáculos", "Laços de Repetição"
  status: PhaseStatus;
  stars: number;
  unlockedStarsRequired?: number;
  gridSize: { width: number; height: number };
  startPos: { x: number; y: number; dir: Direction };
  targetPos: { x: number; y: number };
  obstacles?: Array<{ x: number; y: number }>;
  crystals?: Array<{ x: number; y: number; id: string }>;
  allowedBlocks: BlockType[];
  parStars: {
    three: number; // max blocks for 3 stars
    two: number;   // max blocks for 2 stars
  };
  tutorialHint?: string;
  rewardGems: number;
  codeModeRecommended?: boolean;
}

export interface UnitModel {
  id: number;
  number: number;
  weekTitle: string;
  title: string;
  subtitle: string;
  description: string;
  colorTheme: 'emerald' | 'cyan' | 'indigo' | 'fuchsia' | 'amber' | 'teal' | 'violet' | 'rose' | 'sky' | 'gold';
  certificate: {
    title: string;
    specialty: string;
    skillsLearned: string[];
    badgeIcon: string;
    levelRange: string;
  };
  guidebook: {
    title: string;
    tips: Array<{
      title: string;
      description: string;
      codeExample?: string;
      iconName: string;
    }>;
  };
}

export type TrailNodeType = 'level' | 'chest' | 'trophy' | 'certificate';

export interface ChestModel {
  id: string;
  unitId: number;
  title: string;
  rewardGems: number;
  isOpened: boolean;
  requiredPhaseIdToUnlock: number;
}

export type Direction = 'up' | 'right' | 'down' | 'left';

export type BlockType = 
  | 'move_forward'
  | 'turn_right'
  | 'turn_left'
  | 'move_backward'
  | 'collect_crystal'
  | 'repeat_2x'
  | 'repeat_3x'
  | 'repeat_4x';

export interface CodeBlock {
  id: string;
  type: BlockType;
  label: string;
  iconName: string;
  color: string;
  borderColor: string;
  subBlocks?: CodeBlock[];
  repeatCount?: number;
}

export interface ExecutionState {
  isRunning: boolean;
  isPaused: boolean;
  currentStepIndex: number;
  robotPos: { x: number; y: number; dir: Direction };
  collectedCrystalIds: string[];
  energyTrail: Array<{ x: number; y: number }>;
  executionSpeedMs: number;
}

export interface GamificationState {
  gems: number;
  streak: number;
  studentName: string;
  openedChestIds: string[];
  completedAcademyLessonIds: string[];
}

export interface AcademyLesson {
  id: string;
  number: number;
  title: string;
  tagline: string;
  icon: string;
  category: 'fundamentos' | 'direcoes' | 'logica' | 'loops' | 'debug' | 'code_writing' | 'functions';
  astroBotSpeech: string;
  content: {
    story: string;
    keyConcept: string;
    codeSnippet?: string;
    visualTip: string;
    funFact: string;
    interactiveQuestion: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  };
  rewardGems: number;
}
