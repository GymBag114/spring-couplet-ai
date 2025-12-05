import React from 'react';
import { CoupletData } from '../types';
import { RefreshCw } from 'lucide-react';

interface CoupletDisplayProps {
  data: CoupletData | null;
  visible: boolean;
  onReset: () => void;
}

// Reusable Cloud Pattern SVG for background texture
const CloudPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-burn">
    <pattern id="cloud-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 10c-2 0-3.5 1.5-3.5 3.5 0 0.5 0.1 1 0.3 1.4-1.5-0.6-3.1-0.2-4.1 1.1-1 1.3-0.8 3.1 0.5 4.3-1.6-0.3-3.1 0.7-3.5 2.3-0.4 1.6 0.5 3.2 2 3.9-1.5 0.7-2.4 2.3-2 3.9 0.4 1.6 1.9 2.6 3.5 2.3-1.3 1.2-1.5 3-0.5 4.3 1 1.3 2.6 1.7 4.1 1.1-0.2 0.4-0.3 0.9-0.3 1.4 0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-0.5-0.1-1-0.3-1.4 1.5 0.6 3.1 0.2 4.1-1.1 1-1.3 0.8-3.1-0.5-4.3 1.6 0.3 3.1-0.7 3.5-2.3 0.4-1.6-0.5-3.2-2-3.9 1.5-0.7 2.4-2.3 2-3.9-0.4-1.6-1.9-2.6-3.5-2.3 1.3-1.2 1.5-3 0.5-4.3-1-1.3-2.6-1.7-4.1-1.1 0.2-0.4 0.3-0.9 0.3-1.4 0-2-1.5-3.5-3.5-3.5z" fill="#000" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
  </svg>
);

export const CoupletDisplay: React.FC<CoupletDisplayProps> = ({ data, visible, onReset }) => {
  if (!data) return null;

  // UPDATED: Removed bouncy bezier (values > 1) and replaced with smooth deceleration
  // cubic-bezier(0.25, 1, 0.5, 1) is a very smooth "EaseOutQuint"-like curve
  const transitionStyle = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease-out";
  const transitionDelay = visible ? '0.3s' : '0s';

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex justify-center items-center">
      
      {/* 1. Hengpi (Top Horizontal) */}
      <div 
        className="absolute top-[12%] md:top-[15%] left-1/2 -translate-x-1/2 z-30"
        style={{
          transition: transitionStyle,
          transitionDelay: transitionDelay,
          opacity: visible ? 1 : 0,
          transform: visible 
            ? 'translate(-50%, 0) scale(1)' 
            : 'translate(-50%, 35vh) scale(0)',
        }}
      >
        <div className="relative shadow-2xl">
          {/* Scroll Rollers (Left/Right) */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 rounded-sm shadow-md z-0 border border-yellow-900/50"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 rounded-sm shadow-md z-0 border border-yellow-900/50"></div>

          {/* Paper Content */}
          <div className="relative bg-[#9e1c1c] px-10 py-4 md:px-16 md:py-5 min-w-[240px] text-center border-y-[3px] border-yellow-600/40 rounded-[2px] overflow-hidden">
            <CloudPattern />
            {/* Inner Gold Border */}
            <div className="absolute inset-1 border border-yellow-500/20 pointer-events-none"></div>
            
            <span className="font-calligraphy text-4xl md:text-5xl text-stone-950 tracking-[0.2em] block relative z-10 drop-shadow-[0_1px_1px_rgba(255,215,0,0.3)]">
              {data.hengpi}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Shanglian (Left Side) */}
      <div 
        className="absolute top-1/2 left-[8%] md:left-[15%] -translate-y-1/2 z-20"
        style={{
          transition: transitionStyle,
          transitionDelay: transitionDelay,
          opacity: visible ? 1 : 0,
          transform: visible 
            ? 'translate(0, -50%) scale(1)' 
            : 'translate(35vw, -50%) scale(0)',
        }}
      >
        <VerticalScroll text={data.shanglian} />
      </div>

      {/* 3. Xialian (Right Side) */}
      <div 
        className="absolute top-1/2 right-[8%] md:right-[15%] -translate-y-1/2 z-20"
        style={{
          transition: transitionStyle,
          transitionDelay: transitionDelay,
          opacity: visible ? 1 : 0,
          transform: visible 
            ? 'translate(0, -50%) scale(1)' 
            : 'translate(-35vw, -50%) scale(0)',
        }}
      >
         <VerticalScroll text={data.xialian} />
      </div>

      {/* Reset Button - Positioned exactly where Input Box was */}
      <div 
        className="absolute bottom-16 md:top-1/2 md:bottom-auto md:mt-44 w-full max-w-md px-6 flex justify-center pointer-events-auto z-40"
      >
        <div 
           className="w-full transition-opacity duration-1000 ease-in-out delay-700"
           style={{
             opacity: visible ? 1 : 0,
           }}
        >
          {/* Matches NameInput.tsx structure exactly */}
          <div className="relative w-full">
            
            {/* Glowing Backing */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-800 via-yellow-600 to-red-800 rounded-full blur opacity-40 animate-pulse"></div>

            <div 
              onClick={onReset}
              className="relative flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 pl-6 shadow-2xl cursor-pointer group"
            >
              {/* Text Area (Mimics Input) */}
              <span className="flex-grow text-center text-xl text-stone-100 font-serif tracking-widest select-none group-hover:text-yellow-100 transition-colors">
                再写一副
              </span>

              {/* Icon Button (Mimics Submit Button) */}
              <div className="ml-2 w-12 h-12 bg-red-800 group-hover:bg-red-700 rounded-full flex items-center justify-center text-yellow-100 transition-all">
                 <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
          </div>
          
          <p className="text-stone-500 text-xs font-mono tracking-widest uppercase opacity-40 text-center mt-4">
             点击按钮，再求一副好联
          </p>
        </div>
      </div>

    </div>
  );
};

const VerticalScroll: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative group">
      {/* Main Paper Body */}
      <div className="bg-[#9e1c1c] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-x-[2px] border-yellow-900/30 w-20 md:w-28 min-h-[320px] md:min-h-[480px] flex justify-center items-center pointer-events-auto relative overflow-hidden">
          
          <CloudPattern />
          
          {/* Inner Frame */}
          <div className="absolute inset-1.5 border border-yellow-500/10 pointer-events-none"></div>

          {/* Decorative Top/Bottom Circles (Medallions) */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 border border-yellow-500/10 rounded-full opacity-30 flex items-center justify-center">
            <div className="w-8 h-8 border border-yellow-500/20 rounded-full rotate-45"></div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 border border-yellow-500/10 rounded-full opacity-30 flex items-center justify-center">
            <div className="w-8 h-8 border border-yellow-500/20 rounded-full rotate-45"></div>
          </div>

          {/* Text Content */}
          <div className="writing-vertical-rl text-center font-calligraphy text-4xl md:text-5xl text-stone-950 leading-[1.6] tracking-[0.1em] z-10 py-10 drop-shadow-[0_1px_0_rgba(255,215,0,0.2)]">
            {text}
          </div>
      </div>

      {/* Hardware: Top Hanging Rod */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-gradient-to-b from-stone-700 via-stone-800 to-black rounded-full shadow-lg flex items-center justify-between px-1">
         <div className="w-2 h-2 bg-yellow-600 rounded-full shadow-inner"></div>
         <div className="w-full h-[1px] bg-stone-600 mx-1 opacity-20"></div>
         <div className="w-2 h-2 bg-yellow-600 rounded-full shadow-inner"></div>
         
         {/* String */}
         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-stone-900/50 -z-10"></div>
      </div>

      {/* Hardware: Bottom Weighted Roller */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[130%] h-6 bg-gradient-to-b from-stone-800 to-black rounded-full shadow-2xl flex items-center justify-between px-1 z-20 border-t border-stone-700/50">
        {/* End Caps */}
        <div className="w-5 h-full bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-l-full border-r border-black/30"></div>
        <div className="w-5 h-full bg-gradient-to-l from-yellow-700 to-yellow-600 rounded-r-full border-l border-black/30"></div>
      </div>
      
      {/* Tassels (Optional decoration) */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-80 transition-opacity duration-1000">
         <div className="w-0.5 h-12 bg-red-900/60"></div>
      </div>
    </div>
  );
};