import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission de localisation refusée');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeout: 15000,
      maximumAge: 10000,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error) {
    if (error.code === 'E_LOCATION_SERVICES_DISABLED') {
      throw new Error('Les services de localisation sont désactivés. Veuillez les activer dans les paramètres.');
    } else if (error.code === 'E_LOCATION_TIMEOUT') {
      throw new Error('Délai d\'attente dépassé pour obtenir la localisation. Vérifiez votre signal GPS.');
    } else if (error.message && error.message.includes('Permission')) {
      throw new Error('Permission de localisation refusée. Autorisez l\'accès à la localisation dans les paramètres.');
    } else {
      throw new Error('Impossible d\'obtenir la position GPS. Vérifiez que le GPS est activé.');
    }
  }
};

export const formatCoordinates = (latValue, lngValue, precision = 4) => {
  if (latValue == null || lngValue == null) {
    return 'Coordonnées non disponibles';
  }

  if (typeof latValue !== 'number' || typeof lngValue !== 'number') {
    return 'Coordonnées invalides';
  }

  const formattedLat = latValue.toFixed(precision);
  const formattedLng = lngValue.toFixed(precision);

  const latDirection = latValue >= 0 ? 'N' : 'S';
  const lngDirection = lngValue >= 0 ? 'E' : 'O';

  return `${Math.abs(formattedLat)}°${latDirection}, ${Math.abs(formattedLng)}°${lngDirection}`;
};

export const validateCoordinates = (latInput, lngInput) => {
  const validationErrors = {};

  if (latInput === '' || latInput == null) {
    validationErrors.latitude = 'La latitude est requise';
  } else {
    const parsedLat = parseFloat(latInput);
    if (isNaN(parsedLat)) {
      validationErrors.latitude = 'La latitude doit être un nombre';
    } else if (parsedLat < -90 || parsedLat > 90) {
      validationErrors.latitude = 'La latitude doit être comprise entre -90 et 90';
    }
  }

  if (lngInput === '' || lngInput == null) {
    validationErrors.longitude = 'La longitude est requise';
  } else {
    const parsedLng = parseFloat(lngInput);
    if (isNaN(parsedLng)) {
      validationErrors.longitude = 'La longitude doit être un nombre';
    } else if (parsedLng < -180 || parsedLng > 180) {
      validationErrors.longitude = 'La longitude doit être comprise entre -180 et 180';
    }
  }

  return {
    isValid: Object.keys(validationErrors).length === 0,
    errors: validationErrors
  };
};

export const getLocationErrorMessage = (locationError) => {
  if (!locationError) return 'Erreur inconnue';

  const errorMessage = locationError.message || locationError.toString();

  if (errorMessage.includes('Permission')) {
    return 'Permission de localisation refusée. Autorisez l\'accès dans les paramètres.';
  }

  if (errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
    return 'Délai d\'attente dépassé. Vérifiez votre signal GPS et réessayez.';
  }

  if (errorMessage.includes('disabled') || errorMessage.includes('DISABLED')) {
    return 'GPS désactivé. Activez la localisation dans les paramètres.';
  }

  if (errorMessage.includes('unavailable') || errorMessage.includes('UNAVAILABLE')) {
    return 'Service de localisation indisponible. Vérifiez votre connexion.';
  }

  return 'Erreur de géolocalisation. Vérifiez vos paramètres de localisation.';
};

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    return false;
  }
};

export const checkLocationEnabled = async () => {
  try {
    const enabled = await Location.hasServicesEnabledAsync();
    return enabled;
  } catch (error) {
    return false;
  }
};