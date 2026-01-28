import { Zap } from 'lucide-react';
import DragonBallFloat from './DragonBallFloat';

export default function DragonBallSection() {
  const cards = [
    { name: 'Fusion World', desc: 'Nouvelles fusions' },
    { name: 'Super Card Game', desc: 'Guerriers légendaires' },
    { name: 'Éditions spéciales', desc: 'Cartes exclusives' },
  ];

  return (
    <section className="relative py-20 px-6">
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
      {/* Dragon Balls with floating animation - random positions */}
      <DragonBallFloat imagePath="./boule1.png" shinyImagePath="./boule1_brillante.png" seed={1} />
      <DragonBallFloat imagePath="./boule2.png" shinyImagePath="./boule2_brillante.png" seed={2} />
      <DragonBallFloat imagePath="./boule3.png" shinyImagePath="./boule3_brillante.png" seed={3} />
      <DragonBallFloat imagePath="./boule4.png" shinyImagePath="./boule4_brillante.png" seed={4} />
      <DragonBallFloat imagePath="./boule5.png" shinyImagePath="./boule5_brillante.png" seed={5} />
      <DragonBallFloat imagePath="./boule6.png" shinyImagePath="./boule6_brillante.png" seed={6} />
      <DragonBallFloat imagePath="./boule7.png" shinyImagePath="./boule7_brillante.png" seed={7} />
    </section>
  );
}
