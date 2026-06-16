import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationBar } from './src/components/NavigationBar';
import { DashboardView } from './src/components/DashboardView';
import { LogView } from './src/components/LogView';
import { SettingsView } from './src/components/SettingsView';
import { Tab } from './src/types';
import { InterceptProvider } from './src/InterceptContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <InterceptProvider>
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={styles.content}>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'calls' && <LogView type="calls" />}
        {activeTab === 'sms' && <LogView type="sms" />}
        {activeTab === 'settings' && <SettingsView />}
      </View>
      <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
    </InterceptProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  content: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
});
