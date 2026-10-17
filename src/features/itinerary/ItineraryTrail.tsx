import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Label, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';
import { spots, mockUserLocation } from './demo';
import { canCheckIn, formatDistance, orderByProximity } from './proximity';
import { PortoTrailBackground } from '../../components/illustrations/PortoTrailBackground';

const nearbySpots = orderByProximity(spots, mockUserLocation);

type Spot = (typeof spots)[number];

// Rounded silhouettes alternate independently of a spot's visit status.
const spotShapes = [
  'M80 3a77 77 0 1 1 0 154 77 77 0 1 1 0-154Z',
  'M49 7C81-4 132 9 148 38C164 66 157 112 135 137C113 162 56 162 27 142C0 124-1 87 9 55C16 29 27 15 49 7Z',
  'M38 7C65 1 111 1 135 15C158 28 158 58 154 86C150 113 151 140 127 150C101 161 59 155 32 151C8 147 2 123 5 94L9 44C11 22 20 11 38 7Z',
  'M78 5C111-2 144 20 152 49C162 79 148 104 132 128C115 152 83 161 53 151C23 143 4 122 5 91C5 64 15 45 35 36C53 27 55 10 78 5Z',
];

export function ItineraryTrail({ onSelect }: { onSelect: (spot: Spot) => void }) {
  const [width, setWidth] = useState(320);
  const { fontScale } = useWindowDimensions();
  const size = Math.min(width - 24, 150 * Math.max(1, fontScale));
  const rowHeight = Math.max(190, size + 54);
  const height = spots.length * rowHeight + 24;

  return <View style={styles.section}>
    <Label variant="eyebrow" style={styles.eyebrow}>LISBOA, NO SEU RITMO</Label>
    <Label style={styles.copy}>Mais perto de você, na ordem que preferir.</Label>
    <Label variant="small" style={styles.locationNote}>Localização simulada · distâncias em linha reta</Label>
    <View onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)} style={{ height }}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <PortoTrailBackground width={width} height={height} rowHeight={rowHeight} count={spots.length} />
      </View>
      {nearbySpots.map((spot, index) => {
        const ready = canCheckIn(spot);
        const fill = spot.done ? colors.green : ready ? colors.violet : colors.lavender;
        const edge = spot.done ? colors.greenEdge : ready ? colors.violetDark : colors.violetEdge;
        const ink = spot.done ? colors.greenInk : ready ? colors.surface : colors.violetDark;
        return <Tactile key={spot.name} onPress={() => onSelect(spot)}
        accessibilityLabel={`${spot.name}. ${formatDistance(spot.distanceMeters)} de distância. ${spot.done ? 'Visitado. 100 pontos ganhos' : ready ? 'Check-in disponível nesta prévia. 100 pontos disponíveis' : 'A explorar. 100 pontos disponíveis'}. Ver detalhes`}
        style={[styles.stop, { left: index % 2 === 0 ? 12 : width - size - 12, top: 20 + index * rowHeight, width: size }]}>
        <View style={[styles.node, { width: size, height: size }]}>
          {ready && <View pointerEvents="none" style={{ position: 'absolute', left: -12, top: -12 }}>
            <Svg width={size + 24} height={size + 24} viewBox="-12 -12 184 190" aria-hidden={true}>
              <Path d={spotShapes[index % spotShapes.length]} fill="none" stroke="#B697EE" strokeWidth={24} opacity={0.09} />
              <Path d={spotShapes[index % spotShapes.length]} fill="none" stroke="#B697EE" strokeWidth={16} opacity={0.16} />
              <Path d={spotShapes[index % spotShapes.length]} fill="none" stroke="#C8AEF7" strokeWidth={8} opacity={0.45} />
            </Svg>
          </View>}
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Svg width={size} height={size} viewBox="0 0 160 166" aria-hidden={true}>
              <Path d={spotShapes[index % spotShapes.length]} transform="translate(0 5)" fill={edge} stroke={edge} strokeWidth={3} />
              <Path d={spotShapes[index % spotShapes.length]} fill={fill} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
              {ready && <Path d={spotShapes[index % spotShapes.length]} transform="translate(4 4) scale(.95)" fill="none" stroke="#E1CFFF" strokeWidth={2} opacity={0.65} />}
            </Svg>
          </View>
          <View style={styles.nodeContent}>
            <Icon name={spot.done ? 'check' : ready ? 'pin-check' : 'pin'} size={22} color={ink} />
            <Label style={[styles.name, { color: ink }]}>{spot.name}</Label>
            <Label variant="small" style={{ color: ink }}>({formatDistance(spot.distanceMeters)})</Label>
          </View>
          {ready && <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex: 2 }]}>
            <Svg width={size} height={size} viewBox="0 0 160 166" aria-hidden={true}>
              <Path d="m136 12 3 8 8 3-8 3-3 8-3-8-8-3 8-3ZM17 116l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#FFE5A0" stroke="#FFFEFA" strokeWidth={1} />
            </Svg>
          </View>}
        </View>
        <View style={styles.points}>
          <Icon name="star" size={14} color={colors.goldInk} />
          <Label variant="small" style={styles.pointsText}>{spot.done ? '+100 pontos' : '100 pontos'}</Label>
        </View>
      </Tactile>;
      })}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  section: { marginTop: 30 },
  eyebrow: { color: colors.violet, marginBottom: 8 },
  copy: { color: colors.muted, fontSize: 14, marginBottom: 4 },
  locationNote: { color: colors.muted, fontSize: 11, marginBottom: 22 },
  stop: { position: 'absolute', borderWidth: 0, borderBottomWidth: 0, gap: 8 },
  node: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 19, paddingTop: 13, paddingBottom: 19, gap: 5 },
  nodeContent: { zIndex: 1, alignItems: 'center', gap: 5, width: '100%' },
  points: { backgroundColor: colors.gold, borderRadius: 12, paddingHorizontal: 9, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 5 },
  pointsText: { color: colors.goldInk, fontFamily: fonts.bold },
  name: { fontFamily: fonts.bold, fontSize: 14, lineHeight: 18, color: colors.violetDark, textAlign: 'center' },
});
