import { Pressable, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface NavItem {
  icon: string;
  label: string;
  onPress: () => void;
  active?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: tokens.colors.white,
        borderTopWidth: 1,
        borderTopColor: tokens.colors.neutral[200],
        paddingBottom: 8,
        paddingTop: 12,
        paddingHorizontal: tokens.spacing.md,
      }}
    >
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={item.onPress}
          style={{ flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.md }}
        >
          <Text
            style={{
              fontSize: 24,
              marginBottom: tokens.spacing.xs,
              opacity: item.active ? 1 : 0.5,
            }}
          >
            {item.icon}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Nunito',
              color: item.active ? tokens.colors.primary : tokens.colors.neutral[500],
              fontWeight: item.active ? '700' : '400',
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
