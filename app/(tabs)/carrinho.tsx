import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CarrinhoScreen() {
  const { itens, alterarQtd, removerDoCarrinho, limparCarrinho, totalPreco, totalItens } = useCarrinho();
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <View style={styles.headerRight}>
          {itens.length > 0 && (
            <TouchableOpacity onPress={limparCarrinho} style={styles.limparBtn}>
              <Text style={styles.limparTxt}>Limpar</Text>
            </TouchableOpacity>
          )}
          <Ionicons name="cart" size={22} color="#8708ff" />
          {totalItens > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{totalItens}</Text>
            </View>
          )}
        </View>
      </View>

      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={{ fontSize: 60 }}>🛒</Text>
          <Text style={styles.vazioTxt}>Carrinho vazio</Text>
          <Text style={styles.vazioSub}>Adicione produtos para comparar!</Text>
          <TouchableOpacity
            style={styles.explorarBtn}
            onPress={() => router.push('/(tabs)/busca')}
          >
            <Text style={styles.explorarTxt}>Explorar produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itens}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.imagem ? (
                  <Image source={{ uri: item.imagem }} style={styles.cardImg} resizeMode="contain" />
                ) : (
                  <View style={styles.cardImgPlaceholder}>
                    <Text style={{ fontSize: 30 }}>{item.emoji || '📦'}</Text>
                  </View>
                )}

                <View style={styles.cardInfo}>
                  <Text style={styles.cardNome} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.cardPreco}>{item.preco}</Text>

                  <View style={styles.qtdRow}>
                    <TouchableOpacity
                      style={styles.qtdBtn}
                      onPress={() => alterarQtd(item.id, -1)}
                    >
                      <Ionicons name="remove" size={16} color="#7c0aff" />
                    </TouchableOpacity>
                    <Text style={styles.qtdTxt}>{item.qtd}</Text>
                    <TouchableOpacity
                      style={styles.qtdBtn}
                      onPress={() => alterarQtd(item.id, 1)}
                    >
                      <Ionicons name="add" size={16} color="#9e0cff" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardDireita}>
                  <Text style={styles.subtotal}>
                    {formatarPreco(item.precoNumerico * item.qtd)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removerDoCarrinho(item.id)}
                    style={styles.removeBtn}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerLabel}>
                {totalItens} {totalItens === 1 ? 'item' : 'itens'}
              </Text>
              <Text style={styles.footerTotal}>{formatarPreco(totalPreco)}</Text>
            </View>
            <TouchableOpacity
              style={styles.finalizarBtn}
              onPress={() => router.push('/(tabs)/busca')}
            >
              <Text style={styles.finalizarTxt}>Ver melhores preços</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  limparBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c200e9',
  },
  limparTxt: { fontSize: 12, color: '#b300fa', fontWeight: '500' },
  badge: {
    position: 'absolute',
    top: -6, right: -6,
    backgroundColor: '#8904f5',
    borderRadius: 10,
    width: 18, height: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeTxt: { color: '#fff', fontSize: 10, fontWeight: '700' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  vazioTxt: { fontSize: 20, fontWeight: '600', color: '#333', marginTop: 10 },
  vazioSub: { fontSize: 14, color: '#999' },
  explorarBtn: {
    marginTop: 10,
    backgroundColor: '#ae00ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  explorarTxt: { color: '#fff', fontWeight: '600', fontSize: 14 },
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
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1, gap: 4 },
  cardNome: { fontSize: 13, fontWeight: '600', color: '#222' },
  cardPreco: { fontSize: 13, color: '#999' },
  qtdRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  qtdBtn: {
    width: 28, height: 28,
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  qtdTxt: { fontSize: 15, fontWeight: '600', color: '#333', minWidth: 20, textAlign: 'center' },
  cardDireita: { alignItems: 'flex-end', gap: 8 },
  subtotal: { fontSize: 14, fontWeight: '700', color: '#a201ff' },
  removeBtn: { padding: 4 },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    gap: 14,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLabel: { fontSize: 15, color: '#666' },
  footerTotal: { fontSize: 22, fontWeight: '800', color: '#222' },
  finalizarBtn: {
    backgroundColor: '#af01ff',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  finalizarTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
});