import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const atalhos = [
  { id: '1', nome: 'Favoritos', icone: 'heart-outline', rota: '/(tabs)/favoritos' },
  { id: '2', nome: 'Carrinho', icone: 'cart-outline', rota: '/(tabs)/carrinho' },
  { id: '3', nome: 'Buscar', icone: 'search-outline', rota: '/(tabs)/busca' },
];

const categorias = [
  { id: '1',  nome: 'Ofertas e Descontos',       emoji: '🏷️', query: 'ofertas do dia' },
  { id: '2',  nome: 'Eletrônicos',                emoji: '📱', query: 'celular' },
  { id: '3',  nome: 'Calçados',                   emoji: '👟', query: 'tênis' },
  { id: '4',  nome: 'Moda Feminina',              emoji: '👗', query: 'vestido feminino' },
  { id: '5',  nome: 'Moda Masculina',             emoji: '👔', query: 'camisa masculina' },
  { id: '6',  nome: 'Beleza',                     emoji: '💄', query: 'maquiagem' },
  { id: '7',  nome: 'Joias e Acessórios',         emoji: '💍', query: 'joias' },
  { id: '8',  nome: 'Esportes e Lazer',           emoji: '⚽', query: 'esporte' },
  { id: '9',  nome: 'Casa e Construção',          emoji: '🏠', query: 'casa' },
  { id: '10', nome: 'Brinquedos',                 emoji: '🧸', query: 'brinquedo' },
  { id: '11', nome: 'Livros',                     emoji: '📚', query: 'livro' },
  { id: '12', nome: 'Games',                      emoji: '🎮', query: 'game' },
  { id: '13', nome: 'Saúde e Bem-estar',          emoji: '💊', query: 'saúde' },
  { id: '14', nome: 'Pet Shop',                   emoji: '🐾', query: 'pet' },
  { id: '15', nome: 'Escritório e Home Office',   emoji: '🖥️', query: 'escritório' },
];

const extras = [
  { id: '1', nome: 'Sobre o App',    icone: 'information-circle-outline' },
  { id: '2', nome: 'Configurações',  icone: 'settings-outline' },
  { id: '3', nome: 'Ajuda',          icone: 'help-circle-outline' },
];

export default function MenuScreen() {
  const router = useRouter();

  const irParaCategoria = (query: string) => {
    router.push({
      pathname: '/(tabs)/busca',
      params: { query, autoSearch: '1' },
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Atalhos rápidos */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Seus atalhos</Text>
          <View style={styles.atalhoRow}>
            {atalhos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.atalhoBtn}
                onPress={() => router.push(item.rota as any)}
              >
                <Ionicons name={item.icone as any} size={18} color="#333" />
                <Text style={styles.atalhoTxt}>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Comprar por categoria</Text>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoriaItem}
              activeOpacity={0.7}
              onPress={() => irParaCategoria(cat.query)}
            >
              <View style={styles.categoriaEsquerda}>
                <View style={styles.categoriaEmoji}>
                  <Text style={{ fontSize: 22 }}>{cat.emoji}</Text>
                </View>
                <Text style={styles.categoriaNome}>{cat.nome}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Extras */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Mais opções</Text>
          {extras.map((item) => (
            <TouchableOpacity key={item.id} style={styles.extraItem}>
              <Ionicons name={item.icone as any} size={20} color="#666" />
              <Text style={styles.extraTxt}>{item.nome}</Text>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  backBtn: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F5F5F5', borderRadius: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  secao: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  secaoTitulo: {
    fontSize: 18, fontWeight: '700',
    color: '#222', marginBottom: 14,
  },
  atalhoRow: { flexDirection: 'row', gap: 10 },
  atalhoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#F9F9F9',
  },
  atalhoTxt: { fontSize: 12, fontWeight: '500', color: '#333' },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  categoriaEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoriaEmoji: {
    width: 48, height: 48,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  categoriaNome: { fontSize: 15, fontWeight: '500', color: '#222' },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  extraTxt: { flex: 1, fontSize: 15, color: '#333' },
});