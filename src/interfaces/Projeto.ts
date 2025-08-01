export interface Projeto {
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
  preco: number; 
  quantidade?: number; 
}
// Interface para transferência de dados (CREATE/UPDATE)
export interface ProjetoDTO {
  titulo: string;
  descricao: string;
  imagemUrl: string;
  ano: number;
  area: number;
  localizacao: string;
  categoriaId: number;
}

// Interface de resposta da API (GET)
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
