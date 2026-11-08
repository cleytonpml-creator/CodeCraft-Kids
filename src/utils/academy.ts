/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademyLesson } from '../types/game';

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    id: "lesson_1",
    number: 1,
    title: "O Que é Programar? (Conversando com Robôs)",
    tagline: "Dando superpoderes ao AstroBot",
    icon: "Bot",
    category: "fundamentos",
    astroBotSpeech: "Bip-bop! Olá, futuro programador! Você sabia que eu não sei fazer nada sozinho? Eu preciso que VOCÊ me dê comandos precisos!",
    content: {
      story: "Os computadores e robôs espaciais são muito velozes, mas não têm imaginação própria. Programar é como escrever uma receita de bolo ou montar um guia passo a passo para o robô seguir sem errar nada!",
      keyConcept: "Um Programa de Computador é uma sequência de instruções organizadas que diz ao robô exatamente o que fazer.",
      codeSnippet: "1. Ligar Motores\n2. Avançar 1 Casa\n3. Pegar Cristal Cósmico",
      visualTip: "Dica de Ouro: Cada bloco que você encaixa na linha de comandos é uma ordem direta para meus circuitos!",
      funFact: "O primeiro código de computador do mundo foi criado por uma mulher chamada Ada Lovelace há quase 200 anos!",
      interactiveQuestion: {
        question: "O que acontece se dermos um comando errado para o AstroBot?",
        options: [
          "O robô adivinha o que você queria fazer sozinho.",
          "O robô segue exatamente o que foi programado, mesmo que bata em uma parede.",
          "O computador desliga sozinho automaticamente."
        ],
        correctIndex: 1,
        explanation: "Exato! Robôs não leem pensamentos: eles seguem estritamente as instruções fornecidas pelo programador!"
      }
    },
    rewardGems: 25
  },
  {
    id: "lesson_2",
    number: 2,
    title: "A Bússola do Robô: Para Onde Estou Olhando?",
    tagline: "Dominando orientações e giros de 90°",
    icon: "Compass",
    category: "direcoes",
    astroBotSpeech: "Olhe para a setinha brilhante na minha cabeça! Ela indica para qual lado do espaço eu vou andar se você disser 'Avançar'!",
    content: {
      story: "Muitos iniciantes pensam que 'Avançar' significa 'ir para cima da tela'. Mas não é bem assim! O robô avança para a direção em que seus olhos estão apontando: Norte (↑), Leste (→), Sul (↓) ou Oeste (←).",
      keyConcept: "Girar Direita ou Girar Esquerda faz o robô rodar 90 graus no próprio lugar, sem sair da casa onde ele está!",
      codeSnippet: "// Para ir para a direita:\n1. Girar Direita (90°)\n2. Mover para Frente",
      visualTip: "Lembre-se: Girar apenas muda a direção do olhar. Para se deslocar de casa, você precisa de um 'Avançar'!",
      funFact: "Os foguetes espaciais usam giroscópios superprecisos para girar no espaço sem gravidade!",
      interactiveQuestion: {
        question: "Se o AstroBot está apontando para o Norte (↑) e você quer que ele vá para o Leste (→), o que você deve fazer primeiro?",
        options: [
          "Mover para Trás 2 vezes.",
          "Usar o bloco 'Girar Direita' para virar o olhar para o Leste.",
          "Usar o bloco 'Avançar' esperando que ele faça a curva sozinho."
        ],
        correctIndex: 1,
        explanation: "Perfeito! Girar Direita aponta o AstroBot para o Leste (→), e o próximo 'Avançar' o levará na direção certa!"
      }
    },
    rewardGems: 25
  },
  {
    id: "lesson_3",
    number: 3,
    title: "A Mágica da Sequência: A Ordem Importa!",
    tagline: "Por que 1 + 2 não é igual a 2 + 1 no código",
    icon: "ListOrdered",
    category: "logica",
    astroBotSpeech: "Imagine calçar os sapatos antes das meias... Seria uma confusão! Na programação, a ordem dos comandos muda tudo!",
    content: {
      story: "Os programas de computador são lidos e executados de cima para baixo, linha por linha. Se você colocar um comando no lugar errado, o robô pode fazer uma curva antes da hora e se chocar com uma parede!",
      keyConcept: "Sequência Lógica é a ordem exata na qual as instruções devem ser executadas para atingir o objetivo.",
      codeSnippet: "Certo: Avançar -> Girar -> Avançar\nErrado: Girar -> Avançar -> Avançar (bate na parede!)",
      visualTip: "Sempre imagine o caminho casa por casa mentalmente antes de soltar o robô na pista!",
      funFact: "Os computadores de bordo da NASA executam bilhões de instruções por segundo, sempre na sequência correta!",
      interactiveQuestion: {
        question: "Qual dessas sequências diárias é um exemplo de algoritmo com ordem correta?",
        options: [
          "1. Comer a fruta -> 2. Descascar a fruta -> 3. Comprar a fruta",
          "1. Pegar escova -> 2. Colocar pasta -> 3. Escovar os dentes",
          "1. Entrar no chuveiro -> 2. Vestir a roupa -> 3. Tomar banho"
        ],
        correctIndex: 1,
        explanation: "Muito bem! Colocar a pasta antes de escovar os dentes é a sequência lógica necessária para dar certo!"
      }
    },
    rewardGems: 25
  },
  {
    id: "lesson_4",
    number: 4,
    title: "O Superpoder dos Laços: Não Repita Código!",
    tagline: "Como programar muito escrevendo pouco",
    icon: "Repeat",
    category: "loops",
    astroBotSpeech: "Bip-bop! Programadores adoram ser eficientes! Por que colocar 4 blocos de Avançar se podemos usar um único 'Repetir 4x'?",
    content: {
      story: "Na vida real, quando alguém diz 'ande 5 passos', você não precisa que a pessoa diga 'ande 1 passo, ande 1 passo, ande 1 passo...'. Na programação, usamos LOOPS (Laços de Repetição) para fazer ações repetidas com elegância!",
      keyConcept: "Um Loop (Laço) repete uma ação quantas vezes você mandar, economizando memória e deixando o código muito mais limpo.",
      codeSnippet: "Sem Loop: Avançar + Avançar + Avançar + Avançar (4 blocos)\nCom Loop: Repetir 4x { Avançar } (1 bloco só!)",
      visualTip: "No CodeCraft Kids, usar blocos de repetição é o segredo para bater o par e garantir 3 estrelas!",
      funFact: "Os jogos que você joga no celular usam um loop principal chamado 'Game Loop' que roda 60 vezes por segundo!",
      interactiveQuestion: {
        question: "Se você precisa atravessar um corredor reto de 3 casas, qual a forma mais eficiente de programar?",
        options: [
          "Colocar 3 blocos separados de 'Mover para Frente'.",
          "Usar o bloco 'Repetir 3x' de avanço.",
          "Dar 1 passo para frente e 2 para trás."
        ],
        correctIndex: 1,
        explanation: "Excelente! O bloco 'Repetir 3x' faz o robô cruzar as 3 casas em um único comando, garantindo 3 estrelas!"
      }
    },
    rewardGems: 30
  },
  {
    id: "lesson_5",
    number: 5,
    title: "Caçadores de Bugs: A Arte de Depurar",
    tagline: "Errar faz parte de todo grande cientista!",
    icon: "Bug",
    category: "debug",
    astroBotSpeech: "Você sabia que quando um robô bate ou para no lugar errado, nós chamamos isso de 'Bug'? E consertar é a parte mais divertida!",
    content: {
      story: "Os melhores engenheiros do mundo cometem erros todos os dias. A grande habilidade de um programador não é nunca errar, e sim saber encontrar onde está a falha com paciência e curiosidade!",
      keyConcept: "Depurar (Debugging) significa testar seu programa com calma, encontrar o comando que falhou e ajustá-lo.",
      codeSnippet: "Botão 'Passo': Executa só 1 bloco por vez para você ver onde o robô vira!",
      visualTip: "Se algo der errado, não apague tudo! Olhe a coordenada onde o AstroBot parou e use o botão 'Passo' para investigar.",
      funFact: "O termo 'bug' (besouro em inglês) surgiu quando uma mariposa de verdade entrou dentro de um computador gigante em 1947!",
      interactiveQuestion: {
        question: "Qual é a melhor atitude de um programador quando o código não funciona de primeira?",
        options: [
          "Ficar chateado e desistir imediatamente do jogo.",
          "Manter a calma, usar o botão 'Passo' para testar comando por comando e ajustar a rota.",
          "Apertar 'Executar' 50 vezes seguidas esperando que mude por milagre."
        ],
        correctIndex: 1,
        explanation: "Sensacional! Depurar com calma passo a passo é a verdadeira marca de um mestre da programação!"
      }
    },
    rewardGems: 30
  },
  {
    id: "lesson_6",
    number: 6,
    title: "Do Bloco ao Teclado: O Que é Código de Verdade?",
    tagline: "Dando adeus aos blocos e digitando comandos",
    icon: "Code",
    category: "code_writing",
    astroBotSpeech: "Bip-bop! Chegou a hora de dar o salto mais emocionante de todos: aprender a escrever código de verdade com o teclado!",
    content: {
      story: "Os blocos coloridos foram ótimos para ensinar seu cérebro a pensar como um programador. Mas os engenheiros do Google, da NASA e criadores de jogos escrevem código com letras e números! Cada bloco que você usava é, na verdade, uma linha de texto.",
      keyConcept: "Código de computador é um texto escrito em uma linguagem formal que o processador entende e executa linha por linha.",
      codeSnippet: "Bloco 'Mover para Frente' = avancar();\nBloco 'Girar Direita' = virarDireita();",
      visualTip: "Na aba [💻 Digitar Código], você pode digitar diretamente ou clicar nos botões rápidos de atalho!",
      funFact: "A linguagem JavaScript, usada em quase toda a internet, tem comandos muito parecidos com os do AstroBot!",
      interactiveQuestion: {
        question: "Como o bloco 'Mover para Frente' é escrito na linguagem de código do AstroBot?",
        options: [
          "frente por favor 1 vez",
          "avancar();",
          "andar_no_chao_34"
        ],
        correctIndex: 1,
        explanation: "Muito bem! O comando é 'avancar();', com parênteses () e ponto e vírgula (;)."
      }
    },
    rewardGems: 35
  },
  {
    id: "lesson_7",
    number: 7,
    title: "Parâmetros Espaciais: O Poder do avancar(3)",
    tagline: "Passando números e dados nos parênteses",
    icon: "Terminal",
    category: "code_writing",
    astroBotSpeech: "Você reparou naqueles parênteses vazios '()'? Eles servem para enviar informações secretas para o robô!",
    content: {
      story: "Na programação, quando você coloca um número dentro dos parênteses, você está passando um 'argumento' ou 'parâmetro'. Por exemplo, avancar(3); diz ao AstroBot: 'ande 3 passos de uma vez só!'.",
      keyConcept: "Parâmetros são informações extras que passamos para uma função dentro dos parênteses para modificar seu comportamento.",
      codeSnippet: "// Anda 3 passos em 1 única linha!\navancar(3);\nvirarEsquerda();\navancar(2);",
      visualTip: "Usar parâmetros deixa seu código muito mais curto e fácil de ler!",
      funFact: "Nos jogos 3D, a velocidade dos carros e a altura do pulo dos heróis são todos controlados por parâmetros numéricos!",
      interactiveQuestion: {
        question: "Se você precisa que o AstroBot avance 4 casas seguidas, qual a forma mais curta no editor de código?",
        options: [
          "avancar(); avancar(); avancar(); avancar();",
          "avancar(4);",
          "repetir_quatro_vezes_para_sempre"
        ],
        correctIndex: 1,
        explanation: "Exatamente! 'avancar(4);' resolve tudo em uma linha só com elegância máxima!"
      }
    },
    rewardGems: 35
  },
  {
    id: "lesson_8",
    number: 8,
    title: "Crie Seus Próprios Comandos: Funções!",
    tagline: "Inventando novas palavras mágicas no código",
    icon: "Cpu",
    category: "functions",
    astroBotSpeech: "E se você pudesse inventar um comando NOVO que ainda não existe? Bem-vindo ao universo das Funções!",
    content: {
      story: "Imagine que você precisa fazer a manobra 'virarDireita(); avancar(); virarEsquerda();' cinco vezes no labirinto. Em vez de digitar 15 linhas, você cria uma função com o nome que quiser, como 'desviar()', e a ensina para o robô!",
      keyConcept: "Uma Função é um bloco de código com nome que agrupa vários comandos e pode ser chamado a qualquer momento.",
      codeSnippet: "funcao desviar() {\n  virarDireita();\n  avancar();\n  virarEsquerda();\n}\n\n// Agora é só chamar:\ndesviar();",
      visualTip: "Use 'funcao nome() { ... }' e coloque os comandos dentro das chaves { }!",
      funFact: "O sistema operacional do seu celular tem mais de 500.000 funções diferentes trabalhando juntas!",
      interactiveQuestion: {
        question: "Depois que você declara 'funcao pularBuraco() { ... }', como você faz o AstroBot executar essa função?",
        options: [
          "Basta digitar 'pularBuraco();' no seu código.",
          "Precisa reiniciar o computador.",
          "Tem que reescrever todos os comandos da função novamente."
        ],
        correctIndex: 0,
        explanation: "Perfeito! Basta chamar 'pularBuraco();' e o robô executa todos os comandos que você guardou dentro dela!"
      }
    },
    rewardGems: 40
  },
  {
    id: "lesson_9",
    number: 9,
    title: "O Terminal Hacker: Dominando Chaves e Sintaxe",
    tagline: "Como os verdadeiros mestres escrevem código",
    icon: "ShieldCheck",
    category: "code_writing",
    astroBotSpeech: "Você agora tem todos os segredos dos grandes desenvolvedores de software! Está pronto para o Desafio Hacker Cósmico!",
    content: {
      story: "Programar com texto dá a você liberdade infinita. Você pode combinar laços como repetir(3) { ... }, criar funções modulares e controlar o robô com precisão cirúrgica. Se errar uma letrinha, o terminal amigável do AstroBot aponta a linha exata para você consertar!",
      keyConcept: "A sintaxe é a gramática do código. Com um pouco de prática no terminal, escrever código se torna tão natural quanto falar!",
      codeSnippet: "// Programa Hacker Completo 🚀\nrepetir(4) {\n  avancar(2);\n  virarDireita();\n}",
      visualTip: "Lembre-se sempre do trio de ouro: Parênteses (), Chaves {} e Ponto e Vírgula ;!",
      funFact: "Os hackers do bem (chamados de White Hats) protegem satélites, bancos e hospitais escrevendo códigos como esse!",
      interactiveQuestion: {
        question: "Qual desses pares de símbolos é usado para envolver os comandos repetidos de um loop ou o corpo de uma função?",
        options: [
          "Chaves: { e }",
          "Pontos de interrogação: ? e ?",
          "Aspas: \" e \""
        ],
        correctIndex: 0,
        explanation: "Sensacional! As chaves { } delimitam o bloco de código que pertence ao loop ou à função!"
      }
    },
    rewardGems: 50
  }
];
