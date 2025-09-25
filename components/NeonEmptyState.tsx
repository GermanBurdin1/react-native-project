import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, getNeonGlow } from '../styles/neonTheme';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
    borderStyle: 'dashed',
    marginVertical: 8,
    ...getNeonGlow('#00FFFF', 'low'),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary[500],
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});