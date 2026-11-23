import Svg, { Circle, Path } from 'react-native-svg';
import { StampKind } from './demo';

export function StampMark({ kind, color, size = 34 }: { kind: StampKind; color: string; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}>
    {kind === 'fast' && <><Path d="m23 4-14 19h10l-2 13 14-20H21Z" /><Path d="M4 12h6M3 19h4M5 28h5" /></>}
    {kind === 'tour' && <><Circle cx={20} cy={17} r={12} /><Path d="m14 17 4 4 8-9M12 27l-3 10 10-5m9-5 3 10-10-5" /></>}
    {kind === 'food' && <><Path d="M9 4v11q0 6 7 6V4M12.5 4v33M30 4q-10 8-6 19h6V4v33" /></>}
    {kind === 'river' && <><Path d="M3 26q5-5 10 0t10 0 14 0M3 33q5-5 10 0t10 0 14 0M6 20h28M10 20Q20 2 30 20M7 10h26M12 10v6m8-6v3m8-3v6" /></>}
    {kind === 'beach' && <><Path d="M5 18q13-24 30 0ZM20 7v26M20 7q-7 3-7 11m7-11q7 3 7 11M5 35q15-8 30 0" /><Circle cx={32} cy={6} r={3} /></>}
    {kind === 'view' && <><Path d="m3 32 11-19 10 19m-6-10 7-12 12 22M10 20l4 3 4-3" /><Circle cx={10} cy={7} r={4} /></>}
    {kind === 'culture' && <><Path d="m4 13 16-9 16 9ZM4 34h32M7 30h26M10 17v12m10-12v12m10-12v12" /></>}
    {kind === 'night' && <><Path d="M25 4a15 15 0 1 0 11 23A16 16 0 0 1 25 4Z" /><Path d="m32 6 1 4 4 1-4 1-1 4-1-4-4-1 4-1Z" /></>}
  </Svg>;
}
