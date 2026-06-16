/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PhoneMockup } from './components/PhoneMockup';
import { NavigationBar } from './components/NavigationBar';
import { DashboardView } from './components/DashboardView';
import { LogView } from './components/LogView';
import { SettingsView } from './components/SettingsView';
import { Tab } from './types';

import { Shield, Smartphone, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const AppContent = (
    <div className="h-full bg-cyber-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'calls' && <LogView type="calls" />}
        {activeTab === 'sms' && <LogView type="sms" />}
        {activeTab === 'settings' && <SettingsView />}
      </div>
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row items-center justify-center lg:justify-evenly p-6 lg:p-12 overflow-x-hidden gap-12 lg:gap-8">
      
      {/* Desktop Hero Section (Shown on top for mobile, left for desktop) */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-xl z-10 pt-8 lg:pt-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-sm font-semibold tracking-wide uppercase">
          <Zap className="w-4 h-4" /> Live Prototype
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 via-indigo-400 to-purple-500 tracking-tight leading-tight">
          AI Spam Shield
        </h1>
        <p className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-lg font-medium">
          The ultimate defense against unwanted calls and malicious SMS. Powered by advanced AI to intercept, analyze, and block scams in real-time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
          <div className="flex-1 bg-cyber-800/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center lg:items-start transition-transform hover:-translate-y-1 duration-300">
            <Shield className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-white font-bold mb-2 text-lg">Real-Time Protection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Instantly intercepts and blocks known scam patterns with 99.9% accuracy.</p>
          </div>
          <div className="flex-1 bg-cyber-800/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center lg:items-start transition-transform hover:-translate-y-1 duration-300">
            <Smartphone className="w-8 h-8 text-sky-400 mb-4" />
            <h3 className="text-white font-bold mb-2 text-lg">Interactive Demo</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Try simulating a scam call or SMS right here in the prototype!</p>
          </div>
        </div>
      </div>

      {/* Phone Mockup Section */}
      <div className="w-full lg:w-auto flex justify-center pb-12 lg:pb-0 z-10">
        <PhoneMockup>
          {AppContent}
        </PhoneMockup>
      </div>

      {/* Background glow effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />
    </div>
  );
}
