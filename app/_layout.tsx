import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2/700Bold';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito/800ExtraBold';
import { colors } from '../src/design-system/tokens';
import { WardrobeProvider } from '../src/features/shop/WardrobeProvider';

void SplashScreen.preventAutoHideAsync().catch(() => undefined);

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({ Baloo2_700Bold, Nunito_600SemiBold, Nunito_800ExtraBold });
  useEffect(() => {
    if (loaded || error) void SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <WardrobeProvider><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.canvas } }} /></WardrobeProvider>
    </>
  );
}
