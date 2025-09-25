import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/NeonHomeScreen';
import AddObstacleScreen from './screens/NeonAddObstacleScreen';
import ToastManager from './components/ToastManager';
import { setToastRef } from './utils/toast';
import { theme } from './styles/neonTheme';

const Stack = createStackNavigator();

export default function App() {
  const toastRef = useRef(null);

  useEffect(() => {
    setToastRef(toastRef);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.primary[500],
            ...theme.shadows.neon,
          },
          headerTintColor: theme.colors.primary[500],
          headerTitleStyle: {
            fontWeight: '700',
            color: theme.colors.primary[500],
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Transport Exceptionnel',
          }}
        />
        
        <Stack.Screen
          name="AddObstacle"
          component={AddObstacleScreen}
          options={{
            title: 'Ajouter un Obstacle',
          }}
        />
      </Stack.Navigator>
      <ToastManager ref={toastRef} />
    </NavigationContainer>
  );
}
