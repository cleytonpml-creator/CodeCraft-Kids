/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhaseModel, UnitModel, ChestModel } from '../types/game';

export const UNITS: UnitModel[] = [
  {
    id: 1,
    number: 1,
    weekTitle: "Módulo 1 · Fundamentos",
    title: "Unidade 1: Primeiros Passos no Circuito",
    subtitle: "Sequências e Curvas Espaciais",
    description: "Inicie sua jornada no mundo da programação aprendendo a mover o AstroBot e girar pelas trilhas da placa-mãe.",
    colorTheme: "emerald",
    certificate: {
      title: "Certificado de Sequências & Comandos",
      specialty: "Fundamentos de Programação e Rotações 90°",
      skillsLearned: ["Sequenciamento de passos", "Orientação espacial", "Giros no sentido horário e anti-horário", "Interpretação de coordenadas (X, Y)"],
      badgeIcon: "Footprints",
      levelRange: "Fases 1 a 4"
    },
    guidebook: {
      title: "Caderno do Módulo 1: Sequências & Coordenadas",
      tips: [
        {
          title: "1. O Que é um Algoritmo?",
          description: "É como uma receita mágica! Uma lista de passos ordenados que o computador segue sem pular nenhuma instrução.",
          codeExample: "1. Avançar\n2. Girar Direita\n3. Avançar",
          iconName: "Footprints"
        },
        {
          title: "2. Como Virar 90 Graus?",
          description: "O comando 'Avançar' sempre anda para onde a cabeça do AstroBot está apontando. Para mudar de rumo, gire primeiro!",
          codeExample: "Girar Direita (sentido horário)\nGirar Esquerda (sentido anti-horário)",
          iconName: "RotateCw"
        },
        {
          title: "3. O Tabuleiro de Coordenadas (X, Y)",
          description: "O eixo X vai da esquerda para a direita e o eixo Y vai de baixo para cima. Conhecer a posição ajuda a planejar!",
          codeExample: "Posição Atual: (X=0, Y=0)\nAlvo: (X=3, Y=2)",
          iconName: "Sparkles"
        }
      ]
    }
  },
  {
    id: 2,
    number: 2,
    weekTitle: "Módulo 2 · Obstáculos",
    title: "Unidade 2: Detecção de Obstáculos & Desvios",
    subtitle: "Navegação em Labirintos com Barreiras",
    description: "Aprenda a mapear rotas seguras, desviar de nós superaquecidos e superar becos sem saída térmicos de Cyberia.",
    colorTheme: "cyan",
    certificate: {
      title: "Certificado de Navegação & Desvios",
      specialty: "Resolução de Labirintos e Desvios de Obstáculos",
      skillsLearned: ["Identificação de perigos térmicos", "Planejamento prévio de curvas", "Comandos de recuo", "Decomposição de problemas"],
      badgeIcon: "Flame",
      levelRange: "Fases 5 a 8"
    },
    guidebook: {
      title: "Caderno do Módulo 2: Obstáculos & Planejamento",
      tips: [
        {
          title: "1. Nós Térmicos e Firewalls",
          description: "Nós vermelhos superaquecidos danificam o AstroBot. Sempre faça o robô girar e contornar a área perigosa.",
          codeExample: "Antes do obstáculo: Girar -> Avançar -> Girar de volta",
          iconName: "Flame"
        },
        {
          title: "2. Comandos de Recuo",
          description: "O bloco 'Mover para Trás' permite que o robô recue 1 casa sem mudar a direção que a cabeça está apontando.",
          codeExample: "Mover para Trás (recua na direção oposta)",
          iconName: "StepForward"
        },
        {
          title: "3. O Princípio da Decomposição",
          description: "Quebre um trajeto difícil em pedacinhos menores: Primeiro chegue até a curva, depois até o alvo!",
          codeExample: "Parte 1: Superar a barreira\nParte 2: Reta final",
          iconName: "Footprints"
        }
      ]
    }
  },
  {
    id: 3,
    number: 3,
    weekTitle: "Módulo 3 · Loops & Repetições",
    title: "Unidade 3: O Poder dos Laços (Loops)",
    subtitle: "Otimização de Código com Repetições",
    description: "Multiplique comandos e economize energia usando laços de repetição (loops) como um verdadeiro programador profissional.",
    colorTheme: "indigo",
    certificate: {
      title: "Certificado de Mestre dos Loops",
      specialty: "Otimização Algorítmica e Estruturas de Repetição",
      skillsLearned: ["Laços de repetição (Loops)", "Reconhecimento de padrões geométricos", "Redução de redundância de código", "Conquista de estrelas por eficiência"],
      badgeIcon: "Repeat",
      levelRange: "Fases 9 a 12"
    },
    guidebook: {
      title: "Caderno do Módulo 3: Laços e Repetições",
      tips: [
        {
          title: "1. O Que é um Loop de Repetição?",
          description: "Em vez de colocar 4 blocos iguais de 'Avançar', use 'Repetir 4x'. Você escreve menos e ganha a pontuação máxima de 3 estrelas!",
          codeExample: "Repetir 4x { Avançar }",
          iconName: "Repeat"
        },
        {
          title: "2. Identificando Padrões Repetitivos",
          description: "Olhe para o mapa e procure escadas ou corredores retos. Onde você vê ações idênticas seguidas, use um Loop!",
          codeExample: "Avançar + Avançar = Repetir 2x\nAvançar x3 = Repetir 3x",
          iconName: "Repeat"
        },
        {
          title: "3. Economia de Código e Estrelas",
          description: "Para conquistar 3 estrelas, use a menor quantidade possível de blocos. Os loops são sua arma secreta!",
          codeExample: "Par de 3 estrelas: Use loops!",
          iconName: "Sparkles"
        }
      ]
    }
  },
  {
    id: 4,
    number: 4,
    weekTitle: "Módulo 4 · Múltiplos Objetivos",
    title: "Unidade 4: Coleta Múltipla & Joias Cósmicas",
    subtitle: "Rotas Prioritárias e Portais Energéticos",
    description: "Colete múltiplos cristais espaciais organizando a melhor ordem de paradas antes de cruzar o portal dimensional.",
    colorTheme: "fuchsia",
    certificate: {
      title: "Certificado de Coleta & Otimização",
      specialty: "Gerenciamento de Múltiplos Objetivos e Roteamento",
      skillsLearned: ["Planejamento de rotas com múltiplos nós", "Priorização de alvos", "Verificação de pré-condições de vitória", "Eficiência energética"],
      badgeIcon: "Sparkles",
      levelRange: "Fases 13 a 16"
    },
    guidebook: {
      title: "Caderno do Módulo 4: Cristais Múltiplos & Portais",
      tips: [
        {
          title: "1. A Ordem dos Cristais",
          description: "Não tente pegar o cristal mais distante primeiro se outro estiver no caminho. Trace a rota mais curta passando por todos!",
          codeExample: "Cristal mais próximo -> Cristal intermediário -> Portal",
          iconName: "Sparkles"
        },
        {
          title: "2. Checagem de Objetivos",
          description: "O portal cósmico só aceita a ativação quando todos os cristais do setor tiverem sido recolhidos pelo robô.",
          codeExample: "Colete todos antes de pisar no portal!",
          iconName: "Footprints"
        }
      ]
    }
  },
  {
    id: 5,
    number: 5,
    weekTitle: "Módulo 5 · Padrões & Decomposição",
    title: "Unidade 5: Padrões Avançados & Espirais",
    subtitle: "Sub-rotinas e Geometria Algorítmica",
    description: "Domine labirintos em espiral, escadas duplas e circuitos intrincados aplicando decomposição de alto nível.",
    colorTheme: "amber",
    certificate: {
      title: "Certificado de Arquiteto de Padrões",
      specialty: "Padrões Geométricos e Decomposição Complexa",
      skillsLearned: ["Algoritmos de espiral", "Laços combinados com rotação", "Previsão de colisões em grade ampla", "Pensamento computacional analítico"],
      badgeIcon: "Award",
      levelRange: "Fases 17 a 20"
    },
    guidebook: {
      title: "Caderno do Módulo 5: Padrões & Espirais",
      tips: [
        {
          title: "1. O Algoritmo da Escada",
          description: "Uma escada é simplesmente (Avançar -> Girar -> Avançar -> Girar). Repetir esse padrão sobe qualquer montanha!",
          codeExample: "Sub-padrão: [Avançar, Girar, Avançar, Girar]",
          iconName: "Repeat"
        },
        {
          title: "2. Espirais Espaciais",
          description: "Para entrar no centro de um labirinto espiral, cada volta fica menor. Ajuste a quantidade de passos em cada loop!",
          codeExample: "Passo longo -> Vira -> Passo médio -> Vira",
          iconName: "RotateCw"
        }
      ]
    }
  },
  {
    id: 6,
    number: 6,
    weekTitle: "Módulo 6 · Formatura Cósmica",
    title: "Unidade 6: O Grande Reator de Cyberia",
    subtitle: "O Desafio Supremo de Engenharia Espacial",
    description: "O ápice de todo o curso! Integre sequências, loops, desvios e cristais para restaurar Cyberia a 100% e conquistar seu Diploma!",
    colorTheme: "teal",
    certificate: {
      title: "DIPLOMA SUPREMO DE ENGENHEIRO MIRIM",
      specialty: "Formatura Cósmica em Programação Infantil",
      skillsLearned: ["Pensamento computacional completo", "Otimização máxima de código", "Autonomia em resolução de problemas", "Engenheiro mirim de Cyberia"],
      badgeIcon: "Crown",
      levelRange: "Fases 21 a 24"
    },
    guidebook: {
      title: "Caderno do Módulo 6: Formatura & Maestria",
      tips: [
        {
          title: "1. A Grande Fusão Planetária",
          description: "Você chegou ao núcleo! Use toda a sua experiência acumulada ao longo das 24 fases para vencer este desafio supremo.",
          codeExample: "100% de Energia no Planeta!",
          iconName: "Crown"
        },
        {
          title: "2. Você Agora é um Programador!",
          description: "Completar este curso significa que sua mente já sabe pensar em lógica, algoritmos e automação. Parabéns!",
          codeExample: "Código concluído com louvor!",
          iconName: "Trophy"
        }
      ]
    }
  },
  {
    id: 7,
    number: 7,
    weekTitle: "Módulo 7 · A Ponte do Código",
    title: "Unidade 7: A Ponte do Código Real",
    subtitle: "Do Bloco Visual à Linha de Código",
    description: "Dê o primeiro salto profissional! Veja cada bloco se transformar em código real de verdade: avancar(), virarDireita() e aprenda a ler sintaxe com parênteses.",
    colorTheme: "violet",
    certificate: {
      title: "Certificado de Tradutor de Código Estelar",
      specialty: "Transição de Blocos para Sintaxe e Comandos Reais",
      skillsLearned: ["Tradução de blocos em comandos reais", "Uso de parênteses e argumentos avancar(n)", "Estrutura e sintaxe de comandos", "Leitura de código de programador"],
      badgeIcon: "Code",
      levelRange: "Fases 25 a 28"
    },
    guidebook: {
      title: "Caderno do Módulo 7: A Ponte do Código",
      tips: [
        {
          title: "1. O Que Significam os Parênteses ()?",
          description: "Na programação real, os comandos usam parênteses () para dizer ao computador: 'Execute esta ação agora!'. Exemplo: avancar();",
          codeExample: "avancar();\nvirarDireita();\navancar();",
          iconName: "Code"
        },
        {
          title: "2. Comandos com Parâmetros: avancar(3)",
          description: "Em vez de colocar três blocos de avançar, você pode passar um número dentro dos parênteses: avancar(3); faz o AstroBot dar 3 passos!",
          codeExample: "avancar(3); // Anda 3 casas direto!",
          iconName: "Sparkles"
        },
        {
          title: "3. O Ponto e Vírgula (;)",
          description: "O ponto e vírgula funciona como o ponto final de uma frase. Ele avisa que aquele comando terminou e o próximo pode começar.",
          codeExample: "virarDireita(); // ponto final do comando!",
          iconName: "CheckCircle2"
        }
      ]
    }
  },
  {
    id: 8,
    number: 8,
    weekTitle: "Módulo 8 · Terminal Espacial",
    title: "Unidade 8: O Terminal de Comandos Digitados",
    subtitle: "Teclado Cósmico e Digitação Direta",
    description: "Assuma o teclado da nave espacial! Escreva seus próprios comandos diretamente no editor com ajuda do AstroBot e resolva seus primeiros erros de sintaxe.",
    colorTheme: "rose",
    certificate: {
      title: "Certificado de Piloto do Terminal Cósmico",
      specialty: "Digitação Autônoma e Resolução de Erros de Sintaxe",
      skillsLearned: ["Digitação de comandos no teclado espacial", "Uso autônomo do editor de código", "Diagnóstico de mensagens de erro", "Correção ágil de digitação e bugs"],
      badgeIcon: "Terminal",
      levelRange: "Fases 29 a 32"
    },
    guidebook: {
      title: "Caderno do Módulo 8: Digitação no Terminal",
      tips: [
        {
          title: "1. Digitando sem Medo!",
          description: "O AstroBot ajuda você: use o teclado para digitar ou clique nos botões de atalho rápido para inserir comandos com um clique.",
          codeExample: "avancar();\nvirarEsquerda();\ncoletar();",
          iconName: "Terminal"
        },
        {
          title: "2. Erros de Digitação (Syntax Errors)",
          description: "Se esquecer uma letrinha como 'avanca', o AstroBot sugere a correção imediatamente: 'Você quis dizer avancar()?'",
          codeExample: "Aviso: 'avanca' -> 'avancar()'",
          iconName: "AlertTriangle"
        },
        {
          title: "3. Laços em Código Textual",
          description: "No código escrito, loops usam chaves { }: repetir(3) { avancar(); } faz tudo o que estiver dentro das chaves repetir 3 vezes!",
          codeExample: "repetir(3) {\n  avancar();\n}",
          iconName: "Repeat"
        }
      ]
    }
  },
  {
    id: 9,
    number: 9,
    weekTitle: "Módulo 9 · Funções & Automação",
    title: "Unidade 9: Funções e Automação Cósmica",
    subtitle: "Crie Seus Próprios Super-Comandos",
    description: "Cansado de repetir a mesma sequência de 4 comandos? Crie suas próprias funções como funcao desviar() e chame-as como um comando mágico!",
    colorTheme: "sky",
    certificate: {
      title: "Certificado de Arquiteto de Funções Estelares",
      specialty: "Declaração e Chamada de Procedimentos Modulares",
      skillsLearned: ["Criação de funções personalizadas", "Modularização de labirintos complexos", "Reutilização de procedimentos", "Código limpo, reutilizável e profissional"],
      badgeIcon: "Cpu",
      levelRange: "Fases 33 a 36"
    },
    guidebook: {
      title: "Caderno do Módulo 9: Funções Personalizadas",
      tips: [
        {
          title: "1. O Que é uma Função?",
          description: "É como dar um nome a uma receita! Você ensina o AstroBot a fazer uma manobra e depois só precisa dizer o nome dela.",
          codeExample: "funcao desviar() {\n  virarDireita();\n  avancar();\n  virarEsquerda();\n}\ndesviar();",
          iconName: "Cpu"
        },
        {
          title: "2. Reutilizando sua Função",
          description: "Depois de criar a função desviar(), você pode chamá-la quantas vezes quiser: desviar(); desviar(); desviar(); economizando dezenas de linhas!",
          codeExample: "desviar();\navancar();\ndesviar();",
          iconName: "Sparkles"
        }
      ]
    }
  },
  {
    id: 10,
    number: 10,
    weekTitle: "Módulo 10 · Mestres Hackers",
    title: "Unidade 10: O Buraco Negro & Maestria Hacker",
    subtitle: "Programação Textual Completa e Formatura Hacker",
    description: "O teste final dos maiores programadores do universo! Supere labirintos quânticos gigantes escrevendo programas completos em código puro.",
    colorTheme: "gold",
    certificate: {
      title: "DIPLOMA HACKER CÓSMICO LENDÁRIO",
      specialty: "Mestre Programador Full-Stack Mirim de Cyberia",
      skillsLearned: ["Programação de código textual completa", "Laços aninhados em texto puro", "Resolução autônoma de quebra-cabeças quânticos", "Mestre Hacker Mirim e Campeão Supremo"],
      badgeIcon: "ShieldCheck",
      levelRange: "Fases 37 a 40"
    },
    guidebook: {
      title: "Caderno do Módulo 10: Maestria Hacker",
      tips: [
        {
          title: "1. O Desafio Final do Buraco Negro",
          description: "Aqui você programa diretamente no editor de código como um engenheiro sênior! Combine funções, loops e rotações com maestria.",
          codeExample: "// Código Supremo de Cyberia\nrepetir(4) {\n  avancar(2);\n  virarDireita();\n}",
          iconName: "Crown"
        },
        {
          title: "2. Você é um Programador de Verdade!",
          description: "Você começou arrastando blocos e agora escreve código de texto real com funções, laços e sintaxe. O cosmos é o seu limite!",
          codeExample: "Diploma Hacker Cósmico Conquistado!",
          iconName: "Trophy"
        }
      ]
    }
  }
];

export const INITIAL_CHESTS: ChestModel[] = [
  {
    id: "chest_1",
    unitId: 1,
    title: "Baú de Energia Alpha",
    rewardGems: 30,
    isOpened: false,
    requiredPhaseIdToUnlock: 4
  },
  {
    id: "chest_2",
    unitId: 2,
    title: "Cápsula de Bateria Espacial",
    rewardGems: 45,
    isOpened: false,
    requiredPhaseIdToUnlock: 8
  },
  {
    id: "chest_3",
    unitId: 3,
    title: "Cofre de Cristais de Quarks",
    rewardGems: 60,
    isOpened: false,
    requiredPhaseIdToUnlock: 12
  },
  {
    id: "chest_4",
    unitId: 4,
    title: "Relíquia do Núcleo Estelar",
    rewardGems: 75,
    isOpened: false,
    requiredPhaseIdToUnlock: 16
  },
  {
    id: "chest_5",
    unitId: 5,
    title: "Tesouro da Matriz Quântica",
    rewardGems: 90,
    isOpened: false,
    requiredPhaseIdToUnlock: 20
  },
  {
    id: "chest_6",
    unitId: 6,
    title: "O Baú Cósmico Supremo",
    rewardGems: 150,
    isOpened: false,
    requiredPhaseIdToUnlock: 24
  },
  {
    id: "chest_7",
    unitId: 7,
    title: "Baú de Síntaxe de Cristal",
    rewardGems: 75,
    isOpened: false,
    requiredPhaseIdToUnlock: 28
  },
  {
    id: "chest_8",
    unitId: 8,
    title: "Cofre do Terminal Quântico",
    rewardGems: 90,
    isOpened: false,
    requiredPhaseIdToUnlock: 32
  },
  {
    id: "chest_9",
    unitId: 9,
    title: "Cápsula de Funções Modulares",
    rewardGems: 110,
    isOpened: false,
    requiredPhaseIdToUnlock: 36
  },
  {
    id: "chest_10",
    unitId: 10,
    title: "Arca do Mestre Hacker Cósmico",
    rewardGems: 200,
    isOpened: false,
    requiredPhaseIdToUnlock: 40
  }
];

export const INITIAL_PHASES: PhaseModel[] = [
  // ==========================================
  // MÓDULO 1: SEQUÊNCIA BÁSICA (FASES 1 A 4)
  // ==========================================
  {
    id: 1,
    unitId: 1,
    weekNumber: 1,
    unitTitle: "Módulo 1 · Fundamentos",
    title: "Ilha dos Passos",
    subtitle: "Comandos Lineares de Entrada",
    description: "Ajude o AstroBot a dar seus primeiros passos no microchip central e alcançar o cristal de energia cósmica!",
    concept: "Sequência Básica",
    status: "completed",
    stars: 3,
    rewardGems: 15,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 3, y: 2 },
    obstacles: [],
    crystals: [{ id: 'c1', x: 3, y: 2 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 6, two: 8 },
    tutorialHint: "Dica: Gire o AstroBot na direção desejada antes de avançar para frente!"
  },
  {
    id: 2,
    unitId: 1,
    weekNumber: 1,
    unitTitle: "Módulo 1 · Fundamentos",
    title: "Curva dos Sensores",
    subtitle: "Dominando os Giros de 90°",
    description: "O cristal está em uma bifurcação lateral! Gire para o leste no momento certo para traçar a rota exata.",
    concept: "Giros e Ângulos",
    status: "available",
    stars: 0,
    rewardGems: 20,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 1, dir: 'right' },
    targetPos: { x: 3, y: 4 },
    obstacles: [],
    crystals: [{ id: 'c2', x: 3, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 6, two: 8 },
    tutorialHint: "Avance até o cruzamento, vire à esquerda para apontar para cima e siga até o cristal!"
  },
  {
    id: 3,
    unitId: 1,
    weekNumber: 1,
    unitTitle: "Módulo 1 · Fundamentos",
    title: "Labirinto do Chip",
    subtitle: "Combinação de Curvas e Passos",
    description: "Navegue pelo contorno do processador espacial conectando múltiplos giros com precisão militar.",
    concept: "Sequência Combinada",
    status: "locked",
    stars: 0,
    rewardGems: 20,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 4, y: 2 },
    obstacles: [{ x: 1, y: 1 }],
    crystals: [{ id: 'c3', x: 4, y: 2 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 7, two: 10 },
    tutorialHint: "Planeje os giros antes de andar. Lembre-se: 'Avançar' sempre anda para onde a cabeça aponta!"
  },
  {
    id: 4,
    unitId: 1,
    weekNumber: 1,
    unitTitle: "Módulo 1 · Fundamentos",
    title: "Rota de Teste Alpha",
    subtitle: "Prova de Conclusão do Módulo 1",
    description: "Chegue ao cristal no canto superior direito para liberar o primeiro Certificado do curso!",
    concept: "Avaliação do Módulo 1",
    status: "locked",
    stars: 0,
    rewardGems: 25,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 2, y: 2 }],
    crystals: [{ id: 'c4', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 8, two: 11 },
    tutorialHint: "Avance pela borda inferior, vire para o norte e suba com firmeza!"
  },

  // ==========================================
  // MÓDULO 2: DETECÇÃO DE OBSTÁCULOS (FASES 5 A 8)
  // ==========================================
  {
    id: 5,
    unitId: 2,
    weekNumber: 2,
    unitTitle: "Módulo 2 · Obstáculos",
    title: "Vale dos Desvios",
    subtitle: "Barreiras Térmicas no Circuito",
    description: "Atenção aos nós superaquecidos e barreiras de energia! Encontre um caminho seguro contornando os obstáculos.",
    concept: "Desvios e Obstáculos",
    status: "locked",
    stars: 0,
    rewardGems: 25,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 3 },
    obstacles: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    crystals: [{ id: 'c5', x: 4, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 8, two: 11 },
    tutorialHint: "Evite os circuitos vermelhos piscantes! Planeje curvas para desviar antes de bater."
  },
  {
    id: 6,
    unitId: 2,
    weekNumber: 2,
    unitTitle: "Módulo 2 · Obstáculos",
    title: "Zigue-Zague Estelar",
    subtitle: "Slalom Espacial em Alta Velocidade",
    description: "Obstáculos alternados formam um corredor sinuoso. Faça manobras em zigue-zague para atravessar sem arranhões.",
    concept: "Padrão de Slalom",
    status: "locked",
    stars: 0,
    rewardGems: 30,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 2 }],
    crystals: [{ id: 'c6', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 9, two: 12 },
    tutorialHint: "Pense como um piloto de nave espacial: contorne cada barreira pela abertura livre!"
  },
  {
    id: 7,
    unitId: 2,
    weekNumber: 2,
    unitTitle: "Módulo 2 · Obstáculos",
    title: "Travessia Segura",
    subtitle: "Desvio com Manobra Reversa",
    description: "Um beco sem saída térmico bloqueia a passagem direta. Use recuo inteligente ou manobras amplas para vencer.",
    concept: "Recuo e Replanejamento",
    status: "locked",
    stars: 0,
    rewardGems: 30,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 2, dir: 'right' },
    targetPos: { x: 4, y: 1 },
    obstacles: [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],
    crystals: [{ id: 'c7', x: 4, y: 1 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 9, two: 12 },
    tutorialHint: "A barreira central é alta! Suba por cima ou dê a volta por baixo para encontrar passagem."
  },
  {
    id: 8,
    unitId: 2,
    weekNumber: 2,
    unitTitle: "Módulo 2 · Obstáculos",
    title: "O Grande Desfiladeiro",
    subtitle: "Prova de Conclusão do Módulo 2",
    description: "Contorne uma parede dupla de firewalls para conquistar seu Certificado de Navegador de Obstáculos!",
    concept: "Avaliação do Módulo 2",
    status: "locked",
    stars: 0,
    rewardGems: 35,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 3 },
    obstacles: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }],
    crystals: [{ id: 'c8', x: 5, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'move_backward'],
    parStars: { three: 10, two: 14 },
    tutorialHint: "Passe pela abertura central entre as duas barreiras com calma!"
  },

  // ==========================================
  // MÓDULO 3: LOOPS E REPETIÇÕES (FASES 9 A 12)
  // ==========================================
  {
    id: 9,
    unitId: 3,
    weekNumber: 3,
    unitTitle: "Módulo 3 · Loops & Repetições",
    title: "Escadaria do Loop",
    subtitle: "Introdução a Repetições Simples",
    description: "O trajeto segue degraus idênticos. Use o bloco 'Repetir 2x' para economizar comandos e atingir a nota máxima!",
    concept: "Laços de Repetição 2x",
    status: "locked",
    stars: 0,
    rewardGems: 35,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }],
    crystals: [{ id: 'c9', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Substitua dois passos seguidos pelo bloco 'Repetir 2x' para economizar linhas de código!"
  },
  {
    id: 10,
    unitId: 3,
    weekNumber: 3,
    unitTitle: "Módulo 3 · Loops & Repetições",
    title: "Montanha Repetidora",
    subtitle: "Longas Retas com Multiplicadores",
    description: "O caminho até o pico é longo e repetitivo. Use blocos de Repetição para programar com inteligência e menos código!",
    concept: "Laços de Repetição 3x e 4x",
    status: "locked",
    stars: 0,
    rewardGems: 40,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 3 },
    obstacles: [{ x: 0, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 5 }, { x: 2, y: 0 }, { x: 3, y: 1 }],
    crystals: [{ id: 'c10', x: 5, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Use 'Repetir 3x' ou 'Repetir 4x' para percorrer grandes distâncias em uma só instrução!"
  },
  {
    id: 11,
    unitId: 3,
    weekNumber: 3,
    unitTitle: "Módulo 3 · Loops & Repetições",
    title: "Pista de Aceleração",
    subtitle: "Otimização Extrema de Código",
    description: "Um trajeto amplo e espaçoso. Programadores experientes resolvem esta pista com menos de 6 blocos usando loops!",
    concept: "Otimização Algorítmica",
    status: "locked",
    stars: 0,
    rewardGems: 40,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
    crystals: [{ id: 'c11', x: 5, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 5, two: 8 },
    tutorialHint: "Combine 'Repetir 4x' para subir tudo de uma vez, vire à direita e use outro loop para chegar ao fim!"
  },
  {
    id: 12,
    unitId: 3,
    weekNumber: 3,
    unitTitle: "Módulo 3 · Loops & Repetições",
    title: "O Quadrado Mágico",
    subtitle: "Prova de Conclusão do Módulo 3",
    description: "Contorne todo o perímetro da placa aplicando loops sucessivos para conquistar o Certificado de Mestre dos Loops!",
    concept: "Avaliação do Módulo 3",
    status: "locked",
    stars: 0,
    rewardGems: 45,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 0, y: 5 },
    obstacles: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 3 }],
    crystals: [{ id: 'c12', x: 0, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Dê a volta por fora contornando o centro com loops repetitivos!"
  },

  // ==========================================
  // MÓDULO 4: MÚLTIPLOS OBJETIVOS (FASES 13 A 16)
  // ==========================================
  {
    id: 13,
    unitId: 4,
    weekNumber: 4,
    unitTitle: "Módulo 4 · Múltiplos Objetivos",
    title: "Caçador de Cristais Alpha",
    subtitle: "Dois Cristais no Caminho",
    description: "Recolha dois cristais cósmicos espalhados pelo circuito antes de abrir o portal de salto dimensional.",
    concept: "Coleta Dupla",
    status: "locked",
    stars: 0,
    rewardGems: 45,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 4 },
    obstacles: [{ x: 2, y: 2 }, { x: 3, y: 2 }],
    crystals: [{ id: 'c13_1', x: 2, y: 0 }, { id: 'c13_2', x: 4, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 9, two: 13 },
    tutorialHint: "Passe por cima de cada cristal para energizá-lo e depois siga até o portal dimensional final!"
  },
  {
    id: 14,
    unitId: 4,
    weekNumber: 4,
    unitTitle: "Módulo 4 · Múltiplos Objetivos",
    title: "Vale dos Cristais",
    subtitle: "Tríade de Energia Cósmica",
    description: "Três cristais precisam ser resgatados! Planeje a ordem mais eficiente para não dar voltas desnecessárias.",
    concept: "Roteamento com 3 Cristais",
    status: "locked",
    stars: 0,
    rewardGems: 50,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 1 }],
    crystals: [{ id: 'c14_1', x: 2, y: 1 }, { id: 'c14_2', x: 1, y: 4 }, { id: 'c14_3', x: 4, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 16 },
    tutorialHint: "Trace um plano: primeiro o cristal de baixo, depois o da esquerda, o da direita e o portal!"
  },
  {
    id: 15,
    unitId: 4,
    weekNumber: 4,
    unitTitle: "Módulo 4 · Múltiplos Objetivos",
    title: "Constelação de Joias",
    subtitle: "Triângulo Estelar de Coleta",
    description: "Colete as 3 joias estelares posicionadas estrategicamente nas pontas da constelação de Orion.",
    concept: "Geometria Triangular",
    status: "locked",
    stars: 0,
    rewardGems: 50,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 2, dir: 'right' },
    targetPos: { x: 5, y: 2 },
    obstacles: [{ x: 2, y: 1 }, { x: 3, y: 3 }],
    crystals: [{ id: 'c15_1', x: 1, y: 4 }, { id: 'c15_2', x: 4, y: 4 }, { id: 'c15_3', x: 3, y: 0 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 13, two: 17 },
    tutorialHint: "Visite a parte superior primeiro e desça recolhendo a última joia a caminho do portal!"
  },
  {
    id: 16,
    unitId: 4,
    weekNumber: 4,
    unitTitle: "Módulo 4 · Múltiplos Objetivos",
    title: "Labirinto das Joias",
    subtitle: "Prova de Conclusão do Módulo 4",
    description: "Colete 3 cristais em meio a labirintos apertados para conquistar seu Certificado de Coletor & Otimizador Cósmico!",
    concept: "Avaliação do Módulo 4",
    status: "locked",
    stars: 0,
    rewardGems: 55,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 4 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 2 }],
    crystals: [{ id: 'c16_1', x: 0, y: 4 }, { id: 'c16_2', x: 3, y: 2 }, { id: 'c16_3', x: 4, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 16 },
    tutorialHint: "Use loops para acelerar as passagens entre os labirintos!"
  },

  // ==========================================
  // MÓDULO 5: PADRÕES AVANÇADOS (FASES 17 A 20)
  // ==========================================
  {
    id: 17,
    unitId: 5,
    weekNumber: 5,
    unitTitle: "Módulo 5 · Padrões Avançados",
    title: "Escada Dupla Espiral",
    subtitle: "Padrões Cíclicos de Navegação",
    description: "Um trajeto que se enrola como uma mola de relógio. Descubra o padrão repetitivo para economizar blocos.",
    concept: "Padrão Espiral",
    status: "locked",
    stars: 0,
    rewardGems: 60,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 3, y: 3 },
    obstacles: [{ x: 1, y: 1 }, { x: 1, y: 4 }, { x: 4, y: 1 }, { x: 4, y: 4 }],
    crystals: [{ id: 'c17', x: 3, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 7, two: 10 },
    tutorialHint: "A cada curva, a reta fica um passo menor. Use loops para fazer as paredes externas!"
  },
  {
    id: 18,
    unitId: 5,
    weekNumber: 5,
    unitTitle: "Módulo 5 · Padrões Avançados",
    title: "Rota das Turbinas",
    subtitle: "Contorno de Motores Térmicos",
    description: "Quatro turbinas superaquecidas giram no setor. Navegue pela cruz central sem tocar em nenhuma borda de fogo.",
    concept: "Cruz Central",
    status: "locked",
    stars: 0,
    rewardGems: 60,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 1 }, { x: 1, y: 4 }, { x: 4, y: 1 }, { x: 4, y: 4 }, { x: 2, y: 2 }],
    crystals: [{ id: 'c18', x: 5, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 7, two: 10 },
    tutorialHint: "Cruze pelo centro utilizando loops de avanço!"
  },
  {
    id: 19,
    unitId: 5,
    weekNumber: 5,
    unitTitle: "Módulo 5 · Padrões Avançados",
    title: "Cruzamento dos Fótons",
    subtitle: "Coleta Rápida em Malha",
    description: "Três cristais de fótons em uma malha densa. Exige precisão e cálculo milimétrico de par.",
    concept: "Malha de Precisão",
    status: "locked",
    stars: 0,
    rewardGems: 65,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 2, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 4 }],
    crystals: [{ id: 'c19_1', x: 1, y: 3 }, { id: 'c19_2', x: 4, y: 1 }, { id: 'c19_3', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 16 },
    tutorialHint: "Faça um loop de 3 passos na borda inferior para pegar o primeiro cristal com velocidade!"
  },
  {
    id: 20,
    unitId: 5,
    weekNumber: 5,
    unitTitle: "Módulo 5 · Padrões Avançados",
    title: "Desafio da Eficiência Par",
    subtitle: "Prova de Conclusão do Módulo 5",
    description: "Prove que você domina padrões geométricos e conquiste o Certificado de Arquiteto de Padrões!",
    concept: "Avaliação do Módulo 5",
    status: "locked",
    stars: 0,
    rewardGems: 70,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
    crystals: [{ id: 'c20_1', x: 0, y: 5 }, { id: 'c20_2', x: 3, y: 1 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 8, two: 12 },
    tutorialHint: "Use loops máximos de 4x e 3x para bater o par de 8 blocos!"
  },

  // ==========================================
  // MÓDULO 6: PROJETO FINAL - FORMATURA (FASES 21 A 24)
  // ==========================================
  {
    id: 21,
    unitId: 6,
    weekNumber: 6,
    unitTitle: "Módulo 6 · Formatura Cósmica",
    title: "A Fortaleza de Silício",
    subtitle: "Portas Lógicas do Reator",
    description: "As portas de proteção do núcleo planetário exigem destreza total. Encontre a brecha de segurança no firewall.",
    concept: "Labirinto de Alta Segurança",
    status: "locked",
    stars: 0,
    rewardGems: 75,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 4 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 2, y: 4 }],
    crystals: [{ id: 'c21_1', x: 2, y: 0 }, { id: 'c21_2', x: 4, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 11, two: 15 },
    tutorialHint: "Pegue o cristal de baixo, contorne o centro pela direita e suba até o portal!"
  },
  {
    id: 22,
    unitId: 6,
    weekNumber: 6,
    unitTitle: "Módulo 6 · Formatura Cósmica",
    title: "Reatores Auxiliares",
    subtitle: "Ativação em Cadeia",
    description: "Colete 3 núcleos de trítio para abastecer os motores auxiliares de Cyberia antes do salto quântico.",
    concept: "Cadeia de Fusão",
    status: "locked",
    stars: 0,
    rewardGems: 80,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 3 }, { x: 3, y: 1 }, { x: 4, y: 4 }],
    crystals: [{ id: 'c22_1', x: 0, y: 4 }, { id: 'c22_2', x: 3, y: 3 }, { id: 'c22_3', x: 4, y: 1 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 16 },
    tutorialHint: "Passe pelo cristal superior, corte pelo centro e termine no portal do canto!"
  },
  {
    id: 23,
    unitId: 6,
    weekNumber: 6,
    unitTitle: "Módulo 6 · Formatura Cósmica",
    title: "A Fenda Dimensional",
    subtitle: "Penúltimo Desafio de Formatura",
    description: "A fenda final antes do Grande Reator. Somente códigos enxutos e sem erros conseguirão passar.",
    concept: "Travessia Dimensional",
    status: "locked",
    stars: 0,
    rewardGems: 85,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 2 }],
    crystals: [{ id: 'c23_1', x: 3, y: 0 }, { id: 'c23_2', x: 1, y: 4 }, { id: 'c23_3', x: 5, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 17 },
    tutorialHint: "Pense em cada instrução como uma joia rara: cada comando conta para a nota máxima!"
  },
  {
    id: 24,
    unitId: 6,
    weekNumber: 6,
    unitTitle: "Módulo 6 · Formatura Cósmica",
    title: "O Grande Reator de Cyberia",
    subtitle: "Desafio Final do Curso: Diploma Supremo!",
    description: "O teste supremo de um verdadeiro programador! Navegue pelo complexo labirinto, colete os 3 núcleos de fusão e ative o reator cósmico a 100%!",
    concept: "Diploma e Conclusão do Curso",
    status: "locked",
    stars: 0,
    rewardGems: 150,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 1 }, { x: 3, y: 4 }, { x: 4, y: 3 }],
    crystals: [{ id: 'c24_1', x: 3, y: 0 }, { id: 'c24_2', x: 1, y: 4 }, { id: 'c24_3', x: 5, y: 2 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 14, two: 18 },
    tutorialHint: "Use todos os seus conhecimentos de loops, rotações e desvios para salvar Cyberia e receber seu Diploma!"
  },

  // ==========================================
  // MÓDULO 7: A PONTE DO CÓDIGO (FASES 25 A 28)
  // Transição: Bloco Visual ➔ Código Real
  // ==========================================
  {
    id: 25,
    unitId: 7,
    weekNumber: 7,
    unitTitle: "Módulo 7 · Ponte do Código",
    title: "O Primeiro Comando Escrito",
    subtitle: "Digite Seu Primeiro Código Real",
    description: "Parabéns pela formatura! Agora entramos na pós-graduação espacial: veja seus blocos virarem código real e experimente digitar avancar(3);!",
    concept: "Comandos de Texto e Parâmetros",
    status: "locked",
    stars: 0,
    rewardGems: 40,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 3, y: 0 },
    obstacles: [],
    crystals: [{ id: 'c25', x: 3, y: 0 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_3x'],
    parStars: { three: 3, two: 5 },
    tutorialHint: "Na aba [💻 Digitar Código], escreva 'avancar(3);' e clique em Executar Código!",
    codeModeRecommended: true
  },
  {
    id: 26,
    unitId: 7,
    weekNumber: 7,
    unitTitle: "Módulo 7 · Ponte do Código",
    title: "Curva na Sintaxe",
    subtitle: "Parênteses e Rotação no Editor",
    description: "Um obstáculo bloqueia o caminho em linha reta. Use virarDireita(); e virarEsquerda(); no editor para traçar a curva com perfeição.",
    concept: "Sintaxe de Rotação",
    status: "locked",
    stars: 0,
    rewardGems: 40,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 2, y: 2 },
    obstacles: [{ x: 0, y: 2 }],
    crystals: [{ id: 'c26', x: 2, y: 2 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x'],
    parStars: { three: 5, two: 7 },
    tutorialHint: "Digite: avancar(); virarDireita(); avancar(2); virarEsquerda(); avancar();",
    codeModeRecommended: true
  },
  {
    id: 27,
    unitId: 7,
    weekNumber: 7,
    unitTitle: "Módulo 7 · Ponte do Código",
    title: "Argumentos Cósmicos",
    subtitle: "Passando Números nos Parênteses",
    description: "Os programadores profissionais não repetem comandos iguais: eles passam argumentos como avancar(4); dentro dos parênteses!",
    concept: "Parâmetros e Argumentos",
    status: "locked",
    stars: 0,
    rewardGems: 45,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 1, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 2, y: 1 }, { x: 2, y: 2 }],
    crystals: [{ id: 'c27', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 7, two: 10 },
    tutorialHint: "Use 'avancar(3);' para atravessar o corredor em apenas uma linha de código!",
    codeModeRecommended: true
  },
  {
    id: 28,
    unitId: 7,
    weekNumber: 7,
    unitTitle: "Módulo 7 · Ponte do Código",
    title: "Prova do Tradutor Estelar",
    subtitle: "Avaliação do Módulo 7 (Certificado)",
    description: "Colete a joia no caminho e chegue ao portal dimensional usando seu novo conhecimento de código escrito!",
    concept: "Avaliação do Módulo 7",
    status: "locked",
    stars: 0,
    rewardGems: 50,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 3 }],
    crystals: [{ id: 'c28_1', x: 1, y: 3 }, { id: 'c28_2', x: 5, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 9, two: 13 },
    tutorialHint: "Contorne a barreira, colete o cristal e voe para a saída para liberar seu Certificado!",
    codeModeRecommended: true
  },

  // ==========================================
  // MÓDULO 8: O TERMINAL ESPACIAL (FASES 29 A 32)
  // Digitação Autônoma no Teclado Cósmico
  // ==========================================
  {
    id: 29,
    unitId: 8,
    weekNumber: 8,
    unitTitle: "Módulo 8 · Terminal Espacial",
    title: "Iniciando o Terminal Espacial",
    subtitle: "O Teclado Cósmico do AstroBot",
    description: "Neste módulo, o editor de código é sua ferramenta principal! Use os botões de atalho rápido ou digite diretamente com o teclado.",
    concept: "Digitação de Código",
    status: "locked",
    stars: 0,
    rewardGems: 50,
    gridSize: { width: 5, height: 5 },
    startPos: { x: 1, y: 1, dir: 'right' },
    targetPos: { x: 4, y: 3 },
    obstacles: [{ x: 2, y: 1 }, { x: 3, y: 1 }],
    crystals: [{ id: 'c29', x: 4, y: 3 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Digite no editor: virarEsquerda(); avancar(2); virarDireita(); avancar(3);",
    codeModeRecommended: true
  },
  {
    id: 30,
    unitId: 8,
    weekNumber: 8,
    unitTitle: "Módulo 8 · Terminal Espacial",
    title: "Slalom no Teclado",
    subtitle: "Ponto e Vírgula e Precisão",
    description: "Desvie dos nós térmicos alternados. Preste atenção nas dicas do AstroBot caso cometa algum errinho de digitação!",
    concept: "Resolução de Erros de Sintaxe",
    status: "locked",
    stars: 0,
    rewardGems: 55,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 5, y: 5 },
    obstacles: [{ x: 0, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 3 }],
    crystals: [{ id: 'c30', x: 5, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x'],
    parStars: { three: 9, two: 12 },
    tutorialHint: "Se errar uma letra, o AstroBot avisa na hora! Não esqueça de fechar os parênteses ().",
    codeModeRecommended: true
  },
  {
    id: 31,
    unitId: 8,
    weekNumber: 8,
    unitTitle: "Módulo 8 · Terminal Espacial",
    title: "Laços com Chaves { }",
    subtitle: "Loops em Código Escrito",
    description: "No código real, laços usam chaves: repetir(3) { avancar(); virarEsquerda(); }. Economize dezenas de caracteres digitados!",
    concept: "Loops com Chaves",
    status: "locked",
    stars: 0,
    rewardGems: 55,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 1, y: 2 }, { x: 3, y: 2 }],
    crystals: [{ id: 'c31', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Escreva no editor: repetir(2) { avancar(2); virarEsquerda(); } e veja a mágica acontecer!",
    codeModeRecommended: true
  },
  {
    id: 32,
    unitId: 8,
    weekNumber: 8,
    unitTitle: "Módulo 8 · Terminal Espacial",
    title: "Prova do Piloto de Terminal",
    subtitle: "Avaliação do Módulo 8 (Certificado)",
    description: "Recolha as duas joias espaciais e navegue até a estação central escrevendo código limpo e sem bugs!",
    concept: "Avaliação do Módulo 8",
    status: "locked",
    stars: 0,
    rewardGems: 60,
    gridSize: { width: 7, height: 6 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 6, y: 5 },
    obstacles: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 2 }],
    crystals: [{ id: 'c32_1', x: 2, y: 3 }, { id: 'c32_2', x: 6, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 11, two: 15 },
    tutorialHint: "Planeje sua rota no terminal e receba seu Certificado de Piloto de Terminal!",
    codeModeRecommended: true
  },

  // ==========================================
  // MÓDULO 9: FUNÇÕES & AUTOMAÇÃO (FASES 33 A 36)
  // Crie Seus Próprios Comandos Personalizados
  // ==========================================
  {
    id: 33,
    unitId: 9,
    weekNumber: 9,
    unitTitle: "Módulo 9 · Funções & Automação",
    title: "Minha Primeira Função",
    subtitle: "Declare Seu Próprio Comando",
    description: "Aprenda o conceito mais poderoso dos programadores: criar funções! Escreva 'funcao degrau() { ... }' e chame 'degrau();' duas vezes!",
    concept: "Declaração de Funções",
    status: "locked",
    stars: 0,
    rewardGems: 60,
    gridSize: { width: 6, height: 6 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }],
    crystals: [{ id: 'c33', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x'],
    parStars: { three: 6, two: 9 },
    tutorialHint: "Declare: funcao degrau() { avancar(); virarEsquerda(); avancar(); virarDireita(); } e depois chame: degrau(); degrau();",
    codeModeRecommended: true
  },
  {
    id: 34,
    unitId: 9,
    weekNumber: 9,
    unitTitle: "Módulo 9 · Funções & Automação",
    title: "O Procedimento do Desvio",
    subtitle: "Reutilização Modular de Código",
    description: "Dois obstáculos idênticos bloqueiam a pista! Crie uma função chamada 'desviar()' e use-a para contornar ambos sem reescrever código.",
    concept: "Reutilização de Procedimentos",
    status: "locked",
    stars: 0,
    rewardGems: 65,
    gridSize: { width: 7, height: 7 },
    startPos: { x: 0, y: 2, dir: 'right' },
    targetPos: { x: 6, y: 2 },
    obstacles: [{ x: 2, y: 2 }, { x: 4, y: 2 }],
    crystals: [{ id: 'c34', x: 6, y: 2 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x'],
    parStars: { three: 7, two: 10 },
    tutorialHint: "Crie 'funcao desviar()' com a curva e chame desviar(); avancar(); desviar();",
    codeModeRecommended: true
  },
  {
    id: 35,
    unitId: 9,
    weekNumber: 9,
    unitTitle: "Módulo 9 · Funções & Automação",
    title: "Módulo de Varredura",
    subtitle: "Limpeza de Cristais em Quadrantes",
    description: "Três cristais energéticos precisam ser recolhidos em pontos simétricos do setor quântico. Use funções para varrer a área com elegância.",
    concept: "Modularidade Avançada",
    status: "locked",
    stars: 0,
    rewardGems: 70,
    gridSize: { width: 7, height: 7 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 6, y: 6 },
    obstacles: [{ x: 2, y: 2 }, { x: 4, y: 4 }],
    crystals: [{ id: 'c35_1', x: 0, y: 4 }, { id: 'c35_2', x: 4, y: 0 }, { id: 'c35_3', x: 6, y: 6 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 12, two: 17 },
    tutorialHint: "Divida o problema: colete cada cristal por vez usando comandos combinados com rotação!",
    codeModeRecommended: true
  },
  {
    id: 36,
    unitId: 9,
    weekNumber: 9,
    unitTitle: "Módulo 9 · Funções & Automação",
    title: "Prova do Arquiteto de Funções",
    subtitle: "Avaliação do Módulo 9 (Certificado)",
    description: "Um labirinto intrincado espera por sua mente brilhante! Conecte funções personalizadas e prove sua maestria em modularização.",
    concept: "Avaliação do Módulo 9",
    status: "locked",
    stars: 0,
    rewardGems: 75,
    gridSize: { width: 8, height: 7 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 7, y: 5 },
    obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 6, y: 2 }],
    crystals: [{ id: 'c36_1', x: 3, y: 2 }, { id: 'c36_2', x: 7, y: 5 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 12, two: 16 },
    tutorialHint: "Supere o labirinto e desbloqueie o Certificado de Arquiteto de Funções Estelares!",
    codeModeRecommended: true
  },

  // ==========================================
  // MÓDULO 10: O DESAFIO HACKER CÓSMICO (FASES 37 A 40)
  // O Buraco Negro & Diploma Hacker Lendário
  // ==========================================
  {
    id: 37,
    unitId: 10,
    weekNumber: 10,
    unitTitle: "Módulo 10 · Mestres Hackers",
    title: "O Horizonte de Eventos",
    subtitle: "Entrando no Buraco Negro Quântico",
    description: "Você alcançou a fronteira do universo observável! Navegue pela gravidade extrema escrevendo código de texto puro.",
    concept: "Programação Textual Autônoma",
    status: "locked",
    stars: 0,
    rewardGems: 80,
    gridSize: { width: 7, height: 7 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 6, y: 6 },
    obstacles: [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 1 }, { x: 4, y: 5 }, { x: 5, y: 3 }],
    crystals: [{ id: 'c37', x: 6, y: 6 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x'],
    parStars: { three: 10, two: 14 },
    tutorialHint: "Na aba [💻 Digitar Código], escreva o script completo para contornar os pontos de atração gravitacional!",
    codeModeRecommended: true
  },
  {
    id: 38,
    unitId: 10,
    weekNumber: 10,
    unitTitle: "Módulo 10 · Mestres Hackers",
    title: "A Espiral do Buraco Negro",
    subtitle: "Geometria Quântica e Loops em Código",
    description: "O fluxo de táquions gira em espiral. Combine laços 'repetir' no editor de código para deslizar pelas fendas espaciais.",
    concept: "Loops Aninhados em Texto",
    status: "locked",
    stars: 0,
    rewardGems: 85,
    gridSize: { width: 8, height: 8 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 3 }],
    crystals: [{ id: 'c38_1', x: 7, y: 0 }, { id: 'c38_2', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 14, two: 19 },
    tutorialHint: "Colete a joia da borda e depois mergulhe na espiral central usando 'repetir' no editor!",
    codeModeRecommended: true
  },
  {
    id: 39,
    unitId: 10,
    weekNumber: 10,
    unitTitle: "Módulo 10 · Mestres Hackers",
    title: "O Núcleo Quântico de Cyberia",
    subtitle: "As Quatro Chaves Dimensionais",
    description: "Quatro vértices guardam os cristais supremos que estabilizam Cyberia. Escreva um programa estruturado para coletar todos antes do portal central.",
    concept: "Programação de Alto Nível",
    status: "locked",
    stars: 0,
    rewardGems: 90,
    gridSize: { width: 8, height: 8 },
    startPos: { x: 0, y: 0, dir: 'up' },
    targetPos: { x: 4, y: 4 },
    obstacles: [{ x: 2, y: 2 }, { x: 2, y: 5 }, { x: 5, y: 2 }, { x: 5, y: 5 }],
    crystals: [{ id: 'c39_1', x: 0, y: 7 }, { id: 'c39_2', x: 7, y: 7 }, { id: 'c39_3', x: 7, y: 0 }, { id: 'c39_4', x: 4, y: 4 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 18, two: 24 },
    tutorialHint: "Visite os cantos recolhendo as chaves quânticas e pise no portal central para ativar a fenda!",
    codeModeRecommended: true
  },
  {
    id: 40,
    unitId: 10,
    weekNumber: 10,
    unitTitle: "Módulo 10 · Mestres Hackers",
    title: "O Grande Hack Estelar (A Batalha Final)",
    subtitle: "Diploma Hacker Cósmico Lendário",
    description: "O grande clímax da sua jornada! Escreva o código supremo para resolver o enigma definitivo de Cyberia e tornar-se o Mestre Hacker Lendário!",
    concept: "Maestria Suprema em Código Real",
    status: "locked",
    stars: 0,
    rewardGems: 200,
    gridSize: { width: 8, height: 8 },
    startPos: { x: 0, y: 0, dir: 'right' },
    targetPos: { x: 7, y: 7 },
    obstacles: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 4, y: 1 }, { x: 4, y: 3 }, { x: 5, y: 5 }, { x: 6, y: 2 }],
    crystals: [{ id: 'c40_1', x: 3, y: 0 }, { id: 'c40_2', x: 0, y: 6 }, { id: 'c40_3', x: 5, y: 7 }, { id: 'c40_4', x: 7, y: 7 }],
    allowedBlocks: ['move_forward', 'turn_right', 'turn_left', 'repeat_2x', 'repeat_3x', 'repeat_4x'],
    parStars: { three: 16, two: 22 },
    tutorialHint: "Mostre que você é um verdadeiro desenvolvedor! Escreva seu script de código, execute e receba o DIPLOMA HACKER CÓSMICO LENDÁRIO!",
    codeModeRecommended: true
  }
];

export const BLOCK_DEFINITIONS = {
  move_forward: {
    type: 'move_forward',
    label: 'Mover para Frente',
    shortLabel: 'Avançar',
    desc: 'Anda 1 casa na direção apontada',
    iconName: 'ArrowUp',
    color: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
    borderColor: 'border-emerald-400',
    badgeColor: 'bg-emerald-500/20 text-emerald-300'
  },
  turn_right: {
    type: 'turn_right',
    label: 'Girar Direita',
    shortLabel: 'Girar 90° Dir',
    desc: 'Gira o robô para o lado direito',
    iconName: 'RotateCw',
    color: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20',
    borderColor: 'border-indigo-400',
    badgeColor: 'bg-indigo-500/20 text-indigo-300'
  },
  turn_left: {
    type: 'turn_left',
    label: 'Girar Esquerda',
    shortLabel: 'Girar 90° Esq',
    desc: 'Gira o robô para o lado esquerdo',
    iconName: 'RotateCcw',
    color: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20',
    borderColor: 'border-amber-400',
    badgeColor: 'bg-amber-500/20 text-amber-300'
  },
  move_backward: {
    type: 'move_backward',
    label: 'Mover para Trás',
    shortLabel: 'Recuar',
    desc: 'Dá 1 passo para trás',
    iconName: 'ArrowDown',
    color: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20',
    borderColor: 'border-rose-400',
    badgeColor: 'bg-rose-500/20 text-rose-300'
  },
  repeat_2x: {
    type: 'repeat_2x',
    label: 'Repetir 2x',
    shortLabel: 'Repetir 2x Avançar',
    desc: 'Avança 2 passos consecutivos',
    iconName: 'Repeat',
    repeatCount: 2,
    color: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-fuchsia-500/20',
    borderColor: 'border-fuchsia-400',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300'
  },
  repeat_3x: {
    type: 'repeat_3x',
    label: 'Repetir 3x',
    shortLabel: 'Repetir 3x Avançar',
    desc: 'Avança 3 passos consecutivos',
    iconName: 'Repeat',
    repeatCount: 3,
    color: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
    borderColor: 'border-cyan-400',
    badgeColor: 'bg-cyan-500/20 text-cyan-300'
  },
  repeat_4x: {
    type: 'repeat_4x',
    label: 'Repetir 4x',
    shortLabel: 'Repetir 4x Avançar',
    desc: 'Avança 4 passos consecutivos',
    iconName: 'Repeat',
    repeatCount: 4,
    color: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20',
    borderColor: 'border-purple-400',
    badgeColor: 'bg-purple-500/20 text-purple-300'
  },
  collect_crystal: {
    type: 'collect_crystal',
    label: 'Coletar Cristal',
    shortLabel: 'Coletar',
    desc: 'Ativa e recolhe cristal do setor',
    iconName: 'Sparkles',
    color: 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20',
    borderColor: 'border-teal-400',
    badgeColor: 'bg-teal-500/20 text-teal-300'
  }
} as const;
