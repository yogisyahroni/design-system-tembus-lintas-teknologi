/** Portable TEMBUS semantic tokens for TypeScript consumers. */

export const tembusThemes = {
  light: {
    color: {
      background: '#F7F8F7', surface: '#FFFFFF', surfaceRaised: '#FFFFFF', surfaceSubtle: '#EEF3EF',
      foreground: '#14211A', foregroundSecondary: '#415047', foregroundMuted: '#5F6B63',
      border: '#C7D1CA', borderStrong: '#718078', inputBackground: '#FFFFFF', inputBorder: '#66756C', focusRing: '#9A3412',
      primary: '#006437', primaryLight: '#007A42', primaryDark: '#003A20', primarySoft: '#E8F5EE', primaryPale: '#F4FBF7', onPrimary: '#FFFFFF',
      accent: '#C2410C', accentDark: '#9A3412', accentLight: '#EA580C', accentSoft: '#FFF1E6', accentPale: '#FFF8F2', onAccent: '#FFFFFF',
      success: '#15803D', onSuccess: '#FFFFFF', successSurface: '#DCFCE7', warning: '#B45309', onWarning: '#FFFFFF', warningSurface: '#FEF3C7',
      error: '#B91C1C', onError: '#FFFFFF', errorSurface: '#FEE2E2', info: '#1D4ED8', onInfo: '#FFFFFF', infoSurface: '#DBEAFE',
      selection: '#B7E4C7', scrim: '#14211A',
    },
  },
  dark: {
    color: {
      background: '#0B120E', surface: '#142019', surfaceRaised: '#1B2921', surfaceSubtle: '#203329',
      foreground: '#F4F7F5', foregroundSecondary: '#D0DBD3', foregroundMuted: '#AAB5AE',
      border: '#4B5D52', borderStrong: '#71877A', inputBackground: '#142019', inputBorder: '#71877A', focusRing: '#FDBA74',
      primary: '#34D399', primaryLight: '#6EE7B7', primaryDark: '#007A42', primarySoft: '#123B25', primaryPale: '#0D3322', onPrimary: '#032318',
      accent: '#FB923C', accentDark: '#C2410C', accentLight: '#FDBA74', accentSoft: '#4A3210', accentPale: '#3D2414', onAccent: '#241000',
      success: '#4ADE80', onSuccess: '#032318', successSurface: '#123B25', warning: '#FBBF24', onWarning: '#241000', warningSurface: '#4A3210',
      error: '#F87171', onError: '#2A0808', errorSurface: '#4A1717', info: '#60A5FA', onInfo: '#071A35', infoSurface: '#132E52',
      selection: '#1A7A4C', scrim: '#000000',
    },
  },
} as const;

export const tembusGlobal = {
  spacing: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px' },
  radius: { sm: '8px', md: '12px', lg: '16px', pill: '999px' },
  motion: { fast: '150ms', standard: '200ms', slow: '300ms', easing: 'cubic-bezier(0.2, 0, 0, 1)', reduced: '0ms' },
  size: { minTouchTarget: '48px', controlLarge: '56px', icon: '24px', iconSmall: '16px' },
  content: { maxWidth: '1200px', gridGap: '16px' },
} as const;

export type TembusThemeName = keyof typeof tembusThemes;
export type TembusColorToken = keyof typeof tembusThemes.light.color;

export const tembusTokens = { version: '0.1.0', themes: tembusThemes, global: tembusGlobal } as const;
