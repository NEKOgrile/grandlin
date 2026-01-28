import { useState, useEffect, useRef } from 'react';

interface Dory {
  id: string;
  top: number;
  direction: 'left' | 'right';
}

export default function DorySpawner() {
  const [dory, setDory] = useState<Dory | null>(null);
  const timeoutRefsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const DURATION = 15; // Vitesse constante
  const MIN_TOP_PERCENT = 5;
  const MAX_TOP_PERCENT = 85;
  const DELAY_RANGE = [0, 2000]; // Délai aléatoire de 0-2s après Nemo

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
  const replaceDory = (oldId?: string) => {
    if (oldId) {
      const oldTimeout = timeoutRefsRef.current.get(oldId);
      if (oldTimeout) clearTimeout(oldTimeout);
      timeoutRefsRef.current.delete(oldId);
    }

    const randomDelay = DELAY_RANGE[0] + Math.random() * (DELAY_RANGE[1] - DELAY_RANGE[0]);
    
    const spawnTimeout = setTimeout(() => {
      const newDory = generateSingleDory();
      setDory(newDory);
      
      const newTimeout = setTimeout(() => {
        replaceDory(newDory.id);
      }, (DURATION + 0.5) * 1000);
      
      timeoutRefsRef.current.set(newDory.id, newTimeout);
    }, randomDelay);
    
    timeoutRefsRef.current.set(`spawn-${Date.now()}`, spawnTimeout);
  };

  // Générer le premier Dory au mount
  useEffect(() => {
    replaceDory();

    return () => {
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefsRef.current.clear();
    };
  }, []);

  if (!dory) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        key={dory.id}
        src="./dorie_nemo.png"
        alt="Dory"
        className={`absolute w-16 h-16 ${dory.direction === 'left' ? 'animate-swim-left' : 'animate-swim-right'}`}
        style={{
          top: `${dory.top}%`,
          transform: `translateY(-50%) ${dory.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
          animationDuration: `${DURATION}s`,
          animationIterationCount: '1',
        }}
      />
      
      <style>{`
        @keyframes swim-left {
          from {
            right: -80px;
          }
          to {
            right: 100%;
          }
        }
        @keyframes swim-right {
          from {
            left: -80px;
          }
          to {
            left: 100%;
          }
        }
        .animate-swim-left {
          animation: swim-left linear forwards;
        }
        .animate-swim-right {
          animation: swim-right linear forwards;
        }
      `}</style>
    </div>
  );
}
