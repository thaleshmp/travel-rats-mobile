import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
/** Original geometric traveler; vector artwork scales without image assets. */
export function Traveler({ size = 220, shirt = '#7950D5' }: { size?: number; shirt?: string }) {
  return <Svg width={size} height={size * 1.18} viewBox="0 0 220 260" aria-hidden={true}>
    <Ellipse cx={111} cy={242} rx={67} ry={12} fill="#DDD3EA" opacity={0.6} />
    <Path d="M145 205c57 26 71-8 44-19" stroke="#C8A7CB" strokeWidth={12} strokeLinecap="round" fill="none" />
    <Rect x={139} y={130} width={37} height={71} rx={16} fill="#DB943A" />
    <Rect x={151} y={145} width={27} height={33} rx={10} fill="#F5BB56" />
    <Path d="m82 202-8 30m59-31 9 31" stroke="#514263" strokeWidth={22} strokeLinecap="round" />
    <Path d="M60 235h27m44 0h26" stroke="#7950D5" strokeWidth={18} strokeLinecap="round" />
    <Path d="M68 145c-9 5-17 21-19 36M145 143c15-3 23-18 28-31" stroke="#BFAACF" strokeWidth={20} strokeLinecap="round" />
    <Circle cx={176} cy={105} r={12} fill="#BFAACF" />
    <Path d="M73 139q34-16 69 0l12 62q-43 25-89 0Z" fill={shirt} />
    <Path d="m83 137 5 63" stroke="#EAB151" strokeWidth={9} strokeLinecap="round" />
    <Rect x={79} y={160} width={19} height={11} rx={4} fill="#FFE4A1" />
    <Circle cx={60} cy={65} r={34} fill="#BFAACF" /><Circle cx={60} cy={65} r={21} fill="#EABBD0" />
    <Circle cx={156} cy={61} r={34} fill="#BFAACF" /><Circle cx={156} cy={61} r={21} fill="#EABBD0" />
    <Path d="M58 91c0-53 104-58 104 0v24c-1 39-31 53-53 53s-54-14-54-48Z" fill="#CDBBDD" />
    <Ellipse cx={88} cy={99} rx={14} ry={20} fill="white" /><Ellipse cx={133} cy={99} rx={14} ry={20} fill="white" />
    <Ellipse cx={92} cy={102} rx={6} ry={10} fill="#302C42" /><Ellipse cx={137} cy={102} rx={6} ry={10} fill="#302C42" />
    <Circle cx={94} cy={98} r={2} fill="white" /><Circle cx={139} cy={98} r={2} fill="white" />
    <Ellipse cx={76} cy={126} rx={12} ry={7} fill="#EDB4C8" /><Ellipse cx={145} cy={126} rx={12} ry={7} fill="#EDB4C8" />
    <Path d="M93 134q18 24 36 0" fill="#58426A" /><Path d="M103 135h15v10h-15Z" fill="white" />
    <Path d="M102 119q9-8 18 0-9 17-18 0" fill="#796087" />
    <G stroke="#9D87B1" strokeWidth={3} strokeLinecap="round"><Path d="m58 116-16-4m16 12-17 3m121-11 15-5m-15 14 17 2" /></G>
    <Path d="M67 68q7-41 42-41 36 0 43 41Z" fill="#83BE52" />
    <Path d="M67 68h94" stroke="#55963C" strokeWidth={13} strokeLinecap="round" />
    <Path d="M102 29q-12 14-10 32" stroke="#ACD883" strokeWidth={7} strokeLinecap="round" fill="none" />
  </Svg>;
}
