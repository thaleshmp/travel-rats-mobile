import { Text, View, Pressable } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface Action {
  icon: string;
  label: string;
  color: string;
  onPress?: () => void;
}

interface QuickActionsProps {
  actions: Action[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <View style={{ marginVertical: tokens.spacing.lg, paddingHorizontal: tokens.spacing.lg }}>
      <Text
        style={{
          fontSize: tokens.typography.subheading.fontSize,
          fontWeight: '700',
          fontFamily: 'Baloo2',
          color: tokens.colors.neutral[900],
          marginBottom: tokens.spacing.md,
        }}
      >
        Ações Rápidas
      </Text>

      <View style={{ gap: tokens.spacing.md }}>
        {actions.map((action, i) => (
          <Pressable key={i} onPress={action.onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: action.color,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing.lg,
                ...tokens.shadows.sm,
              }}
            >
              <Text style={{ fontSize: 32, marginRight: tokens.spacing.md }}>{action.icon}</Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: tokens.typography.subheading.fontSize,
                  fontWeight: '700',
                  fontFamily: 'Baloo2',
                  color: tokens.colors.white,
                }}
              >
                {action.label}
              </Text>
              <Text style={{ fontSize: 20, color: tokens.colors.white }}>→</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
