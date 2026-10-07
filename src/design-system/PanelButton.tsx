import { Pressable, StyleSheet, View } from 'react-native';
import { Label } from './components';
import { Icon, IconName } from './Icon';
import { colors, fonts, radius, space } from './tokens';

/** Full-width action with a title and supporting label. */
export function PanelButton({ title, subtitle, icon, onPress }: { title: string; subtitle: string; icon: IconName; onPress: () => void }) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${title}. ${subtitle}`}>
    {({ pressed }) => <View style={[styles.shopShortcut, pressed ? styles.shopShortcutPressed : null]}>
      <View style={styles.shopShortcutRow}>
        <Icon name={icon} size={30} color={colors.surface} />
        <View style={styles.shopCopy}><Label style={styles.shopTitle}>{title}</Label><Label variant="small" style={styles.shopAction}>{subtitle}</Label></View>
        <Icon name="arrow" size={24} color={colors.surface} />
      </View>
    </View>}
  </Pressable>;
}
const styles = StyleSheet.create({
  shopShortcut: { marginTop: space.xs, padding: space.lg, backgroundColor: colors.violet, borderColor: colors.violetDark, borderWidth: 2, borderBottomWidth: 8, borderRadius: radius.md, minHeight: 92, justifyContent: 'center' },
  shopShortcutPressed: { borderBottomWidth: 3, paddingBottom: space.lg + 5, backgroundColor: colors.violetDark, transform: [{ translateY: 3 }] },
  shopShortcutRow: { width: '100%', flexDirection: 'row', gap: space.md, alignItems: 'center' },
  shopCopy: { flex: 1, gap: space.xs },
  shopTitle: { fontFamily: fonts.bold, color: colors.surface, fontSize: 17, lineHeight: 22 },
  shopAction: { fontFamily: fonts.body, color: colors.surface },
});
