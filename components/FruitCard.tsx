
import React, { useState, useRef, useEffect } from 'react';
import { Fruit, BlessingType } from '../types';

interface FruitCardProps {
  fruit: Fruit;
}

const SeedParticles: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="animate-seedScatter bg-amber-700/80 rounded-full"
          style={{
            width: Math.random() * 5 + 3 + 'px',
            height: Math.random() * 7 + 4 + 'px',
            '--dx': (Math.random() * 100 - 50) + 'px',
            '--dy': (Math.random() * 100 - 50) + 'px',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const FruitCard: React.FC<FruitCardProps> = ({ fruit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPitHovered, setIsPitHovered] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const resetZoom = () => {
    setZoomScale(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    const newScale = Math.max(zoomScale - 0.5, 1);
    setZoomScale(newScale);
    if (newScale === 1) setDragOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isModalOpen) {
      if (e.deltaY < 0) handleZoomIn();
      else handleZoomOut();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomScale > 1) {
      setDragOffset({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Close modal and reset zoom
  const closeModal = () => {
    setIsModalOpen(false);
    resetZoom();
  };

  const renderDescription = (desc: string) => {
    const parts = desc.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-green-900 dark:text-green-400 font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const isTreeFruit = fruit.blessing === BlessingType.Etz;
  const isGroundFruit = fruit.blessing === BlessingType.Adama;

  return (
    <>
      <div 
        className={`bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl hover:shadow-green-900/10 dark:hover:shadow-black/50 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 ease-out border-2 flex flex-col h-full animate-fadeInUp relative group cursor-default ${
          fruit.isNew 
            ? 'border-yellow-400 bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-800 dark:to-yellow-900/10 ring-4 ring-yellow-400/10' 
            : 'border-gray-100 dark:border-gray-700'
        }`}
      >
        {fruit.isNew && (
          <div className="absolute -top-4 -right-2 z-20 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase px-4 py-2 rounded-2xl shadow-xl animate-bounce tracking-widest border-2 border-white dark:border-gray-800">
            חדש בקטלוג! ✨
          </div>
        )}
        
        <div 
          className="h-60 relative overflow-hidden cursor-pointer rounded-t-[1.4rem]"
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={fruit.image} 
            alt={fruit.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
             <span className="text-white font-black text-sm bg-green-600/80 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               מידע מורחב
             </span>
          </div>
          
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-end">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black text-green-800 dark:text-green-400 shadow-lg border border-green-50 dark:border-gray-700">
              {fruit.group}
            </div>
            <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-[10px] font-black shadow-lg border border-blue-400">
               🗓️ {fruit.seasonality.split(' ')[0]}
            </div>
          </div>
        </div>
        
        <div className="p-7 flex-grow flex flex-col">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors">{fruit.name}</h3>
            <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">{fruit.scientificName}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
             <span className={`inline-flex items-center text-[10px] font-black px-3 py-1 rounded-lg border shadow-sm ${
               isTreeFruit ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 
               isGroundFruit ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800' :
               'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800'
             }`}>
                {fruit.blessing}
             </span>
             <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800 text-[10px] font-black px-3 py-1 rounded-lg">
                ~{fruit.varietiesCount.toLocaleString()} זנים
             </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
            {renderDescription(fruit.description)}
          </p>
          
          <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center text-xs font-bold">
              <div className={`w-2 h-2 rounded-full ml-3 ${fruit.canEatRaw ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-400 ml-1 uppercase">מאכל:</span>
              <span className="text-gray-900 dark:text-gray-200">{fruit.canEatRaw ? 'נאכל כמות שהוא' : 'דורש הכנה'}</span>
            </div>
            
            <div 
              className="group/pit flex items-start text-xs font-bold relative p-2 -m-2 rounded-2xl transition-all hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-help"
              onMouseEnter={() => setIsPitHovered(true)}
              onMouseLeave={() => setIsPitHovered(false)}
            >
              <div className="w-2 h-2 rounded-full bg-amber-600 mt-1 ml-3 group-hover/pit:scale-125 transition-transform"></div>
              <span className="text-gray-400 ml-1 uppercase">גלעין/זרעים:</span>
              <span className="text-gray-800 dark:text-gray-200 flex-1 leading-snug relative">
                {fruit.pitDescription}
                <SeedParticles active={isPitHovered && fruit.hasPit} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-xl animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeInUp max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-30 bg-black/20 hover:bg-black/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all hover:rotate-90 text-3xl backdrop-blur-sm"
              aria-label="סגור"
            >
              &times;
            </button>

            {/* Zoomable Image Container */}
            <div 
              className="md:w-1/2 overflow-hidden bg-gray-100 dark:bg-gray-900 relative cursor-zoom-in"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img 
                ref={imageRef}
                src={fruit.image} 
                alt={fruit.name} 
                className={`w-full h-full object-cover transition-transform duration-300 ease-out select-none ${zoomScale > 1 ? 'cursor-grabbing' : 'cursor-zoom-in'}`}
                style={{ 
                  transform: `scale(${zoomScale}) translate(${dragOffset.x / zoomScale}px, ${dragOffset.y / zoomScale}px)` 
                }}
                draggable={false}
              />
              
              {/* Zoom Controls Overlay */}
              <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20">
                <button 
                  onClick={handleZoomIn}
                  className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  title="זום פנימה"
                >
                  +
                </button>
                <button 
                  onClick={handleZoomOut}
                  className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  title="זום החוצה"
                >
                  -
                </button>
                <button 
                  onClick={resetZoom}
                  className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  title="אפס זום"
                >
                  🔄
                </button>
              </div>
              
              {zoomScale > 1 && (
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur text-white text-[10px] px-3 py-1 rounded-full z-20 pointer-events-none">
                  זום: {zoomScale.toFixed(1)}x (גלגלו או גררו)
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8 md:p-12 text-right flex flex-col overflow-y-auto">
               <div className="mb-6">
                 <span className="text-green-600 dark:text-green-400 font-black uppercase text-xs tracking-widest block mb-2">{fruit.group}</span>
                 <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">{fruit.name}</h3>
                 <p className="text-gray-400 italic text-sm font-mono">{fruit.scientificName}</p>
               </div>
               
               <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-light">
                 {renderDescription(fruit.description)}
               </p>

               <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">ברכת הנהנין</span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{fruit.blessing}</span>
                  </div>
                  <div className="flex flex-col gap-1 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">עונתיות בארץ</span>
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{fruit.seasonality}</span>
                  </div>
               </div>
               
               <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
                  <h4 className="text-sm font-black text-green-800 dark:text-green-400 uppercase mb-3 flex items-center gap-2">
                    <span className="text-lg">🎖️</span> זנים מפורסמים:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {fruit.famousVarieties.map((v, i) => (
                      <span key={i} className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-bold text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 shadow-sm">
                        {v}
                      </span>
                    ))}
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter block mb-2">פרטי גלעין וזרעים</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{fruit.pitDescription}</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FruitCard;
