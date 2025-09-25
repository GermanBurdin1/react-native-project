import AsyncStorage from '@react-native-async-storage/async-storage';

const OBSTACLES_KEY = 'obstacles';

export const saveObstacles = async (obstacles) => {
  try {
    const jsonValue = JSON.stringify(obstacles);
    await AsyncStorage.setItem(OBSTACLES_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving obstacles:', error);
    throw error;
  }
};

export const getObstacles = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(OBSTACLES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting obstacles:', error);
    return [];
  }
};

export const addObstacle = async (obstacleData) => {
  try {
    const existingObstacles = await getObstacles();
    const newObstacleEntry = {
      id: Date.now().toString(),
      title: obstacleData.title,
      description: obstacleData.description,
      coordinates: obstacleData.coordinates || null,
      createdAt: new Date().toISOString(),
    };
    const updatedObstaclesList = [...existingObstacles, newObstacleEntry];
    await saveObstacles(updatedObstaclesList);
    return newObstacleEntry;
  } catch (error) {
    console.error('Error adding obstacle:', error);
    throw error;
  }
};

export const removeObstacle = async (obstacleId) => {
  try {
    const existingObstacles = await getObstacles();
    const filteredObstaclesList = existingObstacles.filter(obstacle => obstacle.id !== obstacleId);
    await saveObstacles(filteredObstaclesList);
  } catch (error) {
    console.error('Error removing obstacle:', error);
    throw error;
  }
};

export const clearAllObstacles = async () => {
  try {
    await AsyncStorage.removeItem(OBSTACLES_KEY);
  } catch (error) {
    console.error('Error clearing obstacles:', error);
    throw error;
  }
};