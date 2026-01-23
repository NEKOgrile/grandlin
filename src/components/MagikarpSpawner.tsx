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
        // Si moins de 10 Magikarp, en spawn une nouvelle
        if (currentList.length < 10) {
          // Générer BEAUCOUP de random pour éviter les patterns
          const rand1 = Math.random();
          const rand2 = Math.random();
          const rand3 = Math.random();
          const rand4 = Math.random();
          const rand5 = Math.random();
          const rand6 = Math.random();
          const rand7 = Math.random();
          const rand8 = Math.random();
          
          const scale = 1 + rand1 * 0.9;
          const minTopRequired = (scale - 1) * 50;
          const maxTopRequired = 100 - (scale - 1) * 50;
          
          // Si on peut spawner sans clipping
          if (minTopRequired <= maxTopRequired) {
            // Mélanger l'ordre d'utilisation des rands
            const initialTop = minTopRequired + rand3 * (maxTopRequired - minTopRequired);
            
            const newMagikarp: Magikarp = {
              id: `mag-${Date.now()}-${rand2}-${rand4}-${rand6}-${Math.floor(Math.random() * 999999)}`,
              top: initialTop,
              direction: rand5 > 0.5 ? 'left' : 'right',
              duration: 25,
              isShiny: rand7 < 0.05,
              scale: scale,
            };

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
