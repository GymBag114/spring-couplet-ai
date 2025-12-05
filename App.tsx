import React, { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';
import { generateCouplet, parseName } from './services/modelService';
import { NameInput } from './components/NameInput';
import { CoupletDisplay } from './components/CoupletDisplay';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AppStep, CoupletData, AppSettings } from './types';

// Particle definition
interface Particle {
  id: number;
  startX: number; // 0-100vw
  startY: number; // 0-100vh
  size: number;
  rotation: number;
  color: string;
  delay: number;
}

const PARTICLE_COUNT = 60;

const App: React.FC = () => {
  // Config State
  const [settings, setSettings] = useState<AppSettings>({
    apiKey: '',
    baseUrl: '', // Empty defaults to constants in service
    model: ''    // Empty defaults to constants in service
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [step, setStep] = useState<AppStep>(AppStep.IDLE);
  const [couplet, setCouplet] = useState<CoupletData | null>(null);
  
  // Initialize particles once
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: Math.random() * 5 + 3, // Reduced size: 3px to 8px
      rotation: Math.random() * 360,
      color: Math.random() > 0.6 ? '#fbbf24' : '#ef4444', // Gold or Bright Red
      delay: Math.random() * 5,
    }));
  }, []);

  const handleProcess = async (inputName: string) => {
    if (!settings.apiKey) {
      setShowSettings(true);
      return;
    }

    setStep(AppStep.PARSING); // Triggers "Sucking" animation
    setCouplet(null);

    try {
      // 1. Parse
      const parsed = await parseName(inputName, settings);
      
      setStep(AppStep.GENERATING); // Still sucking/processing

      // 2. Generate
      const result = await generateCouplet(parsed, settings);
      
      // Artificial delay to ensure sucking animation feels complete
      setTimeout(() => {
        // CRITICAL FIX: 
        // 1. Set data first so components mount in "hidden" state (scale 0 at center)
        setCouplet(result);
        
        // 2. Trigger animation to "visible" state in next tick
        // This ensures the CSS transition actually plays
        setTimeout(() => {
          setStep(AppStep.COMPLETE);
        }, 100);
        
      }, 1200);

    } catch (error) {
      console.error(error);
      setStep(AppStep.ERROR);
      alert("生成失败，请检查API Key或配置");
      setStep(AppStep.IDLE);
    }
  };

  const isAnimating = step === AppStep.PARSING || step === AppStep.GENERATING;
  const isComplete = step === AppStep.COMPLETE;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-950 flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950 via-black to-black pointer-events-none"></div>

      {/* --- Particles Layer (Z-10) --- */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`rounded-sm pointer-events-none particle-base ${isAnimating ? 'particle-suck' : 'particle-float'}`}
          style={{
            // Static styles allow CSS classes to override cleanly with !important
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            // Only apply animation delay when floating, otherwise animation frame sync issues can occur during transitions
            animationDelay: isAnimating ? '0s' : `-${p.delay}s`,
            zIndex: 10
          }}
        />
      ))}

      {/* --- Couplet Layer (Z-20: Behind Fu but on top of particles) --- */}
      {/* Always render container to handle transitions correctly */}
      <CoupletDisplay data={couplet} visible={isComplete} onReset={() => setStep(AppStep.IDLE)} />

      {/* --- Main "Fu" Character (Z-30: On top) --- */}
      {/* Fu scales down slightly when complete to reveal couplets, but stays centered */}
      <div 
        className={`
          relative z-30 flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isComplete ? 'scale-[0.5]' : 'scale-100'}
        `}
      >
        <div 
          className={`
            relative w-48 h-48 md:w-64 md:h-64 bg-rice-paper doufang-diamond flex items-center justify-center
            border-4 border-yellow-800/40 
            ${isAnimating ? 'shadow-[0_0_100px_rgba(251,191,36,0.5)]' : 'shadow-2xl'}
          `}
        >
          <div className="doufang-text">
            <div className="text-stone-900 font-calligraphy text-[8rem] md:text-[10rem] select-none drop-shadow-md leading-none mt-[-5%] ml-[2%]">
              福
            </div>
          </div>
        </div>
      </div>

      {/* --- Inputs (Z-40) --- */}
      <div 
        className={`
          absolute top-1/2 mt-32 md:mt-44
          z-40 transition-all duration-500 ease-out w-full max-w-md px-6
          ${isAnimating || isComplete ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
        `}
      >
         <NameInput onSubmit={handleProcess} isLoading={isAnimating} />
      </div>

      {/* Settings Button */}
      <button 
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 z-50 p-2 text-stone-600 hover:text-stone-300 transition-colors"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* API Modal */}
      <ApiKeyModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        onSave={(newSettings) => {
          setSettings(newSettings);
          setShowSettings(false);
        }}
        initialSettings={settings}
      />
    </div>
  );
};

export default App;