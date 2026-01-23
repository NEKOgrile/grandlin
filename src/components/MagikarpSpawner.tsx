import { useEffect, useState, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check toutes les secondes si on peut spawner
    const spawnChecker = setInterval(() => {
      setMagikarpList((currentList) => {
        // Log le nombre de Magikarp à l'écran
        console.log(`🐟 Magikarp à l'écran: ${currentList.length}/10`);
        
        // Si moins de 10 Magikarp, en spawn une nouvelle
        if (currentList.length < 10) {
          // Générer COMPLÈTEMENT du nouveau random à chaque fois
          const scale = 1 + Math.random() * 0.9;
          const minTopRequired = (scale - 1) * 50;
          const maxTopRequired = 100 - (scale - 1) * 50;
          
          // Si on peut spawner sans clipping
          if (minTopRequired <= maxTopRequired) {
            const initialTop = minTopRequired + Math.random() * (maxTopRequired - minTopRequired);
            const isShiny = Math.random() < 0.05;
            const direction = Math.random() > 0.5 ? 'left' : 'right';
            
            // Créer un ID unique avec beaucoup d'aléatoire
            const uniqueId = `m${Date.now()}${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
            
            const newMagikarp: Magikarp = {
              id: uniqueId,
              top: initialTop,
              direction: direction,
              duration: 25,
              isShiny: isShiny,
              scale: scale,
            };

            console.log(`➕ Spawn: ${isShiny ? '✨ Shiny' : 'Normal'} vers ${direction}`);

            return [...currentList, newMagikarp];
          }
        }

        return currentList;
      });
    }, 1000);

    return () => {
      clearInterval(spawnChecker);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
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
      {magikarpList.map((magikarp) => {
        const imageSrc = magikarp.isShiny 
          ? '/pokemon-magikarp-shiny.png' 
          : '/pokemon-magikarp.png';
        
        const animationClass = magikarp.direction === 'left' ? 'animate-move-left' : 'animate-move-right';

        return (
          <div
            key={magikarp.id}
            className={animationClass}
            style={{
              position: 'absolute',
              top: magikarp.top + '%',
              transform: `translateY(-50%) scale(${magikarp.scale})`,
              transformOrigin: 'left center',
              animationDuration: magikarp.duration + 's',
            }}
            onAnimationEnd={() => {
              setMagikarpList((prev) => prev.filter((m) => m.id !== magikarp.id));
            }}
          >
            <img
              src={imageSrc}
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
        );
      })}
    </div>
  );
}
