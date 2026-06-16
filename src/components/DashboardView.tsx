import { motion } from 'motion/react';
import { Shield, ShieldQuestion, Activity, Cpu, Bot, Lock } from 'lucide-react';
import { recentIntercepts } from '../data';
import { getThreatColor } from '../utils';

export function DashboardView() {
  const latestThreats = recentIntercepts.filter(i => i.threatLevel === 'critical' || i.threatLevel === 'high').slice(0, 2);

  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Bot className="w-7 h-7 text-accent-neon" />
          AI Spam Shield
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-mono">CORE_PROTECTION_ACTIVE</p>
      </header>

      {/* Main Status Shield */}
      <div className="relative flex flex-col items-center justify-center py-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-accent-neon/20 rounded-full blur-3xl"
        />
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
             <circle className="text-cyber-700" strokeWidth="6" stroke="currentColor" fill="transparent" r="88" cx="96" cy="96" />
             <motion.circle 
                className="text-accent-neon drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]" 
                strokeWidth="6" 
                strokeLinecap="round"
                stroke="currentColor" 
                fill="transparent" 
                r="88" 
                cx="96" 
                cy="96"
                strokeDasharray="552.92"
                strokeDashoffset="0"
                animate={{ strokeDashoffset: [552.92, 0] }}
                transition={{ duration: 2, ease: "easeOut" }}
             />
          </svg>
          <div className="flex flex-col items-center text-center">
             <Shield className="w-12 h-12 text-accent-neon mb-2 drop-shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
             <span className="text-3xl font-bold text-white tracking-tighter">100%</span>
             <span className="text-[10px] uppercase font-bold text-accent-neon/80 tracking-widest mt-1">Secured</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-cyber-800 border border-cyber-700 rounded-2xl p-4 flex flex-col gap-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <span className="text-3xl font-bold text-white">1,204</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Threats Blocked</span>
        </div>
        <div className="bg-cyber-800 border border-cyber-700 rounded-2xl p-4 flex flex-col gap-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <Cpu className="w-8 h-8 text-accent-blue" />
          </div>
          <span className="text-3xl font-bold text-white">14ms</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Avg Latency</span>
        </div>
      </div>

      {/* Recent High Threats */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            Critical Intercepts
          </h2>
          <span className="text-xs text-accent-neon hover:underline cursor-pointer">View All</span>
        </div>
        
        <div className="flex flex-col gap-3">
          {latestThreats.map((threat, i) => (
            <motion.div 
               key={threat.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 + (i * 0.1) }}
               className="bg-cyber-800/80 border border-cyber-700 p-4 rounded-xl flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getThreatColor(threat.threatLevel)}`}>
                    <ShieldQuestion className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{threat.phoneNumber}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{threat.type.toUpperCase()} • {threat.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-1 border rounded capitalize bg-cyber-900 ${getThreatColor(threat.threatLevel)}`}>
                    {threat.actionTaken}
                  </span>
                </div>
              </div>
              <div className="bg-cyber-900 border border-cyber-800 rounded-lg p-3">
                <p className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-accent-purple font-mono font-bold mt-0.5">AI:</span>
                  {threat.aiAnalysis}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
