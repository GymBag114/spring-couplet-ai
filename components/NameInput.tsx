import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

export const NameInput: React.FC<NameInputProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex flex-col items-center gap-4">
        
        <div className={`relative w-full transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
          {/* Glowing Backing */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-800 via-yellow-600 to-red-800 rounded-full blur opacity-40 animate-pulse"></div>
          
          <div className="relative flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 pl-6 shadow-2xl">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="请输入姓名..."
              disabled={isLoading}
              className="flex-grow min-w-0 bg-transparent border-none outline-none text-center text-xl text-stone-100 placeholder-stone-500 font-serif tracking-widest"
              maxLength={10}
            />
            
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="ml-2 w-12 h-12 flex-shrink-0 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center text-yellow-100 transition-all disabled:opacity-50 disabled:grayscale"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        
        <p className="text-stone-500 text-xs font-mono tracking-widest uppercase opacity-60">
          输入您的姓名，AI为您撰写专属春联
        </p>
      </form>
    </div>
  );
};