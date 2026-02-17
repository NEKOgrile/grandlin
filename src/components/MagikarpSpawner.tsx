import { useState, useEffect, useRef, useCallback } from 'react';

interface Magikarp {
  id: string;
  top: number;
  direction: 'left' | 'right';
  duration: number;
  isShiny: boolean;
  scale: number;
}

export default function MagikarpSpawner() {
  const [magikarpList, setMagikarpList] = useState<Magikarp[]>([]);
  const timeoutRefsRef = useRef<Map<string, number>>(new Map());

  // Générer une seule Magikarp aléatoire
  const generateSingleMagikarp = (): Magikarp => {
    const scale = 1 + Math.random() * 0.9;
    const minTopRequired = (scale - 1) * 50;
    const maxTopRequired = Math.min(100 - (scale - 1) * 50, 100); // Limiter le maxTop à 100% pour éviter les débordements
    
    const top = minTopRequired + Math.random() * (maxTopRequired - minTopRequired);
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    const duration = 15 + Math.random() * 15;
    const isShiny = Math.random() < 0.01; // 1% de chance d'être shiny

    return {
      id: `m${Date.now()}${Math.random().toString(36).substring(2, 15)}`,
      top,
      direction,
      duration,
      isShiny,
      scale,
    };
  };

  // Remplacer une Magikarp par une nouvelle
  const replaceMagikarp = useCallback((oldId: string) => {
    // Nettoyer le timeout de l'ancienne
    const oldTimeout = timeoutRefsRef.current.get(oldId);
    if (oldTimeout) clearTimeout(oldTimeout);
    timeoutRefsRef.current.delete(oldId);

    const newMagikarp = generateSingleMagikarp();

    setMagikarpList(prev => prev.map(m => m.id === oldId ? newMagikarp : m));
    
    // Timeout fallback
    const newTimeout = window.setTimeout(() => {
      replaceMagikarp(newMagikarp.id);
    }, (newMagikarp.duration + 0.5) * 1000);
    
    timeoutRefsRef.current.set(newMagikarp.id, newTimeout);
  }, []);

  // Générer les 10 Magikarp au mount
  useEffect(() => {
    const initialList = Array.from({ length: 10 }, () => generateSingleMagikarp());
    setMagikarpList(initialList);
    const timeoutsSnapshot = timeoutRefsRef.current;

    // Créer les timeouts fallback pour chaque
    initialList.forEach(magikarp => {
      const timeout = window.setTimeout(() => {
        replaceMagikarp(magikarp.id);
      }, (magikarp.duration + 0.5) * 1000);
      timeoutsSnapshot.set(magikarp.id, timeout);
    });

    return () => {
      timeoutsSnapshot.forEach(timeout => clearTimeout(timeout));
      timeoutsSnapshot.clear();
    };
  }, [replaceMagikarp]);
  const handleAnimationEnd = (id: string) => {
    replaceMagikarp(id);
  };

  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ 
        overflow: 'hidden', 
        overflowX: 'hidden', 
        top: '-400px',
        minHeight: 'calc(100% + 800px)',
        left: '0',
        right: '0',
        width: '100%',
      }}
    >
      {magikarpList.map(magikarp => (
        <div
          key={magikarp.id}
          className={magikarp.direction === 'left' ? 'animate-move-left' : 'animate-move-right'}
          style={{
            position: 'absolute',
            top: magikarp.top + '%',
            animationDuration: magikarp.duration + 's',
          }}
          onAnimationEnd={() => handleAnimationEnd(magikarp.id)}
        >
          <img
            src={encodeURI(import.meta.env.BASE_URL + (magikarp.isShiny ? 'pokemon-magikarp-shiny.png' : 'pokemon-magikarp.png'))}
            alt="Magikarp"
            style={{
              height: '64px',
              width: 'auto',
              display: 'block',
              transform: `translateY(-50%) scale(${magikarp.scale}) ${magikarp.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)'}`,
              transformOrigin: 'left center',
              filter: magikarp.isShiny ? 'brightness(1.3)' : 'brightness(1)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
