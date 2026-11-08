/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Trash2, 
  StepForward, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Compass, 
  Sliders,
  Repeat
} from 'lucide-react';
import { CodeBlock, BlockType, Direction } from '../types/game';
import { BLOCK_DEFINITIONS } from '../utils/levels';
import { soundManager } from '../utils/audio';

interface LevelSandboxProps {
  onBackToMap: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

type EditTool = 'obstacle' | 'crystal' | 'start';

export const LevelSandbox: React.FC<LevelSandboxProps> = ({
  onBackToMap,
  isMuted,
  onToggleMute
}) => {
  const [gridSize, setGridSize] = useState<number>(5);
  const [startPos, setStartPos] = useState<{ x: number; y: number; dir: Direction }>({ x: 0, y: 0, dir: 'up' });
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 4, y: 4 });
  const [obstacles, setObstacles] = useState<Array<{ x: number; y: number }>>([
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ]);

  // Current selected editor tool
  const [activeTool, setActiveTool] = useState<EditTool>('obstacle');

  // Robot runtime state
  const [robotPos, setRobotPos] = useState<{ x: number; y: number; dir: Direction }>({ x: 0, y: 0, dir: 'up' });
  const [draggedBlocks, setDraggedBlocks] = useState<CodeBlock[]>([]);
  const [visitedCells, setVisitedCells] = useState<Array<{ x: number; y: number }>>([{ x: 0, y: 0 }]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Modo Laboratório: edite a placa e programe!');
  const [showWinMessage, setShowWinMessage] = useState<boolean>(false);

  // Available toolbox blocks in sandbox
  const sandboxBlockTypes: BlockType[] = [
    'move_forward',
    'turn_right',
    'turn_left',
    'move_backward',
    'repeat_2x',
    'repeat_3x'
  ];

  const handleCellClick = (x: number, y: number) => {
    if (isRunning) return;
    soundManager.playClick();

    if (activeTool === 'start') {
      setStartPos({ x, y, dir: startPos.dir });
      setRobotPos({ x, y, dir: startPos.dir });
      setVisitedCells([{ x, y }]);
      // Remove obstacle if placed here
      setObstacles(prev => prev.filter(o => !(o.x === x && o.y === y)));
    } else if (activeTool === 'crystal') {
      setTargetPos({ x, y });
      setObstacles(prev => prev.filter(o => !(o.x === x && o.y === y)));
    } else if (activeTool === 'obstacle') {
      // Don't place obstacle on start or target
      if ((x === startPos.x && y === startPos.y) || (x === targetPos.x && y === targetPos.y)) {
        return;
      }
      const exists = obstacles.some(o => o.x === x && o.y === y);
      if (exists) {
        setObstacles(prev => prev.filter(o => !(o.x === x && o.y === y)));
      } else {
        setObstacles(prev => [...prev, { x, y }]);
      }
    }
  };

  const handleAddBlock = (blockType: BlockType) => {
    if (isRunning) return;
    soundManager.playClick();
    const def = BLOCK_DEFINITIONS[blockType];
    const newBlock: CodeBlock = {
      id: `sbx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: blockType,
      label: def.label,
      iconName: def.iconName,
      color: def.color,
      borderColor: def.borderColor,
      repeatCount: 'repeatCount' in def ? def.repeatCount : undefined
    };
    setDraggedBlocks(prev => [...prev, newBlock]);
  };

  const resetSandboxRobot = () => {
    setIsRunning(false);
    setActiveStepIndex(null);
    setRobotPos(startPos);
    setVisitedCells([{ x: startPos.x, y: startPos.y }]);
    setShowWinMessage(false);
    setStatusMessage('Robô reposicionado no início.');
  };

  const getRotatedDirection = (currentDir: Direction, turn: 'right' | 'left'): Direction => {
    const clockwiseOrder: Direction[] = ['up', 'right', 'down', 'left'];
    const idx = clockwiseOrder.indexOf(currentDir);
    return turn === 'right' ? clockwiseOrder[(idx + 1) % 4] : clockwiseOrder[(idx + 3) % 4];
  };

  const getNextPosition = (
    current: { x: number; y: number; dir: Direction }, 
    action: 'forward' | 'backward'
  ) => {
    let dx = 0;
    let dy = 0;
    const factor = action === 'forward' ? 1 : -1;

    switch (current.dir) {
      case 'up': dy = 1 * factor; break;
      case 'down': dy = -1 * factor; break;
      case 'right': dx = 1 * factor; break;
      case 'left': dx = -1 * factor; break;
    }
    return { x: current.x + dx, y: current.y + dy, dir: current.dir };
  };

  const runSandboxCode = async () => {
    if (isRunning || draggedBlocks.length === 0) return;
    soundManager.playClick();
    setIsRunning(true);
    setShowWinMessage(false);
    setStatusMessage('Executando no Laboratório...');

    let currentPos = { ...startPos };
    setRobotPos(currentPos);
    setVisitedCells([{ x: currentPos.x, y: currentPos.y }]);

    const executionQueue: Array<{ block: CodeBlock; originalIndex: number }> = [];
    draggedBlocks.forEach((b, origIdx) => {
      if (b.type.startsWith('repeat_') && b.repeatCount) {
        for (let r = 0; r < b.repeatCount; r++) {
          executionQueue.push({ block: b, originalIndex: origIdx });
        }
      } else {
        executionQueue.push({ block: b, originalIndex: origIdx });
      }
    });

    for (let i = 0; i < executionQueue.length; i++) {
      const item = executionQueue[i];
      setActiveStepIndex(item.originalIndex);
      await new Promise(res => setTimeout(res, 400));

      const blockType = item.block.type;
      if (blockType === 'move_forward' || blockType.startsWith('repeat_')) {
        const next = getNextPosition(currentPos, 'forward');
        if (next.x < 0 || next.x >= gridSize || next.y < 0 || next.y >= gridSize) {
          soundManager.playFail();
          setStatusMessage(`Bateu na borda em (${next.x}, ${next.y})!`);
          setIsRunning(false);
          setActiveStepIndex(null);
          return;
        }
        if (obstacles.some(o => o.x === next.x && o.y === next.y)) {
          soundManager.playFail();
          setStatusMessage(`Bateu em um obstáculo em (${next.x}, ${next.y})!`);
          setIsRunning(false);
          setActiveStepIndex(null);
          return;
        }
        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);
      } else if (blockType === 'move_backward') {
        const next = getNextPosition(currentPos, 'backward');
        if (next.x < 0 || next.x >= gridSize || next.y < 0 || next.y >= gridSize) {
          soundManager.playFail();
          setStatusMessage('Bateu na borda ao recuar!');
          setIsRunning(false);
          setActiveStepIndex(null);
          return;
        }
        currentPos = next;
        setRobotPos(currentPos);
        soundManager.playStep();
        setVisitedCells(prev => [...prev, { x: currentPos.x, y: currentPos.y }]);
      } else if (blockType === 'turn_right') {
        currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'right') };
        setRobotPos(currentPos);
        soundManager.playTurn();
      } else if (blockType === 'turn_left') {
        currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'left') };
        setRobotPos(currentPos);
        soundManager.playTurn();
      }
    }

    setIsRunning(false);
    setActiveStepIndex(null);

    if (currentPos.x === targetPos.x && currentPos.y === targetPos.y) {
      soundManager.playVictory();
      setShowWinMessage(true);
      setStatusMessage('Sucesso no Laboratório! Alvo alcançado!');
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      soundManager.playFail();
      setStatusMessage(`Parou em (${currentPos.x}, ${currentPos.y}). O cristal está em (${targetPos.x}, ${targetPos.y}).`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#070512] via-[#0D091F] to-[#1A163B] text-white flex flex-col items-center">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full max-w-6xl px-4 py-3 backdrop-blur-md bg-[#130D2B]/85 border-b border-[#00F5D4]/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Mapa</span>
          </button>
          <div>
            <h2 className="font-extrabold text-base md:text-lg text-white font-['Outfit'] flex items-center gap-2">
              <span>Laboratório Cósmico Livre</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md font-mono">Sandbox</span>
            </h2>
            <p className="text-[11px] text-slate-400">Desenhe seu próprio labirinto e teste qualquer algoritmo!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Grid Size Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700 text-xs font-bold">
            <span className="text-slate-400 px-2 text-[11px]">Tamanho:</span>
            {[4, 5, 6].map(sz => (
              <button
                key={sz}
                onClick={() => {
                  setGridSize(sz);
                  setTargetPos({ x: sz - 1, y: sz - 1 });
                  resetSandboxRobot();
                }}
                className={`px-2 py-1 rounded-lg transition-colors ${gridSize === sz ? 'bg-[#00F5D4] text-black' : 'text-slate-400 hover:text-white'}`}
              >
                {sz}x{sz}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>
        </div>
      </header>

      {/* Main Sandbox Workspace */}
      <main className="w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6">
        {/* Left Column: Grid Board & Tool Selector */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Tile Painter Tools */}
          <div className="bg-[#130D2B]/85 border border-[#00F5D4]/30 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00F5D4]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Ferramenta de Edição:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTool('obstacle')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${activeTool === 'obstacle' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Obstáculo</span>
              </button>
              <button
                onClick={() => setActiveTool('crystal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${activeTool === 'crystal' ? 'bg-teal-600 text-white border-teal-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cristal Alvo</span>
              </button>
              <button
                onClick={() => setActiveTool('start')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${activeTool === 'start' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>AstroBot Início</span>
              </button>
            </div>
          </div>

          {/* Interactive Editable Board */}
          <div className="relative bg-[#070512] border-2 border-indigo-900/60 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center">
            <div 
              className="grid gap-2 border-2 border-[#00F5D4]/30 p-2 rounded-2xl bg-[#0F0B24]/90"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: gridSize }, (_, rowIndex) => {
                const y = gridSize - 1 - rowIndex;
                return Array.from({ length: gridSize }, (_, x) => {
                  const isCurrentPos = robotPos.x === x && robotPos.y === y;
                  const isTarget = targetPos.x === x && targetPos.y === y;
                  const isObs = obstacles.some(o => o.x === x && o.y === y);
                  const wasVisited = visitedCells.some(cell => cell.x === x && cell.y === y);

                  return (
                    <button
                      key={`sbx_${x}_${y}`}
                      onClick={() => handleCellClick(x, y)}
                      className={`
                        relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all cursor-pointer border
                        ${wasVisited ? 'bg-[#00F5D4]/5 border-[#00F5D4]/30' : 'bg-[#150F33]/60 border-slate-800'}
                        ${isObs ? 'bg-rose-950/50 border-rose-500' : ''}
                        ${isTarget ? 'bg-indigo-900/40 border-[#00F5D4]' : ''}
                        hover:scale-105
                      `}
                    >
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono text-slate-600">
                        {x},{y}
                      </span>

                      {isObs && <Flame className="w-5 h-5 text-rose-400 animate-pulse" />}

                      {isTarget && !isObs && (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00F5D4] shadow-[0_0_12px_#00F5D4]">
                          <img 
                            src="/src/assets/images/cosmic_crystal_core_1793697090418.jpg" 
                            alt="Alvo" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {isCurrentPos && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-10 h-10 rounded-full border-2 border-[#00F5D4] overflow-hidden bg-[#070512]">
                            <img 
                              src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
                              alt="AstroBot"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                });
              })}
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              Clique nos quadrados da placa para posicionar obstáculos, o robô ou o cristal!
            </p>
          </div>
        </div>

        {/* Right Column: Code Blocks & Sequence */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Blocks Palette */}
          <div className="bg-[#130D2B]/85 border border-[#00F5D4]/30 rounded-2xl p-4 shadow-lg">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3 font-['Outfit']">
              Blocos Disponíveis
            </span>
            <div className="grid grid-cols-2 gap-2">
              {sandboxBlockTypes.map(blockType => {
                const def = BLOCK_DEFINITIONS[blockType];
                return (
                  <button
                    key={blockType}
                    disabled={isRunning}
                    onClick={() => handleAddBlock(blockType)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold text-xs ${def.color} ${def.borderColor} hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer`}
                  >
                    <div className="p-1 rounded-md bg-black/20">
                      {blockType === 'move_forward' && <ArrowUp className="w-4 h-4" />}
                      {blockType === 'turn_right' && <RotateCw className="w-4 h-4" />}
                      {blockType === 'turn_left' && <RotateCcw className="w-4 h-4" />}
                      {blockType === 'move_backward' && <ArrowDown className="w-4 h-4" />}
                      {blockType.startsWith('repeat_') && <Repeat className="w-4 h-4" />}
                    </div>
                    <span className="truncate">{def.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Queue & Action Controls */}
          <div className="flex-1 bg-[#130D2B]/85 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Comandos ({draggedBlocks.length})
              </span>
              {draggedBlocks.length > 0 && (
                <button
                  disabled={isRunning}
                  onClick={() => setDraggedBlocks([])}
                  className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 max-h-[300px]">
              {draggedBlocks.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">
                  Toque nos blocos acima para programar o robô!
                </div>
              ) : (
                draggedBlocks.map((b, i) => {
                  const isActive = activeStepIndex === i;
                  return (
                    <div
                      key={b.id}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold ${b.color} ${b.borderColor} border ${isActive ? 'ring-2 ring-white scale-[1.02]' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-black/20 px-2 py-0.5 rounded-md text-[10px]">{i + 1}</span>
                        <span>{b.label}</span>
                      </div>
                      <button
                        onClick={() => setDraggedBlocks(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-white/60 hover:text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="py-2 text-[11px] text-slate-400 border-t border-slate-800">
              <span>{statusMessage}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={resetSandboxRobot}
                disabled={isRunning}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar</span>
              </button>

              <button
                onClick={runSandboxCode}
                disabled={isRunning || draggedBlocks.length === 0}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-[#00F5D4] hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Testar Código</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
