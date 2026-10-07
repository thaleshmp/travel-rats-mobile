import { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { PanelButton } from '../src/design-system/PanelButton';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Label, OrbitButton, Progress, Surface, Tactile } from '../src/design-system/components';
import { Icon, IconName } from '../src/design-system/Icon';
import { colors, fonts, radius, space, tones, Tone } from '../src/design-system/tokens';

const colorSwatches: { label: string; hex: string }[] = [
  { label: 'canvas', hex: colors.canvas },
  { label: 'surface', hex: colors.surface },
  { label: 'ink', hex: colors.ink },
  { label: 'muted', hex: colors.muted },
  { label: 'line', hex: colors.line },
  { label: 'lavender', hex: colors.lavender },
  { label: 'violet', hex: colors.violet },
  { label: 'violetDark', hex: colors.violetDark },
  { label: 'green', hex: colors.green },
  { label: 'greenInk', hex: colors.greenInk },
  { label: 'peach', hex: colors.peach },
  { label: 'peachInk', hex: colors.peachInk },
  { label: 'gold', hex: colors.gold },
  { label: 'goldInk', hex: colors.goldInk },
  { label: 'red', hex: colors.red },
  { label: 'redInk', hex: colors.redInk },
];

const toneNames = Object.keys(tones) as Tone[];
const iconNames: IconName[] = ['store', 'lock', 'route', 'pin', 'pin-check', 'passport', 'shirt', 'star', 'arrow', 'close', 'check', 'chevron'];
const spaceEntries = Object.entries(space) as [string, number][];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <View style={styles.section}>
    <Label variant="eyebrow" style={styles.sectionTitle}>{title}</Label>
    {children}
  </View>;
}

export default function DesignSystemScreen() {
  const router = useRouter();
  return <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <Label variant="title">Design System</Label>
      <Label style={styles.muted}>Catálogo visual dos tokens e componentes do app.</Label>

      <Section title="TIPOGRAFIA">
        <Surface style={styles.stack}>
          <Label variant="title">Title · Baloo2 34</Label>
          <Label variant="heading">Heading · Baloo2 24</Label>
          <Label variant="body">Body · Nunito 16</Label>
          <Label variant="small">Small · Nunito 13</Label>
          <Label variant="eyebrow">Eyebrow · Nunito 11</Label>
        </Surface>
      </Section>

      <Section title="CORES">
        <View style={styles.grid}>
          {colorSwatches.map((item) => <View key={item.label} style={styles.swatchCard}>
            <View style={[styles.swatch, { backgroundColor: item.hex }]} />
            <Label variant="small" style={{ fontFamily: fonts.bold }}>{item.label}</Label>
            <Label variant="small" style={styles.muted}>{item.hex}</Label>
          </View>)}
        </View>
      </Section>

      <Section title="TONES (fill / ink / edge)">
        <View style={styles.grid}>
          {toneNames.map((tone) => <View key={tone} style={[styles.toneCard, { backgroundColor: tones[tone].fill, borderColor: tones[tone].edge }]}>
            <Label style={{ fontFamily: fonts.bold, color: tones[tone].ink }}>{tone}</Label>
          </View>)}
        </View>
      </Section>

      <Section title="ESPAÇAMENTO (space)">
        <Surface style={styles.stack}>
          {spaceEntries.map(([key, value]) => <View key={key} style={styles.spaceRow}>
            <Label variant="small" style={{ width: 40, fontFamily: fonts.bold }}>{key}</Label>
            <View style={{ height: 12, width: value, backgroundColor: colors.violet, borderRadius: 4 }} />
            <Label variant="small" style={styles.muted}>{value}px</Label>
          </View>)}
        </Surface>
      </Section>

      <Section title="RAIO (radius)">
        <View style={styles.grid}>
          {(Object.entries(radius) as [string, number][]).map(([key, value]) => <View key={key} style={styles.radiusCard}>
            <View style={[styles.radiusBox, { borderRadius: value > 100 ? 32 : value }]} />
            <Label variant="small" style={{ fontFamily: fonts.bold }}>{key}</Label>
            <Label variant="small" style={styles.muted}>{value}</Label>
          </View>)}
        </View>
      </Section>

      <Section title="ÍCONES">
        <View style={styles.grid}>
          {iconNames.map((name) => <View key={name} style={styles.iconCard}>
            <Icon name={name} size={24} color={colors.violet} />
            <Label variant="small" style={styles.muted}>{name}</Label>
          </View>)}
        </View>
      </Section>

      <Section title="BOTÕES">
        <Surface style={styles.stack}>
          <Button onPress={() => {}}>Primário</Button>
          <Button secondary onPress={() => {}}>Secundário</Button>
          <Button icon="store" onPress={() => {}}>Com ícone</Button>
        </Surface>
      </Section>

      <Section title="BOTÃO PAINEL">
        <PanelButton title="Seu próximo souvenir" subtitle="Explorar a loja" icon="store" onPress={() => router.push('/loja')} />
      </Section>

      <Section title="ORBIT BUTTON (tones)">
        <View style={[styles.grid, { gap: space.lg }]}>
          <OrbitButton label="Loja" icon="store" tone="peach" onPress={() => router.push('/loja')} />
          {toneNames.map((tone) => <OrbitButton key={tone} label={tone} icon="star" tone={tone} onPress={() => {}} />)}
        </View>
      </Section>

      <Section title="TACTILE (base)">
        <Tactile onPress={() => {}} style={styles.tactileDemo}>
          <Label style={{ fontFamily: fonts.bold }}>Toque aqui</Label>
        </Tactile>
      </Section>

      <Section title="PROGRESS">
        <Surface style={styles.stack}>
          <Progress value={3} total={10} />
          <Progress value={7} total={10} />
          <Progress value={10} total={10} />
        </Surface>
      </Section>

      <Section title="SURFACE">
        <Surface><Label>Card padrão com borda e sombra inferior sólida.</Label></Surface>
      </Section>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  page: { width: '100%', maxWidth: 480, alignSelf: 'center', padding: space.xl, gap: space.sm },
  muted: { color: colors.muted },
  section: { marginTop: space.xl, gap: space.md },
  sectionTitle: { color: colors.violet },
  stack: { gap: space.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md },
  swatchCard: { width: 96, gap: 4 },
  swatch: { width: '100%', height: 56, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line },
  toneCard: { width: 96, height: 56, borderRadius: radius.sm, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  spaceRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  radiusCard: { width: 96, alignItems: 'center', gap: 4 },
  radiusBox: { width: 56, height: 56, backgroundColor: colors.lavender, borderWidth: 2, borderColor: colors.violetEdge },
  iconCard: { width: 80, alignItems: 'center', gap: 6, padding: space.sm, backgroundColor: colors.surface, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line },
  tactileDemo: { paddingHorizontal: space.xl, paddingVertical: space.md, backgroundColor: colors.surface, alignSelf: 'flex-start' },
});
