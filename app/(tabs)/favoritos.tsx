import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritos } from '../../context/FavoritosContext';
import { useRouter } from 'expo-router';

export default function FavoritosScreen() {
  const { favoritos, toggleFavorito } = useFavoritos();
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <Ionicons name="heart" size={22} color="#9410ff" />
      </View>

      {favoritos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={{ fontSize: 50 }}>🤍</Text>
          <Text style={styles.vazioTxt}>Nenhum favorito ainda</Text>
          <Text style={styles.vazioSub}>Adicione produtos que você gostou!</Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, gap: 12 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardEmoji}>
                <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardNome}>{item.nome}</Text>
                <Text style={styles.cardPreco}>{item.preco}</Text>
                <TouchableOpacity
                  style={styles.cardBtn}
                  onPress={() => router.push({
                    pathname: '/produto/[id]',
                    params: { id: item.id, nome: item.nome, preco: item.preco, emoji: item.emoji },
                  })}
                >
                  <Text style={styles.cardBtnTxt}>Ver melhor preço</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => toggleFavorito(item)}
              >
                <Ionicons name="heart" size={22} color="#9410ff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#222' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  vazioTxt: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 10 },
  vazioSub: { fontSize: 14, color: '#999' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    gap: 12,
  },
  cardEmoji: {
    width: 70, height: 70,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1, gap: 4 },
  cardNome: { fontSize: 14, fontWeight: '600', color: '#222' },
  cardPreco: { fontSize: 15, fontWeight: '700', color: '#9410ff' },
  cardBtn: {
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  cardBtnTxt: { fontSize: 11, color: '#9410ff', fontWeight: '600' },
  removeBtn: { padding: 6 },
});