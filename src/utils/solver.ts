/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhaseModel, CodeBlock, BlockType, Direction } from '../types/game';
import { BLOCK_DEFINITIONS } from './levels';

export interface HintResult {
  type: 'next_block' | 'remove_error' | 'ready_to_run';
  suggestedBlock?: BlockType;
  blockDefinition?: typeof BLOCK_DEFINITIONS[keyof typeof BLOCK_DEFINITIONS];
  title: string;
  explanation: string;
  errorStepIndex?: number;
}

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

/**
 * Simulates user's current code sequence from start position to check validity and current end point
 */
export const simulateCurrentBlocks = (
  phase: PhaseModel,
  draggedBlocks: CodeBlock[]
): {
  isValid: boolean;
  errorIndex?: number;
  errorReason?: string;
  endPos: { x: number; y: number; dir: Direction };
  collectedCrystals: string[];
} => {
  let currentPos = { ...phase.startPos };
  const collected: string[] = [];
  const obstacles = phase.obstacles || [];

  for (let i = 0; i < draggedBlocks.length; i++) {
    const block = draggedBlocks[i];
    const steps = block.repeatCount || 1;

    for (let s = 0; s < steps; s++) {
      if (block.type === 'move_forward' || block.type.startsWith('repeat_')) {
        const next = getNextPosition(currentPos, 'forward');
        if (
          next.x < 0 || next.x >= phase.gridSize.width ||
          next.y < 0 || next.y >= phase.gridSize.height
        ) {
          return {
            isValid: false,
            errorIndex: i,
            errorReason: `O passo ${i + 1} (${block.label}) faz o AstroBot sair da placa de circuito!`,
            endPos: currentPos,
            collectedCrystals: collected
          };
        }
        if (obstacles.some(o => o.x === next.x && o.y === next.y)) {
          return {
            isValid: false,
            errorIndex: i,
            errorReason: `O passo ${i + 1} (${block.label}) faz o AstroBot colidir com um obstáculo superaquecido!`,
            endPos: currentPos,
            collectedCrystals: collected
          };
        }
        currentPos = next;
      } else if (block.type === 'move_backward') {
        const next = getNextPosition(currentPos, 'backward');
        if (
          next.x < 0 || next.x >= phase.gridSize.width ||
          next.y < 0 || next.y >= phase.gridSize.height ||
          obstacles.some(o => o.x === next.x && o.y === next.y)
        ) {
          return {
            isValid: false,
            errorIndex: i,
            errorReason: `O passo ${i + 1} (${block.label}) faz o AstroBot recuar para um local inválido!`,
            endPos: currentPos,
            collectedCrystals: collected
          };
        }
        currentPos = next;
      } else if (block.type === 'turn_right') {
        currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'right') };
      } else if (block.type === 'turn_left') {
        currentPos = { ...currentPos, dir: getRotatedDirection(currentPos.dir, 'left') };
      }

      // Check crystals collected along the way
      (phase.crystals || []).forEach(c => {
        if (c.x === currentPos.x && c.y === currentPos.y && !collected.includes(c.id)) {
          collected.push(c.id);
        }
      });
    }
  }

  return {
    isValid: true,
    endPos: currentPos,
    collectedCrystals: collected
  };
};

/**
 * BFS Solver to find the optimal next block to reach target from current end position
 */
export const findNextBestBlock = (
  phase: PhaseModel,
  fromPos: { x: number; y: number; dir: Direction },
  alreadyCollected: string[]
): BlockType | null => {
  const obstacles = phase.obstacles || [];
  const crystals = phase.crystals || [];

  interface QueueNode {
    x: number;
    y: number;
    dir: Direction;
    collected: string[];
    firstAction: BlockType;
  }

  const queue: QueueNode[] = [];
  const visited = new Set<string>();

  const encodeState = (x: number, y: number, dir: Direction, col: string[]) => {
    return `${x},${y},${dir},${col.slice().sort().join('|')}`;
  };

  visited.add(encodeState(fromPos.x, fromPos.y, fromPos.dir, alreadyCollected));

  // Candidate actions to explore based on phase.allowedBlocks
  const candidateActions: BlockType[] = phase.allowedBlocks.filter(b => 
    b === 'move_forward' || 
    b === 'turn_right' || 
    b === 'turn_left' || 
    b === 'move_backward' ||
    b.startsWith('repeat_')
  );

  // Initialize queue with 1-step candidates
  for (const action of candidateActions) {
    let nextPos = { ...fromPos };
    let valid = true;
    const nextCollected = [...alreadyCollected];

    const def = BLOCK_DEFINITIONS[action as keyof typeof BLOCK_DEFINITIONS];
    const repeatCount = (def && 'repeatCount' in def ? def.repeatCount : 1) || 1;

    for (let r = 0; r < repeatCount; r++) {
      if (action === 'move_forward' || action.startsWith('repeat_')) {
        const next = getNextPosition(nextPos, 'forward');
        if (
          next.x < 0 || next.x >= phase.gridSize.width ||
          next.y < 0 || next.y >= phase.gridSize.height ||
          obstacles.some(o => o.x === next.x && o.y === next.y)
        ) {
          valid = false;
          break;
        }
        nextPos = next;
      } else if (action === 'move_backward') {
        const next = getNextPosition(nextPos, 'backward');
        if (
          next.x < 0 || next.x >= phase.gridSize.width ||
          next.y < 0 || next.y >= phase.gridSize.height ||
          obstacles.some(o => o.x === next.x && o.y === next.y)
        ) {
          valid = false;
          break;
        }
        nextPos = next;
      } else if (action === 'turn_right') {
        nextPos = { ...nextPos, dir: getRotatedDirection(nextPos.dir, 'right') };
      } else if (action === 'turn_left') {
        nextPos = { ...nextPos, dir: getRotatedDirection(nextPos.dir, 'left') };
      }

      crystals.forEach(c => {
        if (c.x === nextPos.x && c.y === nextPos.y && !nextCollected.includes(c.id)) {
          nextCollected.push(c.id);
        }
      });
    }

    if (!valid) continue;

    // Check if immediate win
    const isAtTarget = nextPos.x === phase.targetPos.x && nextPos.y === phase.targetPos.y;
    const hasAllCrystals = nextCollected.length >= crystals.length;
    if (isAtTarget && hasAllCrystals) {
      return action;
    }

    const stateKey = encodeState(nextPos.x, nextPos.y, nextPos.dir, nextCollected);
    if (!visited.has(stateKey)) {
      visited.add(stateKey);
      queue.push({
        x: nextPos.x,
        y: nextPos.y,
        dir: nextPos.dir,
        collected: nextCollected,
        firstAction: action
      });
    }
  }

  // BFS search for shortest path
  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const action of candidateActions) {
      let nextPos = { x: node.x, y: node.y, dir: node.dir };
      let valid = true;
      const nextCollected = [...node.collected];

      const def = BLOCK_DEFINITIONS[action as keyof typeof BLOCK_DEFINITIONS];
      const repeatCount = (def && 'repeatCount' in def ? def.repeatCount : 1) || 1;

      for (let r = 0; r < repeatCount; r++) {
        if (action === 'move_forward' || action.startsWith('repeat_')) {
          const next = getNextPosition(nextPos, 'forward');
          if (
            next.x < 0 || next.x >= phase.gridSize.width ||
            next.y < 0 || next.y >= phase.gridSize.height ||
            obstacles.some(o => o.x === next.x && o.y === next.y)
          ) {
            valid = false;
            break;
          }
          nextPos = next;
        } else if (action === 'move_backward') {
          const next = getNextPosition(nextPos, 'backward');
          if (
            next.x < 0 || next.x >= phase.gridSize.width ||
            next.y < 0 || next.y >= phase.gridSize.height ||
            obstacles.some(o => o.x === next.x && o.y === next.y)
          ) {
            valid = false;
            break;
          }
          nextPos = next;
        } else if (action === 'turn_right') {
          nextPos = { ...nextPos, dir: getRotatedDirection(nextPos.dir, 'right') };
        } else if (action === 'turn_left') {
          nextPos = { ...nextPos, dir: getRotatedDirection(nextPos.dir, 'left') };
        }

        crystals.forEach(c => {
          if (c.x === nextPos.x && c.y === nextPos.y && !nextCollected.includes(c.id)) {
            nextCollected.push(c.id);
          }
        });
      }

      if (!valid) continue;

      const isAtTarget = nextPos.x === phase.targetPos.x && nextPos.y === phase.targetPos.y;
      const hasAllCrystals = nextCollected.length >= crystals.length;
      if (isAtTarget && hasAllCrystals) {
        return node.firstAction;
      }

      const stateKey = encodeState(nextPos.x, nextPos.y, nextPos.dir, nextCollected);
      if (!visited.has(stateKey)) {
        visited.add(stateKey);
        queue.push({
          x: nextPos.x,
          y: nextPos.y,
          dir: nextPos.dir,
          collected: nextCollected,
          firstAction: node.firstAction
        });
      }
    }
  }

  // If no path found (rare/unreachable), fallback to move_forward or turn_right
  return phase.allowedBlocks[0] || 'move_forward';
};

/**
 * Generates user-friendly hint object with explanation
 */
export const calculateHint = (
  phase: PhaseModel,
  draggedBlocks: CodeBlock[]
): HintResult => {
  // 1. Check if current sequence has errors
  const sim = simulateCurrentBlocks(phase, draggedBlocks);

  if (!sim.isValid && sim.errorIndex !== undefined) {
    const errorBlock = draggedBlocks[sim.errorIndex];
    return {
      type: 'remove_error',
      errorStepIndex: sim.errorIndex,
      title: 'Ajuste um Comando!',
      explanation: `${sim.errorReason || 'Existe uma colisão no trajeto.'} Experimente remover o passo ${sim.errorIndex + 1} (${errorBlock.label}) e escolher uma direção segura!`
    };
  }

  // 2. Check if already reached target with crystals
  const reachedTarget = sim.endPos.x === phase.targetPos.x && sim.endPos.y === phase.targetPos.y;
  const crystals = phase.crystals || [];
  const allCrystals = sim.collectedCrystals.length >= crystals.length;

  if (reachedTarget && allCrystals) {
    return {
      type: 'ready_to_run',
      title: 'Código Completo!',
      explanation: 'Sua sequência de comandos já leva o AstroBot até a vitória! Clique em "Executar" para ver o robô brilhar!'
    };
  }

  // 3. Find next best block from end position
  const nextBlock = findNextBestBlock(phase, sim.endPos, sim.collectedCrystals);

  if (!nextBlock) {
    return {
      type: 'next_block',
      suggestedBlock: 'move_forward',
      blockDefinition: BLOCK_DEFINITIONS.move_forward,
      title: 'Avance no Circuito',
      explanation: 'Tente adicionar um comando de movimento para aproximar o AstroBot do cristal de energia!'
    };
  }

  const def = BLOCK_DEFINITIONS[nextBlock as keyof typeof BLOCK_DEFINITIONS];

  let explanationText = '';
  switch (nextBlock) {
    case 'turn_right':
      explanationText = 'O AstroBot precisa virar para a direita para alinhar a rota com o cristal cósmico!';
      break;
    case 'turn_left':
      explanationText = 'Gire o AstroBot para a esquerda para abrir caminho no circuito espacial!';
      break;
    case 'move_forward':
      explanationText = 'O caminho em frente está livre e seguro! Avance 1 casa em direção ao alvo.';
      break;
    case 'move_backward':
      explanationText = 'Dê um passo para trás para desviar do obstáculo sem mudar de direção.';
      break;
    case 'repeat_2x':
      explanationText = 'Economize blocos! Use "Repetir 2x" para dar dois passos seguidos com um só comando.';
      break;
    case 'repeat_3x':
      explanationText = 'Acelere o código! Use "Repetir 3x" para cruzar a linha reta mais rápido e garantir 3 estrelas!';
      break;
    case 'repeat_4x':
      explanationText = 'Use "Repetir 4x" para percorrer toda a extensão do circuito com máxima eficiência!';
      break;
    default:
      explanationText = `Adicione o bloco "${def?.label || nextBlock}" para continuar a jornada!`;
  }

  return {
    type: 'next_block',
    suggestedBlock: nextBlock,
    blockDefinition: def,
    title: `Próximo Passo: ${def?.label || nextBlock}`,
    explanation: explanationText
  };
};
