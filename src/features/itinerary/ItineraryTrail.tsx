import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Label, Tactile } from '../../design-system/components';
import { Icon } from '../../design-system/Icon';
import { colors, fonts } from '../../design-system/tokens';
import { spots, mockUserLocation } from './demo';
import { formatDistance, orderByProximity } from './proximity';
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
      {nearbySpots.map((spot, index) => <Tactile key={spot.name} onPress={() => onSelect(spot)}
        accessibilityLabel={`${spot.name}. ${formatDistance(spot.distanceMeters)} de distância. ${spot.done ? 'Visitado. 100 pontos ganhos' : 'A explorar. 100 pontos disponíveis'}. Ver detalhes`}
        style={[styles.stop, { left: index % 2 === 0 ? 12 : width - size - 12, top: 20 + index * rowHeight, width: size }]}>
        <View style={[styles.node, { width: size, height: size }]}>
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Svg width={size} height={size} viewBox="0 0 160 166" aria-hidden={true}>
              <Path d={spotShapes[index % spotShapes.length]} transform="translate(0 5)" fill={spot.done ? colors.greenEdge : colors.violetEdge} stroke={spot.done ? colors.greenEdge : colors.violetEdge} strokeWidth={3} />
              <Path d={spotShapes[index % spotShapes.length]} fill={spot.done ? colors.green : colors.lavender} stroke={spot.done ? colors.greenEdge : colors.violetEdge} strokeWidth={3} strokeLinejoin="round" />
            </Svg>
          </View>
          <View style={styles.nodeContent}>
            <Icon name={spot.done ? 'check' : 'pin'} size={22} color={spot.done ? colors.greenInk : colors.violet} />
            <Label style={[styles.name, spot.done && { color: colors.greenInk }]}>{spot.name}</Label>
            <Label variant="small" style={{ color: spot.done ? colors.greenInk : colors.violetDark }}>({formatDistance(spot.distanceMeters)})</Label>
          </View>
        </View>
        <View style={styles.points}>
          <Icon name="star" size={14} color={colors.goldInk} />
          <Label variant="small" style={styles.pointsText}>{spot.done ? '+100 pontos' : '100 pontos'}</Label>
        </View>
      </Tactile>)}
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
