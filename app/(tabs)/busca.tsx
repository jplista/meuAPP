import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, FlatList, Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { buscarProdutos, Produto } from '../../services/api';

export default function BuscaScreen() {
  const router = useRouter();
  const { query: queryParam, autoSearch } = useLocalSearchParams<{
    query: string;
    autoSearch: string;
  }>();

  const [query, setQuery] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscou, setBuscou] = useState(false);

  // Busca automática quando vem do menu
  useEffect(() => {
    if (queryParam && autoSearch === '1') {
      setQuery(queryParam);
      buscarComQuery(queryParam);
    }
  }, [queryParam]);

  const buscarComQuery = async (q: string) => {
    if (!q.trim()) return;
    setCarregando(true);
    setBuscou(true);
    const resultado = await buscarProdutos(q);
    setProdutos(resultado);
    setCarregando(false);
  };

  const buscar = async () => {
    buscarComQuery(query);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar Produtos</Text>
        <Text style={styles.headerSub}>Comparamos preços em várias lojas</Text>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            placeholder="Ex: iPhone 15, Tênis Nike..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={buscar}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => {
              setQuery('');
              setProdutos([]);
              setBuscou(false);
            }}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={buscar}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#8800f7" />
          <Text style={styles.centroTxt}>Buscando produtos...</Text>
          {query.length > 0 && (
            <Text style={styles.centroSub}>"{query}"</Text>
          )}
        </View>
      ) : !buscou ? (
        <View style={styles.centro}>
          <Text style={{ fontSize: 50 }}>🛒</Text>
          <Text style={styles.centroTxt}>Digite um produto para buscar</Text>
          <Text style={styles.centroSub}>Comparamos preços em várias lojas!</Text>
        </View>
      ) : produtos.length === 0 ? (
        <View style={styles.centro}>
          <Text style={{ fontSize: 50 }}>😕</Text>
          <Text style={styles.centroTxt}>Nenhum produto encontrado</Text>
          <Text style={styles.centroSub}>Tente outro termo de busca</Text>
        </View>
      ) : (
        <>
          {/* Cabeçalho dos resultados */}
          <View style={styles.resultadoHeader}>
            <Text style={styles.resultadoTxt}>
              {produtos.length} resultados para{' '}
              <Text style={styles.resultadoQuery}>"{query}"</Text>
            </Text>
          </View>

          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => router.push({
                  pathname: '/produto/[id]',
                  params: {
                    id: item.id,
                    nome: item.nome,
                    preco: item.preco,
                    imagem: item.imagem,
                    link: item.link,
                  },
                })}
              >
                {item.imagem ? (
                  <Image source={{ uri: item.imagem }} style={styles.cardImg} />
                ) : (
                  <View style={styles.cardImgPlaceholder}>
                    <Text style={{ fontSize: 30 }}>📦</Text>
                  </View>
                )}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNome} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.cardPreco}>{item.preco}</Text>
                  <View style={styles.cardTagRow}>
                    <View style={[
                      styles.cardTag,
                      item.condicao === 'Novo' ? styles.tagNovo : styles.tagUsado
                    ]}>
                      <Text style={styles.cardTagTxt}>{item.condicao}</Text>
                    </View>
                    <Text style={styles.cardLoja}>{item.loja}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#222' },
  headerSub: { fontSize: 12, color: '#999', marginTop: 2 },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 0.5,
    borderColor: '#8800f7',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  searchBtn: {
    backgroundColor: '#8800f7',
    borderRadius: 12,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  centroTxt: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 10 },
  centroSub: { fontSize: 13, color: '#999' },
  resultadoHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  resultadoTxt: { fontSize: 13, color: '#666' },
  resultadoQuery: { fontWeight: '700', color: '#8800f7' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    gap: 12,
  },
  cardImg: { width: 75, height: 75, borderRadius: 10 },
  cardImgPlaceholder: {
    width: 75, height: 75,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: { flex: 1, gap: 4 },
  cardNome: { fontSize: 13, fontWeight: '600', color: '#222' },
  cardPreco: { fontSize: 15, fontWeight: '700', color: '#8800f7' },
  cardTagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardTag: { borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  tagNovo: { backgroundColor: '#e8f5e9' },
  tagUsado: { backgroundColor: '#fff3e0' },
  cardTagTxt: { fontSize: 10, fontWeight: '600', color: '#555' },
  cardLoja: { fontSize: 11, color: '#999' },
});