import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Text>Essa tela não existe.</Text>
        <Link href="/"><Text>Voltar pro início</Text></Link>
      </View>
    </>
  );
}
