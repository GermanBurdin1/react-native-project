import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Pressable } from 'react-native';
import Button from './NeonButton';
import { theme, getNeonGlow } from '../styles/neonTheme';
import { formatCoordinates } from '../utils/neonLocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Obstacle {
  id: string;
  title: string;
  description: string;
  coordinates?: Coordinates | null;
  createdAt: string;
}

interface ObstacleItemProps {
  obstacle: Obstacle;
  onDelete: (id: string) => Promise<void>;
}

export default function ObstacleItem({ obstacle, onDelete }: ObstacleItemProps) {
  const [scaleValue] = useState(new Animated.Value(1));
  const [deleteLoading, setDeleteLoading] = useState(false);

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
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

  const handleDelete = async (): Promise<void> => {
    Alert.alert(
      'Supprimer l\'obstacle',
      'Êtes-vous sûr de vouloir supprimer cet obstacle ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            setDeleteLoading(true);
            try {
              await onDelete(obstacle.id);
            } finally {
              setDeleteLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
      <Pressable
        onPressIn={animatePress}
        style={styles.cardContent}
        accessibilityRole="button"
        accessibilityLabel={`Obstacle: ${obstacle.title}`}
        accessibilityHint="Appuyez pour voir les détails"
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{obstacle.title}</Text>
          <Button
            title="✕"
            onPress={handleDelete}
            variant="danger"
            size="sm"
            loading={deleteLoading}
            accessibilityLabel="Supprimer cet obstacle"
            accessibilityHint="Supprime définitivement cet obstacle"
          />
        </View>

        <Text style={styles.description}>{obstacle.description}</Text>

        {obstacle.coordinates && (
          <View style={styles.locationContainer}>
            <Text style={styles.location}>
              📍 {formatCoordinates(obstacle.coordinates.latitude, obstacle.coordinates.longitude)}
            </Text>
          </View>
        )}

        <Text style={styles.date}>
          Créé le {new Date(obstacle.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
    ...getNeonGlow('#00FFFF', 'low'),
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700' as const,
    color: theme.colors.primary[500],
    flex: 1,
    marginRight: theme.spacing.sm,
    lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.md,
  },
  locationContainer: {
    marginBottom: theme.spacing.sm,
  },
  location: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primary[500],
  },
  date: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.disabled,
    fontStyle: 'italic',
  },
});