/** Travel Rats: the single source of truth for native UI styles. */
export const colors = {
  canvas: '#FFFEFA', surface: '#FFFFFF', ink: '#302C42', muted: '#777184',
  line: '#EAE6EF', lavender: '#F0E9FF', violet: '#7950D5', violetDark: '#5735A3',
  green: '#DFF4C8', greenInk: '#397326', greenEdge: '#B8D99B',
  peach: '#FFE9D7', peachInk: '#AE5629', peachEdge: '#F3C9A6',
  gold: '#FFF1BB', goldInk: '#906417', goldEdge: '#E8D18C',
  violetEdge: '#D1BDED', progress: '#82BE50',
  red: '#FFD9D9', redInk: '#B23B3B', redEdge: '#F0A8A8',
} as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 12, md: 18, lg: 24, pill: 999 } as const;
export const fonts = { display: 'Baloo2_700Bold', body: 'Nunito_600SemiBold', bold: 'Nunito_800ExtraBold' } as const;
export const tones = {
  violet: { fill: colors.lavender, ink: colors.violetDark, edge: colors.violetEdge },
  green: { fill: colors.green, ink: colors.greenInk, edge: colors.greenEdge },
  peach: { fill: colors.peach, ink: colors.peachInk, edge: colors.peachEdge },
  gold: { fill: colors.gold, ink: colors.goldInk, edge: colors.goldEdge },
  red: { fill: colors.red, ink: colors.redInk, edge: colors.redEdge },
} as const;
export type Tone = keyof typeof tones;
