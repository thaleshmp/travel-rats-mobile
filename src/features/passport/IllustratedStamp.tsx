import { useId } from 'react';
import Svg, { Circle, Defs, Ellipse, G, Path, Text, TextPath } from 'react-native-svg';

export type IllustratedKind = 'food' | 'beach' | 'river';
export function isIllustrated(kind: string): kind is IllustratedKind {
  return kind === 'food' || kind === 'beach' || kind === 'river';
}

/** Vector interpretation of the supplied passport stamps. */
export function IllustratedStamp({ kind, earned, height = 144 }: { kind: IllustratedKind; earned: boolean; height?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const paper = '#FAF4E6';
  const ink = (color: string) => earned ? color : '#929188';
  const blue = ink('#205C7B');
  const teal = ink('#188C89');
  const brown = ink('#794420');
  const red = ink('#B73F32');
  const green = ink('#5F893F');
  const ring = kind === 'food' ? blue : kind === 'beach' ? teal : brown;
  return <Svg width="100%" height={height} viewBox="0 0 180 180" aria-hidden={true}>
    <Defs>
      <Path id={`top-${id}`} d="M26 89a64 64 0 0 1 128 0" />
      <Path id={`bottom-${id}`} d="M22 92a68 68 0 0 0 136 0" />
    </Defs>
    <Circle cx={90} cy={90} r={85} fill={paper} stroke={ring} strokeWidth={3} />
    <Circle cx={90} cy={90} r={80} fill="none" stroke={ring} strokeWidth={1.5} />
    <Text fill={kind === 'food' ? red : ring} fontSize={23} fontWeight="900" fontFamily="sans-serif" letterSpacing={0.6} textAnchor="middle">
      <TextPath href={`#top-${id}`} startOffset="50%">{kind === 'food' ? 'CULINARY' : kind === 'beach' ? 'BEACH' : 'RIVER'}</TextPath>
    </Text>
    <Text fill={kind === 'food' ? green : kind === 'beach' ? red : blue} fontSize={21} fontWeight="900" fontFamily="sans-serif" letterSpacing={0.4} textAnchor="middle">
      <TextPath href={`#bottom-${id}`} startOffset="50%">{kind === 'food' ? 'EXPERT' : 'ADDICTED'}</TextPath>
    </Text>
    {kind === 'food' && <G strokeLinecap="round" strokeLinejoin="round">
      <Path d="M44 57q-20 33 0 65M136 57q20 33 0 65" fill="none" stroke={green} strokeWidth={2} />
      <Path d="M75 79q-18-2-11-18 6-12 18-4 6-16 20-9 9 4 9 14 14-1 12 11-1 10-17 7l-1 18H77Z" fill={paper} stroke={blue} strokeWidth={2.5} />
      <Path d="M77 87q15-4 29 0M83 78v-7m16 7 1-7" fill="none" stroke={blue} strokeWidth={2} />
      <Path d="m53 96 68 43M64 88l-7 11m2-15-7 11m2-15-7 11m2-15-6 10" stroke={blue} strokeWidth={3} />
      <Path d="m61 138 58-43" stroke={blue} strokeWidth={6} />
      <Ellipse cx={124} cy={90} rx={12} ry={7} transform="rotate(-35 124 90)" fill={blue} />
    </G>}
    {kind === 'beach' && <G strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={90} cy={91} r={49} fill={earned ? '#F8E69B' : '#E4E2D6'} />
      <Path d="M42 112q7-7 14 0t14 0 14 0 14 0 14 0 14 0 14 0v14q-45 28-94 0Z" fill={teal} />
      <Path d="M48 120q7 8 14 0t14 0 14 0 14 0 14 0 14 0M57 130q7 8 14 0t14 0 14 0 14 0 14 0" fill="none" stroke={paper} strokeWidth={2} />
      <Path d="M59 115q-1-27 12-46l-7 47Z" fill={brown} />
      <Path d="M70 71Q44 42 36 75q13-9 30-1Q44 62 43 91q13-10 25-17Q57 46 77 48l-4 22q18-29 34-10-18 0-32 13 27-12 32 10-17-8-32-8 14 6 13 24-9-15-18-23Z" fill={teal} />
      <Circle cx={117} cy={82} r={12} fill={red} />
      {Array.from({ length: 10 }, (_, index) => <Path key={index} d="m117 62-3-7h6Z" fill={red} transform={`rotate(${index * 36} 117 82)`} />)}
      <Path d="M136 49q26 30 10 61M35 85q-5 23 7 38" fill="none" stroke={red} strokeWidth={2} />
    </G>}
    {kind === 'river' && <G strokeLinejoin="round" strokeLinecap="round">
      <Path d="M45 72 67 48 80 61 103 46 139 74v40q-11 23-48 25-37-2-49-25Z" fill={brown} />
      <Path d="m45 72 22-24 13 13 23-15 36 28-21-11-8 8-12-14-14 16-17-15-9 17Z" fill={blue} stroke={paper} strokeWidth={2} />
      <Path d="m89 76 14 1q-37 9-7 15 33 6 3 17-24 8 10 15l11 10q-22 12-45 1-33-18 8-29 21-6-4-10-29-7 10-20Z" fill={ink('#76B7C3')} stroke={paper} strokeWidth={1.5} />
      <Path d="M67 117q22 10 49 0l-7 10H78Z" fill={brown} />
      <Circle cx={95} cy={106} r={4} fill={brown} />
      <Path d="m95 111 5 8m-4-6-9 7m-3-9 21 23" fill="none" stroke={brown} strokeWidth={3} />
      <Path d="M39 52q-17 30-7 58M145 56q13 26 6 50" stroke={blue} strokeWidth={2} fill="none" />
    </G>}
  </Svg>;
}
