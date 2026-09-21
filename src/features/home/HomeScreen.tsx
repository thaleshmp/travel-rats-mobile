import { useState } from 'react';
import { useWardrobe } from '../shop/WardrobeProvider';
import { appearance } from '../shop/catalog';
import { useRouter } from 'expo-router';
import { spots, visited } from '../itinerary/demo';
import { Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import { Traveler } from '../../components/illustrations/Traveler';
import { Button, Label, OrbitButton, Progress, Surface, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts, radius, space } from '../../design-system/tokens';

type Panel = 'spots' | 'passport' | 'style' | 'city';
const titles: Record<Panel, string> = { spots: 'Pequenas grandes descobertas', passport: 'Seu passaporte', style: 'Com a sua cara', city: 'O mundo te espera' };
const outfits = [ { id: 'uva', name: 'Uva', color: colors.violet }, { id: 'forest', name: 'Floresta', color: '#397326' }, { id: 'terra', name: 'Terracota', color: '#C16840' } ];

export default function HomeScreen() {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel | null>(null);
  const { wardrobe, equipItem } = useWardrobe();
  const look = appearance(wardrobe);
  const shirt = look.shirt;
  const { width, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = width < 360 || fontScale > 1.2;
  const close = () => setPanel(null);

  return <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.brand}><View style={styles.brandMark}><Icon name="route" size={21} color={colors.violet} /></View><Label style={styles.wordmark}>travel rats<Label style={{ color: colors.violet }}>.</Label></Label></View>
        <View style={styles.points} accessibilityLabel={`Saldo: ${wardrobe.balance} pontos de demonstração`}><Icon name="star" color={colors.goldInk} size={16} /><Label style={styles.pointsText}>{wardrobe.balance}</Label></View>
      </View>

      <View style={styles.intro}>
        <Tactile onPress={() => setPanel('city')} accessibilityLabel="Escolher cidade. Lisboa, Portugal" style={styles.cityChip}>
          <Icon name="pin" size={15} color={colors.violet} /><Label variant="small" style={styles.cityText}>LISBOA, PORTUGAL</Label><Icon name="chevron" size={13} color={colors.violet} />
        </Tactile>
        <Label variant="title" accessibilityRole="header" style={styles.title}>Bora ganhar o mundo?</Label>
        <Label style={styles.subtitle}>Uma descoberta de cada vez.</Label>
      </View>

      <View style={[styles.playground, compact && styles.compactPlayground]}>
        <View style={styles.orbitArtwork}>
          <Svg width="100%" height="100%" viewBox="0 0 360 340" aria-hidden={true}>
            <Circle cx={180} cy={171} r={108} fill="#F4F0FA" />
            <Ellipse cx={180} cy={186} rx={144} ry={112} stroke="#E5DCEE" strokeWidth={2} strokeDasharray="4 9" fill="none" />
            <Path d="m179 16 3 7 7 3-7 3-3 7-3-7-7-3 7-3ZM302 219l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#E5BC60" />
            <Circle cx={43} cy={179} r={4} fill="#CBB8E8" /><Circle cx={258} cy={52} r={4} fill="#A8CC83" />
          </Svg>
        </View>
        <View style={styles.character} accessible accessibilityLabel="Seu avatar: um ratinho viajante com os acessórios equipados">
          <View style={styles.bubble}><Label variant="small" style={{ fontFamily: fonts.bold }}>Partiu explorar?</Label><View style={styles.bubbleTip} /></View>
          <Traveler size={compact ? 175 : 205} {...look} />
        </View>
        <View style={[styles.orbitLeft, compact && styles.compactOrbit]}>
          <OrbitButton label="Roteiro" icon="route" tone="green" onPress={() => router.push('/roteiro')} />
          <OrbitButton label="Passaporte" icon="passport" tone="gold" onPress={() => setPanel('passport')} />
        </View>
        <View style={[styles.orbitRight, compact && styles.compactOrbit]}>
          <OrbitButton label="Spots" icon="pin" tone="peach" onPress={() => setPanel('spots')} />
          <OrbitButton label="Meu estilo" icon="shirt" tone="violet" onPress={() => setPanel('style')} />
        </View>
      </View>

      <View style={styles.shopShortcut}>
        <OrbitButton label="Loja" icon="store" tone="peach" onPress={() => router.push('/loja')} />
        <View style={{ flex: 1 }}><Label style={{ fontFamily: fonts.bold }}>Seu próximo souvenir</Label><Label variant="small" style={{ color: colors.muted }}>Vista as histórias que você vive.</Label></View>
      </View>

      <View style={styles.adventureHeading}><Label variant="eyebrow" style={{ color: colors.muted }}>SUA AVENTURA ATUAL</Label><Label variant="small" style={styles.demo}>Prévia</Label></View>
      <Surface style={styles.adventure}>
        <View style={styles.cardHeading}>
          <View style={styles.cityStamp}><Icon name="route" color={colors.violet} size={28} /></View>
          <View style={{ flex: 1 }}><Label variant="heading">Olá, Lisboa!</Label><Label variant="small" style={{ color: colors.muted }}>O próximo carimbo está logo ali.</Label></View>
        </View>
        <View style={styles.progressLabel}><Label variant="small" style={{ fontFamily: fonts.bold }}>{visited} de {spots.length} spots</Label><Label variant="small" style={{ color: colors.greenInk }}>Só mais {spots.length - visited} para o ouro</Label></View>
        <Progress value={visited} total={spots.length} />
        <View style={styles.next}><Icon name="pin" size={17} color={colors.muted} /><Label variant="small" style={{ color: colors.muted, flex: 1 }}>Próxima parada: <Label variant="small" style={{ fontFamily: fonts.bold }}>Santa Luzia</Label></Label></View>
        <Button onPress={() => router.push('/roteiro')}>Continuar aventura</Button>
      </Surface>
      <Label variant="small" style={styles.footer}>Vá por curiosidade. Volte com histórias.</Label>
    </ScrollView>

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
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  page: { width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: space.xl, paddingTop: space.lg, paddingBottom: space.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: space.sm },
  brand: { flexDirection: 'row', alignItems: 'center', gap: space.sm }, brandMark: { backgroundColor: colors.lavender, borderRadius: 11, padding: 8 },
  wordmark: { fontFamily: fonts.display, fontSize: 26, letterSpacing: -0.8 },
  points: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.gold }, pointsText: { fontFamily: fonts.bold, color: colors.goldInk, fontSize: 14 },
  intro: { alignItems: 'center', marginTop: space.xl },
  cityChip: { flexDirection: 'row', gap: 6, borderWidth: 0, borderBottomWidth: 0, minHeight: 44, paddingHorizontal: 10 },
  cityText: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.4, color: colors.violet },
  title: { textAlign: 'center', marginTop: space.xs, fontSize: 30, lineHeight: 36 }, subtitle: { color: colors.muted, marginTop: space.xs },
  playground: { height: 330, marginTop: space.sm, justifyContent: 'center', alignItems: 'center' },
  compactPlayground: { height: 'auto', paddingTop: space.lg, gap: space.lg },
  orbitArtwork: { pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  character: { alignItems: 'center', marginTop: 20 },
  bubble: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: 13, paddingHorizontal: 13, paddingVertical: 7, marginBottom: -4, transform: [{ rotate: '-4deg' }] },
  bubbleTip: { position: 'absolute', height: 10, width: 10, backgroundColor: colors.surface, borderRightWidth: 2, borderBottomWidth: 2, borderColor: colors.line, bottom: -6, left: 30, transform: [{ rotate: '45deg' }] },
  orbitLeft: { position: 'absolute', left: 0, top: 58, gap: 65 }, orbitRight: { position: 'absolute', right: 0, top: 58, gap: 65 },
  compactOrbit: { position: 'relative', top: 0, flexDirection: 'row', gap: space.xl },
  shopShortcut: { flexDirection: 'row', gap: space.lg, alignItems: 'center', marginTop: space.md },
  adventureHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: space.lg, marginBottom: space.md },
  demo: { fontSize: 10, color: colors.muted, backgroundColor: colors.line, borderRadius: 5, paddingHorizontal: 6 },
  adventure: { padding: space.lg }, cardHeading: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginBottom: space.lg },
  cityStamp: { width: 54, height: 58, backgroundColor: colors.lavender, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.violetEdge },
  progressLabel: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: space.xs, marginBottom: space.sm },
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
