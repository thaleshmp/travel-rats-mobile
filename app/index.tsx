import { Button } from '@/src/components/Button';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-100 gap-4">
      <Button variant="primary" onPress={() => console.log('primary')}>
        Primary
      </Button>

      <Button variant="secondary" onPress={() => console.log('secondary')}>
        Secondary
      </Button>

      <Button variant="destructive" disabled>
        Disabled
      </Button>

      <Link href="/design" asChild>
        <Button variant="secondary">
          Design System
        </Button>
      </Link>
    </View>
  );
}
