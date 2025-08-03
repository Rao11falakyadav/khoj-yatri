// src/theme.js
// Custom theme for Khoj Yatri app

export const colors = {
  primary: '#FF5722',    // Vibrant orange - represents movement and energy
  secondary: '#2196F3',  // Blue - represents location and maps
  accent: '#4CAF50',     // Green - represents success and connection
  background: '#f5f5f5', // Light gray background
  darkBg: '#263238',     // Dark background for contrast
  text: '#212121',       // Dark text for readability
  lightText: '#ffffff',  // Light text for dark backgrounds
  danger: '#f44336',     // Red for errors or warnings
  warning: '#FFC107',    // Yellow for caution
  success: '#8BC34A',    // Light green for success messages
  border: '#E0E0E0',     // Light gray for borders
  shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
};

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, #FF8A65 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary} 0%, #64B5F6 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent} 0%, #81C784 100%)`,
};

export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
};

export const shadows = {
  small: '0 2px 4px rgba(0,0,0,0.1)',
  medium: '0 4px 8px rgba(0,0,0,0.12)',
  large: '0 8px 16px rgba(0,0,0,0.14)',
  card: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  elevated: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
};

export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
  round: '50%',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const typography = {
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  heading: {
    fontWeight: 700,
    lineHeight: 1.2,
  },
  body: {
    fontWeight: 400,
    lineHeight: 1.5,
  },
};