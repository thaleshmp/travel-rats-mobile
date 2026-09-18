import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { comicTokens } from '@/src/theme/comicTokens';
import { useState } from 'react';

interface HandDrawnCardProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  onPress?: () => void;
  style?: any;
}

function generateWobblyPath(width: number, height: number, roughness = 3) {
  const padding = 8;
  const points: [number, number][] = [];

  for (let x = padding; x <= width - padding; x += 20) {
    points.push([x, padding + (Math.random() - 0.5) * roughness]);
  }
  points.push([width - padding, padding + (Math.random() - 0.5) * roughness]);

  for (let y = padding; y <= height - padding; y += 20) {
    points.push([width - padding + (Math.random() - 0.5) * roughness, y]);
  }
  points.push([width - padding + (Math.random() - 0.5) * roughness, height - padding]);

  for (let x = width - padding; x >= padding; x -= 20) {
    points.push([x, height - padding + (Math.random() - 0.5) * roughness]);
  }
  points.push([padding + (Math.random() - 0.5) * roughness, height - padding + (Math.random() - 0.5) * roughness]);

  for (let y = height - padding; y >= padding; y -= 20) {
    points.push([padding + (Math.random() - 0.5) * roughness, y]);
  }
  points.push([padding + (Math.random() - 0.5) * roughness, padding]);

  let pathData = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i][0]} ${points[i][1]}`;
  }
  pathData += ' Z';

  return pathData;
}

export function HandDrawnCard({
  children,
  backgroundColor = comicTokens.colors.white,
  borderColor = comicTokens.colors.black,
  onPress,
  style,
}: HandDrawnCardProps) {
  const [dimensions, setDimensions] = useState({ width: 300, height: 100 });
  const pathData = generateWobblyPath(dimensions.width, dimensions.height, 4);

  const content = (
    <View
      onLayout={(e) => {
        setDimensions({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height + 20,
        });
      }}
      style={[
        {
          position: 'relative',
          marginVertical: comicTokens.spacing.md,
        },
        style,
      ]}
    >
      <Svg
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Path
          d={pathData}
          stroke={borderColor}
          strokeWidth={comicTokens.border.heavy}
          fill={backgroundColor}
        />
      </Svg>
      <View style={{ padding: comicTokens.spacing.lg, paddingTop: comicTokens.spacing.lg + 4 }}>
        {children}
      </View>
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}
