import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ProjetoCard from '../components/ProjetoCard';
import { useFavoritosStore } from '../stores/FavoritosStore';
import { useCarrinhoStore } from '../stores/CarrinhoStore';
import useUsuarioStore from '../stores/UsuarioStore';
import { HeartFill } from 'react-bootstrap-icons';
import { buscarProjetos } from '../services/projetoService';
import { precos } from '../data/precos';
import { type Projeto } from '../interfaces/Projeto';

const FavoritosPage: React.FC = () => {
  document.title = "Favoritos | Studio Brisa";
  const usuarioLogado = useUsuarioStore(state => state.usuarioLogado);
  const usuarioId = useUsuarioStore(state => state.usuarioId);
  const { getFavoritosPorUsuario, removerFavorito } = useFavoritosStore();
  
  // Obtém a store do carrinho
  const { atualizarQuantidade, getCarrinhoUsuario } = useCarrinhoStore();
  
  // Estados para projetos e carregamento
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtém IDs dos projetos favoritos do usuário atual
  const favoritosIds = usuarioId ? getFavoritosPorUsuario(usuarioId) : [];
  
  // Obtém o carrinho do usuário atual
  const carrinhoUsuario = usuarioId ? getCarrinhoUsuario(usuarioId) : {};

  // Carrega projetos da API
  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        const projetosAPI = await buscarProjetos();
        
        // Adicionar preço aos projetos
        const projetosComPreco = projetosAPI.map(projeto => ({
          ...projeto,
          preco: precos[projeto.id] || 0 // Usar preço padrão se não encontrado
        }));
        
        setProjetos(projetosComPreco);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError('Não foi possível carregar os projetos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarProjetos();
  }, []);

  // Filtra projetos favoritados
  const projetosFavoritos = projetos.filter(p => favoritosIds.includes(p.id));

  const handleQuantidadeChange = (projetoId: number, value: string) => {
    const numericValue = parseInt(value);

    if (!usuarioId) {
      alert('Faça login para modificar o carrinho');
      return;
    }

    if (!isNaN(numericValue)) {
      atualizarQuantidade(usuarioId, projetoId, Math.max(0, numericValue));
    } else {
      // Atualiza para 0 se não for número
      atualizarQuantidade(usuarioId, projetoId, 0);
    }
  };

  if (!usuarioLogado) {
    return (
      <Container className="my-5 text-center">
        <h2>Área de Favoritos</h2>
        <p>Você precisa estar logado para acessar seus favoritos.</p>
        <Button variant="purple" href="/login">Fazer Login</Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Carregando seus favoritos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <h2>Erro ao carregar favoritos</h2>
        <p className="text-danger">{error}</p>
        <Button variant="outline-purple" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Meus Projetos Favoritos</h2>
        <span className="badge bg-pink text-white">
          {projetosFavoritos.length} itens
        </span>
      </div>
      
      {projetosFavoritos.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Nenhum projeto favoritado ainda</h4>
          <p>Explore nosso portfólio e adicione seus projetos favoritos!</p>
          <Button variant="outline-purple" href="/portfolio#projetos">Ver Projetos</Button>
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {projetosFavoritos.map(projeto => {
              const quantidade = carrinhoUsuario[projeto.id]?.quantidade || 0;
              const precoTotal = quantidade * projeto.preco;
              
              return (
                <Col key={projeto.id}>
                  <div className="card h-100 shadow-sm">
                    <ProjetoCard projeto={projeto} showFavorito={false} />
                    
                    <div className="card-footer bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Button 
                          variant="outline-danger"
                          size="sm"
                          onClick={() => usuarioId && removerFavorito(usuarioId, projeto.id)}
                        >
                          <HeartFill size={16} className="me-1" /> Remover
                        </Button>
                        
                          <div className="d-flex align-items-center">
                            <span className="text-muted me-2">Quantidade:</span>
                            <input
                              type="number"
                              min="0"
                              value={quantidade}
                              onChange={(e) => handleQuantidadeChange(projeto.id, e.target.value)}
                              className="form-control form-control-sm text-center"
                              style={{ width: '70px' }}
                              onFocus={(e) => e.target.select()} // Seleciona todo o texto ao focar
                            />
                          </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center border-top pt-2">
                        <strong>Preço Total:</strong>
                        <span className="text-purple fw-bold">
                          {precoTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          
        </>
      )}
    </Container>
  );
};

export default FavoritosPage;