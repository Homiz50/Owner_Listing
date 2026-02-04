import React from 'react';

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-md mx-auto pb-6 mt-2 px-4">
      <div className="relative flex items-center justify-center gap-8 sm:gap-12">
        
        {/* Step 1 Indicator */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
            ${currentStep >= 1 
              ? 'bg-white text-indigo-600 ring-4 ring-white/20 scale-110' 
              : 'bg-indigo-800/50 text-indigo-400 border-2 border-indigo-400/30'}
          `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span className={`mt-2 text-xs sm:text-sm font-semibold tracking-wide ${currentStep >= 1 ? 'text-white' : 'text-indigo-300/70'}`}>
            Basics
          </span>
        </div>

        {/* Connector Line */}
        <div className="flex-1 h-0.5 bg-indigo-900/30 relative max-w-[80px] sm:max-w-[120px]">
             <div 
                className="absolute left-0 top-0 h-full bg-white/50 transition-all duration-500 ease-out"
                style={{ width: currentStep >= 2 ? '100%' : '0%' }}
            ></div>
        </div>

        {/* Step 2 Indicator */}
        <div className="flex flex-col items-center relative z-10">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
            ${currentStep >= 2 
              ? 'bg-white text-indigo-600 ring-4 ring-white/20 scale-110' 
              : 'bg-indigo-800/50 text-indigo-400 border-2 border-indigo-400/30'}
          `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <span className={`mt-2 text-xs sm:text-sm font-semibold tracking-wide ${currentStep >= 2 ? 'text-white' : 'text-indigo-300/70'}`}>
            Details
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProgressBar;
