import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from './tokens';
export type IconName = 'store' | 'lock' | 'route' | 'pin' | 'passport' | 'shirt' | 'star' | 'arrow' | 'close' | 'check' | 'chevron';
export function Icon({ name, size = 24, color = colors.ink }: { name: IconName; size?: number; color?: string }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
    {name === 'store' && <><Path d="M3 10v11h18V10M2 10l2-7h16l2 7M2 10q3 5 6 0 4 5 8 0 3 5 6 0M8 10l1-7m7 7-1-7" /><Path d="M9 21v-6h6v6" /></>}
    {name === 'lock' && <><Rect x={5} y={10} width={14} height={11} rx={3} /><Path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" /></>}
    {name === 'route' && <><Path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><Path d="M9 3v15M15 6v15" /></>}
    {name === 'pin' && <><Path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><Circle cx={12} cy={10} r={2.5} /></>}
    {name === 'passport' && <><Rect x={5} y={3} width={15} height={19} rx={3} /><Path d="M5 6H3M5 11H3M5 16H3M10 18h5" /><Circle cx={12.5} cy={10} r={3.5} /><Path d="M9 10h7M12.5 6.5c2 2 2 5 0 7-2-2-2-5 0-7Z" /></>}
    {name === 'shirt' && <Path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4c0 4-8 4-8 0Z" />}
    {name === 'star' && <Path fill={color} strokeWidth={1.5} d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" />}
    {name === 'arrow' && <Path d="M4 12h16m-6-6 6 6-6 6" />}
    {name === 'close' && <Path d="m6 6 12 12M6 18 18 6" />}
    {name === 'check' && <Path d="m5 12 4 4L19 6" />}
    {name === 'chevron' && <Path d="m9 5 7 7-7 7" />}
  </Svg>;
}
