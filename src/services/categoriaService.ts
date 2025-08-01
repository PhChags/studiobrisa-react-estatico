import axios from 'axios';
import { type Categoria } from '../interfaces/Categoria';

const API_URL = 'http://localhost:8080/api/categorias';

export const buscarCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await axios.get<Categoria[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};