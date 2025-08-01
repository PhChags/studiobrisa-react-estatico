import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritosState {
  favoritos: Record<number, number[]>;
  toggleFavorito: (userId: number, projetoId: number) => void;
  removerFavorito: (userId: number, projetoId: number) => void;
  isFavorito: (userId: number, projetoId: number) => boolean;
  getFavoritosPorUsuario: (userId: number) => number[];
  // Nova função adicionada
  removerProjetoDeTodosOsFavoritos: (projetoId: number) => void;
}

// Tipo para o estado persistido
type PersistedFavoritosState = {
  favoritos: Record<number, number[]>;
};

export const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: {},
      
      toggleFavorito: (userId, projetoId) => {
        set((state) => {
          const userFavorites = Array.isArray(state.favoritos[userId]) 
            ? state.favoritos[userId] 
            : [];
            
          const newFavorites = userFavorites.includes(projetoId)
            ? userFavorites.filter(id => id !== projetoId)
            : [...userFavorites, projetoId];
            
          return {
            favoritos: {
              ...state.favoritos,
              [userId]: newFavorites
            }
          };
        });
      },
      
      removerFavorito: (userId, projetoId) => {
        set((state) => {
          const userFavorites = Array.isArray(state.favoritos[userId]) 
            ? state.favoritos[userId] 
            : [];
            
          return {
            favoritos: {
              ...state.favoritos,
              [userId]: userFavorites.filter(id => id !== projetoId)
            }
          };
        });
      },
      
      isFavorito: (userId, projetoId) => {
        const userFavorites = userId && get().favoritos[userId] 
          ? get().favoritos[userId] 
          : [];
          
        return Array.isArray(userFavorites) 
          ? userFavorites.includes(projetoId) 
          : false;
      },
      
      getFavoritosPorUsuario: (userId) => {
        const userFavorites = userId && get().favoritos[userId] 
          ? get().favoritos[userId] 
          : [];
          
        return Array.isArray(userFavorites) 
          ? userFavorites 
          : [];
      },
      
      // NOVA FUNÇÃO: Remove um projeto de todos os favoritos de todos os usuários
      removerProjetoDeTodosOsFavoritos: (projetoId) => {
        set((state) => {
          const novosFavoritos = { ...state.favoritos };
          
          // Percorre todos os usuários
          for (const userId in novosFavoritos) {
            if (Object.prototype.hasOwnProperty.call(novosFavoritos, userId)) {
              // Filtra o projeto da lista de favoritos do usuário
              novosFavoritos[userId] = novosFavoritos[userId].filter(
                id => id !== projetoId
              );
              
              // Remove o usuário se não tiver mais favoritos
              if (novosFavoritos[userId].length === 0) {
                delete novosFavoritos[userId];
              }
            }
          }
          
          return { favoritos: novosFavoritos };
        });
      }
    }),
    {
      name: 'favoritos-storage',
      version: 1,
      migrate: (persistedState) => {
        try {
          // Estado inicial se não há dados persistidos
          if (!persistedState) return { favoritos: {} } as FavoritosState;
          
          // Caso 1: PersistedState é um array (estrutura antiga)
          if (Array.isArray(persistedState)) {
            return { favoritos: {} } as FavoritosState;
          }
          
          // Caso 2: PersistedState é um objeto mas não tem estrutura correta
          if (typeof persistedState === 'object' && !('favoritos' in persistedState)) {
            return { favoritos: {} } as FavoritosState;
          }
          
          // Caso 3: Estrutura correta mas valores podem estar errados
          const state = persistedState as PersistedFavoritosState;
          
          const fixedFavoritos = Object.entries(state.favoritos)
            .reduce((acc, [key, value]) => {
              const userId = Number(key);
              const projetos = Array.isArray(value) 
                ? value.filter(id => typeof id === 'number') 
                : [];
              
              return {
                ...acc,
                [userId]: projetos
              };
            }, {} as Record<number, number[]>);
            
          return { favoritos: fixedFavoritos } as FavoritosState;
        } catch (error) {
          console.error('Erro na migração dos favoritos:', error);
          return { favoritos: {} } as FavoritosState;
        }
      }
    }
  )
);