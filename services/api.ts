const DUMMY = 'https://dummyjson.com';
const FAKE = 'https://fakestoreapi.com';

export type Produto = {
  id: string;
  nome: string;
  preco: string;
  precoNumerico: number;
  imagem: string;
  link: string;
  loja: string;
  condicao: string;
  fonte: string;
};

export type Oferta = {
  loja: string;
  preco: string;
  precoNumerico: number;
  link: string;
  condicao: string;
  parcelas?: string;
};

export type ResultadoComparacao = {
  nome: string;
  imagem: string;
  ofertas: Oferta[];
};

function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function converterParaReal(valorUSD: number): number {
  return Math.round(valorUSD * 5.2 * 100) / 100;
}

// Lojas simuladas para comparação
const lojas = ['Mercado Livre', 'Amazon', 'Shopee'];

// Gera preços variados para simular comparação entre lojas
function gerarOfertas(nome: string, precoBase: number, imagem: string): Oferta[] {
  return lojas.map((loja, i) => {
    const variacao = 1 + (i * 0.08); // 0%, 8%, 16% mais caro
    const preco = precoBase * variacao;
    return {
      loja,
      preco: formatarPreco(preco),
      precoNumerico: preco,
      link: `https://www.${loja.toLowerCase().replace(' ', '')}.com.br`,
      condicao: 'Novo',
      parcelas: `12x de ${formatarPreco(preco / 12)}`,
    };
  });
}

// Mapa de categorias
const categoriasMap: Record<string, string> = {
  'ofertas do dia': '',
  'tênis': 'mens-shoes',
  'maquiagem': 'beauty',
  'vestido feminino': 'womens-dresses',
  'joias prata': 'womens-jewellery',
  'camisa masculina': 'mens-shirts',
  'celular': 'smartphones',
  'smartphone': 'smartphones',
  'iphone': 'smartphones',
  'samsung': 'smartphones',
};

// Busca no DummyJSON
async function buscarDummy(query: string): Promise<Produto[]> {
  try {
    const categoria = categoriasMap[query.toLowerCase()];
    let url = '';

    if (categoria) {
      url = `${DUMMY}/products/category/${categoria}?limit=20`;
    } else if (query.toLowerCase() === 'ofertas do dia') {
      url = `${DUMMY}/products?limit=20&skip=${Math.floor(Math.random() * 50)}`;
    } else {
      url = `${DUMMY}/products/search?q=${encodeURIComponent(query)}&limit=20`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (!data?.products) return [];

    return data.products.map((item: any): Produto => ({
      id: `dummy-${item.id}`,
      nome: item.title,
      preco: formatarPreco(converterParaReal(item.price)),
      precoNumerico: converterParaReal(item.price),
      imagem: item.thumbnail ?? '',
      link: `https://dummyjson.com/products/${item.id}`,
      loja: item.brand ?? 'Loja Virtual',
      condicao: 'Novo',
      fonte: 'dummy',
    }));
  } catch {
    return [];
  }
}

// Busca na FakeStore
async function buscarFake(query: string): Promise<Produto[]> {
  try {
    const response = await fetch(`${FAKE}/products`);
    const data: any[] = await response.json();

    const filtrados = query.toLowerCase() === 'ofertas do dia'
      ? data
      : data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );

    const resultado = filtrados.length > 0 ? filtrados : data.slice(0, 10);

    return resultado.slice(0, 10).map((item: any): Produto => ({
      id: `fake-${item.id}`,
      nome: item.title,
      preco: formatarPreco(converterParaReal(item.price)),
      precoNumerico: converterParaReal(item.price),
      imagem: item.image ?? '',
      link: `https://fakestoreapi.com/products/${item.id}`,
      loja: 'FakeStore',
      condicao: 'Novo',
      fonte: 'fake',
    }));
  } catch {
    return [];
  }
}

// Produtos de celulares extras para enriquecer
const celularesExtras: Produto[] = [
  {
    id: 'cel-1', nome: 'iPhone 15 Pro Max 256GB',
    preco: formatarPreco(7999), precoNumerico: 7999,
    imagem: 'https://dummyjson.com/image/400x300/nature?type=jpeg',
    link: 'https://www.mercadolivre.com.br', loja: 'Apple Store',
    condicao: 'Novo', fonte: 'extra',
  },
  {
    id: 'cel-2', nome: 'Samsung Galaxy S24 Ultra',
    preco: formatarPreco(6499), precoNumerico: 6499,
    imagem: 'https://dummyjson.com/image/400x300/nature?type=jpeg',
    link: 'https://www.mercadolivre.com.br', loja: 'Samsung Store',
    condicao: 'Novo', fonte: 'extra',
  },
  {
    id: 'cel-3', nome: 'Xiaomi Redmi Note 13 Pro',
    preco: formatarPreco(1899), precoNumerico: 1899,
    imagem: 'https://dummyjson.com/image/400x300/nature?type=jpeg',
    link: 'https://www.mercadolivre.com.br', loja: 'Xiaomi Store',
    condicao: 'Novo', fonte: 'extra',
  },
  {
    id: 'cel-4', nome: 'Motorola Edge 40 Pro',
    preco: formatarPreco(2999), precoNumerico: 2999,
    imagem: 'https://dummyjson.com/image/400x300/nature?type=jpeg',
    link: 'https://www.mercadolivre.com.br', loja: 'Motorola Store',
    condicao: 'Novo', fonte: 'extra',
  },
];

// Função principal — combina as 3 fontes
export async function buscarProdutos(query: string): Promise<Produto[]> {
  try {
    console.log('🔍 Buscando:', query);

    const isCelular = ['celular', 'smartphone', 'iphone', 'samsung', 'xiaomi', 'motorola']
      .some(t => query.toLowerCase().includes(t));

    const [dummy, fake] = await Promise.all([
      buscarDummy(query),
      buscarFake(query),
    ]);

    // Combina resultados e remove duplicatas por nome similar
    let combinados = [...dummy, ...fake];

    // Adiciona celulares se a busca for relacionada
    if (isCelular || query.toLowerCase() === 'ofertas do dia') {
      combinados = [...celularesExtras, ...combinados];
    }

    // Remove duplicatas por nome
    const vistos = new Set<string>();
    const unicos = combinados.filter((p) => {
      const chave = p.nome.toLowerCase().slice(0, 20);
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    });

    console.log('📦 Total combinado:', unicos.length);
    return unicos.slice(0, 30);

  } catch (error) {
    console.error('❌ Erro ao buscar:', error);
    return [];
  }
}

export async function compararPrecos(produtoId: string): Promise<ResultadoComparacao | null> {
  try {
    let nome = '';
    let imagem = '';
    let precoBase = 0;

    if (produtoId.startsWith('cel-')) {
      const cel = celularesExtras.find(c => c.id === produtoId);
      if (!cel) return null;
      nome = cel.nome;
      imagem = cel.imagem;
      precoBase = cel.precoNumerico;

    } else if (produtoId.startsWith('dummy-')) {
      const id = produtoId.replace('dummy-', '');
      const res = await fetch(`${DUMMY}/products/${id}`);
      const item = await res.json();
      if (!item?.id) return null;
      nome = item.title;
      imagem = item.thumbnail ?? '';
      precoBase = converterParaReal(item.price);

    } else if (produtoId.startsWith('fake-')) {
      const id = produtoId.replace('fake-', '');
      const res = await fetch(`${FAKE}/products/${id}`);
      const item = await res.json();
      if (!item?.id) return null;
      nome = item.title;
      imagem = item.image ?? '';
      precoBase = converterParaReal(item.price);

    } else {
      return null;
    }

    const ofertas = gerarOfertas(nome, precoBase, imagem);

    return { nome, imagem, ofertas };

  } catch (error) {
    console.error('Erro ao comparar preços:', error);
    return null;
  }
}