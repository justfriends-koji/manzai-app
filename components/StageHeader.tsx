
import React from 'react';

const StageHeader: React.FC = () => {
  return (
    <div className="relative w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden bg-red-900 border-b-8 border-yellow-500">
      {/* Stage Curtains Decor */}
      <div className="absolute inset-0 flex justify-between">
        <div className="w-16 sm:w-32 h-full stage-curtain transform -skew-x-6 shadow-2xl"></div>
        <div className="w-16 sm:w-32 h-full stage-curtain transform skew-x-6 shadow-2xl"></div>
      </div>
      
      {/* Center Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100/10 to-transparent"></div>
      
      <div className="z-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-black text-yellow-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] tracking-tighter">
          爆笑！AI漫才メーカー
        </h1>
        <p className="mt-2 text-white font-bold bg-black/40 px-4 py-1 rounded-full inline-block">
          〜 あなたのテーマがネタになる 〜
        </p>
      </div>
      
      {/* Mic Stand Icon (Simplified SVG) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-80">
        <svg width="40" height="80" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="30" width="4" height="70" fill="#silver" />
          <circle cx="20" cy="20" r="12" fill="#333" />
          <rect x="10" y="90" width="20" height="4" fill="#666" />
        </svg>
      </div>
    </div>
  );
};

export default StageHeader;
