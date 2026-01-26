import { Zap } from 'lucide-react';

export default function DragonBallSection() {
  const cards = [
    { name: 'Fusion World', desc: 'Nouvelles fusions' },
    { name: 'Super Card Game', desc: 'Guerriers légendaires' },
    { name: 'Éditions spéciales', desc: 'Cartes exclusives' },
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Zap className="w-12 h-12 text-[#00BCD4] mx-auto mb-3" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F9FC] mb-3">
            Dragon Ball
          </h2>
          <p className="text-lg text-[#F5F9FC]/70">
            Énergie pure des profondeurs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105 ${cards.length === 3 && index === 2 ? 'col-span-2 md:col-span-1 md:col-start-2' : ''}`}
            >
              <div className="bg-[#0B3C5D]/40 rounded-lg h-32 md:h-48 mb-3 md:mb-4 flex items-center justify-center">
                <Zap className="w-10 md:w-16 h-10 md:h-16 text-[#00BCD4]/50 group-hover:text-[#00BCD4] transition-colors duration-300" />
              </div>
              <h3 className="text-sm md:text-xl font-semibold text-[#F5F9FC] mb-1 md:mb-2 line-clamp-2">
                {card.name}
              </h3>
              <p className="text-xs md:text-base text-[#F5F9FC]/70 line-clamp-2">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
