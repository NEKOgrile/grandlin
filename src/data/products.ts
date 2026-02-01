export interface Product {
  id: string;
  name: string;
  category: 'Boosters' | 'Pack / Coffrets' | 'Cartes à l\'unité' | 'Decks préconstruits';
  set?: string;
}

export interface BoosterSet {
  id: string;
  name: string;
  code: string;
  products: Product[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgColor: string;
  accentColor: string;
  icon: string;
  products: Product[];
  boosterSets?: BoosterSet[];
}

export const themes: ThemeConfig[] = [
  /* =======================
      POKÉMON
  ======================= */
  {
  id: 'pokemon',
  name: 'Pokémon',
  bgColor: 'rgb(50, 110, 140)',
  accentColor: 'rgb(255, 200, 0)',
  icon: 'pokéball',

  boosterSets: [
    /* ======================
        MÉGA-ÉVOLUTION
    ====================== */
    {
      id: 'pok-era-mega',
      name: 'Méga-Évolution',
      code: 'MEGA',
      products: [
        { id: 'pok-mega-1', name: 'XY – Évolution', category: 'Boosters', set: 'MEGA' },
        { id: 'pok-mega-2', name: 'XY – Poings Furieux', category: 'Boosters', set: 'MEGA' },
        { id: 'pok-mega-3', name: 'XY – Vigueur Spectrale', category: 'Boosters', set: 'MEGA' },
        { id: 'pok-mega-4', name: 'XY – Impact des Destins', category: 'Boosters', set: 'MEGA' },
      ],
    },

    /* ======================
        ÉCARLATE & VIOLET
    ====================== */
    {
      id: 'pok-era-sv',
      name: 'Écarlate & Violet',
      code: 'SV',
      products: [
        { id: 'pok-sv-1', name: 'Écarlate & Violet', category: 'Boosters', set: 'SV' },
        { id: 'pok-sv-2', name: 'Évolutions à Paldea', category: 'Boosters', set: 'SV' },
        { id: 'pok-sv-3', name: 'Flammes Obsidiennes', category: 'Boosters', set: 'SV' },
        { id: 'pok-sv-4', name: 'Forces Temporelles', category: 'Boosters', set: 'SV' },
        { id: 'pok-sv-5', name: 'Mascarade Crépusculaire', category: 'Boosters', set: 'SV' },
      ],
    },

    /* ======================
        ÉPÉE & BOUCLIER
    ====================== */
    {
      id: 'pok-era-swsh',
      name: 'Épée & Bouclier',
      code: 'SWSH',
      products: [
        { id: 'pok-swsh-1', name: 'Épée & Bouclier', category: 'Boosters', set: 'SWSH' },
        { id: 'pok-swsh-2', name: 'Voltage Éclatant', category: 'Boosters', set: 'SWSH' },
        { id: 'pok-swsh-3', name: 'Styles de Combat', category: 'Boosters', set: 'SWSH' },
        { id: 'pok-swsh-4', name: 'Règne de Glace', category: 'Boosters', set: 'SWSH' },
        { id: 'pok-swsh-5', name: 'Évolution Céleste', category: 'Boosters', set: 'SWSH' },
      ],
    },

    /* ======================
        SOLEIL & LUNE
    ====================== */
    {
      id: 'pok-era-sm',
      name: 'Soleil & Lune',
      code: 'SM',
      products: [
        { id: 'pok-sm-1', name: 'Soleil & Lune', category: 'Boosters', set: 'SM' },
        { id: 'pok-sm-2', name: 'Gardiens Ascendants', category: 'Boosters', set: 'SM' },
        { id: 'pok-sm-3', name: 'Ombres Ardentes', category: 'Boosters', set: 'SM' },
        { id: 'pok-sm-4', name: 'Ultra-Prisme', category: 'Boosters', set: 'SM' },
      ],
    },

    /* ======================
        XY
    ====================== */
    {
      id: 'pok-era-xy',
      name: 'XY',
      code: 'XY',
      products: [
        { id: 'pok-xy-1', name: 'XY', category: 'Boosters', set: 'XY' },
        { id: 'pok-xy-2', name: 'Étincelles', category: 'Boosters', set: 'XY' },
        { id: 'pok-xy-3', name: 'Rupture Turbo', category: 'Boosters', set: 'XY' },
      ],
    },

    /* ======================
        NOIR & BLANC
    ====================== */
    {
      id: 'pok-era-bw',
      name: 'Noir & Blanc',
      code: 'BW',
      products: [
        { id: 'pok-bw-1', name: 'Noir & Blanc', category: 'Boosters', set: 'BW' },
        { id: 'pok-bw-2', name: 'Puissances Émergentes', category: 'Boosters', set: 'BW' },
        { id: 'pok-bw-3', name: 'Tempête Plasma', category: 'Boosters', set: 'BW' },
      ],
    },

    /* ======================
        PROMOS
    ====================== */
    {
      id: 'pok-era-promo',
      name: 'Promotions',
      code: 'PROMO',
      products: [
        { id: 'pok-pro-1', name: 'Promo Ligue Pokémon', category: 'Boosters', set: 'PROMO' },
        { id: 'pok-pro-2', name: 'Promo Coffret Spécial', category: 'Boosters', set: 'PROMO' },
      ],
    },
  ],

  products: [
      // Coffrets
      { id: 'pok-pack-1', name: 'Coffret Pikachu ex', category: 'Pack / Coffrets' },
      { id: 'pok-pack-2', name: 'Coffret Charizard ex', category: 'Pack / Coffrets' },
      { id: 'pok-pack-3', name: 'Coffret Premium Blastoise', category: 'Pack / Coffrets' },

      // Cartes à l'unité
      { id: 'pok-card-1', name: 'Charizard ex', category: 'Cartes à l\'unité' },
      { id: 'pok-card-2', name: 'Mewtwo ex Full Art', category: 'Cartes à l\'unité' },
      { id: 'pok-card-3', name: 'Dragonite Rainbow Rare', category: 'Cartes à l\'unité' },

      // Decks
      { id: 'pok-deck-1', name: 'Deck Pikachu', category: 'Decks préconstruits' },
      { id: 'pok-deck-2', name: 'Deck Feu Dragon', category: 'Decks préconstruits' },
    ],
  },

  /* =======================
      ONE PIECE
  ======================= */
  {
    id: 'onepiece',
    name: 'One Piece',
    bgColor: 'rgb(11, 60, 93)',
    accentColor: 'rgb(38, 198, 218)',
    icon: 'anchor',

    boosterSets: [
      {
        id: 'op-set-op01',
        name: 'Romance Dawn',
        code: 'OP01',
        products: [
          { id: 'op-op01-b1', name: 'Booster Romance Dawn', category: 'Boosters', set: 'OP01' },
        ],
      },
      {
        id: 'op-set-op02',
        name: 'Paramount War',
        code: 'OP02',
        products: [
          { id: 'op-op02-b1', name: 'Booster Paramount War', category: 'Boosters', set: 'OP02' },
        ],
      },
      {
        id: 'op-set-op05',
        name: 'Awakening of the New Era',
        code: 'OP05',
        products: [
          { id: 'op-op05-b1', name: 'Booster Awakening of the New Era', category: 'Boosters', set: 'OP05' },
        ],
      },
    ],

    products: [
      { id: 'op-pack-1', name: 'Coffret Luffy', category: 'Pack / Coffrets' },
      { id: 'op-pack-2', name: 'Coffret Law', category: 'Pack / Coffrets' },

      { id: 'op-card-1', name: 'Monkey D. Luffy Gear 5', category: 'Cartes à l\'unité' },
      { id: 'op-card-2', name: 'Trafalgar Law Alt Art', category: 'Cartes à l\'unité' },

      { id: 'op-deck-1', name: 'Deck Pirate Rouge', category: 'Decks préconstruits' },
      { id: 'op-deck-2', name: 'Deck Marine', category: 'Decks préconstruits' },
    ],
  },

  /* =======================
      MAGIC
  ======================= */
  {
    id: 'magic',
    name: 'Magic: The Gathering',
    bgColor: 'rgb(60, 80, 120)',
    accentColor: 'rgb(150, 100, 200)',
    icon: 'mana',

    boosterSets: [
      {
        id: 'mtg-set-eld',
        name: 'Wilds of Eldraine',
        code: 'WOE',
        products: [
          { id: 'mtg-woe-b1', name: 'Booster Wilds of Eldraine', category: 'Boosters', set: 'WOE' },
        ],
      },
      {
        id: 'mtg-set-mom',
        name: 'March of the Machine',
        code: 'MOM',
        products: [
          { id: 'mtg-mom-b1', name: 'Booster March of the Machine', category: 'Boosters', set: 'MOM' },
        ],
      },
    ],

    products: [
      { id: 'mtg-pack-1', name: 'Coffret Planeswalker', category: 'Pack / Coffrets' },
      { id: 'mtg-card-1', name: 'Black Lotus', category: 'Cartes à l\'unité' },
      { id: 'mtg-deck-1', name: 'Deck Azorius Control', category: 'Decks préconstruits' },
    ],
  },

  /* =======================
      DRAGON BALL
  ======================= */
  {
    id: 'dragonball',
    name: 'Dragon Ball',
    bgColor: 'rgb(11, 60, 93)',
    accentColor: 'rgb(0, 188, 212)',
    icon: 'zap',

    products: [
      { id: 'db-pack-1', name: 'Coffret Goku', category: 'Pack / Coffrets' },
      { id: 'db-card-1', name: 'Goku Ultra Instinct', category: 'Cartes à l\'unité' },
      { id: 'db-deck-1', name: 'Deck Saiyan', category: 'Decks préconstruits' },
    ],
  },

  /* =======================
      LORCANA
  ======================= */
  {
    id: 'lorcana',
    name: 'Lorcana',
    bgColor: 'rgb(40, 80, 100)',
    accentColor: 'rgb(100, 200, 255)',
    icon: 'sparkles',

    products: [
      { id: 'lor-pack-1', name: 'Coffret Ariel', category: 'Pack / Coffrets' },
      { id: 'lor-card-1', name: 'Ariel Illustrée', category: 'Cartes à l\'unité' },
      { id: 'lor-deck-1', name: 'Deck Magie Bleue', category: 'Decks préconstruits' },
    ],
  },

  /* =======================
      LEAGUE OF LEGENDS
  ======================= */
  {
    id: 'league',
    name: 'League of Legends',
    bgColor: 'rgb(20, 50, 80)',
    accentColor: 'rgb(200, 150, 100)',
    icon: 'sword',

    products: [
      { id: 'lol-pack-1', name: 'Coffret Ahri', category: 'Pack / Coffrets' },
      { id: 'lol-card-1', name: 'Ahri K/DA', category: 'Cartes à l\'unité' },
      { id: 'lol-deck-1', name: 'Deck Noxus', category: 'Decks préconstruits' },
    ],
  },
];

export const getThemeById = (id: string): ThemeConfig | undefined => {
  return themes.find(t => t.id === id);
};

export const getProductsByCategory = (themeId: string, category: string): Product[] => {
  const theme = getThemeById(themeId);
  if (!theme) return [];
  return theme.products.filter(p => p.category === category);
};

export const getCategoriesByTheme = (themeId: string): string[] => {
  const theme = getThemeById(themeId);
  if (!theme) return [];
  const categories = new Set(theme.products.map(p => p.category));
  return Array.from(categories);
};
