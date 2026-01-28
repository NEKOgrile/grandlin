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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-6 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105 last:col-span-2 md:last:col-span-1"
            >
              <div className="bg-[#0B3C5D]/40 rounded-lg h-48 mb-4 flex items-center justify-center">
                <Zap className="w-16 h-16 text-[#00BCD4]/50 group-hover:text-[#00BCD4] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#F5F9FC] mb-2">
                {card.name}
              </h3>
              <p className="text-[#F5F9FC]/70">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Depth boule animation - appears from depth (small + transparent -> full size + opaque) */}
      <img
        src="./boule1.png"
        alt="Boule Dragon"
        className="pointer-events-none absolute right-8 -top-4 w-16 h-16 md:w-24 md:h-24 object-contain boule-depth"
      />
      <style>{`
        .boule-depth {
          opacity: 0.35;
          transform: scale(0.6) translateY(10px);
          animation: boule-appear 1.2s ease-out 0.3s forwards;
        }
        @keyframes boule-appear {
          0% {
            opacity: 0.2;
            transform: scale(0.5) translateY(18px);
            filter: blur(2px);
          }
          60% {
            opacity: 0.9;
            transform: scale(1.05) translateY(-6px);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
