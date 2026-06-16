import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Phone, MessageSquare, ShieldQuestion } from 'lucide-react-native';
import { useIntercepts } from '../InterceptContext';

interface LogViewProps {
  type: 'calls' | 'sms';
}

export function LogView({ type }: LogViewProps) {
  const { intercepts } = useIntercepts();
  const items = intercepts.filter(i => i.type === type.replace(/s$/, '') || i.type === type); // rough plural handle

  const getThreatColor = (level: string) => {
    switch(level) {
      case 'critical': return '#e11d48';
      case 'high': return '#f59e0b';
      case 'medium': return '#eab308';
      default: return '#10b981';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {type === 'calls' ? <Phone color="#94a3b8" size={24} /> : <MessageSquare color="#94a3b8" size={24} />}
          <Text style={styles.title}>{type === 'calls' ? 'Call Log' : 'SMS Log'}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: getThreatColor(item.threatLevel) + '22' }]}>
                <ShieldQuestion color={getThreatColor(item.threatLevel)} size={20} />
              </View>
              <View style={styles.info}>
                <Text style={styles.phone}>{item.contactName || item.phoneNumber}</Text>
                <Text style={styles.time}>{item.timestamp}</Text>
              </View>
              <View style={[styles.actionBadge, { backgroundColor: getThreatColor(item.threatLevel) + '33' }]}>
                <Text style={[styles.actionText, { color: getThreatColor(item.threatLevel) }]}>
                  {item.actionTaken}
                </Text>
              </View>
            </View>
            
            {item.contentPreview && (
              <View style={styles.previewBox}>
                <Text style={styles.previewText}>"{item.contentPreview}"</Text>
              </View>
            )}

            <View style={styles.analysisBox}>
              <Text style={styles.analysisText}>
                <Text style={styles.aiLabel}>AI: </Text>
                {item.aiAnalysis}
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
    gap: 24,
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
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
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  phone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  time: {
    fontSize: 12,
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
  previewBox: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#f59e0b',
  },
  previewText: {
    fontSize: 12,
    color: '#cbd5e1',
    fontStyle: 'italic',
  },
  analysisBox: {
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 8,
  },
  analysisText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  aiLabel: {
    fontWeight: 'bold',
    color: '#a855f7',
  },
});
