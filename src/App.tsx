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
    if (scrollDepth < 12) {
      return `rgb(126, 215, 246)`;
    } else if (scrollDepth < 20) {
      const progress = (scrollDepth - 12) / 8;
      return `rgb(${126 - progress * 46}, ${215 - progress * 64}, ${246 - progress * 56})`;
    } else if (scrollDepth < 35) {
      const progress = (scrollDepth - 20) / 15;
      return `rgb(${80 - progress * 40}, ${151 - progress * 51}, ${190 - progress * 50})`;
    } else if (scrollDepth < 50) {
      const progress = (scrollDepth - 35) / 15;
      return `rgb(${40 - progress * 15}, ${100 - progress * 30}, ${140 - progress * 40})`;
    } else if (scrollDepth < 70) {
      const progress = (scrollDepth - 50) / 20;
      return `rgb(${25 - progress * 10}, ${70 - progress * 20}, ${100 - progress * 30})`;
    } else if (scrollDepth < 90) {
      const progress = (scrollDepth - 70) / 20;
      return `rgb(${15 - progress * 5}, ${50 - progress * 15}, ${70 - progress * 20})`;
    } else {
      return `rgb(10, 35, 50)`;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-1000 ease-in-out"
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
