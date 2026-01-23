import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import PokemonSection from './components/PokemonSection';
import MagicSection from './components/MagicSection';
import OnePieceSection from './components/OnePieceSection';
import LorcanaSection from './components/LorcanaSection';
import DragonBallSection from './components/DragonBallSection';
import LeagueSection from './components/LeagueSection';
import ContactSection from './components/ContactSection';

function App() {
  const [scrollDepth, setScrollDepth] = useState(0);

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

  const getBackgroundColor = () => {
    if (scrollDepth < 15) {
      const progress = scrollDepth / 15;
      return `rgb(${126 - progress * 66}, ${215 - progress * 75}, ${246 - progress * 66})`;
    } else if (scrollDepth < 30) {
      const progress = (scrollDepth - 15) / 15;
      return `rgb(${60 - progress * 25}, ${140 - progress * 40}, ${180 - progress * 50})`;
    } else if (scrollDepth < 45) {
      const progress = (scrollDepth - 30) / 15;
      return `rgb(${35 - progress * 15}, ${100 - progress * 35}, ${130 - progress * 45})`;
    } else if (scrollDepth < 60) {
      const progress = (scrollDepth - 45) / 15;
      return `rgb(${20 - progress * 8}, ${65 - progress * 25}, ${85 - progress * 30})`;
    } else if (scrollDepth < 75) {
      const progress = (scrollDepth - 60) / 15;
      return `rgb(${12 - progress * 4}, ${40 - progress * 15}, ${55 - progress * 17})`;
    } else if (scrollDepth < 90) {
      const progress = (scrollDepth - 75) / 15;
      return `rgb(${8 - progress * 2}, ${25 - progress * 10}, ${38 - progress * 13})`;
    } else {
      return `rgb(6, 15, 25)`;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-[1500ms] ease-in-out"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <HeroSection scrollDepth={scrollDepth} />
      <PokemonSection />
      <MagicSection />
      <OnePieceSection />
      <LorcanaSection />
      <DragonBallSection />
      <LeagueSection />
      <ContactSection />
    </div>
  );
}

export default App;
