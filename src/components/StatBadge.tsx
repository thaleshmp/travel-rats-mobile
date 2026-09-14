import { Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface StatBadgeProps {
  icon: string;
  value: string | number;
  label?: string;
}

export function StatBadge({ icon, value, label }: StatBadgeProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: tokens.colors.white,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.borderRadius.lg,
        gap: tokens.spacing.sm,
        ...tokens.shadows.sm,
      }}
    >
      <Text style={{ fontSize: 20 }}>{icon}</Text>
      <View>
        <Text
          style={{
            fontSize: tokens.typography.subheading.fontSize,
            fontWeight: '700',
            fontFamily: 'Baloo2',
            color: tokens.colors.neutral[900],
          }}
        >
          {value}
        </Text>
        {label && (
          <Text
            style={{
              fontSize: tokens.typography.bodySmall.fontSize,
              color: tokens.colors.neutral[500],
              fontFamily: 'Nunito',
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </View>
  );
}
