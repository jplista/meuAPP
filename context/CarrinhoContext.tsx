import { createContext, useContext, useState, ReactNode } from 'react';

type ItemCarrinho = {
  id: string;
  nome: string;
  preco: string;
  precoNumerico: number;
  imagem: string;
  emoji: string;
  qtd: number;
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Omit<ItemCarrinho, 'qtd'>) => void;
  removerDoCarrinho: (id: string) => void;
  alterarQtd: (id: string, delta: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
  totalPreco: number;
  estaNoCarrinho: (id: string) => boolean;
};

const CarrinhoContext = createContext<CarrinhoContextType>({
  itens: [],
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: () => {},
  alterarQtd: () => {},
  limparCarrinho: () => {},
  totalItens: 0,
  totalPreco: 0,
  estaNoCarrinho: () => false,
});

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Omit<ItemCarrinho, 'qtd'>) => {
    setItens((prev) => {
      const existe = prev.find((p) => p.id === produto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, qtd: p.qtd + 1 } : p
        );
      }
      return [...prev, { ...produto, qtd: 1 }];
    });
  };

  const removerDoCarrinho = (id: string) => {
    setItens((prev) => prev.filter((p) => p.id !== id));
  };

  const alterarQtd = (id: string, delta: number) => {
    setItens((prev) =>
      prev
        .map((p) => p.id === id ? { ...p, qtd: p.qtd + delta } : p)
        .filter((p) => p.qtd > 0)
    );
  };

  const limparCarrinho = () => setItens([]);

  const totalItens = itens.reduce((acc, p) => acc + p.qtd, 0);
  const totalPreco = itens.reduce((acc, p) => acc + p.precoNumerico * p.qtd, 0);
  const estaNoCarrinho = (id: string) => itens.some((p) => p.id === id);

  return (
    <CarrinhoContext.Provider value={{
      itens, adicionarAoCarrinho, removerDoCarrinho,
      alterarQtd, limparCarrinho, totalItens, totalPreco, estaNoCarrinho,
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);