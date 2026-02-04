import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import FruitCard from './components/FruitCard';
import PrioritySection from './components/PrioritySection';
import { FRUITS } from './constants';

type SortOption = 'name-asc' | 'name-desc' | 'priority';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  
  // Default to dark theme
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // AdSense Init
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('name-asc');
  };

  const filteredAndSortedItems = useMemo(() => {
    let result = [...FRUITS];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(item => {
        const name = item.name.toLowerCase();
        const scientific = item.scientificName.toLowerCase();
        const description = item.description.toLowerCase();
        return name.includes(term) || scientific.includes(term) || description.includes(term);
      });
      
      result.sort((a, b) => a.name.localeCompare(b.name, 'he'));
    }

    if (!searchTerm.trim()) {
      result.sort((a, b) => {
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name, 'he');
        if (sortOption === 'name-desc') return b.name.localeCompare(a.name, 'he');
        if (sortOption === 'priority') {
          const aOrder = a.priorityOrder || 999;
          const bOrder = b.priorityOrder || 999;
          return aOrder - bOrder;
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300" dir="rtl">
      {/* Theme Switcher Button */}
      <div className="fixed top-4 left-4 z-[100]">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all text-xl"
          aria-label={isDarkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <Header />
      <PrioritySection />

      <main className="flex-grow">
        <section className="py-12 px-4 md:px-6 container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">קטלוג פירות וירקות הארץ</h2>
            
            <div className="flex flex-col gap-5 max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="חפשו פרי..."
                  className="flex-grow px-6 py-3 rounded-2xl border-2 border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-green-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="px-6 py-3 rounded-2xl border-2 border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-white font-bold"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="name-asc">א-ב</option>
                  <option value="priority">סדר שבעת המינים</option>
                </select>
                <button onClick={resetFilters} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700">איפוס</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedItems.map((item) => (
              <FruitCard key={item.id} fruit={item} />
            ))}
          </div>

          {/* AdSense Placement */}
          <div className="mt-16 flex justify-center min-h-[100px]">
            <ins className="adsbygoogle"
                 style={{ display: 'block', minWidth: '300px' }}
                 data-ad-client="ca-pub-2103405502519017"
                 data-ad-slot="1234567890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center text-sm border-t border-gray-800">
        <div className="container mx-auto">
          <p className="font-bold text-gray-300 mb-2">(C) Noam Gold AI 2026</p>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs uppercase tracking-widest text-gray-500">Send Feedback</span>
            <a href="mailto:goldnoamai@gmail.com" className="text-green-500 hover:underline font-bold text-lg">goldnoamai@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
