import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, Animated, Pressable } from 'react-native';
import { theme, getNeonGlow } from '../styles/neonTheme';

type ContactType = 'Urgence' | 'Support technique' | 'Administration';

interface Contact {
  id: string;
  name: string;
  function: string;
  phone: string;
  email?: string | null;
  type: ContactType;
}

interface ContactItemProps {
  contact: Contact;
  showCallButton?: boolean;
}

export default function ContactItem({ contact, showCallButton = true }: ContactItemProps) {
  const [scaleValue] = useState(new Animated.Value(1));

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCall = (): void => {
    if (showCallButton) {
      Linking.openURL(`tel:${contact.phone}`);
    }
  };

  const getContactTypeColor = (contactType: ContactType): string => {
    switch (contactType) {
      case 'Urgence': return theme.colors.error[500];
      case 'Support technique': return theme.colors.primary[500];
      case 'Administration': return theme.colors.success[500];
      default: return theme.colors.neutral[500];
    }
  };

  const getContactTypeGlow = (contactType: ContactType) => {
    switch (contactType) {
      case 'Urgence': return getNeonGlow('#FF0080', 'low');
      case 'Support technique': return getNeonGlow('#00FFFF', 'low');
      case 'Administration': return getNeonGlow('#00FF00', 'low');
      default: return {};
    }
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
      <Pressable
        style={styles.cardContent}
        onPress={handleCall}
        onPressIn={animatePress}
        disabled={!showCallButton}
        accessibilityRole="button"
        accessibilityLabel={`Appeler ${contact.name}, ${contact.function}`}
        accessibilityHint={`Numéro: ${contact.phone}. Appuyez pour passer un appel.`}
        accessibilityState={{ disabled: !showCallButton }}
      >
        <View style={styles.header}>
          <View style={styles.contactInfo}>
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.function}>{contact.function}</Text>
          </View>
          <View style={[styles.typeTag, { backgroundColor: getContactTypeColor(contact.type) }, getContactTypeGlow(contact.type)]}>
            <Text style={styles.typeText}>{contact.type}</Text>
          </View>
        </View>

        <View style={styles.contactDetails}>
          <Text style={styles.phone}>📞 {contact.phone}</Text>
          {contact.email && (
            <Text style={styles.email}>✉️ {contact.email}</Text>
          )}
        </View>

        {showCallButton && (
          <View style={styles.callIndicator}>
            <Text style={styles.callText}>Appuyer pour appeler</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    ...getNeonGlow('#00FFFF', 'low'),
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  contactInfo: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '700' as const,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs / 2,
    lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize.md,
  },
  function: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    minHeight: 28,
  },
  typeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.inverse,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  contactDetails: {
    marginBottom: theme.spacing.sm,
  },
  phone: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary[500],
    fontWeight: '500' as const,
    marginBottom: theme.spacing.xs,
    lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.md,
  },
  email: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  callIndicator: {
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  callText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary[500],
    fontStyle: 'italic',
  },
});