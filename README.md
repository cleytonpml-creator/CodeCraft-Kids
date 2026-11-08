# 🚀 CodeCraft Kids - Cosmic Coding Adventure 🌟

<p align="center">
  <img src="public/icon-512.png" alt="CodeCraft Kids Logo" width="128" height="128" style="border-radius: 24px;" />
</p>

<p align="center">
  <strong>Uma jornada espacial interativa para crianças aprenderem lógica de programação, pensamento computacional e código real do zero!</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Capacitor-Android_Ready-1192e8?logo=capacitor" alt="Capacitor" />
  <img src="https://img.shields.io/badge/PWA-Offline_Ready-green?logo=pwa" alt="PWA" />
  <img src="https://img.shields.io/badge/Language-English_UK_%26_Português-purple" alt="Languages" />
</p>

---

## 📖 Sobre o Projeto

O **CodeCraft Kids** é um aplicativo educacional gamificado desenvolvido para crianças de 5 a 12 anos. O curso foi estruturado em uma trilha de aprendizagem gradual de 40 fases organizadas em 10 módulos cósmicos. 

A criança inicia manipulando blocos visuais intuitivos de direção e comandos espaciais, passa por laços de repetição, lógica condicional e funções, até chegar à digitação de código de programação real em um editor integrado.

---

## ✨ Principais Funcionalidades

- 🤖 **Mascote AstroBot Animado**: Caminha de nó em nó pelo mapa cósmico conforme a criança conclui as fases, comemora com saltos e estrelas espaciais.
- 🔊 **Narração por Áudio (Text-to-Speech)**: Botão de áudio em cada exercício que lê os desafios em voz alta em **Inglês Britânico (UK English)** e Português — ideal para crianças que ainda estão desenvolvendo a leitura.
- 🗺️ **Trilha de 40 Fases Progressivas (10 Módulos)**:
  1. *Comandos Básicos e Sequenciamento*
  2. *Loops Cósmicos (`repeat`)*
  3. *Lógica Condicional (`if / else`)*
  4. *Procedimentos e Funções (`def / function`)*
  5. *Depuração e Resolução de Bugs*
  6. *Variáveis e Cristais Energéticos*
  7. *Algoritmos e Otimização de Trajetórias*
  8. *Desafios Criativos e Resgate Estelar*
  9. *Transição dos Blocos para Código Escrito*
  10. *Mestres do Código (Editor de Código Real)*
- 🎓 **Certificados Oficiais e Diploma Supremo**:
  - 10 Certificados comemorativos individuais a cada unidade completada.
  - 1 Grande Diploma de Graduação Cósmica assinado pelo AstroBot ao concluir a jornada.
- 👤 **Perfil Personalizado do Aluno**: A criança pode definir seu nome de cadete espacial, escolher seu avatar e visualizar seu progresso em tempo real.
- 🎁 **Baú Cósmico e Loja de Itens**: Moedas estelares obtidas ao passar fases desbloqueiam novos capacetes cósmicos, cores de traje e efeitos especiais.
- 📱 **Preparado para Aplicativo Mobile (APK)**: Totalmente compatível com **Capacitor** para geração de APK nativo Android e configurado como **PWA** com suporte offline.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Efeitos e Celebrações**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Áudio & Narração**: Web Speech API nativa com seleção de vozes britânicas e síntese sonora Web Audio API
- **Mobile & Empacotamento**: [Capacitor](https://capacitorjs.com/) & Web App Manifest (PWA)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm` ou `bun` instalado

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/cleytonpml-creator/CodeCraft-Kids.git
   cd CodeCraft-Kids
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Abra no seu navegador o endereço indicado (geralmente `http://localhost:3000` ou `http://localhost:5173`).

---

## 📱 Como Gerar o Aplicativo Android (APK)

O projeto já conta com o arquivo `capacitor.config.json` configurado. Para compilar o APK nativo:

```bash
# 1. Instalar as dependências do Capacitor Android
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Gerar o build de produção do React
npm run build

# 3. Adicionar a plataforma Android
npx cap add android

# 4. Sincronizar os arquivos web com o projeto Android
npx cap sync

# 5. Abrir no Android Studio para gerar o APK
npx cap open android
```

> 💡 **Dica:** Para instruções detalhadas com imagens e métodos alternativos (como PWABuilder ou WebAPK sem Android Studio), consulte o guia completo em [COMO_GERAR_APK.md](./COMO_GERAR_APK.md).

---

## 🌐 Como Publicar Online Gratuitamente

Você pode colocar este projeto no ar com 1 clique usando o seu repositório do GitHub:
- **[Vercel](https://vercel.com/)**: Conecte sua conta do GitHub, selecione o repositório `CodeCraft-Kids` e clique em **Deploy**.
- **[Netlify](https://netlify.com/)**: Faça login com GitHub, clique em **Add new site** e selecione `CodeCraft-Kids`.

Assim que publicado na web com uma URL pública (ex: `https://codecraft-kids.vercel.app`), você também pode usar o [PWABuilder.com](https://www.pwabuilder.com/) para gerar um arquivo `.apk` instantâneo na nuvem!

---

## 📂 Estrutura de Pastas

```text
├── public/                 # Ícones do app, manifest PWA e Service Worker
├── src/
│   ├── assets/images/      # Imagens de fundo e avatar do AstroBot
│   ├── components/         # Componentes React (Mapa Cósmico, Editor, Modais, etc.)
│   │   ├── AstroBotAcademyModal.tsx
│   │   ├── AstroBotWalker.tsx
│   │   ├── CertificateModal.tsx
│   │   ├── CodeEditorPanel.tsx
│   │   ├── CosmicMapScreen.tsx
│   │   ├── LevelScreen.tsx
│   │   └── StudentProfileModal.tsx
│   ├── types/              # Tipos TypeScript do jogo e fases
│   ├── utils/              # Lógica de fases, áudio, tradução e síntese de voz
│   │   ├── i18n.ts         # Traduções UK English / Português
│   │   ├── levels.ts       # Configuração das 40 fases e 10 módulos
│   │   ├── speech.ts       # Narração por voz infantil para acessibilidade
│   │   └── audio.ts        # Efeitos sonoros espaciais
│   ├── App.tsx             # Componente raiz da aplicação
│   └── main.tsx            # Ponto de entrada do React
├── capacitor.config.json   # Configuração do Capacitor Android
├── COMO_GERAR_APK.md       # Guia para geração do APK
└── package.json            # Scripts e dependências do projeto
```

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais. Sinta-se livre para utilizar, adaptar e expandir a trilha para ensinar programação para crianças! 🚀✨
