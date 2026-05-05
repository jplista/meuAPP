import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categorias = [
  { id: '0', nome: 'Todos', emoji: '🔥' },
  { id: '1', nome: 'Calçados', emoji: '👟' },
  { id: '2', nome: 'Beleza', emoji: '💄' },
  { id: '3', nome: 'Moda Fem.', emoji: '👗' },
  { id: '4', nome: 'Joias', emoji: '💍' },
  { id: '5', nome: 'Moda Masc.', emoji: '👔' },
];

const todosProdutos = [
  { id: '1', nome: 'Fone Bluetooth', preco: 'R$ 120,00', categoria: '1', emoji: '🎧' },
  { id: '2', nome: 'Blusa Feminina', preco: 'R$ 89,00',  categoria: '3', emoji: '👚' },
  { id: '3', nome: 'Tênis Esportivo', preco: 'R$ 250,00', categoria: '1', emoji: '👟' },
  { id: '4', nome: 'Relógio Smart', preco: 'R$ 399,00',  categoria: '5', emoji: '⌚' },
  { id: '5', nome: 'Batom Matte', preco: 'R$ 45,00',    categoria: '2', emoji: '💄' },
  { id: '6', nome: 'Anel Prata', preco: 'R$ 199,00',    categoria: '4', emoji: '💍' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('0');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const produtosFiltrados = todosProdutos.filter((p) => {
    const bateBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria = categoriaAtiva === '0' || p.categoria === categoriaAtiva;
    return bateBusca && bateCategoria;
  });

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const abrirProduto = (item: typeof todosProdutos[0]) => {
    router.push({
      pathname: '/produto/[id]',
      params: { id: item.id, nome: item.nome, preco: item.preco, emoji: item.emoji },
    });
  };

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
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 ? (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="options-outline" size={18} color="#999" />
        )}
      </View>

      {/* Banner — some durante a busca */}
      {busca.length === 0 && (
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerSub}>Oferta Especial</Text>
            <Text style={styles.bannerTitle}>Super Sale{'\n'}Desconto</Text>
            <Text style={styles.bannerDesconto}>Até 50%</Text>
            <TouchableOpacity
              style={styles.bannerBtn}
              onPress={() => setCategoriaAtiva('0')}
            >
              <Text style={styles.bannerBtnText}>Ver agora</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImgPlaceholder}>
            <Text style={{ fontSize: 48 }}>🛍️</Text>
          </View>
        </View>
      )}

      {/* Categorias */}
      <FlatList
        data={categorias}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.categoriasList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoriaItem}
            onPress={() => setCategoriaAtiva(item.id)}
          >
            <View style={[
              styles.categoriaCirculo,
              categoriaAtiva === item.id && styles.categoriaCirculoAtivo,
            ]}>
              <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
            </View>
            <Text style={[
              styles.categoriaNome,
              categoriaAtiva === item.id && styles.categoriaNomeAtivo,
            ]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Cabeçalho da seção */}
      <View style={styles.secaoHeader}>
        <Text style={styles.secaoTitulo}>
          {busca.length > 0
            ? `Resultados para "${busca}"`
            : categoriaAtiva === '0'
            ? 'Especial Para Você'
            : categorias.find((c) => c.id === categoriaAtiva)?.nome}
        </Text>
        <Text style={styles.contador}>{produtosFiltrados.length} produtos</Text>
      </View>

      {/* Lista de produtos */}
      {produtosFiltrados.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={{ fontSize: 40 }}>🔍</Text>
          <Text style={styles.vazioTexto}>Nenhum produto encontrado</Text>
          <TouchableOpacity onPress={() => { setBusca(''); setCategoriaAtiva('0'); }}>
            <Text style={styles.vazioLink}>Limpar filtros</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ paddingLeft: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.produtoCard}
              onPress={() => abrirProduto(item)}
              activeOpacity={0.8}
            >
              <View style={styles.produtoImgPlaceholder}>
                <Text style={{ fontSize: 42 }}>{item.emoji}</Text>
              </View>
              <TouchableOpacity
                style={styles.favBtn}
                onPress={() => toggleFavorito(item.id)}
              >
                <Ionicons
                  name={favoritos.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={16}
                  color="#FF6B35"
                />
              </TouchableOpacity>
              <Text style={styles.produtoNome} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>{item.preco}</Text>
              <View style={styles.verMelhorBtn}>
                <Text style={styles.verMelhorTxt}>Ver melhor preço</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
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
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
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
  bannerSub: { fontSize: 12, color: '#FF6B35', fontWeight: '500', marginBottom: 4 },
  bannerTitle: { fontSize: 20, fontWeight: '700', color: '#222', lineHeight: 26 },
  bannerDesconto: { fontSize: 22, fontWeight: '800', color: '#FF6B35', marginTop: 2, marginBottom: 12 },
  bannerBtn: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  bannerImgPlaceholder: {
    width: 90, height: 90,
    backgroundColor: '#FFE0D0',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriasList: { paddingLeft: 20, marginBottom: 20 },
  categoriaItem: { alignItems: 'center', marginRight: 16 },
  categoriaCirculo: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: '#E0E0E0',
    marginBottom: 6,
  },
  categoriaCirculoAtivo: {
    backgroundColor: '#FFF3EE',
    borderColor: '#FF6B35',
    borderWidth: 1.5,
  },
  categoriaNome: { fontSize: 11, color: '#555', textAlign: 'center' },
  categoriaNomeAtivo: { color: '#FF6B35', fontWeight: '600' },
  secaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  secaoTitulo: { fontSize: 16, fontWeight: '600', color: '#222', flex: 1 },
  contador: { fontSize: 13, color: '#999' },
  vazio: { alignItems: 'center', paddingVertical: 40 },
  vazioTexto: { fontSize: 15, color: '#999', marginTop: 10 },
  vazioLink: { fontSize: 14, color: '#FF6B35', marginTop: 8, fontWeight: '500' },
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginRight: 14,
    width: 155,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
  },
  produtoImgPlaceholder: {
    width: '100%', height: 110,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  favBtn: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: '#FFF3EE',
    borderRadius: 20, padding: 5,
  },
  produtoNome: { fontSize: 13, fontWeight: '500', color: '#333', marginBottom: 4 },
  produtoPreco: { fontSize: 14, fontWeight: '700', color: '#FF6B35', marginBottom: 8 },
  verMelhorBtn: {
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  verMelhorTxt: { fontSize: 11, color: '#FF6B35', fontWeight: '600' },
});