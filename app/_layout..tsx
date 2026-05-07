import { Stack } from 'expo-router';
import { FavoritosProvider } from '../context/FavoritosContext';

export default function RootLayout() {
  return (
    <FavoritosProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="produto/[id]" />
      </Stack>
    </FavoritosProvider>
  );
}