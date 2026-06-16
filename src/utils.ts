import { ThreatLevel } from './types';

export function getThreatColor(threat: ThreatLevel) {
  switch (threat) {
    case 'safe':
      return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'low':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'medium':
      return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'high':
      return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'critical':
      return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
  }
}

export function getThreatHex(threat: ThreatLevel) {
  switch (threat) {
    case 'safe': return '#34d399';
    case 'low': return '#60a5fa';
    case 'medium': return '#fbbf24';
    case 'high': return '#f97316';
    case 'critical': return '#f43f5e';
  }
}
