import { useState, useEffect, useRef } from 'react';

interface Submarine {
  id: string;
  top: number;
  direction: 'left' | 'right';
}

interface Bubble {
  id: string;
  leftPercent: number;
  size: number;
  duration: number;
}

export default function OnePieceSpawner() {
  const [sub, setSub] = useState<Submarine | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const replaceTimeoutRef = useRef<number | null>(null);
  const bubbleIntervalRef = useRef<number | null>(null);
  const bubbleTimeoutsRef = useRef<Map<string, number>>(new Map());

  const DURATION = 18; // durée de traversée
  // Permettre un peu au-dessus/en-dessous de la zone
  const MIN_TOP_PERCENT = -8;
  const MAX_TOP_PERCENT = 108;

  const generateSingleSub = (): Submarine => {
    const top = MIN_TOP_PERCENT + Math.random() * (MAX_TOP_PERCENT - MIN_TOP_PERCENT);
    const direction = Math.random() > 0.5 ? 'left' : 'right';

    return {
      id: `s${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      top,
      direction,
    };
  };

  const clearBubbleInterval = () => {
    if (bubbleIntervalRef.current) {
      clearInterval(bubbleIntervalRef.current);
      bubbleIntervalRef.current = null;
    }
    bubbleTimeoutsRef.current.forEach(t => clearTimeout(t));
    bubbleTimeoutsRef.current.clear();
    setBubbles([]);
  };

  const spawnBubble = (direction: 'left' | 'right') => {
    // Engine position relative to the submarine image (natural orientation).
    // Tune baseEngine toward the rear of the sprite so bubbles come from the pipes.
    const baseEngine = 94; // tuned to the very rear of the sprite
    const jitter = (Math.random() * 6 - 3);
    const engineLeft = baseEngine + jitter; // always relative to natural orientation
    const size = 6 + Math.random() * 14;
    const duration = 900 + Math.random() * 800;
    const id = `b${Date.now()}${Math.random().toString(36).slice(2,8)}`;

    const bubble: Bubble = { id, leftPercent: engineLeft, size, duration };
    setBubbles(prev => [...prev, bubble]);

    const to = window.setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
      bubbleTimeoutsRef.current.delete(id);
    }, duration);

    bubbleTimeoutsRef.current.set(id, to as unknown as number);
  };

  const replaceSub = (oldId?: string) => {
    if (replaceTimeoutRef.current) {
      clearTimeout(replaceTimeoutRef.current);
      replaceTimeoutRef.current = null;
    }

    clearBubbleInterval();

    const newSub = generateSingleSub();
    setSub(newSub);

    // start bubble spawning for this submarine
    bubbleIntervalRef.current = window.setInterval(() => {
      spawnBubble(newSub.direction);
    }, 600);

    // Schedule replacement only after the submarine's animation completes
    replaceTimeoutRef.current = window.setTimeout(() => {
      replaceSub(newSub.id);
    }, (DURATION + 0.5) * 1000) as unknown as number;
  };

  useEffect(() => {
    replaceSub();

    return () => {
      if (replaceTimeoutRef.current) clearTimeout(replaceTimeoutRef.current as number);
      clearBubbleInterval();
    };
  }, []);

  if (!sub) return null;

  // Place submarine behind content (negative z-index) so cards stay in front
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -3 }}>
      <div
        className={`sub-wrap ${sub.direction === 'left' ? 'sub-swim-left' : 'sub-swim-right'}`}
        style={{
          position: 'absolute',
          top: `${sub.top}%`,
          left: sub.direction === 'left' ? undefined : '-500px',
          right: sub.direction === 'left' ? '-500px' : undefined,
          transform: `translateY(-50%) ${sub.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)'}`,
          width: '20rem',
          height: '20rem',
          animationDuration: `${DURATION}s`,
          animationIterationCount: '1',
        }}
      >
        <img
          key={sub.id}
          src={new URL('/sous-marin.png', import.meta.url).href}
          alt="Sous-marin"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Bubbles emitted from engine area */}
        {bubbles.map(b => (
          <span
            key={b.id}
            className="bubble"
            style={{
                  position: 'absolute',
                  left: `${b.leftPercent}%`,
                  top: '66%',
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  filter: 'blur(0.4px)',
                  transform: 'translateX(-50%)',
                  animation: `bubble-rise ${b.duration}ms linear forwards`,
                  zIndex: 2,
                  pointerEvents: 'none',
                  mixBlendMode: 'screen',
                }}
          />
        ))}

        <style>{`\n        @keyframes sub-swim-left {\n          from { right: -500px; }\n          to { right: 100%; }\n        }\n        @keyframes sub-swim-right {\n          from { left: -500px; }\n          to { left: 100%; }\n        }\n        .sub-swim-left { animation: sub-swim-left linear forwards; }\n        .sub-swim-right { animation: sub-swim-right linear forwards; }\n\n        @keyframes bubble-rise {\n          0% { transform: translateX(-50%) translateY(0px) scale(0.6); opacity: 0.95; }\n          50% { opacity: 0.9; }\n          100% { transform: translateX(-50%) translateY(-220px) scale(1.25); opacity: 0; }\n        }\n      `}</style>
      </div>
    </div>
  );
}
