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
  const [spawnRate, setSpawnRate] = useState(1); // 1 = 100%, 0.05 = 5%
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      // On ne fait plus rien sur le scroll, spawn constant
      return;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spawn constant indépendant du scroll
  useEffect(() => {
    setSpawnRate(1); // Toujours à 100%
  }, []);

  useEffect(() => {
    const spawnMagikarp = () => {
      // Vérifier si on doit spawner basé sur le spawn rate
      if (Math.random() > spawnRate) {
        // Relancer immédiatement un nouvel essai
        const nextSpawnDelay = 1000 + Math.random() * 1000; // Pas de division par spawnRate
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(spawnMagikarp, nextSpawnDelay) as any;
        return;
      }

      // Déterminer la scale d'abord
      const scale = 1 + Math.random();
      
      // Calculer le top minimum basé sur la scale pour éviter le clipping
      // Une scale de 2 signifie la moitié de la hauteur, donc top min = (scale - 1) * 50
      const minTopRequired = (scale - 1) * 50;
      const maxTopAvailable = 100;
      
      // Vérifier si on peut spawner sans clipping
      if (minTopRequired > maxTopAvailable) {
        // Ne pas spawner si ça serait complètement coupé
        const nextSpawnDelay = 1000 + Math.random() * 1000;
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(spawnMagikarp, nextSpawnDelay) as any;
        return;
      }
      
      // Spawner entre le top minimum et 100%
      const initialTop = minTopRequired + Math.random() * (maxTopAvailable - minTopRequired);

      const newMagikarp: Magikarp = {
        id: Date.now() + Math.random().toString(),
        top: initialTop,
        direction: Math.random() > 0.5 ? 'left' : 'right',
        duration: 8 + Math.random() * 6, // 8-14 secondes (comme avant)
        isShiny: Math.random() > 0.95,
        scale: scale,
      };

      setMagikarpList((prev) => [...prev, newMagikarp]);

      setTimeout(() => {
        setMagikarpList((prev) => prev.filter((m) => m.id !== newMagikarp.id));
      }, newMagikarp.duration * 1000);

      // Spawner le prochain avec un délai aléatoire
      const nextSpawnDelay = 1000 + Math.random() * 1000;
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = setTimeout(spawnMagikarp, nextSpawnDelay) as any;
    };

    // Commencer le premier spawn
    const initialDelay = 1000 + Math.random() * 1000;
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(spawnMagikarp, initialDelay) as any;

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [spawnRate]);

  return (
    <div 
      ref={containerRef}
      className="absolute pointer-events-none" 
      style={{ 
        overflow: 'visible', 
        overflowX: 'hidden', 
        top: '-400px',
        minHeight: 'calc(100% + 600px)',
        left: '-100px',
        right: '-100px',
        width: 'calc(100% + 200px)',
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
