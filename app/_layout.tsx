import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const linking = {
  prefixes: ['jk-libras.firebaseapp://', 'https://jk-libras.firebaseapp.com'],
  config: {
    screens: {
      setNewPassword: 'reset-password', // Match this with your deep link path
    },
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(call)" options={{ headerShown: false }} />
          <Stack.Screen name="setNewPassword" /> {/* No component prop needed */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </NavigationContainer>
  );
}