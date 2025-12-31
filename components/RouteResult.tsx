
import React from 'react';
import { RouteOption, RouteResponse } from '../types';

const RouteCard: React.FC<{ route: RouteOption; isBest?: boolean }> = ({ route, isBest = false }) => {
  // Logic to determine symbols
  const isEco = !!route.emissions || route.advantages.some(a => a.toLowerCase().includes('eco') || a.toLowerCase().includes('green'));
  // Fix: Move route.type check outside of the advantages some loop where 'a' is a string.
  const isComfy = route.advantages.some(a => a.toLowerCase().includes('comfort') || a.toLowerCase().includes('relax') || a.toLowerCase().includes('lounge')) || route.type.toLowerCase().includes('luxury');
  const isFast = route.advantages.some(a => a.toLowerCase().includes('fast') || a.toLowerCase().includes('quick') || a.toLowerCase().includes('rapid'));

  return (
    <div className={`
      relative rounded-[1.5rem] p-6 md:p-8 transition-all duration-700
      ${isBest 
        ? 'bg-white border-[3px] border-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]' 
        : 'bg-white border-2 border-neutral-100 hover:border-black'
      }
    `}>
      {isBest && (
        <div className="absolute top-6 right-8">
          <span className="text-[9px] font-black text-white bg-black tracking-[0.3em] uppercase px-5 py-1.5 rounded-full">
            Optimal
          </span>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-[900] text-black tracking-tighter uppercase leading-none">{route.type}</h3>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-black text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
                  {route.distance}
                </p>
                <div className="flex gap-2">
                  {isFast && <span title="Fast" className="text-base">⚡</span>}
                  {isEco && <span title="Eco-Friendly" className="text-base">🌱</span>}
                  {isComfy && <span title="Comfortable" className="text-base">🛋️</span>}
                </div>
              </div>
            </div>
          </div>

          <p className="text-black text-lg md:text-xl leading-[1.2] max-w-2xl font-medium serif-tagline italic">
            "{route.description}"
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {route.advantages.map((adv, idx) => (
              <span key={idx} className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                {adv}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row lg:flex-col items-end justify-between lg:justify-center gap-6 min-w-[180px] lg:border-l-[2px] lg:border-black lg:pl-10">
          <div className="text-right">
            <div className="text-[9px] text-black font-black uppercase tracking-widest mb-1 opacity-40 flex items-center justify-end gap-1">
              <span>⚡</span> FAST
            </div>
            <div className="text-4xl md:text-5xl font-[900] text-black tracking-[-0.04em] leading-none">{route.duration}</div>
          </div>
          
          <div className="text-right space-y-3">
            <div className="flex flex-col gap-3">
               <div className="text-right">
                <span className="text-black text-[9px] font-black uppercase tracking-widest block mb-0.5 opacity-40">
                  <span>💰</span> COST
                </span>
                <span className="text-black text-2xl font-black tracking-tight">{route.cost}</span>
              </div>
              
              {isComfy && (
                <div className="text-right">
                   <span className="text-black text-[9px] font-black uppercase tracking-widest block mb-0.5 opacity-40">
                    <span>🛋️</span> COMFY
                  </span>
                  <span className="text-black text-xs font-bold uppercase">Included</span>
                </div>
              )}

              {isEco && (
                <div className="text-right">
                  <span className="text-black text-[9px] font-black uppercase tracking-widest block mb-0.5 opacity-40">
                    <span>🌱</span> ECO
                  </span>
                  <span className="text-black text-sm font-bold uppercase">{route.emissions || 'Low Impact'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RouteResult: React.FC<{ data: RouteResponse }> = ({ data }) => {
  return (
    <div className="space-y-16 animate-slide-up">
      <div>
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-xs font-[900] text-black uppercase tracking-[0.6em] whitespace-nowrap">Result</h2>
          <div className="h-[2px] flex-1 bg-black"></div>
        </div>
        <RouteCard route={data.bestRoute} isBest={true} />
      </div>

      <div>
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-xs font-black text-neutral-300 uppercase tracking-[0.6em] whitespace-nowrap">Alternatives</h2>
          <div className="h-[1px] flex-1 bg-neutral-100"></div>
        </div>
        <div className="space-y-6">
          {data.alternatives.map((alt, idx) => (
            <RouteCard key={idx} route={alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteResult;
