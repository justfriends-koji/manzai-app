
import React from 'react';
import { ManzaiLine } from '../types';

interface ScriptLineProps {
  line: ManzaiLine;
  index: number;
}

const ScriptLine: React.FC<ScriptLineProps> = ({ line, index }) => {
  const isBoke = line.role === 'ボケ';

  return (
    <div 
      className={`flex mb-4 items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-${Math.min(index * 100, 1000)}`}
      style={{ animationDelay: `${Math.min(index * 50, 2000)}ms`, animationFillMode: 'both' }}
    >
      <div className={`shrink-0 w-24 px-2 py-1 rounded text-center font-bold text-sm shadow-sm ${
        isBoke ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
      }`}>
        {line.role}
      </div>
      <div className={`flex-1 p-3 rounded-lg shadow-sm border ${
        isBoke 
          ? 'bg-blue-50 border-blue-200 text-blue-900 rounded-tl-none' 
          : 'bg-red-50 border-red-200 text-red-900 rounded-tl-none'
      }`}>
        <p className="text-lg leading-relaxed">{line.text}</p>
      </div>
    </div>
  );
};

export default ScriptLine;
