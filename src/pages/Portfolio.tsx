import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import ProjetoCard from '../components/ProjetoCard';
import FiltroCategoria from '../components/FiltroCategoria'; 
import { buscarProjetos, buscarPorCategoriaNome } from '../services/projetoService'; 
import { buscarCategorias } from '../services/categoriaService'; 
import { type Projeto } from '../interfaces/Projeto';
import { precos } from '../data/precos';
import { type Categoria } from '../interfaces/Categoria'; 

// Importando todas as imagens necessárias
import carousel1 from '../assets/images/carousel1.jpg';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.jpeg';
import marianaCosta from '../assets/images/mariana-costa.jpg';
import cliente1 from '../assets/images/cliente1.jpg';
import cliente2 from '../assets/images/cliente2.jpg';
import cliente3 from '../assets/images/cliente3.jpg';
import cliente4 from '../assets/images/cliente4.jpg';
import cliente5 from '../assets/images/cliente5.jpg';
import cliente6 from '../assets/images/cliente6.jpg';
import cliente7 from '../assets/images/cliente7.jpg';
import cliente8 from '../assets/images/cliente8.jpg';
import cliente9 from '../assets/images/cliente9.jpg';
import cliente10 from '../assets/images/cliente10.jpg';

const PortfolioPage = () => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [todosProjetos, setTodosProjetos] = useState<Projeto[]>([]); 
  const [projetosFiltrados, setProjetosFiltrados] = useState<Projeto[]>([]); 
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todas');
  const [busca, setBusca] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const location = useLocation();
  
  // Referência para manter o valor da busca
  const buscaRef = useRef('');

  // Função para aplicar a busca aos projetos
  const aplicarBusca = (termo: string, projetos: Projeto[]) => {
    if (termo.trim() === '') {
      return projetos;
    }
    
    const termoNormalizado = termo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return projetos.filter(projeto => 
      projeto.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(termoNormalizado)
    );
  };

  // Carregar categorias e projetos iniciais
  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Carregar categorias
        const categoriasAPI = await buscarCategorias();
        setCategorias(categoriasAPI);
        setLoadingCategorias(false);
        
        // Carregar projetos
        const projetosAPI = await buscarProjetos();
        const projetosComPreco = projetosAPI.map(projeto => ({
          ...projeto,
          preco: precos[projeto.id] || 0
        }));
        
        setTodosProjetos(projetosComPreco);
        setProjetosFiltrados(projetosComPreco);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
        setLoadingCategorias(false);
      }
    };

    carregarDados();
  }, []);

  // Função para filtrar projetos por categoria
  const filtrarPorCategoria = useCallback(async (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setLoading(true);

    try {
      let projetosAPI;
      if (categoria === 'Todas') {
        projetosAPI = await buscarProjetos();
      } else {
        projetosAPI = await buscarPorCategoriaNome(categoria);
      }
      
      const projetosComPreco = projetosAPI.map(projeto => ({
        ...projeto,
        preco: precos[projeto.id] || 0
      }));
      
      setTodosProjetos(projetosComPreco);
      
      // Aplicar a busca atual aos novos projetos
      const projetosFiltradosAtualizados = aplicarBusca(buscaRef.current, projetosComPreco);
      setProjetosFiltrados(projetosFiltradosAtualizados);
    } catch (error) {
      console.error('Erro ao filtrar projetos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para filtrar projetos por título (em tempo real)
  const filtrarPorTitulo = useCallback((termo: string) => {
    setBusca(termo);
    buscaRef.current = termo;
    
    const projetosFiltradosAtualizados = aplicarBusca(termo, todosProjetos);
    setProjetosFiltrados(projetosFiltradosAtualizados);
  }, [todosProjetos]);

  // Efeito combinado para título, scroll e sistema de votos
  useEffect(() => {
    document.title = "Portfólio | Studio Brisa";
    
    // Função para rolar até a âncora
    const scrollToAnchor = () => {
      if (location.hash) {
        const hash = location.hash.replace('#', '');
        const element = document.getElementById(hash);
        
        if (element) {
          // Delay para garantir que a página esteja renderizada
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      } else {
        // Scroll para o topo se não houver hash
        window.scrollTo(0, 0);
      }
    };

    scrollToAnchor();
    
    // Observar mudanças no hash
    const handleHashChange = () => scrollToAnchor();
    window.addEventListener('hashchange', handleHashChange);
    
    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location]);

  // Renderização da página
  return (
    <>
      {/* Carrossel */}
      <Container 
        id="geral"
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          padding: 0
        }}
      >
        <div className="full-width-carousel">
          <div id="main-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button 
                type="button" 
                data-bs-target="#main-carousel" 
                data-bs-slide-to="0" 
                className="active" 
                aria-current="true" 
                aria-label="Slide 1"
              ></button>
              <button 
                type="button" 
                data-bs-target="#main-carousel" 
                data-bs-slide-to="1" 
                aria-label="Slide 2"
              ></button>
              <button 
                type="button" 
                data-bs-target="#main-carousel" 
                data-bs-slide-to="2" 
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {/* Item 1 - Residencial */}
              <div className="carousel-item active">
                <img src={carousel1} className="d-block w-100" alt="Projeto Residencial" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Residência Moderna - Niterói</h5>
                  <button 
                    className="btn btn-purple"
                    onClick={() => {
                      const element = document.getElementById('residencial');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Projetos
                  </button>
                </div>
              </div>
              
              {/* Item 2 - Comercial */}
              <div className="carousel-item">
                <img src={carousel2} className="d-block w-100" alt="Projeto Comercial" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Escritório Corporativo - Rio de Janeiro</h5>
                  <button 
                    className="btn btn-purple"
                    onClick={() => {
                      const element = document.getElementById('comercial');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Projetos
                  </button>
                </div>
              </div>
              
              {/* Item 3 - Verde */}
              <div className="carousel-item">
                <img src={carousel3} className="d-block w-100" alt="Design Sustentável" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Edifício Sustentável - Centro</h5>
                  <button 
                    className="btn btn-purple"
                    onClick={() => {
                      const element = document.getElementById('verde');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Projetos
                  </button>
                </div>
              </div>
            </div>
            
            {/* Controles de navegação */}
            <a className="carousel-control-prev" href="#main-carousel" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Anterior</span>
            </a>
            <a className="carousel-control-next" href="#main-carousel" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Próximo</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Conteúdo Principal */}
      <main className="container py-5">
        {/* Sobre Mariana */}
        <section className="about-section mb-5 bg-white p-4 rounded shadow-sm">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={marianaCosta} alt="Mariana Costa" className="img-fluid rounded-circle" />
            </div>
            <div className="col-md-6 text-dark">
              <h2 className="text-dark-purple mb-4">Sobre Mariana Costa</h2>
              <p className="text-muted">
                Arquiteta e designer de interiores formada pela USP, com especialização em Design Sustentável pela Politecnico di Milano. Com mais de 15 anos de experiência no mercado, já desenvolveu projetos residenciais, comerciais e corporativos premiados.
              </p>
              <p className="text-muted">
                Fundadora do Studio Brisa, Mariana acredita que bons projetos devem refletir a personalidade dos clientes enquanto criam espaços práticos e inspiradores.
              </p>
              <div className="d-flex mt-4">
                <Link to="/contato" className="btn btn-outline-purple mr-3">Agende uma Consulta</Link>
                <button 
                  className="btn btn-purple"
                  onClick={() => {
                    const depoimentos = document.getElementById('depoimentos');
                    if (depoimentos) {
                      depoimentos.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Veja Depoimentos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos */}
        <Container id="projetos">
          {/* Barra de pesquisa */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Buscar projetos por título..."
              className="form-control"
              value={busca}
              onChange={(e) => filtrarPorTitulo(e.target.value)}
            />
          </div>
          
          {/* Filtro por categoria */}
          {!loadingCategorias && (
            <FiltroCategoria 
              categorias={categorias}
              categoriaSelecionada={categoriaSelecionada}
              onCategoriaChange={filtrarPorCategoria}
            />
          )}

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-pink" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando projetos...</p>
            </div>
          ) : projetosFiltrados.length > 0 ? (
            <div className="row">
              {projetosFiltrados.map(projeto => (
                <div className="col-md-4 mb-4" key={projeto.id}>
                  <ProjetoCard projeto={projeto} showComprar={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-5">
              <h4 className="text-muted">Nenhum projeto encontrado</h4>
              <p>Tente alterar sua busca ou selecione outra categoria.</p>
            </div>
          )}
        </Container>

        {/* Depoimentos */}
        <section id="depoimentos" className="mb-5">
          <h2 className="text-dark-purple mb-4">Depoimentos de Clientes</h2>
          <div className="row">
            {/* Depoimento 1 */}
            <div className="col-md-4 mb-4">
              <div className="card bg-light-purple p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <img src={cliente1} alt="Cliente" className="rounded-circle mr-3" width="60" />
                  <div>
                    <h5 className="mb-0">Caito Mainier</h5>
                    <small className="text-muted">Residência em Icaraí</small>
                  </div>
                </div>
                <p>"Mariana transformou completamente nosso apartamento. O projeto superou todas as expectativas, com soluções inteligentes que tornaram o espaço muito mais funcional e bonito."</p>
                <div className="text-yellow">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
            
            {/* Depoimento 2 */}
            <div className="col-md-4 mb-4">
              <div className="card bg-light-purple p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <img src={cliente2} alt="Cliente" className="rounded-circle mr-3" width="60" />
                  <div>
                    <h5 className="mb-0">Fernanda Torres</h5>
                    <small className="text-muted">Escritório em Botafogo</small>
                  </div>
                </div>
                <p>"O Studio Brisa transformou nosso escritório em um espaço que reflete perfeitamente nossa marca. A equipe foi atenciosa e profissional em todas as etapas."</p>
                <div className="text-yellow">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
    
            {/* Depoimento 3 */}
            <div className="col-md-4 mb-4">
              <div className="card bg-light-purple p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <img src={cliente3} alt="Cliente" className="rounded-circle mr-3" width="60" />
                  <div>
                    <h5 className="mb-0">Ricardo Almeida</h5>
                    <small className="text-muted">Restaurante em Ipanema</small>
                  </div>
                </div>
                <p>"O projeto superou todas as expectativas. Criaram um ambiente que encanta nossos clientes e otimizou nosso fluxo de trabalho. Recomendo sem dúvidas!"</p>
                <div className="text-yellow">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
    
            {/* Depoimentos adicionais (mostrados quando clicar em "Mostrar mais") */}
            {showAllTestimonials && (
              <>
                {/* Depoimento 4 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente4} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Patrícia Souza</h5>
                        <small className="text-muted">Casa em Maricá</small>
                      </div>
                    </div>
                    <p>"Mariana entendeu perfeitamente nosso estilo de vida e criou uma casa que é nossa cara. A atenção aos detalhes e soluções sustentáveis foram um diferencial."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 5 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente5} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Marcos Oliveira</h5>
                        <small className="text-muted">Clínica Médica</small>
                      </div>
                    </div>
                    <p>"Profissionalismo e criatividade em todos os aspectos. Criaram um ambiente acolhedor para pacientes e funcional para nossa equipe médica."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 6 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente6} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Isabela Costa</h5>
                        <small className="text-muted">Loja de Design</small>
                      </div>
                    </div>
                    <p>"Transformaram nosso showroom em um espaço que valoriza nossos produtos e cria uma experiência única para os clientes. O projeto aumentou nossas vendas em 40%."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 7 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente7} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Gustavo Henrique</h5>
                        <small className="text-muted">Casa Container</small>
                      </div>
                    </div>
                    <p>"Admiro como conseguiram unir sustentabilidade, conforto e design em nosso projeto. A casa superou todas as expectativas e ainda reduzimos nossos custos com energia."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 8 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente8} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Luana Martins</h5>
                        <small className="text-muted">Café Cultural</small>
                      </div>
                    </div>
                    <p>"O Studio Brisa captou perfeitamente a essência do nosso negócio. Criaram um espaço que é ao mesmo tempo aconchegante e funcional, perfeito para nossos eventos."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 9 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente9} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Roberto Carlos</h5>
                        <small className="text-muted">Hotel em Búzios</small>
                      </div>
                    </div>
                    <p>"O projeto sustentável não só reduziu nossos custos operacionais como se tornou nosso principal diferencial no mercado. Os hóspedes amam o conceito!"</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
        
                {/* Depoimento 10 */}
                <div className="col-md-4 mb-4">
                  <div className="card bg-light-purple p-4 h-100">
                    <div className="d-flex align-items-center mb-3">
                      <img src={cliente10} alt="Cliente" className="rounded-circle mr-3" width="60" />
                      <div>
                        <h5 className="mb-0">Rebeca Andrade</h5>
                        <small className="text-muted">Apartamento em Copacabana</small>
                      </div>
                    </div>
                    <p>"Como moradora de um apartamento pequeno, adorei as soluções inteligentes que criaram para otimizar cada centímetro sem perder o estilo e conforto."</p>
                    <div className="text-yellow">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Botões para mostrar mais/menos depoimentos */}
          <div className="text-center mt-4">
            {!showAllTestimonials ? (
              <button 
                className="btn btn-outline-purple"
                onClick={() => setShowAllTestimonials(true)}
              >
                Mostrar mais depoimentos
              </button>
            ) : (
              <button 
                className="btn btn-outline-purple"
                onClick={() => setShowAllTestimonials(false)}
              >
                Mostrar menos depoimentos
              </button>
            )}
          </div>
        </section>

        {/* Botão Voltar ao Topo */}
        <button 
          className="mt-4 mb-5 btn btn-outline-primary rounded-pill"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Voltar para o topo
        </button>
      </main>
    </>
  );
};

export default PortfolioPage;