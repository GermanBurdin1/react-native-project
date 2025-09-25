import React, { useState, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Animated,
} from 'react-native';
import { theme, getInputStyle, getNeonGlow } from '../styles/neonTheme';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  required = false,
  style,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const inputStyle = getInputStyle(!!error, isFocused);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: theme.animation.duration.normal,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: theme.animation.duration.normal,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inputStyle.borderColor, theme.colors.primary[500]],
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Animated.View
        style={[
          styles.inputContainer,
          inputStyle,
          { borderColor },
          error && styles.inputError,
          isFocused && !error && getNeonGlow('#00FFFF', 'low'),
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <RNTextInput
          ref={ref}
          style={[styles.input, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={theme.colors.text.disabled}
          accessibilityLabel={label}
          accessibilityRole="text"
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: '500' as const,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  labelFocused: {
    color: theme.colors.primary[500],
  },
  required: {
    color: theme.colors.error[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    minHeight: theme.touchTarget.minHeight,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: theme.touchTarget.minHeight,
  },
  inputError: {
    borderColor: theme.colors.error[500],
    borderWidth: 1,
  },
  leftIcon: {
    paddingLeft: theme.spacing.lg,
  },
  rightIcon: {
    paddingRight: theme.spacing.lg,
  },
  helperText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    lineHeight: theme.typography.lineHeight.normal * theme.typography.fontSize.sm,
  },
  errorText: {
    color: theme.colors.error[600],
  },
});

TextInput.displayName = 'TextInput';

export default TextInput;