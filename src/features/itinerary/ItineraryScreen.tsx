import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Label, Progress, Surface, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts, radius, space } from '../../design-system/tokens';
import { Lisbon } from '../../components/illustrations/Lisbon';
import { spots, visited } from './demo';

type DemoSpot = (typeof spots)[number];

export default function ItineraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showVisited, setShowVisited] = useState(false);
  const [selected, setSelected] = useState<DemoSpot | null>(null);
  const next = spots.find((spot) => !spot.done);
  const close = () => setSelected(null);

  function spotCard(spot: DemoSpot, index: number) {
    const active = spot === next;
    return <View key={spot.name} style={styles.stop}>
      <View style={styles.rail}>
        <View style={[styles.line, spot.done && { backgroundColor: colors.greenEdge }]} />
        <View style={[styles.node, spot.done && styles.doneNode, active && styles.activeNode]}>
          {spot.done ? <Icon name="check" size={19} color={colors.greenInk} /> : <Label style={[styles.nodeText, active && { color: colors.surface }]}>{index + 1}</Label>}
        </View>
      </View>
      <Tactile accessibilityLabel={`${index + 1}. ${spot.name}. ${spot.done ? 'Visitado' : active ? 'Próxima parada' : 'A explorar'}. Ver detalhes`} onPress={() => setSelected(spot)} style={[styles.spotCard, active && styles.activeCard]}>
        {active && <View style={styles.spotTop}><Label variant="eyebrow" style={{ color: colors.violetDark }}>PRÓXIMA PARADA</Label><Icon name="pin" size={17} color={colors.violet} /></View>}
        <Label variant={active ? 'heading' : 'body'} style={!active && { fontFamily: fonts.bold }}>{spot.name}</Label>
        <Label variant="small" style={styles.muted}>{spot.detail}</Label>
        {active ? <View style={styles.spotBottom}><Label variant="small" style={{ color: colors.violetDark, fontFamily: fonts.bold }}>Conhecer este spot</Label><Icon name="arrow" color={colors.violet} size={19} /></View> : <Label variant="small" style={{ color: spot.done ? colors.greenInk : colors.muted }}>{spot.done ? 'Carimbo conquistado' : 'A explorar'} · 100 pontos</Label>}
      </Tactile>
    </View>;
  }

  return <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Tactile accessibilityLabel="Voltar para a home" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.back}><View style={{ transform: [{ rotate: '180deg' }] }}><Icon name="arrow" size={21} /></View></Tactile>
      <Label style={styles.headerTitle}>Meu roteiro</Label><Label variant="small" style={styles.preview}>Prévia</Label>
    </View>
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Label variant="eyebrow" style={{ color: colors.violet }}>PORTUGAL · 12 DESCOBERTAS</Label>
        <Label variant="title" accessibilityRole="header">Lisboa, lá vamos nós!</Label>
        <Label style={styles.muted}>Entre ladeiras, azulejos e boas histórias.</Label>
        <Lisbon width={245} height={148} />
      </View>

      <Surface style={styles.progressCard}>
        <View style={styles.between}><Label style={{ fontFamily: fonts.bold }}>Seu caminho até o ouro</Label><Icon name="star" color={colors.goldInk} size={21} /></View>
        <Progress value={visited} total={spots.length} />
        <View style={styles.between}><Label variant="small" style={{ color: colors.greenInk }}>{visited} de {spots.length} carimbos</Label><Label variant="small" style={styles.muted}>Faltam {spots.length - visited}. Bora?</Label></View>
      </Surface>

      <View style={styles.section}><Label variant="eyebrow" style={styles.muted}>01 · OS PRIMEIROS PASSOS</Label><Icon name="check" size={18} color={colors.greenInk} /></View>
      <Tactile onPress={() => setShowVisited(!showVisited)} accessibilityState={{ expanded: showVisited }} accessibilityLabel={showVisited ? 'Recolher spots visitados' : 'Mostrar 4 spots visitados'} style={styles.visitedToggle}>
        <View style={styles.doneBadge}><Icon name="check" color={colors.greenInk} size={21} /></View>
        <View style={{ flex: 1 }}><Label style={{ fontFamily: fonts.bold }}>Já virou história</Label><Label variant="small" style={styles.muted}>Baixa e Chiado · 4 spots visitados</Label></View>
        <View style={{ transform: [{ rotate: showVisited ? '-90deg' : '90deg' }] }}><Icon name="chevron" size={18} color={colors.greenInk} /></View>
      </Tactile>
      {showVisited && <View style={{ marginTop: space.lg }}>{spots.slice(0, visited).map(spotCard)}</View>}

      <View style={styles.section}><Label variant="eyebrow" style={{ color: colors.violet }}>02 · LISBOA VISTA DE CIMA</Label><Label variant="small" style={styles.chapter}>Agora</Label></View>
      <Label style={styles.chapterCopy}>O melhor da subida? A vista lá de cima.</Label>
      {spots.slice(visited, 8).map((spot, index) => spotCard(spot, index + visited))}

      <View style={styles.section}><Label variant="eyebrow" style={styles.muted}>03 · COLECIONANDO HISTÓRIAS</Label></View>
      <Label style={styles.chapterCopy}>Mais cantinhos para chamar de seus.</Label>
      {spots.slice(8).map((spot, index) => spotCard(spot, index + 8))}

      <Surface style={styles.reward}>
        <View style={styles.medal}><Icon name="star" size={37} color={colors.goldInk} /></View>
        <Label variant="heading">Uma cidade. Sua conquista.</Label>
        <Label style={{ textAlign: 'center', color: colors.goldInk }}>Complete os 12 spots e leve Lisboa em ouro no seu passaporte.</Label>
        <Label variant="small" style={styles.muted}>Ainda faltam {spots.length - visited} carimbos</Label>
      </Surface>
      <Label variant="small" style={styles.footer}>Roteiro e progresso de exemplo · explore no seu ritmo.</Label>
    </ScrollView>

    <Modal visible={selected !== null} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.modal}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Fechar detalhes" onPress={close} />
        <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, space.xl) }]}>
          <View style={styles.between}><Label variant="eyebrow" style={{ color: colors.violet }}>LISBOA · SPOT {selected ? spots.indexOf(selected) + 1 : ''}</Label><Tactile onPress={close} accessibilityLabel="Fechar" style={styles.back}><Icon name="close" size={20} /></Tactile></View>
          <ScrollView contentContainerStyle={styles.detail}>
            <View style={styles.postcard}><Lisbon width={230} height={135} /><Label variant="small" style={{ color: colors.violetDark }}>Um pedacinho de Lisboa</Label></View>
            <Label variant="heading" accessibilityRole="header">{selected?.name}</Label>
            <Label style={styles.muted}>{selected?.detail}</Label>
            <View style={styles.detailBadge}><Icon name={selected?.done ? 'check' : 'star'} color={selected?.done ? colors.greenInk : colors.goldInk} size={20} /><Label style={{ fontFamily: fonts.bold }}>{selected?.done ? 'Visitado · 100 pontos conquistados' : '100 pontos para a sua coleção'}</Label></View>
            <Surface style={styles.notice}><Label style={{ fontFamily: fonts.bold }}>{selected?.done ? 'Esse carimbo já é seu!' : 'O carimbo vem com a visita'}</Label><Label variant="small" style={styles.muted}>{selected?.done ? 'Esta visita faz parte do progresso de exemplo da prévia.' : 'No app completo, você fará o check-in ao chegar ao lugar, com validação por GPS. Por enquanto, explore a prévia do roteiro.'}</Label></Surface>
            <Button onPress={close} secondary icon="route">Voltar ao roteiro</Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  header: { width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: space.xl, paddingVertical: space.md, flexDirection: 'row', alignItems: 'center', gap: space.md },
  back: { width: 48, height: 48, backgroundColor: colors.surface, borderColor: colors.line },
  headerTitle: { flex: 1, fontFamily: fonts.bold, fontSize: 17 }, preview: { color: colors.muted, backgroundColor: colors.line, borderRadius: 6, paddingHorizontal: 8, fontSize: 11 },
  page: { width: '100%', maxWidth: 480, alignSelf: 'center', padding: space.xl, paddingTop: space.sm },
  hero: { alignItems: 'center', gap: space.sm, marginBottom: space.lg },
  muted: { color: colors.muted }, progressCard: { padding: space.lg, gap: space.md },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm },
  section: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm, marginTop: space.xxl, marginBottom: space.md },
  visitedToggle: { flexDirection: 'row', padding: space.md, gap: space.md, borderColor: colors.greenEdge, backgroundColor: colors.surface },
  doneBadge: { width: 39, height: 39, borderRadius: radius.sm, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  chapter: { color: colors.violetDark, backgroundColor: colors.lavender, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8, fontFamily: fonts.bold },
  chapterCopy: { color: colors.muted, fontSize: 14, marginBottom: space.lg },
  stop: { flexDirection: 'row', gap: space.md },
  rail: { width: 32, alignItems: 'center' }, line: { position: 'absolute', top: 0, bottom: 0, width: 3, backgroundColor: colors.line },
  node: { width: 32, height: 32, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', marginTop: space.lg, backgroundColor: colors.line, borderWidth: 3, borderColor: colors.canvas },
  nodeText: { fontFamily: fonts.bold, fontSize: 12, color: colors.muted }, doneNode: { backgroundColor: colors.green }, activeNode: { backgroundColor: colors.violet },
  spotCard: { flex: 1, alignItems: 'stretch', padding: space.lg, gap: space.sm, backgroundColor: colors.surface, borderColor: colors.line, marginBottom: space.lg },
  activeCard: { backgroundColor: colors.lavender, borderColor: colors.violetEdge },
  spotTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: space.sm },
  spotBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm, marginTop: space.sm, paddingTop: space.md, borderTopWidth: 1, borderColor: colors.violetEdge },
  reward: { alignItems: 'center', gap: space.md, backgroundColor: colors.gold, borderColor: colors.goldEdge, marginTop: space.xl },
  medal: { width: 74, height: 74, borderRadius: radius.pill, borderWidth: 4, borderColor: colors.goldEdge, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center' },
  footer: { color: colors.muted, textAlign: 'center', marginTop: space.xl },
  modal: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#302C4266' },
  sheet: { width: '100%', maxWidth: 480, maxHeight: '90%', borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: colors.canvas, padding: space.xl, gap: space.lg },
  detail: { gap: space.lg, paddingBottom: space.sm }, postcard: { alignItems: 'center', padding: space.md, backgroundColor: colors.lavender, borderRadius: radius.lg },
  detailBadge: { flexDirection: 'row', gap: space.sm, alignItems: 'center', flexWrap: 'wrap' }, notice: { padding: space.lg, gap: space.sm },
});
