import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Shield, ShieldQuestion, Activity, Cpu, Bot, Lock, Plus } from 'lucide-react-native';
import { useIntercepts } from '../InterceptContext';
import { analyzeCallOrSms } from '../ai';

export function DashboardView() {
  const { intercepts, addIntercept } = useIntercepts();
  const latestThreats = intercepts.filter(i => i.threatLevel === 'critical' || i.threatLevel === 'high').slice(0, 2);

  const [isSimulating, setIsSimulating] = React.useState(false);

  const handleSimulateSms = async () => {
    setIsSimulating(true);
    try {
      const result = await analyzeCallOrSms("Hey this is Amazon support, your account is locked. Please click here to login and verify: http://amz-login-secure.com", "sms");
      addIntercept({
        id: Date.now().toString(),
        type: 'sms',
        phoneNumber: '1-800-AMZ-FAKE',
        timestamp: 'Just now',
        threatLevel: result.threatLevel,
        confidenceScore: result.confidenceScore,
        aiAnalysis: result.aiAnalysis,
        actionTaken: result.actionTaken,
        contentPreview: "Hey this is Amazon support, your account is locked..."
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleSimulateCall = async () => {
    setIsSimulating(true);
    try {
      const result = await analyzeCallOrSms("Hello, we are calling from the IRS. You owe back taxes and will be arrested if you do not pay immediately using gift cards.", "call");
      addIntercept({
        id: Date.now().toString(),
        type: 'call',
        phoneNumber: '1-800-IRS-SCAM',
        timestamp: 'Just now',
        threatLevel: result.threatLevel,
        confidenceScore: result.confidenceScore,
        aiAnalysis: result.aiAnalysis,
        actionTaken: result.actionTaken,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch(level) {
      case 'critical': return '#e11d48'; // rose-600
      case 'high': return '#f59e0b'; // amber-500
      default: return '#0ea5e9'; // sky-500
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Bot color="#0ea5e9" size={28} />
          <Text style={styles.title}>AI Spam Shield</Text>
        </View>
        <Text style={styles.subtitle}>CORE_PROTECTION_ACTIVE</Text>
      </View>

      <View style={styles.shieldContainer}>
        <Shield color="#0ea5e9" size={64} style={styles.mainShield} />
        <Text style={styles.shieldText}>100%</Text>
        <Text style={styles.shieldSubtext}>SECURED</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1,204</Text>
          <Text style={styles.statLabel}>THREATS BLOCKED</Text>
          <Lock color="#e11d48" size={32} style={styles.statIcon} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>14ms</Text>
          <Text style={styles.statLabel}>AI AVG LATENCY</Text>
          <Cpu color="#0ea5e9" size={32} style={styles.statIcon} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        <Text
          onPress={isSimulating ? undefined : handleSimulateSms}
          style={{
            flex: 1,
            color: isSimulating ? '#94a3b8' : '#0ea5e9',
            fontWeight: 'bold',
            padding: 12,
            borderWidth: 1,
            borderColor: isSimulating ? '#334155' : '#0ea5e9',
            borderRadius: 8,
            textAlign: 'center'
          }}
        >
          {isSimulating ? 'Analyzing...' : 'Simulate Spam SMS'}
        </Text>
        <Text
          onPress={isSimulating ? undefined : handleSimulateCall}
          style={{
            flex: 1,
            color: isSimulating ? '#94a3b8' : '#f59e0b',
            fontWeight: 'bold',
            padding: 12,
            borderWidth: 1,
            borderColor: isSimulating ? '#334155' : '#f59e0b',
            borderRadius: 8,
            textAlign: 'center'
          }}
        >
          {isSimulating ? 'Analyzing...' : 'Simulate Scam Call'}
        </Text>
      </View>

      <View style={styles.threatsSection}>
        <View style={styles.threatsHeader}>
          <View style={styles.threatsTitleRow}>
            <Activity color="#e11d48" size={16} />
            <Text style={styles.threatsTitle}>CRITICAL INTERCEPTS</Text>
          </View>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        {latestThreats.map((threat) => (
          <View key={threat.id} style={styles.threatCard}>
            <View style={styles.threatCardHeader}>
              <View style={styles.threatIconContainer}>
                <ShieldQuestion color={getThreatColor(threat.threatLevel)} size={24} />
              </View>
              <View style={styles.threatInfo}>
                <Text style={styles.threatPhone}>{threat.phoneNumber}</Text>
                <Text style={styles.threatMeta}>{threat.type.toUpperCase()} • {threat.timestamp}</Text>
              </View>
              <View style={[styles.actionBadge, { backgroundColor: getThreatColor(threat.threatLevel) + '33' }]}>
                <Text style={[styles.actionText, { color: getThreatColor(threat.threatLevel) }]}>
                  {threat.actionTaken}
                </Text>
              </View>
            </View>
            <View style={styles.analysisBox}>
              <Text style={styles.analysisText}>
                <Text style={styles.aiLabel}>AI: </Text>
                {threat.aiAnalysis}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 32,
  },
  header: {
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    fontFamily: 'Courier',
  },
  shieldContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  mainShield: {
    marginBottom: 16,
  },
  shieldText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  shieldSubtext: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0ea5e9',
    letterSpacing: 2,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
    position: 'relative',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  statIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    opacity: 0.2,
  },
  threatsSection: {
    gap: 16,
  },
  threatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threatsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  threatsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#cbd5e1',
    letterSpacing: 1,
  },
  viewAll: {
    fontSize: 12,
    color: '#0ea5e9',
  },
  threatCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
    marginBottom: 12,
  },
  threatCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  threatIconContainer: {
    padding: 8,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    marginRight: 12,
  },
  threatInfo: {
    flex: 1,
  },
  threatPhone: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  threatMeta: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  actionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  actionText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  analysisBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  analysisText: {
    fontSize: 12,
    color: '#cbd5e1',
    lineHeight: 18,
  },
  aiLabel: {
    fontWeight: 'bold',
    color: '#a855f7',
  },
});
