import { useState, useEffect, useRef } from 'react';

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
  const timeoutRefsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

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
  const replaceMagikarp = (oldId: string) => {
    // Nettoyer le timeout de l'ancienne
    const oldTimeout = timeoutRefsRef.current.get(oldId);
    if (oldTimeout) clearTimeout(oldTimeout);
    timeoutRefsRef.current.delete(oldId);

    const newMagikarp = generateSingleMagikarp();

    console.log(`
╔════════════════════════════════════════╗
║ ➕ MAGIKARP REMPLACÉE                  ║
╠════════════════════════════════════════╣
║ Position (Y): ${newMagikarp.top.toFixed(2)}%
║ Zone: ${newMagikarp.top < 33.33 ? '🟦 HAUT' : newMagikarp.top < 66.66 ? '🟩 MILIEU' : '🟥 BAS'}
║ Direction: ${newMagikarp.direction === 'left' ? '⬅️ GAUCHE' : '➡️ DROITE'}
║ Type: ${newMagikarp.isShiny ? '✨ SHINY' : '🔴 NORMAL'}
║ Scale: ${newMagikarp.scale.toFixed(2)}x
║ Vitesse: ${newMagikarp.duration.toFixed(1)}s
╚════════════════════════════════════════╝
    `);

    setMagikarpList(prev => prev.map(m => m.id === oldId ? newMagikarp : m));
    
    // Timeout fallback
    const newTimeout = setTimeout(() => {
      replaceMagikarp(newMagikarp.id);
    }, (newMagikarp.duration + 0.5) * 1000);
    
    timeoutRefsRef.current.set(newMagikarp.id, newTimeout);
  };

  // Générer les 10 Magikarp au mount
  useEffect(() => {
    const initialList = Array.from({ length: 10 }, () => generateSingleMagikarp());
    setMagikarpList(initialList);

    // Créer les timeouts fallback pour chaque
    initialList.forEach(magikarp => {
      const timeout = setTimeout(() => {
        replaceMagikarp(magikarp.id);
      }, (magikarp.duration + 0.5) * 1000);
      timeoutRefsRef.current.set(magikarp.id, timeout);
    });

    console.log('🐟 10 Magikarp générées au démarrage');
    
    return () => {
      timeoutRefsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefsRef.current.clear();
    };
  }, []);

  const handleAnimationEnd = (id: string) => {
    replaceMagikarp(id);
  };

  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ 
        overflow: 'visible', 
        overflowX: 'hidden', 
        top: '-400px',
        minHeight: 'calc(100% + 800px)',
        left: '-200px',
        right: '-200px',
        width: 'calc(100% + 400px)',
      }}
    >
      {magikarpList.map(magikarp => (
        <div
          key={magikarp.id}
          className={magikarp.direction === 'left' ? 'animate-move-left' : 'animate-move-right'}
          style={{
            position: 'absolute',
            top: magikarp.top + '%',
            transform: `translateY(-50%) scale(${magikarp.scale})`,
            transformOrigin: 'left center',
            animationDuration: magikarp.duration + 's',
          }}
          onAnimationEnd={() => handleAnimationEnd(magikarp.id)}
        >
          <img
            src={magikarp.isShiny ? '/pokemon-magikarp-shiny.png' : '/pokemon-magikarp.png'}
            alt="Magikarp"
            style={{
              height: '64px',
              width: 'auto',
              display: 'block',
              transform: magikarp.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
              filter: magikarp.isShiny ? 'brightness(1.3)' : 'brightness(1)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
