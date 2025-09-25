import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import Button from '../components/NeonButton';
import TextInput from '../components/NeonTextInput';
import LoadingSpinner from '../components/NeonLoadingSpinner';
import { addObstacle } from '../utils/neonStorage';
import {
  getCurrentLocation,
  formatCoordinates,
  validateCoordinates,
  getLocationErrorMessage,
  checkLocationEnabled
} from '../utils/neonLocation';
import { theme } from '../styles/neonTheme';
import { showSuccess, showError } from '../utils/toast';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface AddObstacleScreenProps {
  navigation: any;
}

type CoordinateMode = 'none' | 'manual' | 'gps';

interface FormErrors {
  title?: string;
  description?: string;
  coordinates?: string;
}

export default function AddObstacleScreen({ navigation }: AddObstacleScreenProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coordinateMode, setCoordinateMode] = useState<CoordinateMode>('none');
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [manualLat, setManualLat] = useState<string>('');
  const [manualLng, setManualLng] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [locationError, setLocationError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }

    if (!description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }

    if (coordinateMode === 'manual') {
      const validation = validateCoordinates(manualLat, manualLng);
      if (!validation.isValid) {
        newErrors.coordinates = validation.errors.latitude || validation.errors.longitude;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetCurrentLocation = async (): Promise<void> => {
    setGpsLoading(true);
    setLocationError('');

    try {
      const isLocationEnabled = await checkLocationEnabled();
      if (!isLocationEnabled) {
        setLocationError('Les services de localisation sont désactivés. Veuillez les activer dans les paramètres.');
        Alert.alert(
          'GPS désactivé',
          'Les services de localisation sont désactivés. Veuillez les activer dans les paramètres de votre appareil.',
          [
            { text: 'OK', style: 'default' },
            { text: 'Saisie manuelle', onPress: () => setCoordinateMode('manual') }
          ]
        );
        return;
      }

      const currentLocation = await getCurrentLocation();
      setCoordinates({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      });
      setCoordinateMode('gps');
      setLocationError('');
    } catch (error) {
      const locationErrorMessage = getLocationErrorMessage(error);
      setLocationError(locationErrorMessage);

      Alert.alert(
        'Erreur de géolocalisation',
        locationErrorMessage,
        [
          { text: 'Réessayer', onPress: handleGetCurrentLocation },
          { text: 'Saisie manuelle', onPress: () => setCoordinateMode('manual') },
          { text: 'Annuler', style: 'cancel' }
        ]
      );
    } finally {
      setGpsLoading(false);
    }
  };

  const handleSaveObstacle = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let obstacleCoordinates: Coordinates | null = null;

      if (coordinateMode === 'manual') {
        obstacleCoordinates = {
          latitude: parseFloat(manualLat),
          longitude: parseFloat(manualLng)
        };
      } else if (coordinateMode === 'gps' && coordinates) {
        obstacleCoordinates = coordinates;
      }

      await addObstacle({
        title: title.trim(),
        description: description.trim(),
        coordinates: obstacleCoordinates
      });

      showSuccess('Obstacle ajouté avec succès !');
      setTimeout(() => navigation.goBack(), 1500);
    } catch (error) {
      showError('Impossible de sauvegarder l\'obstacle');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.form}>
          {/* Titre */}
          <TextInput
            label="Titre de l'obstacle"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Travaux sur la route, Accident..."
            error={errors.title}
            required
            accessibilityHint="Décrivez brièvement le type d'obstacle"
          />

          {/* Description */}
          <TextInput
            label="Description détaillée"
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez l'obstacle en détail, sa durée estimée, les déviations possibles..."
            error={errors.description}
            multiline
            numberOfLines={4}
            required
            accessibilityHint="Fournissez des détails sur l'obstacle pour aider les autres conducteurs"
            style={{ textAlignVertical: 'top' }}
          />

          {/* Coordonnées */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Localisation</Text>

            <View style={styles.gpsButtonContainer}>
              <Button
                title={gpsLoading ? 'Localisation en cours...' :
                      coordinateMode === 'gps' && coordinates ? 'Position récupérée' :
                      'Utiliser ma position'}
                onPress={handleGetCurrentLocation}
                loading={gpsLoading}
                variant={coordinateMode === 'gps' && coordinates ? 'primary' : 'secondary'}
                fullWidth
                accessibilityLabel="Obtenir la position GPS actuelle"
                accessibilityHint="Active le GPS pour récupérer votre position actuelle"
              />
            </View>

            <View style={styles.coordinateOptions}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  coordinateMode === 'none' && styles.optionButtonActive
                ]}
                onPress={() => {
                  setCoordinateMode('none');
                  setCoordinates(null);
                  setLocationError('');
                }}
              >
                <Text style={[
                  styles.optionText,
                  coordinateMode === 'none' && styles.optionTextActive
                ]}>Pas de coordonnées</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  coordinateMode === 'manual' && styles.optionButtonActive
                ]}
                onPress={() => {
                  setCoordinateMode('manual');
                  setLocationError('');
                }}
              >
                <Text style={[
                  styles.optionText,
                  coordinateMode === 'manual' && styles.optionTextActive
                ]}>Saisie manuelle</Text>
              </TouchableOpacity>
            </View>

            {coordinateMode === 'manual' && (
              <View style={styles.manualCoordinates}>
                <View style={styles.coordinateRow}>
                  <View style={styles.coordinateInput}>
                    <TextInput
                      label="Latitude"
                      value={manualLat}
                      onChangeText={setManualLat}
                      placeholder="46.2043"
                      keyboardType="numeric"
                      error={errors.coordinates}
                      accessibilityHint="Entrez la latitude entre -90 et 90"
                    />
                  </View>
                  <View style={styles.coordinateInput}>
                    <TextInput
                      label="Longitude"
                      value={manualLng}
                      onChangeText={setManualLng}
                      placeholder="6.1432"
                      keyboardType="numeric"
                      error={errors.coordinates}
                      accessibilityHint="Entrez la longitude entre -180 et 180"
                    />
                  </View>
                </View>
              </View>
            )}

            {coordinateMode === 'gps' && coordinates && (
              <View style={styles.gpsCoordinates}>
                <Text style={styles.gpsText}>
                  Position actuelle
                </Text>
                <Text style={styles.gpsCoordinatesText}>
                  {formatCoordinates(coordinates.latitude, coordinates.longitude)}
                </Text>
                <Text style={styles.gpsRawText}>
                  Lat: {coordinates.latitude.toFixed(6)}, Lng: {coordinates.longitude.toFixed(6)}
                </Text>
              </View>
            )}

            {errors.coordinates && <Text style={styles.errorText}>{errors.coordinates}</Text>}
            {locationError && <Text style={styles.locationErrorText}>{locationError}</Text>}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Annuler"
            onPress={handleCancel}
            variant="ghost"
            disabled={loading}
            accessibilityLabel="Annuler l'ajout"
            accessibilityHint="Revenir à l'écran précédent sans sauvegarder"
          />

          <Button
            title={loading ? 'Sauvegarde...' : 'Sauvegarder'}
            onPress={handleSaveObstacle}
            loading={loading}
            variant="primary"
            accessibilityLabel="Sauvegarder l'obstacle"
            accessibilityHint="Enregistrer les informations de l'obstacle"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.primary[500],
    paddingTop: 50,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    ...theme.shadows.md,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[100],
    textAlign: 'center',
  },
  form: {
    padding: theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '600' as const,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: '#f6f6e9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A202C',
  },
  textArea: {
    backgroundColor: '#f6f6e9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A202C',
    minHeight: 100,
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  errorText: {
    fontSize: 14,
    color: '#E53E3E',
    marginTop: 4,
  },
  gpsButton: {
    backgroundColor: '#00FFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#00FFFF',
    ...theme.shadows.neon,
  },
  gpsButtonContainer: {
    marginBottom: theme.spacing.md,
  },
  gpsButtonLoading: {
    backgroundColor: '#FFFF00',
  },
  gpsButtonSuccess: {
    backgroundColor: '#00FF00',
  },
  gpsButtonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '700',
  },
  coordinateOptions: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#00FFFF',
    borderColor: '#00FFFF',
  },
  optionText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  manualCoordinates: {
    marginTop: 8,
  },
  coordinateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  coordinateInput: {
    flex: 1,
  },
  coordinateLabel: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  gpsCoordinates: {
    backgroundColor: '#1A2A2A',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  gpsText: {
    fontSize: 14,
    color: '#00FFFF',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  gpsCoordinatesText: {
    fontSize: 16,
    color: '#00FFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gpsRawText: {
    fontSize: 12,
    color: '#00CCCC',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  locationErrorText: {
    fontSize: 14,
    color: '#FF0080',
    marginTop: 8,
    textAlign: 'center',
    backgroundColor: '#2A1A1A',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0080',
  },
  actions: {
    flexDirection: 'row',
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#333333',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#CCCCCC',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#00FFFF',
    borderWidth: 2,
    borderColor: '#00FFFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#666666',
    borderColor: '#666666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
});