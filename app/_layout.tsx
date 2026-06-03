import { Stack } from 'expo-router';
import { FavoritosProvider } from '../context/FavoritosContext';
import { CarrinhoProvider } from '../context/CarrinhoContext';

export default function RootLayout() {
  return (
    <CarrinhoProvider>
      <FavoritosProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="produto/[id]" />
          <Stack.Screen name="menu" options={{ animation: 'slide_from_left' }} />
        </Stack>
      </FavoritosProvider>
    </CarrinhoProvider>
  );
}