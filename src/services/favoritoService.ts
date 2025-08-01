const API_BASE_URL = "http://localhost:8080/api";

export const apiFavoritarProjeto = async (projetoId: number, usuarioId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favoritos/${usuarioId}/${projetoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione token de autenticação se necessário
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao favoritar projeto');
    }

    return response.json();
  } catch (error) {
    console.error('Erro no serviço de favoritos:', error);
    throw error;
  }
};