
import React, { useState } from 'react';
import { PRIORITY_VERSE, FRUITS } from '../constants';
import { Fruit, BlessingType } from '../types';

const FruitDetailModal: React.FC<{ fruit: Fruit; onClose: () => void }> = ({ fruit, onClose }) => {
  const isTreeFruit = fruit.blessing === BlessingType.Etz;
  const isGroundFruit = fruit.blessing === BlessingType.Adama;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-black/60 hover:bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 text-3xl"
        >
          &times;
        </button>

        <div className="md:w-3/5 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden h-[40vh] md:h-[70vh]">
          <img 
            src={fruit.image} 
            alt={fruit.name} 
            className="w-full h-full object-cover shadow-inner" 
          />
        </div>

        <div className="md:w-2/5 p-10 flex flex-col justify-center bg-white dark:bg-gray-800 overflow-y-auto max-h-[60vh] md:max-h-none text-right">
           <div className="mb-8">
             <div className="flex items-center gap-2 justify-end mb-2">
               <span className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-xs">שבעת המינים</span>
               <span className="bg-yellow-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">מקום {fruit.priorityOrder} בסדר</span>
             </div>
             <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2">{fruit.name}</h3>
             <p className="text-gray-400 italic text-sm">{fruit.scientificName}</p>
           </div>
           
           <div className="mb-6 flex flex-wrap gap-3 justify-end">
              <span className={`inline-flex items-center px-4 py-2 rounded-xl border-2 font-black text-sm shadow-md ${
                isTreeFruit ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-700'
              }`}>
                {isTreeFruit ? '🌳 פרי העץ' : isGroundFruit ? '🌱 פרי האדמה' : fruit.blessing}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-xl border-2 font-black text-sm shadow-md bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700">
                🗓️ {fruit.seasonality}
              </span>
           </div>

           <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed font-light whitespace-pre-line">
             {fruit.description.replace(/\*\*/g, '')}
           </p>

           <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800 italic text-green-800 dark:text-green-300 text-sm">
             "{PRIORITY_VERSE}"
           </div>
        </div>
      </div>
    </div>
  );
};

const PrioritySection: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const shivatHaMinim = FRUITS.filter(f => f.priorityOrder)
    .sort((a, b) => (a.priorityOrder || 0) - (b.priorityOrder || 0));

  return (
    <section className="py-12 px-6 bg-white dark:bg-gray-950 border-b border-green-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">שבעת המינים שנתברכה בהם הארץ</h2>
          <p className="text-gray-600 dark:text-gray-400 italic">"{PRIORITY_VERSE}"</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 max-w-2xl mx-auto">
            סדר הקדימות בברכות נקבע לפי קרבת הפרי למילה "ארץ" בפסוק.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {shivatHaMinim.map((fruit) => (
            <button 
              key={fruit.id} 
              onClick={() => setSelectedFruit(fruit)}
              className="flex flex-col items-center group focus:outline-none rounded-full p-2 transition-all"
            >
              <div className="relative">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-yellow-500 dark:border-yellow-600 overflow-hidden shadow-lg group-hover:shadow-yellow-200 dark:group-hover:shadow-yellow-900/50 group-hover:scale-110 transition-all duration-500">
                  <img src={fruit.image} alt={fruit.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow-md group-hover:rotate-12 transition-transform">
                  {fruit.priorityOrder}
                </div>
              </div>
              <span className="mt-3 font-black text-gray-800 dark:text-gray-200 text-lg group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{fruit.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedFruit && (
        <FruitDetailModal 
          fruit={selectedFruit} 
          onClose={() => setSelectedFruit(null)} 
        />
      )}
    </section>
  );
};

export default PrioritySection;
