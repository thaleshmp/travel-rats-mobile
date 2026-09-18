import { Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { CircleButton } from './CircleButton';

interface AvatarWithStatsProps {
  level: number;
  points: number;
  streak: number;
  city: string;
  progress: number; // 0-100
  onCityPress?: () => void;
  onRankingPress?: () => void;
  onProgressPress?: () => void;
}

export function AvatarWithStats({
  level,
  points,
  streak,
  city,
  progress,
  onCityPress,
  onRankingPress,
  onProgressPress,
}: AvatarWithStatsProps) {
  return (
    <View style={{ paddingVertical: tokens.spacing.xl }}>
      {/* Avatar Container */}
      <View
        style={{
          height: 500,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top Left: Level */}
        <View style={{ position: 'absolute', top: 60, left: 30 }}>
          <CircleButton icon="📊" label="Level" value={level} color={tokens.colors.primary} size={60} />
        </View>

        {/* Top Right: Streak */}
        <View style={{ position: 'absolute', top: 60, right: 30 }}>
          <CircleButton icon="🔥" label="Streak" value={streak} color={tokens.colors.accent1} size={60} />
        </View>

        {/* Center: Avatar */}
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: tokens.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...tokens.shadows.md,
            zIndex: 10,
          }}
        >
          <Text style={{ fontSize: 100 }}>🧑‍🚀</Text>
        </View>

        {/* Bottom Left: City */}
        <View style={{ position: 'absolute', bottom: 60, left: 30 }}>
          <CircleButton
            icon="🌍"
            label="Cidade"
            value={city}
            color={tokens.colors.accent2}
            onPress={onCityPress}
            size={60}
          />
        </View>

        {/* Bottom Right: Ranking */}
        <View style={{ position: 'absolute', bottom: 60, right: 30 }}>
          <CircleButton
            icon="🏆"
            label="Ranking"
            value="12º"
            color={tokens.colors.secondary}
            onPress={onRankingPress}
            size={60}
          />
        </View>

        {/* Left Middle: Points */}
        <View style={{ position: 'absolute', left: 15, top: '50%', marginTop: -30 }}>
          <CircleButton icon="💰" label="Pontos" value={points} color="#FFB800" size={60} />
        </View>

        {/* Right Middle: Progress */}
        <View style={{ position: 'absolute', right: 15, top: '50%', marginTop: -30 }}>
          <CircleButton
            icon="⭐"
            label="Progresso"
            value={`${progress}%`}
            color={tokens.colors.secondary}
            onPress={onProgressPress}
            size={60}
          />
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ marginHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.lg }}>
        <View
          style={{
            height: 12,
            backgroundColor: tokens.colors.neutral[200],
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: tokens.colors.primary,
              borderRadius: 6,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: tokens.typography.bodySmall.fontSize,
            color: tokens.colors.neutral[500],
            fontFamily: 'Nunito',
            marginTop: tokens.spacing.sm,
            textAlign: 'center',
          }}
        >
          {progress}% de {city} explorado
        </Text>
      </View>
    </View>
  );
}
