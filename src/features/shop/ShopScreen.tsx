import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Traveler } from '../../components/illustrations/Traveler';
import { GearArt } from '../../components/illustrations/Wearables';
import { Label, Surface, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts, radius, space } from '../../design-system/tokens';
import { appearance, catalog, Gear, isUnlocked, requirement, ruleProgress } from './catalog';
import { demoTravel, useWardrobe } from './WardrobeProvider';

type Filter = 'Descobrir' | 'Conquistas' | 'Meus itens';
export default function ShopScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, fontScale } = useWindowDimensions();
  const { wardrobe, acquireItem, equipItem } = useWardrobe();
  const [filter, setFilter] = useState<Filter>('Descobrir');
  const [selected, setSelected] = useState<Gear | null>(null);
  const [message, setMessage] = useState('');
  const close = () => { setSelected(null); setMessage(''); };
  const owned = selected ? wardrobe.owned.includes(selected.id) : false;
  const unlocked = selected ? isUnlocked(selected, demoTravel) : false;
  const equipped = selected ? wardrobe.equipped[selected.category] === selected.id : false;
  const affordable = selected ? wardrobe.balance >= selected.price : false;
  const disabled = !selected || equipped || (!owned && (!unlocked || !affordable));
  const actionLabel = !selected ? '' : equipped ? 'Equipado no seu avatar' : owned ? 'Equipar no avatar' : !unlocked ? 'Conquista ainda bloqueada' : !affordable ? `Faltam ${selected.price - wardrobe.balance} pontos` : selected.price === 0 ? 'Resgatar recompensa' : `Comprar por ${selected.price} pontos`;
  const visible = catalog.filter((item) => filter === 'Meus itens' ? wardrobe.owned.includes(item.id) : filter === 'Conquistas' ? !!item.rule : !wardrobe.owned.includes(item.id));
  const compact = width < 360 || fontScale > 1.2;

  return <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Tactile accessibilityLabel="Voltar para a home" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.iconButton}><View style={{ transform: [{ rotate: '180deg' }] }}><Icon name="arrow" size={21} /></View></Tactile>
      <Label style={styles.headerTitle}>Lojinha de viagem</Label>
      <View style={styles.wallet} accessibilityLabel={`Saldo: ${wardrobe.balance} pontos de demonstração`}><Icon name="star" size={16} color={colors.goldInk} /><Label style={styles.walletText}>{wardrobe.balance}</Label></View>
    </View>
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.intro}><Label variant="eyebrow" style={{ color: colors.violet }}>SOUVENIRS PARA VESTIR</Label><Label variant="title" style={styles.center}>Cada viagem deixa um estilo.</Label><Label style={[styles.muted, styles.center]}>Explore lugares. Desbloqueie novas versões de você.</Label></View>
      <View style={[styles.hero, compact && { flexDirection: 'column' }]}>
        <View style={styles.heroCircle} />
        <View style={{ zIndex: 1 }}><Traveler size={145} {...appearance(wardrobe)} /></View>
        <View style={styles.heroCopy}><Label variant="eyebrow" style={{ color: colors.violet }}>SEU VIAJANTE</Label><Label variant="heading">Pronto para a próxima?</Label><Label variant="small" style={styles.muted}>Os itens equipados vão com você para a home.</Label></View>
      </View>
      <Surface style={styles.tip}><Icon name="passport" size={24} color={colors.goldInk} /><View style={{ flex: 1 }}><Label style={{ fontFamily: fonts.bold }}>Algumas lembranças você conquista.</Label><Label variant="small" style={styles.muted}>Complete Paris e ganhe a boina parisiense.</Label></View></Surface>
      <View style={styles.filters}>{(['Descobrir', 'Conquistas', 'Meus itens'] as Filter[]).map((name) => <Tactile key={name} onPress={() => setFilter(name)} accessibilityState={{ selected: filter === name }} style={[styles.filter, filter === name && styles.filterSelected]}><Label variant="small" style={{ fontFamily: fonts.bold, color: filter === name ? colors.violetDark : colors.muted }}>{name}</Label></Tactile>)}</View>
      <View style={styles.section}><Label variant="eyebrow" style={styles.muted}>{filter === 'Meus itens' ? 'SEU GUARDA-ROUPA' : filter === 'Conquistas' ? 'HISTÓRIAS QUE VIRAM RECOMPENSAS' : 'ENCONTRE SEU PRÓXIMO FAVORITO'}</Label><Label variant="small" style={styles.muted}>{visible.length} itens</Label></View>
      <View style={styles.grid}>{visible.map((item) => {
        const hasItem = wardrobe.owned.includes(item.id);
        const available = isUnlocked(item, demoTravel);
        const wearing = wardrobe.equipped[item.category] === item.id;
        const status = wearing ? 'Equipado' : hasItem ? 'No guarda-roupa' : !available ? 'Bloqueado' : item.price === 0 ? 'Resgatar grátis' : `${item.price} pontos`;
        return <Tactile key={item.id} accessibilityLabel={`${item.name}. ${status}. Ver item`} onPress={() => { setSelected(item); setMessage(''); }} style={[styles.item, { width: compact ? '100%' : '48%' }]}>
          <View style={[styles.art, { backgroundColor: item.rule ? colors.lavender : colors.peach }]}><GearArt item={item} /><View style={styles.itemBadge}><Icon name={wearing || hasItem ? 'check' : !available ? 'lock' : item.rule ? 'passport' : 'star'} size={15} color={available ? colors.violetDark : colors.muted} /></View></View>
          <Label style={styles.itemName}>{item.name}</Label>
          <Label variant="small" style={[styles.muted, { flex: 1 }]}>{item.rule ? requirement(item) : 'Essenciais de viagem'}</Label>
          <Label variant="small" style={{ color: !available ? colors.muted : colors.violetDark, fontFamily: fonts.bold }}>{status}</Label>
        </Tactile>;
      })}</View>
      {visible.length === 0 && <Surface><Label>Você já colecionou todos os itens disponíveis por aqui.</Label></Surface>}
      <Label variant="small" style={styles.footer}>Prévia · saldo e conquistas de exemplo. Compras e equipamentos duram esta sessão, sem dinheiro real.</Label>
    </ScrollView>

    <Modal visible={selected !== null} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.modal}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Fechar item" onPress={close} />
        <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(space.xl, insets.bottom) }]}>
          <View style={styles.section}><Label variant="eyebrow" style={{ color: colors.violet }}>{owned ? 'SEU GUARDA-ROUPA' : 'EXPERIMENTE NO AVATAR'}</Label><Tactile onPress={close} accessibilityLabel="Fechar" style={styles.iconButton}><Icon name="close" size={20} /></Tactile></View>
          <ScrollView contentContainerStyle={styles.detail}>
            <View style={styles.fitting}><Traveler size={150} {...appearance(wardrobe, selected ?? undefined)} /><Label variant="small" style={{ color: colors.violetDark }}>{equipped ? 'Seu look atual' : 'Só experimentando · ainda não equipado'}</Label></View>
            <Label variant="heading" accessibilityRole="header">{selected?.name}</Label><Label style={styles.muted}>{selected?.description}</Label>
            {selected?.rule && <Surface style={styles.requirement}><View style={styles.section}><Icon name={unlocked ? 'check' : 'lock'} size={21} color={unlocked ? colors.greenInk : colors.violet} /><Label style={{ flex: 1, fontFamily: fonts.bold }}>{requirement(selected)}</Label></View><Label variant="small" style={styles.muted}>{selected.rule.kind === 'visit' ? (unlocked ? 'Primeiro check-in realizado · pode resgatar!' : 'Nenhum check-in neste destino ainda.') : `${ruleProgress(selected.rule, demoTravel)}% concluído · meta ${selected.rule.target}%${selected.rule.scope === 'country' ? ' das cidades do catálogo' : ' dos spots obrigatórios'}`}</Label><View accessibilityRole="progressbar" accessibilityLabel="Progresso da conquista" accessibilityValue={{ min: 0, max: selected.rule.kind === 'visit' ? 100 : selected.rule.target, now: Math.min(ruleProgress(selected.rule, demoTravel), selected.rule.kind === 'visit' ? 100 : selected.rule.target) }} style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, ruleProgress(selected.rule, demoTravel) / (selected.rule.kind === 'visit' ? 100 : selected.rule.target) * 100)}%` }]} /></View></Surface>}
            {message !== '' && <Label accessibilityLiveRegion="polite" style={{ color: colors.greenInk }}>{message}</Label>}
            <Tactile disabled={disabled} onPress={() => {
              if (!selected || disabled) return;
              if (owned) { equipItem(selected.id); setMessage('Pronto! Seu avatar na home também foi atualizado.'); }
              else { acquireItem(selected.id); setMessage(selected.price ? 'Compra de demonstração concluída. Agora você pode equipar!' : 'Recompensa resgatada! Agora é só equipar.'); }
            }} style={styles.primary}><Label style={styles.primaryLabel}>{actionLabel}</Label></Tactile>
            <Label variant="small" style={[styles.muted, styles.center]}>Saldo de exemplo: {wardrobe.balance} pontos · sem dinheiro real</Label>
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas }, header: { width: '100%', maxWidth: 480, alignSelf: 'center', padding: space.lg, gap: space.sm, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { flex: 1, fontFamily: fonts.bold, fontSize: 16 }, iconButton: { width: 48, height: 48, backgroundColor: colors.surface, borderColor: colors.line }, wallet: { backgroundColor: colors.gold, borderRadius: radius.pill, padding: 9, flexDirection: 'row', gap: 5, alignItems: 'center' }, walletText: { fontFamily: fonts.bold, fontSize: 14, color: colors.goldInk },
  page: { padding: space.xl, paddingTop: space.sm, width: '100%', maxWidth: 480, alignSelf: 'center' }, intro: { alignItems: 'center', gap: space.sm }, center: { textAlign: 'center' }, muted: { color: colors.muted },
  hero: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginVertical: space.xl }, heroCircle: { width: 160, height: 160, borderRadius: radius.pill, backgroundColor: colors.lavender, position: 'absolute', left: -5 }, heroCopy: { flex: 1, gap: space.sm },
  tip: { backgroundColor: colors.gold, borderColor: colors.goldEdge, padding: space.lg, flexDirection: 'row', alignItems: 'center', gap: space.md },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginVertical: space.xl }, filter: { borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: space.md, paddingVertical: space.sm, flexGrow: 1 }, filterSelected: { borderColor: colors.violetEdge, backgroundColor: colors.lavender },
  section: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: space.lg, marginTop: space.lg }, item: { padding: space.md, gap: space.sm, alignItems: 'stretch', justifyContent: 'flex-start', borderColor: colors.line, backgroundColor: colors.surface }, art: { minHeight: 110, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center' }, itemBadge: { position: 'absolute', top: 8, right: 8, borderRadius: radius.pill, backgroundColor: colors.surface, padding: 5 }, itemName: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20 },
  footer: { textAlign: 'center', color: colors.muted, marginTop: space.xl }, modal: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#302C4266' }, sheet: { maxHeight: '92%', maxWidth: 480, width: '100%', backgroundColor: colors.canvas, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: space.xl, gap: space.lg }, detail: { gap: space.lg, paddingBottom: space.sm }, fitting: { alignItems: 'center', backgroundColor: colors.lavender, borderRadius: radius.lg, padding: space.md }, requirement: { padding: space.lg, gap: space.md }, track: { height: 9, borderRadius: 9, backgroundColor: colors.line, overflow: 'hidden' }, fill: { height: '100%', backgroundColor: colors.progress },
  primary: { backgroundColor: colors.violet, borderColor: colors.violetDark, padding: space.lg }, primaryLabel: { fontFamily: fonts.bold, color: colors.surface, textAlign: 'center' },
});
