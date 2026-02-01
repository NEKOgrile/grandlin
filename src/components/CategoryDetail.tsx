import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getThemeById, getProductsByCategory } from '../data/products';

export default function CategoryDetail() {
  const { themeId, category } = useParams<{ themeId: string; category: string }>();
  const navigate = useNavigate();

  if (!themeId || !category) return <div>Page non trouvée</div>;

  const theme = getThemeById(themeId);
  if (!theme) return <div>Thème inexistant</div>;

  // Rediriger les Boosters Pokemon vers BoosterSetDetail
  if (category === 'Boosters' && themeId === 'pokemon' && theme.boosterSets) {
    navigate(`/theme/${themeId}/boosters`);
    return null;
  }

  const products = getProductsByCategory(themeId, decodeURIComponent(category));

  if (products.length === 0) {
    return <div>Aucun produit trouvé</div>;
  }

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
                  <div className="text-center px-4">
                    <p className="text-[#F5F9FC] font-semibold text-lg">
                      {product.name}
                    </p>
                  </div>
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
    </div>
  );
}
