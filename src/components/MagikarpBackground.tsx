import { useEffect, useState } from 'react';

interface MagikarpItem {
  id: string;
  top: number;
  direction: 'left' | 'right';
  depth: number;
  duration: number;
  isShiny: boolean;
}

export default function MagikarpBackground() {
  const [magikarpList, setMagikarpList] = useState<MagikarpItem[]>([]);

  useEffect(() => {
    const addMagikarp = () => {
      const newMagikarp: MagikarpItem = {
        id: Date.now() + Math.random().toString(),
        top: Math.random() * 100, // 0-100% de la hauteur du conteneur
        direction: Math.random() > 0.5 ? 'left' : 'right',
        depth: Math.floor(Math.random() * 5) + 1,
        duration: 10 + Math.random() * 8,
        isShiny: Math.random() > 0.7,
      };

      setMagikarpList((prev) => [...prev, newMagikarp]);

      const timer = setTimeout(() => {
        setMagikarpList((prev) => prev.filter((m) => m.id !== newMagikarp.id));
      }, newMagikarp.duration * 1000);

      return () => clearTimeout(timer);
    };

    const interval = setInterval(addMagikarp, 333);
    return () => clearInterval(interval);
  }, []);

  const getDepthStyles = (depth: number) => {
    const depthMap = {
      1: { zIndex: -40, opacity: 0.2, scale: 0.5 },
      2: { zIndex: -30, opacity: 0.3, scale: 0.6 },
      3: { zIndex: -20, opacity: 0.4, scale: 0.7 },
      4: { zIndex: -10, opacity: 0.5, scale: 0.8 },
      5: { zIndex: -5, opacity: 0.6, scale: 0.9 },
    };
    return depthMap[depth as keyof typeof depthMap];
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {magikarpList.map((magikarp) => {
        const depthStyle = getDepthStyles(magikarp.depth);
        const animationClass =
          magikarp.direction === 'left'
            ? 'animate-move-left'
            : 'animate-move-right';
        const imageSrc = magikarp.isShiny
          ? './src/image/pokemon-magikarp-shiny.png'
          : './src/image/pokemon-magikarp.png';

        return (
          <div
            key={magikarp.id}
            className={`absolute ${animationClass}`}
            style={{
              top: magikarp.top + '%',
              zIndex: depthStyle.zIndex,
              opacity: depthStyle.opacity,
              transform: `scale(${depthStyle.scale})`,
              animationDuration: magikarp.duration + 's',
              whiteSpace: 'nowrap',
            }}
          >
            <img
              src={imageSrc}
              alt="Magikarp"
              className="h-20 drop-shadow-lg inline-block"
              style={{
                filter: magikarp.isShiny ? 'brightness(1.2)' : 'brightness(1)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
