
import React, { useState, useCallback, useRef } from 'react';
import { generateManzaiScript } from './services/geminiService';
import { ManzaiScript } from './types';
import StageHeader from './components/StageHeader';
import ScriptLine from './components/ScriptLine';

const App: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<ManzaiScript | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setLoading(true);
    setError(null);
    setScript(null);

    try {
      const result = await generateManzaiScript(theme);
      setScript(result);
      // Scroll to result after a short delay to allow rendering
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('台本の生成中にエラーが発生しました。時間を置いてもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const presetThemes = ['AIの進化', '最近の若者', '結婚生活', 'ダイエット', 'コンビニ店員', '無人島生活'];

  return (
    <div className="min-h-screen bg-neutral-100 pb-20">
      <StageHeader />

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        {/* Input Card */}
        <section className="bg-white rounded-xl shadow-xl p-6 mb-8 border-t-4 border-red-600">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="theme" className="block text-lg font-bold text-gray-700 mb-2">
                ネタのテーマを入力してください
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="theme"
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="例：自律走行車、猫、テレワークなど"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !theme.trim()}
                  className={`px-8 py-3 rounded-lg font-bold text-lg text-white transition-all transform active:scale-95 ${
                    loading || !theme.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-200'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      執筆中...
                    </span>
                  ) : '台本を作る！'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm font-bold text-gray-500 mr-2 self-center">人気のテーマ:</span>
              {presetThemes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors border border-gray-200"
                  disabled={loading}
                >
                  {t}
                </button>
              ))}
            </div>
          </form>
        </section>

        {/* Loading / Error States */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-red-700 font-bold mb-8">
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 animate-pulse">
            <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
               <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5h2M7 7h10M5 9h14M10 21h4m-7-3h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2z"></path>
               </svg>
            </div>
            <p className="text-xl font-bold text-gray-600">プロの漫才師がネタを考えています...</p>
            <p className="text-sm text-gray-400 mt-2">最高に面白いオチをひらめくまで、少々お待ちください。</p>
          </div>
        )}

        {/* Results Section */}
        {script && (
          <div ref={resultRef} className="space-y-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-yellow-500">
              <div className="bg-yellow-500 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white tracking-wide">
                  演目：{script.title}
                </h2>
                <div className="bg-white/30 px-3 py-1 rounded text-white text-xs font-bold uppercase">
                  Script Generated
                </div>
              </div>
              
              <div className="p-6 bg-[#fdfdfd]">
                <div className="max-w-2xl mx-auto py-4">
                  {script.lines.map((line, idx) => (
                    <ScriptLine key={idx} line={line} index={idx} />
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-dashed border-gray-200 text-center">
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                    </svg>
                    台本を印刷する
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
               <button 
                onClick={() => {
                  setTheme('');
                  setScript(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-50 transition-all shadow-md"
               >
                 新しいテーマで作成
               </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-10 bg-gray-800 text-gray-400 text-center">
        <p className="font-bold text-sm">© 2024 爆笑！AI漫才メーカー By World-Class AI</p>
        <p className="text-xs mt-1">※このアプリはAIによって漫才台本を生成します。実際のお笑い芸人さんとは関係ありません。</p>
      </footer>
    </div>
  );
};

export default App;
