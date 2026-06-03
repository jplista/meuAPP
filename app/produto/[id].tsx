import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Image, ActivityIndicator, Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { compararPrecos, Oferta } from '../../services/api';
import { useCarrinho } from '../../context/CarrinhoContext';

export default function ProdutoScreen() {
  const { id, nome, preco, imagem, emoji } = useLocalSearchParams();
  const router = useRouter();
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { adicionarAoCarrinho, estaNoCarrinho } = useCarrinho();

  useEffect(() => {
    async function carregar() {
      if (!id) return;
      const resultado = await compararPrecos(String(id));
      if (resultado?.ofertas) setOfertas(resultado.ofertas);
      setCarregando(false);
    }
    carregar();
  }, [id]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color="#333" />
      </TouchableOpacity>

      {/* Imagem do produto */}
      <View style={styles.imgBox}>
        {imagem ? (
          <Image source={{ uri: String(imagem) }} style={styles.imgReal} resizeMode="contain" />
        ) : (
          <Text style={{ fontSize: 90 }}>{emoji ?? '📦'}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.preco}>{preco}</Text>

        <View style={styles.badge}>
          <Ionicons name="trending-down" size={14} color="#8800f7" />
          <Text style={styles.badgeTxt}>  Comparando preços em tempo real</Text>
        </View>

        <TouchableOpacity
          style={[styles.carrinhoBtn, estaNoCarrinho(String(id)) && styles.carrinhoBtnAtivo]}
          onPress={() => adicionarAoCarrinho({
            id: String(id),
            nome: String(nome),
            preco: String(preco),
            precoNumerico: ofertas[0]?.precoNumerico ?? 0,
            imagem: String(imagem ?? ''),
            emoji: String(emoji ?? '📦'),
          })}
        >
          <Ionicons
            name={estaNoCarrinho(String(id)) ? 'cart' : 'cart-outline'}
            size={18}
            color="#fff"
          />
          <Text style={styles.carrinhoBtnTxt}>
            {estaNoCarrinho(String(id)) ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.secao}>Melhores preços encontrados:</Text>

        {carregando ? (
          <View style={styles.centro}>
            <ActivityIndicator size="large" color="#8800f7" />
            <Text style={styles.centroTxt}>Buscando ofertas...</Text>
          </View>
        ) : ofertas.length === 0 ? (
          <View style={styles.centro}>
            <Text style={{ fontSize: 40 }}>😕</Text>
            <Text style={styles.centroTxt}>Nenhuma oferta encontrada</Text>
          </View>
        ) : (
          ofertas.map((oferta, i) => (
            <View key={i} style={[styles.lojaCard, i === 0 && styles.lojaCardDestaque]}>
              {i === 0 && (
                <View style={styles.melhorTag}>
                  <Text style={styles.melhorTagTxt}>🏆 Melhor preço</Text>
                </View>
              )}
              <View style={styles.lojaRow}>
                <Text style={styles.lojaNome}>{oferta.loja}</Text>
                <Text style={[styles.lojaPreco, i === 0 && { color: '#8800f7' }]}>
                  {oferta.preco}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.lojaBtn, i === 0 && styles.lojaBtnDestaque]}
                onPress={() => oferta.link && Linking.openURL(oferta.link)}
              >
                <Text style={styles.lojaBtnTxt}>
                  {i === 0 ? 'Comprar agora' : 'Ver oferta'}
                </Text>
                <Ionicons name="open-outline" size={13} color="#fff" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

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
  imgReal: { width: '90%', height: '90%', borderRadius: 12 },
  info: { padding: 20 },
  nome: { fontSize: 18, fontWeight: '600', color: '#222', marginBottom: 6 },
  preco: { fontSize: 24, fontWeight: '800', color: '#8800f7', marginBottom: 12 },
  badge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f3e8ff', borderRadius: 8,
    padding: 10, marginBottom: 20,
  },
  badgeTxt: { fontSize: 13, color: '#8800f7', fontWeight: '500' },
  secao: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 12 },
  centro: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  centroTxt: { fontSize: 14, color: '#999', marginTop: 8 },
  lojaCard: {
    backgroundColor: '#fff', borderRadius: 14,
    padding: 14, marginBottom: 10,
    borderWidth: 0.5, borderColor: '#E8E8E8',
  },
  lojaCardDestaque: { borderColor: '#8800f7', borderWidth: 1.5 },
  melhorTag: {
    backgroundColor: '#8800f7', alignSelf: 'flex-start',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
    marginBottom: 8,
  },
  melhorTagTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
  lojaRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  lojaNome: { fontSize: 14, fontWeight: '500', color: '#333', flex: 1 },
  lojaPreco: { fontSize: 15, fontWeight: '700', color: '#222' },
  lojaBtn: {
    backgroundColor: '#ccc', borderRadius: 10,
    paddingVertical: 10, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  lojaBtnDestaque: { backgroundColor: '#8800f7' },
  lojaBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
  carrinhoBtn: {
    backgroundColor: '#8c02fd',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  carrinhoBtnAtivo: {
    backgroundColor: '#4CAF50',
  },
  carrinhoBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
});