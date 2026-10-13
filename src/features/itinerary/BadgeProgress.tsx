import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Label, Progress, Surface, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';

const badges = [
  { name: 'Cobre', fraction: 1 / 3, fill: '#F6DDC9', edge: '#D5A17B', ink: '#94552E' },
  { name: 'Prata', fraction: 2 / 3, fill: '#E8EDF3', edge: '#BCC8D5', ink: '#596B80' },
  { name: 'Ouro', fraction: 1, fill: colors.gold, edge: colors.goldEdge, ink: colors.goldInk },
] as const;

export function BadgeProgress({ visited, total }: { visited: number; total: number }) {
  const [selected, setSelected] = useState<(typeof badges)[number] | null>(null);
  const insets = useSafeAreaInsets();
  const { fontScale } = useWindowDimensions();
  const railCenter = 34 * Math.max(1, fontScale);
  const target = selected ? Math.ceil(total * selected.fraction) : 0;
  const earned = selected !== null && visited >= target;
  const close = () => setSelected(null);

  return <>
    <Surface style={styles.card}>
      <Label style={{ fontFamily: fonts.bold }}>Seu caminho até o ouro</Label>
      <View style={[styles.milestones, { minHeight: 76 * Math.max(1, fontScale) }]}>
        <View style={[styles.track, { top: railCenter - 7 }]}><Progress value={visited} total={total} /></View>
        {badges.map((badge) => {
          const threshold = Math.ceil(total * badge.fraction);
          const unlocked = visited >= threshold;
          return <Tactile key={badge.name} onPress={() => setSelected(badge)}
            accessibilityLabel={`Medalha de ${badge.name}. ${unlocked ? 'Conquistada' : 'Ainda não conquistada'}. ${threshold} de ${total} visitas. Ver conquista`}
            style={[styles.marker, { left: `${threshold / total * 100}%`, top: railCenter - 22 }]}>
            <View style={[styles.medal, { backgroundColor: badge.fill, borderColor: badge.edge }]}>
              <Icon name="star" color={badge.ink} size={15} />
              <View style={[styles.status, { backgroundColor: unlocked ? colors.green : colors.surface }]}>
                <Icon name={unlocked ? 'check' : 'lock'} size={9} color={unlocked ? colors.greenInk : colors.muted} />
              </View>
            </View>
            <Label variant="small" style={[styles.badgeName, { color: badge.ink }]}>{badge.name}</Label>
            <Label variant="small" style={styles.count}>{threshold}/{total}</Label>
          </Tactile>;
        })}
      </View>
      <Label variant="small" style={{ color: colors.greenInk }}>{visited} de {total} lugares descobertos</Label>
    </Surface>
    <Modal visible={selected !== null} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Fechar conquista" onPress={close} />
        <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(24, insets.bottom) }]}>
          <View style={styles.sheetHeader}>
            <Label variant="eyebrow" style={{ color: colors.violet }}>CONQUISTAS DE LISBOA</Label>
            <Tactile accessibilityLabel="Fechar" onPress={close} style={styles.close}><Icon name="close" size={20} /></Tactile>
          </View>
          <ScrollView contentContainerStyle={styles.details}>
            {selected && <>
              <View style={[styles.largeMedal, { backgroundColor: selected.fill, borderColor: selected.edge }]}><Icon name="star" size={44} color={selected.ink} /></View>
              <Label variant="heading" accessibilityRole="header">Lisboa em {selected.name.toLowerCase()}</Label>
              <Label style={{ color: earned ? colors.greenInk : colors.muted, textAlign: 'center' }}>{earned ? 'Essa medalha já é sua!' : `Faltam ${Math.max(0, target - visited)} visitas para conquistar.`}</Label>
              <Label style={styles.description}>Descubra {target} dos {total} lugares de Lisboa, na ordem que quiser.</Label>
              <View style={{ alignSelf: 'stretch', gap: 8 }}>
                <Progress value={Math.min(visited, target)} total={target} />
                <Label variant="small" style={styles.description}>{Math.min(visited, target)} de {target} visitas · {earned ? 'Conquistada' : 'Em progresso'}</Label>
                <Button onPress={close} icon="check">Continuar explorando</Button>
              </View>
            </>}
          </ScrollView>
        </View>
      </View>
    </Modal>
  </>;
}

const styles = StyleSheet.create({
  card: { padding: 16, gap: 12 },
  milestones: { marginHorizontal: 22 },
  // Both positions use the same centre; captions sit below the rail.
  track: { position: 'absolute', left: 0, right: 0 },
  marker: { position: 'absolute', width: 44, marginLeft: -22, borderWidth: 0, borderBottomWidth: 0, paddingTop: 8, justifyContent: 'flex-start', gap: 1 },
  medal: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  status: { position: 'absolute', right: -4, bottom: -3, width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  badgeName: { fontSize: 11, lineHeight: 15, fontFamily: fonts.bold },
  count: { fontSize: 10, lineHeight: 14, color: colors.muted },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#302C4266' },
  sheet: { width: '100%', maxWidth: 480, maxHeight: '90%', padding: 24, borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: colors.canvas },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 16 },
  close: { width: 48, height: 48, backgroundColor: colors.surface, borderColor: colors.line },
  details: { alignItems: 'center', gap: 16 },
  largeMedal: { width: 94, height: 94, borderRadius: 47, borderWidth: 3, borderBottomWidth: 7, alignItems: 'center', justifyContent: 'center' },
  description: { color: colors.muted, textAlign: 'center' },
});
