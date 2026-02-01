import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagikarpSpawner from './MagikarpSpawner';

export default function PokemonSection() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Boosters', desc: 'Évolution Écarlate & Violet' },
    { name: 'Pack / Coffrets', desc: 'Collections exclusives' },
    { name: 'Cartes à l\'unité', desc: 'Rares et ultra-rares' },
    { name: 'Decks préconstruits', desc: 'Prêts à jouer' },
  ];

  return (
    <section className="relative py-16 px-6">
      <MagikarpSpawner />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Sparkles className="w-12 h-12 text-[#4DD0E1] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            Univers Pokémon
          </h2>
          <p className="text-lg text-[#F5F9FC]/80">
            Explorez les premières profondeurs lumineuses
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/pokemon/${encodeURIComponent(category.name)}`)}
              className="group bg-[#1E81B0]/30 backdrop-blur-sm rounded-2xl p-4 border border-[#F5F9FC]/20 hover:border-[#4DD0E1] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#4DD0E1]/20 cursor-pointer"
            >
              <div className="bg-[#0B3C5D]/50 rounded-xl h-32 mb-3 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-[#4DD0E1]/70 group-hover:text-[#4DD0E1] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F9FC] mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-[#F5F9FC]/70">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
