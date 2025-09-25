import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  AccessibilityInfo,
} from 'react-native';
import { theme, getButtonStyle, getNeonGlow } from '../styles/neonTheme';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  neonGlow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
  icon,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  neonGlow = true,
}) => {
  const buttonStyle = getButtonStyle(variant, disabled || loading);
  const sizeStyles = styles[`size_${size}`] || styles.size_md;
  
  const getButtonGlowColor = () => {
    switch (variant) {
      case 'primary': return '#00FFFF';
      case 'secondary': return '#00FFFF';
      case 'danger': return '#FF0080';
      case 'success': return '#00FF00';
      default: return '#00FFFF';
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        sizeStyles,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        neonGlow && !disabled && !loading && getNeonGlow(getButtonGlowColor(), 'medium'),
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'secondary' || variant === 'ghost' ? theme.colors.primary[500] : theme.colors.text.inverse}
            style={styles.loader}
          />
        ) : (
          icon && <View style={styles.iconContainer}>{icon}</View>
        )}
        <Text
          style={[
            styles.text,
            { color: buttonStyle.color },
            styles[`text_${size}`],
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  loader: {
    marginRight: theme.spacing.sm,
  },
  size_sm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    minHeight: theme.touchTarget.minHeight,
  },
  size_lg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing['2xl'],
    minHeight: 52,
  },
  text_sm: {
    fontSize: theme.typography.fontSize.sm,
  },
  text_md: {
    fontSize: theme.typography.fontSize.md,
  },
  text_lg: {
    fontSize: theme.typography.fontSize.lg,
  },
});

export default Button;