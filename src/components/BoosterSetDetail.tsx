import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import { getThemeById } from '../data/products';

export default function BoosterSetDetail() {
  const { themeId } = useParams<{ themeId: string }>();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollToTop?: boolean } | null;
    if (state?.scrollToTop) {
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
    }
  }, [location]);

  if (!themeId) return <div>Page non trouvée</div>;

  const theme = getThemeById(themeId);
  if (!theme || !theme.boosterSets) return <div>Thème inexistant</div>;

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
                    <div className="bg-black/30 rounded-lg h-24 mb-3 flex items-center justify-center relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={encodeURI(import.meta.env.BASE_URL + product.image)}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-xs font-bold text-white/60">{set.code}</div>
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[#F5F9FC] line-clamp-2">
                      {product.name}
                    </h4>
                  </div>
                ))}
              </div>

              {/* NOTE / Contact banner specifically under the 'Épée & Bouclier' set for Pokémon */}
              {theme.id === 'pokemon' && set.id === 'pok-era-swsh' && (
                <div className="mt-6">
                  <div className="bg-[#051923]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#F5F9FC]/10 mx-0 md:mx-4">
                    <div className="max-w-7xl mx-auto text-center">
                      <p className="text-lg text-[#F5F9FC]/80 mb-4">Si vous ne trouvez pas un booster listé ici ou pour les nouveautés récentes, contactez le vendeur ou rendez-vous en boutique — nous pouvons vous renseigner et réserver des produits.</p>

                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl w-full">
                          <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                            <Phone className="w-5 h-5 text-[#80DEEA] mb-2" />
                            <div className="text-sm text-[#F5F9FC]">Téléphone: 01 23 45 67 89</div>
                          </div>
                          <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                            <MapPin className="w-5 h-5 text-[#80DEEA] mb-2" />
                            <div className="text-sm text-[#F5F9FC]">16 Rue Croix Verte<br/>81000 Albi</div>
                          </div>
                          <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                            <Clock className="w-5 h-5 text-[#80DEEA] mb-2" />
                            <div className="text-sm text-[#F5F9FC]">Mar-Sam: 11h–19h</div>
                          </div>
                        </div>

                        <div className="w-full md:w-1/3 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                          <iframe
                            title="Localisation magasin"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent('16 Rue Croix Verte 81000 Albi')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-40"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <a href="tel:0123456789" className="inline-flex items-center gap-3 bg-[#80DEEA] hover:bg-[#4DD0E1] text-[#051923] font-semibold px-5 py-2 rounded-xl transition-all">Contacter le magasin</a>
                        <a href="https://www.instagram.com/gran_dlin" target="_blank" rel="noreferrer" className="ml-3 inline-flex items-center gap-2 border border-white/10 text-white/80 px-4 py-2 rounded-xl">Instagram</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
