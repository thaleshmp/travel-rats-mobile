import { Spot } from '@/src/types/spot';
import { Pressable, Text, View } from 'react-native';

interface CardProps {
  spot: Spot;
  onPress?: () => void;
}

export function Card({ spot, onPress }: CardProps) {
  const stars = Math.ceil((spot.weight / 100) * 5);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View className="bg-primary rounded-lg p-2 mb-3 border-b-4 border-primary-shade" style={{ maxWidth: 160 }}>
        <Text className="font-display text-xs text-white mb-1 font-bold" numberOfLines={2}>
          {spot.name}
        </Text>

        <View className="flex-row gap-0.5 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={{ fontSize: 10 }}>
              {i < stars ? '⭐' : '☆'}
            </Text>
          ))}
        </View>

        {spot.required && (
          <Text className="text-xs text-white font-bold">
            📌
          </Text>
        )}
      </View>
    </Pressable>
  );
}
