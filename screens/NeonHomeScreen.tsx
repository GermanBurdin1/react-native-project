import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList
} from 'react-native';
import Button from '../components/NeonButton';
import AnimatedListItem from '../components/AnimatedList';
import LoadingSpinner from '../components/NeonLoadingSpinner';
import { getObstacles, removeObstacle } from '../utils/neonStorage';
import { EMERGENCY_CONTACTS } from '../data/neonContacts';
import ObstacleItem from '../components/NeonObstacleItem';
import ContactItem from '../components/NeonContactItem';
import EmptyState from '../components/NeonEmptyState';
import { theme } from '../styles/neonTheme';

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

interface Contact {
  id: string;
  name: string;
  function: string;
  phone: string;
  email: string | null;
  type: 'Urgence' | 'Support technique' | 'Administration';
}

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadObstaclesList();
  }, []);

  const loadObstaclesList = async (): Promise<void> => {
    try {
      const obstaclesList: Obstacle[] = await getObstacles();
      setObstacles(obstaclesList);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les obstacles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteObstacle = async (obstacleId: string): Promise<void> => {
    try {
      await removeObstacle(obstacleId);
      loadObstaclesList();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer l\'obstacle');
    }
  };

  const renderObstacleItem = ({ item, index }: { item: Obstacle; index: number }) => (
    <AnimatedListItem index={index}>
      <ObstacleItem obstacle={item} onDelete={handleDeleteObstacle} />
    </AnimatedListItem>
  );

  const renderContactItem = ({ item, index }: { item: Contact; index: number }) => (
    <AnimatedListItem index={index} delay={150}>
      <ContactItem contact={item} />
    </AnimatedListItem>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Obstacles à venir</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <LoadingSpinner size="lg" />
              <Text style={styles.loadingText}>Chargement des obstacles...</Text>
            </View>
          ) : obstacles.length === 0 ? (
            <EmptyState
              title="Aucun obstacle enregistré"
              subtitle="Appuyez sur le bouton + pour ajouter votre premier obstacle et informer les autres conducteurs."
            />
          ) : (
            <FlatList
              data={obstacles}
              renderItem={renderObstacleItem}
              keyExtractor={(obstacleItem) => obstacleItem.id}
              scrollEnabled={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacts utiles</Text>
          <FlatList
            data={EMERGENCY_CONTACTS as Contact[]}
            renderItem={renderContactItem}
            keyExtractor={(contactItem) => contactItem.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View style={styles.fab}>
        <Button
          title="+"
          onPress={() => navigation.navigate('AddObstacle')}
          variant="primary"
          accessibilityLabel="Ajouter un obstacle"
          accessibilityHint="Ouvre l'écran pour ajouter un nouvel obstacle"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing['3xl'],
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.xs,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  loadingText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.lg,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing['3xl'],
    right: theme.spacing['3xl'],
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    borderWidth: 2,
    borderColor: theme.colors.primary[500],
    ...theme.shadows.neon,
  },
});