import { Text, View, Pressable, ScrollView } from 'react-native';
import { tokens } from '@/src/theme/tokens';

interface City {
  id: string;
  name: string;
  emoji: string;
  progress: number;
  color: string;
}

interface CitiesGridProps {
  cities: City[];
  onCityPress?: (cityId: string) => void;
}

export function CitiesGrid({ cities, onCityPress }: CitiesGridProps) {
  return (
    <View style={{ marginVertical: tokens.spacing.lg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: tokens.spacing.lg, marginBottom: tokens.spacing.md }}>
        <Text
          style={{
            fontSize: tokens.typography.subheading.fontSize,
            fontWeight: '700',
            fontFamily: 'Baloo2',
            color: tokens.colors.neutral[900],
          }}
        >
          Minhas Cidades
        </Text>
      </View>

      {/* Grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.md }}>
        {cities.map((city) => (
          <Pressable key={city.id} onPress={() => onCityPress?.(city.id)}>
            <View
              style={{
                width: 100,
                backgroundColor: tokens.colors.white,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing.md,
                alignItems: 'center',
                ...tokens.shadows.sm,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: city.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: tokens.spacing.sm,
                }}
              >
                <Text style={{ fontSize: 32 }}>{city.emoji}</Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  fontFamily: 'Baloo2',
                  color: tokens.colors.neutral[900],
                  textAlign: 'center',
                  marginBottom: tokens.spacing.xs,
                }}
              >
                {city.name}
              </Text>
              <View
                style={{
                  height: 4,
                  width: '100%',
                  backgroundColor: tokens.colors.neutral[200],
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${city.progress}%`,
                    backgroundColor: city.color,
                  }}
                />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
