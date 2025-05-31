import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import AnchorLink from './AnchorLink';

const NavBar = () => {
  const location = useLocation();
  
  // Verifica se a rota atual é uma subrota do portfólio
  const isPortfolioRoute = location.pathname.startsWith("/portfolio");
  
  return (
    <nav className="navbar navbar-expand-md bg-dark-purple navbar-dark">
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
          <ul className="navbar-nav ms-auto">
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
                    to="/portfolio#residencial" 
                    className={`dropdown-item text-pink ${location.hash === '#residencial' ? 'active-dropdown-item' : ''}`}
                  >
                    Residencial
                  </AnchorLink>
                </li>
                <li>
                  <AnchorLink 
                    to="/portfolio#comercial" 
                    className={`dropdown-item text-pink ${location.hash === '#comercial' ? 'active-dropdown-item' : ''}`}
                  >
                    Comercial
                  </AnchorLink>
                </li>
                <li>
                  <AnchorLink 
                    to="/portfolio#verde" 
                    className={`dropdown-item text-pink ${location.hash === '#verde' ? 'active-dropdown-item' : ''}`}
                  >
                    Design Verde
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;