/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhaseModel, UnitModel, ChestModel, BlockType } from '../types/game';

export type Locale = 'en-GB' | 'pt-BR';

export interface CadetProfile {
  name: string;
  badge: string;
  badgeName: string;
}

export const CADET_BADGES = [
  { icon: '🚀', id: 'rocket', nameEn: 'Rocket Pilot', namePt: 'Piloto de Foguete' },
  { icon: '🤖', id: 'robot', nameEn: 'AstroBot Co-Pilot', namePt: 'Co-Piloto AstroBot' },
  { icon: '🌟', id: 'star', nameEn: 'Cosmic Star', namePt: 'Estrela Cósmica' },
  { icon: '🛸', id: 'ufo', nameEn: 'Galaxy Explorer', namePt: 'Explorador da Galáxia' },
  { icon: '🪐', id: 'saturn', nameEn: 'Ring Voyager', namePt: 'Viajante dos Anéis' },
  { icon: '🐱', id: 'cat', nameEn: 'Cyber Kitty', namePt: 'Gatinho Cibernético' },
  { icon: '🦊', id: 'fox', nameEn: 'Solar Fox', namePt: 'Raposa Solar' },
  { icon: '👑', id: 'crown', nameEn: 'Space Champion', namePt: 'Campeão Espacial' }
];

export const UI_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  'en-GB': {
    appName: 'CodeCraft Kids',
    tagline: 'Cosmic Coding Adventure (40 Stages · Blocks to Code)',
    welcomeGreeting: 'Welcome aboard, Cadet',
    streak: 'Streak',
    crystals: 'Crystals',
    energy: 'Planet Energy',
    stars: 'Stars',
    certificates: 'Certificates',
    astroBotAcademy: 'AstroBot',
    sandbox: 'Sandbox Lab',
    profile: 'Cadet Profile',
    switchLanguage: 'Language',
    listenMission: 'Listen to Mission',
    stopVoice: 'Stop Voice',
    speaking: 'Speaking...',
    runCode: 'Run Code',
    running: 'AstroBot Moving...',
    stepByStep: 'Step',
    reset: 'Reset',
    clear: 'Clear',
    toolbox: 'Code Blocks Toolbox',
    programQueue: 'AstroBot Programme',
    dragOrClickHint: 'Tap or drag blocks into the sequence to programme AstroBot!',
    emptyQueue: 'No blocks yet! Add some commands from the left panel.',
    missionObjective: 'Mission Objective',
    needHint: 'Need a helping hand?',
    inactivityHintText: 'AstroBot has calculated the next block to guide you through the circuit!',
    viewNextBlock: 'View Next Block',
    hintSuggested: 'Suggested Block',
    hintAddBlock: 'Add this block to your programme:',
    blocksMode: '🧩 Blocks Mode',
    codeMode: '💻 Text Code',
    typingHelper: 'Code Editor · Type commands here',
    splendidJob: 'Splendid Work, Cadet',
    levelCompleted: 'Level Completed Successfully!',
    rewardGemsEarned: 'Energy Crystals Awarded',
    nextLevel: 'Next Stage',
    backToMap: 'Back to Trail',
    retryLevel: 'Try Again',
    oopsTitle: 'Oops! Let’s Try Again',
    obstacleHit: 'AstroBot stepped onto a superheated thermal node!',
    wrongTarget: 'AstroBot finished moving but hasn’t collected all crystals yet!',
    outOfBounds: 'AstroBot tried to walk beyond the space board boundary!',
    cadetRankNovice: 'Junior Explorer',
    cadetRankApprentice: 'Circuit Apprentice',
    cadetRankCommander: 'Loop Commander',
    cadetRankMaster: 'Master Programmer',
    soundOn: 'Mute Audio',
    soundOff: 'Unmute Audio',
    editCadetTitle: 'Space Cadet Profile',
    editCadetSubtitle: 'Customise your name and favourite space badge for your cosmic journey!',
    nameLabel: 'Your Cadet Name:',
    namePlaceholder: 'e.g. Oliver, Lily, Leo...',
    badgeLabel: 'Choose your Space Badge:',
    saveProfile: 'Save Profile',
    resetProgressTitle: 'Reset Progress',
    resetConfirm: 'Are you sure you want to reset all 40 stages?',
    certificatesTitle: 'Space Academy Diplomas',
    certificatesSubtitle: 'Complete each 4-stage module to earn an official accredited diploma!',
    printCertificate: 'Print / Save PDF',
    certifiedTo: 'This certifies that Space Cadet',
    certifyBody: 'has demonstrated outstanding problem-solving, algorithmic thinking, and coding mastery in the unit:',
    skillsHonoured: 'Key Competencies Mastered:',
    goldSeal: 'Official Gold Seal · Cyberia Space Academy',
    dateLabel: 'Date of Completion',
    authorizedBy: 'Certified by AstroBot & CodeCraft Academy UK',
    audioForNonReaders: 'Audio reading for young cadets who are learning to read'
  },
  'pt-BR': {
    appName: 'CodeCraft Kids',
    tagline: 'Aventura Cósmica de Programação (40 Fases · Blocos ao Código)',
    welcomeGreeting: 'Bem-vindo a bordo, Cadete',
    streak: 'Ofensiva',
    crystals: 'Cristais',
    energy: 'Energia do Planeta',
    stars: 'Estrelas',
    certificates: 'Certificados',
    astroBotAcademy: 'AstroBot',
    sandbox: 'Laboratório Livre',
    profile: 'Perfil do Cadete',
    switchLanguage: 'Idioma',
    listenMission: 'Ouvir Missão',
    stopVoice: 'Parar Voz',
    speaking: 'Falando...',
    runCode: 'Executar',
    running: 'AstroBot em Movimento...',
    stepByStep: 'Passo',
    reset: 'Reiniciar',
    clear: 'Limpar',
    toolbox: 'Blocos de Comando',
    programQueue: 'Programa do AstroBot',
    dragOrClickHint: 'Toque ou arraste os blocos para montar a sequência do AstroBot!',
    emptyQueue: 'Nenhum bloco ainda! Adicione comandos do painel esquerdo.',
    missionObjective: 'Missão do Nível',
    needHint: 'Precisa de uma mãozinha?',
    inactivityHintText: 'O AstroBot analisou o labirinto e calculou o próximo bloco correto para você!',
    viewNextBlock: 'Ver Próximo Bloco',
    hintSuggested: 'Bloco Sugerido',
    hintAddBlock: 'Adicione este bloco ao seu programa:',
    blocksMode: '🧩 Modo Blocos',
    codeMode: '💻 Digitar Código',
    typingHelper: 'Editor de Código · Digite seus comandos aqui',
    splendidJob: 'Incrível, Cadete',
    levelCompleted: 'Fase Concluída com Sucesso!',
    rewardGemsEarned: 'Cristais de Energia Ganhos',
    nextLevel: 'Próxima Fase',
    backToMap: 'Voltar à Trilha',
    retryLevel: 'Tentar Novamente',
    oopsTitle: 'Ops! Vamos Tentar de Novo',
    obstacleHit: 'O AstroBot pisou num nó térmico superaquecido!',
    wrongTarget: 'O robô terminou os passos mas ainda não coletou todos os cristais!',
    outOfBounds: 'O AstroBot tentou sair dos limites da placa cósmica!',
    cadetRankNovice: 'Explorador Júnior',
    cadetRankApprentice: 'Aprendiz de Circuitos',
    cadetRankCommander: 'Comandante de Loops',
    cadetRankMaster: 'Mestre Programador',
    soundOn: 'Desativar Som',
    soundOff: 'Ativar Som',
    editCadetTitle: 'Perfil do Cadete Espacial',
    editCadetSubtitle: 'Personalize seu nome e emblema favorito para sua jornada cósmica!',
    nameLabel: 'Nome do Cadete:',
    namePlaceholder: 'ex: Arthur, Sofia, Lucas...',
    badgeLabel: 'Escolha seu Emblema Espacial:',
    saveProfile: 'Salvar Perfil',
    resetProgressTitle: 'Reiniciar Progresso',
    resetConfirm: 'Tem certeza que deseja reiniciar as 40 fases?',
    certificatesTitle: 'Diplomas da Academia Espacial',
    certificatesSubtitle: 'Complete cada módulo de 4 fases para desbloquear seu diploma oficial!',
    printCertificate: 'Imprimir / Salvar PDF',
    certifiedTo: 'Certificamos com louvor que o Cadete Espacial',
    certifyBody: 'demonstrou excelência, raciocínio lógico e domínio de programação no módulo:',
    skillsHonoured: 'Competências Chave Conquistadas:',
    goldSeal: 'Selo Oficial de Ouro · Academia Espacial de Cyberia',
    dateLabel: 'Data de Conclusão',
    authorizedBy: 'Homologado por AstroBot & CodeCraft Kids',
    audioForNonReaders: 'Áudio narrador para crianças pequenas que ainda estão aprendendo a ler'
  }
};

export const BLOCK_TRANSLATIONS: Record<Locale, Record<BlockType, { label: string; desc: string }>> = {
  'en-GB': {
    move_forward: { label: 'Move Forward', desc: 'Walk 1 step in current direction' },
    turn_right: { label: 'Turn Right 90°', desc: 'Rotate clockwise 90 degrees' },
    turn_left: { label: 'Turn Left 90°', desc: 'Rotate anti-clockwise 90 degrees' },
    move_backward: { label: 'Step Back', desc: 'Reverse 1 step without turning' },
    collect_crystal: { label: 'Collect Crystal', desc: 'Gather the cosmic energy crystal' },
    repeat_2x: { label: 'Loop 2x', desc: 'Repeat contained actions twice' },
    repeat_3x: { label: 'Loop 3x', desc: 'Repeat contained actions 3 times' },
    repeat_4x: { label: 'Loop 4x', desc: 'Repeat contained actions 4 times' }
  },
  'pt-BR': {
    move_forward: { label: 'Avançar', desc: 'Anda 1 casa na direção atual' },
    turn_right: { label: 'Girar Direita', desc: 'Gira 90 graus no sentido horário' },
    turn_left: { label: 'Girar Esquerda', desc: 'Gira 90 graus no sentido anti-horário' },
    move_backward: { label: 'Recuar', desc: 'Anda 1 casa para trás sem virar' },
    collect_crystal: { label: 'Coletar Cristal', desc: 'Recolhe o cristal cósmico da célula' },
    repeat_2x: { label: 'Repetir 2x', desc: 'Executa os blocos internos duas vezes' },
    repeat_3x: { label: 'Repetir 3x', desc: 'Executa os blocos internos 3 vezes' },
    repeat_4x: { label: 'Repetir 4x', desc: 'Executa os blocos internos 4 vezes' }
  }
};

/**
 * British English phase titles and descriptions for all 40 stages
 */
export const EN_PHASE_TRANSLATIONS: Record<number, { title: string; subtitle: string; description: string; concept: string; tutorialHint?: string }> = {
  1: {
    title: 'Island of First Steps',
    subtitle: 'Straight Line Movement',
    description: 'Programme AstroBot to walk forward 2 steps onto the green energy node!',
    concept: 'Step-by-step Sequences',
    tutorialHint: 'Tap "Move Forward" twice and hit "Run Code"!'
  },
  2: {
    title: 'The Great Leap Forward',
    subtitle: 'Distance Calculation',
    description: 'Calculate the coordinates and guide AstroBot forward 3 squares to activate the warp point.',
    concept: 'Distance Counting',
    tutorialHint: 'Count each square carefully before clicking execute.'
  },
  3: {
    title: 'The Clockwise Corner',
    subtitle: '90-Degree Turns',
    description: 'Walk forward, turn right 90 degrees clockwise, and step onto the target coordinate!',
    concept: 'Spatial Rotations',
    tutorialHint: 'Always turn before stepping in the new direction.'
  },
  4: {
    title: 'Crystal Zig-Zag',
    subtitle: 'S-Bend Navigation',
    description: 'Navigate the S-bend! Move, turn right, move, turn left, and claim the power core.',
    concept: 'Combined Directional Turns',
    tutorialHint: 'Think like a robot: your left depends on where AstroBot is facing!'
  },
  5: {
    title: 'The Thermal Hazard',
    subtitle: 'First Obstacle Avoidance',
    description: 'A superheated circuit blocks the direct route. Detour safely around the hot core!',
    concept: 'Hazard Avoidance',
    tutorialHint: 'Turn before the red tile to steer around danger.'
  },
  6: {
    title: 'The Double Barrier',
    subtitle: 'Precision Waypoint Path',
    description: 'Two firewall nodes lie ahead. Chart a detour through the cool passage to reach the target.',
    concept: 'Pathfinding & Detours',
    tutorialHint: 'Break the route down into two short segments.'
  },
  7: {
    title: 'Reverse Thrusters',
    subtitle: 'Stepping Backward',
    description: 'Use the "Step Back" command to reverse into safe ground without having to rotate your head!',
    concept: 'Reverse Motion & Efficiency',
    tutorialHint: 'Step Back moves backward while keeping your facing direction.'
  },
  8: {
    title: 'Fortress of Firewalls',
    subtitle: 'Module 2 Boss Circuit',
    description: 'A maze of thermal hazards! Weave through the corridors without singeing AstroBot’s circuits.',
    concept: 'Complex Route Planning',
    tutorialHint: 'Plan your entire sequence before tapping execute.'
  },
  9: {
    title: 'The Dual Stride Loop',
    subtitle: 'First Repeat Block',
    description: 'Save energy by grouping repeated commands into a 2x Loop structure!',
    concept: 'Repeat Loops (2x)',
    tutorialHint: 'One loop of 2 steps takes half the code!'
  },
  10: {
    title: 'Triple Stride Runner',
    subtitle: 'Repetition 3x',
    description: 'Use a 3x Loop to traverse the long bus line in a clean, elegant programme.',
    concept: 'Repeat Loops (3x)',
    tutorialHint: 'Place "Move Forward" inside the 3x repeat block.'
  },
  11: {
    title: 'The Cosmic Staircase',
    subtitle: 'Pattern Recognition',
    description: 'Notice the repeating pattern: Step, turn left, step, turn right! Wrap it inside a loop.',
    concept: 'Pattern Loops',
    tutorialHint: 'Find the repeating sequence and repeat it twice.'
  },
  12: {
    title: 'The Golden Circuit Orbit',
    subtitle: 'Square Geometry & 4x Loop',
    description: 'Walk a full square patrol perimeter using a 4x Repeat block to collect the crystal!',
    concept: 'Geometric Loops (4x)',
    tutorialHint: 'A square has 4 equal sides: Move then Turn Right!'
  },
  13: {
    title: 'The First Energy Shard',
    subtitle: 'Collect Crystal Action',
    description: 'Step onto the energy crystal and use the "Collect Crystal" command to harvest it!',
    concept: 'Target Item Collection',
    tutorialHint: 'Stand directly on top of the crystal, then use Collect!'
  },
  14: {
    title: 'The Twin Crystal Trail',
    subtitle: 'Multi-Item Gathering',
    description: 'Gather both floating crystals along the corridor before proceeding to the warp core.',
    concept: 'Multi-target Routing',
    tutorialHint: 'Collect each crystal before moving on.'
  },
  15: {
    title: 'Branching Crossroads',
    subtitle: 'Deciding the Best Route',
    description: 'Choose between two passages to collect the crystal and dodge the overheat node.',
    concept: 'Optimal Path Decision',
    tutorialHint: 'The lower path is cooler and shorter.'
  },
  16: {
    title: 'The Stellar Diamond Run',
    subtitle: 'Harvesting Under Fire',
    description: 'Three rare crystals surround the vortex. Plot a perimeter sweep to collect all three!',
    concept: 'Full Area Clearance',
    tutorialHint: 'Check all 3 crystals off before hitting the target.'
  },
  17: {
    title: 'The Grand Circuit Labyrinth',
    subtitle: 'Wide Board Navigation',
    description: 'Welcome to the 6x6 processor grid! Plan a long, precise voyage across the chip.',
    concept: 'Large Grid Coordinates',
    tutorialHint: 'Look at the X and Y coordinates to guide your moves.'
  },
  18: {
    title: 'The Silicon Canyon',
    subtitle: 'Narrow Corridor Maneuvers',
    description: 'High-voltage walls restrict movement. Keep your steering tight and accurate.',
    concept: 'Corridor Navigation',
    tutorialHint: 'Take it one turn at a time.'
  },
  19: {
    title: 'The Quantum Slalom',
    subtitle: 'Alternating Left and Right',
    description: 'Slalom left and right around the heatsinks while picking up power cells.',
    concept: 'Alternating Curvature',
    tutorialHint: 'Zig zag: Left, Forward, Right, Forward.'
  },
  20: {
    title: 'The Central Mainframe',
    subtitle: 'Module 5 Grand Finale',
    description: 'Bypass four dynamic hazards and gather the mainframe core to awaken the planetary network.',
    concept: 'Complex Problem Decomposition',
    tutorialHint: 'Clear the hazards in order: first, second, then final stretch.'
  },
  21: {
    title: 'The Loop Corridor',
    subtitle: 'Optimised Crystal Sweeps',
    description: 'Use a loop to harvest crystals placed at regular intervals with minimal block usage.',
    concept: 'Algorithmic Optimization',
    tutorialHint: 'Looping move and collect scores 3 stars!'
  },
  22: {
    title: 'The Microchip Spirals',
    subtitle: 'Inward Spiral Path',
    description: 'Spiral inwards towards the CPU socket without touching the fiery edges.',
    concept: 'Inward Spiral Geometry',
    tutorialHint: 'Each leg of the spiral is slightly shorter.'
  },
  23: {
    title: 'Efficiency Benchmark',
    subtitle: 'Star Perfection Challenge',
    description: 'Solve the level using no more than 4 blocks to achieve the coveted 3-Star Gold rating!',
    concept: 'Code Golf / Brevity',
    tutorialHint: 'Combine repeats to keep your block count super low.'
  },
  24: {
    title: 'Graduation: The Master Core',
    subtitle: 'Supreme Junior Programmer Trial',
    description: 'Combine every skill: loops, turns, crystal collection, and obstacle avoidance for the Master Diploma!',
    concept: 'Comprehensive Synthesis',
    tutorialHint: 'You have mastered the fundamentals. Trust your logic!'
  },
  25: {
    title: 'Welcome to the Code Console',
    subtitle: 'First Typed Command',
    description: 'Step into real programming! Type moveForward(); in the console to command AstroBot with genuine code.',
    concept: 'Syntax & Textual Commands',
    tutorialHint: 'Type moveForward(); and click Run Code!'
  },
  26: {
    title: 'The Syntax Semicolon',
    subtitle: 'Command Sequences in Code',
    description: 'Type consecutive code lines. Don’t forget the semicolon at the end of each command statement!',
    concept: 'Command Sequencing & Semicolons',
    tutorialHint: 'Write moveForward(); then turnRight(); on the next line.'
  },
  27: {
    title: 'The Code Steerer',
    subtitle: 'turnLeft() & turnRight()',
    description: 'Navigate the corner exclusively through typed function calls: moveForward() and turnLeft().',
    concept: 'Function Calls & Parameters',
    tutorialHint: 'Capital letters matter: turnLeft() has a capital L!'
  },
  28: {
    title: 'Console Crystal Collector',
    subtitle: 'collect() in Code',
    description: 'Write real code to step onto the crystal and call collect(); to harvest the cyber gem.',
    concept: 'Object Interaction via Code',
    tutorialHint: 'moveForward(); collect(); moveForward();'
  },
  29: {
    title: 'First Loop in Pure Code',
    subtitle: 'repeat(2) { ... }',
    description: 'Type a repeat loop with curly brackets: repeat(2) { moveForward(); } in your code editor.',
    concept: 'Block Scoping & Loops in Text',
    tutorialHint: 'Open curly brace { then command, then close }!'
  },
  30: {
    title: 'The Triple Code Loop',
    subtitle: 'repeat(3) Pattern',
    description: 'Harness repeat(3) { ... } to traverse long stretches using just 3 lines of typed script.',
    concept: 'Script Conciseness',
    tutorialHint: 'Indent your commands inside the repeat block.'
  },
  31: {
    title: 'The Staircase Script',
    subtitle: 'Nested Statements inside Loops',
    description: 'Put multiple statements inside one code loop: repeat(2) { moveForward(); turnRight(); moveForward(); turnLeft(); }',
    concept: 'Compound Statements in Loops',
    tutorialHint: 'Put all 4 actions inside the curly braces.'
  },
  32: {
    title: 'The 4-Wall Code Perimeter',
    subtitle: 'Square Function in Code',
    description: 'Programme a full perimeter patrol using repeat(4) { moveForward(2); turnRight(); } in code.',
    concept: 'Perimeter Loops & Iteration',
    tutorialHint: 'A 4x loop creates a full square rotation.'
  },
  33: {
    title: 'Hello, Functions!',
    subtitle: 'Defining Custom Routines',
    description: 'Learn the superpower of real coders: group commands into a reusable function block!',
    concept: 'Modular Functions',
    tutorialHint: 'Functions let you give a name to a sequence of steps.'
  },
  34: {
    title: 'The Detour Function',
    subtitle: 'dodgeObstacle() Routine',
    description: 'Define a function to dodge hazards, then call it twice to bypass multiple firewall nodes.',
    concept: 'Function Reusability',
    tutorialHint: 'Define once, call as many times as you like!'
  },
  35: {
    title: 'Crystal Harvester Function',
    subtitle: 'harvestAndStep()',
    description: 'Package moving and crystal gathering into a neat function to clean up the power grid.',
    concept: 'Routine Abstraction',
    tutorialHint: 'Your code stays short and readable with functions.'
  },
  36: {
    title: 'The Multi-Function Script',
    subtitle: 'Combining Multiple Procedures',
    description: 'Combine two distinct functions in one programme to navigate a dual-objective arena.',
    concept: 'Multi-routine Architecture',
    tutorialHint: 'Plan your functions before writing the main script.'
  },
  37: {
    title: 'The Black Hole Event Horizon',
    subtitle: 'Pure Code Challenge I',
    description: 'Gravitational anomalies surround the singularity. Write a pristine script to navigate the threshold.',
    concept: 'Advanced Algorithm Design',
    tutorialHint: 'Review coordinates and plot your flight path.'
  },
  38: {
    title: 'The Quantum Bypass',
    subtitle: 'Precision Code Route',
    description: 'Thermal lasers pulse across the chip. Time your moves and route through the safe corridor in pure code.',
    concept: 'High-Precision Coding',
    tutorialHint: 'Check every line carefully in the text editor.'
  },
  39: {
    title: 'The Singularity Matrix',
    subtitle: 'Full Spectrum Code Mastery',
    description: 'Synthesise loops, turns, backward steps, and crystal harvesting in one master programme.',
    concept: 'Full Spectrum Problem Solving',
    tutorialHint: 'Break the problem down into 3 distinct legs.'
  },
  40: {
    title: 'Master Hacker: The Cosmic Core',
    subtitle: 'Ultimate Championship Stage',
    description: 'The ultimate test for Cyberia’s top Space Cadet! Write the master script to awaken the Cosmic Supercomputer.',
    concept: 'Master Hacker Graduation',
    tutorialHint: 'Cadet, you are now a genuine programmer! Ignite the core!'
  }
};

/**
 * British English Unit translations
 */
export const EN_UNIT_TRANSLATIONS: Record<number, {
  title: string;
  subtitle: string;
  description: string;
  weekTitle: string;
  certificateTitle: string;
  specialty: string;
  skillsLearned: string[];
}> = {
  1: {
    title: 'Unit 1: First Steps on the Circuit',
    subtitle: 'Sequences & Directional Turns',
    description: 'Begin your journey into computer programming! Learn how to move AstroBot and execute 90-degree turns across the motherboard.',
    weekTitle: 'Module 1 · Foundations',
    certificateTitle: 'Certificate in Sequences & Commands',
    specialty: 'Programming Fundamentals & 90° Rotations',
    skillsLearned: ['Step-by-step sequencing', 'Spatial orientation', 'Clockwise & anti-clockwise turns', 'Coordinate interpretation (X, Y)']
  },
  2: {
    title: 'Unit 2: Obstacle Detection & Detours',
    subtitle: 'Navigating Around Hazards & Thermal Walls',
    description: 'Learn to map out safe routes, steer clear of superheated nodes, and solve circuit mazes in Cyberia.',
    weekTitle: 'Module 2 · Obstacles',
    certificateTitle: 'Certificate in Hazard Avoidance & Detours',
    specialty: 'Circuit Maze Solving & Hazard Evasion',
    skillsLearned: ['Thermal hazard identification', 'Advance path planning', 'Reverse thruster commands', 'Problem decomposition']
  },
  3: {
    title: 'Unit 3: The Power of Loops',
    subtitle: 'Code Optimisation with Repeat Blocks',
    description: 'Multiply your moves and conserve energy by using repeat loops just like a professional software engineer.',
    weekTitle: 'Module 3 · Loops & Repetition',
    certificateTitle: 'Certificate of Loop Mastery',
    specialty: 'Algorithmic Optimisation & Repeat Structures',
    skillsLearned: ['Repeat loops (2x, 3x, 4x)', 'Geometric pattern recognition', 'Code redundancy reduction', '3-Star efficiency benchmarking']
  },
  4: {
    title: 'Unit 4: Collecting Energy Crystals',
    subtitle: 'Interactive Goals & Multi-Objective Missions',
    description: 'Search out rare glowing energy crystals, plan collection routes, and recharge the planetary grid.',
    weekTitle: 'Module 4 · Energy Shards',
    certificateTitle: 'Certificate in Resource Harvesting',
    specialty: 'Multi-Objective Waypoint Routing',
    skillsLearned: ['Action-based command execution', 'Multi-target collection', 'Optimal path selection', 'Spatial memory and route planning']
  },
  5: {
    title: 'Unit 5: The Grand Circuit Labyrinth',
    subtitle: 'Large-Scale Grid Navigation',
    description: 'Expand your vision to 6x6 processor boards. Tackle complex corridors, narrow alleys, and dynamic heatsinks.',
    weekTitle: 'Module 5 · Complex Mazes',
    certificateTitle: 'Certificate in Advanced Spatial Navigation',
    specialty: 'Large-Scale Grid Pathfinding & Heuristics',
    skillsLearned: ['Large grid coordinate tracking', 'Corridor maneuverability', 'Slalom and zig-zag geometry', 'Strategic detour optimization']
  },
  6: {
    title: 'Unit 6: Efficiency & Junior Graduation',
    subtitle: 'Star Mastery & Supreme Diploma (24 Stages)',
    description: 'Refine your programmes to achieve maximum stars with minimal block usage, culminating in the Junior Graduation diploma!',
    weekTitle: 'Module 6 · Junior Graduation',
    certificateTitle: 'DIPLOMA OF SUPREME JUNIOR PROGRAMMER',
    specialty: 'Mastery of Block-Based Algorithmic Design',
    skillsLearned: ['Code golf and brevity', 'Spiral geometric loops', 'Autonomous problem decomposition', 'Full Junior Graduate accreditation']
  },
  7: {
    title: 'Unit 7: The Code Terminal',
    subtitle: 'From Drag-and-Drop Blocks to Typed Script',
    description: 'Transition from visual blocks into genuine code syntax! Type moveForward(); and turnRight(); in the developer console.',
    weekTitle: 'Module 7 · Text Coding',
    certificateTitle: 'Certificate in Text-Based Coding',
    specialty: 'Real Syntax, Functions & Semicolons',
    skillsLearned: ['Script typing & syntax accuracy', 'Parentheses & semicolons', 'Case sensitivity in programming', 'Debugging console errors']
  },
  8: {
    title: 'Unit 8: Loops & Iterations in Code',
    subtitle: 'Typing repeat() { ... } with Curly Braces',
    description: 'Type authentic iteration statements using repeat(n) with curly brackets { } to command loops directly in text.',
    weekTitle: 'Module 8 · Iteration Scripts',
    certificateTitle: 'Certificate in Iteration Scripting',
    specialty: 'Block Scoping & Structured Syntax',
    skillsLearned: ['Curly brace scoping { }', 'Typed repeat iterations', 'Code indentation & readability', 'Efficient text-based execution']
  },
  9: {
    title: 'Unit 9: Functions & Automation',
    subtitle: 'Create Your Own Custom Super-Commands',
    description: 'Combine sequences of steps into custom reusable routines like function dodge() and invoke them with a single word!',
    weekTitle: 'Module 9 · Functions',
    certificateTitle: 'Certificate in Stellar Function Architecture',
    specialty: 'Modular Procedures & Code Reuse',
    skillsLearned: ['Custom function definition', 'Modular problem decomposition', 'Code reusability & elegance', 'Clean architecture principles']
  },
  10: {
    title: 'Unit 10: The Black Hole & Master Hacker',
    subtitle: 'Full-Stack Scripting & Final Championship',
    description: 'The supreme test of the universe’s finest young coders! Solve giant quantum labyrinths writing pure code scripts.',
    weekTitle: 'Module 10 · Master Hackers',
    certificateTitle: 'LEGENDARY COSMIC HACKER DIPLOMA',
    specialty: 'Full-Stack Space Cadet Programmer of Cyberia',
    skillsLearned: ['Full text code scripting', 'Complex multi-routine programs', 'Quantum maze autonomous navigation', 'Cosmic Master Hacker accreditation']
  }
};

/**
 * British English Chest translations
 */
export const EN_CHEST_TRANSLATIONS: Record<string, string> = {
  chest_1: 'Alpha Energy Chest',
  chest_2: 'Space Battery Capsule',
  chest_3: 'Quark Crystals Vault',
  chest_4: 'Stellar Core Relic',
  chest_5: 'Quantum Matrix Treasure',
  chest_6: 'Supreme Cosmic Chest',
  chest_7: 'Crystal Syntax Chest',
  chest_8: 'Quantum Terminal Safe',
  chest_9: 'Modular Functions Capsule',
  chest_10: 'Cosmic Master Hacker Ark'
};

/**
 * Format friendly text for text-to-speech to read aloud to young cadets
 */
export function buildAudioSpeechText(
  phase: PhaseModel, 
  studentName: string, 
  locale: Locale
): string {
  if (locale === 'en-GB') {
    const enPhase = EN_PHASE_TRANSLATIONS[phase.id];
    const title = enPhase?.title || phase.title;
    const description = enPhase?.description || phase.description;
    const hint = enPhase?.tutorialHint || phase.tutorialHint;

    let text = `Hello Cadet ${studentName}! Stage ${phase.id}: ${title}. ${description}.`;
    if (hint) {
      text += ` AstroBot’s tip: ${hint}`;
    }
    return text;
  } else {
    let text = `Olá Cadete ${studentName}! Fase ${phase.id}: ${phase.title}. ${phase.description}.`;
    if (phase.tutorialHint) {
      text += ` Dica do AstroBot: ${phase.tutorialHint}`;
    }
    return text;
  }
}

/**
 * Get localized phase fields
 */
export function getLocalizedPhase(phase: PhaseModel, locale: Locale): PhaseModel {
  if (locale === 'pt-BR') return phase;
  const trans = EN_PHASE_TRANSLATIONS[phase.id];
  if (!trans) return phase;

  return {
    ...phase,
    title: trans.title,
    subtitle: trans.subtitle,
    description: trans.description,
    concept: trans.concept,
    tutorialHint: trans.tutorialHint || phase.tutorialHint
  };
}

/**
 * Get localized unit fields
 */
export function getLocalizedUnit(unit: UnitModel, locale: Locale): UnitModel {
  if (locale === 'pt-BR') return unit;
  const trans = EN_UNIT_TRANSLATIONS[unit.id];
  if (!trans) return unit;

  return {
    ...unit,
    title: trans.title,
    subtitle: trans.subtitle,
    description: trans.description,
    weekTitle: trans.weekTitle,
    certificate: {
      ...unit.certificate,
      title: trans.certificateTitle,
      specialty: trans.specialty,
      skillsLearned: trans.skillsLearned
    }
  };
}
