
import React from 'react';
import { FRUITS, UI_STRINGS } from '../constants';
import { Language } from '../types';

const PrioritySection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const shivatHaMinim = FRUITS.filter(f => f.priorityOrder)
    .sort((a, b) => (a.priorityOrder || 0) - (b.priorityOrder || 0));

  return (
    <section className="py-12 px-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800" aria-labelledby="section-seven-species">
      <div className="container mx-auto">
        <h2 id="section-seven-species" className="text-2xl font-black text-center text-green-700 dark:text-green-400 mb-8">{t.shivatHaminim}</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {shivatHaMinim.map(fruit => (
            <div key={fruit.id} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-yellow-500 overflow-hidden shadow-lg">
                <img src={fruit.image} alt={fruit.name[lang]} className="w-full h-full object-cover" />
              </div>
              <span className="mt-2 font-bold dark:text-white">{fruit.name[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrioritySection;
