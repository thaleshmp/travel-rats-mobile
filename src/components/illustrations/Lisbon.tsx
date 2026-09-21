import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** A small illustrated postcard, not a geographic map. */
export function Lisbon({ width = 180, height = 110 }: { width?: number; height?: number }) {
  return <Svg width={width} height={height} viewBox="0 0 240 145" aria-hidden>
    <Circle cx={183} cy={35} r={24} fill="#FFE8A0" />
    <Path d="M6 118Q66 57 115 90T234 99v35H6Z" fill="#D7E9BE" />
    <Rect x={27} y={67} width={39} height={58} rx={3} fill="#EFC49F" />
    <Path d="m22 69 25-23 25 23Z" fill="#CA8062" />
    <Rect x={39} y={84} width={10} height={15} rx={3} fill="#FFFAE8" />
    <Rect x={55} y={88} width={51} height={38} rx={3} fill="#F7DBAD" />
    <Path d="m52 88 30-21 29 21Z" fill="#D49970" />
    <Rect x={116} y={45} width={62} height={81} rx={3} fill="#C6B3E6" />
    <Path d="M112 47v-16h12v8h12v-8h12v8h12v-8h12v8h10v8Z" fill="#A28BC7" />
    <Path d="M140 126v-25a10 10 0 0 1 20 0v25" fill="#8D70B5" />
    <Rect x={128} y={60} width={8} height={13} rx={4} fill="#FFF9E8" /><Rect x={157} y={60} width={8} height={13} rx={4} fill="#FFF9E8" />
    <Rect x={184} y={84} width={28} height={41} rx={4} fill="#E8B286" /><Path d="m180 85 18-17 19 17Z" fill="#C78360" />
    <Path d="M7 128h225" stroke="#A1C386" strokeWidth={6} strokeLinecap="round" />
    <Path d="M13 139h46m13 0h56m13 0h81" stroke="#C4DFDE" strokeWidth={5} strokeLinecap="round" />
    <Circle cx={93} cy={47} r={4} fill="#DBCDEB" /><Path d="m209 57 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="#DDB95D" />
  </Svg>;
}
