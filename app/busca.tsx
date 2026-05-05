import { View, Text, StyleSheet } from 'react-native';

export default function BuscaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela de Busca</Text>
      <Text style={styles.sub}>Em breve estilizamos ela 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8' },
  texto: { fontSize: 20, fontWeight: '600', color: '#333' },
  sub: { fontSize: 14, color: '#999', marginTop: 8 },
});