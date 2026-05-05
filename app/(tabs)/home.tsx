import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, FlatList, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categorias = [
  { id: '1', nome: 'Calçados', emoji: '👟' },
  { id: '2', nome: 'Beleza', emoji: '💄' },
  { id: '3', nome: 'Moda Fem.', emoji: '👗' },
  { id: '4', nome: 'Joias', emoji: '💍' },
  { id: '5', nome: 'Moda Masc.', emoji: '👔' },
];

const produtos = [
  { id: '1', nome: 'Fone Bluetooth', preco: 'R$ 120,00' },
  { id: '2', nome: 'Blusa Feminina', preco: 'R$ 120,00' },
  { id: '3', nome: 'Tênis Esportivo', preco: 'R$ 250,00' },
  { id: '4', nome: 'Relógio Smart', preco: 'R$ 399,00' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={26} color="#333" />
        <Text style={styles.headerTitle}>MelhorPreço</Text>
        <Ionicons name="notifications-outline" size={26} color="#333" />
      </View>

      {/* Barra de busca */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#999" />
        <TextInput
          placeholder="Buscar produto..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <Ionicons name="options-outline" size={18} color="#999" />
      </View>

      {/* Banner destaque */}
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerSub}>Oferta Especial</Text>
          <Text style={styles.bannerTitle}>Super Sale{'\n'}Desconto</Text>
          <Text style={styles.bannerDesconto}>Até 50%</Text>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Ver agora</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerImgPlaceholder}>
          <Text style={{ fontSize: 48 }}>🛍️</Text>
        </View>
      </View>

      {/* Categorias */}
      <FlatList
        data={categorias}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.categoriasList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoriaItem}>
            <View style={styles.categoriaCirculo}>
              <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
            </View>
            <Text style={styles.categoriaNome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Seção produtos */}
      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>Especial Para Você</Text>
        <TouchableOpacity>
          <Text style={styles.verTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={produtos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.produtoCard}>
            <View style={styles.produtoImgPlaceholder}>
              <Text style={{ fontSize: 36 }}>📦</Text>
            </View>
            <TouchableOpacity style={styles.favBtn}>
              <Ionicons name="heart-outline" size={16} color="#FF6B35" />
            </TouchableOpacity>
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <Text style={styles.produtoPreco}>{item.preco}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  banner: {
    backgroundColor: '#FFF3EE',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerSub: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    lineHeight: 26,
  },
  bannerDesconto: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF6B35',
    marginTop: 2,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  bannerImgPlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#FFE0D0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriasList: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoriaItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoriaCirculo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 6,
  },
  categoriaNome: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },
  secaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  verTodos: {
    fontSize: 13,
    color: '#9901ff',
  },
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginRight: 14,
    width: 150,
    borderWidth: 0.5,
    borderColor: '#c300ff',
  },
  produtoImgPlaceholder: {
    width: '100%',
    height: 110,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#a200ff',
    borderRadius: 20,
    padding: 5,
  },
  produtoNome: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  produtoPreco: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ae00ff',
  },
});