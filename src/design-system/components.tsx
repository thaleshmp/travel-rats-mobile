import { ReactNode, useState } from 'react';
import { Platform, Pressable, PressableProps, StyleSheet, Text, TextProps, View, ViewProps } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts, radius, space, tones, Tone } from './tokens';
import { Icon, IconName } from './Icon';
export function Label({ variant = 'body', style, ...props }: TextProps & { variant?: 'body' | 'title' | 'heading' | 'small' | 'eyebrow' }) {
  return <Text {...props} style={[styles.text, typography[variant], style]} />;
}
export function Surface({ style, ...props }: ViewProps) { return <View {...props} style={[styles.surface, style]} />; }
export function Tactile({ children, style, onPress, onPressIn, onPressOut, onHoverIn, onHoverOut, disabled, ...props }: PressableProps & { children: ReactNode }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return <Pressable {...props} onHoverIn={(event) => { setHovered(true); onHoverIn?.(event); }} onHoverOut={(event) => { setHovered(false); onHoverOut?.(event); }} onPressIn={(event) => { setPressed(true); onPressIn?.(event); }} onPressOut={(event) => { setPressed(false); onPressOut?.(event); }} accessibilityRole="button" disabled={disabled} accessibilityState={{ ...props.accessibilityState, disabled: disabled ?? false }} onPress={(event) => {
    if (Platform.OS !== 'web') void Haptics.selectionAsync().catch(() => undefined);
    onPress?.(event);
  }} style={[styles.tactile, typeof style === 'function' ? style({ pressed: pressed && !disabled, hovered }) : style, disabled ? { opacity: 0.45 } : null, pressed && !disabled ? { transform: [{ translateY: 3 }], opacity: 0.88 } : null]}>{children}</Pressable>;
}
export function Button({ children, onPress, icon = 'arrow', secondary = false }: { children: string; onPress: () => void; icon?: IconName; secondary?: boolean }) {
  return <Tactile onPress={onPress} style={[styles.button, secondary ? styles.secondary : null]}>
    <Label style={[styles.buttonLabel, secondary ? { color: colors.violetDark } : null]}>{children}</Label>
    <Icon name={icon} color={secondary ? colors.violetDark : colors.surface} size={21} />
  </Tactile>;
}
export function OrbitButton({ label, icon, tone, onPress, compact = false, variant = 'filled' }: { label: string; icon: IconName; tone: Tone; onPress: () => void; compact?: boolean; variant?: 'filled' | 'bare' }) {
  const palette = tones[tone];
  const bare = variant === 'bare';
  return <Tactile onPress={onPress} accessibilityLabel={label} style={[styles.orbit, compact ? { width: 76, minHeight: 72, gap: 4, padding: 6, borderRadius: 20 } : null, { backgroundColor: palette.fill, borderColor: palette.edge }, bare && styles.bareOrbit]}>
    <Icon name={icon} color={palette.ink} size={bare ? 32 : compact ? 24 : 29} />
    <Label variant="small" style={[{ color: palette.ink, fontFamily: fonts.bold, textAlign: 'center' }, bare && styles.bareOrbitLabel]}>{label}</Label>
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
  bareOrbit: { backgroundColor: 'transparent', borderWidth: 0, borderBottomWidth: 0, paddingHorizontal: 0, gap: 6 },
  bareOrbitLabel: { fontSize: 12, lineHeight: 18 },
  track: { width: '100%', height: 14, borderRadius: radius.pill, backgroundColor: colors.line, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.progress, borderRadius: radius.pill, padding: 3 },
  shine: { height: 3, borderRadius: radius.pill, backgroundColor: '#BCE48E' },
});
