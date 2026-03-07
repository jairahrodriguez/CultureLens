import React from 'react';
// This file contains design tokens that can be imported and used throughout the app
export const colors = {
  // Parchment Tones (Light Backgrounds)
  parchment: {
    50: '#fefcf0',
    100: '#fef7e0',
    200: '#fcefc2',
    300: '#f8e398',
    400: '#f2d478',
    500: '#e8c547' // Strong accents
  },
  // Sepia/Gray Tones (Neutral)
  sepia: {
    100: '#f4f0e6',
    200: '#e8dcc6',
    300: '#d4c4a8',
    400: '#bfa888',
    500: '#a08968',
    600: '#8b7355',
    700: '#6d5a42',
    800: '#4a3e2a',
    900: '#2d251a' // Darkest text
  },
  // Brown Tones (Primary Brand)
  brown: {
    500: '#8b5a3c',
    600: '#744a32',
    700: '#5d3a28' // Hover states, destructive
  },
  // Leather Tones (Accent)
  leather: {
    500: '#8b4513',
    600: '#a0522d' // Star ratings, highlights
  },
  // Ink (Text)
  ink: {
    500: '#2f1b14',
    600: '#1a0f0a' // Darkest text
  },
  // Special Colors
  header: {
    home: '#b7965f',
    guide: '#d5a940',
    buddy: '#b7965f' // Buddy Screen Header
  },
  message: {
    user: '#dcbd8c',
    bot: '#bc9a60' // Bot Messages
  }
};
// Typography
export const typography = {
  fontFamily: "'Josefin Slab', Georgia, 'Times New Roman', serif",
  // Font sizes (following Tailwind defaults)
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem' // 36px
  },
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.3',
    normal: '1.4',
    relaxed: '1.7' // Body text
  }
};
// Spacing
export const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem' // 64px
};
// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px'
};
// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(139, 90, 60, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(139, 90, 60, 0.1), 0 1px 2px 0 rgba(139, 90, 60, 0.06)',
  md: '0 4px 6px -1px rgba(139, 90, 60, 0.1), 0 2px 4px -1px rgba(139, 90, 60, 0.06)',
  lg: '0 10px 15px -3px rgba(139, 90, 60, 0.1), 0 4px 6px -2px rgba(139, 90, 60, 0.05)',
  xl: '0 20px 25px -5px rgba(139, 90, 60, 0.1), 0 10px 10px -5px rgba(139, 90, 60, 0.04)',
  '2xl': '0 25px 50px -12px rgba(139, 90, 60, 0.25)',
  textShadow: '2px 2px 4px rgba(139, 90, 60, 0.2)'
};
// Gradients
export const gradients = {
  // Background gradients
  mainBackground: `
    radial-gradient(circle at 20% 80%, rgba(139, 90, 60, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(212, 196, 168, 0.2) 0%, transparent 50%)
  `,
  // Card overlays
  cardOverlay: `
    linear-gradient(135deg, rgba(139, 90, 60, 0.05) 0%, transparent 100%),
    radial-gradient(circle at 20% 80%, rgba(212, 196, 168, 0.1) 0%, transparent 50%)
  `,
  // Hero/Welcome screen
  heroGradient: `linear-gradient(135deg, #f9eab5 0%, white 100%)`
};
// Z-index layers
export const zIndex = {
  decorative: 1,
  base: 10,
  header: 20,
  dropdown: 30,
  modal: 40,
  toast: 50
};
// Transitions
export const transitions = {
  duration: {
    default: '200ms',
    slow: '300ms'
  },
  timing: {
    default: 'ease-in-out',
    linear: 'linear'
  }
};
// Export all design tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  zIndex,
  transitions
};
export default designTokens;