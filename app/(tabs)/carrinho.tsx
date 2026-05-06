// Importa componentes básicos do React Native
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// Hook useState para gerenciar estado
import { useState } from 'react';
// Ícones da biblioteca Expo
import { Ionicons } from '@expo/vector-icons';

// Lista mockada de itens do carrinho
const carrinhoMock = [
  { id: '1', nome: 'Fone Bluetooth', preco: 120.00, emoji: '🎧', qtd: 1 },
  { id: '3', nome: 'Tênis Esportivo', preco: 250.00, emoji: '👟', qtd: 1 },
];

export default function CarrinhoScreen() {
  // Estado que guarda os itens do carrinho
  const [itens, setItens] = useState(carrinhoMock);

  // Função para alterar quantidade (+ ou -)
  const alterar = (id: string, delta: number) => {
    setItens((prev) =>
      prev
        // Se o id bater, altera a quantidade
        .map((item) => item.id === id ? { ...item, qtd: item.qtd + delta } : item)
        // Remove itens com quantidade <= 0
        .filter((item) => item.qtd > 0)
    );
  };

  // Calcula o total do carrinho
  const total = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);

  return (
    <View style={styles.container}>

      {/* Cabeçalho da tela */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
        <Ionicons name="cart" size={22} color="#FF6B35" />
      </View>

      {/* Se carrinho estiver vazio */}
      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={{ fontSize: 50 }}>🛒</Text>
          <Text style={styles.vazioTxt}>Carrinho vazio</Text>
          <Text style={styles.vazioSub}>Adicione produtos para comparar!</Text>
        </View>
      ) : (
        <>
          {/* Lista de itens do carrinho */}
          <FlatList
            data={itens}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20, gap: 12 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {/* Emoji do produto */}
                <View style={styles.cardEmoji}>
                  <Text style={{ fontSize: 36 }}>{item.emoji}</Text>
                </View>

                {/* Informações do produto */}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNome}>{item.nome}</Text>
                  <Text style={styles.cardPreco}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </Text>

                  {/* Controle de quantidade */}
                  <View style={styles.qtdRow}>
                    {/* Botão diminuir */}
                    <TouchableOpacity
                      style={styles.qtdBtn}
                      onPress={() => alterar(item.id, -1)}
                    >
                      <Ionicons name="remove" size={16} color="#9d35ff" />
                    </TouchableOpacity>

                    {/* Quantidade atual */}
                    <Text style={styles.qtdTxt}>{item.qtd}</Text>

                    {/* Botão aumentar */}
                    <TouchableOpacity
                      style={styles.qtdBtn}
                      onPress={() => alterar(item.id, 1)}
                    >
                      <Ionicons name="add" size={16} color="#9d35ff" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Botão remover item (remove toda a qtd) */}
                <TouchableOpacity onPress={() => alterar(item.id, -item.qtd)}>
                  <Ionicons name="trash-outline" size={20} color="#ccc" />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Rodapé com total */}
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerLabel}>Total estimado</Text>
              <Text style={styles.footerTotal}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            {/* Botão de finalizar */}
            <TouchableOpacity style={styles.finalizarBtn}>
              <Text style={styles.finalizarTxt}>Ver melhores preços</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
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
  cardPreco: { fontSize: 15, fontWeight: '700', color: '#FF6B35' },

  // Controle de quantidade
  qtdRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  qtdBtn: {
    width: 28, height: 28,
    backgroundColor: '#FFF3EE',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtdTxt: { fontSize: 15, fontWeight: '600', color: '#333' },

  // Rodapé
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
    gap: 14,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: { fontSize: 15, color: '#666' },
  footerTotal: { fontSize: 20, fontWeight: '800', color: '#222' },

  // Botão finalizar
  finalizarBtn: {
    backgroundColor: '#af0bfc',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  finalizarTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
