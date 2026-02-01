import { Castle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NemoSpawner from './NemoSpawner';

export default function LorcanaSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Éditions enchantées' },
    { name: 'Pack / Coffrets', desc: 'Collections premium' },
    { name: 'Cartes à l\'unité', desc: 'Cartes rares' },
    { name: 'Decks préconstruits', desc: 'Prêts à jouer' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/lorcana/${encodeURIComponent(category.name)}`)}
              className="group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-6 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105 last:col-span-2 md:last:col-span-1 cursor-pointer"
            >
              <div className="bg-[#0B3C5D]/40 rounded-lg h-48 mb-4 flex items-center justify-center">
                <Castle className="w-16 h-16 text-[#00BCD4]/50 group-hover:text-[#00BCD4] transition-colors duration-300" />
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
