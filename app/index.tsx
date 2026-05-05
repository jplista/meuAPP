import { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    // Fade in do logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,        // 1.5s para aparecer
      useNativeDriver: true,
    }).start(() => {
      // Depois de aparecer, espera 1s e navega
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
       source={require('../assets/logo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // ← cor de fundo da splash, muda se quiser
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
});