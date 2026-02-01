import { Swords } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeagueSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Éditions classiques' },
    { name: 'Pack / Coffrets', desc: 'Collections spéciales' },
    { name: 'Cartes à l\'unité', desc: 'Cartes de champion' },
    { name: 'Decks préconstruits', desc: 'Decks équilibrés' },
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Swords className="w-12 h-12 text-[#80DEEA] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            Les Abysses
          </h2>
          <p className="text-lg text-[#F5F9FC]/70">
            Puissance mystérieuse des profondeurs ultimes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/league/${encodeURIComponent(category.name)}`)}
              className="group bg-[#051923]/60 backdrop-blur-sm rounded-xl p-4 border border-[#F5F9FC]/5 hover:border-[#80DEEA]/80 transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="bg-[#0B3C5D]/30 rounded-lg h-32 mb-3 flex items-center justify-center">
                <Swords className="w-12 h-12 text-[#80DEEA]/40 group-hover:text-[#80DEEA] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F9FC] mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-[#F5F9FC]/60">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
