# 📱 Como Gerar o APK do CodeCraft Kids para Android

---

## ⚠️ Por que a URL do Cloud Run (`*.run.app`) deu erro no PWABuilder?

As URLs de pré-visualização (`ais-pre-...run.app` e `ais-dev-...run.app`) pertencem ao ambiente de sandbox do Google Cloud e são **protegidas por autenticação do Google**.

- Quando um robô externo (como o site do **PWABuilder**) tenta acessar essa URL para empacotar o APK, os servidores do Google bloqueiam o acesso por segurança (erro 401/403 ou tela de login).
- Da mesma forma, se você abrir essa URL em uma janela anônima ou navegador sem estar logado na sua conta Google do projeto, o Google bloqueia o acesso direto.

Abaixo estão as **3 soluções reais e garantidas** para você ter o app no seu Android:

---

## 🏆 SOLUÇÃO 1: Gerar o APK no seu Computador com Capacitor (100% Independente e Garantido)

Esse é o método oficial e profissional usado por desenvolvedores React para gerar o arquivo `.apk` físico. Ele **não depende de URLs online** porque compila o código direto no seu computador.

### 📋 Passo a passo:

1. Baixe ou copie a pasta deste projeto para o seu computador.
2. Abra o terminal (Prompt de Comando / PowerShell no Windows, ou Terminal no Mac/Linux) dentro da pasta do projeto.
3. Instale as ferramentas do Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```
4. Compile o jogo:
   ```bash
   npm run build
   ```
5. Crie o projeto Android nativo:
   ```bash
   npx cap add android
   ```
6. Sincronize e abra o projeto no Android Studio:
   ```bash
   npx cap sync android
   npx cap open android
   ```
7. No **Android Studio**:
   - Vá no menu superior: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Aguarde a barra inferior terminar (1 a 2 minutos).
   - Clique em **locate** na notificação que aparecer.

📍 **Onde o arquivo APK final é gerado no seu computador:**
```
pasta-do-projeto/android/app/build/outputs/apk/debug/app-debug.apk
```
Basta enviar esse arquivo `app-debug.apk` para o seu celular via WhatsApp, Google Drive ou cabo USB e instalar!

---

## 📲 SOLUÇÃO 2: Instalação Direta no Celular em 10 Segundos (Como Web App / PWA)

Configuramos o aplicativo com **Manifest PWA** e **Service Worker**, com suporte total para rodar como aplicativo nativo no Android:

1. No seu celular Android, abra o navegador **Google Chrome**.
2. Abra o link do app:
   `https://ais-pre-tubah6z3zywmixzcy36hza-214083444358.europe-west2.run.app`
   *(Certifique-se de estar logado com a mesma conta Google que tem acesso ao projeto).*
3. Toque no menu de **três pontinhos (⋮)** no canto superior direito do Chrome.
4. Selecione a opção:
   👉 **"Instalar aplicativo"** (ou **"Adicionar à tela inicial"**).
5. O Android criará o ícone do **CodeCraft Kids** na sua gaveta de aplicativos e na tela inicial, abrindo em tela cheia (sem barra de navegação), exatamente como um APK instalado da Google Play Store!

---

## 🌐 SOLUÇÃO 3: Usar o PWABuilder com um Link 100% Público Gratuito

Se você deseja obrigatoriamente um arquivo `.apk` gerado pelo **PWABuilder** sem instalar o Android Studio no seu PC:

1. Pegue os arquivos deste projeto e suba em um repositório no [GitHub](https://github.com/).
2. Conecte esse repositório na [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/) (ambos são 100% gratuitos e colocam no ar em 1 minuto).
3. Você receberá um link público sem bloqueios do Google (ex: `https://codecraft-kids.vercel.app`).
4. Cole esse novo link no **[PWABuilder.com](https://www.pwabuilder.com/)**.
5. Como os arquivos `manifest.json` e `sw.js` já estão criados e o link é público, o PWABuilder dará nota máxima e liberará o botão **Download APK** imediatamente!
