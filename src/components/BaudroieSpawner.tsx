import { useState, useEffect, useRef } from 'react';

interface Baudroie {
  id: string;
  top: number;
  direction: 'left' | 'right';
}

export default function BaudroieSpawner() {
  const [baudroie, setBaudroie] = useState<Baudroie | null>(null);
  const timeoutRefsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const DURATION = 12; // Plus rapide pour poursuivre
  const MIN_TOP_PERCENT = 5;
  const MAX_TOP_PERCENT = 85;
  const SPAWN_DELAY = 3500; // Délai de 3.5s avant de spawner (après Nemo + Dory)

  // Générer une seule Baudroie aléatoire avec des limites
  const generateSingleBaudroie = (): Baudroie => {
    const top = MIN_TOP_PERCENT + Math.random() * (MAX_TOP_PERCENT - MIN_TOP_PERCENT);
    const direction = Math.random() > 0.5 ? 'left' : 'right';

    return {
      id: `b${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      top,
      direction,
    };
  };

  // Remplacer Baudroie par une nouvelle
  const replaceBaudroie = (oldId?: string) => {
    if (oldId) {
      const oldTimeout = timeoutRefsRef.current.get(oldId);
      if (oldTimeout) clearTimeout(oldTimeout);
      timeoutRefsRef.current.delete(oldId);
    }

    const spawnTimeout = setTimeout(() => {
      const newBaudroie = generateSingleBaudroie();
      setBaudroie(newBaudroie);
      
      const newTimeout = setTimeout(() => {
        replaceBaudroie(newBaudroie.id);
      }, (DURATION + 0.5) * 1000);
      
      timeoutRefsRef.current.set(newBaudroie.id, newTimeout);
    }, oldId ? 0 : SPAWN_DELAY);
    
    timeoutRefsRef.current.set(`spawn-${Date.now()}`, spawnTimeout);
  };

  // Générer la première Baudroie au mount
  useEffect(() => {
    replaceBaudroie();

    return () => {
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefsRef.current.clear();
    };
  }, []);

  if (!baudroie) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        key={baudroie.id}
        src="./Baudroie _nemo.png"
        alt="Baudroie"
        className={`absolute w-32 h-32 ${baudroie.direction === 'left' ? 'baudroie-swim-left' : 'baudroie-swim-right'}`}
        style={{
          top: `${baudroie.top}%`,
          transform: `translateY(-50%) scaleX(-1) ${baudroie.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
          animationDuration: `${DURATION}s`,
          animationIterationCount: '1',
        }}
      />
      
      <style>{`
        @keyframes baudroie-swim-left {
          from {
            right: -80px;
          }
          to {
            right: 100%;
          }
        }
        @keyframes baudroie-swim-right {
          from {
            left: -80px;
          }
          to {
            left: 100%;
          }
        }
        .baudroie-swim-left {
          animation: baudroie-swim-left linear forwards;
        }
        .baudroie-swim-right {
          animation: baudroie-swim-right linear forwards;
        }
      `}</style>
    </div>
  );
}
