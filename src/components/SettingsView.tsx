import { Sliders, Shield, Zap, Bell, Database } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="flex flex-col h-full bg-cyber-900 pb-24">
      <header className="px-6 py-8 border-b border-cyber-700 bg-cyber-800/50">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <Sliders className="text-slate-300 w-6 h-6" />
          Settings
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Section */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-accent-neon uppercase tracking-widest pl-2">AI Engine</h2>
          <div className="bg-cyber-800 rounded-2xl border border-cyber-700 overflow-hidden divide-y divide-cyber-700 pointer-events-none">
            
            <div className="p-4 flex items-center justify-between pointer-events-auto cursor-pointer hover:bg-cyber-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-purple/10 rounded-lg text-accent-purple">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Aggressive Filtering</h3>
                  <p className="text-xs text-slate-400">Block anything above 80% spam probability</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-accent-neon/20 rounded-full border border-accent-neon flex items-center p-0.5 relative">
                <div className="w-4 h-4 bg-accent-neon rounded-full absolute right-1 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between pointer-events-auto cursor-pointer hover:bg-cyber-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Local Heuristics</h3>
                  <p className="text-xs text-slate-400">Process on-device to save battery</p>
                </div>
              </div>
               <div className="w-10 h-6 bg-cyber-900 rounded-full border border-cyber-600 flex items-center p-0.5 relative">
                <div className="w-4 h-4 bg-slate-500 rounded-full absolute left-1"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Section */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-accent-neon uppercase tracking-widest pl-2">Protection</h2>
          <div className="bg-cyber-800 rounded-2xl border border-cyber-700 overflow-hidden divide-y divide-cyber-700 pointer-events-none">
            
            <div className="p-4 flex items-center justify-between pointer-events-auto cursor-pointer hover:bg-cyber-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Auto-Block Robocalls</h3>
                  <p className="text-xs text-slate-400">Silently reject known bad actors</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-accent-neon/20 rounded-full border border-accent-neon flex items-center p-0.5 relative">
                <div className="w-4 h-4 bg-accent-neon rounded-full absolute right-1 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between pointer-events-auto cursor-pointer hover:bg-cyber-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Phishing Alerts</h3>
                  <p className="text-xs text-slate-400">Notify on suspicious SMS links</p>
                </div>
              </div>
               <div className="w-10 h-6 bg-accent-neon/20 rounded-full border border-accent-neon flex items-center p-0.5 relative">
                <div className="w-4 h-4 bg-accent-neon rounded-full absolute right-1 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
