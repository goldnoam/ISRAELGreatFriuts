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
        const aExact = aName === term ? 1 : 0;
        const bExact = bName === term ? 1 : 0;
        if (aExact !== bExact) return bExact - aExact;
        const aStarts = aName.startsWith(term) ? 1 : 0;
        const bStarts = bName.startsWith(term) ? 1 : 0;
        if (aStarts !== bStarts) return bStarts - aStarts;
        return 0;
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
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all text-xl"
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">קטלוג פירות וירקות הארץ</h2>
              {newItemsCount > 0 && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-yellow-200 animate-pulse">
                  {newItemsCount} חדשים ✨
                </span>
              )}
            </div>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              חפשו כל פרי או ירק לקבלת מידע בוטני, זנים פופולריים וטיפים לאכילה נכונה.
            </p>

            <div className="flex flex-col gap-5 max-w-5xl mx-auto bg-white dark:bg-gray-900 p-5 md:p-8 rounded-[2.5rem] border border-green-50 dark:border-gray-800 shadow-2xl shadow-green-900/5">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 right-5 flex items-center text-green-600 dark:text-green-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  
                  <input
                    type="text"
                    placeholder="חפשו פרי או זן (תמר, מג'הול, בננה, תפוח)..."
                    className="w-full pr-14 pl-14 py-4 rounded-3xl border-2 border-green-50 dark:border-gray-800 focus:border-green-500 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-xl bg-gray-50/50 dark:bg-gray-800/50 placeholder:text-gray-400 font-medium dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 left-5 flex items-center text-gray-300 hover:text-red-500 transition-colors focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <select 
                      className="w-full appearance-none px-6 pr-6 pl-12 py-4 rounded-3xl border-2 border-green-50 dark:border-gray-800 focus:border-green-500 outline-none bg-gray-50/50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold cursor-pointer transition-colors"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                    >
                      <option value="name-asc">א-ב עולה</option>
                      <option value="name-desc">א-ב יורד</option>
                      <option value="priority">סדר מסורתי</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowOnlyNew(!showOnlyNew)}
                    className={`px-8 py-4 rounded-3xl font-black text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                      showOnlyNew 
                        ? 'bg-yellow-400 text-yellow-900 shadow-xl shadow-yellow-200 ring-2 ring-yellow-500' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-yellow-50 hover:text-yellow-600'
                    }`}
                  >
                    רק חדשים
                  </button>
                </div>
              </div>
            </div>
          </div>

          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {filteredAndSortedItems.map((item) => (
                <FruitCard key={item.id} fruit={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-green-100 dark:border-gray-800 max-w-3xl mx-auto">
              <div className="text-8xl mb-6 grayscale opacity-20">🍃</div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">לא מצאנו פרי בשם "{searchTerm}"</h3>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-10 py-4 bg-green-700 text-white rounded-full font-black hover:bg-green-800 transition-all"
              >
                חזרה לכל הקטלוג
              </button>
            </div>
          )}
        </section>

        {/* AdSense Placeholder Area */}
        <div className="container mx-auto px-6 py-8 flex justify-center">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-2103405502519017"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>

        <section className="bg-[#1a2f1a] text-white py-24 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <h2 className="text-5xl font-black mb-8 leading-tight">"כִּי הָאָדָם עֵץ הַשָּׂדֶה"</h2>
            <p className="text-xl md:text-3xl font-light leading-relaxed mb-14 text-green-100/80">
              הצטרפו אלינו לחגיגת הצמיחה של ארץ ישראל.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-500 py-16 px-6 text-center text-sm border-t border-gray-800">
        <div className="container mx-auto">
          <div className="mb-10 flex justify-center gap-8 grayscale opacity-30">
             <span className="text-4xl">🌿</span>
             <span className="text-4xl">🌾</span>
             <span className="text-4xl">🌳</span>
          </div>
          <p className="mb-3 font-black text-gray-400 uppercase tracking-[0.2em] text-xs">טו בשבט בארץ זבת חלב ודבש</p>
          <p className="text-gray-400 font-bold mb-4">(C) Noam Gold AI 2026</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500">Send Feedback</p>
            <a href="mailto:goldnoamai@gmail.com" className="text-green-500 hover:text-green-400 font-bold transition-colors text-base">goldnoamai@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;