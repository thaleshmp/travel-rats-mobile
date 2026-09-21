import Svg, { G, Path, Rect } from 'react-native-svg';
import { Gear, HatStyle } from '../../features/shop/catalog';
export function Headwear({ style, color }: { style: HatStyle; color: string }) {
  return <G>
    {style === 'cap' && <><Path d="M67 68q7-41 42-41 36 0 43 41Z" fill={color} /><Path d="M67 68h94" stroke={color} strokeWidth={13} strokeLinecap="round" /><Path d="M67 71h94" stroke="black" strokeOpacity={0.15} strokeWidth={7} strokeLinecap="round" /><Path d="M102 29q-12 14-10 32" stroke="white" strokeOpacity={0.3} strokeWidth={7} strokeLinecap="round" fill="none" /></>}
    {style === 'beret' && <><Path d="M61 59c-11-36 91-49 103-15 8 24-65 35-103 15Z" fill={color} /><Path d="M75 66h70" stroke={color} strokeWidth={12} strokeLinecap="round" /><Path d="m118 29 4-12" stroke={color} strokeWidth={7} strokeLinecap="round" /><Path d="M76 44q13-10 30-10" stroke="white" strokeOpacity={0.15} strokeWidth={6} strokeLinecap="round" /></>}
    {style === 'explorer' && <><Path d="m75 65 7-37q24 9 49-2l16 39Z" fill={color} /><Path d="M79 55h64" stroke="#79583C" strokeWidth={9} /><Path d="M59 69q49 10 102 0" stroke={color} strokeWidth={17} strokeLinecap="round" /></>}
  </G>;
}
export function GearArt({ item, size = 88 }: { item: Gear; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
    {item.category === 'hat' && <G transform="translate(-37 0) scale(.8)"><Headwear style={item.hatStyle!} color={item.color} /></G>}
    {item.category === 'shirt' && <><Path d="m33 20-23 16 12 20 12-8v37h33V48l11 8 12-20-23-16q-16 16-34 0Z" fill={item.color} /><Path d="M39 24q11 11 22 0" stroke="white" strokeOpacity={0.5} strokeWidth={5} fill="none" /><Path d="M42 70h18" stroke="white" strokeOpacity={0.25} strokeWidth={5} strokeLinecap="round" /></>}
    {item.category === 'backpack' && <><Path d="M38 26V16h24v10" stroke={item.color} strokeWidth={7} fill="none" /><Rect x={22} y={23} width={56} height={65} rx={17} fill={item.color} /><Rect x={31} y={51} width={38} height={25} rx={8} fill="white" fillOpacity={0.22} /><Path d="M35 60h30" stroke="white" strokeWidth={3} strokeLinecap="round" /></>}
  </Svg>;
}
