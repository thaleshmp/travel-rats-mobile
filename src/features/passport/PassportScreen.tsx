import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Label, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';
import { hasVisited, isEarned, passportCountries } from './demo';

export default function PassportScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'visited' | 'explore'>('visited');
  const visited = passportCountries.filter(hasVisited);
  const cities = visited.flatMap(country => country.cities.filter(city => city.visited));
  const earned = cities.flatMap(city => city.stamps).filter(isEarned).length;
  const countries = passportCountries.filter(country => tab === 'visited' ? hasVisited(country) : !hasVisited(country));
  return <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Tactile accessibilityLabel="Voltar para a home" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.back}><View style={{ transform: [{ rotate: '180deg' }] }}><Icon name="arrow" size={20} /></View></Tactile>
      <Label style={styles.headerTitle}>Meu passaporte</Label><Label variant="small" style={styles.preview}>Prévia</Label>
    </View>
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      <View style={styles.cover}>
        <View style={styles.coverBorder}>
          <Label variant="eyebrow" style={styles.gold}>TRAVEL RATS · EXPLORER CLUB</Label>
          <View style={styles.emblem}><Icon name="passport" size={48} color={colors.goldEdge} /></View>
          <Label variant="title" style={styles.gold}>O mundo fica em você.</Label>
          <Label style={styles.coverCopy}>Cada lugar, uma história. Cada stamp, uma lembrança.</Label>
          <View style={styles.stats}>{[[visited.length, 'país'], [cities.length, 'cidades'], [earned, 'stamps']].map(([value, label]) => <View key={label} style={styles.stat}><Label variant="heading" style={styles.gold}>{value}</Label><Label variant="small" style={styles.coverCopy}>{label}</Label></View>)}</View>
        </View>
      </View>
      <View style={styles.tabs}>
        {(['visited', 'explore'] as const).map(value => <Tactile key={value} accessibilityState={{ selected: tab === value }} onPress={() => setTab(value)} style={[styles.tab, tab === value && styles.activeTab]}><Label style={{ fontFamily: fonts.bold, color: tab === value ? colors.violetDark : colors.muted }}>{value === 'visited' ? 'Já visitei' : 'Quero conhecer'}</Label></Tactile>)}
      </View>
      <Label variant="heading">{tab === 'visited' ? 'Suas páginas pelo mundo' : 'Onde começa a próxima história?'}</Label>
      <Label style={styles.copy}>{tab === 'visited' ? 'Abra um país para folhear suas cidades e conquistas.' : 'Conheça os stamps que você pode colecionar. Nenhuma visita é necessária para espiar.'}</Label>
      {countries.map(country => {
        const cityCount = country.cities.filter(city => city.visited).length;
        const stamps = country.cities.flatMap(city => city.stamps).filter(isEarned).length;
        return <Tactile key={country.id} accessibilityLabel={`Abrir passaporte de ${country.name}`} onPress={() => router.push({ pathname: '/passaporte/[country]', params: { country: country.id } })} style={styles.country}>
          <View style={styles.flag}><Label style={{ fontSize: 32, lineHeight: 42 }}>{country.flag}</Label></View>
          <View style={{ flex: 1, gap: 3 }}><Label variant="heading">{country.name}</Label><Label variant="small" style={styles.copy}>{country.subtitle}</Label><Label variant="small" style={{ color: cityCount ? colors.greenInk : colors.violet }}>{cityCount ? `${cityCount} cidades visitadas · ${stamps} stamps` : `${country.cities.length} cidades para descobrir`}</Label></View>
          <Icon name="chevron" size={18} color={colors.violet} />
        </Tactile>;
      })}
      <Label variant="small" style={styles.footer}>Coleção de exemplo · suas viagens e conquistas aparecerão aqui.</Label>
    </ScrollView>
  </SafeAreaView>;
}

export const passportStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  header: { width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { width: 48, height: 48, backgroundColor: colors.surface, borderColor: colors.line },
  headerTitle: { flex: 1, fontFamily: fonts.bold, fontSize: 17 },
  preview: { color: colors.muted, backgroundColor: colors.line, borderRadius: 6, paddingHorizontal: 8, fontSize: 11 },
});
const styles = StyleSheet.create({
  ...passportStyles,
  page: { width: '100%', maxWidth: 480, alignSelf: 'center', padding: 24, paddingTop: 8, gap: 14 },
  cover: { backgroundColor: '#43335F', padding: 12, borderRadius: 24, borderLeftWidth: 7, borderLeftColor: '#302342', borderBottomWidth: 6, borderBottomColor: '#302342' },
  coverBorder: { borderWidth: 1, borderColor: '#9F8764', borderRadius: 14, alignItems: 'center', padding: 18, gap: 12 },
  gold: { color: '#F4DBA4', textAlign: 'center' },
  emblem: { width: 82, height: 82, borderRadius: 41, borderWidth: 1, borderColor: '#9F8764', alignItems: 'center', justifyContent: 'center' },
  coverCopy: { color: '#E1D5E9', textAlign: 'center', fontSize: 13, lineHeight: 19 },
  stats: { flexDirection: 'row', width: '100%', borderTopWidth: 1, borderColor: '#796482', paddingTop: 12 },
  stat: { flex: 1, alignItems: 'center' },
  tabs: { flexDirection: 'row', backgroundColor: colors.line, borderRadius: 16, padding: 4, marginTop: 10 },
  tab: { flex: 1, borderWidth: 0, borderBottomWidth: 0, borderRadius: 12, padding: 8 },
  activeTab: { backgroundColor: colors.surface },
  copy: { color: colors.muted },
  country: { flexDirection: 'row', padding: 14, gap: 12, backgroundColor: colors.surface, borderColor: colors.line, alignItems: 'center' },
  flag: { backgroundColor: '#F5F0E6', width: 54, height: 66, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  footer: { color: colors.muted, textAlign: 'center', paddingVertical: 12 },
});
