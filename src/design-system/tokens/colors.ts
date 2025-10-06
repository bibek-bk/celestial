/**
 * Design System - Color Tokens
 * V1 - Dark mode only
 */

export const colors = {
  background: {
    primary: '#0A0A0A',
    secondary: '#141414',
    tertiary: '#1A1A1A',
    elevated: '#222222',
  },
  brand: {
    primary: '#00D9FF',
    secondary: '#8B5CF6',
    tertiary: '#F472B6',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  text: {
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    tertiary: '#737373',
    inverse: '#0A0A0A',
  },
  border: {
    default: '#262626',
    hover: '#404040',
    focus: '#00D9FF',
  },
  overlay: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.5)',
    glass: 'rgba(20, 20, 20, 0.7)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00D9FF 0%, #8B5CF6 100%)',
    secondary: 'linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)',
    accent: 'linear-gradient(135deg, #00D9FF 0%, #F472B6 100%)',
    subtle: 'linear-gradient(180deg, rgba(0, 217, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
  },
} as const;

export type ColorToken = typeof colors;


