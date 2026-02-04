
import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import FruitCard from './components/FruitCard';
import PrioritySection from './components/PrioritySection';
import { FRUITS, UI_STRINGS } from './constants';
import { Language, FontSize } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('he');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const t = UI_STRINGS[lang];
  const isRtl = lang === 'he';

  // Apply theme and direction on mount and change
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isDarkMode, isRtl, lang]);

  const filteredItems = useMemo(() => {
    let result = [...FRUITS];
    const term = searchTerm.toLowerCase().trim();

    if (term) {
      result = result.filter(item => 
        item.name[lang].toLowerCase().includes(term) ||
        item.scientificName.toLowerCase().includes(term) ||
        item.description[lang].toLowerCase().includes(term)
      );
    }
    return result;
  }, [searchTerm, lang]);

  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    return FRUITS.filter(f => f.name[lang].toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map(f => f.name[lang]);
  }, [searchTerm, lang]);

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredItems, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `israel_fruits_${lang}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text");
    if (text) setSearchTerm(text);
  };

  const fontSizeClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-xl' : 'text-base';

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300 ${fontSizeClass}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Controls Panel */}
      <nav className="fixed top-4 left-4 right-4 z-[100] flex flex-wrap gap-2 pointer-events-none" aria-label="Quick controls">
        <div className="pointer-events-auto flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors focus:ring-2 focus:ring-green-500 outline-none"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-transparent border-none outline-none font-bold text-sm cursor-pointer dark:text-white focus:ring-2 focus:ring-green-500 rounded-lg p-1"
            aria-label="Change Language"
          >
            <option value="he">🇮🇱 עברית</option>
            <option value="en">🇺🇸 English</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="hi">🇮🇳 हिन्दी</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
          </select>

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

          <div className="flex gap-1" role="group" aria-label="Font size controls">
            {(['sm', 'base', 'lg'] as FontSize[]).map(size => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all focus:ring-2 focus:ring-green-500 outline-none ${fontSize === size ? 'bg-green-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'}`}
                aria-label={`Set font size to ${size}`}
              >
                {size === 'base' ? 'M' : size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <Header lang={lang} />
      <PrioritySection lang={lang} />

      <main className="flex-grow container mx-auto px-4 py-12" role="main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 transition-all">{t.title}</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative group">
              <div 
                className="flex items-center bg-white dark:bg-gray-900 p-2 rounded-[2rem] border-2 border-gray-100 dark:border-gray-800 shadow-xl focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10 transition-all"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="pl-4 pr-2 text-gray-400" aria-hidden="true">🔍</div>
                <input
                  type="text"
                  placeholder={t.search}
                  className="flex-grow py-3 bg-transparent outline-none dark:text-white font-medium"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors" 
                    aria-label={t.clear}
                  >
                    ✕
                  </button>
                )}
                <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button 
                  onClick={exportData} 
                  className="px-6 py-2.5 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 shadow-lg shadow-green-500/20 active:scale-95 transition-all" 
                  aria-label={t.export}
                >
                   {t.export}
                </button>
              </div>

              {/* Autocomplete suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden list-none">
                  {suggestions.map((s, i) => (
                    <li key={i}>
                      <button
                        onClick={() => {
                          setSearchTerm(s);
                          setShowSuggestions(false);
                        }}
                        className="w-full px-6 py-3 text-right rtl:text-right ltr:text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors border-b last:border-none border-gray-100 dark:border-gray-700 font-bold"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <FruitCard key={item.id} fruit={item} lang={lang} />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-gray-400">לא נמצאו תוצאות...</p>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 py-16 px-6 border-t border-gray-100 dark:border-gray-800" role="contentinfo">
        <div className="container mx-auto text-center space-y-4">
          <p className="font-black text-gray-900 dark:text-gray-200 text-xl">(C) Noam Gold AI 2026</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-widest font-bold opacity-60">Send Feedback</span>
            <a href="mailto:goldnoamai@gmail.com" className="text-green-600 dark:text-green-400 hover:underline font-black text-2xl transition-all hover:scale-105 inline-block">
              goldnoamai@gmail.com
            </a>
          </div>
          <p className="text-xs pt-8 opacity-50">Built for Tu BiShvat 2026 - Production Ready</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
