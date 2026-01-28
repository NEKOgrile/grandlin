import { useEffect, useState } from 'react';

interface DragonBallFloatProps {
  imagePath: string;
  shinyImagePath: string;
  seed: number;
}

export default function DragonBallFloat({ imagePath, shinyImagePath, seed }: DragonBallFloatProps) {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    // Seeded random for consistent but unique positions per instance
    const random = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };

    // Position aléatoire mais pas trop proche : top entre -20% et 120%, right entre 5% et 85%
    const top = -20 + random(1) * 140; // -20% to 120%
    const right = 5 + random(2) * 80;  // 5% to 85%

    setPosition({ top, right });
  }, [seed]);

  return (
    <div
      className="pointer-events-none absolute w-16 h-16 md:w-24 md:h-24"
      style={{
        top: `${position.top}%`,
        right: `${position.right}%`,
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
