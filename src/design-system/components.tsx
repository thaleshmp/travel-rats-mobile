import { ReactNode } from 'react';
import { Platform, Pressable, PressableProps, StyleSheet, Text, TextProps, View, ViewProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts, radius, space, tones, Tone } from './tokens';
import { Icon, IconName } from './Icon';
export function Label({ variant = 'body', style, ...props }: TextProps & { variant?: 'body' | 'title' | 'heading' | 'small' | 'eyebrow' }) {
  return <Text {...props} style={[styles.text, typography[variant], style]} />;
}
export function Surface({ style, ...props }: ViewProps) { return <View {...props} style={[styles.surface, style]} />; }
export function Tactile({ children, style, onPress, disabled, ...props }: PressableProps & { children: ReactNode }) {
  return <Pressable {...props} accessibilityRole="button" disabled={disabled} accessibilityState={{ ...props.accessibilityState, disabled: disabled ?? false }} onPress={(event) => {
    if (Platform.OS !== 'web') void Haptics.selectionAsync().catch(() => undefined);
    onPress?.(event);
  }} style={(state) => [styles.tactile, typeof style === 'function' ? style(state) : style, disabled && { opacity: 0.45 }, state.pressed && !disabled && { transform: [{ translateY: 3 }], opacity: 0.88 }]}>{children}</Pressable>;
}
export function Button({ children, onPress, icon = 'arrow', secondary = false }: { children: string; onPress: () => void; icon?: IconName; secondary?: boolean }) {
  return <Tactile onPress={onPress} style={[styles.button, secondary && styles.secondary]}>
    <Label style={[styles.buttonLabel, secondary && { color: colors.violetDark }]}>{children}</Label>
    <Icon name={icon} color={secondary ? colors.violetDark : colors.surface} size={21} />
  </Tactile>;
}
export function OrbitButton({ label, icon, tone, onPress }: { label: string; icon: IconName; tone: Tone; onPress: () => void }) {
  const palette = tones[tone];
  return <Tactile onPress={onPress} accessibilityLabel={label} style={[styles.orbit, { backgroundColor: palette.fill, borderColor: palette.edge }]}>
    <Icon name={icon} color={palette.ink} size={29} />
    <Label variant="small" style={{ color: palette.ink, fontFamily: fonts.bold, textAlign: 'center' }}>{label}</Label>
  </Tactile>;
}
export function Progress({ value, total }: { value: number; total: number }) {
  const fraction = total > 0 ? Math.max(0, Math.min(value / total, 1)) : 0;
  return <View accessibilityRole="progressbar" accessibilityLabel="Spots visitados" accessibilityValue={{ min: 0, max: total, now: value }} style={styles.track}>
    <View style={[styles.fill, { width: `${fraction * 100}%` }]}><View style={styles.shine} /></View>
  </View>;
}
const typography = StyleSheet.create({
  body: { fontSize: 16, lineHeight: 23 }, title: { fontFamily: fonts.display, fontSize: 34, lineHeight: 40 },
  heading: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30 }, small: { fontSize: 13, lineHeight: 18 },
  eyebrow: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 16, letterSpacing: 1.7 },
});
const styles = StyleSheet.create({
  text: { fontFamily: fonts.body, color: colors.ink },
  surface: { padding: space.xl, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.line },
  tactile: { borderWidth: 2, borderBottomWidth: 6, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', minHeight: 48 },
  button: { backgroundColor: colors.violet, borderColor: colors.violetDark, paddingHorizontal: space.xl, paddingVertical: space.md, flexDirection: 'row', gap: space.md, minHeight: 58 },
  buttonLabel: { color: colors.surface, fontFamily: fonts.bold, fontSize: 16 },
  secondary: { backgroundColor: colors.lavender, borderColor: colors.violetEdge },
  orbit: { width: 88, minHeight: 88, padding: space.sm, gap: space.sm, borderRadius: radius.lg },
  track: { width: '100%', height: 14, borderRadius: radius.pill, backgroundColor: colors.line, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.progress, borderRadius: radius.pill, padding: 3 },
  shine: { height: 3, borderRadius: radius.pill, backgroundColor: '#BCE48E' },
});
