import { Pressable, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface CircleButtonProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
  onPress?: () => void;
  size?: number;
}

export function CircleButton({
  icon,
  label,
  value,
  color = tokens.colors.primary,
  onPress,
  size = 70,
}: CircleButtonProps) {
  return (
    <Pressable onPress={onPress} style={{ alignItems: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: tokens.spacing.sm,
          ...tokens.shadows.md,
        }}
      >
        <Text style={{ fontSize: size * 0.4 }}>{icon}</Text>
      </View>
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
      <Text
        style={{
          fontSize: tokens.typography.bodySmall.fontSize,
          color: tokens.colors.neutral[500],
          fontFamily: 'Nunito',
          marginTop: tokens.spacing.xs,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
