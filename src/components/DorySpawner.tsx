import { useState, useEffect, useRef, useCallback } from 'react';

interface Dory {
  id: string;
  top: number;
  direction: 'left' | 'right';
}

export default function DorySpawner() {
  const [dory, setDory] = useState<Dory | null>(null);
  const timeoutRefsRef = useRef<Map<string, number>>(new Map());

  const DURATION = 15; // Vitesse constante
  const MIN_TOP_PERCENT = 5;
  const MAX_TOP_PERCENT = 85;

  // Générer un seul Dory aléatoire avec des limites
  const generateSingleDory = (): Dory => {
    const top = MIN_TOP_PERCENT + Math.random() * (MAX_TOP_PERCENT - MIN_TOP_PERCENT);
    const direction = Math.random() > 0.5 ? 'left' : 'right';

    return {
      id: `d${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      top,
      direction,
    };
  };

  // Remplacer Dory par une nouvelle
  const replaceDory = useCallback((oldId?: string) => {
    if (oldId) {
      const oldTimeout = timeoutRefsRef.current.get(oldId);
      if (oldTimeout) clearTimeout(oldTimeout);
      timeoutRefsRef.current.delete(oldId);
    }

    const minDelay = 0;
    const maxDelay = 2000;
    const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
    
    const spawnTimeout = window.setTimeout(() => {
      const newDory = generateSingleDory();
      setDory(newDory);
      
      const newTimeout = window.setTimeout(() => {
        replaceDory(newDory.id);
      }, (DURATION + 0.5) * 1000);
      
      timeoutRefsRef.current.set(newDory.id, newTimeout);
    }, randomDelay);
    
    timeoutRefsRef.current.set(`spawn-${Date.now()}`, spawnTimeout);
  }, []);

  // Générer le premier Dory au mount
  useEffect(() => {
    replaceDory();
    const timeoutsSnapshot = timeoutRefsRef.current;

    return () => {
      timeoutsSnapshot.forEach(timeout => clearTimeout(timeout));
      timeoutsSnapshot.clear();
    };
  }, [replaceDory]);

  if (!dory) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        key={dory.id}
        src={import.meta.env.BASE_URL + 'dorie_nemo.png'}
        alt="Dory"
        className={`absolute w-16 h-16 ${dory.direction === 'left' ? 'dory-swim-left' : 'dory-swim-right'}`}
        style={{
          top: `${dory.top}%`,
          transform: `translateY(-50%) ${dory.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
          animationDuration: `${DURATION}s`,
          animationIterationCount: '1',
        }}
      />
      
      <style>{`
        @keyframes dory-swim-left {
          from {
            right: -80px;
          }
          to {
            right: 100%;
          }
        }
        @keyframes dory-swim-right {
          from {
            left: -80px;
          }
          to {
            left: 100%;
          }
        }
        .dory-swim-left {
          animation: dory-swim-left linear forwards;
        }
        .dory-swim-right {
          animation: dory-swim-right linear forwards;
        }
      `}</style>
    </div>
  );
}
