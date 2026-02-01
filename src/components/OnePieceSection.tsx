import { Anchor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OnePieceSpawner from './OnePieceSpawner';

export default function OnePieceSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Éditions premium' },
    { name: 'Pack / Coffrets', desc: 'Collections exclusives' },
    { name: 'Cartes à l\'unité', desc: 'Cartes légendaires' },
    { name: 'Decks préconstruits', desc: 'Prêts à jouer' },
  ];

  return (
    <section className="relative py-16 px-6" style={{ zIndex: 10, overflow: 'visible' }}>
      <OnePieceSpawner />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Anchor className="w-12 h-12 text-[#26C6DA] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            One Piece Card Game
          </h2>
          <p className="text-lg text-[#F5F9FC]/70">
            Trésors des mers profondes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/onepiece/${encodeURIComponent(category.name)}`)}
              className="group relative z-20 bg-[#0B3C5D]/40 backdrop-blur-sm rounded-xl p-6 border border-[#F5F9FC]/15 hover:border-[#26C6DA] transition-all duration-500 hover:scale-105 last:col-span-2 md:last:col-span-1 cursor-pointer"
            >
              <div className="bg-[#051923]/60 rounded-lg h-48 mb-4 flex items-center justify-center">
                <Anchor className="w-16 h-16 text-[#26C6DA]/60 group-hover:text-[#26C6DA] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F9FC] mb-2">
                {category.name}
              </h3>
              <p className="text-[#F5F9FC]/70">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
