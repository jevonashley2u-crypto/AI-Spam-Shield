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

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-8 pb-12">
      <PhoneMockup>
        <div className="h-full bg-cyber-900 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto no-scrollbar">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'calls' && <LogView type="calls" />}
            {activeTab === 'sms' && <LogView type="sms" />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
          <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </PhoneMockup>
    </div>
  );
}
