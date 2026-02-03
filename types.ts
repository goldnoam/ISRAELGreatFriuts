
export enum FruitGroup {
  SevenSpecies = 'שבעת המינים',
  Citrus = 'הדרים',
  StoneFruit = 'פירות גלעין',
  Tropical = 'טרופי',
  Forest = 'פירות יער/גרגירים',
  Grains = 'דגנים',
  Melons = 'מִקְשָׁה (אבטיחים ודלועים)',
  Vegetables = 'ירקות',
  ExoticVegetables = 'ירקות חדשים/מיוחדים'
}

export enum BlessingType {
  Etz = 'בורא פרי העץ',
  Adama = 'בורא פרי האדמה',
  Mezonot = 'בורא מיני מזונות'
}

export interface Fruit {
  id: string;
  name: string;
  scientificName: string;
  group: FruitGroup;
  blessing: BlessingType;
  canEatRaw: boolean;
  hasPit: boolean;
  pitDescription: string;
  hasPeel: boolean;
  peelEdible: boolean;
  priorityOrder?: number; // For Shivat HaMinim
  description: string;
  image: string;
  isNew?: boolean;
  varietiesCount: number;
  famousVarieties: string[];
  seasonality: string;
}
