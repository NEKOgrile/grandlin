import { Swords } from 'lucide-react';

export default function LeagueSection() {
  const cards = [
    { name: 'League of Legends', desc: 'Champions et Régions' },
    { name: 'Autres TCG', desc: 'Découvrez nos exclusivités' },
    { name: 'Précommandes', desc: 'Prochaines sorties' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-[#051923]/60 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-[#F5F9FC]/5 hover:border-[#80DEEA]/80 transition-all duration-500 hover:scale-105 ${cards.length === 3 && index === 2 ? 'col-span-2 md:col-span-1 md:col-start-2' : ''}`}
            >
              <div className="bg-[#0B3C5D]/30 rounded-lg h-32 md:h-48 mb-3 md:mb-4 flex items-center justify-center">
                <Swords className="w-10 md:w-16 h-10 md:h-16 text-[#80DEEA]/40 group-hover:text-[#80DEEA] transition-colors duration-300" />
              </div>
              <h3 className="text-sm md:text-xl font-semibold text-[#F5F9FC] mb-1 md:mb-2 line-clamp-2">
                {card.name}
              </h3>
              <p className="text-xs md:text-base text-[#F5F9FC]/60 line-clamp-2">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
