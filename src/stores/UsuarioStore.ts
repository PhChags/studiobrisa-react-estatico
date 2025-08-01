import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface UsuarioStore {
    usuarioId: number;         
    usuarioLogado: boolean;    
    setUsuario: (id: number) => void;
    logout: () => void;
}

const useUsuarioStore = create<UsuarioStore>()(
  persist(
    (set) => ({
      usuarioId: 0,
      usuarioLogado: false,
      
      setUsuario: (id) => set({ 
        usuarioId: id,
        usuarioLogado: true,
      }),
      
      logout: () => set({ 
        usuarioId: 0,
        usuarioLogado: false,
      }),
    }),
    {
      name: 'usuario-storage',
    }
  )
);

export default useUsuarioStore;