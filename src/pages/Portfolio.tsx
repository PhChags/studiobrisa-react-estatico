import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

// Importando todas as imagens necessárias
import carousel1 from '../assets/images/carousel1.jpg';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.jpeg';
import marianaCosta from '../assets/images/mariana-costa.jpg';
import residencial1 from '../assets/images/residencial1.jpg';
import residencial2 from '../assets/images/residencial2.jpg';
import residencial3 from '../assets/images/residencial3.jpg';
import residencial4 from '../assets/images/residencial4.jpg';
import comercial1 from '../assets/images/comercial1.jpg';
import comercial2 from '../assets/images/comercial2.jpg';
import comercial3 from '../assets/images/comercial3.jpg';
import comercial4 from '../assets/images/comercial4.jpg';
import verde1 from '../assets/images/verde1.jpg';
import verde2 from '../assets/images/verde2.jpeg';
import verde3 from '../assets/images/verde3.jpg';
import verde4 from '../assets/images/verde4.jpg';
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

  // Função para rolar até uma seção com base no hash da URL
  useEffect(() => {
    document.title = "Portfólio | Studio Brisa";
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Inicializar sistema de votos
    initVoteSystem();
  }, []);

  // Funções para gerenciar votos 
  const initVoteSystem = () => {
    setTimeout(() => {
      document.querySelectorAll('.like-btn, .dislike-btn').forEach(button => {
        const project = button.dataset.project;
        const type = button.classList.contains('like-btn') ? 'like' : 'dislike';
        
        const storedCount = localStorage.getItem(`${project}-${type}`);
        if (storedCount !== null) {
          button.querySelector('span').textContent = storedCount;
        }
        
        if (localStorage.getItem(`${project}-voted`) === type) {
          button.querySelector('i').classList.replace('far', 'fas');
        }
      });
    }, 0);
  };

  const handleVote = (button) => {
    const project = button.dataset.project;
    const isLike = button.classList.contains('like-btn');
    const type = isLike ? 'like' : 'dislike';
    const oppositeType = isLike ? 'dislike' : 'like';
    const countElement = button.querySelector('span');
    let count = parseInt(countElement.textContent);
    
    const alreadyVoted = localStorage.getItem(`${project}-voted`);
    
    if (alreadyVoted === type) {
      // Remover voto
      count--;
      localStorage.removeItem(`${project}-voted`);
      button.querySelector('i').classList.replace('fas', 'far');
    } else {
      // Verificar se já votou no oposto
      if (alreadyVoted) {
        const oppositeButton = button.parentElement.querySelector(`.${oppositeType}-btn`);
        const oppositeCountElement = oppositeButton.querySelector('span');
        const oppositeCount = parseInt(oppositeCountElement.textContent);
        
        oppositeCountElement.textContent = oppositeCount - 1;
        oppositeButton.querySelector('i').classList.replace('fas', 'far');
        localStorage.removeItem(`${project}-voted`);
      }
      
      // Adicionar novo voto
      count++;
      localStorage.setItem(`${project}-voted`, type);
      button.querySelector('i').classList.replace('far', 'fas');
    }
    
    countElement.textContent = count;
    localStorage.setItem(`${project}-${type}`, count.toString());
  };

  // Renderização da página
  return (
    <>
      {/* Carrossel */}
      <Container 
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
              <div className="carousel-item active">
              <img src={carousel1} className="d-block w-100" alt="Projeto Residencial" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Residência Moderna - Niterói</h5>
                <button 
                  className="btn btn-purple"
                  onClick={() => document.getElementById('residencial').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Projetos Residenciais
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={carousel2} className="d-block w-100" alt="Projeto Comercial" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Escritório Corporativo - Rio de Janeiro</h5>
                <button 
                  className="btn btn-purple"
                  onClick={() => document.getElementById('comercial').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Projetos Comerciais
                </button>
              </div>
            </div>
            <div className="carousel-item">
              <img src={carousel3} className="d-block w-100" alt="Design Sustentável" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Edifício Sustentável - Centro</h5>
                <button 
                  className="btn btn-purple"
                  onClick={() => document.getElementById('verde').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Projetos Verdes
                </button>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#main-carousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Anterior</span>
          </a>
          <a className="carousel-control-next" href="#main-carousel" role="button" data-slide="next">
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
                  onClick={() => document.getElementById('depoimentos').scrollIntoView({ behavior: 'smooth' })}
                >
                  Veja Depoimentos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projetos Residenciais */}
        <section id="residencial" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark-purple mb-0"><i className="fas fa-home mr-2"></i>Projetos Residenciais</h2>
          </div>
  
          <div className="row project-scroll mb-4">
            {/* Residencial 1 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={residencial1} className="card-img-top" alt="Casa Moderna" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Casa Moderna - Niterói</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Projeto completo para residência de 350m² com integração de ambientes e vista para o mar.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="residencial1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">12</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="residencial1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">2</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#residencialModal1">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Residencial 2 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={residencial2} className="card-img-top" alt="Apartamento Leblon" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Apartamento Leblon</h5>
                    <span className="badge bg-yellow text-dark-purple">2025</span>
                  </div>
                  <p className="card-text">Reforma completa de 180m² com integração sala-jantar e varanda gourmet.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="residencial2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">18</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="residencial2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">1</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#residencialModal2">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Residencial 3 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={residencial3} className="card-img-top" alt="Casa Colonial" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Casa Colonial - São Gonçalo</h5>
                    <span className="badge bg-yellow text-dark-purple">2022</span>
                  </div>
                  <p className="card-text">Restauro de casa histórica com 280m² mantendo características originais.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="residencial3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">9</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="residencial3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#residencialModal3">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Residencial 4 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={residencial4} className="card-img-top" alt="Cobertura Barra" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Cobertura Barra</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Projeto de 320m² com terraço panorâmico e piscina infinita.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="residencial4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">14</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="residencial4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">2</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#residencialModal4">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="#" className="btn btn-outline-purple float-right">Ver todos os residenciais →</Link>
        </section>

        {/* Projetos Comerciais */}
        <section id="comercial" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark-purple mb-0"><i className="fas fa-building mr-2"></i>Projetos Comerciais</h2>
          </div>
          
          <div className="row project-scroll mb-4">
            {/* Comercial 1 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={comercial1} className="card-img-top" alt="Escritório Corporativo" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Escritório Corporativo - Centro</h5>
                    <span className="badge bg-yellow text-dark-purple">2022</span>
                  </div>
                  <p className="card-text">Ambiente de trabalho moderno e funcional para 50 colaboradores.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="comercial1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">8</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="comercial1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">1</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#comercialModal1">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comercial 2 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={comercial2} className="card-img-top" alt="Restaurante Temático" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Restaurante Temático - Ipanema</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Ambiente com 150m² inspirado na cultura carioca, com iluminação cenográfica.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="comercial2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">11</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="comercial2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#comercialModal2">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comercial 3 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={comercial3} className="card-img-top" alt="Loja Conceito" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Loja Conceito - Shopping Leblon</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Design de 120m² para marca de moda sustentável com elementos reciclados.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="comercial3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">9</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="comercial3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">1</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#comercialModal3">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comercial 4 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={comercial4} className="card-img-top" alt="Clínica Médica" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Clínica Médica - Botafogo</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Projeto de 300m² com 8 consultórios, recepção acolhedora e fluxo otimizado.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="comercial4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">6</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="comercial4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#comercialModal4">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="#" className="btn btn-outline-purple float-right">Ver todos os comerciais →</Link>
        </section>

        {/* Design Verde */}
        <section id="verde" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-dark-purple mb-0"><i className="fas fa-leaf mr-2"></i>Design Verde</h2>
          </div>
          
          <div className="row project-scroll mb-4">
            {/* Verde 1 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={verde1} className="card-img-top" alt="Casa Sustentável" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Casa Sustentável - Maricá</h5>
                    <span className="badge bg-yellow text-dark-purple">2022</span>
                  </div>
                  <p className="card-text">Projeto com certificação LEED, utilizando energia solar e materiais reciclados.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="verde1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">15</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="verde1"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#verdeModal1">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Verde 2 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={verde2} className="card-img-top" alt="Edifício Sustentável" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Edifício Sustentável - Centro</h5>
                    <span className="badge bg-yellow text-dark-purple">2023</span>
                  </div>
                  <p className="card-text">Prédio comercial com certificação LEED Platinum, 1500m².</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="verde2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">10</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="verde2"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#verdeModal2">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verde 3 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={verde3} className="card-img-top" alt="Casa Container" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Casa Container - Itaboraí</h5>
                    <span className="badge bg-yellow text-dark-purple">2021</span>
                  </div>
                  <p className="card-text">Residência de 120m² feita com containers reciclados e energia solar.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="verde3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">21</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="verde3"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">2</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#verdeModal3">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verde 4 */}
            <div className="col-md-4 mb-4">
              <div className="card project-card h-100">
                <img src={verde4} className="card-img-top" alt="Escritório Verde" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Escritório Verde - Jardim Botânico</h5>
                    <span className="badge bg-yellow text-dark-purple">2024</span>
                  </div>
                  <p className="card-text">Escritório de 200m² com telhado verde e sistema de reaproveitamento de água.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="like-buttons">
                      <button 
                        className="btn-like like-btn" 
                        data-project="verde4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-up"></i> <span className="like-count">12</span>
                      </button>
                      <button 
                        className="btn-like dislike-btn" 
                        data-project="verde4"
                        onClick={(e) => handleVote(e.currentTarget)}
                      >
                        <i className="far fa-thumbs-down"></i> <span className="dislike-count">0</span>
                      </button>
                    </div>
                    <button className="btn btn-sm btn-purple" data-toggle="modal" data-target="#verdeModal4">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="#" className="btn btn-outline-purple float-right">Ver todos os projetos verdes →</Link>
        </section>

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