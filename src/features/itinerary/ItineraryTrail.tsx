import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Label, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';
import { spots } from './demo';
import { PortoTrailBackground } from '../../components/illustrations/PortoTrailBackground';

type Spot = (typeof spots)[number];

export function ItineraryTrail({ onSelect, onNextLayout }: { onSelect: (spot: Spot) => void; onNextLayout: (y: number) => void }) {
  const [width, setWidth] = useState(320);
  const { fontScale } = useWindowDimensions();
  const rowHeight = 178 * Math.max(1, fontScale);
  const stops = spots;
  const nextIndex = spots.findIndex((spot) => !spot.done);
  const [sectionTop, setSectionTop] = useState<number | null>(null);
  const [mapTop, setMapTop] = useState<number | null>(null);
  useEffect(() => {
    if (sectionTop === null || mapTop === null) return;
    onNextLayout(sectionTop + mapTop + Math.max(0, nextIndex) * rowHeight - 3);
  }, [sectionTop, mapTop, nextIndex, rowHeight, onNextLayout]);
  const labelWidth = Math.min(174, width * 0.55);
  const points = stops.map((_, index) => ({
    x: index % 2 === 0 ? labelWidth / 2 : width - labelWidth / 2,
    y: 64 + index * rowHeight,
  }));
  const height = stops.length * rowHeight + 18;

  return <View onLayout={({ nativeEvent }) => setSectionTop(nativeEvent.layout.y)} style={styles.section}>
    <Label variant="eyebrow" style={styles.eyebrow}>A CADA PASSO, UMA DESCOBERTA</Label>
    <Label style={styles.copy}>Siga as curvas. Lisboa está à sua espera.</Label>
    <View onLayout={({ nativeEvent }) => { setWidth(nativeEvent.layout.width); setMapTop(nativeEvent.layout.y); }} style={{ height }}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <PortoTrailBackground width={width} height={height} rowHeight={rowHeight} count={stops.length} />
        <Svg style={StyleSheet.absoluteFill} width={width} height={height} aria-hidden={true}>
          {points.slice(1).map((point, index) => {
            const previous = points[index];
            return <Path key={index} d={`M ${previous.x} ${previous.y} C ${previous.x} ${previous.y + rowHeight * 0.5}, ${point.x} ${point.y - rowHeight * 0.5}, ${point.x} ${point.y}`}
              fill="none" stroke={stops[index].done ? colors.greenEdge : colors.violetEdge} strokeWidth={4} strokeDasharray="5 10" strokeLinecap="round" />;
          })}
        </Svg>
      </View>
      {stops.map((spot, index) => {
        const active = index === nextIndex;
        const point = points[index];
        return <Tactile key={spot.name} onPress={() => onSelect(spot)}
          accessibilityLabel={`${index + 1}. ${spot.name}. ${spot.done ? 'Visitado' : active ? 'Próxima parada' : 'A explorar'}. Ver detalhes`}
          style={[styles.stop, { left: point.x - labelWidth / 2, top: point.y - 38, width: labelWidth }]}>
          {active && <View style={styles.now}><Label variant="eyebrow" style={styles.nowText}>PRÓXIMA PARADA</Label></View>}
          <View style={[styles.node, spot.done && styles.done, active && styles.active]}>
            {spot.done ? <Icon name="check" size={28} color={colors.greenInk} /> : active ? <Icon name="pin" size={30} color={colors.surface} /> : <Label variant="heading" style={{ color: colors.violet }}>{index + 1}</Label>}
          </View>
          <View style={styles.caption}>
            <Label style={[styles.name, active && { color: colors.violetDark }]}>{spot.name}</Label>
            <Label variant="small" style={{ color: spot.done ? colors.greenInk : colors.muted }}>{spot.done ? 'Carimbo conquistado' : active ? 'Vamos explorar →' : '100 pontos'}</Label>
          </View>
        </Tactile>;
      })}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  section: { marginTop: 30 },
  eyebrow: { color: colors.violet, marginBottom: 8 },
  copy: { color: colors.muted, fontSize: 14, marginBottom: 26 },
  stop: { position: 'absolute', borderWidth: 0, borderBottomWidth: 0, gap: 8 },
  node: { width: 76, height: 76, borderRadius: 38, borderWidth: 3, borderBottomWidth: 7, backgroundColor: colors.lavender, borderColor: colors.violetEdge, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: colors.violet, borderColor: colors.violetDark },
  done: { backgroundColor: colors.green, borderColor: colors.greenEdge },
  now: { position: 'absolute', top: -29, backgroundColor: colors.lavender, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  nowText: { fontSize: 9, letterSpacing: 1, color: colors.violetDark },
  caption: { backgroundColor: colors.canvas, borderRadius: 12, paddingHorizontal: 4, paddingVertical: 3, alignItems: 'center', gap: 3 },
  name: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20, textAlign: 'center' },
});
