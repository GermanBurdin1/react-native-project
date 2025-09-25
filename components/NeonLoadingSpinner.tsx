import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { theme, getNeonGlow } from '../styles/neonTheme';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: any;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = theme.colors.primary[500],
  style,
}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sizeValue = {
    sm: 16,
    md: 24,
    lg: 32,
  }[size];

  const borderWidth = {
    sm: 2,
    md: 3,
    lg: 4,
  }[size];

  return (
    <View style={[styles.container, style]} accessibilityLabel="Loading">
      <Animated.View
        style={[
          styles.spinner,
          {
            width: sizeValue,
            height: sizeValue,
            borderWidth,
            borderColor: `${color}20`,
            borderTopColor: color,
            transform: [{ rotate }],
          },
          getNeonGlow(color, 'medium'),
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderRadius: 50,
  },
});

export default LoadingSpinner;