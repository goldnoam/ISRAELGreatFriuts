
import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

const Header: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  return (
    <header className="bg-green-700 text-white py-12 px-6 shadow-lg relative overflow-hidden" role="banner">
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">{t.title}</h1>
      </div>
    </header>
  );
};

export default Header;
