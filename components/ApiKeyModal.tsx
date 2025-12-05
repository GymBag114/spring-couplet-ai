import React, { useState, useEffect } from 'react';
import { Settings, X, Server, Box, KeyRound } from 'lucide-react';
import { AppSettings } from '../types';
import { NORMAL_API_URL, NORMAL_MODEL } from '../constants';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSave: (settings: AppSettings) => void;
  onClose: () => void;
  initialSettings: AppSettings;
}

// Reuse Cloud Pattern for consistency
const CloudPattern = () => (
  <svg width="100%" height="100%" className="absolute inset-0 opacity-5 pointer-events-none mix-blend-multiply">
    <pattern id="modal-cloud" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M20 10c-2 0-3.5 1.5-3.5 3.5 0 0.5 0.1 1 0.3 1.4-1.5-0.6-3.1-0.2-4.1 1.1-1 1.3-0.8 3.1 0.5 4.3-1.6-0.3-3.1 0.7-3.5 2.3-0.4 1.6 0.5 3.2 2 3.9-1.5 0.7-2.4 2.3-2 3.9 0.4 1.6 1.9 2.6 3.5 2.3-1.3 1.2-1.5 3-0.5 4.3 1 1.3 2.6 1.7 4.1 1.1-0.2 0.4-0.3 0.9-0.3 1.4 0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-0.5-0.1-1-0.3-1.4 1.5 0.6 3.1 0.2 4.1-1.1 1-1.3 0.8-3.1-0.5-4.3 1.6 0.3 3.1-0.7 3.5-2.3 0.4-1.6-0.5-3.2-2-3.9 1.5-0.7 2.4-2.3 2-3.9-0.4-1.6-1.9-2.6-3.5-2.3 1.3-1.2 1.5-3 0.5-4.3-1-1.3-2.6-1.7-4.1-1.1 0.2-0.4 0.3-0.9 0.3-1.4 0-2-1.5-3.5-3.5-3.5z" fill="#000" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#modal-cloud)" />
  </svg>
);

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSave, onClose, initialSettings }) => {
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="w-full max-w-lg relative animate-in fade-in zoom-in duration-300">
        
        {/* Main Card */}
        <div className="bg-[#9e1c1c] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[3px] border-yellow-900/40 relative overflow-hidden">
          
          <CloudPattern />
          
          {/* Inner Gold Border */}
          <div className="absolute inset-2 border border-yellow-500/20 rounded pointer-events-none z-10"></div>

          {/* Header */}
          <div className="relative z-20 bg-black/20 border-b border-white/10 p-5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-yellow-100 flex items-center gap-2 font-serif tracking-wider">
              <Settings className="w-5 h-5 text-yellow-500" />
              服务配置
            </h2>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="relative z-20 p-6 space-y-5">
            
            {/* API Key */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-yellow-200/70 uppercase tracking-widest flex items-center gap-2">
                <KeyRound className="w-3 h-3" /> API Key
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:outline-none focus:border-yellow-500/50 text-yellow-50 font-mono text-sm placeholder-white/20 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Base URL */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-yellow-200/70 uppercase tracking-widest flex items-center gap-2">
                   <Server className="w-3 h-3" /> API Address
                </label>
                <input
                  type="text"
                  value={settings.baseUrl}
                  onChange={(e) => setSettings({...settings, baseUrl: e.target.value})}
                  placeholder="https://api.deepseek.com"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:outline-none focus:border-yellow-500/50 text-yellow-50 font-sans text-sm placeholder-white/20 transition-colors"
                />
              </div>

              {/* Model Name */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-yellow-200/70 uppercase tracking-widest flex items-center gap-2">
                  <Box className="w-3 h-3" /> Model Name
                </label>
                <input
                  type="text"
                  value={settings.model}
                  onChange={(e) => setSettings({...settings, model: e.target.value})}
                  placeholder={NORMAL_MODEL}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md focus:outline-none focus:border-yellow-500/50 text-yellow-50 font-sans text-sm placeholder-white/20 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 text-xs text-center text-white/40 font-mono">
              配置信息仅存储在本地浏览器中
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-20 bg-black/20 p-5 flex justify-end gap-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-5 py-2 text-stone-300 hover:text-white hover:bg-white/5 rounded transition-colors text-sm"
            >
              取消
            </button>
            <button
              onClick={() => onSave(settings)}
              disabled={!settings.apiKey.trim()}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded shadow-lg shadow-yellow-900/20 transition-all active:scale-95 text-sm"
            >
              确认保存
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};