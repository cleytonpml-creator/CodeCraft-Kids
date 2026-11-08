/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Trash2, 
  StepForward, 
  Star, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Lightbulb, 
  Compass, 
  Repeat,
  PlusCircle,
  X,
  Clock
} from 'lucide-react';
import { PhaseModel, CodeBlock, BlockType, Direction } from '../types/game';
import { BLOCK_DEFINITIONS } from '../utils/levels';
import { soundManager } from '../utils/audio';
import { calculateHint, HintResult } from '../utils/solver';
import { CodeEditorPanel } from './CodeEditorPanel';
import { codeToBlocksAndSteps, blocksToCode } from '../utils/codeParser';
import { Terminal, Code, Cpu } from 'lucide-react';
import { speechManager } from '../utils/speech';
import { 
  Locale, 
  UI_TRANSLATIONS, 
  BLOCK_TRANSLATIONS, 
  buildAudioSpeechText, 
  getLocalizedPhase 
} from '../utils/i18n';

interface LevelScreenProps {
  phase: PhaseModel;
  studentName?: string;
  locale?: Locale;
  onBackToMap: () => void;
  onCompletePhase: (phaseId: number, stars: number) => void;
  onNextPhase?: () => void;
  hasNextPhase: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const LevelScreen: React.FC<LevelScreenProps> = ({
  phase,
  studentName,
  locale = 'en-GB',
  onBackToMap,
  onCompletePhase,
  onNextPhase,
  hasNextPhase,
  isMuted,
  onToggleMute
}) => {
  const currentLocale: Locale = locale;
  const t = UI_TRANSLATIONS[currentLocale];
  const localizedPhase = getLocalizedPhase(phase, currentLocale);
  const cadetName = studentName || (currentLocale === 'en-GB' ? 'Cadet Leo' : 'Cadete Espacial');

  // Audio Speech state for non-readers
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = speechManager.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      unsub();
      speechManager.stop();
    };
  }, []);

  const handleToggleSpeech = () => {
    recordActivity();
    if (isSpeaking) {
      speechManager.stop();
    } else {
      soundManager.playClick();
      const textToSpeak = buildAudioSpeechText(phase, cadetName, currentLocale);
      speechManager.speak(textToSpeak, currentLocale);
    }
  };

  // Mode: Blocks vs Text Code Editor
  const [editorMode, setEditorMode] = useState<'blocks' | 'code'>(() => {
    return phase.codeModeRecommended ? 'code' : 'blocks';
  });
  const [codeText, setCodeText] = useState<string>(() => {
    return currentLocale === 'en-GB' 
      ? '// Type your cosmic commands here!\nmoveForward();\n'
      : '// Digite seus comandos espaciais aqui!\navancar();\n';
  });
  const [activeCodeLine, setActiveCodeLine] = useState<number | null>(null);
  const [codeParseError, setCodeParseError] = useState<{ message: string; line?: number; suggestion?: string } | undefined>(undefined);

  // Robot spatial state
  const [robotPos, setRobotPos] = useState<{ x: number; y: number; dir: Direction }>(phase.startPos);
  const [draggedBlocks, setDraggedBlocks] = useState<CodeBlock[]>([]);
  const [collectedCrystals, setCollectedCrystals] = useState<string[]>([]);
  const [visitedCells, setVisitedCells] = useState<Array<{ x: number; y: number }>>([
    { x: phase.startPos.x, y: phase.startPos.y }
  ]);


  // Execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [executionSpeed, setExecutionSpeed] = useState<number>(550); // ms per step
  const [statusMessage, setStatusMessage] = useState<string>('Monte sua sequência de blocos e clique em Executar!');
  
  // Outcome Modals
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [failReason, setFailReason] = useState<string>('');

  // 30-Second Inactivity Hint System
  const [showHintButton, setShowHintButton] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [hintResult, setHintResult] = useState<HintResult | null>(null);
  const [highlightedBlockType, setHighlightedBlockType] = useState<BlockType | null>(null);
  const [inactiveSeconds, setInactiveSeconds] = useState<number>(0);

  const lastActivityTimestamp = useRef<number>(Date.now());
  const executionCancelledRef = useRef<boolean>(false);

  // Record user activity to reset inactivity counter
  const recordActivity = useCallback(() => {
    lastActivityTimestamp.current = Date.now();
    setInactiveSeconds(0);
  }, []);

  // Timer loop checking 30 seconds of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      // Do not count inactivity during active code run or end game modals
      if (isRunning || showVictoryModal || showFailModal) {
        lastActivityTimestamp.current = Date.now();
        setInactiveSeconds(0);
        return;
      }

      const elapsedSec = Math.floor((Date.now() - lastActivityTimestamp.current) / 1000);
      setInactiveSeconds(elapsedSec);

      // Show hint button after 30 seconds of inactivity
      if (elapsedSec >= 30) {
        setShowHintButton(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, showVictoryModal, showFailModal]);

  // Reset level when phase changes
  useEffect(() => {
    resetLevel();
    setShowHintButton(false);
    setShowHintModal(false);
    setHighlightedBlockType(null);
    lastActivityTimestamp.current = Date.now();
    setInactiveSeconds(0);
    setEditorMode(phase.codeModeRecommended ? 'code' : 'blocks');
    setActiveCodeLine(null);
    setCodeParseError(undefined);
    if (phase.codeModeRecommended) {
      setCodeText('// Código do AstroBot 🚀\navancar();\n');
    }
  }, [phase.id]);

  const resetLevel = () => {
    executionCancelledRef.current = true;
    setIsRunning(false);
    setActiveStepIndex(null);
    setActiveCodeLine(null);
    setCodeParseError(undefined);
    setRobotPos(phase.startPos);
    setCollectedCrystals([]);
    setVisitedCells([{ x: phase.startPos.x, y: phase.startPos.y }]);
    setShowVictoryModal(false);
    setShowFailModal(false);
    setStatusMessage('Robô reposicionado no ponto de partida.');
    recordActivity();
  };

  // Switch between Blocks mode and Code Editor mode
  const handleSwitchToCode = () => {
    if (isRunning) return;
    soundManager.playClick();
    if (draggedBlocks.length > 0) {
      setCodeText(blocksToCode(draggedBlocks));
    }
    setEditorMode('code');
  };

  const handleSwitchToBlocks = () => {
    if (isRunning) return;
    soundManager.playClick();
    const res = codeToBlocksAndSteps(codeText);
    if (!res.error && res.blocks.length > 0) {
      setDraggedBlocks(res.blocks);
    }
    setEditorMode('blocks');
  };

  const handleSyncCodeToBlocks = () => {
    const res = codeToBlocksAndSteps(codeText);
    if (res.error) {
      soundManager.playFail();
      setCodeParseError({
        message: res.error,
        line: res.errorLine,
        suggestion: res.suggestion
      });
      setStatusMessage(`Ops! ${res.error}`);
    } else {
      soundManager.playVictory();
      setDraggedBlocks(res.blocks);
      setEditorMode('blocks');
      setStatusMessage(`Sincronizado! ${res.blocks.length} blocos gerados a partir do seu código.`);
    }
  };

  const handleApplyCodeFix = (suggestion: string) => {
    soundManager.playClick();
    if (codeParseError && codeParseError.line) {
      const lines = codeText.split('\n');
      const targetIdx = codeParseError.line - 1;
      if (targetIdx >= 0 && targetIdx < lines.length) {
        lines[targetIdx] = suggestion;
        setCodeText(lines.join('\n'));
        setCodeParseError(undefined);
        return;
      }
    }
    setCodeText(prev => `${prev}\n${suggestion}`);
    setCodeParseError(undefined);
  };

  // Add block to queue
  const handleAddBlock = (blockType: BlockType) => {
    if (isRunning) return;
    recordActivity();
    soundManager.playClick();

    // If adding the suggested block, clear the highlight
    if (highlightedBlockType === blockType) {
      setHighlightedBlockType(null);
    }

    const def = BLOCK_DEFINITIONS[blockType];
    const newBlock: CodeBlock = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: blockType,
      label: def.label,
      iconName: def.iconName,
      color: def.color,
      borderColor: def.borderColor,
      repeatCount: 'repeatCount' in def ? def.repeatCount : undefined
    };
    setDraggedBlocks(prev => {
      const nextBlocks = [...prev, newBlock];
      setCodeText(blocksToCode(nextBlocks));
      return nextBlocks;
    });
  };

  // Remove block from queue
  const handleRemoveBlock = (index: number) => {
    if (isRunning) return;
    recordActivity();
    soundManager.playClick();
    setDraggedBlocks(prev => {
      const nextBlocks = prev.filter((_, i) => i !== index);
      setCodeText(blocksToCode(nextBlocks));
      return nextBlocks;
    });
  };

  // Clear all blocks
  const handleClearBlocks = () => {
    if (isRunning) return;
    recordActivity();
    soundManager.playClick();
    setDraggedBlocks([]);
    setStatusMessage('Blocos limpos. Adicione novos comandos!');
  };

  // Open the Hint Modal and calculate the best next block
  const handleOpenHint = () => {
    recordActivity();
    soundManager.playClick();
    const hint = calculateHint(phase, draggedBlocks);
    setHintResult(hint);
    if (hint.suggestedBlock) {
      setHighlightedBlockType(hint.suggestedBlock);
    }
    setShowHintModal(true);
  };

  // Automatically insert the suggested block from the hint modal
  const handleInsertSuggestedBlock = () => {
    if (!hintResult?.suggestedBlock) return;
    handleAddBlock(hintResult.suggestedBlock);
    setShowHintModal(false);
    soundManager.playCollect();
    setStatusMessage(`Bloco "${hintResult.blockDefinition?.label}" adicionado com a ajuda do AstroBot!`);
  };

  // Calculate direction shifts
  const getNextPosition = (
    current: { x: number; y: number; dir: Direction }, 
    action: 'forward' | 'backward'
  ) => {
    let dx = 0;
    let dy = 0;
    const factor = action === 'forward' ? 1 : -1;

    switch (current.dir) {
      case 'up':
        dy = 1 * factor;
        break;
      case 'down':
        dy = -1 * factor;
        break;
      case 'right':
        dx = 1 * factor;
        break;
      case 'left':
        dx = -1 * factor;
        break;
    }

    return {
      x: current.x + dx,
      y: current.y + dy,
      dir: current.dir
    };
  };

  const getRotatedDirection = (currentDir: Direction, turn: 'right' | 'left'): Direction => {
    const clockwiseOrder: Direction[] = ['up', 'right', 'down', 'left'];
    const idx = clockwiseOrder.indexOf(currentDir);
    return turn === 'right' ? clockwiseOrder[(idx + 1) % 4] : clockwiseOrder[(idx + 3) % 4];
  };

  // Check if position is an obstacle
  const isObstacle = (x: number, y: number) => {
    return (phase.obstacles || []).some(obs => obs.x === x && obs.y === y);
  };

  // Run the code sequence
  const runCode = async () => {
    if (isRunning) return;

    recordActivity();
    soundManager.playClick();

    // Prepare execution queue depending on active mode
    let executionQueue: Array<{
      blockType: BlockType;
      originalIndex?: number;
      lineNumber?: number;
    }> = [];

    if (editorMode === 'code') {
      const parseRes = codeToBlocksAndSteps(codeText);
      if (parseRes.error) {
        soundManager.playFail();
        setCodeParseError({
          message: parseRes.error,
          line: parseRes.errorLine,
          suggestion: parseRes.suggestion
        });
        setStatusMessage(`Ops! ${parseRes.error}`);
        return;
      }
      setCodeParseError(undefined);
      if (parseRes.steps.length === 0) {
        setStatusMessage('Digite pelo menos 1 comando no editor antes de executar!');
        return;
      }
      // Update blocks representation
      setDraggedBlocks(parseRes.blocks);
      executionQueue = parseRes.steps.map((st, i) => ({
        blockType: st.type,
        originalIndex: i,
        lineNumber: st.lineNumber
      }));
    } else {
      if (draggedBlocks.length === 0) {
        setStatusMessage('Adicione pelo menos 1 bloco antes de executar!');
        return;
      }
      draggedBlocks.forEach((b, origIdx) => {
        if (b.type.startsWith('repeat_') && b.repeatCount) {
          for (let r = 0; r < b.repeatCount; r++) {
            executionQueue.push({ blockType: b.type, originalIndex: origIdx });
          }
        } else {
          executionQueue.push({ blockType: b.type, originalIndex: origIdx });
        }
      });
    }

    setIsRunning(true);
    executionCancelledRef.current = false;
    setStatusMessage('Executando os comandos programados...');

    let currentPos = { ...phase.startPos };
    setRobotPos(currentPos);
    setVisitedCells([{ x: currentPos.x, y: currentPos.y }]);
    let currentCollected = [...collectedCrystals];

    for (let i = 0; i < executionQueue.length; i++) {
      if (executionCancelledRef.current) {
        setIsRunning(false);
        setActiveStepIndex(null);
        setActiveCodeLine(null);
        return;
      }

      const item = executionQueue[i];
      if (item.originalIndex !== undefined) {
        setActiveStepIndex(item.originalIndex);
      }
      if (item.lineNumber !== undefined) {
        setActiveCodeLine(item.lineNumber);
      }

      await new Promise(res => setTimeout(res, executionSpeed));

      if (executionCancelledRef.current) break;

      const blockType = item.blockType;

      if (blockType === 'move_forward' || blockType.startsWith('repeat_')) {
        const next = getNextPosition(currentPos, 'forward');

        if (next.x < 0 || next.x >= phase.gridSize.width || next.y < 0 || next.y >= phase.gridSize.height) {
          soundManager.playFail();
          setFailReason(`Ops! O AstroBot tentou sair da placa de circuito na posição (${next.x}, ${next.y})!`);
          setShowFailModal(true);
          setIsRunning(false);
          setActiveStepIndex(null);
          setActiveCodeLine(null);
          return;
        }

        if (isObstacle(next.x, next.y)) {
          soundManager.playFail();
          setFailReason(`Cuidado! O AstroBot bateu em um circuito superaquecido em (${next.x}, ${next.y})!`);
          setShowFailModal(true);
          setIsRunning(false);
          setActiveStepIndex(null);
          setActiveCodeLine(null);
          return;
        }

        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);

      } else if (blockType === 'move_backward') {
        const next = getNextPosition(currentPos, 'backward');

        if (next.x < 0 || next.x >= phase.gridSize.width || next.y < 0 || next.y >= phase.gridSize.height) {
          soundManager.playFail();
          setFailReason(`O AstroBot bateu na borda ao recuar!`);
          setShowFailModal(true);
          setIsRunning(false);
          setActiveStepIndex(null);
          setActiveCodeLine(null);
          return;
        }

        if (isObstacle(next.x, next.y)) {
          soundManager.playFail();
          setFailReason(`O AstroBot recuou direto para um obstáculo!`);
          setShowFailModal(true);
          setIsRunning(false);
          setActiveStepIndex(null);
          setActiveCodeLine(null);
          return;
        }

        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);

      } else if (blockType === 'turn_right') {
        currentPos = {
          ...currentPos,
          dir: getRotatedDirection(currentPos.dir, 'right')
        };
        setRobotPos(currentPos);
        soundManager.playTurn();

      } else if (blockType === 'turn_left') {
        currentPos = {
          ...currentPos,
          dir: getRotatedDirection(currentPos.dir, 'left')
        };
        setRobotPos(currentPos);
        soundManager.playTurn();
      }

      // Automatically collect crystals if stepping on them
      const foundCrystal = (phase.crystals || []).find(
        c => c.x === currentPos.x && c.y === currentPos.y && !currentCollected.includes(c.id)
      );
      if (foundCrystal) {
        currentCollected = [...currentCollected, foundCrystal.id];
        setCollectedCrystals(currentCollected);
        soundManager.playCollect();
      }
    }

    const reachedTarget = currentPos.x === phase.targetPos.x && currentPos.y === phase.targetPos.y;
    const requiredCrystalsCount = (phase.crystals || []).length;
    const allCrystalsCollected = currentCollected.length >= requiredCrystalsCount;

    await new Promise(res => setTimeout(res, 300));
    setActiveStepIndex(null);
    setIsRunning(false);

    if (reachedTarget && allCrystalsCollected) {
      const blockCount = draggedBlocks.length;
      let stars = 1;
      if (blockCount <= phase.parStars.three) {
        stars = 3;
      } else if (blockCount <= phase.parStars.two) {
        stars = 2;
      }
      setEarnedStars(stars);
      setShowVictoryModal(true);
      soundManager.playVictory();

      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {}

      onCompletePhase(phase.id, stars);
      setStatusMessage(`Parabéns! Fase concluída com ${stars} estrela(s)!`);
    } else {
      soundManager.playFail();
      if (!allCrystalsCollected) {
        setFailReason(`Você alcançou o portal, mas esqueceu de recolher todos os ${requiredCrystalsCount} cristais cósmicos!`);
      } else {
        setFailReason(`O robô parou em (${currentPos.x}, ${currentPos.y}), mas o objetivo está em (${phase.targetPos.x}, ${phase.targetPos.y}). Ajuste a rota!`);
      }
      setShowFailModal(true);
    }
  };

  // Step-by-step single block debugger
  const stepOnce = async () => {
    if (isRunning || draggedBlocks.length === 0) return;
    recordActivity();
    soundManager.playClick();
    
    const nextIndex = activeStepIndex === null ? 0 : (activeStepIndex + 1) % draggedBlocks.length;
    setActiveStepIndex(nextIndex);
    const block = draggedBlocks[nextIndex];

    let currentPos = { ...robotPos };
    const blockType = block.type;

    if (blockType === 'move_forward' || blockType.startsWith('repeat_')) {
      const next = getNextPosition(currentPos, 'forward');
      if (next.x >= 0 && next.x < phase.gridSize.width && next.y >= 0 && next.y < phase.gridSize.height && !isObstacle(next.x, next.y)) {
        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);
      } else {
        soundManager.playFail();
      }
    } else if (blockType === 'move_backward') {
      const next = getNextPosition(currentPos, 'backward');
      if (next.x >= 0 && next.x < phase.gridSize.width && next.y >= 0 && next.y < phase.gridSize.height && !isObstacle(next.x, next.y)) {
        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);
      } else {
        soundManager.playFail();
      }
    } else if (blockType === 'turn_right') {
      currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'right') };
      setRobotPos(currentPos);
      soundManager.playTurn();
    } else if (blockType === 'turn_left') {
      currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'left') };
      setRobotPos(currentPos);
      soundManager.playTurn();
    }

    const foundCrystal = (phase.crystals || []).find(
      c => c.x === currentPos.x && c.y === currentPos.y && !collectedCrystals.includes(c.id)
    );
    if (foundCrystal) {
      setCollectedCrystals(prev => [...prev, foundCrystal.id]);
      soundManager.playCollect();
    }
  };

  const getRotationDeg = (dir: Direction) => {
    switch (dir) {
      case 'up': return 0;
      case 'right': return 90;
      case 'down': return 180;
      case 'left': return 270;
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-b from-[#070512] via-[#100B26] to-[#1A163B] text-white flex flex-col items-center"
      onClick={recordActivity}
    >
      {/* Top Level Header */}
      <header className="sticky top-0 z-30 w-full max-w-6xl px-4 py-3 backdrop-blur-md bg-[#130D2B]/85 border-b border-[#00F5D4]/20 flex items-center justify-between gap-4">
        {/* Back Button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              speechManager.stop();
              soundManager.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentLocale === 'en-GB' ? 'Trail' : 'Mapa'}</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#EC4899] uppercase tracking-wider font-mono">
                {currentLocale === 'en-GB' ? `Stage ${phase.id}` : `Fase ${phase.id}`}
              </span>
              <span className="text-slate-500">·</span>
              <h2 className="font-extrabold text-base md:text-lg text-white font-['Outfit']">
                {localizedPhase.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">{localizedPhase.subtitle}</p>
          </div>
        </div>

        {/* Action Controls & Hint Button */}
        <div className="flex items-center gap-3">
          {/* Target Par Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>3★: ≤{phase.parStars.three} {currentLocale === 'en-GB' ? 'blocks' : 'blocos'}</span>
          </div>

          {/* DICA BUTTON: Appears after 30 seconds of inactivity */}
          {showHintButton && (
            <button
              onClick={handleOpenHint}
              title={currentLocale === 'en-GB' ? 'Click to see hint for the next block!' : 'Clique para ver a dica do próximo bloco!'}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-bounce cursor-pointer border border-yellow-200"
            >
              <Lightbulb className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{currentLocale === 'en-GB' ? 'Hint' : 'Dica'}</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
              </span>
            </button>
          )}

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700 text-xs font-bold">
            <button
              onClick={() => {
                recordActivity();
                setExecutionSpeed(600);
              }}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${executionSpeed === 600 ? 'bg-[#00F5D4] text-black' : 'text-slate-400 hover:text-white'}`}
            >
              1x
            </button>
            <button
              onClick={() => {
                recordActivity();
                setExecutionSpeed(350);
              }}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${executionSpeed === 350 ? 'bg-[#00F5D4] text-black' : 'text-slate-400 hover:text-white'}`}
            >
              2x
            </button>
            <button
              onClick={() => {
                recordActivity();
                setExecutionSpeed(180);
              }}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${executionSpeed === 180 ? 'bg-[#00F5D4] text-black' : 'text-slate-400 hover:text-white'}`}
            >
              3x
            </button>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>
        </div>
      </header>

      {/* INACTIVITY HINT PROMPT BANNER (Shown when hint button is available) */}
      {showHintButton && (
        <div className="w-full max-w-6xl px-4 pt-3">
          <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border-2 border-amber-400/50 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-lg shadow-amber-500/10 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                <Lightbulb className="w-5 h-5 fill-slate-950 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider font-['Outfit']">
                    {t.needHint}
                  </span>
                  <span className="text-[10px] text-amber-200/80 font-mono">(30s)</span>
                </div>
                <p className="text-xs text-slate-200">
                  {t.inactivityHintText}
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenHint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 fill-slate-950" />
              <span>{t.viewNextBlock}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Game Arena */}
      <main className="w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6">
        {/* LEFT COLUMN: The Cosmic Grid Board & Objective (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Mission Objective Card with Audio Read-Aloud Button for non-readers */}
          <div className="bg-[#130D2B]/90 border border-[#00F5D4]/30 rounded-2xl p-4 flex flex-col gap-2.5 shadow-lg relative overflow-hidden">
            {/* Top row: Mission info + Audio Play Button */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/15 border border-[#00F5D4]/40 flex items-center justify-center text-[#00F5D4] shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#00F5D4] uppercase tracking-wider">
                      {t.missionObjective}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      · {currentLocale === 'en-GB' ? 'Cadet' : 'Cadete'} {cadetName}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-100 font-semibold leading-snug">
                    {localizedPhase.description}
                  </p>
                </div>
              </div>

              {/* AUDIO PLAY BUTTON (For children who cannot read yet) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-black text-xs transition-all shadow-md cursor-pointer border ${
                    isSpeaking
                      ? 'bg-amber-400 border-amber-200 text-slate-950 shadow-amber-400/40 ring-2 ring-amber-300'
                      : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-[#00F5D4] hover:from-emerald-300 hover:to-[#00F5D4] text-slate-950 border-[#00F5D4]/50 hover:scale-105 active:scale-95'
                  }`}
                  title={isSpeaking ? t.stopVoice : t.listenMission}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 fill-slate-950 shrink-0" />
                      <span className="hidden sm:inline">{t.stopVoice}</span>
                      {/* Animated Sound Wave Bars */}
                      <span className="flex items-end gap-0.5 h-3 ml-0.5">
                        <span className="w-0.5 h-3 bg-slate-950 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-1.5 bg-slate-950 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-3 bg-slate-950 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-slate-950 shrink-0" />
                      <span className="font-black">{t.listenMission}</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Active Speech Indicator & AstroBot Voice Status */}
            {isSpeaking && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-400/40 text-xs text-cyan-200 animate-fade-in">
                <span className="text-sm">🤖</span>
                <span className="font-bold flex-1 truncate">
                  {currentLocale === 'en-GB' 
                    ? `AstroBot is reading the mission instructions to Cadet ${cadetName}...`
                    : `O AstroBot está lendo a missão em voz alta para o Cadete ${cadetName}...`}
                </span>
                <button
                  type="button"
                  onClick={() => speechManager.stop()}
                  className="text-[10px] text-amber-300 hover:underline uppercase font-bold"
                >
                  {t.stopVoice}
                </button>
              </div>
            )}

            {/* Tutorial Hint if present */}
            {localizedPhase.tutorialHint && (
              <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-500/30 px-3 py-1.5 rounded-xl text-indigo-300 text-xs">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{localizedPhase.tutorialHint}</span>
              </div>
            )}
          </div>


          {/* The Microchip Grid Canvas */}
          <div className="relative bg-[#070512] border-2 border-indigo-900/60 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            {/* Background PCB Grid Lines */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #00F5D4 1px, transparent 1px), linear-gradient(to bottom, #00F5D4 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            {/* Grid Container */}
            <div className="relative flex flex-col items-center">
              {/* Y Axis Numbers on Left */}
              <div className="flex items-center">
                <div 
                  className="flex flex-col justify-around pr-2 text-xs font-mono text-slate-500 font-bold"
                  style={{ height: `${phase.gridSize.height * 64}px` }}
                >
                  {Array.from({ length: phase.gridSize.height }, (_, i) => {
                    const y = phase.gridSize.height - 1 - i;
                    return <span key={y} className="text-center w-4">Y{y}</span>;
                  })}
                </div>

                {/* Grid Cells Matrix */}
                <div 
                  className="grid gap-2 border-2 border-[#00F5D4]/30 p-2 rounded-2xl bg-[#0F0B24]/90 shadow-inner"
                  style={{
                    gridTemplateColumns: `repeat(${phase.gridSize.width}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: phase.gridSize.height }, (_, rowIndex) => {
                    const y = phase.gridSize.height - 1 - rowIndex;

                    return Array.from({ length: phase.gridSize.width }, (_, x) => {
                      const isCurrentPos = robotPos.x === x && robotPos.y === y;
                      const isTarget = phase.targetPos.x === x && phase.targetPos.y === y;
                      const isObs = isObstacle(x, y);
                      const crystal = (phase.crystals || []).find(c => c.x === x && c.y === y);
                      const isCrystalCollected = crystal && collectedCrystals.includes(crystal.id);
                      const wasVisited = visitedCells.some(cell => cell.x === x && cell.y === y);

                      return (
                        <div
                          key={`cell_${x}_${y}`}
                          className={`
                            relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-200
                            border
                            ${wasVisited ? 'bg-[#00F5D4]/5 border-[#00F5D4]/30' : 'bg-[#150F33]/60 border-slate-800/80'}
                            ${isObs ? 'bg-rose-950/40 border-rose-500/50' : ''}
                            ${isTarget ? 'bg-indigo-900/40 border-[#00F5D4]' : ''}
                          `}
                        >
                          <span className="absolute bottom-1 right-1 text-[9px] font-mono text-slate-600 select-none">
                            {x},{y}
                          </span>

                          {/* Obstacle Warning Tile */}
                          {isObs && (
                            <div className="flex flex-col items-center justify-center animate-pulse">
                              <Flame className="w-5 h-5 text-rose-400" />
                              <span className="text-[8px] font-bold text-rose-400 uppercase">Perigo</span>
                            </div>
                          )}

                          {/* Target Crystal / Warp Core */}
                          {isTarget && !isObs && (
                            <div className="relative flex flex-col items-center justify-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00F5D4] shadow-[0_0_15px_#00F5D4] animate-pulse">
                                <img 
                                  src="/src/assets/images/cosmic_crystal_core_1793697090418.jpg" 
                                  alt="Cristal" 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                          )}

                          {/* Intermediate Crystals */}
                          {crystal && !isTarget && !isCrystalCollected && (
                            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-400 shadow-[0_0_10px_#F59E0B] animate-bounce">
                              <img 
                                src="/src/assets/images/cosmic_crystal_core_1793697090418.jpg" 
                                alt="Cristal" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}

                          {/* AstroBot Representation */}
                          {isCurrentPos && (
                            <div 
                              className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 ease-out"
                              style={{
                                transform: `rotate(${getRotationDeg(robotPos.dir)}deg)`
                              }}
                            >
                              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#00F5D4] shadow-[0_0_20px_#00F5D4] overflow-hidden bg-[#070512]">
                                <img 
                                  src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                                  alt="AstroBot"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="absolute -top-2 w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-[#00F5D4] drop-shadow-[0_0_5px_#00F5D4]" />
                            </div>
                          )}
                        </div>
                      );
                    });
                  })}
                </div>
              </div>

              {/* X Axis Numbers on Bottom */}
              <div 
                className="grid gap-2 pl-6 pt-2 text-xs font-mono text-slate-500 font-bold"
                style={{
                  gridTemplateColumns: `repeat(${phase.gridSize.width}, minmax(0, 1fr))`,
                  width: `${phase.gridSize.width * 64}px`
                }}
              >
                {Array.from({ length: phase.gridSize.width }, (_, x) => (
                  <span key={x} className="text-center">X{x}</span>
                ))}
              </div>
            </div>

            {/* Live Robot HUD Status */}
            <div className="mt-4 flex flex-wrap items-center justify-between w-full max-w-md bg-[#130D2B]/90 border border-slate-700/80 px-4 py-2 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Posição:</span>
                <span className="font-mono text-[#00F5D4] font-bold">({robotPos.x}, {robotPos.y})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Apontando:</span>
                <span className="font-bold uppercase text-white bg-slate-800 px-2 py-0.5 rounded-md">
                  {robotPos.dir === 'up' && '↑ Norte'}
                  {robotPos.dir === 'right' && '→ Leste'}
                  {robotPos.dir === 'down' && '↓ Sul'}
                  {robotPos.dir === 'left' && '← Oeste'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Alvo:</span>
                <span className="font-mono text-amber-400 font-bold">({phase.targetPos.x}, {phase.targetPos.y})</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Code Blocks Toolbox / Code Editor & Execution Queue (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* TAB SWITCHER: Modo Blocos vs Digitar Código */}
          <div className="flex items-center justify-between bg-[#110B29] p-1.5 rounded-2xl border border-indigo-900/80 shadow-md">
            <div className="flex items-center gap-1.5 w-full">
              <button
                type="button"
                disabled={isRunning}
                onClick={handleSwitchToBlocks}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  editorMode === 'blocks'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🧩 Modo Blocos</span>
              </button>

              <button
                type="button"
                disabled={isRunning}
                onClick={handleSwitchToCode}
                className={`relative flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  editorMode === 'code'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-black shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t.codeMode}</span>
                {phase.codeModeRecommended && (
                  <span className="absolute -top-2 -right-1 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
                    {currentLocale === 'en-GB' ? 'Recommended!' : 'Recomendado!'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* CODE EDITOR VIEW */}
          {editorMode === 'code' && (
            <div className="flex flex-col gap-3 flex-1">
              <CodeEditorPanel
                code={codeText}
                onChangeCode={(newCode) => {
                  setCodeText(newCode);
                  setCodeParseError(undefined);
                  recordActivity();
                }}
                activeLine={activeCodeLine}
                isRunning={isRunning}
                parseError={codeParseError}
                onApplyFix={handleApplyCodeFix}
                onClearCode={() => {
                  setCodeText('');
                  setCodeParseError(undefined);
                  recordActivity();
                }}
                onSyncToBlocks={handleSyncCodeToBlocks}
                totalStepsCount={codeToBlocksAndSteps(codeText).steps.length}
              />
            </div>
          )}

          {/* BLOCKS VIEW */}
          {editorMode === 'blocks' && (
            <>
              {/* Action Blocks Toolbox */}
              <div className="bg-[#130D2B]/85 border border-[#00F5D4]/30 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-['Outfit']">
                      {t.toolbox}
                    </span>
                    <span className="text-[11px] text-slate-400">· {currentLocale === 'en-GB' ? 'Tap to add' : 'Toque para adicionar'}</span>
                  </div>

                  {/* Inactivity mini indicator */}
                  {!showHintButton && inactiveSeconds > 10 && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{currentLocale === 'en-GB' ? `Hint in ${30 - inactiveSeconds}s` : `Dica em ${30 - inactiveSeconds}s`}</span>
                    </div>
                  )}
                </div>

                {/* Block Buttons Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {phase.allowedBlocks.map(blockType => {
                    const def = BLOCK_DEFINITIONS[blockType];
                    const isSuggested = highlightedBlockType === blockType;
                    const bTrans = BLOCK_TRANSLATIONS[currentLocale][blockType];
                    const label = bTrans?.label || def.label;
                    const desc = bTrans?.desc || def.desc;

                    return (
                      <button
                        key={blockType}
                        disabled={isRunning}
                        onClick={() => handleAddBlock(blockType)}
                        className={`
                          relative flex items-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all text-left shadow-sm
                          ${def.color} ${def.borderColor} hover:scale-[1.02] active:scale-[0.98]
                          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                          ${isSuggested ? 'ring-4 ring-amber-400 shadow-[0_0_25px_#F59E0B] scale-105' : ''}
                        `}
                      >
                        {/* Suggested Block Badge */}
                        {isSuggested && (
                          <span className="absolute -top-2.5 right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce z-20">
                            <Lightbulb className="w-2.5 h-2.5 fill-slate-950" />
                            <span>{currentLocale === 'en-GB' ? 'Hint!' : 'Dica!'}</span>
                          </span>
                        )}

                        <div className="p-1 rounded-lg bg-black/20 shrink-0">
                          {blockType === 'move_forward' && <ArrowUp className="w-4 h-4" />}
                          {blockType === 'turn_right' && <RotateCw className="w-4 h-4" />}
                          {blockType === 'turn_left' && <RotateCcw className="w-4 h-4" />}
                          {blockType === 'move_backward' && <ArrowDown className="w-4 h-4" />}
                          {blockType.startsWith('repeat_') && <Repeat className="w-4 h-4" />}
                          {blockType === 'collect_crystal' && <Sparkles className="w-4 h-4" />}
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="leading-tight truncate">{label}</span>
                          <span className="text-[9px] text-white/70 font-normal leading-tight truncate">{desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Program Code Queue / Timeline */}
              <div className="flex-1 bg-[#130D2B]/85 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex flex-col min-h-[260px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.programQueue}
                    </span>
                    <span className="bg-slate-800 text-teal-300 font-mono text-xs px-2 py-0.5 rounded-md font-bold">
                      {draggedBlocks.length} {currentLocale === 'en-GB' ? (draggedBlocks.length === 1 ? 'block' : 'blocks') : (draggedBlocks.length === 1 ? 'bloco' : 'blocos')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {showHintButton && (
                      <button
                        disabled={isRunning}
                        onClick={handleOpenHint}
                        className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-400/40 font-bold transition-all cursor-pointer"
                      >
                        <Lightbulb className="w-3 h-3 fill-amber-300" />
                        <span>{currentLocale === 'en-GB' ? 'Hint' : 'Dica'}</span>
                      </button>
                    )}

                    {draggedBlocks.length > 0 && (
                      <button
                        disabled={isRunning}
                        onClick={handleClearBlocks}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.clear}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* List of Dragged Blocks */}
                <div className="flex-1 overflow-y-auto py-3 space-y-2 max-h-[280px] pr-1">
                  {draggedBlocks.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
                      <Compass className="w-8 h-8 mb-2 text-slate-600" />
                      <p className="text-xs font-semibold text-slate-400">{t.emptyQueue}</p>
                      <p className="text-[11px] mt-1">{t.dragOrClickHint}</p>
                    </div>
                  ) : (
                    draggedBlocks.map((block, index) => {
                      const isActive = activeStepIndex === index;
                      const def = BLOCK_DEFINITIONS[block.type];
                      const bTrans = BLOCK_TRANSLATIONS[currentLocale][block.type];
                      const label = bTrans?.label || block.label;

                      return (
                        <div
                          key={block.id}
                          className={`
                            flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200
                            ${def.color} ${def.borderColor}
                            ${isActive ? 'ring-4 ring-[#00F5D4] scale-[1.03] shadow-[0_0_20px_#00F5D4]' : 'shadow-sm'}
                          `}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs bg-black/30 w-6 h-6 rounded-lg flex items-center justify-center font-bold">
                              {index + 1}
                            </span>
                            <div className="p-1 rounded-md bg-black/20">
                              {block.type === 'move_forward' && <ArrowUp className="w-4 h-4" />}
                              {block.type === 'turn_right' && <RotateCw className="w-4 h-4" />}
                              {block.type === 'turn_left' && <RotateCcw className="w-4 h-4" />}
                              {block.type === 'move_backward' && <ArrowDown className="w-4 h-4" />}
                              {block.type.startsWith('repeat_') && <Repeat className="w-4 h-4" />}
                              {block.type === 'collect_crystal' && <Sparkles className="w-4 h-4" />}
                            </div>
                            <span className="font-bold text-xs text-white">{label}</span>
                          </div>

                          {!isRunning && (
                            <button
                              onClick={() => handleRemoveBlock(index)}
                              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-black/20 transition-colors cursor-pointer"
                              title={currentLocale === 'en-GB' ? 'Remove block' : 'Remover bloco'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          {/* SHARED STATUS & RUN CONTROL TOOLBAR */}
          <div className="bg-[#130D2B]/90 border border-slate-700/80 rounded-2xl p-3 shadow-lg flex flex-col gap-2">
            <div className="text-[11px] text-slate-300 flex items-center justify-between">
              <span className="truncate">{statusMessage}</span>
              {editorMode === 'code' && (
                <span className="text-[10px] text-cyan-300 font-mono">
                  {currentLocale === 'en-GB' ? 'Code Mode Active' : 'Modo Código Ativo'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  resetLevel();
                }}
                disabled={isRunning}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.reset}</span>
              </button>

              <button
                type="button"
                onClick={stepOnce}
                disabled={isRunning || (editorMode === 'blocks' ? draggedBlocks.length === 0 : codeText.trim().length === 0)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-700/80 hover:bg-indigo-600 text-white font-bold text-xs transition-colors border border-indigo-500/40 cursor-pointer disabled:opacity-50"
                title={currentLocale === 'en-GB' ? 'Execute one command at a time' : 'Executar um comando por vez'}
              >
                <StepForward className="w-4 h-4" />
                <span>{t.stepByStep}</span>
              </button>

              <button
                type="button"
                onClick={runCode}
                disabled={isRunning || (editorMode === 'blocks' ? draggedBlocks.length === 0 : codeText.trim().length === 0)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00F5D4] hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{t.runCode}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* HINT MODAL (Suggests the exact next correct block) */}
      {showHintModal && hintResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#1E1638] via-[#130E26] to-[#0A071A] border-2 border-amber-400 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(251,191,36,0.4)] flex flex-col items-center">
            {/* Close button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHintModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* AstroBot Mascot Avatar with Lightbulb */}
            <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-amber-400 bg-[#070512] shadow-[0_0_20px_#F59E0B] mb-3">
              <img 
                src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                alt="AstroBot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-amber-400 rounded-tl-lg text-slate-950 shadow-md">
                <Lightbulb className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dica do AstroBot</span>
            </div>

            <h3 className="font-extrabold text-xl text-white font-['Outfit'] mb-2">
              {hintResult.title}
            </h3>

            {/* Explanation box */}
            <div className="bg-[#070512]/90 border border-slate-700/80 rounded-2xl p-4 my-3 text-xs text-slate-200 leading-relaxed text-left w-full">
              <p>{hintResult.explanation}</p>
            </div>

            {/* Show Suggested Block card if next_block */}
            {hintResult.type === 'next_block' && hintResult.blockDefinition && (
              <div className="w-full my-2 flex flex-col items-center">
                <span className="text-[11px] text-slate-400 mb-2 font-medium">Bloco sugerido:</span>
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border ${hintResult.blockDefinition.color} ${hintResult.blockDefinition.borderColor} shadow-lg shadow-black/40 ring-2 ring-white/40`}>
                  <div className="p-1 rounded-md bg-black/20">
                    {hintResult.suggestedBlock === 'move_forward' && <ArrowUp className="w-5 h-5" />}
                    {hintResult.suggestedBlock === 'turn_right' && <RotateCw className="w-5 h-5" />}
                    {hintResult.suggestedBlock === 'turn_left' && <RotateCcw className="w-5 h-5" />}
                    {hintResult.suggestedBlock === 'move_backward' && <ArrowDown className="w-5 h-5" />}
                    {hintResult.suggestedBlock?.startsWith('repeat_') && <Repeat className="w-5 h-5" />}
                    {hintResult.suggestedBlock === 'collect_crystal' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <span className="font-black text-sm block leading-tight">{hintResult.blockDefinition.label}</span>
                    <span className="text-[10px] text-white/80 font-normal">{hintResult.blockDefinition.desc}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
              {hintResult.type === 'next_block' && hintResult.suggestedBlock ? (
                <>
                  <button
                    onClick={handleInsertSuggestedBlock}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Adicionar Bloco Automaticamente</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setShowHintModal(false);
                    }}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700 cursor-pointer whitespace-nowrap"
                  >
                    Vou tentar eu mesmo!
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowHintModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#00F5D4] hover:bg-teal-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  Entendi, Obrigado!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VICTORY MODAL */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-gradient-to-b from-[#130D2B] to-[#0A071A] border-2 border-[#00F5D4] rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(0,245,212,0.4)] flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-[#00F5D4] p-1 shadow-lg shadow-emerald-500/40 mb-3 animate-bounce">
              <div className="w-full h-full rounded-xl bg-[#070512] flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#00F5D4]" />
              </div>
            </div>

            <h3 className="font-extrabold text-2xl text-white font-['Outfit']">
              {t.splendidJob}, {cadetName}! 🎉
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">
              {currentLocale === 'en-GB' 
                ? 'AstroBot reached the cosmic energy crystal with sheer brilliance!'
                : 'O AstroBot alcançou o cristal de energia com precisão cósmica!'}
            </p>

            <div className="flex items-center gap-2 my-4 bg-[#070512] px-6 py-3 rounded-2xl border border-amber-500/30">
              {[1, 2, 3].map(starNum => (
                <Star
                  key={starNum}
                  className={`w-8 h-8 transition-all duration-500 ${starNum <= earnedStars ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_10px_#F59E0B]' : 'text-slate-700'}`}
                />
              ))}
            </div>

            <div className="w-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 rounded-xl p-2.5 mb-5 text-xs text-[#00F5D4] font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>
                {currentLocale === 'en-GB' 
                  ? `+${phase.rewardGems} ${t.crystals} · Planet Energy Restored!`
                  : `+${phase.rewardGems} ${t.crystals} · Energia do Planeta restaurada!`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={() => {
                  speechManager.stop();
                  soundManager.playClick();
                  onBackToMap();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
              >
                {t.backToMap}
              </button>

              {hasNextPhase ? (
                <button
                  onClick={() => {
                    speechManager.stop();
                    soundManager.playClick();
                    setShowVictoryModal(false);
                    if (onNextPhase) onNextPhase();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00F5D4] hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{currentLocale === 'en-GB' ? 'Next Stage with AstroBot 🚀' : 'Avançar na Trilha com AstroBot 🚀'}</span>
                  <StepForward className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    speechManager.stop();
                    soundManager.playClick();
                    setShowVictoryModal(false);
                    resetLevel();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EC4899] hover:bg-pink-500 text-white font-black text-xs transition-all shadow-md shadow-pink-500/30 cursor-pointer"
                >
                  {t.retryLevel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FAIL / RETRY MODAL */}
      {showFailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-gradient-to-b from-[#1E112A] to-[#0A071A] border-2 border-rose-500/60 rounded-3xl p-6 text-center shadow-[0_0_40px_rgba(244,63,94,0.3)] flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-3">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="font-extrabold text-xl text-white font-['Outfit']">
              {t.oopsTitle}, {cadetName}!
            </h3>
            <p className="text-xs text-rose-200 mt-2 bg-rose-950/40 p-3 rounded-xl border border-rose-500/30 max-w-sm">
              {failReason || (currentLocale === 'en-GB' ? 'AstroBot could not reach the target coordinate on this run.' : 'O AstroBot não conseguiu alcançar o objetivo nesta tentativa.')}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {currentLocale === 'en-GB'
                  ? 'Tip: Use the "Step" button to test one command at a time and see where AstroBot turns!'
                  : 'Dica: Use o botão Passo para testar um comando por vez e ver onde o robô vira!'}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full mt-5">
              <button
                onClick={() => {
                  speechManager.stop();
                  soundManager.playClick();
                  setShowFailModal(false);
                  resetLevel();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-md shadow-rose-600/30 cursor-pointer"
              >
                {t.retryLevel}
              </button>
              <button
                onClick={() => {
                  speechManager.stop();
                  soundManager.playClick();
                  onBackToMap();
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
              >
                {t.backToMap}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
