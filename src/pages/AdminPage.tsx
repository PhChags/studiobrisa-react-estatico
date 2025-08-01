import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, 
  Table, 
  Image, 
  Spinner, 
  Button, 
  Form, 
  InputGroup,
  Row,
  Col,
  Modal
} from 'react-bootstrap';
import { buscarProjetos } from '../services/projetoService';
import { type Projeto } from '../interfaces/Projeto';
import { precos } from '../data/precos';
import useUsuarioStore from '../stores/UsuarioStore';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Pencil, Trash } from 'react-bootstrap-icons';
import ProjetoForm from '../components/ProjetoForm';
import { 
  criarProjeto, 
  atualizarProjeto, 
  removerProjeto
} from '../hooks/useAPI';
import { type ProjetoDTO } from '../interfaces/Projeto';
import { useFavoritosStore } from '../stores/FavoritosStore';
import { useCarrinhoStore } from '../stores/CarrinhoStore';

const AdminPage: React.FC = () => {
  document.title = "Área Admin | Studio Brisa";
  const navigate = useNavigate();
  const usuarioLogado = useUsuarioStore(state => state.usuarioLogado);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para o CRUD
  const [showForm, setShowForm] = useState(false);
  const [projetoEditando, setProjetoEditando] = useState<Projeto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<Projeto | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Obtenha as funções das stores
  const { removerProjetoDeTodosOsFavoritos } = useFavoritosStore();
  const { removerProjetoDeTodosOsCarrinhos } = useCarrinhoStore();

  useEffect(() => {
    // Redireciona se não estiver logado
    if (!usuarioLogado) {
      navigate('/login');
      return;
    }

    carregarProjetos();
  }, [usuarioLogado, navigate]);

  const carregarProjetos = async () => {
    setLoading(true);
    try {
      const projetosAPI = await buscarProjetos();
      
      // Adicionar preço aos projetos
      const projetosComPreco = projetosAPI.map(projeto => ({
        ...projeto,
        preco: precos[projeto.id] || 0
      }));
      
      setProjetos(projetosComPreco);
      setProjetosFiltrados(projetosComPreco);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para pesquisar projetos por título
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setProjetosFiltrados(projetos);
      return;
    }
    
    const termo = searchTerm.toLowerCase();
    const resultados = projetos.filter(projeto => 
      projeto.titulo.toLowerCase().includes(termo)
    );
    
    setProjetosFiltrados(resultados);
  }, [searchTerm, projetos]);

  // Resetar pesquisa
  const handleClearSearch = () => {
    setSearchTerm('');
    setProjetosFiltrados(projetos);
  };

  // Abrir formulário para adicionar novo projeto
  const handleAddProjeto = () => {
    setProjetoEditando(null);
    setShowForm(true);
  };

  // Abrir formulário para editar projeto
  const handleEditProjeto = (projeto: Projeto) => {
    setProjetoEditando(projeto);
    setShowForm(true);
  };

  // Abrir modal de confirmação para exclusão
  const handleOpenDeleteModal = (projeto: Projeto) => {
    setProjetoParaExcluir(projeto);
    setShowDeleteModal(true);
  };

  // Fechar modal de exclusão
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProjetoParaExcluir(null);
  };

  // Confirmar exclusão de projeto
  const handleConfirmDelete = async () => {
    if (!projetoParaExcluir) return;
    
    try {
      // 1. Remover da API
      await removerProjeto(projetoParaExcluir.id);
      
      // 2. Remover de todos os favoritos
      removerProjetoDeTodosOsFavoritos(projetoParaExcluir.id);
      
      // 3. Remover de todos os carrinhos
      removerProjetoDeTodosOsCarrinhos(projetoParaExcluir.id);
      
      // 4. Atualizar lista local
      const novosProjetos = projetos.filter(p => p.id !== projetoParaExcluir.id);
      setProjetos(novosProjetos);
      setProjetosFiltrados(novosProjetos);
      
      // 5. Remover do mapeamento de preços
      delete precos[projetoParaExcluir.id];
      localStorage.setItem('precos', JSON.stringify(precos));
      
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  // Salvar projeto (criação ou atualização)
  const handleSalvarProjeto = async (dto: ProjetoDTO, precoValor: number) => {
    setFormLoading(true);
    try {
      if (projetoEditando) {
        // Modo edição
        const projetoAtualizado = await atualizarProjeto(projetoEditando.id, dto);
        
        // Atualizar estado local com novo preço
        const novosProjetos = projetos.map(p => 
          p.id === projetoEditando.id 
            ? { ...projetoAtualizado, preco: precoValor } 
            : p
        );
        
        setProjetos(novosProjetos);
        setProjetosFiltrados(novosProjetos);
        
        // Atualizar mapeamento de preços
        precos[projetoEditando.id] = precoValor;
      } else {
        // Modo criação
        const novoProjeto = await criarProjeto(dto);
        
        // Adicionar preço ao novo projeto
        const projetoComPreco = { ...novoProjeto, preco: precoValor };
        
        // Adicionar no início da lista
        const novosProjetos = [projetoComPreco, ...projetos];
        setProjetos(novosProjetos);
        setProjetosFiltrados(novosProjetos);
        
        // Atualizar mapeamento de preços
        precos[novoProjeto.id] = precoValor;
      }
      
      // Salvar no localStorage
      localStorage.setItem('precos', JSON.stringify(precos));
      
      // Fechar formulário
      setShowForm(false);
      setProjetoEditando(null);
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Administração de Projetos</h1>
      
      {/* Formulário de projeto (modal ou seção) */}
      {showForm && (
        <div className="card p-4 mb-4">
          <h2>{projetoEditando ? 'Editar Projeto' : 'Novo Projeto'}</h2>
          <ProjetoForm
            projeto={projetoEditando}
            onSubmit={handleSalvarProjeto}
            isLoading={formLoading}
            onCancel={() => {
              setShowForm(false);
              setProjetoEditando(null);
            }}
          />
        </div>
      )}
      
      {/* Barra de ações e pesquisa */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Pesquisar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              variant="outline-secondary" 
              onClick={handleSearch}
            >
              <Search /> Pesquisar
            </Button>
            {searchTerm && (
              <Button 
                variant="outline-secondary" 
                onClick={handleClearSearch}
              >
                Limpar
              </Button>
            )}
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          {!showForm && (
            <Button 
              variant="success"
              onClick={handleAddProjeto}
              disabled={loading}
            >
              <PlusCircle className="me-2" /> Adicionar Projeto
            </Button>
          )}
        </Col>
      </Row>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Carregando projetos...</p>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead className="bg-dark-purple text-light">
              <tr>
                <th>ID</th>
                <th>Miniatura</th>
                <th>Categoria</th>
                <th>Título</th>
                <th>Data de Cadastro</th>
                <th>Preço (R$)</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    Nenhum projeto encontrado
                  </td>
                </tr>
              ) : (
                projetosFiltrados.map(projeto => (
                  <tr key={projeto.id}>
                    <td>{projeto.id}</td>
                    <td>
                      <Image 
                        src={projeto.imagemUrl} 
                        alt={projeto.titulo} 
                        thumbnail 
                        style={{ width: '80px' }} 
                      />
                    </td>
                    <td>{projeto.categoriaNome}</td>
                    <td>{projeto.titulo}</td>
                    <td>{formatarData(projeto.dataCadastro)}</td>
                    <td>{projeto.preco.toFixed(2)}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={() => handleEditProjeto(projeto)}
                          disabled={showForm}
                        >
                          <Pencil /> Editar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleOpenDeleteModal(projeto)}
                          disabled={showForm}
                        >
                          <Trash /> Remover
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          
          <div className="mt-4 d-flex justify-content-between align-items-center">
            <p>Total de projetos: <strong>{projetos.length}</strong></p>
            <p>Exibindo: <strong>{projetosFiltrados.length}</strong> projetos</p>
          </div>
        </>
      )}
      
      {/* Modal de Confirmação para Exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {projetoParaExcluir && (
            <>
              <p>Tem certeza que deseja excluir o projeto?</p>
              <p><strong>{projetoParaExcluir.titulo}</strong></p>
              <p className="text-danger">
                Esta ação removerá o projeto de todos os favoritos e carrinhos!
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPage;