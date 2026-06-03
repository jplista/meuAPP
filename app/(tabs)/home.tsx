import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, FlatList,
  Image, ActivityIndicator, Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavoritos } from '../../context/FavoritosContext';
import { useCarrinho } from '../../context/CarrinhoContext';
import { buscarProdutos, Produto } from '../../services/api';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 40;

const categorias = [
  { id: '0', nome: 'Todos', emoji: '🔥', query: 'ofertas do dia' },
  { id: '1', nome: 'Calçados', emoji: '👟', query: 'tênis' },
  { id: '2', nome: 'Beleza', emoji: '💄', query: 'maquiagem' },
  { id: '3', nome: 'Moda Fem.', emoji: '👗', query: 'vestido feminino' },
  { id: '4', nome: 'Joias', emoji: '💍', query: 'joias prata' },
  { id: '5', nome: 'Moda Masc.', emoji: '👔', query: 'camisa masculina' },
];

function BannerCarrossel({
  produtos,
  onPress,
}: {
  produtos: Produto[];
  onPress: (item: Produto) => void;
}) {
  const [indice, setIndice] = useState(0);
  const scrollRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (produtos.length === 0) return;
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.7, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      setIndice((prev) => {
        const proximo = (prev + 1) % produtos.length;
        try {
          scrollRef.current?.scrollToIndex({ index: proximo, animated: true });
        } catch {}
        return proximo;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [produtos.length]);

  if (produtos.length === 0) {
    return (
      <View style={bannerStyles.bannerPadrao}>
        <View style={{ flex: 1 }}>
          <Text style={bannerStyles.bannerSub}>Oferta Especial</Text>
          <Text style={bannerStyles.bannerTitle}>Super Sale{'\n'}Desconto</Text>
          <Text style={bannerStyles.bannerDesconto}>Até 50%</Text>
          <View style={bannerStyles.bannerBtn}>
            <Text style={bannerStyles.bannerBtnText}>Ver agora</Text>
          </View>
        </View>
        <View style={bannerStyles.bannerImgPlaceholder}>
          <Text style={{ fontSize: 48 }}>🛍️</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={bannerStyles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          ref={scrollRef}
          data={produtos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          getItemLayout={(_, index) => ({
            length: BANNER_WIDTH + 12,
            offset: (BANNER_WIDTH + 12) * index,
            index,
          })}
          onMomentumScrollEnd={(e) => {
            const novoIndice = Math.round(
              e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 12)
            );
            setIndice(novoIndice);
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={bannerStyles.card}
              activeOpacity={0.9}
              onPress={() => onPress(item)}
            >
              <View style={{ flex: 1 }}>
                <Text style={bannerStyles.bannerSub}>🔥 Oferta Especial</Text>
                <Text style={bannerStyles.bannerTitle} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={bannerStyles.bannerDesconto}>{item.preco}</Text>
                <View style={bannerStyles.bannerBtn}>
                  <Text style={bannerStyles.bannerBtnText}>Ver melhor preço →</Text>
                </View>
              </View>
              {item.imagem ? (
                <Image
                  source={{ uri: item.imagem }}
                  style={bannerStyles.bannerImg}
                  resizeMode="contain"
                />
              ) : (
                <View style={bannerStyles.bannerImgPlaceholder}>
                  <Text style={{ fontSize: 40 }}>🛍️</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* Pontinhos indicadores */}
      <View style={bannerStyles.dots}>
        {produtos.map((_, i) => (
          <View
            key={i}
            style={[bannerStyles.dot, i === indice && bannerStyles.dotAtivo]}
          />
        ))}
      </View>
    </View>
  );
}

const bannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    width: BANNER_WIDTH,
    backgroundColor: '#FFF3EE',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerPadrao: {
    backgroundColor: '#FFF3EE',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerSub: { fontSize: 12, color: '#a435ff', fontWeight: '500', marginBottom: 4 },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#222', lineHeight: 22, marginBottom: 4 },
  bannerDesconto: { fontSize: 20, fontWeight: '800', color: '#a435ff', marginBottom: 12 },
  bannerBtn: {
    backgroundColor: '#a435ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  bannerImg: { width: 90, height: 90, borderRadius: 12 },
  bannerImgPlaceholder: {
    width: 90, height: 90,
    backgroundColor: '#FFE0D0',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
  },
  dotAtivo: {
    backgroundColor: '#a435ff',
    width: 18,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('0');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { toggleFavorito, isFavorito } = useFavoritos();
  const { adicionarAoCarrinho, estaNoCarrinho } = useCarrinho();

  const carregarCategoria = useCallback(async (catId: string) => {
    setCarregando(true);
    const cat = categorias.find((c) => c.id === catId);
    const resultado = await buscarProdutos(cat?.query ?? 'ofertas');
    setProdutos(resultado.slice(0, 10));
    setCarregando(false);
  }, []);

  useEffect(() => {
    carregarCategoria(categoriaAtiva);
  }, [categoriaAtiva]);

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirProduto = (item: Produto) => {
    router.push({
      pathname: '/produto/[id]',
      params: { id: item.id, nome: item.nome, preco: item.preco, imagem: item.imagem },
    });
  };

  const irParaBusca = () => {
    if (busca.trim()) router.push('/(tabs)/busca');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/menu')}>
      <Ionicons name="menu" size={26} color="#333" />
      </TouchableOpacity>
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
          onSubmitEditing={irParaBusca}
          returnKeyType="search"
        />
        {busca.length > 0 ? (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="options-outline" size={18} color="#999" />
        )}
      </View>

      {/* Banner carrossel — some durante a busca */}
      {busca.length === 0 && (
        <BannerCarrossel
          produtos={produtos.slice(0, 5)}
          onPress={abrirProduto}
        />
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
        <Text style={styles.contador}>
          {carregando ? '...' : `${produtosFiltrados.length} produtos`}
        </Text>
      </View>

      {/* Lista de produtos */}
      {carregando ? (
        <View style={styles.vazio}>
          <ActivityIndicator size="large" color="#8800f7" />
          <Text style={styles.vazioTexto}>Buscando produtos...</Text>
        </View>
      ) : produtosFiltrados.length === 0 ? (
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
              {item.imagem ? (
                <Image
                  source={{ uri: item.imagem }}
                  style={styles.produtoImg}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.produtoImgPlaceholder}>
                  <Text style={{ fontSize: 42 }}>📦</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.favBtn}
                onPress={() => toggleFavorito({
                  id: item.id,
                  nome: item.nome,
                  preco: item.preco,
                  emoji: '📦',
                })}
              >
                <Ionicons
                  name={isFavorito(item.id) ? 'heart' : 'heart-outline'}
                  size={16}
                  color="#a927ff"
                />
              </TouchableOpacity>

              <Text style={styles.produtoNome} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>{item.preco}</Text>
              <TouchableOpacity
                style={[
                  styles.verMelhorBtn,
                  estaNoCarrinho(item.id) && { backgroundColor: '#e8f5e9' }
                ]}
                onPress={() => estaNoCarrinho(item.id)
                  ? router.push('/(tabs)/carrinho')
                  : adicionarAoCarrinho({
                      id: item.id,
                      nome: item.nome,
                      preco: item.preco,
                      precoNumerico: item.precoNumerico,
                      imagem: item.imagem,
                      emoji: '📦',
                    })
                }
              >
                <Text style={[
                  styles.verMelhorTxt,
                  estaNoCarrinho(item.id) && { color: '#4CAF50' }
                ]}>
                  {estaNoCarrinho(item.id) ? '✓ No carrinho' : 'Ver melhor preço'}
                </Text>
              </TouchableOpacity>
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
    borderColor: '#8800f7',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
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
    borderColor: '#7f1cff',
    borderWidth: 1.5,
  },
  categoriaNome: { fontSize: 11, color: '#555', textAlign: 'center' },
  categoriaNomeAtivo: { color: '#ae35ff', fontWeight: '600' },
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
  vazioLink: { fontSize: 14, color: '#9d35ff', marginTop: 8, fontWeight: '500' },
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginRight: 14,
    width: 155,
    borderWidth: 0.5,
    borderColor: '#931af7',
  },
  produtoImg: {
    width: '100%', height: 110,
    borderRadius: 10,
    marginBottom: 8,
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
  produtoPreco: { fontSize: 14, fontWeight: '700', color: '#c000fa', marginBottom: 8 },
  verMelhorBtn: {
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  verMelhorTxt: { fontSize: 11, color: '#9b22ff', fontWeight: '600' },
});