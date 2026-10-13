import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse } from 'react-native-svg';
import { AnimatedTraveler } from '../../components/illustrations/AnimatedTraveler';
import { Traveler } from '../../components/illustrations/Traveler';
import { Button, Label, OrbitButton, Progress, Surface, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts, radius, space } from '../../design-system/tokens';
import { spots, visited } from '../itinerary/demo';
import { appearance } from '../shop/catalog';
import { useWardrobe } from '../shop/WardrobeProvider';

type Panel = 'spots' | 'passport' | 'style' | 'city' | 'checkin';
const titles: Record<Panel, string> = { spots: 'Pequenas grandes descobertas', passport: 'Seu passaporte', style: 'Com a sua cara', city: 'O mundo te espera', checkin: 'Check-in' };
const outfits = [ { id: 'uva', name: 'Uva', color: colors.violet }, { id: 'forest', name: 'Floresta', color: '#397326' }, { id: 'terra', name: 'Terracota', color: '#C16840' } ];

export default function HomeScreen() {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel | null>(null);
  const { wardrobe, equipItem } = useWardrobe();
  const look = appearance(wardrobe);
  const shirt = look.shirt;
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [viewport, setViewport] = useState({ width, height: height - insets.top - insets.bottom });
  const availableHeight = viewport.height;
  const compact = viewport.width < 340 || fontScale > 1.2 || availableHeight < 620;
  const panelHeight = Math.max(218, (availableHeight - 16) * 0.3);
  const topHeight = Math.max(0, availableHeight - 16 - panelHeight);
  const [stageHeight, setStageHeight] = useState(320);
  const avatarSize = Math.max(150, Math.min((stageHeight - 80) / 1.18, (Math.min(viewport.width, 480) - 48) * 0.72));
  const stageWidth = Math.min(viewport.width, 480) - space.xl * 2;
  // The SVG rail and every icon share these coordinates (in layout points).
  const orbitOutset = 24;
  const rail = { cx: stageWidth / 2, cy: (stageHeight - 90) / 2 + 24, rx: (stageWidth - 76) / 2 + orbitOutset, ry: Math.max(0, (stageHeight - 90) / 2 + 16) };
  const orbitActions = [
    { label: 'Roteiro', icon: 'route', tone: 'green', angle: -145, onPress: () => router.push('/roteiro') },
    { label: 'Passaporte', icon: 'passport', tone: 'gold', angle: 150, onPress: () => setPanel('passport') },
    { label: 'Spots', icon: 'pin', tone: 'peach', angle: -40, onPress: () => setPanel('spots') },
    { label: 'Meu estilo', icon: 'shirt', tone: 'violet', angle: 0, onPress: () => setPanel('style') },
    { label: 'Loja', icon: 'store', tone: 'peach', angle: 45, onPress: () => router.push('/loja') },
    { label: 'Check-in', icon: 'pin-check', tone: 'red', angle: 90, onPress: () => setPanel('checkin') },
  ] as const;
  const close = () => setPanel(null);

  return <SafeAreaView style={styles.screen}>
    <View style={styles.viewport} onLayout={({ nativeEvent: { layout } }) => setViewport({ width: layout.width, height: layout.height })}>
    <ScrollView contentContainerStyle={[styles.page, compact ? { minHeight: availableHeight } : { height: availableHeight }]} showsVerticalScrollIndicator={false} bounces={false}>
      <View style={compact ? undefined : { height: topHeight }}>
      <View style={styles.header}>
        <Pressable onLongPress={() => router.push('/design')} style={styles.brand}><View style={styles.brandMark}><Icon name="route" size={21} color={colors.violet} /></View><Label style={styles.wordmark}>travel rats<Label style={{ color: colors.violet }}>.</Label></Label></Pressable>
        <View style={styles.points} accessibilityLabel={`Saldo: ${wardrobe.balance} pontos de demonstração`}><Icon name="star" color={colors.goldInk} size={16} /><Label style={styles.pointsText}>{wardrobe.balance}</Label></View>
      </View>

      <View style={styles.intro}>
        <Tactile onPress={() => setPanel('city')} accessibilityLabel="Escolher cidade. Lisboa, Portugal" style={styles.cityChip}>
          <View style={styles.cityChipRow}>
            <Icon name="pin" size={15} color={colors.violet} /><Label variant="small" style={styles.cityText}>LISBOA, PORTUGAL</Label><Icon name="chevron" size={13} color={colors.violet} />
          </View>
        </Tactile>
        <Label variant="title" accessibilityRole="header" style={styles.title}>Bora ganhar o mundo?</Label>
        <Label style={styles.subtitle}>Uma descoberta de cada vez.</Label>
      </View>

      <View onLayout={(event) => setStageHeight(event.nativeEvent.layout.height)} style={[styles.playground, compact && styles.compactPlayground]}>
        {!compact && <View style={styles.orbitArtwork}>
          <Svg width={stageWidth} height={stageHeight} aria-hidden={true}>
            <Circle cx={rail.cx} cy={avatarSize * 0.65} r={avatarSize * 0.46} fill="#F4F0FA" />
            <Ellipse cx={rail.cx} cy={rail.cy} rx={rail.rx} ry={rail.ry} stroke="#D8C9EC" strokeWidth={2} strokeDasharray="3 7" fill="none" />
          </Svg>
        </View>}
        <View style={styles.character}>
          {compact && <View style={styles.bubble}><Label variant="small" style={{ fontFamily: fonts.bold }}>Partiu explorar?</Label><View style={styles.bubbleTip} /></View>}
          <AnimatedTraveler size={compact ? 190 : avatarSize} active={panel === null} {...look} />
        </View>
        <View pointerEvents="box-none" style={compact ? styles.compactOrbit : [StyleSheet.absoluteFill, { left: -orbitOutset, right: -orbitOutset }]}>
          {orbitActions.map(({ angle, ...action }) => {
            const radians = angle * Math.PI / 180;
            return <View key={action.label} style={compact ? undefined : {
              position: 'absolute',
              left: orbitOutset + rail.cx + rail.rx * Math.cos(radians) - 38,
              top: rail.cy + rail.ry * Math.sin(radians) - 24,
            }}>
              <OrbitButton variant="bare" compact={!compact} {...action} />
            </View>;
          })}
        </View>
      </View>

      </View>

      <View style={compact ? undefined : { height: panelHeight }}>
      <View style={styles.adventureHeading}><Label variant="eyebrow" style={{ color: colors.muted }}>SUA AVENTURA ATUAL</Label><Label variant="small" style={styles.demo}>Prévia</Label></View>
      <Surface style={[styles.adventure, !compact && styles.filledAdventure]}>
        <View style={styles.cardHeading}>
          <View style={styles.cityStamp}><Icon name="route" color={colors.violet} size={28} /></View>
          <View style={{ flex: 1 }}><Label variant="heading">Olá, Lisboa!</Label><Label variant="small" style={{ color: colors.muted }}>Próxima parada: Santa Luzia</Label></View>
        </View>
        <View style={styles.progressGroup}>
        <View style={styles.progressLabel}><Label variant="small" style={{ fontFamily: fonts.bold }}>{visited} de {spots.length} spots</Label><Label variant="small" style={{ color: colors.greenInk }}>Só mais {spots.length - visited} para o ouro</Label></View>
        <Progress value={visited} total={spots.length} />
        </View>

        <Button onPress={() => router.push('/roteiro')}>Continuar aventura</Button>
      </Surface>
      </View>
    </ScrollView>
    </View>

    <Modal visible={panel !== null} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.modalFrame}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityLabel="Fechar painel" accessibilityRole="button" />
        <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, space.xl), maxHeight: '88%' }]}>
          <View style={styles.sheetHeader}><Label variant="eyebrow" style={{ color: colors.violet }}>TRAVEL RATS · PRÉVIA</Label><Tactile onPress={close} accessibilityLabel="Fechar" style={styles.close}><Icon name="close" size={20} /></Tactile></View>
          <ScrollView contentContainerStyle={styles.sheetContent}>
            <Label variant="heading" accessibilityRole="header">{panel ? titles[panel] : ''}</Label>
            {panel === 'spots' && <>
              <Label style={styles.muted}>Um gostinho dos lugares que fazem parte desta aventura.</Label>
              {spots.map((spot, index) => <View key={spot.name} style={styles.spotRow}>
                <View style={[styles.spotNumber, spot.done && { backgroundColor: colors.green }]}>{spot.done ? <Icon name="check" size={19} color={colors.greenInk} /> : <Label style={{ fontFamily: fonts.bold, color: colors.violet }}>{index + 1}</Label>}</View>
                <View style={{ flex: 1 }}><Label style={{ fontFamily: fonts.bold }}>{spot.name}</Label><Label variant="small" style={styles.muted}>{spot.detail}</Label>{spot.done && <Label variant="small" style={{ color: colors.greenInk }}>Visitado · exemplo</Label>}</View>
              </View>)}
            </>}
            {panel === 'passport' && <>
              <Label style={styles.muted}>Cada lugar visitado vira parte da sua história.</Label>
              <Surface style={{ alignItems: 'center', gap: space.md, backgroundColor: colors.gold }}><Icon name="passport" size={54} color={colors.goldInk} /><Label variant="heading">Lisboa · medalha de prata</Label><Label style={{ textAlign: 'center' }}>{visited} spots visitados · 400 pontos</Label><Progress value={visited} total={spots.length} /><Label variant="small">Complete os 12 spots para conquistar o ouro.</Label></Surface>
              <Label variant="small" style={styles.muted}>Conquistas de exemplo para explorar o visual do passaporte.</Label>
            </>}
            {panel === 'style' && <>
              <Label style={styles.muted}>Escolha a camiseta do seu companheiro de viagem.</Label>
              <View style={{ alignItems: 'center' }}><Traveler size={185} {...look} /></View>
              <View style={styles.swatches}>{outfits.map((outfit) => <Tactile key={outfit.name} onPress={() => equipItem(outfit.id)} accessibilityLabel={`Camiseta ${outfit.name}`} accessibilityState={{ selected: shirt === outfit.color }} style={[styles.swatch, { borderColor: shirt === outfit.color ? colors.violet : colors.line }]}><View style={[styles.colorDot, { backgroundColor: outfit.color }]}>{shirt === outfit.color && <Icon name="check" color="white" size={21} />}</View><Label variant="small">{outfit.name}</Label></Tactile>)}</View>
              <Button onPress={close} icon="check">Pronto para explorar</Button>
              <Button secondary icon="store" onPress={() => { close(); router.push('/loja'); }}>Ver meu guarda-roupa</Button>
            </>}
            {panel === 'city' && <><Label style={styles.muted}>Nossa primeira aventura começa em Lisboa.</Label><Surface style={{ gap: space.md }}><Label variant="heading">Lisboa, Portugal</Label><Label>12 spots. Muitas histórias pelo caminho.</Label><Button onPress={close} icon="check">Explorar Lisboa</Button></Surface><Label variant="small" style={styles.muted}>Novas cidades chegam nas próximas aventuras.</Label></>}
            {panel === 'checkin' && <Label style={styles.muted}>Em breve.</Label>}
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  page: { width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: space.xl, paddingTop: space.sm, paddingBottom: space.sm },
  viewport: { flex: 1 },
  progressGroup: { gap: space.sm },
  filledAdventure: { flex: 1, justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: space.sm },
  brand: { flexDirection: 'row', alignItems: 'center', gap: space.sm }, brandMark: { backgroundColor: colors.lavender, borderRadius: 11, padding: 8 },
  wordmark: { fontFamily: fonts.display, fontSize: 26, lineHeight: 40, letterSpacing: -0.8, includeFontPadding: false, textAlignVertical: 'center' },
  points: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.gold }, pointsText: { fontFamily: fonts.bold, color: colors.goldInk, fontSize: 14 },
  intro: { alignItems: 'center', paddingTop: space.md },
  cityChip: { borderWidth: 0, borderBottomWidth: 0, minHeight: 28, paddingHorizontal: 10 },
  cityChipRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cityText: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.4, color: colors.violet },
  title: { textAlign: 'center', marginTop: space.xs, fontSize: 28, lineHeight: 32 }, subtitle: { color: colors.muted, marginTop: space.xs },
  playground: { flex: 1, minHeight: 0, justifyContent: 'flex-start', alignItems: 'center' },
  compactPlayground: { flex: undefined, height: 'auto', paddingTop: space.lg, gap: space.lg },
  orbitArtwork: { pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  character: { alignItems: 'center', marginTop: -10 },
  bubble: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: 13, paddingHorizontal: 13, paddingVertical: 7, marginBottom: -4, transform: [{ rotate: '-4deg' }] },
  bubbleTip: { position: 'absolute', height: 10, width: 10, backgroundColor: colors.surface, borderRightWidth: 2, borderBottomWidth: 2, borderColor: colors.line, bottom: -6, left: 30, transform: [{ rotate: '45deg' }] },
  compactOrbit: { position: 'relative', top: 0, transform: [], width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: space.lg },
  adventureHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0, marginBottom: space.xs },
  demo: { fontSize: 10, color: colors.muted, backgroundColor: colors.line, borderRadius: 5, paddingHorizontal: 6 },
  adventure: { padding: space.lg, gap: space.md }, cardHeading: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginBottom: 0 },
  cityStamp: { width: 44, height: 44, backgroundColor: colors.lavender, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.violetEdge },
  progressLabel: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: space.xs, marginBottom: 0 },
  next: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: space.lg }, footer: { color: colors.muted, textAlign: 'center', marginTop: space.xl },
  modalFrame: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#302C4266' },
  sheet: { backgroundColor: colors.canvas, width: '100%', maxWidth: 480, padding: space.xl, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.md },
  close: { width: 48, height: 48, backgroundColor: colors.surface, borderColor: colors.line },
  sheetContent: { gap: space.lg, paddingBottom: space.sm }, muted: { color: colors.muted },
  spotRow: { flexDirection: 'row', gap: space.md, alignItems: 'center', paddingVertical: space.sm },
  spotNumber: { width: 40, height: 40, backgroundColor: colors.lavender, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center' },
  swatches: { flexDirection: 'row', gap: space.md, justifyContent: 'center', flexWrap: 'wrap' },
  swatch: { padding: space.md, gap: space.sm, backgroundColor: colors.surface, minWidth: 82 },
  colorDot: { width: 36, height: 36, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
});
