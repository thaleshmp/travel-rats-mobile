import { useId } from 'react';
import Svg, { Circle, Defs, Ellipse, G, Path, Pattern, Rect } from 'react-native-svg';

function House({ x, y, fill, height = 62 }: { x: number; y: number; fill: string; height?: number }) {
  return <G transform={`translate(${x} ${y})`}>
    <Rect width={29} height={height} rx={2} fill={fill} />
    <Path d="M-3 0 14-14 32 0Z" fill="#DCB9A4" />
    {[12, 31].map((wy) => <G key={wy} fill="#FFFEFA"><Rect x={6} y={wy} width={6} height={10} rx={1} /><Rect x={18} y={wy} width={6} height={10} rx={1} /></G>)}
    <Rect x={11} y={height - 15} width={8} height={15} rx={3} fill="#C0B7AE" />
  </G>;
}

/** Decorative Porto-inspired scenery, not a geographic map. */
export function PortoTrailBackground({ width, height, rowHeight, count }: { width: number; height: number; rowHeight: number; count: number }) {
  const tileId = `porto-tiles-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const tiles = `url(#${tileId})`;
  const scale = width / 360;
  return <Svg width={width} height={height} aria-hidden={true}>
    <Defs>
      <Pattern id={tileId} width={10} height={10} patternUnits="userSpaceOnUse">
        <Rect width={10} height={10} fill="#EDF3F7" stroke="#CADAE8" strokeWidth={0.6} />
        <Path d="M5 1 9 5 5 9 1 5Z" fill="none" stroke="#8CAEC9" strokeWidth={0.8} />
        <Circle cx={5} cy={5} r={1.4} fill="#789FBE" />
      </Pattern>
    </Defs>
    <Rect width={width} height={height} rx={26} fill="#FAF8F1" />
    {Array.from({ length: Math.ceil(count / 2) }, (_, index) => <G key={index} transform={`translate(0 ${index * rowHeight * 2}) scale(${scale})`}>
      <Path d="M186 98Q238 20 354 43V148Q267 161 186 98Z" fill="#EEF0DD" />
      <Path d="M0 210Q55 178 122 238L100 310H0Z" fill="#EEF0DD" />
      {index % 3 === 1 ? <G transform="translate(233 13)">
        <Rect x={18} y={27} width={34} height={84} rx={3} fill="#E4DAC8" />
        <Rect x={12} y={60} width={46} height={7} rx={2} fill="#CFBFA9" />
        <Rect x={15} y={25} width={40} height={7} rx={2} fill="#CFBFA9" />
        <Path d="M21 24V13Q35-10 49 13V24Z" fill="#CBBFAF" />
        <Path d="M30 19V11h10v8M28 56V44a7 7 0 0 1 14 0v12" fill="#FFFEFA" />
        <Rect x={29} y={82} width={13} height={29} rx={6} fill="#C8BCAA" />
        <House x={58} y={66} height={45} fill="#E4D4C6" />
      </G> : index % 3 === 2 ? <G transform="translate(211 31)">
        <Rect x={5} y={30} width={116} height={67} rx={3} fill={tiles} />
        <Path d="M0 31 63 0 126 31Z" fill="#D8E4ED" stroke="#AAC2D4" strokeWidth={2} />
        <Rect x={0} y={94} width={126} height={6} rx={2} fill="#D5CDBF" />
        <Path d="M52 94V68a11 11 0 0 1 22 0v26Z" fill="#B5C9D8" stroke="#FFFEFA" strokeWidth={3} />
        <Circle cx={63} cy={24} r={8} fill="#FFFEFA" stroke="#AAC2D4" strokeWidth={2} />
        {[19, 92].map((x) => <Rect key={x} x={x} y={44} width={15} height={25} rx={7} fill="#FFFEFA" stroke="#AAC2D4" strokeWidth={2} />)}
      </G> : <G>
        <House x={206} y={57} height={61} fill="#EAD9BD" />
        <House x={239} y={36} height={82} fill={tiles} />
        <House x={272} y={49} height={69} fill="#E8CEC3" />
        <House x={305} y={62} height={56} fill="#DDD3E8" />
        <Path d="M199 121H344" stroke="#D3D8BF" strokeWidth={5} strokeLinecap="round" />
      </G>}
      {index % 2 === 1 ? <G transform="translate(14 210)">
        <Rect x={6} y={2} width={55} height={49} rx={4} fill={tiles} stroke="#B9CEDD" strokeWidth={2} />
        <Path d="M2 3Q33-17 65 3Z" fill="#CFDFEB" />
        <Circle cx={34} cy={27} r={4} fill="#A8BECD" />
        <Path d="M34 31v13" stroke="#B4DCE2" strokeWidth={3} strokeLinecap="round" />
        <Path d="M10 45h48l-7 14H17Z" fill="#C9DCE4" />
        <Ellipse cx={34} cy={62} rx={31} ry={5} fill="#E2E7DD" />
        <Path d="M77 37h26m-26 7h26m-22 0v11m18-11v11" stroke="#D1BFA7" strokeWidth={4} strokeLinecap="round" />
      </G> : <G transform="translate(19 220)">
        <Rect x={21} y={14} width={5} height={43} rx={2} fill="#DBCCB5" />
        <Circle cx={23} cy={12} r={18} fill="#DCE5CA" />
        <Circle cx={40} cy={24} r={13} fill="#E4EAD7" />
        <Ellipse cx={30} cy={59} rx={27} ry={5} fill="#E8E7D9" />
      </G>}
      {index % 2 === 0 && <G transform="translate(0 267)">
        <Path d="M0 24Q90-10 182 21T360 13V61Q265 83 173 53T0 64Z" fill="#E0EEF0" />
        <Path d="M14 41h37m14-7h32m172 13h41m12-13h24" stroke="#F7FBF9" strokeWidth={3} strokeLinecap="round" />
        <G stroke="#BBCDD0" strokeWidth={3} fill="none">
          <Path d="M116 13H260M116 21H260M120 64Q187-22 256 64M128 21v32m24-32v12m24-12v4m24-4v4m24-4v13m24-13v32" />
          <Path d="M120 13V1m136 12V1" />
        </G>
        <Path d="m42 57 7 7h32l8-7Z" fill="#C9BCA8" /><Path d="M65 57V39l14 15H65" fill="#E5D6B9" />
      </G>}
    </G>)}
  </Svg>;
}
