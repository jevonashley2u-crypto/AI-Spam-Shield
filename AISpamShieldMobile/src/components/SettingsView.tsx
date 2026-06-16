import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Sliders, Zap, Database, Shield, Bell } from 'lucide-react-native';

export function SettingsView() {
  const [aggressive, setAggressive] = useState(true);
  const [localHeuristics, setLocalHeuristics] = useState(false);
  const [autoBlock, setAutoBlock] = useState(true);
  const [phishingAlerts, setPhishingAlerts] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Sliders color="#cbd5e1" size={24} />
          <Text style={styles.title}>Settings</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI ENGINE</Text>
          <View style={styles.card}>
            
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#a855f722' }]}>
                  <Zap color="#a855f7" size={20} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Aggressive Filtering</Text>
                  <Text style={styles.rowDesc}>Block anything above 80% spam prob.</Text>
                </View>
              </View>
              <Switch
                value={aggressive}
                onValueChange={setAggressive}
                trackColor={{ false: '#334155', true: '#0ea5e9' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={[styles.row, styles.borderTop]}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#10b98122' }]}>
                  <Database color="#10b981" size={20} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Local Heuristics</Text>
                  <Text style={styles.rowDesc}>Process on-device to save battery</Text>
                </View>
              </View>
              <Switch
                value={localHeuristics}
                onValueChange={setLocalHeuristics}
                trackColor={{ false: '#334155', true: '#0ea5e9' }}
                thumbColor="#ffffff"
              />
            </View>

          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROTECTION</Text>
          <View style={styles.card}>
            
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#e11d4822' }]}>
                  <Shield color="#e11d48" size={20} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Auto-Block Robocalls</Text>
                  <Text style={styles.rowDesc}>Silently reject known bad actors</Text>
                </View>
              </View>
              <Switch
                value={autoBlock}
                onValueChange={setAutoBlock}
                trackColor={{ false: '#334155', true: '#0ea5e9' }}
                thumbColor="#ffffff"
              />
            </View>

            <View style={[styles.row, styles.borderTop]}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#f59e0b22' }]}>
                  <Bell color="#f59e0b" size={20} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Phishing Alerts</Text>
                  <Text style={styles.rowDesc}>Notify on suspicious SMS links</Text>
                </View>
              </View>
              <Switch
                value={phishingAlerts}
                onValueChange={setPhishingAlerts}
                trackColor={{ false: '#334155', true: '#0ea5e9' }}
                thumbColor="#ffffff"
              />
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    padding: 24,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0ea5e9',
    letterSpacing: 1,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 16,
  },
  iconBox: {
    padding: 10,
    borderRadius: 10,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rowDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
});
