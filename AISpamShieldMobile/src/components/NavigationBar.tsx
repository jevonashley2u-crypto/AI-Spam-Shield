import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shield, Phone, MessageSquare, Settings } from 'lucide-react-native';
import { Tab } from '../types';

interface NavigationBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const tabs = [
    { id: 'dashboard', icon: Shield, label: 'Dashboard' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'sms', icon: MessageSquare, label: 'SMS' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id as Tab)}
            style={styles.tab}
          >
            <View style={styles.iconContainer}>
              <Icon 
                color={isActive ? '#0ea5e9' : '#64748b'} 
                size={24} 
              />
              {isActive && (
                <View style={styles.activeDot} />
              )}
            </View>
            <Text style={[
              styles.label, 
              isActive ? styles.labelActive : styles.labelInactive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingVertical: 12,
    paddingBottom: 24, // Safe area for newer iPhones/Androids
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeDot: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0ea5e9',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  labelActive: {
    color: '#0ea5e9',
  },
  labelInactive: {
    color: '#64748b',
  },
});
