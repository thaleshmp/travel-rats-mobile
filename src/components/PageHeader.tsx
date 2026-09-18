import { Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  stats?: Array<{ icon: string; value: string | number }>;
}

export function PageHeader({ title, subtitle, stats }: PageHeaderProps) {
  return (
    <View style={{ paddingHorizontal: tokens.spacing.lg, paddingVertical: tokens.spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.lg }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: tokens.typography.heading.fontSize,
              fontWeight: '700',
              fontFamily: 'Baloo2',
              color: tokens.colors.neutral[900],
              marginBottom: tokens.spacing.sm,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: tokens.typography.body.fontSize,
              color: tokens.colors.neutral[500],
              fontFamily: 'Nunito',
            }}
          >
            {subtitle}
          </Text>
        </View>
        {stats && (
          <View style={{ gap: tokens.spacing.sm }}>
            {stats.map((stat, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                <Text style={{ fontSize: 18 }}>{stat.icon}</Text>
                <Text
                  style={{
                    fontSize: tokens.typography.subheading.fontSize,
                    fontWeight: '700',
                    fontFamily: 'Baloo2',
                  }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
