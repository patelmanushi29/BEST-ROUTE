
import React from 'react';

const LoadingAnimation: React.FC = () => {
  // Collection of vehicles requested by user: bike, car, cycle, bus, truck, rocket, airplane
  const vehicles = ['🚲', '🚗', '🚲', '🚌', '🚚', '🚀', '✈️', '🚲', '🚗', '🚌', '🚚', '🚀', '✈️'];

  return (
    <div className="flex flex-col items-center justify-center space-y-24 py-40 animate-slide-up">
      <div className="relative w-full max-w-4xl">
        {/* Progress Conduit */}
        <div className="h-[4px] w-full bg-neutral-100 relative overflow-hidden rounded-full">
           <div className="absolute inset-0 bg-black w-64 animate-[conduit_1.8s_cubic-bezier(0.85,0,0.15,1)_infinite]"></div>
        </div>
        
        {/* Micro-Vehicle Stream - Emojis now in full color as requested */}
        <div className="absolute -top-20 left-0 w-full h-24 overflow-hidden pointer-events-none">
          <div className="flex gap-28 items-center whitespace-nowrap animate-[velocity_4s_linear_infinite]">
            {vehicles.map((v, i) => (
              <span key={i} className="text-6xl">
                {v}
              </span>
            ))}
            {/* Seamless repeat for smooth scrolling */}
            {vehicles.map((v, i) => (
              <span key={`rep-${i}`} className="text-6xl">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <h3 className="text-4xl font-[900] text-black tracking-tighter uppercase leading-none">
          Finding The Best Route
        </h3>
        <div className="flex items-center justify-center gap-6">
          <span className="h-[2px] w-12 bg-black"></span>
          <p className="text-black text-xs font-[900] uppercase tracking-[0.8em]">Network Active</p>
          <span className="h-[2px] w-12 bg-black"></span>
        </div>
      </div>

      <style>{`
        @keyframes velocity {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes conduit {
          0% { left: -40%; width: 10%; }
          50% { width: 50%; }
          100% { left: 140%; width: 10%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
