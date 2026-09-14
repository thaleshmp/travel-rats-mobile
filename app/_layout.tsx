import { Baloo2_700Bold, useFonts } from '@expo-google-fonts/baloo-2';
import { Nunito_400Regular } from '@expo-google-fonts/nunito';
import { } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Baloo2: Baloo2_700Bold,
    Nunito: Nunito_400Regular,
  });

  useEffect(() => {
    if (error) throw error;
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}