/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpeechLanguage = 'en-GB' | 'pt-BR';

type SpeechListener = (isSpeaking: boolean) => void;

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private isSpeakingState = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    try {
      this.cachedVoices = this.synth.getVoices();
    } catch {
      this.cachedVoices = [];
    }
  }

  private setSpeaking(val: boolean) {
    this.isSpeakingState = val;
    this.listeners.forEach((listener) => {
      try {
        listener(val);
      } catch {}
    });
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.isSpeakingState);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public stop() {
    if (!this.synth) return;
    try {
      this.synth.cancel();
    } catch {}
    this.setSpeaking(false);
    this.currentUtterance = null;
  }

  /**
   * Find the most natural, friendly voice for UK English or Portuguese
   */
  private getBestVoice(lang: SpeechLanguage): SpeechSynthesisVoice | null {
    if (this.cachedVoices.length === 0) {
      this.loadVoices();
    }

    const voices = this.cachedVoices;
    if (!voices || voices.length === 0) return null;

    if (lang === 'en-GB') {
      // Prioritize British English voices
      const ukVoices = voices.filter(
        v => v.lang === 'en-GB' || v.lang.startsWith('en_GB') || v.lang.toLowerCase().includes('en-gb')
      );
      
      // Look for natural female or warm voices often installed (e.g. Google UK English, Daniel, Oliver, Hazel, Serena)
      const preferred = ukVoices.find(v => 
        /google|hazel|george|oliver|daniel|serena|kate|susan|fiona/i.test(v.name)
      );
      if (preferred) return preferred;
      if (ukVoices.length > 0) return ukVoices[0];

      // Fallback to any English voice
      const anyEn = voices.find(v => v.lang.startsWith('en'));
      if (anyEn) return anyEn;
    } else {
      // Portuguese (pt-BR or pt-PT)
      const ptBr = voices.filter(v => v.lang === 'pt-BR' || v.lang.startsWith('pt_BR'));
      const preferredPt = ptBr.find(v => /google|luciana|felipe|maria|helena/i.test(v.name));
      if (preferredPt) return preferredPt;
      if (ptBr.length > 0) return ptBr[0];

      const anyPt = voices.find(v => v.lang.startsWith('pt'));
      if (anyPt) return anyPt;
    }

    return voices[0] || null;
  }

  /**
   * Speak a friendly instruction with gentle pacing for young children
   */
  public speak(
    text: string, 
    lang: SpeechLanguage = 'en-GB',
    onEndCallback?: () => void
  ) {
    if (!this.synth) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Cancel any previous utterance
    this.stop();

    // Clean text of technical markdown or symbols
    const cleanText = text
      .replace(/[*_#`[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voice = this.getBestVoice(lang);

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = lang === 'en-GB' ? 'en-GB' : 'pt-BR';
      }

      // Friendly child-appropriate settings: slightly slower, slightly warmer pitch
      utterance.rate = lang === 'en-GB' ? 0.88 : 0.92;
      utterance.pitch = 1.08;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.setSpeaking(true);
      };

      utterance.onend = () => {
        this.setSpeaking(false);
        this.currentUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.setSpeaking(false);
        this.currentUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch {
      this.setSpeaking(false);
      if (onEndCallback) onEndCallback();
    }
  }
}

export const speechManager = new SpeechManager();
