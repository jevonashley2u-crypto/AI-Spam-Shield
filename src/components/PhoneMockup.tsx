import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Battery, Wifi, Signal } from 'lucide-react';

export function PhoneMockup({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center text-slate-200 shrink-0">
      <div className="relative w-full w-[380px] sm:w-[400px] h-[800px] bg-cyber-900 rounded-[3rem] border-[8px] border-slate-900 overflow-hidden shadow-2xl shadow-sky-900/20 flex flex-col font-sans ring-1 ring-white/10">
        {/* Dynamic Island / Notch Mockup */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-5 pb-2 text-[13px] font-medium z-40 bg-cyber-900/80 backdrop-blur-md">
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Dynamic App Content */}
        <div className="flex-1 relative overflow-y-auto no-scrollbar pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}
