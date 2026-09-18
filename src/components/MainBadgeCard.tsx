import { Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface MainBadgeCardProps {
  city: string;
  emoji: string;
  color: string;
  description: string;
}

export function MainBadgeCard({ city, emoji, color, description }: MainBadgeCardProps) {
  return (
    <View
      style={{
        marginHorizontal: tokens.spacing.lg,
        marginVertical: tokens.spacing.lg,
        padding: tokens.spacing.xl,
        backgroundColor: tokens.colors.white,
        borderRadius: tokens.borderRadius.xl,
        alignItems: 'center',
        ...tokens.shadows.md,
      }}
    >
      <Text
        style={{
          fontSize: tokens.typography.bodySmall.fontSize,
          fontFamily: 'Nunito',
          color: tokens.colors.neutral[500],
          marginBottom: tokens.spacing.md,
          textTransform: 'uppercase',
          fontWeight: '600',
        }}
      >
        Trophy Equipado
      </Text>

      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: tokens.spacing.lg,
        }}
      >
        <Text style={{ fontSize: 60 }}>{emoji}</Text>
      </View>

      <Text
        style={{
          fontSize: tokens.typography.heading.fontSize,
          fontWeight: '700',
          fontFamily: 'Baloo2',
          color: tokens.colors.neutral[900],
          marginBottom: tokens.spacing.md,
        }}
      >
        {city}
      </Text>

      <Text
        style={{
          fontSize: tokens.typography.body.fontSize,
          color: tokens.colors.neutral[600],
          fontFamily: 'Nunito',
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
