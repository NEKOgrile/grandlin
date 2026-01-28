import { useEffect, useState } from 'react';

interface DragonBallFloatProps {
  imagePath: string;
  shinyImagePath: string;
  seed: number;
}

export default function DragonBallFloat({ imagePath, shinyImagePath, seed }: DragonBallFloatProps) {
  const [position, setPosition] = useState({ top: 0, right: 0, depth: 3 });

  useEffect(() => {
    // Use true random for different positions on each page load
    const zone = (seed - 1) % 7;
    const zoneWidth = 100 / 7;
    const minTop = -10;
    const maxTop = 110;

    const baseRight = zone * zoneWidth + Math.random() * (zoneWidth - 15);
    const baseTop = minTop + Math.random() * (maxTop - minTop);
    const depth = Math.floor(Math.random() * 5) + 1; // Random depth 1-5 like Magikarp

    setPosition({ 
      top: baseTop, 
      right: Math.max(0, Math.min(85, baseRight)),
      depth
    });
  }, [seed]);

  // Negative z-index to stay behind cards
  const getDepthStyles = (depth: number) => {
    const depthMap = {
      1: { zIndex: -5, opacity: 1, scale: 0.5 },
      2: { zIndex: -4, opacity: 1, scale: 0.6 },
      3: { zIndex: -3, opacity: 1, scale: 0.7 },
      4: { zIndex: -2, opacity: 1, scale: 0.8 },
      5: { zIndex: -1, opacity: 1, scale: 0.9 },
    };
    return depthMap[depth as keyof typeof depthMap];
  };

  const depthStyle = getDepthStyles(position.depth);

  return (
    <div
      className="pointer-events-none absolute w-16 h-16 md:w-24 md:h-24"
      style={{
        top: `${position.top}%`,
        right: `${position.right}%`,
        zIndex: depthStyle.zIndex,
        opacity: depthStyle.opacity,
        transform: `scale(${depthStyle.scale})`,
      }}
    >
      <img
        src={imagePath}
        alt="Boule Dragon"
        className="absolute inset-0 w-full h-full object-contain boule-base"
      />
      <img
        src={shinyImagePath}
        alt="Boule Brillante"
        className="absolute inset-0 w-full h-full object-contain boule-shiny"
      />
      <style>{`
        .boule-base {
          opacity: 1;
          transform: scale(1) translateY(0);
          animation: boule-float 3s ease-in-out infinite;
        }
        .boule-shiny {
          opacity: 0;
          transform: scale(0.8) translateY(6px);
          filter: blur(2px) brightness(1.2);
          animation: boule-shine 4s ease-in-out 0.6s infinite, boule-float 3s ease-in-out infinite;
        }
        @keyframes boule-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes boule-shine {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(4px);
            filter: blur(2px) brightness(0.9);
          }
          40% {
            opacity: 0.6;
            transform: scale(1.08) translateY(0px);
            filter: blur(0px) brightness(1.6);
          }
          60% {
            opacity: 0.85;
            transform: scale(1.02) translateY(0px);
            filter: blur(0px) brightness(1.4);
          }
          100% {
            opacity: 0;
            transform: scale(0.9) translateY(2px);
            filter: blur(2px) brightness(1.0);
          }
        }
      `}</style>
    </div>
  );
}
