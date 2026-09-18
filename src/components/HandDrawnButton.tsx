import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { comicTokens } from '@/src/theme/comicTokens';

interface HandDrawnButtonProps {
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
}

function generateButtonPath(width: number, height: number, roughness = 3) {
  const radius = height / 2;
  const padding = 8;

  let pathData = `M ${radius + padding} ${padding}`;
  pathData += ` L ${width - radius - padding} ${padding + (Math.random() - 0.5) * roughness}`;

  // Right curve
  for (let angle = 0; angle < Math.PI; angle += Math.PI / 8) {
    const x = width - radius - padding + Math.sin(angle) * (radius + (Math.random() - 0.5) * roughness);
    const y = height / 2 + Math.cos(angle) * radius;
    pathData += ` L ${x} ${y}`;
  }

  pathData += ` L ${radius + padding} ${height - padding + (Math.random() - 0.5) * roughness}`;

  // Left curve
  for (let angle = Math.PI; angle < Math.PI * 2; angle += Math.PI / 8) {
    const x = radius + padding + Math.sin(angle) * (radius + (Math.random() - 0.5) * roughness);
    const y = height / 2 + Math.cos(angle) * radius;
    pathData += ` L ${x} ${y}`;
  }

  pathData += ' Z';
  return pathData;
}

export function HandDrawnButton({
  label,
  onPress,
  backgroundColor = comicTokens.colors.primary,
  textColor = comicTokens.colors.black,
  icon,
}: HandDrawnButtonProps) {
  const width = 200;
  const height = 56;
  const pathData = generateButtonPath(width, height, 3);

  return (
    <Pressable onPress={onPress} style={{ alignSelf: 'center', marginVertical: comicTokens.spacing.md }}>
      <View style={{ width, height, position: 'relative' }}>
        <Svg width={width} height={height} style={{ position: 'absolute' }}>
          <Path
            d={pathData}
            stroke={comicTokens.colors.black}
            strokeWidth={comicTokens.border.heavy}
            fill={backgroundColor}
          />
        </Svg>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: comicTokens.spacing.sm,
          }}
        >
          {icon && <Text style={{ fontSize: 24 }}>{icon}</Text>}
          <Text
            style={{
              color: textColor,
              fontSize: 16,
              fontWeight: '900',
              fontFamily: 'Fredoka',
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
