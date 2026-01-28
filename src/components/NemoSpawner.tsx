import { useState, useEffect, useRef } from 'react';

interface Nemo {
  id: string;
  top: number;
  direction: 'left' | 'right';
}

export default function NemoSpawner() {
  const [nemo, setNemo] = useState<Nemo | null>(null);
  const timeoutRefsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const DURATION = 15; // Vitesse constante
  const MIN_TOP_PERCENT = 10;
  const MAX_TOP_PERCENT = 80;

  // Générer un seul Nemo aléatoire avec des limites
  const generateSingleNemo = (): Nemo => {
    const top = MIN_TOP_PERCENT + Math.random() * (MAX_TOP_PERCENT - MIN_TOP_PERCENT);
    const direction = Math.random() > 0.5 ? 'left' : 'right';

    return {
      id: `n${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      top,
      direction,
    };
  };

  // Remplacer Nemo par un nouveau
  const replaceNemo = (oldId?: string) => {
    if (oldId) {
      const oldTimeout = timeoutRefsRef.current.get(oldId);
      if (oldTimeout) clearTimeout(oldTimeout);
      timeoutRefsRef.current.delete(oldId);
    }

    const newNemo = generateSingleNemo();
    setNemo(newNemo);
    
    const newTimeout = setTimeout(() => {
      replaceNemo(newNemo.id);
    }, (DURATION + 0.5) * 1000);
    
    timeoutRefsRef.current.set(newNemo.id, newTimeout);
  };

  // Générer le premier Nemo au mount
  useEffect(() => {
    replaceNemo();

    return () => {
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefsRef.current.clear();
    };
  }, []);

  if (!nemo) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        key={nemo.id}
        src="./3_nemo.png"
        alt="Nemo"
        className={`absolute w-96 h-96 object-contain ${nemo.direction === 'left' ? 'animate-swim-left' : 'animate-swim-right'}`}
        style={{
          top: `${nemo.top}%`,
          transform: `translateY(-50%) ${nemo.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
          animationDuration: `${DURATION}s`,
          animationIterationCount: '1',
        }}
      />
      
      <style>{`
        @keyframes swim-left {
          from {
            right: -400px;
          }
          to {
            right: 100%;
          }
        }
        @keyframes swim-right {
          from {
            left: -400px;
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
        .animate-spawn {
          animation: spawn 0.5s ease-out forwards;
        }
        @keyframes spawn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
