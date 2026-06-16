import { Tab } from '../types';
import { ShieldAlert, PhoneCall, MessageSquare, Settings } from 'lucide-react';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function NavigationBar({ activeTab, onTabChange }: Props) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Shield', icon: <ShieldAlert className="w-6 h-6" /> },
    { id: 'calls', label: 'Calls', icon: <PhoneCall className="w-6 h-6" /> },
    { id: 'sms', label: 'SMS', icon: <MessageSquare className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <div className="absolute bottom-0 inset-x-0 h-28 bg-cyber-900/95 backdrop-blur-xl border-t border-white/10 z-50 px-6 pb-8 pt-4 flex justify-between items-center text-slate-400">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 transform active:scale-95 ${
              isActive ? 'text-accent-neon scale-105' : 'hover:text-slate-100 hover:scale-105'
            }`}
          >
            <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-accent-neon/15 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : ''}`}>
               {/* Increased icon size from w-6 to w-7 */}
               <div className="scale-125">
                 {tab.icon}
               </div>
            </div>
            {/* Increased font size and font weight for readability */}
            <span className="text-[12px] font-bold tracking-widest uppercase">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
