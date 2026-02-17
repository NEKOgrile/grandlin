import { Castle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NemoSpawner from './NemoSpawner';

export default function LorcanaSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Éditions enchantées', img: 'booster_disney.png' },
    { name: 'Pack / Coffrets', desc: 'Collections premium', img: 'coffret_disney.png' },
    { name: 'Cartes à l\'unité', desc: 'Cartes rares', img: 'carte_disney.png' },
    { name: 'Decks préconstruits', desc: 'Prêts à jouer', img: 'deck_disney.png' },
  ];

  return (
    <section className="relative py-16 px-6">
      <NemoSpawner />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Castle className="w-12 h-12 text-[#00BCD4] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            Disney Lorcana
          </h2>
          <p className="text-lg text-[#F5F9FC]/70">
            Lumière magique dans les abysses
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/lorcana/${encodeURIComponent(category.name)}`)}
              className="group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-4 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="bg-[#0B3C5D]/40 rounded-lg h-40 md:h-44 mb-3 overflow-hidden relative">
                <img
                  src={encodeURI(import.meta.env.BASE_URL + category.img)}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
