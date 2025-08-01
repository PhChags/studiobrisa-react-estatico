import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import AnchorLink from './AnchorLink';
import { Heart, Cart, Person } from 'react-bootstrap-icons';
import useUsuarioStore from "../stores/UsuarioStore";
import { useFavoritosStore } from '../stores/FavoritosStore';
import { useCarrinhoStore } from '../stores/CarrinhoStore';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Obter informações do usuário
  const usuarioId = useUsuarioStore(state => state.usuarioId);
  const usuarioLogado = useUsuarioStore(state => state.usuarioLogado);
  
  // Obter favoritos do usuário atual
  const { getFavoritosPorUsuario } = useFavoritosStore();
  const favoritos = usuarioId ? getFavoritosPorUsuario(usuarioId) : [];

  // Obter carrinho do usuário atual
  const { getCarrinhoUsuario } = useCarrinhoStore();
  const carrinhoUsuario = usuarioId ? getCarrinhoUsuario(usuarioId) : {};
  
  // Calcular total de itens no carrinho
  const totalItensCarrinho = Object.values(carrinhoUsuario).reduce(
    (total, item) => total + item.quantidade, 0
  );
  
  // Verifica se a rota atual é uma subrota do portfólio
  const isPortfolioRoute = location.pathname.startsWith("/portfolio");
  
  // Handler para logout
  const handleLogout = () => {
    useUsuarioStore.getState().logout();
    navigate('/');
  };    

  return (
    <nav className="navbar navbar-expand-md bg-dark-purple navbar-dark py-3">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="Studio Brisa" height="60" />
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className={({isActive}) => 
                `nav-link text-pink ${isActive ? 'active-link' : ''}`} end>
                Home
              </NavLink>
            </li>
            
            <li className={`nav-item dropdown ${isPortfolioRoute ? 'active-dropdown' : ''}`}>
              <a 
                className="nav-link dropdown-toggle text-pink" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                Portfólio
              </a>
              <ul className="dropdown-menu bg-dark-purple">
                <li>
                  <AnchorLink 
                    to="/portfolio#geral" 
                    className={`dropdown-item text-pink ${location.hash === '#geral' ? 'active-dropdown-item' : ''}`}
                  >
                    Geral
                  </AnchorLink>
                </li>
                <li>
                  <AnchorLink 
                    to="/portfolio#projetos" 
                    className={`dropdown-item text-pink ${location.hash === '#projetos' ? 'active-dropdown-item' : ''}`}
                  >
                    Projetos
                  </AnchorLink>
                </li>
                <li>
                  <AnchorLink 
                    to="/portfolio#depoimentos" 
                    className={`dropdown-item text-pink ${location.hash === '#depoimentos' ? 'active-dropdown-item' : ''}`}
                  >
                    Depoimentos
                  </AnchorLink>
                </li>
              </ul>
            </li>
            
            <li className="nav-item">
              <NavLink to="/faq" className={({isActive}) => 
                `nav-link text-pink ${isActive ? 'active-link' : ''}`}>
                FAQ
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/contato" className={({isActive}) => 
                `nav-link text-pink ${isActive ? 'active-link' : ''}`}>
                Contato
              </NavLink>
            </li>
          </ul>
          
          {/* Área de ícones do usuário */}
          <div className="d-flex align-items-center gap-3">
            {usuarioLogado ? (
              <>
                <NavLink 
                  to="/favoritos" 
                  className="nav-icon position-relative"
                  title="Favoritos"
                >
                  <Heart className="text-pink fs-5" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-yellow text-dark-purple">
                    {favoritos.length}
                  </span>
                </NavLink>
                
                <NavLink 
                  to="/carrinho" 
                  className="nav-icon position-relative"
                  title="Carrinho"
                >
                  <Cart className="text-pink" size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-yellow text-dark-purple">
                    {totalItensCarrinho} {/* Contagem de itens no carrinho */}
                  </span>
                </NavLink>
                
                <div className="dropdown">
                  <a 
                    className="nav-link dropdown-toggle d-flex align-items-center text-pink" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                  >
                    <div className="avatar-sm bg-light-purple rounded-circle d-flex align-items-center justify-content-center">
                      <Person className="text-pink" size={16} />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark-purple">
                    <li>
                      <span className="dropdown-item text-light disabled">
                        Olá, Usuário!
                      </span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink to="/admin" className="dropdown-item text-pink d-flex align-items-center gap-2">
                        <i className="bi bi-gear"></i> Área Admin
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/minha-conta" className="dropdown-item text-pink d-flex align-items-center gap-2">
                        <i className="bi bi-person-circle"></i> Minha Conta
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button 
                        className="dropdown-item text-pink d-flex align-items-center gap-2"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right"></i> Sair
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <NavLink 
                to="/login" 
                className="btn btn-outline-pink d-flex align-items-center gap-2"
              >
                <Person size={16} />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;