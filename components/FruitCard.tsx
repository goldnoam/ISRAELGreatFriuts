
import React, { useState, useEffect } from 'react';
import { Fruit, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface FruitCardProps {
  fruit: Fruit;
  lang: Language;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit, lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = UI_STRINGS[lang];

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fruit.description[lang]);
    
    // Attempt to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const langMap: Record<string, string> = {
      he: 'he-IL', en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', de: 'de-DE', es: 'es-ES', fr: 'fr-FR'
    };
    utterance.lang = langMap[lang] || 'en-US';
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col h-full group overflow-hidden focus-within:ring-4 focus-within:ring-green-500/20"
      aria-labelledby={`fruit-title-${fruit.id}`}
    >
      <div 
        className="h-56 relative overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img 
          src={fruit.image} 
          alt={fruit.name[lang]} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
          loading="lazy" 
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <button 
            onClick={handleSpeak}
            className={`p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 flex items-center justify-center ${isSpeaking ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-green-600 dark:text-green-400'}`}
            title={isSpeaking ? 'Stop Reading' : t.read}
            aria-label={isSpeaking ? 'Stop Reading' : t.read}
          >
            {isSpeaking ? '⏹️' : '🔊'}
          </button>
        </div>
        {fruit.isNew && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase rounded-full shadow-lg">
            New
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 id={`fruit-title-${fruit.id}`} className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {fruit.name[lang]}
          </h3>
          <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest">{fruit.scientificName}</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3 leading-relaxed">
          {fruit.description[lang]}
        </p>

        <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-gray-700 text-xs font-bold">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full shadow-sm ${fruit.canEatRaw ? 'bg-green-500' : 'bg-orange-500'}`}></span>
            <span className="text-gray-500 dark:text-gray-400">{fruit.canEatRaw ? t.raw : t.cooked}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase tracking-tighter">{t.pit}:</span>
            <span className="dark:text-gray-200">{fruit.pitDescription[lang]}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 uppercase tracking-tighter">Seasonality:</span>
            <span className="dark:text-gray-200">{fruit.seasonality[lang]}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] max-w-3xl w-full overflow-hidden shadow-2xl animate-fadeInUp border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-80">
              <img src={fruit.image} alt={fruit.name[lang]} className="w-full h-full object-cover" />
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center text-2xl transition-all active:scale-90"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-black dark:text-white">{fruit.name[lang]}</h2>
                <p className="text-sm text-gray-400 font-mono">{fruit.scientificName}</p>
              </div>
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                {fruit.description[lang]}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { label: 'Varieties', val: fruit.varietiesCount },
                   { label: 'Group', val: fruit.group },
                   { label: 'Season', val: fruit.seasonality[lang] },
                   { label: 'Peel', val: fruit.peelEdible ? 'Edible' : 'Inedible' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-3xl border border-gray-100 dark:border-gray-600/30">
                     <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                     <p className="font-black text-green-700 dark:text-green-400 truncate">{stat.val}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default FruitCard;
