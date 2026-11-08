/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CodeBlock, BlockType } from '../types/game';
import { BLOCK_DEFINITIONS } from './levels';

export interface CodeStep {
  type: BlockType;
  lineNumber: number;
  label: string;
}

export interface ParseResult {
  blocks: CodeBlock[];
  steps: CodeStep[];
  error?: string;
  errorLine?: number;
  suggestion?: string;
}

/**
 * Converts a sequence of CodeBlocks into clean, child-friendly code string
 */
export function blocksToCode(blocks: CodeBlock[], locale: 'en-GB' | 'pt-BR' = 'en-GB'): string {
  if (!blocks || blocks.length === 0) {
    if (locale === 'en-GB') {
      return '// Type your cosmic commands here!\n// Example:\n// moveForward();\n// turnRight();\n// moveForward();\n';
    }
    return '// Digite seus comandos espaciais aqui!\n// Exemplo:\n// avancar();\n// virarDireita();\n// avancar();\n';
  }

  const isEn = locale === 'en-GB';
  const lines: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case 'move_forward':
        lines.push(isEn ? 'moveForward();' : 'avancar();');
        break;
      case 'turn_right':
        lines.push(isEn ? 'turnRight();' : 'virarDireita();');
        break;
      case 'turn_left':
        lines.push(isEn ? 'turnLeft();' : 'virarEsquerda();');
        break;
      case 'move_backward':
        lines.push(isEn ? 'moveBackward();' : 'recuar();');
        break;
      case 'collect_crystal':
        lines.push(isEn ? 'collectCrystal();' : 'coletar();');
        break;
      case 'repeat_2x':
        lines.push(isEn ? 'repeat(2) {' : 'repetir(2) {');
        lines.push(isEn ? '  moveForward();' : '  avancar();');
        lines.push('}');
        break;
      case 'repeat_3x':
        lines.push(isEn ? 'repeat(3) {' : 'repetir(3) {');
        lines.push(isEn ? '  moveForward();' : '  avancar();');
        lines.push('}');
        break;
      case 'repeat_4x':
        lines.push(isEn ? 'repeat(4) {' : 'repetir(4) {');
        lines.push(isEn ? '  moveForward();' : '  avancar();');
        lines.push('}');
        break;
      default:
        lines.push(isEn ? 'moveForward();' : 'avancar();');
    }
  }

  return lines.join('\n');
}


/**
 * Common typo dictionary for helpful friendly diagnostic messages
 */
const KNOWN_TYPOS: Record<string, string> = {
  'avanca': 'avancar()',
  'avancar': 'avancar()',
  'avancar;': 'avancar()',
  'avancar()': 'avancar()',
  'avancarr': 'avancar()',
  'avaco': 'avancar()',
  'andar': 'avancar()',
  'frente': 'avancar()',
  'frente()': 'avancar()',
  'viradireita': 'virarDireita()',
  'virar_direita': 'virarDireita()',
  'direita': 'virarDireita()',
  'direita()': 'virarDireita()',
  'vira_direita': 'virarDireita()',
  'virardireito': 'virarDireita()',
  'viraesquerda': 'virarEsquerda()',
  'virar_esquerda': 'virarEsquerda()',
  'esquerda': 'virarEsquerda()',
  'esquerda()': 'virarEsquerda()',
  'vira_esquerda': 'virarEsquerda()',
  'viraresquerdo': 'virarEsquerda()',
  'volta': 'recuar()',
  'voltar': 'recuar()',
  'voltar()': 'recuar()',
  'tras': 'recuar()',
  're': 'recuar()',
  'coleta': 'coletar()',
  'coletar': 'coletar()',
  'pegar': 'coletar()',
  'pegar()': 'coletar()',
  'repeti': 'repetir(x) { ... }',
  'loop': 'repetir(x) { ... }'
};

/**
 * Parses kid-written code string into executable steps and blocks
 * Supports:
 * - Direct commands: avancar(), avancar(n), virarDireita(), virarEsquerda(), recuar(), coletar()
 * - Loops: repetir(n) { ... }
 * - Custom functions: funcao nome() { ... } and then nome();
 */
export function codeToBlocksAndSteps(codeStr: string): ParseResult {
  const lines = codeStr.split('\n');
  const blocks: CodeBlock[] = [];
  const steps: CodeStep[] = [];
  
  // Custom functions defined by student in code: name -> array of lines
  const customFunctions: Record<string, string[]> = {};

  // First pass: scan for function declarations
  // e.g.: funcao pular() { ... }
  let inFunctionDeclaration: string | null = null;
  const cleanedLines: Array<{ raw: string; lineNum: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const lineNum = i + 1;

    // Ignore empty lines and comments
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) {
      continue;
    }

    // Check function declaration start
    const funcMatch = trimmed.match(/^(?:funcao|function|def)\s+([a-zA-Z0-9_]+)\s*\(\s*\)\s*\{?$/i);
    if (funcMatch) {
      inFunctionDeclaration = funcMatch[1];
      customFunctions[inFunctionDeclaration] = [];
      continue;
    }

    if (inFunctionDeclaration) {
      if (trimmed === '}') {
        inFunctionDeclaration = null;
        continue;
      }
      customFunctions[inFunctionDeclaration].push(trimmed);
      continue;
    }

    cleanedLines.push({ raw: trimmed, lineNum });
  }

  // Helper to create a CodeBlock from a BlockType
  let blockCounter = 1;
  const createBlock = (type: BlockType, repeatCount?: number): CodeBlock => {
    const def = BLOCK_DEFINITIONS[type];
    return {
      id: `block_code_${blockCounter++}_${Date.now()}`,
      type,
      label: def.label,
      iconName: def.iconName,
      color: def.color,
      borderColor: def.borderColor,
      repeatCount: repeatCount || (type.startsWith('repeat_') ? parseInt(type.replace('repeat_', '').replace('x', ''), 10) : undefined)
    };
  };

  // Helper to process a single atomic command
  const parseSingleCommand = (cmd: string, lineNum: number): { type: BlockType; repeatCount: number } | { error: string; suggestion?: string } => {
    // Strip trailing semicolon or whitespace
    const normalized = cmd.replace(/;+$/, '').trim();

    // Check avancar(n) with number
    const avancarWithNum = normalized.match(/^(?:avancar|avançar|moveforward|move_forward|forward|andar|passo|step)\s*\(\s*(\d+)\s*\)$/i);
    if (avancarWithNum) {
      const count = parseInt(avancarWithNum[1], 10);
      if (count <= 0) return { error: `The number of steps in moveForward(${count}) must be at least 1!`, suggestion: 'moveForward(1);' };
      if (count > 6) return { error: `AstroBot can only move up to 6 steps per command!`, suggestion: 'moveForward(4);' };
      return { type: 'move_forward', repeatCount: count };
    }

    // Check standard commands
    if (/^(?:avancar|avançar|moveforward|move_forward|forward|andar|step|walk)\s*\(\s*\)$/i.test(normalized)) {
      return { type: 'move_forward', repeatCount: 1 };
    }
    if (/^(?:virardireita|virar_direita|direita|turnright|turn_right|right)\s*\(\s*\)$/i.test(normalized)) {
      return { type: 'turn_right', repeatCount: 1 };
    }
    if (/^(?:viraresquerda|virar_esquerda|esquerda|turnleft|turn_left|left)\s*\(\s*\)$/i.test(normalized)) {
      return { type: 'turn_left', repeatCount: 1 };
    }
    if (/^(?:recuar|voltar|movebackward|move_backward|backward|stepback|step_back|back|reverse|re)\s*\(\s*\)$/i.test(normalized)) {
      return { type: 'move_backward', repeatCount: 1 };
    }
    if (/^(?:coletar|pegar|coletarcristal|collectcrystal|collect_crystal|collect|gather)\s*\(\s*\)$/i.test(normalized)) {
      return { type: 'collect_crystal', repeatCount: 1 };
    }

    // Check known typo matches
    const baseWord = normalized.replace(/\(\s*\)/, '').toLowerCase();
    if (KNOWN_TYPOS[baseWord] || KNOWN_TYPOS[normalized.toLowerCase()]) {
      const fix = KNOWN_TYPOS[baseWord] || KNOWN_TYPOS[normalized.toLowerCase()];
      return {
        error: `Comando '${normalized}' quase correto!`,
        suggestion: fix
      };
    }

    return {
      error: `Comando '${normalized}' não reconhecido pelo AstroBot!`,
      suggestion: 'avancar(); ou virarDireita();'
    };
  };

  // Process lines (including repeat loops)
  for (let idx = 0; idx < cleanedLines.length; idx++) {
    const item = cleanedLines[idx];
    const trimmed = item.raw;
    const lineNum = item.lineNum;

    // Check repeat block: repetir(n) { ... }
    const repeatMatch = trimmed.match(/^(?:repetir|repeat|loop)\s*\(\s*(\d+)\s*\)\s*\{?$/i);
    if (repeatMatch) {
      const count = parseInt(repeatMatch[1], 10);
      if (count < 2 || count > 5) {
        return {
          blocks: [],
          steps: [],
          error: `Na linha ${lineNum}: O comando repetir(${count}) aceita entre 2 e 4 repetições!`,
          errorLine: lineNum,
          suggestion: 'repetir(3) { ... }'
        };
      }

      // Collect loop body until closing brace '}'
      const loopBody: string[] = [];
      let foundEnd = false;
      idx++; // advance to next line

      while (idx < cleanedLines.length) {
        const bodyItem = cleanedLines[idx];
        if (bodyItem.raw === '}') {
          foundEnd = true;
          break;
        }
        loopBody.push(bodyItem.raw);
        idx++;
      }

      if (!foundEnd && idx >= cleanedLines.length) {
        return {
          blocks: [],
          steps: [],
          error: `Faltou fechar o bloco do 'repetir' com a chave '}' na linha ${lineNum}!`,
          errorLine: lineNum,
          suggestion: 'Adicione } no final do bloco'
        };
      }

      // If loop body is empty
      if (loopBody.length === 0) {
        return {
          blocks: [],
          steps: [],
          error: `O bloco 'repetir(${count})' na linha ${lineNum} está vazio! Adicione comandos dentro dele.`,
          errorLine: lineNum,
          suggestion: 'repetir(2) {\n  avancar();\n}'
        };
      }

      // Loop execution: expand steps count times
      for (let r = 0; r < count; r++) {
        for (const bodyCmd of loopBody) {
          const res = parseSingleCommand(bodyCmd, lineNum);
          if ('error' in res) {
            return {
              blocks: [],
              steps: [],
              error: `Na linha do loop: ${res.error}`,
              errorLine: lineNum,
              suggestion: res.suggestion
            };
          }
          const blockType = res.type;
          for (let s = 0; s < res.repeatCount; s++) {
            steps.push({
              type: blockType,
              lineNumber: lineNum,
              label: BLOCK_DEFINITIONS[blockType].label
            });
          }
        }
      }

      // Add to blocks UI
      if (count === 2) blocks.push(createBlock('repeat_2x'));
      else if (count === 3) blocks.push(createBlock('repeat_3x'));
      else blocks.push(createBlock('repeat_4x'));

      continue;
    }

    // Check if it's a custom function invocation: e.g. pular();
    const funcCallMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*\(\s*\);?$/);
    if (funcCallMatch && customFunctions[funcCallMatch[1]]) {
      const funcName = funcCallMatch[1];
      const funcLines = customFunctions[funcName];

      for (const fCmd of funcLines) {
        const res = parseSingleCommand(fCmd, lineNum);
        if ('error' in res) {
          return {
            blocks: [],
            steps: [],
            error: `Dentro da função '${funcName}': ${res.error}`,
            errorLine: lineNum,
            suggestion: res.suggestion
          };
        }
        for (let s = 0; s < res.repeatCount; s++) {
          steps.push({
            type: res.type,
            lineNumber: lineNum,
            label: `${BLOCK_DEFINITIONS[res.type].label} (via ${funcName})`
          });
          blocks.push(createBlock(res.type));
        }
      }
      continue;
    }

    // Otherwise standard single command
    const res = parseSingleCommand(trimmed, lineNum);
    if ('error' in res) {
      return {
        blocks: [],
        steps: [],
        error: `Na linha ${lineNum}: ${res.error}`,
        errorLine: lineNum,
        suggestion: res.suggestion
      };
    }

    for (let s = 0; s < res.repeatCount; s++) {
      steps.push({
        type: res.type,
        lineNumber: lineNum,
        label: BLOCK_DEFINITIONS[res.type].label
      });
    }

    if (res.repeatCount > 1 && res.type === 'move_forward') {
      if (res.repeatCount === 2) blocks.push(createBlock('repeat_2x'));
      else if (res.repeatCount === 3) blocks.push(createBlock('repeat_3x'));
      else if (res.repeatCount === 4) blocks.push(createBlock('repeat_4x'));
      else {
        for (let k = 0; k < res.repeatCount; k++) {
          blocks.push(createBlock('move_forward'));
        }
      }
    } else {
      blocks.push(createBlock(res.type));
    }
  }

  return { blocks, steps };
}
