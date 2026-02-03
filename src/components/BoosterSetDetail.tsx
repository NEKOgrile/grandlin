import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getThemeById } from '../data/products';

export default function BoosterSetDetail() {
  const { themeId } = useParams<{ themeId: string }>();

  if (!themeId) return <div>Page non trouvée</div>;

  const theme = getThemeById(themeId);
  if (!theme || !theme.boosterSets) return <div>Thème inexistant</div>;

  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollToTop) {
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
    }
  }, [location]);

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Bouton retour sticky en haut */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <a
          href="/grandlin/"
          className="inline-flex items-center gap-2 text-white hover:text-[#F5F9FC] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'accueil
        </a>
      </div>

      {/* Header */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black text-[#F5F9FC] mb-6" style={{
            textShadow: '3px 3px 0 rgba(0,0,0,0.5), -1px -1px 0 rgba(0,0,0,0.3)',
            letterSpacing: '2px'
          }}>
            Boosters
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F9FC]">
            {theme.name}
          </h2>
        </div>
      </section>

      {/* Sets avec produits */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {theme.boosterSets.map((set) => (
            <div key={set.id}>
              {/* Titre du set comme délimitation */}
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-[#F5F9FC] pb-4 border-b-2 border-white/30">
                  ◆ {set.name}
                </h3>
              </div>

              {/* Grille de produits pour ce set */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {set.products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="bg-black/30 rounded-lg h-24 mb-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-bold text-white/60">{set.code}</div>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-[#F5F9FC] line-clamp-2">
                      {product.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
