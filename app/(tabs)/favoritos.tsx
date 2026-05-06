// Importa componentes básicos do React Native
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// Importa ícones da biblioteca Expo
import { Ionicons } from '@expo/vector-icons';

// Lista mockada de favoritos (apenas para teste)
const favoritosMock = [
  { id: '1', nome: 'Fone Bluetooth', preco: 'R$ 120,00', emoji: '🎧' },
  { id: '2', nome: 'Blusa Feminina', preco: 'R$ 89,00',  emoji: '👚' },
];

// Componente principal da tela de favoritos
export default function FavoritosScreen() {
  return (
    <View style={styles.container}>

      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <Ionicons name="heart" size={22} color="#9410ff" />
      </View>

      {/* Verifica se há favoritos */}
      {favoritosMock.length === 0 ? (
        // Caso não haja favoritos, mostra mensagem de vazio
        <View style={styles.vazio}>
          <Text style={{ fontSize: 50 }}>🤍</Text>
          <Text style={styles.vazioTxt}>Nenhum favorito ainda</Text>
          <Text style={styles.vazioSub}>Adicione produtos que você gostou!</Text>
        </View>
      ) : (
        // Caso haja favoritos, renderiza lista
        <FlatList
          data={favoritosMock} // dados da lista
          keyExtractor={(item) => item.id} // chave única
          contentContainerStyle={{ padding: 20, gap: 12 }} // espaçamento interno
          renderItem={({ item }) => (
            // Card de cada produto favorito
            <View style={styles.card}>
              {/* Emoji do produto */}
              <View style={styles.cardEmoji}>
                <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
              </View>

              {/* Informações do produto */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardNome}>{item.nome}</Text>
                <Text style={styles.cardPreco}>{item.preco}</Text>
                {/* Botão para ver melhor preço */}
                <TouchableOpacity style={styles.cardBtn}>
                  <Text style={styles.cardBtnTxt}>Ver melhor preço</Text>
                </TouchableOpacity>
              </View>

              {/* Botão para remover dos favoritos */}
              <TouchableOpacity style={styles.removeBtn}>
                <Ionicons name="heart" size={22} color="#9410ff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },

  // Cabeçalho
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

  // Layout vazio
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  vazioTxt: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 10 },
  vazioSub: { fontSize: 14, color: '#999' },

  // Card de produto
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

  // Botão "Ver melhor preço"
  cardBtn: {
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  cardBtnTxt: { fontSize: 11, color: '#9410ff', fontWeight: '600' },

  // Botão de remover
  removeBtn: { padding: 6 },
});
