export interface Product {
  id: string;
  name: string;
  category: 'Boosters' | 'Pack / Coffrets' | 'Cartes à l\'unité' | 'Decks préconstruits';
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgColor: string;
  accentColor: string;
  icon: string;
  products: Product[];
}

export const themes: ThemeConfig[] = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    bgColor: 'rgb(50, 110, 140)',
    accentColor: 'rgb(255, 200, 0)',
    icon: 'pokéball',
    products: [
      // Boosters - vrais noms de séries
      { id: 'pok-b-1', name: 'Scarlet & Violet ex', category: 'Boosters' },
      { id: 'pok-b-2', name: 'Scarlet & Violet', category: 'Boosters' },
      { id: 'pok-b-3', name: 'Sword & Shield ex', category: 'Boosters' },
      { id: 'pok-b-4', name: 'Sword & Shield', category: 'Boosters' },
      { id: 'pok-b-5', name: 'Rebel Clash', category: 'Boosters' },
      { id: 'pok-b-6', name: 'Sun & Moon', category: 'Boosters' },
      { id: 'pok-b-7', name: 'Hidden Fates', category: 'Boosters' },
      { id: 'pok-b-8', name: 'Evolutions', category: 'Boosters' },
      
      // Pack / Coffrets
      { id: 'pok-p-1', name: 'Coffret Pikachu ex', category: 'Pack / Coffrets' },
      { id: 'pok-p-2', name: 'Coffret Charizard ex', category: 'Pack / Coffrets' },
      { id: 'pok-p-3', name: 'Coffret Collection Mewtwo', category: 'Pack / Coffrets' },
      { id: 'pok-p-4', name: 'Coffret Premium Blastoise', category: 'Pack / Coffrets' },
      { id: 'pok-p-5', name: 'Mega Evolution Box', category: 'Pack / Coffrets' },
      
      // Cartes à l'unité
      { id: 'pok-c-1', name: 'Pikachu Illustré', category: 'Cartes à l\'unité' },
      { id: 'pok-c-2', name: 'Charizard ex', category: 'Cartes à l\'unité' },
      { id: 'pok-c-3', name: 'Mewtwo ex Prismatique', category: 'Cartes à l\'unité' },
      { id: 'pok-c-4', name: 'Blastoise Gold Secret', category: 'Cartes à l\'unité' },
      { id: 'pok-c-5', name: 'Dragonite Rainbow Rare', category: 'Cartes à l\'unité' },
      
      // Decks préconstruits
      { id: 'pok-d-1', name: 'Deck Pikachu', category: 'Decks préconstruits' },
      { id: 'pok-d-2', name: 'Deck Électrique', category: 'Decks préconstruits' },
      { id: 'pok-d-3', name: 'Deck Feu Dragon', category: 'Decks préconstruits' },
      { id: 'pok-d-4', name: 'Deck Eau Blastoise', category: 'Decks préconstruits' },
    ],
  },
  {
    id: 'magic',
    name: 'Magic: The Gathering',
    bgColor: 'rgb(60, 80, 120)',
    accentColor: 'rgb(150, 100, 200)',
    icon: 'mana',
    products: [
      { id: 'mag-b-1', name: 'Wilds of Eldraine', category: 'Boosters' },
      { id: 'mag-b-2', name: 'The Lost Caverns', category: 'Boosters' },
      { id: 'mag-b-3', name: 'March of the Machine', category: 'Boosters' },
      { id: 'mag-p-1', name: 'Coffret Planeswalker', category: 'Pack / Coffrets' },
      { id: 'mag-c-1', name: 'Carte rare Black Lotus', category: 'Cartes à l\'unité' },
      { id: 'mag-d-1', name: 'Deck Bleu/Blanc', category: 'Decks préconstruits' },
    ],
  },
  {
    id: 'onepiece',
    name: 'One Piece',
    bgColor: 'rgb(11, 60, 93)',
    accentColor: 'rgb(38, 198, 218)',
    icon: 'anchor',
    products: [
      { id: 'op-b-1', name: 'Marineford Era', category: 'Boosters' },
      { id: 'op-b-2', name: 'Grand Line', category: 'Boosters' },
      { id: 'op-p-1', name: 'Coffret Luffy', category: 'Pack / Coffrets' },
      { id: 'op-c-1', name: 'Luffy Gear 5', category: 'Cartes à l\'unité' },
      { id: 'op-d-1', name: 'Deck Pirate', category: 'Decks préconstruits' },
    ],
  },
  {
    id: 'lorcana',
    name: 'Lorcana',
    bgColor: 'rgb(40, 80, 100)',
    accentColor: 'rgb(100, 200, 255)',
    icon: 'sparkles',
    products: [
      { id: 'lor-b-1', name: 'Enchantment Era', category: 'Boosters' },
      { id: 'lor-b-2', name: 'Mythology', category: 'Boosters' },
      { id: 'lor-p-1', name: 'Coffret Ariel', category: 'Pack / Coffrets' },
      { id: 'lor-c-1', name: 'Ariel Illustrée', category: 'Cartes à l\'unité' },
      { id: 'lor-d-1', name: 'Deck Magie Bleue', category: 'Decks préconstruits' },
    ],
  },
  {
    id: 'dragonball',
    name: 'Dragon Ball',
    bgColor: 'rgb(11, 60, 93)',
    accentColor: 'rgb(0, 188, 212)',
    icon: 'zap',
    products: [
      { id: 'db-b-1', name: 'Super Card Game', category: 'Boosters' },
      { id: 'db-b-2', name: 'Fusion World', category: 'Boosters' },
      { id: 'db-p-1', name: 'Coffret Goku', category: 'Pack / Coffrets' },
      { id: 'db-c-1', name: 'Goku Ultra Instinct', category: 'Cartes à l\'unité' },
      { id: 'db-d-1', name: 'Deck Saiyan', category: 'Decks préconstruits' },
    ],
  },
  {
    id: 'league',
    name: 'League of Legends',
    bgColor: 'rgb(20, 50, 80)',
    accentColor: 'rgb(200, 150, 100)',
    icon: 'sword',
    products: [
      { id: 'lol-b-1', name: 'Runeterra 2', category: 'Boosters' },
      { id: 'lol-b-2', name: 'Runeterra', category: 'Boosters' },
      { id: 'lol-p-1', name: 'Coffret Ahri', category: 'Pack / Coffrets' },
      { id: 'lol-c-1', name: 'Ahri K/DA', category: 'Cartes à l\'unité' },
      { id: 'lol-d-1', name: 'Deck Noxus', category: 'Decks préconstruits' },
    ],
  },
];

export const getThemeById = (id: string): ThemeConfig | undefined => {
  return themes.find(t => t.id === id);
};

export const getProductsByCategory = (themeId: string, category: string) => {
  const theme = getThemeById(themeId);
  if (!theme) return [];
  
  return theme.products.filter(p => p.category === category);
};

export const getCategoriesByTheme = (themeId: string) => {
  const theme = getThemeById(themeId);
  if (!theme) return [];
  
  const cats = new Set(theme.products.map(p => p.category));
  return Array.from(cats);
};
