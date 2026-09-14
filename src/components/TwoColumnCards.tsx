import { Pressable, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface ColumnCard {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress?: () => void;
}

interface TwoColumnCardsProps {
  left: ColumnCard;
  right: ColumnCard;
}

function ColumnCardComponent({ icon, title, subtitle, color, onPress }: ColumnCard) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: tokens.colors.white,
          borderRadius: tokens.borderRadius.lg,
          padding: tokens.spacing.lg,
          ...tokens.shadows.sm,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: tokens.spacing.md,
          }}
        >
          <Text style={{ fontSize: 28 }}>{icon}</Text>
        </View>
        <Text
          style={{
            fontSize: tokens.typography.subheading.fontSize,
            fontWeight: '700',
            fontFamily: 'Baloo2',
            color: tokens.colors.neutral[900],
            marginBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: tokens.typography.bodySmall.fontSize,
            color: tokens.colors.neutral[500],
            fontFamily: 'Nunito',
          }}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

export function TwoColumnCards({ left, right }: TwoColumnCardsProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: tokens.spacing.lg,
        paddingHorizontal: tokens.spacing.lg,
        marginBottom: tokens.spacing.xl,
      }}
    >
      <ColumnCardComponent {...left} />
      <ColumnCardComponent {...right} />
    </View>
  );
}
