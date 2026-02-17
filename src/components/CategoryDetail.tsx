import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import { getThemeById, getProductsByCategory } from '../data/products';

export default function CategoryDetail() {
  const { themeId, category } = useParams<{ themeId: string; category: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when navigation requested it
  useEffect(() => {
    const state = location.state as { scrollToTop?: boolean } | null;
    if (state?.scrollToTop) {
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 0);
    }
  }, [location]);

  if (!themeId || !category) return <div>Page non trouvée</div>;

  const theme = getThemeById(themeId);
  if (!theme) return <div>Thème inexistant</div>

  // Rediriger les Boosters Pokemon vers BoosterSetDetail
  if (category === 'Boosters' && themeId === 'pokemon' && theme.boosterSets) {
    navigate(`/theme/${themeId}/boosters`, { state: { scrollToTop: true } });
    return null;
  }

  const decodedCategory = decodeURIComponent(category);
  const products = getProductsByCategory(themeId, decodedCategory);

  // Special layout for Pokémon single cards, decks and coffrets: centered contact + map
  if ((decodedCategory === 'Cartes à l\'unité' || decodedCategory === 'Decks préconstruits' || decodedCategory === 'Pack / Coffrets') && themeId === 'pokemon') {
    const isCards = decodedCategory === 'Cartes à l\'unité';
    const isDecks = decodedCategory === 'Decks préconstruits';
    const title = isCards ? 'Cartes à l\'unité' : isDecks ? 'Decks préconstruits' : 'Pack / Coffrets';
    const subtitle = isCards
      ? "Toutes les cartes sont présentées en magasin. Pour des recherches spécifiques, contactez le vendeur."
      : isDecks
      ? "Nos decks préconstruits sont disponibles en boutique. Pour disponibilité et conseils, contactez le vendeur."
      : "Nos coffrets sont disponibles en boutique. Pour disponibilité et réservations, contactez le vendeur.";

    return (
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ backgroundColor: theme.bgColor }}
      >
        <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <a
            href="/grandlin/"
            className="inline-flex items-center gap-2 text-white hover:text-[#F5F9FC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </a>
        </div>

        <section className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#F5F9FC] mb-3">{theme.name}</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F9FC]/80 mb-8">{title}</h2>

            <div className="bg-[#051923]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#F5F9FC]/10 mx-4 md:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="text-center md:text-left px-4 py-6">
                  <h3 className="text-2xl font-semibold text-[#F5F9FC] mb-4">{isCards ? 'Toutes les cartes sont présentées en magasin' : isDecks ? 'Decks disponibles en boutique' : 'Coffrets disponibles en boutique'}</h3>
                  <p className="text-[#F5F9FC]/70 mb-6">{subtitle}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto md:mx-0 mb-6">
                    <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                      <Phone className="w-6 h-6 text-[#80DEEA] mb-2" />
                      <div className="text-sm text-[#F5F9FC]">Téléphone: 01 23 45 67 89</div>
                    </div>
                    <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                      <MapPin className="w-6 h-6 text-[#80DEEA] mb-2" />
                      <div className="text-sm text-[#F5F9FC]">16 Rue Croix Verte<br/>81000 Albi</div>
                    </div>
                    <div className="bg-[#0B3C5D]/30 rounded-lg p-4 flex flex-col items-center">
                      <Clock className="w-6 h-6 text-[#80DEEA] mb-2" />
                      <div className="text-sm text-[#F5F9FC]">Mar-Sam: 11h–19h</div>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start gap-3">
                    <a href="tel:0123456789" className="inline-flex items-center gap-3 bg-[#80DEEA] hover:bg-[#4DD0E1] text-[#051923] font-semibold px-6 py-3 rounded-xl transition-all">Contacter le magasin</a>
                    <a href="https://www.instagram.com/gran_dlin" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/10 text-white/80 px-4 py-3 rounded-xl">Instagram</a>
                  </div>
                </div>

                <div className="px-4 py-6">
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    <iframe
                      title="Localisation magasin"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent('16 Rue Croix Verte 81000 Albi')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-56 md:h-64"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (products.length === 0) {
    return <div>Aucun produit trouvé</div>;
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Scroll to top handled in useEffect */}
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
          <h1 className="text-5xl md:text-6xl font-bold text-[#F5F9FC] mb-3">
            {theme.name}
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#F5F9FC]/80">
            {decodeURIComponent(category)}
          </h2>
        </div>
      </section>

      {/* Grille de produits */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="group bg-[#051923]/50 backdrop-blur-sm rounded-xl p-6 border border-[#F5F9FC]/15 hover:border-[#F5F9FC]/40 transition-all duration-300 hover:scale-105"
              >
                <div
                  className="bg-gradient-to-br rounded-lg h-48 mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: theme.accentColor + '33',
                    borderLeft: `4px solid ${theme.accentColor}`,
                  }}
                >
                  {product.image ? (
                    <img
                      src={encodeURI(import.meta.env.BASE_URL + product.image)}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <p className="text-[#F5F9FC] font-semibold text-lg">
                        {product.name}
                      </p>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#F5F9FC] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#F5F9FC]/60 text-sm mb-4">
                  {decodeURIComponent(category)}
                </p>
                <button
                  className="w-full px-4 py-2 bg-[#F5F9FC]/10 hover:bg-[#F5F9FC]/20 text-[#F5F9FC] rounded transition-colors"
                >
                  En savoir plus
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {themeId === 'magic' && (
        <>
          <div className="mt-6">
            <div className="bg-[#051923]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#F5F9FC]/10 mx-0 md:mx-4">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-lg text-[#F5F9FC]/80 mb-4">Si vous ne trouvez pas un produit Magic listé ici ou pour les nouveautés récentes, contactez le vendeur ou rendez-vous en boutique — nous pouvons vous renseigner et réserver des produits.</p>

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

        </>
      )}

    </div>
  );
}
