import { motion } from 'motion/react';
import { Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { recentIntercepts } from '../data';
import { getThreatColor } from '../utils';

interface Props {
  type: 'calls' | 'sms';
}

export function LogView({ type }: Props) {
  const logs = recentIntercepts.filter(i => i.type === type.replace('s', '') || (type === 'calls' && i.type === 'call') || (type === 'sms' && i.type === 'sms'));

  return (
    <div className="flex flex-col h-full bg-cyber-900">
      <header className="px-6 py-8 border-b border-cyber-700 bg-cyber-800/50">
        <h1 className="text-2xl font-bold tracking-tight text-white capitalize flex items-center gap-3">
          {type === 'calls' ? <Phone className="text-accent-neon w-6 h-6" /> : <MessageSquare className="text-accent-purple w-6 h-6" />}
          {type} Log
        </h1>
        <p className="text-sm text-slate-400 mt-2 font-mono">Real-time analysis stream</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
         {logs.map((log, i) => (
           <motion.div 
             key={log.id}
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.05 }}
             className="bg-cyber-800 border border-cyber-700 rounded-xl p-4 flex flex-col gap-3 group"
           >
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-white tracking-wide">{log.contactName || log.phoneNumber}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400 font-mono bg-cyber-900 px-2 py-0.5 rounded border border-cyber-700">
                      Score: {log.confidenceScore.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                  </div>
               </div>
               <div className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${getThreatColor(log.threatLevel)}`}>
                 {log.actionTaken}
               </div>
             </div>

             {log.contentPreview && (
               <div className="text-xs text-slate-400 bg-cyber-900/50 p-2 rounded border border-cyber-800 italic">
                 "{log.contentPreview}"
               </div>
             )}

             <div className="flex items-start gap-2 bg-cyber-900 p-2.5 rounded-lg border border-amber-500/10">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  {log.aiAnalysis}
                </p>
             </div>
           </motion.div>
         ))}
         {logs.length === 0 && (
           <div className="text-center py-12 text-slate-500 text-sm">
             No recent activity.
           </div>
         )}
      </div>
    </div>
  );
}
