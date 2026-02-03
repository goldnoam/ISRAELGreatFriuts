
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white py-12 px-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-600 rounded-full -mr-32 -mt-32 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500 rounded-full -ml-24 -mb-24 opacity-20"></div>
      
      <div className="container mx-auto relative z-10 text-center">
        <div className="inline-block bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-4 animate-bounce">
          חג לאילנות: ט"ו בשבט שמח! 🌳
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">טו בשבט בארץ זבת חלב ודבש</h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
          גלו את עושר האדמה המבורכת: משבעת המינים ועד לפיתוחים החקלאיים של המאה ה-21.
        </p>
      </div>
    </header>
  );
};

export default Header;
