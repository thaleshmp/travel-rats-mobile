import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Label, Progress, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';
import { isEarned, passportCountries, PassportCity, Stamp } from './demo';
import { StampMark } from './StampMark';
import { IllustratedStamp, isIllustrated } from './IllustratedStamp';
import { passportStyles } from './PassportScreen';

function CityPage({ city, number, onSelect }: { city: PassportCity; number: number; onSelect: (stamp: Stamp) => void }) {
  const [showPlaces, setShowPlaces] = useState(false);
  const { fontScale } = useWindowDimensions();
  const earned = city.stamps.filter(isEarned).length;
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pageContent}>
    <View style={styles.paper}>
      <View pointerEvents="none" style={styles.spine} />
      <Label variant="eyebrow" style={styles.paperEyebrow}>{city.visited ? 'MEMÓRIAS DE VIAGEM' : 'UMA PÁGINA PARA O FUTURO'}</Label>
      <Label variant="title" accessibilityRole="header" style={styles.cityTitle}>{city.name}</Label>
      <Label style={styles.subtitle}>{city.subtitle}</Label>
      <View style={styles.pageStatus}><Icon name={city.visited ? 'check' : 'lock'} size={16} color={city.visited ? colors.greenInk : colors.muted} /><Label variant="small" style={{ color: city.visited ? colors.greenInk : colors.muted }}>{city.visited ? `${city.places.length} lugares visitados · ${earned} ${earned === 1 ? 'stamp conquistado' : 'stamps conquistados'}` : 'Ainda não visitada · sua coleção começa aqui'}</Label></View>
      <View style={styles.rule} />
      <View style={styles.stamps}>
        {city.stamps.map((stamp, index) => {
          const unlocked = isEarned(stamp);
          const ink = unlocked ? stamp.color : '#99958E';
          const illustrated = isIllustrated(stamp.kind);
          return <View key={stamp.kind} style={{ width: fontScale > 1.3 ? '100%' : '47%', transform: [{ rotate: `${index % 2 ? 3 : -3}deg` }] }}>
            <Tactile onPress={() => onSelect(stamp)} accessibilityLabel={`${stamp.name}. ${unlocked ? 'Conquistado' : 'Bloqueado'}. Ver stamp`} style={[styles.stamp, { borderColor: ink, borderStyle: unlocked ? 'solid' : 'dashed', borderRadius: index % 3 === 0 ? 60 : index % 3 === 1 ? 16 : 30, backgroundColor: unlocked ? `${stamp.color}0A` : '#ECE9E333' }, illustrated && styles.illustratedStamp]}>
              {isIllustrated(stamp.kind) ? <IllustratedStamp kind={stamp.kind} earned={unlocked} /> : <>
                <StampMark kind={stamp.kind} color={ink} />
                <Label style={[styles.stampName, { color: ink }]}>{stamp.name}</Label>
              </>}
              <View style={styles.stampStatus}><Icon name={unlocked ? 'check' : 'lock'} size={11} color={ink} /><Label style={[styles.stampCaption, { color: ink }]}>{unlocked ? 'CONQUISTADO' : 'POR DESCOBRIR'}</Label></View>
            </Tactile>
          </View>;
        })}
      </View>
      <View style={styles.rule} />
      {city.visited ? <>
        <Tactile accessibilityState={{ expanded: showPlaces }} onPress={() => setShowPlaces(!showPlaces)} style={styles.placesToggle}>
          <Label style={{ fontFamily: fonts.bold, color: '#756548', flex: 1 }}>Lugares que viraram história</Label>
          <View style={{ transform: [{ rotate: showPlaces ? '-90deg' : '90deg' }] }}><Icon name="chevron" size={16} color="#756548" /></View>
        </Tactile>
        {showPlaces && <View style={styles.places}>{city.places.map(place => <View key={place} style={styles.place}><Icon name="pin-check" size={17} color={colors.greenInk} /><Label variant="small" style={{ flex: 1 }}>{place}</Label></View>)}</View>}
      </> : <Label variant="small" style={styles.subtitle}>Visite a cidade para começar a colorir esta página. Toque nos stamps para descobrir como conquistá-los.</Label>}
      <Label style={styles.pageNumber}>TRAVEL RATS · {String(number).padStart(2, '0')}</Label>
    </View>
    <Label variant="small" style={styles.demo}>Viagens e conquistas de exemplo.</Label>
  </ScrollView>;
}

export default function CountryPassportScreen() {
  const { country: countryId } = useLocalSearchParams<{ country: string }>();
  const country = passportCountries.find(item => item.id === countryId);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const window = useWindowDimensions();
  const [width, setWidth] = useState(Math.min(window.width, 480));
  const [page, setPage] = useState(0);
  const pageRef = useRef(0);
  const pager = useRef<ScrollView>(null);
  const [selected, setSelected] = useState<{ city: PassportCity; stamp: Stamp } | null>(null);
  const close = () => setSelected(null);
  useEffect(() => { pager.current?.scrollTo({ x: pageRef.current * width, animated: false }); }, [width]);
  function goToPage(index: number) {
    if (!country || index < 0 || index >= country.cities.length) return;
    pageRef.current = index;
    setPage(index);
    pager.current?.scrollTo({ x: index * width, animated: true });
  }
  if (!country) return <SafeAreaView style={styles.screen}><View style={{ padding: 24, gap: 16 }}><Label variant="heading">País não encontrado</Label><Button onPress={() => router.replace('/passaporte')}>Voltar ao passaporte</Button></View></SafeAreaView>;
  return <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Tactile accessibilityLabel="Voltar aos países" onPress={() => router.canGoBack() ? router.back() : router.replace('/passaporte')} style={styles.back}><View style={{ transform: [{ rotate: '180deg' }] }}><Icon name="arrow" size={20} /></View></Tactile>
      <Label style={styles.headerTitle}>{country.flag} {country.name}</Label><Label variant="small" style={styles.preview}>Prévia</Label>
    </View>
    <View style={styles.book} onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}>
      <ScrollView ref={pager} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={({ nativeEvent }) => { const index = Math.max(0, Math.min(country.cities.length - 1, Math.round(nativeEvent.contentOffset.x / width))); pageRef.current = index; setPage(index); }}>
        {country.cities.map((city, index) => <View key={city.id} accessibilityElementsHidden={page !== index} importantForAccessibility={page !== index ? 'no-hide-descendants' : 'auto'} style={{ width, flexShrink: 0 }}><CityPage city={city} number={index + 1} onSelect={stamp => setSelected({ city, stamp })} /></View>)}
      </ScrollView>
    </View>
    <View style={styles.pagination}>
      <Tactile accessibilityLabel="Cidade anterior" disabled={page === 0} onPress={() => goToPage(page - 1)} style={styles.back}><View style={{ transform: [{ rotate: '180deg' }] }}><Icon name="arrow" size={18} /></View></Tactile>
      <View style={{ flex: 1, alignItems: 'center', gap: 3 }}><Label style={{ fontFamily: fonts.bold }}>{country.cities[page].name} · {page + 1}/{country.cities.length}</Label><Label variant="small" style={{ color: colors.muted }}>Deslize para folhear</Label></View>
      <Tactile accessibilityLabel="Próxima cidade" disabled={page === country.cities.length - 1} onPress={() => goToPage(page + 1)} style={styles.back}><Icon name="arrow" size={18} /></Tactile>
    </View>
    <Modal visible={selected !== null} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityRole="button" accessibilityLabel="Fechar detalhes do stamp" onPress={close} />
        <View accessibilityViewIsModal style={[styles.sheet, { paddingBottom: Math.max(24, insets.bottom) }]}>
          <View style={styles.sheetHeader}><Label variant="eyebrow" style={{ color: colors.violet }}>{selected?.city.name.toUpperCase()} · STAMPS</Label><Tactile accessibilityLabel="Fechar" onPress={close} style={styles.back}><Icon name="close" size={20} /></Tactile></View>
          <ScrollView contentContainerStyle={styles.details}>
            {selected && <>
              {isIllustrated(selected.stamp.kind) ? <IllustratedStamp kind={selected.stamp.kind} earned={isEarned(selected.stamp)} height={200} /> : <StampMark kind={selected.stamp.kind} color={isEarned(selected.stamp) ? selected.stamp.color : '#99958E'} size={64} />}
              <Label variant="heading" accessibilityRole="header">{selected.stamp.name}</Label>
              <Label style={{ color: isEarned(selected.stamp) ? colors.greenInk : colors.muted }}>{isEarned(selected.stamp) ? 'Esse stamp já faz parte da sua história!' : 'Uma nova conquista espera por você.'}</Label>
              <Label style={{ color: colors.muted }}>{selected.stamp.rule}</Label>
              <Progress value={Math.min(selected.stamp.progress, selected.stamp.target)} total={selected.stamp.target} />
              <Label variant="small" style={{ color: colors.muted }}>{Math.min(selected.stamp.progress, selected.stamp.target)} de {selected.stamp.target} · {isEarned(selected.stamp) ? 'Conquistado' : 'Em progresso'}</Label>
              <Button onPress={close} icon="passport">Voltar ao passaporte</Button>
            </>}
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  ...passportStyles,
  book: { flex: 1, minHeight: 0, width: '100%', maxWidth: 480, alignSelf: 'center' },
  pageContent: { padding: 16, paddingTop: 6 },
  paper: { backgroundColor: '#FAF4E6', borderRadius: 12, borderWidth: 1, borderColor: '#E4D8BF', borderBottomWidth: 5, padding: 22, paddingLeft: 28, overflow: 'hidden' },
  spine: { position: 'absolute', left: 6, top: 0, bottom: 0, width: 5, backgroundColor: '#E8DCC6', borderRightWidth: 1, borderColor: '#F5EBD7' },
  paperEyebrow: { color: '#9A8766', fontSize: 9, letterSpacing: 1.8 },
  cityTitle: { color: '#514366', marginTop: 8 },
  subtitle: { color: '#897B68', fontSize: 13, lineHeight: 20 },
  pageStatus: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 5, marginTop: 14 },
  rule: { height: 1, backgroundColor: '#E5DAC4', marginVertical: 22 },
  stamps: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 26, paddingVertical: 6 },
  stamp: { borderWidth: 2, borderBottomWidth: 2, borderStyle: 'dashed', paddingHorizontal: 8, paddingVertical: 16, minHeight: 140, gap: 7 },
  illustratedStamp: { borderWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0, paddingVertical: 0, gap: 3 },
  stampName: { fontFamily: fonts.bold, fontSize: 14, lineHeight: 18, textAlign: 'center' },
  stampStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' },
  stampCaption: { fontFamily: fonts.bold, fontSize: 7, lineHeight: 11, letterSpacing: 0.3 },
  placesToggle: { borderWidth: 0, borderBottomWidth: 0, flexDirection: 'row', gap: 8, paddingVertical: 8 },
  places: { gap: 14, paddingVertical: 12 }, place: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pageNumber: { color: '#A18E70', textAlign: 'center', fontSize: 9, letterSpacing: 2, marginTop: 24 },
  demo: { color: colors.muted, textAlign: 'center', marginTop: 12, fontSize: 11 },
  pagination: { width: '100%', maxWidth: 480, alignSelf: 'center', flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 10, gap: 8, alignItems: 'center' },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#302C4266' },
  sheet: { width: '100%', maxWidth: 480, maxHeight: '90%', backgroundColor: colors.canvas, padding: 24, borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  details: { gap: 16, paddingBottom: 8 },
});
