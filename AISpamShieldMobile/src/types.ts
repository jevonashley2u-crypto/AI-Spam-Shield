export type ThreatLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical';

export interface InterceptEvent {
  id: string;
  type: 'call' | 'sms';
  phoneNumber: string;
  contactName?: string;
  timestamp: string;
  threatLevel: ThreatLevel;
  confidenceScore: number;
  aiAnalysis: string;
  actionTaken: 'blocked' | 'flagged' | 'allowed';
  contentPreview?: string;
}

export type Tab = 'dashboard' | 'calls' | 'sms' | 'settings';
