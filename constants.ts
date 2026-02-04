
import { Fruit, FruitGroup, BlessingType, Language } from './types';

export const FRUITS: Fruit[] = [
  {
    id: 'wheat',
    name: { he: 'חיטה', en: 'Wheat', zh: '小麦', hi: 'गेहूं', de: 'Weizen', es: 'Trigo', fr: 'Blé' },
    scientificName: 'Triticum',
    group: FruitGroup.SevenSpecies,
    blessing: BlessingType.Mezonot,
    canEatRaw: false,
    hasPit: false,
    pitDescription: { he: 'ללא גלעין', en: 'Seedless', zh: '无籽', hi: 'बीज रहित', de: 'Kernlos', es: 'Sin semillas', fr: 'Sans pépins' },
    hasPeel: true,
    peelEdible: false,
    priorityOrder: 1,
    description: { 
      he: 'הראשונה בשבעת המינים. הבסיס ללחם ומסמלת שובע.', 
      en: 'The first of the Seven Species. The base for bread and a symbol of abundance.',
      zh: '七大物种之首。面包的基础，富足的象征。',
      hi: 'सात प्रजातियों में से पहली। रोटी का आधार और प्रचुरता का प्रतीक।',
      de: 'Die erste der sieben Arten. Die Basis für Brot und ein Symbol des Überflusses.',
      es: 'La primera de las Siete Especies. La base del pan y símbolo de abundancia.',
      fr: 'La première des Sept Espèces. La base du pain et symbole d\'abondance.'
    },
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200',
    varietiesCount: 20,
    famousVarieties: [{ he: 'גליל', en: 'Galil', zh: '加利利', hi: 'गालील', de: 'Galil', es: 'Galil', fr: 'Galil' }],
    seasonality: { he: 'חורף-אביב', en: 'Winter-Spring', zh: '冬春', hi: 'शीत-वसंत', de: 'Winter-Frühling', es: 'Invierno-Primavera', fr: 'Hiver-Printemps' }
  },
  {
    id: 'olive',
    name: { he: 'זית', en: 'Olive', zh: '橄榄', hi: 'जैतून', de: 'Olive', es: 'Oliva', fr: 'Olive' },
    scientificName: 'Olea europaea',
    group: FruitGroup.SevenSpecies,
    blessing: BlessingType.Etz,
    canEatRaw: false,
    hasPit: true,
    pitDescription: { he: 'גלעין קשיח יחיד', en: 'Single hard pit', zh: '单核', hi: 'एक कठोर गुठली', de: 'Einzelner harter Kern', es: 'Hueso duro único', fr: 'Noyau dur unique' },
    hasPeel: true,
    peelEdible: true,
    priorityOrder: 3,
    description: { 
      he: 'סמל השלום וארץ ישראל. משמש להפקת שמן זית משובח.', 
      en: 'Symbol of peace and Israel. Used for producing fine olive oil.',
      zh: '和平与以色列的象征。用于生产优质橄榄油。',
      hi: 'शांति और इज़राइल का प्रतीक। बढ़िया जैतून का तेल बनाने के लिए उपयोग किया जाता है।',
      de: 'Symbol für Frieden und Israel. Wird zur Herstellung von feinem Olivenöl verwendet.',
      es: 'Símbolo de paz e Israel. Utilizado para producir aceite de oliva fino.',
      fr: 'Symbole de paix et d\'Israël. Utilisé pour produire une huile d\'olive fine.'
    },
    image: 'https://images.unsplash.com/photo-1541530531070-449e7939103c?q=80&w=1200',
    varietiesCount: 10,
    famousVarieties: [{ he: 'ברנע', en: 'Barnea', zh: '巴尼亚', hi: 'बरनिया', de: 'Barnea', es: 'Barnea', fr: 'Barnea' }],
    seasonality: { he: 'סתיו', en: 'Autumn', zh: '秋季', hi: 'शरद ऋतु', de: 'Herbst', es: 'Otoño', fr: 'Automne' }
  },
  {
    id: 'date',
    name: { he: 'תמר', en: 'Date', zh: '椰枣', hi: 'खजूर', de: 'Dattel', es: 'Dátil', fr: 'Datte' },
    scientificName: 'Phoenix dactylifera',
    group: FruitGroup.SevenSpecies,
    blessing: BlessingType.Etz,
    canEatRaw: true,
    hasPit: true,
    pitDescription: { he: 'גלעין מוארך', en: 'Elongated pit', zh: '长核', hi: 'लंबी गुठली', de: 'Länglicher Kern', es: 'Hueso alargado', fr: 'Noyau allongé' },
    hasPeel: true,
    peelEdible: true,
    priorityOrder: 4,
    description: { 
      he: 'הדבש של ארץ ישראל. המג׳הול הישראלי נחשב למלך התמרים.', 
      en: 'The honey of Israel. The Israeli Medjool is considered the king of dates.',
      zh: '以色列的蜂蜜。以色列麦朱尔椰枣被誉为椰枣之王。',
      hi: 'इज़राइल का शहद। इज़राइली मेडजूल को खजूर का राजा माना जाता है।',
      de: 'Der Honig Israels. Die israelische Medjool gilt als die Königin der Datteln.',
      es: 'La miel de Israel. El Medjool israelí es considerado el rey de los dátiles.',
      fr: 'Le miel d\'Israël. Le Medjool israélien est considéré comme le roi des dattes.'
    },
    image: 'https://images.unsplash.com/photo-1571221715431-7b567a14e101?q=80&w=1200',
    varietiesCount: 9,
    famousVarieties: [{ he: 'מג׳הול', en: 'Medjool', zh: '麦朱尔', hi: 'मेडजूल', de: 'Medjool', es: 'Medjool', fr: 'Medjool' }],
    seasonality: { he: 'סתיו', en: 'Autumn', zh: '秋季', hi: 'शरद ऋतु', de: 'Herbst', es: 'Otoño', fr: 'Automne' }
  }
];

export const UI_STRINGS: Record<Language, any> = {
  he: {
    title: 'פירות וירקות ארץ ישראל',
    search: 'חפשו פרי...',
    clear: 'נקה',
    export: 'ייצוא',
    language: 'שפה',
    fontSize: 'גודל גופן',
    raw: 'ניתן לאכול טרי',
    cooked: 'דורש בישול',
    pit: 'גלעין/זרעים',
    peel: 'קליפה',
    read: 'הקרא',
    shivatHaminim: 'שבעת המינים'
  },
  en: {
    title: 'Fruits & Vegetables of Israel',
    search: 'Search fruit...',
    clear: 'Clear',
    export: 'Export',
    language: 'Language',
    fontSize: 'Font Size',
    raw: 'Can eat raw',
    cooked: 'Requires cooking',
    pit: 'Pit/Seeds',
    peel: 'Peel',
    read: 'Read Aloud',
    shivatHaminim: 'Seven Species'
  },
  zh: {
    title: '以色列的水果和蔬菜',
    search: '搜索水果...',
    clear: '清除',
    export: '导出',
    language: '语言',
    fontSize: '字体大小',
    raw: '可生吃',
    cooked: '需要烹饪',
    pit: '核/籽',
    peel: '皮',
    read: '朗读',
    shivatHaminim: '七大物种'
  },
  hi: {
    title: 'इज़राइल के फल और सब्जियां',
    search: 'फल खोजें...',
    clear: 'साफ़ करें',
    export: 'निर्यात',
    language: 'भाषा',
    fontSize: 'फ़ॉन्ट आकार',
    raw: 'कच्चा खाया जा सकता है',
    cooked: 'पकाने की आवश्यकता है',
    pit: 'गुठली/बीज',
    peel: 'छिलका',
    read: 'ज़ोर से पढ़ें',
    shivatHaminim: 'सात प्रजातियां'
  },
  de: {
    title: 'Früchte & Gemüse aus Israel',
    search: 'Frucht suchen...',
    clear: 'Löschen',
    export: 'Exportieren',
    language: 'Sprache',
    fontSize: 'Schriftgröße',
    raw: 'Roh verzehrbar',
    cooked: 'Muss gekocht werden',
    pit: 'Kern/Samen',
    peel: 'Schale',
    read: 'Vorlesen',
    shivatHaminim: 'Sieben Arten'
  },
  es: {
    title: 'Frutas y Verduras de Israel',
    search: 'Buscar fruta...',
    clear: 'Limpiar',
    export: 'Exportar',
    language: 'Idioma',
    fontSize: 'Tamaño de fuente',
    raw: 'Se puede comer crudo',
    cooked: 'Requiere cocción',
    pit: 'Hueso/Semillas',
    peel: 'Piel',
    read: 'Leer en voz alta',
    shivatHaminim: 'Siete Especies'
  },
  fr: {
    title: 'Fruits & Légumes d\'Israël',
    search: 'Chercher un fruit...',
    clear: 'Effacer',
    export: 'Exporter',
    language: 'Langue',
    fontSize: 'Taille de police',
    raw: 'Peut être mangé cru',
    cooked: 'Nécessite une cuisson',
    pit: 'Noyau/Pépins',
    peel: 'Peau',
    read: 'Lire à haute voix',
    shivatHaminim: 'Sept Espèces'
  }
};

export const PRIORITY_VERSE = 'אֶרֶץ חִטָּה וּשְׂעֹרָה וְגֶפֶן וּתְאֵנָה וְרִמּוֹן אֶרֶץ זֵית שֶׁמֶן וּדְבָשׁ';
