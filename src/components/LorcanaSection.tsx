import { Castle } from 'lucide-react';

export default function LorcanaSection() {
  const cards = [
    { name: 'Disney Lorcana', desc: 'Magie Disney enchantée' },
    { name: 'Illumineer\'s Quest', desc: 'Éditions spéciales' },
    { name: 'Collections', desc: 'Cartes rares et premium' },
  ];

  return (
    <section className="relative py-16 px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-6 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105"
            >
              <div className="bg-[#0B3C5D]/40 rounded-lg h-48 mb-4 flex items-center justify-center">
                <Castle className="w-16 h-16 text-[#00BCD4]/50 group-hover:text-[#00BCD4] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F9FC] mb-2">
                {card.name}
              </h3>
              <p className="text-[#F5F9FC]/70">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
