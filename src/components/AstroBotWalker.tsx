/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Footprints } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AstroBotWalkerProps {
  fromPhaseId: number;
  toPhaseId: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onArrival: () => void;
}

interface Footprint {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export const AstroBotWalker: React.FC<AstroBotWalkerProps> = ({
  fromPhaseId,
  toPhaseId,
  containerRef,
  onArrival
}) => {
  const [stage, setStage] = useState<'celebrating_start' | 'walking' | 'celebrating_arrival' | 'finished'>('celebrating_start');
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [bobOffset, setBobOffset] = useState<number>(0);
  const [wobbleDeg, setWobbleDeg] = useState<number>(0);
  const [facingDir, setFacingDir] = useState<'right' | 'left'>('right');
  const [speechText, setSpeechText] = useState<string>(`Fase ${fromPhaseId} Vencida! Bip-Bop! 🎉`);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  const startCoordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const endCoordsRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastStepIndexRef = useRef<number>(-1);
  const footprintIdRef = useRef<number>(0);

  useEffect(() => {
    // Locate the DOM elements for start and target nodes
    const elFrom = document.getElementById(`trail-phase-node-${fromPhaseId}`);
    const elTo = document.getElementById(`trail-phase-node-${toPhaseId}`);

    if (!elFrom || !elTo || !containerRef.current) {
      // Fallback if elements not yet mounted
      const timer = setTimeout(() => {
        onArrival();
      }, 500);
      return () => clearTimeout(timer);
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = elFrom.getBoundingClientRect();
    const toRect = elTo.getBoundingClientRect();

    const startX = fromRect.left - containerRect.left + fromRect.width / 2;
    const startY = fromRect.top - containerRect.top + fromRect.height / 2;
    const endX = toRect.left - containerRect.left + toRect.width / 2;
    const endY = toRect.top - containerRect.top + toRect.height / 2;

    startCoordsRef.current = { x: startX, y: startY };
    endCoordsRef.current = { x: endX, y: endY };
    setPos({ x: startX, y: startY });
    setFacingDir(endX >= startX ? 'right' : 'left');
    setIsReady(true);

    // Initial Celebration at Start Node
    soundManager.playCheer();
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { 
          x: fromRect.left / window.innerWidth,
          y: fromRect.top / window.innerHeight 
        }
      });
    } catch {}

    // Scroll starting node into view
    elFrom.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Timeline:
    // 0 -> 1100ms: Celebrating at start
    // 1100 -> 3800ms: Walking along trail
    // 3800 -> 5200ms: Celebrating arrival at target
    // 5200ms: Finish and trigger onArrival
    const startWalkTimer = setTimeout(() => {
      setStage('walking');
      setSpeechText(`Avançando para a Fase ${toPhaseId}... 🏃💨`);
    }, 1100);

    return () => clearTimeout(startWalkTimer);
  }, [fromPhaseId, toPhaseId, containerRef, onArrival]);

  // Main Walking Animation Loop
  useEffect(() => {
    if (stage !== 'walking') return;

    const duration = 2600; // ms to walk from node to node
    const startTime = performance.now();
    const totalStepCycles = 10; // Number of walking steps

    let animationFrameId: number;

    const animateWalk = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth cubic easing
      const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const { x: sx, y: sy } = startCoordsRef.current;
      const { x: ex, y: ey } = endCoordsRef.current;

      // S-curve lateral sway along the walk
      const swayOffset = Math.sin(t * Math.PI) * (pIdxIsEven(fromPhaseId) ? 22 : -22);

      const currentX = sx + (ex - sx) * easedT + swayOffset;
      const currentY = sy + (ey - sy) * easedT;

      setPos({ x: currentX, y: currentY });

      // Walking bounce & wobble
      const stepPhase = t * totalStepCycles * Math.PI;
      const bob = -Math.abs(Math.sin(stepPhase)) * 14;
      const wobble = Math.sin(stepPhase) * 12;

      setBobOffset(bob);
      setWobbleDeg(wobble);

      // Trigger footstep audio & particle on each step touchdown
      const currentStepIdx = Math.floor(t * totalStepCycles);
      if (currentStepIdx !== lastStepIndexRef.current) {
        lastStepIndexRef.current = currentStepIdx;
        soundManager.playStep();

        // Add fading footprint particle
        setFootprints(prev => [
          ...prev.slice(-8),
          {
            id: footprintIdRef.current++,
            x: currentX,
            y: currentY + 18,
            opacity: 0.8
          }
        ]);
      }

      // Smoothly scroll window to follow AstroBot
      if (containerRef.current && elapsed % 60 < 20) {
        const elTo = document.getElementById(`trail-phase-node-${toPhaseId}`);
        if (elTo && t > 0.4) {
          elTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animateWalk);
      } else {
        // Arrived at destination!
        setStage('celebrating_arrival');
        setBobOffset(0);
        setWobbleDeg(0);
        setSpeechText(`Chegamos na Fase ${toPhaseId}! Vamos nessa! 🚀✨`);
        soundManager.playCheer();

        const elTo = document.getElementById(`trail-phase-node-${toPhaseId}`);
        if (elTo) {
          const toRect = elTo.getBoundingClientRect();
          try {
            confetti({
              particleCount: 70,
              spread: 75,
              origin: {
                x: toRect.left / window.innerWidth,
                y: toRect.top / window.innerHeight
              }
            });
          } catch {}
          elTo.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Finish after victory celebration
        setTimeout(() => {
          setStage('finished');
          onArrival();
        }, 1500);
      }
    };

    animationFrameId = requestAnimationFrame(animateWalk);

    return () => cancelAnimationFrame(animationFrameId);
  }, [stage, fromPhaseId, toPhaseId, containerRef, onArrival]);

  function pIdxIsEven(id: number) {
    return id % 2 === 0;
  }

  if (!isReady || stage === 'finished') return null;

  return (
    <div 
      className="absolute pointer-events-none z-50 transition-transform duration-75"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) translateY(${bobOffset}px)`
      }}
    >
      {/* Footprint Trail Particles */}
      {footprints.map(fp => (
        <div
          key={fp.id}
          className="absolute w-3 h-3 rounded-full bg-[#00F5D4]/40 blur-[1px] pointer-events-none animate-ping"
          style={{
            left: `${fp.x - pos.x}px`,
            top: `${fp.y - pos.y}px`
          }}
        />
      ))}

      {/* AstroBot Mascot Avatar */}
      <div 
        className="relative flex flex-col items-center"
        style={{
          transform: `rotate(${wobbleDeg}deg) scale(${stage === 'celebrating_start' || stage === 'celebrating_arrival' ? 1.15 : 1})`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Animated Speech Balloon */}
        <div className="absolute -top-14 bg-gradient-to-r from-[#00F5D4] to-teal-300 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-xl shadow-teal-500/40 border border-white flex items-center gap-1.5 whitespace-nowrap animate-bounce">
          <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          <span>{speechText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-teal-300 rotate-45 border-r border-b border-white/50" />
        </div>

        {/* Mascot Robot Body with Glowing Aura */}
        <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-3 border-white bg-[#070512] shadow-[0_0_30px_#00F5D4] flex items-center justify-center">
          <img 
            src="/src/assets/images/astrobot_mascot_1793697090356.jpg" 
            alt="AstroBot Caminhando"
            className="w-full h-full object-cover"
            style={{
              transform: facingDir === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
            }}
            referrerPolicy="no-referrer"
          />

          {/* Glowing Energy Ring */}
          <div className="absolute inset-0 border-2 border-[#00F5D4] rounded-2xl animate-pulse" />
        </div>

        {/* Walking Dust / Jet Pack Sparks */}
        {stage === 'walking' && (
          <div className="absolute -bottom-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          </div>
        )}

        {/* Celebratory Jump Sparks */}
        {(stage === 'celebrating_start' || stage === 'celebrating_arrival') && (
          <div className="absolute -inset-4 border-2 border-amber-400/80 rounded-full animate-ping opacity-75" />
        )}
      </div>
    </div>
  );
};
