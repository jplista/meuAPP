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

const lojas = ['Mercado Livre', 'Amazon', 'Shopee'];

function gerarOfertas(precoBase: number): Oferta[] {
  return lojas.map((loja, i) => {
    const variacao = 1 + i * 0.08;
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
  'esporte': 'sports-accessories',
  'notebook': 'laptops',
  'perfume': 'fragrances',
  'tablet': 'tablets',
};

// 100+ produtos extras brasileiros
const produtosExtras: Produto[] = [
  // Celulares
  { id: 'cel-1', nome: 'iPhone 15 Pro Max 256GB', preco: formatarPreco(7999), precoNumerico: 7999, imagem: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-2', nome: 'Samsung Galaxy S24 Ultra 256GB', preco: formatarPreco(6499), precoNumerico: 6499, imagem: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-3', nome: 'Xiaomi Redmi Note 13 Pro 128GB', preco: formatarPreco(1899), precoNumerico: 1899, imagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', link: '', loja: 'Xiaomi Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-4', nome: 'Motorola Edge 40 Pro 256GB', preco: formatarPreco(2999), precoNumerico: 2999, imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', link: '', loja: 'Motorola Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-5', nome: 'iPhone 14 128GB', preco: formatarPreco(4299), precoNumerico: 4299, imagem: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-6', nome: 'Samsung Galaxy A54 128GB', preco: formatarPreco(1699), precoNumerico: 1699, imagem: 'https://images.unsplash.com/photo-1610945264803-c22b62831e8b?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-7', nome: 'iPhone 13 128GB', preco: formatarPreco(3499), precoNumerico: 3499, imagem: 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-8', nome: 'Motorola Moto G84 256GB', preco: formatarPreco(1299), precoNumerico: 1299, imagem: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400', link: '', loja: 'Motorola Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-9', nome: 'Samsung Galaxy S23 FE 128GB', preco: formatarPreco(2499), precoNumerico: 2499, imagem: 'https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'cel-10', nome: 'Xiaomi 13T Pro 256GB', preco: formatarPreco(3299), precoNumerico: 3299, imagem: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400', link: '', loja: 'Xiaomi Store', condicao: 'Novo', fonte: 'extra' },

  // Notebooks
  { id: 'nb-1', nome: 'Notebook Dell Inspiron 15 i5', preco: formatarPreco(3299), precoNumerico: 3299, imagem: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', link: '', loja: 'Dell Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'nb-2', nome: 'MacBook Air M2 256GB', preco: formatarPreco(9499), precoNumerico: 9499, imagem: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'nb-3', nome: 'Notebook Lenovo IdeaPad 3', preco: formatarPreco(2799), precoNumerico: 2799, imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', link: '', loja: 'Lenovo Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'nb-4', nome: 'Notebook Acer Aspire 5 i5', preco: formatarPreco(3099), precoNumerico: 3099, imagem: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', link: '', loja: 'Acer Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'nb-5', nome: 'MacBook Pro M3 512GB', preco: formatarPreco(15999), precoNumerico: 15999, imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'nb-6', nome: 'Notebook HP Pavilion 15', preco: formatarPreco(2999), precoNumerico: 2999, imagem: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400', link: '', loja: 'HP Store', condicao: 'Novo', fonte: 'extra' },

  // TVs
  { id: 'tv-1', nome: 'Smart TV Samsung 55" 4K QLED', preco: formatarPreco(2799), precoNumerico: 2799, imagem: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tv-2', nome: 'Smart TV LG 50" 4K NanoCell', preco: formatarPreco(2299), precoNumerico: 2299, imagem: 'https://images.unsplash.com/photo-1571415060716-baff5ea4c8d0?w=400', link: '', loja: 'LG Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tv-3', nome: 'Smart TV Sony 65" 4K OLED', preco: formatarPreco(6499), precoNumerico: 6499, imagem: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=400', link: '', loja: 'Sony Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tv-4', nome: 'Smart TV TCL 43" 4K Android', preco: formatarPreco(1299), precoNumerico: 1299, imagem: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400', link: '', loja: 'TCL Store', condicao: 'Novo', fonte: 'extra' },

  // Fones e Áudio
  { id: 'fone-1', nome: 'Fone Sony WH-1000XM5', preco: formatarPreco(2199), precoNumerico: 2199, imagem: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', link: '', loja: 'Sony Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'fone-2', nome: 'AirPods Pro 2ª Geração', preco: formatarPreco(1899), precoNumerico: 1899, imagem: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'fone-3', nome: 'Fone JBL Tune 510BT', preco: formatarPreco(299), precoNumerico: 299, imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', link: '', loja: 'JBL Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'fone-4', nome: 'Galaxy Buds2 Pro', preco: formatarPreco(999), precoNumerico: 999, imagem: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'fone-5', nome: 'Caixa de Som JBL Charge 5', preco: formatarPreco(899), precoNumerico: 899, imagem: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', link: '', loja: 'JBL Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'fone-6', nome: 'Headset Gamer HyperX Cloud II', preco: formatarPreco(499), precoNumerico: 499, imagem: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400', link: '', loja: 'HyperX Store', condicao: 'Novo', fonte: 'extra' },

  // Tablets
  { id: 'tab-1', nome: 'iPad Air 5ª Geração 64GB', preco: formatarPreco(5299), precoNumerico: 5299, imagem: 'https://images.unsplash.com/photo-1544244015-0df4702503db?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tab-2', nome: 'Samsung Galaxy Tab S9 128GB', preco: formatarPreco(3499), precoNumerico: 3499, imagem: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tab-3', nome: 'iPad 10ª Geração 64GB', preco: formatarPreco(3999), precoNumerico: 3999, imagem: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400', link: '', loja: 'Apple Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'tab-4', nome: 'Xiaomi Pad 6 128GB', preco: formatarPreco(1999), precoNumerico: 1999, imagem: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400', link: '', loja: 'Xiaomi Store', condicao: 'Novo', fonte: 'extra' },

  // Tênis
  { id: 'ten-1', nome: 'Tênis Nike Air Max 270', preco: formatarPreco(899), precoNumerico: 899, imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', link: '', loja: 'Nike Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ten-2', nome: 'Adidas Ultraboost 22', preco: formatarPreco(749), precoNumerico: 749, imagem: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', link: '', loja: 'Adidas Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ten-3', nome: 'Nike Revolution 6', preco: formatarPreco(399), precoNumerico: 399, imagem: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=400', link: '', loja: 'Nike Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ten-4', nome: 'Adidas Grand Court 2.0', preco: formatarPreco(349), precoNumerico: 349, imagem: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400', link: '', loja: 'Adidas Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ten-5', nome: 'New Balance 574', preco: formatarPreco(599), precoNumerico: 599, imagem: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400', link: '', loja: 'New Balance', condicao: 'Novo', fonte: 'extra' },
  { id: 'ten-6', nome: 'Puma Softride Enzo', preco: formatarPreco(299), precoNumerico: 299, imagem: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400', link: '', loja: 'Puma Store', condicao: 'Novo', fonte: 'extra' },

  // Games
  { id: 'game-1', nome: 'PlayStation 5 Slim 1TB', preco: formatarPreco(4299), precoNumerico: 4299, imagem: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400', link: '', loja: 'Sony Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'game-2', nome: 'Xbox Series X 1TB', preco: formatarPreco(4499), precoNumerico: 4499, imagem: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400', link: '', loja: 'Microsoft Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'game-3', nome: 'Nintendo Switch OLED', preco: formatarPreco(2799), precoNumerico: 2799, imagem: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400', link: '', loja: 'Nintendo Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'game-4', nome: 'Controle PS5 DualSense', preco: formatarPreco(499), precoNumerico: 499, imagem: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', link: '', loja: 'Sony Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'game-5', nome: 'GTA V Premium PS5', preco: formatarPreco(199), precoNumerico: 199, imagem: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=400', link: '', loja: 'Rockstar Store', condicao: 'Novo', fonte: 'extra' },

  // Eletrodomésticos
  { id: 'ele-1', nome: 'Geladeira Samsung 460L Frost Free', preco: formatarPreco(3499), precoNumerico: 3499, imagem: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400', link: '', loja: 'Samsung Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ele-2', nome: 'Máquina de Lavar LG 12Kg', preco: formatarPreco(2199), precoNumerico: 2199, imagem: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400', link: '', loja: 'LG Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ele-3', nome: 'Micro-ondas Panasonic 32L', preco: formatarPreco(699), precoNumerico: 699, imagem: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', link: '', loja: 'Panasonic Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'ele-4', nome: 'Ar Condicionado Split 12000 BTU', preco: formatarPreco(1899), precoNumerico: 1899, imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', link: '', loja: 'Electrolux', condicao: 'Novo', fonte: 'extra' },
  { id: 'ele-5', nome: 'Cafeteira Nespresso Essenza', preco: formatarPreco(599), precoNumerico: 599, imagem: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=400', link: '', loja: 'Nespresso', condicao: 'Novo', fonte: 'extra' },

  // Beleza
  { id: 'bel-1', nome: 'Perfume Importado Chanel N5', preco: formatarPreco(799), precoNumerico: 799, imagem: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400', link: '', loja: 'Chanel', condicao: 'Novo', fonte: 'extra' },
  { id: 'bel-2', nome: 'Kit Skincare La Roche-Posay', preco: formatarPreco(349), precoNumerico: 349, imagem: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', link: '', loja: 'Drogaria', condicao: 'Novo', fonte: 'extra' },
  { id: 'bel-3', nome: 'Paleta de Sombras Morphe', preco: formatarPreco(199), precoNumerico: 199, imagem: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', link: '', loja: 'Morphe', condicao: 'Novo', fonte: 'extra' },
  { id: 'bel-4', nome: 'Secador de Cabelo Dyson Supersonic', preco: formatarPreco(2999), precoNumerico: 2999, imagem: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400', link: '', loja: 'Dyson Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'bel-5', nome: 'Chapinha Ghd Platinum+', preco: formatarPreco(1299), precoNumerico: 1299, imagem: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400', link: '', loja: 'GHD Store', condicao: 'Novo', fonte: 'extra' },

  // Moda Feminina
  { id: 'mf-1', nome: 'Vestido Midi Floral Farm', preco: formatarPreco(349), precoNumerico: 349, imagem: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', link: '', loja: 'Farm Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'mf-2', nome: 'Bolsa Michael Kors Couro', preco: formatarPreco(1299), precoNumerico: 1299, imagem: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', link: '', loja: 'Michael Kors', condicao: 'Novo', fonte: 'extra' },
  { id: 'mf-3', nome: 'Calça Jeans Levi\'s 501', preco: formatarPreco(399), precoNumerico: 399, imagem: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', link: '', loja: 'Levi\'s Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'mf-4', nome: 'Tênis Feminino Vans Old Skool', preco: formatarPreco(449), precoNumerico: 449, imagem: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', link: '', loja: 'Vans Store', condicao: 'Novo', fonte: 'extra' },

  // Moda Masculina
  { id: 'mm-1', nome: 'Camisa Polo Lacoste Regular', preco: formatarPreco(499), precoNumerico: 499, imagem: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400', link: '', loja: 'Lacoste', condicao: 'Novo', fonte: 'extra' },
  { id: 'mm-2', nome: 'Calça Cargo Masculina Zara', preco: formatarPreco(299), precoNumerico: 299, imagem: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', link: '', loja: 'Zara', condicao: 'Novo', fonte: 'extra' },
  { id: 'mm-3', nome: 'Relógio Masculino Casio G-Shock', preco: formatarPreco(799), precoNumerico: 799, imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', link: '', loja: 'Casio Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'mm-4', nome: 'Tênis Masculino Air Force 1', preco: formatarPreco(699), precoNumerico: 699, imagem: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400', link: '', loja: 'Nike Store', condicao: 'Novo', fonte: 'extra' },

  // Joias
  { id: 'joi-1', nome: 'Anel Solitário Ouro 18k', preco: formatarPreco(1899), precoNumerico: 1899, imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', link: '', loja: 'Joalheria', condicao: 'Novo', fonte: 'extra' },
  { id: 'joi-2', nome: 'Colar Prata com Pingente', preco: formatarPreco(299), precoNumerico: 299, imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', link: '', loja: 'Joalheria', condicao: 'Novo', fonte: 'extra' },
  { id: 'joi-3', nome: 'Pulseira Pandora Prata', preco: formatarPreco(599), precoNumerico: 599, imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', link: '', loja: 'Pandora', condicao: 'Novo', fonte: 'extra' },
  { id: 'joi-4', nome: 'Brinco Argola Dourado', preco: formatarPreco(149), precoNumerico: 149, imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', link: '', loja: 'Joalheria', condicao: 'Novo', fonte: 'extra' },

  // Esportes
  { id: 'esp-1', nome: 'Bicicleta Ergométrica Kikos', preco: formatarPreco(1299), precoNumerico: 1299, imagem: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400', link: '', loja: 'Kikos', condicao: 'Novo', fonte: 'extra' },
  { id: 'esp-2', nome: 'Tênis Asics Gel-Kayano 30', preco: formatarPreco(899), precoNumerico: 899, imagem: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400', link: '', loja: 'Asics Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'esp-3', nome: 'Esteira Elétrica Speedo', preco: formatarPreco(2999), precoNumerico: 2999, imagem: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', link: '', loja: 'Speedo', condicao: 'Novo', fonte: 'extra' },
  { id: 'esp-4', nome: 'Bola de Futebol Nike Premier', preco: formatarPreco(249), precoNumerico: 249, imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', link: '', loja: 'Nike Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'esp-5', nome: 'Kit Musculação Halteres 20kg', preco: formatarPreco(399), precoNumerico: 399, imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', link: '', loja: 'Decathlon', condicao: 'Novo', fonte: 'extra' },

  // Casa
  { id: 'cas-1', nome: 'Sofá 3 Lugares Retrátil', preco: formatarPreco(2499), precoNumerico: 2499, imagem: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', link: '', loja: 'Mobly', condicao: 'Novo', fonte: 'extra' },
  { id: 'cas-2', nome: 'Aspirador Robô Roomba i7', preco: formatarPreco(3299), precoNumerico: 3299, imagem: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', link: '', loja: 'iRobot', condicao: 'Novo', fonte: 'extra' },
  { id: 'cas-3', nome: 'Conjunto de Panelas Tramontina', preco: formatarPreco(599), precoNumerico: 599, imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', link: '', loja: 'Tramontina', condicao: 'Novo', fonte: 'extra' },
  { id: 'cas-4', nome: 'Luminária de Mesa Philips Hue', preco: formatarPreco(499), precoNumerico: 499, imagem: 'https://images.unsplash.com/photo-1513506003901-1e6a35d96f62?w=400', link: '', loja: 'Philips', condicao: 'Novo', fonte: 'extra' },

  // Brinquedos
  { id: 'bri-1', nome: 'LEGO Technic Bugatti 42083', preco: formatarPreco(1899), precoNumerico: 1899, imagem: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400', link: '', loja: 'LEGO Store', condicao: 'Novo', fonte: 'extra' },
  { id: 'bri-2', nome: 'Boneca Barbie Dreamhouse', preco: formatarPreco(499), precoNumerico: 499, imagem: 'https://images.unsplash.com/photo-1630945386735-372fbe731e3d?w=400', link: '', loja: 'Mattel', condicao: 'Novo', fonte: 'extra' },
  { id: 'bri-3', nome: 'Hot Wheels Pista Ultimate Garage', preco: formatarPreco(899), precoNumerico: 899, imagem: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400', link: '', loja: 'Mattel', condicao: 'Novo', fonte: 'extra' },

  // Livros
  { id: 'liv-1', nome: 'Livro Pai Rico Pai Pobre', preco: formatarPreco(49), precoNumerico: 49, imagem: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', link: '', loja: 'Livraria', condicao: 'Novo', fonte: 'extra' },
  { id: 'liv-2', nome: 'Livro Hábitos Atômicos', preco: formatarPreco(59), precoNumerico: 59, imagem: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', link: '', loja: 'Livraria', condicao: 'Novo', fonte: 'extra' },
  { id: 'liv-3', nome: 'Livro O Poder do Hábito', preco: formatarPreco(44), precoNumerico: 44, imagem: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', link: '', loja: 'Livraria', condicao: 'Novo', fonte: 'extra' },

  // Pet Shop
  { id: 'pet-1', nome: 'Ração Royal Canin Golden 15kg', preco: formatarPreco(349), precoNumerico: 349, imagem: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', link: '', loja: 'PetLove', condicao: 'Novo', fonte: 'extra' },
  { id: 'pet-2', nome: 'Cama Pet Ortopédica L', preco: formatarPreco(199), precoNumerico: 199, imagem: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400', link: '', loja: 'PetLove', condicao: 'Novo', fonte: 'extra' },
  { id: 'pet-3', nome: 'Arranhador Gato com Casa', preco: formatarPreco(299), precoNumerico: 299, imagem: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', link: '', loja: 'PetLove', condicao: 'Novo', fonte: 'extra' },
];

const categoriasExtrasMap: Record<string, string[]> = {
  'celular': ['cel-'],
  'smartphone': ['cel-'],
  'iphone': ['cel-'],
  'samsung': ['cel-', 'tv-', 'tab-', 'fone-'],
  'notebook': ['nb-'],
  'tv': ['tv-'],
  'televisao': ['tv-'],
  'fone': ['fone-'],
  'headphone': ['fone-'],
  'tablet': ['tab-'],
  'ipad': ['tab-'],
  'tênis': ['ten-', 'esp-'],
  'nike': ['ten-', 'esp-', 'mm-'],
  'adidas': ['ten-'],
  'game': ['game-'],
  'playstation': ['game-'],
  'xbox': ['game-'],
  'nintendo': ['game-'],
  'geladeira': ['ele-'],
  'eletrodomestico': ['ele-'],
  'beleza': ['bel-'],
  'perfume': ['bel-'],
  'maquiagem': ['bel-'],
  'vestido': ['mf-'],
  'moda feminina': ['mf-'],
  'camisa': ['mm-'],
  'moda masculina': ['mm-'],
  'joia': ['joi-'],
  'anel': ['joi-'],
  'pulseira': ['joi-'],
  'esporte': ['esp-'],
  'bicicleta': ['esp-'],
  'casa': ['cas-'],
  'sofa': ['cas-'],
  'brinquedo': ['bri-'],
  'lego': ['bri-'],
  'livro': ['liv-'],
  'pet': ['pet-'],
  'cao': ['pet-'],
  'gato': ['pet-'],
};

async function buscarDummy(query: string): Promise<Produto[]> {
  try {
    const categoria = categoriasMap[query.toLowerCase()];
    let url = '';
    if (categoria) {
      url = `${DUMMY}/products/category/${categoria}?limit=15`;
    } else if (query.toLowerCase() === 'ofertas do dia') {
      url = `${DUMMY}/products?limit=20&skip=${Math.floor(Math.random() * 30)}`;
    } else {
      url = `${DUMMY}/products/search?q=${encodeURIComponent(query)}&limit=15`;
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
    const resultado = filtrados.length > 0 ? filtrados : data.slice(0, 5);
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

function filtrarExtras(query: string): Produto[] {
  const q = query.toLowerCase();

  if (q === 'ofertas do dia') return produtosExtras;

  // Busca por prefixos de categoria
  const prefixos = categoriasExtrasMap[q] ?? [];
  const porCategoria = prefixos.length > 0
    ? produtosExtras.filter(p => prefixos.some(pref => p.id.startsWith(pref)))
    : [];

  // Busca por nome
  const porNome = produtosExtras.filter(p =>
    p.nome.toLowerCase().includes(q) ||
    p.loja.toLowerCase().includes(q)
  );

  // Combina sem duplicatas
  const combinados = [...porCategoria, ...porNome];
  const vistos = new Set<string>();
  return combinados.filter(p => {
    if (vistos.has(p.id)) return false;
    vistos.add(p.id);
    return true;
  });
}

export async function buscarProdutos(query: string): Promise<Produto[]> {
  try {
    console.log('🔍 Buscando:', query);

    const [dummy, fake] = await Promise.all([
      buscarDummy(query),
      buscarFake(query),
    ]);

    const extras = filtrarExtras(query);

    console.log(`📦 Extras: ${extras.length} | Dummy: ${dummy.length} | Fake: ${fake.length}`);

    const combinados = [...extras, ...dummy, ...fake];

    const vistos = new Set<string>();
    const unicos = combinados.filter((p) => {
      const chave = p.nome.toLowerCase().slice(0, 25);
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    });

    console.log('✅ Total final:', unicos.length);
    return unicos;

  } catch (error) {
    console.error('❌ Erro ao buscar:', error);
    return [];
  }
}

export async function compararPrecos(produtoId: string): Promise<ResultadoComparacao | null> {
  try {

    // Produto dos extras
    const extra = produtosExtras.find(p => p.id === produtoId);
    if (extra) {
      return {
        nome: extra.nome,
        imagem: extra.imagem,
        ofertas: gerarOfertas(extra.precoNumerico),
      };
    }

    if (produtoId.startsWith('dummy-')) {
      const id = produtoId.replace('dummy-', '');
      const res = await fetch(`${DUMMY}/products/${id}`);
      const item = await res.json();
      if (!item?.id) return null;
      return {
        nome: item.title,
        imagem: item.thumbnail ?? '',
        ofertas: gerarOfertas(converterParaReal(item.price)),
      };
    }

    if (produtoId.startsWith('fake-')) {
      const id = produtoId.replace('fake-', '');
      const res = await fetch(`${FAKE}/products/${id}`);
      const item = await res.json();
      if (!item?.id) return null;
      return {
        nome: item.title,
        imagem: item.image ?? '',
        ofertas: gerarOfertas(converterParaReal(item.price)),
      };
    }

    return null;

  } catch (error) {
    console.error('Erro ao comparar preços:', error);
    return null;
  }
}