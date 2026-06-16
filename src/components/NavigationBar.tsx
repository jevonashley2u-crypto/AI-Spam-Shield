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
    <div className="absolute bottom-0 inset-x-0 h-24 bg-cyber-900/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 pb-6 pt-3 flex justify-between items-center text-slate-400">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors duration-300 ${
              isActive ? 'text-accent-neon' : 'hover:text-slate-200'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-accent-neon/10' : ''}`}>
               {tab.icon}
            </div>
            <span className="text-[10px] font-medium tracking-wide uppercase">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
