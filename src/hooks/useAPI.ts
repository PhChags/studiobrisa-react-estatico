import axios from 'axios';
import { type ProjetoDTO, type ProjetoResponse } from '../interfaces/Projeto';

const API_URL = 'http://localhost:8080/api/projetos';

// Função para criar projeto
export const criarProjeto = async (dto: ProjetoDTO): Promise<ProjetoResponse> => {
  const response = await axios.post<ProjetoResponse>(API_URL, dto);
  
  // Garantir que likes/dislikes sejam 0 mesmo se backend não retornar
  return {
    ...response.data,
    likes: response.data.likes || 0,
    dislikes: response.data.dislikes || 0
  };
};

// Função para atualizar projeto
export const atualizarProjeto = async (id: number, dto: ProjetoDTO): Promise<ProjetoResponse> => {
  const response = await axios.put<ProjetoResponse>(`${API_URL}/${id}`, dto);
  
  // Manter valores existentes de likes/dislikes
  return {
    ...response.data,
    likes: response.data.likes || 0,
    dislikes: response.data.dislikes || 0
  };
};

export const removerProjeto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const buscarProjetoPorId = async (id: number): Promise<ProjetoResponse> => {
  const response = await axios.get<ProjetoResponse>(`${API_URL}/${id}`);
  return response.data;
};

export const listarProjetosPaginados = async (
  categoriaId: number,
  page: number,
  size: number,
  sort: string
): Promise<{ content: ProjetoResponse[]; totalElements: number }> => {
  const response = await axios.get(`${API_URL}/por-categoria`, {
    params: {
      categoriaId,
      page,
      size,
      sort
    }
  });
  
  return {
    content: response.data.content,
    totalElements: response.data.totalElements
  };
};