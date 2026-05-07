import { createContext, useContext, useState, ReactNode } from 'react';

type Produto = {
  id: string;
  nome: string;
  preco: string;
  emoji: string;
};

type FavoritosContextType = {
  favoritos: Produto[];
  toggleFavorito: (produto: Produto) => void;
  isFavorito: (id: string) => boolean;
};

const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  toggleFavorito: () => {},
  isFavorito: () => false,
});

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  const toggleFavorito = (produto: Produto) => {
    setFavoritos((prev) =>
      prev.find((p) => p.id === produto.id)
        ? prev.filter((p) => p.id !== produto.id)
        : [...prev, produto]
    );
  };

  const isFavorito = (id: string) => favoritos.some((p) => p.id === id);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => useContext(FavoritosContext);