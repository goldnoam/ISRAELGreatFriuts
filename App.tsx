import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import FruitCard from './components/FruitCard';
import PrioritySection from './components/PrioritySection';
import { FRUITS } from './constants';

type SortOption = 'name-asc' | 'name-desc' | 'priority';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  
  // Default to dark theme as requested
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Google AdSense initialization safely
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense initialization skipped or failed:', e);
    }
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('name-asc');
    setShowOnlyNew(false);
  };

  const newItemsCount = useMemo(() => FRUITS.filter(f => f.isNew).length, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...FRUITS];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => {
        const name = item.name.toLowerCase();
        const scientific = item.scientificName.toLowerCase();
        const description = item.description.toLowerCase();
        const varieties = item.famousVarieties.join(' ').toLowerCase();
        return name.includes(term) || 
               scientific.includes(term) ||
               varieties.includes(term) ||
               description.includes(term);
      });
      
      result.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === term) return -1;
        if (bName === term) return 1;
        return aName.localeCompare(bName, 'he');
      });
    }

    if (showOnlyNew) {
      result = result.filter(item => item.isNew);
    }

    if (!searchTerm.trim()) {
      result.sort((a, b) => {
        if (sortOption === 'name-asc') {
          return a.name.localeCompare(b.name, 'he');
        } else if (sortOption === 'name-desc') {
          return b.name.localeCompare(a.name, 'he');
        } else if (sortOption === 'priority') {
          const aOrder = a.priorityOrder || 999;
          const bOrder = b.priorityOrder || 999;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return a.name.localeCompare(b.name, 'he');
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortOption, showOnlyNew]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfb] dark:bg-gray-950 transition-colors duration-300" dir="rtl">
      <Header />
      
      {/* Theme Switcher Button */}
      <div className="fixed top-4 left-4 z-[60]">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all text-xl"
          aria-label={isDarkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
          title={isDarkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <PrioritySection />

      <main className="flex-grow">
        <section className="py-12 px-4 md:px-6 container mx-auto">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">קטלוג פירות וירקות הארץ</h2>
              <div className="flex gap-2">
                {newItemsCount > 0 && (
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-full shadow-lg animate-pulse">
                    {newItemsCount} חדשים ✨
                  </span>
                )}
                <button 
                  onClick={resetFilters}
                  className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-black px-4 py-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  אפס חיפוש 🔄
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 max-w-5xl mx-auto bg-white dark:bg-gray-900 p-5 md:p-8 rounded-[2.5rem] border border-green-50 dark:border-gray-800 shadow-2xl">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="חפשו פרי או זן (תמר, בננה, תפוח)..."
                    className="w-full pr-12 pl-12 py-4 rounded-3xl border-2 border-green-50 dark:border-gray-800 focus:border-green-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-xl bg-gray-50/50 dark:bg-gray-800/50 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-5 flex items-center text-green-600 dark:text-green-400 pointer-events-none">
                    🔍
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <select 
                    className="appearance-none px-6 py-4 rounded-3xl border-2 border-green-50 dark:border-gray-800 focus:border-green-500 outline-none bg-gray-50/50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold cursor-pointer"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                  >
                    <option value="name-asc">א-ב עולה</option>
                    <option value="name-desc">א-ב יורד</option>
                    <option value="priority">סדר מסורתי</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedItems.map((item) => (
                <FruitCard key={item.id} fruit={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800 max-w-3xl mx-auto">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">לא מצאנו פרי בשם "{searchTerm}"</h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-8 py-3 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition-all"
              >
                חזרה לכל הקטלוג
              </button>
            </div>
          )}
        </section>

        {/* AdSense Placement */}
        <div className="container mx-auto px-6 py-8 flex justify-center min-h-[100px]">
            <ins className="adsbygoogle"
                 style={{ display: 'block', minWidth: '300px', minHeight: '100px' }}
                 data-ad-client="ca-pub-2103405502519017"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
      </main>

      <footer className="bg-gray-950 text-gray-500 py-16 px-6 text-center text-sm border-t border-gray-900">
        <div className="container mx-auto">
          <p className="text-gray-400 font-bold mb-4">(C) Noam Gold AI 2026</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 text-xs uppercase tracking-widest">Send Feedback</p>
            <a href="mailto:goldnoamai@gmail.com" className="text-green-500 hover:text-green-400 font-bold transition-colors text-lg">goldnoamai@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;