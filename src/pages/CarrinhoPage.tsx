import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ProjetoCard from '../components/ProjetoCard';
import { useCarrinhoStore } from '../stores/CarrinhoStore';
import useUsuarioStore from '../stores/UsuarioStore';
import { Trash } from 'react-bootstrap-icons';
import { buscarProjetos } from '../services/projetoService';
import { precos } from '../data/precos';
import { type Projeto } from '../interfaces/Projeto';

const CarrinhoPage: React.FC = () => {
  document.title = "Carrinho | Studio Brisa";
  const usuarioLogado = useUsuarioStore(state => state.usuarioLogado);
  const usuarioId = useUsuarioStore(state => state.usuarioId);
  const { removerItem, atualizarQuantidade, getCarrinhoUsuario, limparCarrinho } = useCarrinhoStore();
  
  // Estados para gerenciamento de dados
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obter carrinho do usuário atual
  const carrinhoUsuario = usuarioId ? getCarrinhoUsuario(usuarioId) : {};
  
  // Carregar projetos da API
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
        setError('Falha ao carregar projetos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    carregarProjetos();
  }, []);

  // Obter projetos que estão no carrinho com quantidade > 0
  const projetosNoCarrinho = projetos.filter(p => 
    carrinhoUsuario[p.id]?.quantidade > 0
  );

  const handleQuantidadeChange = (projetoId: number, value: string) => {
    const numericValue = parseInt(value);
    
    if (!usuarioId) {
      alert('Faça login para modificar o carrinho');
      return;
    }
    
    atualizarQuantidade(usuarioId, projetoId, isNaN(numericValue) ? 0 : Math.max(0, numericValue));
  };

  if (!usuarioLogado) {
    return (
      <Container className="my-5 text-center">
        <h2>Carrinho de Compras</h2>
        <p>Você precisa estar logado para acessar seu carrinho.</p>
        <Button variant="purple" href="/login">Fazer Login</Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="pink" />
        <p className="mt-3">Carregando seu carrinho...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <h2 className="text-danger">Erro</h2>
        <p>{error}</p>
        <Button variant="outline-purple" onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Meu Carrinho</h2>
        <span className="badge bg-pink text-white">
          {projetosNoCarrinho.length} itens
        </span>
      </div>
      
      {projetosNoCarrinho.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Seu carrinho está vazio</h4>
          <p>Adicione projetos ao carrinho para continuar!</p>
          <Button variant="outline-purple" href="/portfolio#projetos">Ver Projetos</Button>
        </div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {projetosNoCarrinho.map(projeto => {
              const quantidade = carrinhoUsuario[projeto.id]?.quantidade || 0;
              const precoTotal = quantidade * projeto.preco;
              
              return (
                <Col key={projeto.id}>
                  <div className="card h-100 shadow-sm">
                    <ProjetoCard 
                      projeto={projeto} 
                      showFavorito={false} 
                      showComprar={false}
                    />
                    
                    <div className="card-footer bg-white">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Button 
                          variant="outline-danger"
                          size="sm"
                          onClick={() => usuarioId && removerItem(usuarioId, projeto.id)}
                        >
                          <Trash size={16} className="me-1" /> Remover
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
          
          <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
            <Button 
              variant="danger"
              onClick={() => usuarioId && limparCarrinho(usuarioId)}
            >
              Limpar Carrinho
            </Button>
            
            <div className="text-end">
              <h5>
                Total Geral: {' '}
                <span className="text-purple">
                  {projetosNoCarrinho.reduce((total, projeto) => {
                    const quantidade = carrinhoUsuario[projeto.id]?.quantidade || 0;
                    return total + (quantidade * projeto.preco);
                  }, 0).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </h5>
              
              <Button 
                variant="success" 
                size="lg"
                className="mt-2"
                onClick={() => {}}
              >
                Fechar Compra
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default CarrinhoPage;