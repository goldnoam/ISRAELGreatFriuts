
export enum FruitGroup {
  SevenSpecies = 'SevenSpecies',
  Citrus = 'Citrus',
  StoneFruit = 'StoneFruit',
  Tropical = 'Tropical',
  Forest = 'Forest',
  Grains = 'Grains',
  Melons = 'Melons',
  Vegetables = 'Vegetables',
  ExoticVegetables = 'ExoticVegetables'
}

export enum BlessingType {
  Etz = 'Etz',
  Adama = 'Adama',
  Mezonot = 'Mezonot'
}

export interface LocalizedString {
  he: string;
  en: string;
  zh: string;
  hi: string;
  de: string;
  es: string;
  fr: string;
}

export interface Fruit {
  id: string;
  name: LocalizedString;
  scientificName: string;
  group: FruitGroup;
  blessing: BlessingType;
  canEatRaw: boolean;
  hasPit: boolean;
  pitDescription: LocalizedString;
  hasPeel: boolean;
  peelEdible: boolean;
  priorityOrder?: number;
  description: LocalizedString;
  image: string;
  isNew?: boolean;
  varietiesCount: number;
  famousVarieties: LocalizedString[];
  seasonality: LocalizedString;
}

export type Language = 'he' | 'en' | 'zh' | 'hi' | 'de' | 'es' | 'fr';
export type FontSize = 'sm' | 'base' | 'lg';
