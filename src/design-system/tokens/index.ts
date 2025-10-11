import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';
import { transitions } from './transitions';
import { zIndex } from './zIndex';

export { colors, typography, spacing, shadows, borderRadius, transitions, zIndex };

export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  zIndex,
} as const;


