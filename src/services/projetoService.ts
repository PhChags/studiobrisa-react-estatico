import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projetos'; 

export interface ProjetoResponse {
  id: number;
  titulo: string;
  descricao: string;
  imagemUrl: string;
  ano: number;
  area: number;
  localizacao: string;
  likes: number;
  dislikes: number;
  dataCadastro: string;
  categoriaNome: string;
}

export const buscarProjetos = async (): Promise<ProjetoResponse[]> => {
  try {
    const response = await axios.get<ProjetoResponse[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }
};

export const buscarPorCategoriaNome = async (nomeCategoria: string): Promise<ProjetoResponse[]> => {
  try {
    const response = await axios.get<ProjetoResponse[]>(`${API_URL}/por-categoria-nome?nome=${encodeURIComponent(nomeCategoria)}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos por categoria:', error);
    return [];
  }
};