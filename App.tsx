
import React, { useState } from 'react';
import { Preferences, RouteResponse } from './types';
import { findBestRoutes } from './services/geminiService';
import LoadingAnimation from './components/LoadingAnimation';
import RouteResult from './components/RouteResult';

const App: React.FC = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [extraStops, setExtraStops] = useState<string[]>([]);
  const [prefs, setPrefs] = useState<Preferences>({
    fastest: true,
    cheapest: false,
    mostComfortable: false,
    ecoFriendly: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!start || !destination) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await findBestRoutes(start, destination, extraStops, prefs);
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 3500);
    } catch (err: any) {
      setError(err.message || "Routing simulation failed.");
      setLoading(false);
    }
  };

  const togglePref = (key: keyof Preferences) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Massive Branding Section */}
        <header className="text-center mb-28 space-y-6 animate-slide-up">
          <h1 className="text-[12vw] md:text-[10rem] font-[900] tracking-[-0.08em] text-black leading-[0.8] uppercase">
            BestRoute
          </h1>
          <p className="serif-tagline text-3xl md:text-5xl text-black font-[900] italic opacity-100">
            "BestRoute is the best route"
          </p>
        </header>

        {/* Input Control Center */}
        <div className="bg-white border-[4px] border-black rounded-[4rem] p-10 md:p-20 space-y-16 animate-slide-up [animation-delay:150ms]">
          
          {/* Destination Vectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-[900] uppercase tracking-[0.4em] ml-10 text-black">Starting Point</span>
              <input
                type="text"
                placeholder="Enter Location A"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="pill-input w-full bg-white px-10 py-8 text-2xl font-[900] text-black placeholder-neutral-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-[900] uppercase tracking-[0.4em] ml-10 text-black">Final Destination</span>
              <input
                type="text"
                placeholder="Enter Location B"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pill-input w-full bg-white px-10 py-8 text-2xl font-[900] text-black placeholder-neutral-300 outline-none"
              />
            </div>
          </div>

          {/* Waypoints */}
          {extraStops.length > 0 && (
            <div className="space-y-6">
              {extraStops.map((stop, idx) => (
                <div key={idx} className="flex items-center gap-6 animate-slide-up">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Waypoint Vector 0${idx + 1}`}
                      value={stop}
                      onChange={(e) => {
                        const next = [...extraStops];
                        next[idx] = e.target.value;
                        setExtraStops(next);
                      }}
                      className="pill-input w-full bg-white px-10 py-6 text-lg font-[900] text-black placeholder-neutral-200 outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => setExtraStops(extraStops.filter((_, i) => i !== idx))}
                    className="w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-black text-black font-[900] hover:bg-black hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Precision Spacing: Control Bar */}
          <div className="pt-10 border-t-[4px] border-black">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 flex-1">
                {[
                  { id: 'fastest', label: 'Fastest', icon: '⚡' },
                  { id: 'cheapest', label: 'Cheapest', icon: '💰' },
                  { id: 'mostComfortable', label: 'Comfort', icon: ' Couch 🛋️' },
                  { id: 'ecoFriendly', label: 'Eco', icon: '🌱' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => togglePref(item.id as keyof Preferences)}
                    className={`
                      flex-1 min-w-[140px] flex items-center justify-center gap-3 px-8 py-5 rounded-full border-[3px] text-[12px] font-[900] tracking-widest uppercase transition-all
                      ${prefs[item.id as keyof Preferences] 
                        ? 'bg-black border-black text-white shadow-xl shadow-black/20' 
                        : 'bg-white border-black text-black hover:bg-neutral-50'}
                    `}
                  >
                    <span className="text-lg">{item.icon.split(' ').pop()}</span>
                    {item.label}
                  </button>
                ))}
                
                <button 
                  onClick={() => setExtraStops([...extraStops, ''])}
                  className="flex-1 min-w-[140px] px-8 py-5 rounded-full border-[3px] border-black text-black font-[900] text-[12px] uppercase tracking-widest hover:bg-black hover:text-white transition-all bg-white whitespace-nowrap"
                >
                  CUSTOMIZE +
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSearch}
            disabled={loading || !start || !destination}
            className={`
              w-full py-10 rounded-full text-4xl font-[900] tracking-[-0.04em] transition-all uppercase shadow-2xl
              ${loading || !start || !destination
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200 border-2' 
                : 'bg-black text-white border-[3px] border-black hover:bg-neutral-900 active:scale-[0.98]'}
            `}
          >
            {loading ? 'FINDING THE BEST ROUTE...' : 'FIND ME THE BEST ROUTE'}
          </button>
        </div>

        {/* Dynamic Display Area */}
        <main className="mt-32 min-h-[600px]">
          {loading && <LoadingAnimation />}
          
          {error && (
            <div className="bg-white border-[4px] border-black p-16 rounded-[4rem] text-black text-2xl font-[900] text-center animate-slide-up">
              <span className="block mb-6 text-5xl">SYSTEM ERROR</span>
              {error}
            </div>
          )}

          {!loading && result && (
            <RouteResult data={result} />
          )}

          {!loading && !result && !error && (
            <div className="text-center py-40 opacity-10">
              <p className="text-black font-[900] uppercase tracking-[1.5em] text-sm">Stationary State</p>
            </div>
          )}
        </main>

        <footer className="mt-40 pt-16 border-t-[4px] border-black flex flex-col md:flex-row justify-between items-center text-black text-xs font-[900] uppercase tracking-[0.4em] gap-10">
          <p>© 2024 BESTROUTE TRANSIT CORP</p>
          <div className="flex gap-16">
            <a href="#" className="hover:underline underline-offset-8 transition-all">Global Safety</a>
            <a href="#" className="hover:underline underline-offset-8 transition-all">Data Privacy</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
