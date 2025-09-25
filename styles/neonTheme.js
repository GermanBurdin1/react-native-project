export const theme = {
  colors: {
    primary: {
      50: '#00FFFF',
      100: '#00E5E5',
      200: '#00CCCC',
      300: '#00B3B3',
      400: '#009999',
      500: '#00FFFF', // Неоновый голубой
      600: '#008080',
      700: '#006666',
      800: '#004D4D',
      900: '#003333',
    },
    success: {
      50: '#00FF00',
      100: '#00E600',
      200: '#00CC00',
      300: '#00B300',
      400: '#009900',
      500: '#00FF00', // Неоновый зеленый
      600: '#008000',
      700: '#006600',
      800: '#004D00',
      900: '#003300',
    },
    warning: {
      50: '#FFFF00',
      100: '#E6E600',
      200: '#CCCC00',
      300: '#B3B300',
      400: '#999900',
      500: '#FFFF00', // Неоновый желтый
      600: '#808000',
      700: '#666600',
      800: '#4D4D00',
      900: '#333300',
    },
    error: {
      50: '#FF0080',
      100: '#E60073',
      200: '#CC0066',
      300: '#B30059',
      400: '#99004D',
      500: '#FF0080', // Неоновый розовый
      600: '#800040',
      700: '#660033',
      800: '#4D0026',
      900: '#33001A',
    },
    neon: {
      purple: '#8A2BE2', // Фиолетовый неон
      orange: '#FF4500', // Оранжевый неон
      pink: '#FF1493', // Розовый неон
      blue: '#00BFFF', // Голубой неон
      green: '#32CD32', // Лаймовый неон
      red: '#FF0000', // Красный неон
    },
    neutral: {
      50: '#1A1A1A',
      100: '#2A2A2A',
      200: '#3A3A3A',
      300: '#4A4A4A',
      400: '#5A5A5A',
      500: '#6A6A6A',
      600: '#7A7A7A',
      700: '#8A8A8A',
      800: '#9A9A9A',
      900: '#AAAAAA',
    },
    background: {
      primary: '#0A0A0A', // Очень темный фон
      secondary: '#1A1A1A', // Темно-серый
      tertiary: '#2A2A2A', // Средне-темный
      overlay: 'rgba(0, 0, 0, 0.8)',
    },
    text: {
      primary: '#FFFFFF', // Белый текст
      secondary: '#CCCCCC', // Светло-серый
      disabled: '#666666', // Серый
      inverse: '#000000', // Черный для контраста
      neon: '#00FFFF', // Неоновый текст
    },
    border: {
      light: '#333333',
      medium: '#555555',
      strong: '#777777',
      neon: '#00FFFF', // Неоновая граница
    }
  },

  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      mono: 'monospace',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    }
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 4,
    },
    xl: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 8,
    },
    neon: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 10,
    },
    neonPink: {
      shadowColor: '#FF0080',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 10,
    },
    neonGreen: {
      shadowColor: '#00FF00',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 20,
      elevation: 10,
    },
  },

  animation: {
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    }
  },

  touchTarget: {
    minHeight: 44,
    minWidth: 44,
  },

  components: {
    button: {
      primary: {
        backgroundColor: '#00FFFF',
        color: '#000000',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: '700',
        minHeight: 48,
        borderWidth: 2,
        borderColor: '#00FFFF',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#00FFFF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#00FFFF',
        fontSize: 16,
        fontWeight: '700',
        minHeight: 48,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#CCCCCC',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: '500',
        minHeight: 48,
        borderWidth: 1,
        borderColor: '#333333',
      },
      danger: {
        backgroundColor: '#FF0080',
        color: '#000000',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: '700',
        minHeight: 48,
        borderWidth: 2,
        borderColor: '#FF0080',
      },
      success: {
        backgroundColor: '#00FF00',
        color: '#000000',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: '700',
        minHeight: 48,
        borderWidth: 2,
        borderColor: '#00FF00',
      },
    },
    input: {
      default: {
        backgroundColor: '#1A1A1A',
        borderWidth: 2,
        borderColor: '#333333',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#FFFFFF',
        minHeight: 44,
      },
      error: {
        borderColor: '#FF0080',
        backgroundColor: '#2A1A1A',
      },
      focused: {
        borderColor: '#00FFFF',
        borderWidth: 2,
        backgroundColor: '#1A2A2A',
      },
    },
    card: {
      default: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333333',
      },
      neon: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#00FFFF',
      }
    }
  }
};

export const getButtonStyle = (variant = 'primary', disabled = false) => {
  const base = theme.components.button[variant] || theme.components.button.primary;

  if (disabled) {
    return {
      ...base,
      backgroundColor: variant === 'secondary' || variant === 'ghost' ? base.backgroundColor : theme.colors.neutral[400],
      color: theme.colors.text.disabled,
      opacity: 0.4,
      borderColor: theme.colors.neutral[400],
    };
  }

  return base;
};

export const getInputStyle = (error = false, focused = false) => {
  const base = theme.components.input.default;

  return {
    ...base,
    ...(error && theme.components.input.error),
    ...(focused && theme.components.input.focused),
  };
};

export const getNeonGlow = (glowColor = '#00FFFF', glowIntensity = 'medium') => {
  const glowLevels = {
    low: { shadowOpacity: 0.3, shadowRadius: 10 },
    medium: { shadowOpacity: 0.6, shadowRadius: 15 },
    high: { shadowOpacity: 0.9, shadowRadius: 25 },
  };

  return {
    shadowColor: glowColor,
    shadowOffset: { width: 0, height: 0 },
    ...glowLevels[glowIntensity],
    elevation: 10,
  };
};

export default theme;