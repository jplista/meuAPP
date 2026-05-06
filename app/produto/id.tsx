// Importações necessárias do React Native e Expo Router
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Lista de lojas com preços simulados
const lojas = [
  { nome: 'Mercado Livre', preco: 'R$ 115,00', destaque: true },
  { nome: 'Amazon',        preco: 'R$ 122,00', destaque: false },
  { nome: 'Shopee',        preco: 'R$ 130,00', destaque: false },
];

export default function ProdutoScreen() {
  // Recebe parâmetros da rota (nome, preço e emoji do produto)
  const { nome, preco, emoji } = useLocalSearchParams();
  const router = useRouter();

  return (
    // ScrollView permite rolagem da tela
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#333" />
      </TouchableOpacity>

      {/* Caixa da imagem do produto (usa emoji como ícone) */}
      <View style={styles.imgBox}>
        <Text style={{ fontSize: 90 }}>{emoji ?? '📦'}</Text>
      </View>

      {/* Informações do produto */}
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.preco}>{preco}</Text>

        {/* Badge indicando melhor preço */}
        <View style={styles.badge}>
          <Ionicons name="trending-down" size={14} color="#FF6B35" />
          <Text style={styles.badgeTxt}>  Encontramos o melhor preço para você</Text>
        </View>

        {/* Seção de comparação */}
        <Text style={styles.secao}>Comparar nos sites:</Text>

        {/* Renderiza lista de lojas */}
        {lojas.map((loja, i) => (
          <View key={i} style={[styles.lojaCard, loja.destaque && styles.lojaCardDestaque]}>
            
            {/* Tag "Melhor preço" se for destaque */}
            {loja.destaque && (
              <View style={styles.melhorTag}>
                <Text style={styles.melhorTagTxt}>Melhor preço</Text>
              </View>
            )}

            {/* Informações da loja */}
            <View style={styles.lojaInfo}>
              <Text style={styles.lojaNome}>{loja.nome}</Text>
              <Text style={[styles.lojaPreco, loja.destaque && { color: '#9900ff' }]}>
                {loja.preco}
              </Text>
            </View>

            {/* Botão para ver oferta */}
            <TouchableOpacity style={[styles.lojaBtn, loja.destaque && styles.lojaBtnDestaque]}>
              <Text style={styles.lojaBtnText}>Ver oferta</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Espaço no final da tela */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  backBtn: {
    marginTop: 55, marginLeft: 20,
    width: 40, height: 40,
    backgroundColor: '#fff', borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: '#E0E0E0',
  },
  imgBox: {
    height: 220, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    marginHorizontal: 20, marginTop: 16,
    borderRadius: 16, borderWidth: 0.5, borderColor: '#E8E8E8',
  },
  info: { padding: 20 },
  nome: { fontSize: 20, fontWeight: '600', color: '#222', marginBottom: 6 },
  preco: { fontSize: 24, fontWeight: '800', color: '#9900ff', marginBottom: 12 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  badgeTxt: { fontSize: 13, color: '#FF6B35', fontWeight: '500' },
  secao: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 12 },
  lojaCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 0.5, borderColor: '#E8E8E8',
  },
  lojaCardDestaque: {
    borderColor: '#a200ff', borderWidth: 1.5,
  },
  melhorTag: {
    backgroundColor: '#c300ff', alignSelf: 'flex-start',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
    marginBottom: 8,
  },
  melhorTagTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
  lojaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lojaNome: { fontSize: 14, fontWeight: '500', color: '#333' },
  lojaPreco: { fontSize: 15, fontWeight: '700', color: '#222' },
  lojaBtn: {
    backgroundColor: '#F5F5F5', borderRadius: 10,
    paddingVertical: 10, alignItems: 'center',
  },
  lojaBtnDestaque: { backgroundColor: '#8d01ff' },
  lojaBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
