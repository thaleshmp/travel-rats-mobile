import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { portoSpots } from '@/src/data/porto-spots';
import { ScrollView, Text, View } from 'react-native';

export default function DesignScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-100 p-4">
      <Text className="font-display text-2xl mb-6">Design System</Text>

      <Text className="font-display text-lg mb-3 mt-4">Cards (Spots)</Text>
      {portoSpots.slice(0, 5).map((spot) => (
        <Card key={spot.id} spot={spot} onPress={() => console.log(spot.name)} />
      ))}

      <Text className="font-display text-lg mb-3 mt-6">Buttons</Text>
      <View className="gap-2 mb-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button disabled>Disabled</Button>
      </View>
    </ScrollView>
  );
}
