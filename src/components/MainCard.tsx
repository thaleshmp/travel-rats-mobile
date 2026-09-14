import { Pressable, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { Button } from './Button';

interface MainCardProps {
  icon: string;
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export function MainCard({
  icon,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: MainCardProps) {
  return (
    <View
      style={{
        marginHorizontal: tokens.spacing.lg,
        marginVertical: tokens.spacing.lg,
        padding: tokens.spacing.lg,
        backgroundColor: tokens.colors.white,
        borderRadius: tokens.borderRadius.xl,
        ...tokens.shadows.md,
      }}
    >
      {/* Header com ícone */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
        <Text style={{ fontSize: 48, marginRight: tokens.spacing.md }}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: tokens.typography.subheading.fontSize,
              fontWeight: '700',
              fontFamily: 'Baloo2',
              color: tokens.colors.neutral[900],
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: tokens.typography.bodySmall.fontSize,
              color: tokens.colors.neutral[500],
              fontFamily: 'Nunito',
              marginTop: tokens.spacing.xs,
            }}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={{ gap: tokens.spacing.md }}>
        {primaryAction && (
          <Button onPress={primaryAction.onPress} variant="primary">
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button onPress={secondaryAction.onPress} variant="secondary">
            {secondaryAction.label}
          </Button>
        )}
      </View>
    </View>
  );
}
