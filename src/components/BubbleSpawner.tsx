import { useEffect, useState, useRef } from 'react';

interface Bubble {
  id: string;
  top: number;
  left: number;
  size: number;
  duration: number;
  zIndex: number;
}

export default function BubbleSpawner() {
  const [bubbleList, setBubbleList] = useState<Bubble[]>([]);
  const [scrollDepth, setScrollDepth] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const depth = (scrollPosition / maxScroll) * 100;
      setScrollDepth(depth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spawn bubbles
  useEffect(() => {
    const spawnBubble = () => {
      // Ne spawner que jusqu'à 50% de profondeur
      if (scrollDepth > 50) {
        const nextDelay = 500 + Math.random() * 1000;
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(spawnBubble, nextDelay) as any;
        return;
      }

      setBubbleList((currentList) => {
        // Limiter à 20 bulles max
        if (currentList.length >= 20) {
          const nextDelay = 500 + Math.random() * 1000;
          if (intervalRef.current) clearTimeout(intervalRef.current);
          intervalRef.current = setTimeout(spawnBubble, nextDelay) as any;
          return currentList;
        }

        const sizes = [8, 12, 16, 20, 24]; // 5 tailles différentes
        const durations = [8, 12, 15, 18, 22]; // 5 vitesses différentes
        const zIndexes = [1, 2, 3, 4, 5]; // 5 plans différents

        const sizeIndex = Math.floor(Math.random() * 5);
        const size = sizes[sizeIndex];
        const duration = durations[sizeIndex];
        const zIndex = zIndexes[sizeIndex];

        const newBubble: Bubble = {
          id: Math.random().toString(36) + Date.now().toString(36),
          top: window.scrollY + Math.random() * window.innerHeight,
          left: Math.random() * 100,
          size: size,
          duration: duration,
          zIndex: zIndex,
        };

        // Auto-remove après animation
        setTimeout(() => {
          setBubbleList((prev) => prev.filter((b) => b.id !== newBubble.id));
        }, (duration + 2) * 1000);

        const nextDelay = 500 + Math.random() * 1000;
        if (intervalRef.current) clearTimeout(intervalRef.current);
        intervalRef.current = setTimeout(spawnBubble, nextDelay) as any;

        return [...currentList, newBubble];
      });
    };

    const initialDelay = 500 + Math.random() * 1000;
    if (intervalRef.current) clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(spawnBubble, initialDelay) as any;

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [scrollDepth]);

  return (
    <>
      {bubbleList.map((bubble) => (
        <div
          key={bubble.id}
          className="fixed rounded-full bg-white/20 pointer-events-none"
          style={{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.left + '%',
            top: bubble.top + 'px',
            zIndex: bubble.zIndex,
            animation: `float linear ${bubble.duration}s forwards`,
          }}
        />
      ))}
    </>
  );
}
