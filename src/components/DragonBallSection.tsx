import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DragonBallFloat from './DragonBallFloat';

export default function DragonBallSection() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Boosters', desc: 'Extensions DBZ', img: 'booster_dbz.png' },
    { name: 'Pack / Coffrets', desc: 'Coffrets premium', img: 'coffret_dbz.png' },
    { name: 'Cartes à l\'unité', desc: 'Cartes puissantes', img: 'carte_dbz.png' },
    { name: 'Decks préconstruits', desc: 'Prêts à jouer', img: 'deck_dbz.png' },
  ];

  return (
    <section className="relative py-20 px-6" style={{ zIndex: 10 }}>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/theme/dragonball/${encodeURIComponent(category.name)}`)}
              className="group bg-[#0B3C5D]/50 backdrop-blur-sm rounded-xl p-4 border border-[#F5F9FC]/10 hover:border-[#00BCD4] transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="bg-[#0B3C5D]/50 rounded-lg h-40 md:h-44 mb-3 overflow-hidden relative">
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
