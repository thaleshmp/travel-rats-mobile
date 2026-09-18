import { Pressable, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { Button } from './Button';

interface BadgeCardProps {
  city: string;
  emoji: string;
  color: string;
  unlocked: boolean;
  onPress?: () => void;
}

export function BadgeCard({ city, emoji, color, unlocked, onPress }: BadgeCardProps) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: tokens.colors.white,
          borderRadius: tokens.borderRadius.lg,
          padding: tokens.spacing.lg,
          ...tokens.shadows.sm,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: tokens.spacing.md,
            opacity: unlocked ? 1 : 0.4,
          }}
        >
          <Text style={{ fontSize: 40 }}>{emoji}</Text>
        </View>

        <Text
          style={{
            fontSize: tokens.typography.subheading.fontSize,
            fontWeight: '700',
            fontFamily: 'Baloo2',
            color: tokens.colors.neutral[900],
            textAlign: 'center',
            marginBottom: tokens.spacing.sm,
          }}
        >
          {city}
        </Text>

        <Text
          style={{
            fontSize: tokens.typography.bodySmall.fontSize,
            color: tokens.colors.neutral[500],
            fontFamily: 'Nunito',
            marginBottom: tokens.spacing.md,
          }}
        >
          {unlocked ? 'Desbloqueada' : 'Bloqueada'}
        </Text>

        <View style={{ width: '100%' }}>
          <Button disabled={!unlocked} variant={unlocked ? 'primary' : 'secondary'}>
            {unlocked ? 'Equipada' : 'Bloquear'}
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
