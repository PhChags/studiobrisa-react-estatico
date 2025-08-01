import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CarrinhoItem {
  quantidade: number;
}

interface CarrinhoState {
  carrinhos: Record<number, Record<number, CarrinhoItem>>; // { [userId]: { [projetoId]: CarrinhoItem } }
  adicionarAoCarrinho: (userId: number, projetoId: number, quantidade: number) => void;
  atualizarQuantidade: (userId: number, projetoId: number, quantidade: number) => void;
  removerItem: (userId: number, projetoId: number) => void;
  limparCarrinho: (userId: number) => void;
  getCarrinhoUsuario: (userId: number) => Record<number, CarrinhoItem>;
  removerProjetoDeTodosOsCarrinhos: (projetoId: number) => void; // Nova função
}

export const useCarrinhoStore = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      carrinhos: {},
      
      adicionarAoCarrinho: (userId, projetoId, quantidade) => {
        set((state) => {
          const userCart = state.carrinhos[userId] || {};
          const currentQty = userCart[projetoId]?.quantidade || 0;
          const newQuantity = currentQty + quantidade;
          
          return {
            carrinhos: {
              ...state.carrinhos,
              [userId]: {
                ...userCart,
                [projetoId]: { quantidade: newQuantity }
              }
            }
          };
        });
      },
      
      atualizarQuantidade: (userId, projetoId, quantidade) => {
        set((state) => {
          const userCart = state.carrinhos[userId] || {};
          
          if (quantidade <= 0) {
            const newCart = { ...userCart };
            delete newCart[projetoId];
            
            return {
              carrinhos: {
                ...state.carrinhos,
                [userId]: newCart
              }
            };
          }
          
          return {
            carrinhos: {
              ...state.carrinhos,
              [userId]: {
                ...userCart,
                [projetoId]: { quantidade }
              }
            }
          };
        });
      },
      
      removerItem: (userId, projetoId) => {
        set((state) => {
          const userCart = { ...(state.carrinhos[userId] || {}) };
          delete userCart[projetoId];
          
          return {
            carrinhos: {
              ...state.carrinhos,
              [userId]: userCart
            }
          };
        });
      },
      
      limparCarrinho: (userId) => {
        set((state) => ({
          carrinhos: {
            ...state.carrinhos,
            [userId]: {}
          }
        }));
      },
      
      getCarrinhoUsuario: (userId) => {
        return get().carrinhos[userId] || {};
      },
      
      // Nova função para remover um projeto de todos os carrinhos
      removerProjetoDeTodosOsCarrinhos: (projetoId) => {
        set((state) => {
          // Criar uma cópia do estado atual
          const novosCarrinhos = { ...state.carrinhos };
          
          // Iterar sobre todos os usuários
          for (const userId in novosCarrinhos) {
            if (Object.prototype.hasOwnProperty.call(novosCarrinhos, userId)) {
              const carrinhoUsuario = { ...novosCarrinhos[userId] };
              
              // Verificar se o projeto existe no carrinho do usuário
              if (carrinhoUsuario[projetoId]) {
                // Remover o projeto do carrinho do usuário
                delete carrinhoUsuario[projetoId];
                novosCarrinhos[userId] = carrinhoUsuario;
              }
            }
          }
          
          return { carrinhos: novosCarrinhos };
        });
      }
    }),
    {
      name: 'carrinho-storage',
    }
  )
);