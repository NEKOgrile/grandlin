import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MagicSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Dernières extensions' },
    { name: 'Pack / Coffrets', desc: 'Collections premium' },
    { name: 'Cartes à l\'unité', desc: 'Cartes rares' },
    { name: 'Decks préconstruits', desc: 'Decks complets' },
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Wand2 className="w-12 h-12 text-[#26C6DA] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            Magic: The Gathering
          </h2>
          <p className="text-lg text-[#F5F9FC]/70">
            Magie mystique des profondeurs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/magic/${encodeURIComponent(category.name)}`)}
              className="group bg-[#1E4F6F]/40 backdrop-blur-sm rounded-xl p-4 border border-[#F5F9FC]/10 hover:border-[#26C6DA] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="bg-[#0F3A52]/40 rounded-lg h-32 mb-3 flex items-center justify-center">
                <Wand2 className="w-12 h-12 text-[#26C6DA]/50 group-hover:text-[#26C6DA] transition-colors duration-300" />
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
